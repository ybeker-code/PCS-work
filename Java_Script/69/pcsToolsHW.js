window.pcs = function (selector) {
  'use strict';

  function getElement(selector) {
    return document.querySelector(selector);
  }

  function setCss(element, property, value) {
    //console.log('in setCss', property);
    element.style[property] = value;
  }

  function getCss(element, property) {
    //return element.style[property];
    return getComputedStyle(element)[property];
  }

  function on(element, event, callback) {
    element.addEventListener(event, callback);
  }

  const element = getElement(selector);

  // Homework functions

  function pickRandomColor() {
    return `#${Math.floor(Math.random() * 16777216).toString(16).padStart(6, '0')}`;
  }

  function sparkle(element, interval, duration) {
    let color;
    const intervalId = setInterval(() => {
      color = pickRandomColor();
      setCss(element, 'backgroundColor', color);
    },
      interval);
    setTimeout(() => clearInterval(intervalId), duration);
  }

  return {
    // getElement: getElement,
    /*setCss,
    getCss,*/
    css: function (property, value) {
      if (arguments.length === 1) {
        return getCss(element, property);
      } else {
        return setCss(element, property, value);
      }
    },
    on: (event, callback) => {
      on(element, event, callback);
    },
    click: (callback) => on(element, 'click', callback),

    // Homework functions
    hide: () => {
      setCss(element, 'display', 'none');
      console.log(`${element.id} was hidden`);
    },

    show: () => { setCss(element, 'display', 'inline-block'); },
    sparkle: (interval = 500, duration = 3000) => {
      sparkle(element, interval, duration);
    }
  };
};
