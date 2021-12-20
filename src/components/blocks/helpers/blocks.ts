/* TODO fix type */
// @ts-ignore
// @ts-nocheck
// export const uid = () => (Math.floor(Math.random() * 9999) * 100000000 + new Date().getTime()).toString(36);

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
export const getNestedChildren = (arr: any, parent: string, withFirst: boolean) => {
    const out: any = [];
    withFirst &&  out.push(arr?.filter((x:any) => x.id === parent)[0]);
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
export const findOutByBlock:any = (regBlocks:any, currentId:number, blockName:string) => {
    const block:any = regBlocks.find(el => el.id === currentId)
    if(block.block === blockName){
      return block 
    }else{
      return findOutByBlock(regBlocks, block.parentId, blockName)
    }
  }

/* 
  set value from object by path 
*/
export const  setByPath = (ob, path, value) => {
  path = path.split(".");
  for (let i = 0; i < path.length - 1; i++) {
    ob?.[path[i]] ? null : (ob[path[i]] = {});
    ob = ob?.[path[i]];
  }
  // TODO The left-hand side of an assignment expression may not be an optional property access
  // @ts-ignore: Unreachable code error
  typeof ob === 'object' ? ob?.[path[i]] = value : null;
}

/* 
  get value from object by path 
*/
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

/* Build variables */
export const buildVariables = (variables) => {
  const out = {}
  for (const [key, value] of Object.entries(variables)) {
    setByPath(out, key, value)
  }
  return out
}

export const shortcode = (key, attrs, dataPart) => {
    const map = (attr) => {
      for (const i in attrs?.shortcodes[key]) {
        attr = attr.replaceAll('${'+attrs?.shortcodes[key][i]+'}', get(dataPart, attrs?.shortcodes[key][i]))
      }
      return attr
    }
    return (attrs?.shortcodes?.[key] && attrs.queryIndex) 
      ? map(attrs[key]) : attrs[key]
  }