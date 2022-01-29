/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useApp } from "store";
import { getBy } from "helpers";

const data = {
  rrr:0,
  oojo:[
    {
      ss:"asdsad",
      tt:'dasdsadsa'
    }
  ],
  SET:0,
  foo:"bar",
  aaa:{
    ala:"beee",
    mela:"eee",
    ss:"sad23"
  },
  alek:["jeden","dwa"]
}


export const Console: React.FC = () => {

const [selected, setSelected] = useState(0);
const [help, setHelp] = useState([]);
const [command, setCommand] = useState('');
const [output, setOutput] = useState(<h1>NPress.console vo.i</h1>);

  const getData = (path) =>{
    const last = command.split('.')[command.split('.').length-1]
    if(path){
      const dTarget = getBy(data,path)
      if(dTarget){
        // TODO number condition not working
        if(typeof dTarget === 'string' || typeof dTarget === 'number'){
          setOutput(<>{output}<p className="text-indigo-400">Path return {dTarget} </p></>)
        }else{
          setHelp(Object.keys(dTarget))
        }
      }else{
        setHelp(Object.keys(data).filter( 
          (str) => { return str.includes(command[command.length-1])} 
        ))
      }
    }else{  
      setHelp(Object.keys(data))
    }
  }
  
  const consoleKeysEvent = (e) => {
    e.preventDefault()
    if(e.key == 'Enter'){
      setCommand('')
    }
    switch (e.key) {
      case 'Shift':
        // dont print
      break;
      case 'Alt':
        // dont print
      break;
      case 'AltGraph':
        // dont print
      break;
      case 'Control':
        // dont print
      break;
      case 'ArrowUp':
        selected > 0 
          ? setSelected(parseInt(selected)-1)
          : setSelected(help.length-1)
      break;
      case 'ArrowDown':
        selected < help.length-1 
          ? setSelected(parseInt(selected)+1)
          : setSelected(0)
      break;
      case 'ArrowLeft':
          const a = command.split('.').slice(0, -1)
          setCommand(a.join('.'))
      break;
      case 'ArrowRight':
          setCommand(command+'>')
      break;
      case 'Tab':
        getData(getPipePart(command))
      break;
      case 'Escape':
        setHelp([])
      break;
      case 'Enter':
        if(command){
          const sep = command.charAt(command.length - 1) == '>' ? '' : '.'
          setCommand(command+sep+help[selected])
        }else{
          setCommand(help[selected])
        }
        setHelp([])
      break;
      case 'Backspace':
        setCommand(command.substring(0, command.length - 1))
      break;
      default:
        setCommand(command+e.key)
    }
    
  }
  return (
    <pre 
    suppressContentEditableWarning={true}
      onKeyDown={(e) => consoleKeysEvent(e)} 
      contentEditable="true" 
      style={{caretColor: "transparent"}}
      className="p-1 bg-gray-900 text-white fixed w-1/4 right-0 h-full font-mono text-sm"
    >
      <div className="border-b pb-1 mb-1 border-pink-500">{output}</div>
      <div className="border-b border-pink-500 pb-1 mb-1 "></div>
      {help.length > 0 && <div className="border-t border-gray-600 text-indigo-300">
        {help.length > 0 
          ? help.map((el, i)=><div
              key={i} 
              className={`py-px px-1 border-b border-gray-600 ${selected === i ? 'bg-gray-700' : null}`}>{el}</div>)
          : <span>nothing math</span> 
      }
      </div>}
      <div>{command}<span className="bg-gray-200">&nbsp;</span></div>
    </pre>
  );
};



const getPipePart = (cmd) => {
  return cmd ? cmd.split('>').pop() : cmd
}


// /* TODO fix type */
// // @ts-ignore
// // @ts-nocheck
// import React, { useState } from "react";
// import { useApp } from "store";
// import { getBy } from "helpers";

// // const data = {
// //   this: 0,
// //   display:0,
// //   router: 0,
// //   forms: 0,
// //   queries: 0,
// //   custom: 0,

// //   SET: 0,
// //   PUSH: 0,
// //   FIND: 0,
// //   REMOVE: 0,
// //   IF: 0,
// //   ARRAY: 0,
// //   OBJECT: 0,
// //   TRUE: 0,
// //   FALSE: 0,
// //   UID: 0,
// //   RELOAD: 0,
// //   CREATEBLOCK: {
// //     'layout/Grid':0,
// //     'layout/Paragraph':0,
// //   },
// //   ADDCLASS: {},
// //   REMOVECLASS: 0,
// // }



// let helpCommands = [];
// const mergeScript = (d,s) => {
//   const a = s.split('>');
//   a[a.length-1] = d
//   return a.join('>')
// }


// export const Console: React.FC = () => {
//   const data = {
//     this:0,
//     queries: useApp((state) => state.queries),
//     forms: useApp((state) => state.forms),
//     custom: useApp((state) => state.custom),
//     router: useApp((state) => state.router)
//   };
//   const [script, setScript] = useState('');
//   const [output, setOutput] = useState('');
//   const [selectedHelp, setSelectedHelp ] = useState(false);
//   const consoleKeysEvent = (e) => {
//     e.preventDefault()
//     if(e.key == 'Enter'){
//       setScript('')
//     }
//     switch (e.key) {
//       case 'Shift':
//         // dont print
//       break;
//       case 'Alt':
//         // dont print
//       break;
//       case 'AltGraph':
//         // dont print
//       break;
//       case 'Control':
//         // dont print
//       break;
//       case 'ArrowUp':
//         if(selectedHelp) { 
          
//           setSelectedHelp(parseInt(selectedHelp)-1)
//           setScript(mergeScript(Object.keys(data)[selectedHelp-2],script))
          
//         }
//       break;
//       case 'ArrowDown':
//         if(selectedHelp) { 

//           setSelectedHelp(parseInt(selectedHelp)+1)
//           setScript(mergeScript(Object.keys(data)[selectedHelp],script))

//         }
//       break;
//       case 'Tab':
//         if(selectedHelp){
//           const partOfSctipt = script.split('>').pop();
//           const deep = getBy(data,partOfSctipt)
//           if(typeof deep === 'object' && deep !== null ) {
//            helpCommands = Object.keys(deep)
//            setSelectedHelp(1) 
//           }
//           console.log(Object.keys(deep))
//         }else{
//           const partOfSctipt = script.split('>').pop();
//           helpCommands = partOfSctipt 
//             ? Object.keys(data).filter(function (str) { return str.includes(partOfSctipt)})
//             : Object.keys(data)
//           setSelectedHelp(1);
//           helpCommands.length>0 
//             ? setScript(mergeScript(helpCommands[0],script)) 
//             : null
//         }
//       break;
//       case 'Enter':
//         if(selectedHelp){
//            helpCommands = script 
//             ? Object.keys(data).filter(function (str) { return str.includes(script)})
//             : Object.keys(data)
//           setSelectedHelp(false);
//           setScript(mergeScript(helpCommands[0],script))
//         }else{
//           setSelectedHelp(false)
//           setOutput(<>{output}<p className="text-pink-500">Out: {script}</p></>)
//         }
        
        
//       break;
//       case 'Backspace':
//         setScript(script.substring(0, script.length - 1))
//       break;
    
//       default:
//         setSelectedHelp(false)
//         setScript(script+e.key)
//     }
    
//   }
//   return (
//     <div 
//       onKeyDown={(e) => consoleKeysEvent(e)} 
//       contentEditable="true" 
//       style={{caretColor: "transparent"}}
//       className="p-1 bg-gray-900 text-white fixed w-1/4 right-0 h-full font-mono text-sm"
//     >
//       <div className="border-b pb-1 mb-1 border-pink-500">{output}</div>
//       <div key={selectedHelp} className="border-b border-pink-500 pb-1 mb-1 "></div>
//       {selectedHelp != false && <div className="border-t border-gray-600 text-indigo-300">
//         {helpCommands.length > 0 
//           ? helpCommands.map((el, i)=><div 
//               className={`py-px px-1 border-b border-gray-600 ${selectedHelp == i+1 ? 'bg-gray-700' : null}`}>{el}</div>)
//           : <span>nothing math</span> 
//       }
//       </div>}
//       <div>{script}<span className="bg-gray-200">&nbsp;</span></div>
//     </div>
//   );
// };

