window.body = addEventListener('click', (params) => {
  console.log('click at location:', params);
});

/* Events add 'on' in front for attribute
Events
------
click
change
mouseover
mouseout
mouseup
mousedown
mousemove
keyup
keydown
keypress
drag
drop
blur
focus
load
beforeunload

localStorage/sessionStorage
------------
localStorage.setItem(k,v);
localStorage.getItem(k);
localStorage.removeItem(k);
localStorage.clear();

Date(year, monthIndex [, day [, hours [, minutes [, seconds [, milliseconds]]]]])
----
const d = new Date();
const year = d.getFullYear();
// zero is january
const month = d.getMonth();
const date = d.getDate();
const hours = d.getHours();
const minutes = d.getMinutes();
const seconds = d.getSeconds();
const ms = d.getMilliseconds();
const day = d.getDay();
// milliseconds since January 1, 1970
const time = d.getTime();
*/