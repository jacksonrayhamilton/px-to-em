// Copyright © 2017 Jackson Ray Hamilton

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the “Software”), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

function isNumber (value) {
  return value && typeof value === 'number';
}

function isBottomValue (value) {
  return value === null || value === undefined;
}

function isObjectLike (value) {
  return !isBottomValue(value) && typeof value === 'object';
}

function getPrototype (value) {
  if (isBottomValue(value)) {
    return value;
  }
  return Object.getPrototypeOf(value);
}

function getSource (func) {
  return Function.prototype.toString.call(func);
}

function isPlainObject (value) {
  if (!isObjectLike(value)) {
    return false;
  }
  var prototype = getPrototype(value);
  if (!isObjectLike(prototype)) {
    return false;
  }
  var Constructor = prototype.constructor;
  return typeof Constructor === 'function' &&
    Constructor instanceof Constructor &&
    getSource(Constructor) === getSource(Object);
}

function isElement (value) {
  return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
}

function getPxFontSize (element) {
  return parseFloat(getComputedStyle(element).fontSize);
}

export default function pxToEm (px, element) {
  if (!isNumber(px)) {
    throw new TypeError('px is not a number');
  }
  element = isBottomValue(element) ? document.documentElement : element;
  if (!isElement(element)) {
    throw new TypeError('element is not an element');
  }
  var temporaryElement = document.createElement('div');
  temporaryElement.style.setProperty('position', 'absolute', 'important');
  temporaryElement.style.setProperty('visibility', 'hidden', 'important');
  temporaryElement.style.setProperty('font-size', '1em', 'important');
  element.appendChild(temporaryElement);
  var baseFontSize = getPxFontSize(temporaryElement);
  temporaryElement.parentNode.removeChild(temporaryElement);
  return px / baseFontSize;
}
