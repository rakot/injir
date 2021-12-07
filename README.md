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

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| container | string | none (req) | Any jQuery supported selector |
| pollInTimeout | int | undefined | If need to poll for element, instead of running once |
| overwriteChecker | object | undefined | Sometimes site overwrites elements, it can erase injected content, you can pass jQuery selector or function to check, was injected content removed and need to re-run worker |
| alreadyCaptured | object | `{type: 'data', name: 'injir-captured', value: 'yes'}` | If you are using pollInTimeout, you need to mark container already captured by instance. By default it will add data attribute to container, but you can customize it |
| dataToParse | array | undefinded | If your worker needs to have some data parsed inside the container, you can define it. It should be array of objects. |

### Examples

**overwriteChecker:** 

    overwriteChecker: {
        selector: '.injected-content',
        parseData: true,
        mutationObserver: {
            attributes: false
        },
        timeout: 1000
    }

**alreadyCaptured:** 

    alreadyCaptured: {type: 'data', name: 'injir-captured', value: 'yes'}
or

    alreadyCaptured: {type: 'class', value: 'injir-captured'}

or

    alreadyCaptured: {type: 'content', value: '.injir-captured'}

**dataToParse:** 

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
