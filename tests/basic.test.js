import Injir from '../build/injir';
import {SIMPLE_HTML, PRICE_HTML} from "./html/samples";

test('Runs without crashing', () => {
  new Injir({}, (result) => {});
});

test('Parse container', () => {
  document.body.innerHTML = SIMPLE_HTML;

  const inst = new Injir({
    container: '.wrapper .row'
  }, (result) => {});

  expect(inst.result.length).toEqual(2);
});

test('Process worker', () => {
  document.body.innerHTML = SIMPLE_HTML;
  const $ = require('jquery');

  expect($('.processor-flag').length).toEqual(0);

  new Injir({
    container: '.wrapper .row'
  }, (container) => {
    container.append('<div class="processor-flag"></div>');
  });

  expect($('.processor-flag').length).toEqual(2);
});

test('Two instances working without conflict', () => {
  document.body.innerHTML = SIMPLE_HTML;

  const inst_one = new Injir({
    container: '.wrapper .row'
  }, () => {});

  const inst_two = new Injir({
    container: '.wrapper'
  }, () => {});

  expect(inst_one.result.length).toEqual(2);
  expect(inst_two.result.length).toEqual(1);
  expect(inst_one.result.length).toEqual(2);
});


test('Poll in timeout', done => {
  document.body.innerHTML = SIMPLE_HTML;
  const $ = require('jquery');

  const clean_row = $('.wrapper .row').first().clone();

  const inst = new Injir({
    container: '.wrapper .row',
    pollInTimeout: 300,
  }, (result) => {});

  expect(inst.result.length).toEqual(2);

  $('.wrapper').append(clean_row);

  setTimeout(() => {
    try {
      expect(inst.result.length).toEqual(3);
      done();
    } catch (error) {
      done(error);
    }
  }, 1500);
});