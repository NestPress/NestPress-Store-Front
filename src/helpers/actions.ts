import { setToStore, getFromStore, pushToStore } from "store";
import { v4 as uuidv4 } from 'uuid';

export const runCommands = (cmd: []) => {
  const cmdList = ['SET','PUSH','FIND', 'UID']
  for (const i in cmd) {  
    const c = cmd[i].split('>')
    for (const j in c) { 
      const sanitCMD = c[j].split(' -')
      if(cmdList.includes(sanitCMD[0])){
        commands[sanitCMD[0]]({prev:c[j-1],next:c[parseInt(j)+1],params:sanitCMD})
      }else{
        commands.storeRef = findStorage(c[j])
        commands.dataRef = getFromStore(commands.storeRef)

      }
    }
  }
       // console.log(getFromStore({store:"custom"}),getFromStore({store:"forms"}))
};

/* 
  prepare value type
*/
export const findStorage = (val) => {
  const arr = val.split('.');
  return (
    arr[0] === 'custom' || 
    arr[0] === 'forms' || 
    arr[0] === 'queries' || 
    arr[0] === 'router' || 
    arr[0] === 'display')
    ? { store: arr[0], ref: arr.slice(1).join('.') }
    : { store: null, ref: arr[0] }
}

/* 
  runable commands
*/
const commands = {
  dataRef:{},
  storeRef:{},
  SET:(_in) => {
    setToStore( {data:commands.dataRef, ...findStorage(_in.next)})
  },
  FIND:(_in) => {
    commands.dataRef = commands.dataRef.find(el => el[_in.params[1]] === _in.params[2])
  }, 
  PUSH:(_in) => {
    pushToStore( {data:commands.dataRef, ...findStorage(_in.next)} )
  }, 
  UID:(_in) => {
    commands.dataRef = uuidv4();
  }, 
}