
function splitPath(pathName) {
  return pathName.replace(/\]/g, '').split(/[\.\[]/);
}

function recursiveSet(parent, pathParths, value) {
  if (!pathParths.length) return value;

  const key = pathParths.shift();

  if (!parent) parent = isNaN(key) ? {} : [];

  parent[key] = recursiveSet(parent[key], pathParths, value);

  return parent;
}

function _setBy(obj, path, value) {
  return recursiveSet(obj, splitPath(path), value);
}

function setImmutable(obj, path, value) {
  return recursiveSet(deepClone(obj), splitPath(path), value);
}

function recursiveGet(parent, pathParths) {
  const key = pathParths.shift();

  if (parent?.[key] == undefined) return undefined;

  if (!pathParths.length) return parent[key];

  return recursiveGet(parent[key], pathParths);
}

function getBy(obj, path) {
  return recursiveGet(obj, splitPath(path));
}

function deepClone(origin) {
  let result;
  if (Array.isArray(origin)) {
    result = [];

    for (const el of origin) {
      result.push(deepClone(el));
    }

    return result;
  } else if (typeof origin === 'object' && origin !== null) {
    result = {};

    for (const key in origin) {
      result[key] = deepClone(origin[key]);
    }

    return result;
  } else {
    return origin;
  }
}

function setBy(obj, keys, val) {
  keys.split && (keys=keys.split('.'));
  var i=0, l=keys.length, t=obj, x, k;
  while (i < l) {
    k = keys[i++];
    if (k === '__proto__' || k === 'constructor' || k === 'prototype') break;
    t = t[k] = (i === l) ? val : (typeof(x=t[k])===typeof(keys)) ? x : (keys[i]*0 !== 0 || !!~(''+keys[i]).indexOf('.')) ? {} : [];
  }
}

module.exports = { getBy, setBy, deepClone, setImmutable };
