import Injir from '../build/injir';
import {SIMPLE_HTML, PRICE_HTML} from "./html/samples";

test('Parsing price data', () => {
    document.body.innerHTML = PRICE_HTML;
    const $ = require('jquery');

    const inst = new Injir({
        container: '.wrapper .row',
        dataToParse: [
            {key: 'title', container: '.product'},
            {key: 'price', container: '.a-price-whole', textNode: {'position': 'FIRST'}},
            {key: 'attr', container: '.a-price-fraction', attribute: 'data-test'}
        ]
    }, (container, data) => {
        if(data.title === 'Apple Iphone') {
            expect(data.price).toEqual('1,240');
            expect(data.attr).toEqual('Iphone price');
        } else {
            expect(data.price).toEqual('1,150');
            expect(data.attr).toEqual('Google price');
        }
    });
});

test('Testing overwriteChecker', (done) => {
    document.body.innerHTML = PRICE_HTML;
    const $ = require('jquery');

    const inst = new Injir({
        container: '.wrapper .row',
        overwriteChecker: {
            selector: '.test-injected-div',
            timeout: 200,
        },
        dataToParse: [
            {key: 'title', container: '.product'},
            {key: 'price', container: '.a-price-whole', textNode: {'position': 'FIRST'}},
            {key: 'attr', container: '.a-price-fraction', attribute: 'data-test'}
        ]
    }, (container, data, dataChanged) => {
        const inject_div = $("<div class='test-injected-div'>").text(data.price);
        container.append(inject_div);
    });

    expect($(".test-injected-div").length).toEqual(2);

    setTimeout(() => {
        try {
            expect($(".test-injected-div").length).toEqual(2);
            $(".test-injected-div:eq(0)").remove();
            expect($(".test-injected-div").length).toEqual(1);
            setTimeout(() => {
                try {
                    expect($(".test-injected-div").length).toEqual(2);
                    done();
                } catch (error) {
                    done(error);
                }
            }, 300);
        } catch (error) {
            done(error);
        }
    }, 300);
});

test('Testing MutatorChecker', (done) => {
    document.body.innerHTML = PRICE_HTML;
    const $ = require('jquery');
    let run_counter = 0;
    const inst = new Injir({
        container: '.wrapper .row',
        overwriteChecker: {
            mutationObserver: {},
            timeout: 20000,
        },
        dataToParse: [
            {key: 'title', container: '.product'},
            {key: 'price', container: '.a-price-whole', textNode: {'position': 'FIRST'}},
            {key: 'attr', container: '.a-price-fraction', attribute: 'data-test'}
        ]
    }, (container, data, dataChanged) => {
        const inject_div = $("<div class='test-injected-div'>").text(data.price);
        container.append(inject_div);
        ++run_counter;
    });

    expect($(".test-injected-div").length).toEqual(2);

    setTimeout(() => {
        try {
            expect($(".test-injected-div").length).toEqual(2);
            $(".test-injected-div:eq(0)").remove();
            expect($(".test-injected-div").length).toEqual(1);
            done();
            setTimeout(() => {
                try {
                    expect($(".test-injected-div").length).toEqual(2);
                    expect(run_counter).toEqual(3);

                    done();
                } catch (error) {
                    done(error);
                }
            }, 300);
        } catch (error) {
            done(error);
        }
    }, 300);
});



