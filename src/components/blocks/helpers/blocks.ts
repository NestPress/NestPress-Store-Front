export const uid = () => (Math.floor(Math.random() * 9999) * 100000000 + new Date().getTime()).toString(36);

export const slugify = (string: string) => {
  return string
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

/* 
  parse blocks by parent
*/
export const getNestedChildren = (arr: any, parent: string, withFirst: bollean) => {
    const out: any = [];
    withFirst &&  out.push(arr?.filter((x) => x.id === parent)[0]);
    for (const i in arr) {
      if (arr[i].parentId === parent) {
        const children = getNestedChildren(arr, arr[i].id, false);
        if (children.length) {
          children.map((el: any) => out.push(el));
        }
        out.push(arr[i]);
      }
    }
    return out;
  };

/* 
  find parent by block name
*/
export const findOutByBlock = (regBlocks, currentId, blockName) => {
    const block = regBlocks.find(el => el.id === currentId)
    if(block.block === blockName){
      return block 
    }else{
      return findOutByBlock(regBlocks, block.parentId, blockName)
    }
  }

/* 
  set value from object by path 
*/
export const  setByPath = (obj, path, value) => {
  var a = path.split('.')
  var o = obj
  while (a.length - 1) {
    var n = a.shift()
    if (!(n in o)) o[n] = {}
    o = o[n]
  }
  o[a[0]] = value
}

export const get = (obj, path) => {
  let e = Array.isArray(path) ? path : typeof path === 'string' ? path.split('.') : path,v,i;
  for (v = obj, i = 0; v && i < e.length; ++i) {
    v = v[e[i]];
  }
  return v;
};

/* 
  build form output object
*/
export const buildFormOutput = (blocks) => {
  const out = {}
  blocks.map((el)=>{
    el.attrs.outputValue ? setByPath(out, el.attrs.outputValue, el.attrs.defaultValue || '') : null
  })
  return out
}
