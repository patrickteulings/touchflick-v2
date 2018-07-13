/**
 *
 * Patrick Teulings © 1978-2018
 *
 * Hi, welcome!
 *
 * This is the main Javscript file.
 * One script to rule them all!
 * Let's go and godspeed you!
 *
 */

import TouchFlick from './vv/helpers/TouchFlick';

/** ----------------------------------------
 TouchFlick responsive slider
 ---------------------------------------- */

const touchFlicks = document.querySelectorAll('[data-module="touchFlick"]');

for (let touchFlick of touchFlicks) {
  let myTouchFlick = new TouchFlick(touchFlick);
}
