const byid = (id) => document.getElementById(id);
const byclass = (classname) => Array.from(document.getElementsByClassName(classname));
const byname = (name) => Array.from(document.getElementsByName(name));
const bytag = (tag) => Array.from(document.getElementsByTagName(tag));
const log = (data) => { console.log(new Date().getMilliseconds() + ": " + data) };
const array = (value) => Array.from(value);
const radian = (degree) => degree * (Math.PI / 180);
const toFloat = (value) => parseFloat(value.toFixed(3));
const randomBetween = (min, max) => Math.random() * (max - min) + min;
const randomHex = (length, min = 0, max = 16) => {
    var letters = '0123456789ABCDEF';
    var hex = '';
    for (var i = 0; i < length; i++) {
      hex += letters[Math.floor(Math.random() * (max - min)) + min];
    }
    return hex;
};
const gradient = (startColor, endColor, steps) => {
    const start = {
            R     : parseInt(startColor.slice(1,3), 16),
            G     : parseInt(startColor.slice(3,5), 16),
            B     : parseInt(startColor.slice(5,7), 16)
    }
    const end = {
            R     : parseInt(endColor.slice(1,3), 16),
            G     : parseInt(endColor.slice(3,5), 16),
            B     : parseInt(endColor.slice(5,7), 16)
    }
    const diff = {
            R     : end.R - start.R,
            G     : end.G - start.G,
            B     : end.B - start.B
    }
  
    let stepsR = Math.round(start['R'] + (diff.R * steps)).toString(16);
    if (stepsR.length < 2) stepsR += '0'
    let stepsG = Math.round(start['G'] + (diff.G * steps)).toString(16);
    if (stepsG.length < 2) stepsG += '0'
    let stepsB = Math.round(start['B'] + (diff.B * steps)).toString(16);
    if (stepsB.length < 2) stepsB += '0'
    
    return `#${stepsR}${stepsG}${stepsB}`;
  }