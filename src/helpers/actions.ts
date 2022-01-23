// @ts-ignore
import { v4 as uuidv4 } from "uuid";
import { setToStore, getFromStore, pushToStore } from "store";

export const runCommands = (cmd: any, router: any, attrs = {}) => {
  const cmdList = ["SET", "PUSH", "FIND", "UID", "RELOAD"];
  commands.router = router;
  for (const i in cmd) {
    const c: any = cmd[i].split(">");
    for (const j in c) {
      const sanitCMD = c[j].split(" -");
      if (cmdList.includes(sanitCMD[0])) {
        commands[sanitCMD[0]]({
          prev: c[parseInt(j) - 1],
          next: c[parseInt(j) + 1],
          params: sanitCMD,
        });
      } else {
        commands.attrs = attrs;
        commands.storeRef = findStorage(c[j], attrs);
        commands.storeRef ? commands.dataRef = getFromStore(commands.storeRef) :null
      }
    }
  }
};

/* 
  prepare value type
*/
export const findStorage = (val: String, attrs) => {
  const arr = val.split(".");
  return arr[0] === "custom" ||
    arr[0] === "forms" ||
    arr[0] === "queries" ||
    arr[0] === "router" ||
    arr[0] === "display"
    ? { store: arr[0], ref: arr.slice(1).join(".") }
    : arr[0] === "this" 
    ? { store: 'display', ref: arr.slice(1).join(".") }
    : { store: null, ref: arr[0] };
};



/* 
  runable commands
*/
const commands: any = {
  dataRef: {},
  storeRef: {},
  attrs:{},
  router: {},
  SET: (_in: any) => {
    const input = findStorage(_in.next, commands.attrs)
    if(input.store === 'display'){
      setToStore({ store:'display', ref:`blocks.${commands.attrs.index}.attrs.${input.ref}`, data: _in.prev});
    }else{
      setToStore({ data: commands.dataRef, ...findStorage(_in.next) });
    }
  },
  FIND: (_in: any) => {
    commands.dataRef = commands.dataRef.find(
      (el: any) => el[_in.params[1]] === _in.params[2]
    );
  },
  PUSH: (_in: any) => {
    const input = findStorage(_in.next, commands.attrs)
    if(input.store === 'display'){
      const block = `blocks.${commands.attrs.index}` 
      getFromStore({ store:'display', ref:`${block}.attrs.${input.ref}` })
      if(!Array.isArray(getFromStore({ store:'display', ref:`${block}.attrs.${input.ref}` }))){
        setToStore({ store:'display', ref:`blocks.${commands.attrs.index}.attrs.${input.ref}`, data: [_in.prev]});
      }else{
        pushToStore({ store:'display', ref:`${block}.attrs.${input.ref}`, data: _in.prev});
      }
    }else{
      pushToStore({ data: commands.dataRef, ...findStorage(_in.next) });
    }
  },
  UID: (_in: any) => {
    commands.dataRef = uuidv4();
  },
  RELOAD: (_in: any) => {
    commands.router.push(findStorage(_in.params[1]).ref);
  },
};





// Post>SET>this.variables.filter.postType.eq 