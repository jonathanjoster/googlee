'use strict';
const fs = require('fs');
let jsonObj = JSON.parse(fs.readFileSync('./data.json', 'utf8'));

function show() {
  console.log(jsonObj);
}
function getInfo() {
  return jsonObj[0];
}

function add(arg) {
  if (!arg) {
    show();
    return;
  }

  const count = jsonObj[0].count++;
  const dataLength = jsonObj[0].length;
  const newData = {
    'id': 1 + (count%dataLength),
    'name': arg
  };

  if (jsonObj[newData.id]) {
    jsonObj[newData.id] = newData;
  } else {
    jsonObj.push(newData);
  }

  console.log('added:' + newData.name +
    ', id:' + newData.id +
    ', dataLength:' + dataLength);
  console.log(jsonObj);
  fs.writeFile('./data.json', JSON.stringify(jsonObj), (e) => {
    if (e) { throw err; }
  });
}

function reset() {
  const len = jsonObj[0].length;
  jsonObj = [
    {
      'count': 0,
      'length': len
    }
  ];
  console.log('reseted');
  console.log(jsonObj);
  fs.writeFile('./data.json', JSON.stringify(jsonObj), (e) => {
    if (e) { throw err; }
  });
}

function getDataLength() {
  return jsonObj[0].length;
}
function setDataLength(l) {
  jsonObj[0].length = l;
  console.log('set:' + l);
}

function getSearchText() {
  const info = getInfo();
  let stepCount = 0;
  while (true) {
    if (jsonObj[1+(info.count+stepCount)%info.length]) {
      return jsonObj[1+(info.count+stepCount)%info.length].name;
    }
    if (stepCount > 100) {
      console.log('error');
      return 0;
    }
    stepCount++;
  }
}

function pushSearchText(arg) {
  add(arg);
  const result = getSearchText();
  console.log('return:' + result);
  return result;
}

module.exports = {
  add,
  reset,
  getDataLength,
  setDataLength,
  pushSearchText
}