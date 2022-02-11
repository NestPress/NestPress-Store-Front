// @ts-ignore
import { v4 as uuidv4 } from "uuid";
import { setToStore, getFromStore, pushToStore } from "store";
import { transformNumStringToInt,getBy } from "helpers";

export const actionsSchema = {
  SET: "~SET left value to right > target",
  PUSH: "~PUSH left value to right > target",
  FIND: "~FIND value and set as left",
  MAP: "~MAP left to right by params",
  ISTRUE: "stop pipe is left value isnt true",
  ISFALSE: "stop pipe is left value isnt false",
  ARRAY: "~ARRAY return empty array",
  OBJECT: "~OBJECT return empty object",
  UID: "~UID return unique string",
  RELOAD: {
    "-Page/home": 0,
    "-Panel/profile": 0,
  },
  REMOVE: "~REMOVE left value",
  // custom actions - create blocks
  $FOCUS: {
    params: { 
      "-Id": ['display.blocks>MAP -flatmap -id']  
    },
    actions: [
      "param.0>ISTRUE>display.blocks>FIND -id -param.0>SET>custom.activeTargeter",
      "param.0>ISFALSE>display.blocks>FIND -post -router.slugPath.1>SET>custom.thisPageBlocks>custom.thisPageBlocks.0>SET>custom.activeTargeter",
    ],
  },
  // _IDS: {
  //   params: null,
  //   actions:[
  //     'display.blocks>LIST>id:id',
  //     'display.blocks>LIST>name:block',
  //   ]
  // }
};

const customAction = {
  foo: ["pipe1", "pipe2", "pipe${param.1}"],
};

export const runCommands = (cmd: any, router: any, attrs = {}) => {
  const cmdList = Object.keys(actionsSchema);
  commands.router = router;
  cmd.forEach((unit) => {
  //for (const i in cmd) {
    /*  execute n'th pipe */
    unit.split(">").forEach((c,j) => {
      /*  execute pipe parts */
      const sanitCMD = c[j].split(" -");
      if (cmdList.includes(sanitCMD[0])) {
        /*  sanit and run commands */
        if (sanitCMD[0].charAt(0) == "$") {
          /*  run custom command */
          commands["CUSTOM_COMMAND"]({
            prev: c[j - 1],
            next: c[j + 1],
            params: sanitCMD,
          });
        } else {
          /*  run regular command */
          commands[sanitCMD[0]]({
            prev: c[j - 1],
            next: c[j + 1],
            params: sanitCMD,
          });
        }
        /*  break after ISTRUE or ISFALSE condition */
        if (commands.dataRef == "__throw") throw {};
      } else {
        /*  sanit and get data from pipe */
        commands.attrs = attrs;
        commands.storeRef = findStorage(c[j]);
        commands.storeRef
          ? (commands.dataRef = getFromStore(commands.storeRef))
          : null;
      }
      /*  finish process */
      if (c.length - 1 == parseInt(j)) {
        setToStore({ store: "actions", ref: `output`, data: commands.dataRef });
      }
      
    });

    
  })
};

/* 
  prepare value type
*/
export const findStorage = (val: String) => {
  const arr = val.split(".");
  return arr[0] === "custom" ||
    arr[0] === "forms" ||
    arr[0] === "queries" ||
    arr[0] === "router" ||
    arr[0] === "params" ||
    arr[0] === "display"
    ? { store: arr[0], ref: arr.slice(1).join(".") }
    : arr[0] === "this"
    ? { store: "this", ref: arr.slice(1).join(".") }
    : { store: null, ref: arr[0] };
};

/* 
  runable commands
*/
const commands: any = {
  dataRef: {},
  storeRef: {},
  attrs: {},
  router: {},
  SET: (_in: any) => {
    const input = findStorage(_in.next);
    if (input.store === "this") {
      commands.dataRef = transformNumStringToInt(commands.dataRef);
      setToStore({
        store: "display",
        ref: `blocks.${commands.attrs.index}.attrs.${input.ref}`,
        data: commands.dataRef,
      });
    } else {
      setToStore({ data: commands.dataRef, ...findStorage(_in.next) });
    }
  },
  FIND: (_in: any) => {
    commands.dataRef = commands.dataRef.find(
      (el: any) => el[_in.params[1]] === _in.params[2]
    );
  },
  PUSH: (_in: any) => {
    const input = findStorage(_in.next);
    if (input.store === "this") {
      const block = `blocks.${commands.attrs.index}`;
      getFromStore({ store: "display", ref: `${block}.attrs.${input.ref}` });
      if (
        !Array.isArray(
          getFromStore({ store: "display", ref: `${block}.attrs.${input.ref}` })
        )
      ) {
        setToStore({
          store: "display",
          ref: `${block}.attrs.${input.ref}`,
          data: [_in.prev],
        });
      } else {
        pushToStore({
          store: "display",
          ref: `${block}.attrs.${input.ref}`,
          data: _in.prev,
        });
      }
    } else {
      commands.dataRef = transformNumStringToInt(commands.dataRef);
      pushToStore({ data: commands.dataRef, ...findStorage(_in.next) });
    }
  },
  MAP: (_in: any) => {
    // first param could be -flatmap (map to flat values array)
    const input = findStorage(_in.prev);
    if (input.store === "this") {
      console.log('left>', getBy(commands.attrs, input.ref ))
      console.log('params>', _in.params)
      // const block = `blocks.${commands.attrs.index}`;
      // pushToStore({
      //   store: "display",
      //   ref: `${block}.attrs.${input.ref}`,
      //   data: _in.prev,
      // });
    }
    // getFromStore({ store: "display", ref: `${block}.attrs.${input.ref}` });
    // console.log("map", findStorage(_in.prev), this);
  },
  ISTRUE: (_in: any) => {
    commands.dataRef ? null : (commands.dataRef = "__throw");
  },
  ISFALSE: (_in: any) => {
    commands.dataRef ? (commands.dataRef = "__throw") : null;
  },
  ARRAY: (_in: any) => {
    commands.dataRef = [];
  },
  OBJECT: (_in: any) => {
    commands.dataRef = {};
  },
  UID: (_in: any) => {
    commands.dataRef = uuidv4();
  },
  RELOAD: (_in: any) => {
    commands.router.push(findStorage(_in.params[1]).ref);
  },
  CUSTOM_COMMAND: (_in: any) => {
    console.log("runCustomCommand", findStorage("params"));
  },
};

// TODO
// test 'this' edge cases
// add BOLLEAN command

// Examples
// Post>SET>this.variables.filter.postType.eq
// router.slugPath>PUSH>this.variables.filter.postType.in
// bg-red-100 p-4 text-xl>SET>display.blocks.0.attrs.classes
// bar>SET>custom.foo
// display.blocks>FIND -id -3c951451-fc92-4310-8956-0bbda2820cd1>SET>custom.block
// UID>SET>custom.block.id
// custom.block>PUSH>display.blocks
// RELOAD -/Page/events/${forms.filterForm.subject}/${forms.filterForm.city}
