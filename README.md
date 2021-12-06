## ⭐️ Features

Library for assist injecting content into different sites
with browser extension.
It allows using configs for parsing containers / content and
pull them from external sources.

## 📦 Getting Started

Include injir.js

    const inst = new Injir({
        container: '.wrapper .row'
    }, (result) => {console.log(result);});

## 💎 Customization

### Config description
**container:** Any jQuery supported selector

    container: '.wrapper .row'


**pollInTimeout:** If need to poll for element, instead of running once

    pollInTimeout: 1000

**overwriteChecker:** Sometimes site overwrites elements, 
it can erase injected content, you can pass jQuery selector or function
to check, was injected content removed and need to rerun worker

    overwriteChecker: '.injected-content'

or

    overwriteChecker: (container) {
        if(container.find('.injected-content').length) return false;
        return true;
    }

**alreadyCaptured:** If you are using pollInTimeout, you need to mark
container already captured by instance. By default it will add data
attribute to container, but you can customize it

    alreadyCaptured: {type: 'data', name: 'injir-captured', value: 'yes'}
or

    alreadyCaptured: {type: 'class', value: 'injir-captured'}

or

    alreadyCaptured: {type: 'content', value: '.injir-captured'}

**dataToParse:** If your worker needs to have some data parsed
inside the container, you can define it. It should be array of objects.

    dataToParse: [
        {
            key: 'price',
            container: '.product_price_sale, .product_price_original',
            textFilter: {
                textNode: {
                    position: 'LAST',                
                },
                separator: {
                    separator: 'SPACE',
                    position: 'FIRST',
                }
                replaceFix: [
                    {
                        from: '. ',
                        to: '.'
                    }
                ],
            }
        }
    ]
