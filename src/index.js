import {getTextNodes, getElementFromArray} from "./helpers";

class Injir {
  #pollInterval;
  #config;
  #worker;
  #$;
  #alreadyCaptured = {
    type: 'data',
    name: 'injir-captured',
    value: 'yes'
  };
  constructor(config, worker = false) {
    const _ = this;
    _.#$ = require("jquery");

    _.#config = config;
    _.#worker = worker;
    _.result = [];
    _.#parseConfig();
  }

  #parseConfig() {
    const _ = this;

    if(_.#config.alreadyCaptured !== undefined) {
      _.#alreadyCaptured = _.#config.alreadyCaptured;
    }

    if (_.#config.container) {
      //Always parsing container first time
      _.#parseContainer(_.#config.container);
      //If needed adding interval
      if(_.#config.pollInTimeout) {
        _.#pollInterval = setInterval(() => {
          _.#parseContainer(_.#config.container);
        }, _.#config.pollInTimeout);
      }
    }
  }

  #parseContainer(selector) {
    const _ = this, $ = _.#$;

    $(selector).each(function () {
      const self = $(this);
      if(! _.#checkIsAlreadyCaptured(self)) {
        _.#pushContainerInResults(self);
      }
    });
  }

  /**
   * Checks if container is already captured in result array
   * returns true if it already exists and false if not exists
   * @param container
   * @returns {boolean}
   */
  #checkIsAlreadyCaptured(container) {
    const _ = this;
    if(_.#alreadyCaptured === false) {
      return false;
    }
    else if(_.#alreadyCaptured.type === 'data') {
      if(container.data(_.#alreadyCaptured.name) === _.#alreadyCaptured.value) {
        return true;
      }
    } else if(_.#alreadyCaptured.type === 'class') {
      if(container.hasClass(_.#alreadyCaptured.value)) {
        return true;
      }
    } else if(_.#alreadyCaptured.type === 'content') {
      if(container.find(_.#alreadyCaptured.value).length) {
        return true;
      }
    }
    return false;
  }


  #pushContainerInResults(container) {
    const _ = this;

    if(_.#alreadyCaptured.type === 'data') {
      container.data(_.#alreadyCaptured.name, _.#alreadyCaptured.value);
    } else if(_.#alreadyCaptured.type === 'class') {
      container.addClass(_.#alreadyCaptured.value);
    }

    const data = _.#parseNeededData(container);

    const item = {
      container: container,
      data: data,
    };

    _.result.push(item);

    if(_.#worker) {
      _.#worker(container, data, true);

      if(_.#config.overwriteChecker) {
        _.#applyOverwriteChecker(item);
      }
    }
  }

  #applyOverwriteChecker(item) {
    const _ = this, checker = _.#config.overwriteChecker;
    let dataChanged = false;
    let callback = () => {
      if(item.mutationBlock === true) return;

      if(item.container.find(checker.selector).length === 0) {
        if(checker.parseData === true) {
          const data = _.#parseNeededData(item.container);
          if(JSON.stringify(data) !== JSON.stringify(data)) {
            item.data = data;
            dataChanged = true;
          }
        }
        // Blocking rerun mutationObserver by self mutation
        _.#disableObserver(item);
        _.#worker(item.container, item.data, dataChanged);
        _.#applyObserverConfig(checker, item, callback);
      }
    };

    if(checker.mutationObserver !== undefined) {
      _.#applyObserverConfig(checker, item, callback);
    }
    else if(checker.timeout && checker.selector) {
      item.checkerInterval = setInterval(() => {
        callback();
      },checker.timeout);
    }
  }

  #disableObserver(item) {
    if(item.observer) {
      item.observer.disconnect();
      item.observer = undefined;
    }
  }

  #applyObserverConfig(config, item, callback) {
    if(config.mutationObserver !== undefined) {
      const mutationConfig = { attributes: true, childList: true, subtree: true };
      if(config.mutationObserver.attributes === false) mutationConfig.attributes = false;
      if(config.mutationObserver.childList === false) mutationConfig.childList = false;
      if(config.mutationObserver.subtree === false) mutationConfig.subtree = false;

      const observer = new MutationObserver(() => {
        callback();
      });
      observer.observe(item.container[0], mutationConfig);
      item.observer = observer;
    }
  }

  #parseNeededData(container) {
    const _ = this, result = {};

    if(Array.isArray(_.#config.dataToParse) && _.#config.dataToParse.length)
    {
      _.#config.dataToParse.forEach((item) => {
        let dataContainer = container;
        if(item.container) {
          dataContainer = container.find(item.container);
        }

        let textValue = '';

        if(item.attribute) {
          textValue = dataContainer.attr(item.attribute);
        } else {
          if (item.textNode) {
            const textNodes = getTextNodes(dataContainer);

            if (textNodes.length) {
              textValue = getElementFromArray(textNodes, item.textNode.position).nodeValue;
            } else {
              textValue = '';
            }
          } else {
            textValue = dataContainer.text();
          }

          if (textValue && textValue.trim) {
            textValue = textValue.trim();
          }

          if (item.replaceFix) {
            item.replaceFix.forEach((replacement) => {
              textValue = textValue.replace(replacement.from, replacement.to);
            });
          }

          if (item.separator) {
            let separator = item.separator.separator;
            if (separator === 'SPACE') {
              separator = /\s+/;
            }
            const textParts = textValue.split(separator);
            textValue = getElementFromArray(textParts, item.separator.position);
          }
        }

        result[item.key] = textValue;
      });
    }

    return result;
  }
}

export default Injir;
