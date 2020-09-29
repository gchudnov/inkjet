'use strict';

const frameComponents = 4;
const frameWidth = 320;
const frameHeight = 240;
const frameLength = frameWidth * frameHeight * frameComponents;

function initData(frameData, r, g, b) {
  const length = frameData.length || frameData.byteLength;
  const view = (frameData instanceof ArrayBuffer) ? new Uint8Array(frameData) : frameData;

  let i = 0;
  while (i < length) {
    view[i++] = r; // red
    view[i++] = g; // green
    view[i++] = b; // blue
    view[i++] = 0xFF; // alpha - ignored in JPEGs
  }

  return {
    width: frameWidth,
    height: frameHeight,
    data: frameData
  }
}

function makeRgbBuffer(r, g, b) {
  const frameData = Buffer.alloc(frameLength);
  return initData(frameData, r, g, b)
}

function makeRgbArrayBuffer(r, g, b) {
  const frameData = new ArrayBuffer(frameLength);
  return initData(frameData, r, g, b)
}

function makeRgbUint8Array(r, g, b) {
  const frameData = new Uint8Array(frameLength);
  return initData(frameData, r, g, b)
}

function makeRgbUint8ClampedArray(r, g, b) {
  const frameData = new Uint8ClampedArray(frameLength);
  return initData(frameData, r, g, b)
}

export default {
  makeRgbBuffer: makeRgbBuffer,
  makeRgbArrayBuffer: makeRgbArrayBuffer,
  makeRgbUint8Array: makeRgbUint8Array,
  makeRgbUint8ClampedArray: makeRgbUint8ClampedArray,

  frameWidth: frameWidth,
  frameHeight: frameHeight,


};
