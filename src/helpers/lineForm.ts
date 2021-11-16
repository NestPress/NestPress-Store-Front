/* get and prepare data from query */   
export const prepareFromQuery = (form:any, data:any, formConst:any) => {
    walk(form, (k:any,v:any) => {
        if(typeof v === "object" && v?.inputPath){ 
          v.defaultValue = get(data, v?.inputPath)
        } 
        if(typeof v === "object" && v?.formConst){ 
            v.input = {value: get(formConst, v?.formConst)}
        } 
    }); 
}
/* set prepare data to mutation */   
export const prepareToMutate = (form:any) => {
    const out = {}
    walk(form, (k:any,v:any) => {
        typeof v === "object" && v?.outputPath 
            ? set(out, v.input.value ,v.outputPath.split('.'))
            : null
    });
    return out
}

/* ------- */ 
/* private */  

const walk = (o:any, f:any) => {
  for (const i in o) {
    if(!o.tagName){
        f.apply(this,[i,o[i]]);  
        if (o[i] !== null && typeof(o[i])=="object") {
          walk(o[i], f);
        } 
    }
  }
}

const set = (ob:any, value:any, path:string) => {
    for (let i = 0; i < path.length - 1; i++){
        ob?.[path[i]] ? null : ob[path[i]] = {}
        ob = ob?.[path[i]];
    }
    // TODO The left-hand side of an assignment expression may not be an optional property access
    // @ts-ignore: Unreachable code error
    ob?.[path[i]] = value;
}

const get = (ob:any, path:string) =>{
    const p = path.split('.')
    for (let i = 0; i < p.length; i++){
        ob = ob?.[p[i]];
    };
    return ob;
};

const insert = (arr:any, index:number, value:any) => arr.splice(index, 1, value)

const flatten = (ob:any) => {
    const out:any = {};
    for (var i in ob) {
        if (!ob.hasOwnProperty(i)) continue;
        if ((typeof ob[i]) == 'object' && ob[i] !== null) {
            var flatObject = flatten(ob[i]);
            for (var x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) continue;
                out[i + '.' + x] = flatObject[x];
            }
        } else {
            out[i] = ob[i];
        }
    }
    return out;
}

// transform to submitted data from array formschema directly
// const path = [], out = {}
// for (const [key, value] of Object.entries(flattenObject(form))) {
//   if(key.search('name') != -1){
//     const deep = (key.match(/.fields./g) || []).length
//     const deepMargin = deep - path.length + 1;
//     insert(path, deep, value)
//     if(deepMargin < 0){
//       path = path.slice(0, deepMargin )
//     }
//     set(out, {}, path)
//   }   
// }
// console.log(out)
