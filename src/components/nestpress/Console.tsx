/* TODO fix type */
// @ts-ignore
// @ts-nocheck
// change focus example
// https://stackblitz.com/edit/focushook?file=index.js

import React, { useState, useEffect } from "react";
import { useApp } from "store";
import { getBy, runCommands, actionsSchema } from "helpers";
import { JSONview } from ".";
import { HelpList } from "components/nestpress/console/HelpList";



// const consoleSchema = {
//   SET: '~SET left value to right > target',
//   PUSH: '~PUSH left value to right > target',
//   FIND: '~FIND value and set as left',
//   REMOVE: '~REMOVE left value',
//   FALSE: '~FALSE return boolean false',
//   UID: '~UID return unique string',
//   RELOAD: {
//     '-Page/home':0,
//     '-Panel/profile':0
//   },
// }



export const Console: React.FC = () => {
  const [ctrl, pressCtrl] = useState(false);
  const [shift, pressShift] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [command, printCommand] = useState('');
  const [copyLastCommand, setCopyLastCommand] = useState('');
  const [helpList, setHelpList] = useState([]);
  const [helpListIndex, setHelpListIndex] = useState(0);
  const [output, setOutput] = useState([<><h1>NPress.console vo.i</h1><p className="text-xs">Focus console and press Tab to start</p></>]);

  const data = {
      queries: useApp((state) => state.queries),
      forms: useApp((state) => state.forms),
      custom: useApp((state) => state.custom),
      router: useApp((state) => state.router),
      // this: useApp((state) => state.custom.activeTargeter),
      QUERY:{
        getPosts:{},
        getPostById:{},
        getPostBySlug:{},
        getPostTaxonomyValues:{},
        getPostTaxonomyValueById:{},
        getRelatedPosts:{},
        getRelatedPostById:{}
      },
      MUTATION:{

      },
    ...actionsSchema
  }

  const commandOut = useApp((state) => state.actions.output)
  useEffect(() =>{
    if(typeof commandOut === 'string' || typeof commandOut === 'number'){
      setOutput([...output, <p className="text-pink-400 border border-gray-800 m-px p-2 text-xs">
        <span className="mr-2">></span> 
        {commandOut}</p>])
    }
    if(typeof commandOut === 'object'){
      setOutput([...output, <p className="text-pink-400 border border-gray-800 m-px pt-2"> 
        <JSONview data={commandOut}/></p>])
    }
  }, [commandOut])

  // Print from history
  useEffect(() =>{
    const out = history[historyIndex-1];
    printCommand(`${out ? out : copyLastCommand}`)
  }, [historyIndex])

  // Find help
  // useEffect(() =>{
  //   if(helpList.length > 0){
  //     console.log('find',command)
  //   } 
  // }, [command])

  const consoleKeyDown = (e) => {
    e.preventDefault()
    switch (e.key) {
      case 'CapsLock': break;
      case 'Alt': break;
      case 'AltGraph': break;
      case 'Control':
        pressCtrl(true)
      break;
      case 'Shift':
        pressShift(true)
      break;
      case 'ArrowUp':
        if(helpList.length > 0){
          if(0 < helpListIndex){
            setHelpListIndex(parseInt(helpListIndex)-1)
          }
        }else{
          if(history.length > historyIndex){
            setHistoryIndex(parseInt(historyIndex)+1)
          }
        }
      break;
      case 'ArrowDown':
        if(helpList.length > 0){
          if(helpList.length > helpListIndex+1){
            setHelpListIndex(parseInt(helpListIndex)+1)
          }
        }else{
          if(0 < historyIndex){
            setHistoryIndex(parseInt(historyIndex)-1)
          }
        }
      break;
      case 'ArrowRight':
          printCommand(command+'>')
          setCopyLastCommand(copyLastCommand+'>')
      break;
      case 'Enter':
        if(command){ 
          runCommands([command])
          setHistory([command,...history])
          printCommand('')
          setCopyLastCommand('')
        }
      break;
      case 'Tab':
        if(helpList.length > 0){
          setHelpList([])
          console.log('createCommand', helpList[helpListIndex])
        } else{
          readHelp(parsePipe(command))
        }
      break;
      case 'Backspace':
        printCommand(command.substring(0, command.length - 1))
        setCopyLastCommand(copyLastCommand.substring(0, copyLastCommand.length - 1))
      break;
      default:
        printCommand(command+e.key)
        setCopyLastCommand(copyLastCommand+e.key)
    }
  }
  const consoleKeyUp = (e) => {
    e.preventDefault()
    switch (e.key) {
      case 'Shift':
        pressShift(false)
      break;
      case 'Control':
        pressCtrl(false)
      break;
    }
  }

  const readHelp = (parsedPipe) => {
    const last = parsedPipe[parsedPipe.length-1];
    // firstGetAll
    if(last == ''){
      setHelpList(Object.keys(data));
    }else{
      const dTarget = getBy(data, last.join('.'))
      if(typeof dTarget === 'string' || typeof dTarget === 'number'){
        // set state - command out
        // commandOut = dTarget
      }else{
        if(dTarget){
          setHelpList(Array.isArray(dTarget) ? dTarget : Object.keys(dTarget) );
        }else{
          console.log('find')
        }
      }
    }
  }
  
  return (
    <code
      autofocus
      suppressContentEditableWarning={true}
      onKeyDown={(e) => consoleKeyDown(e)} 
      onKeyUp={(e) => consoleKeyUp(e)} 
      contentEditable="true" 
      style={{caretColor: "transparent"}}
      className="p-1 bg-gray-900 text-white fixed w-1/4 right-0 h-full font-mono text-sm grid grid-rows-6"
    >
    { helpList.length == 0 && <div className="self-end border-b pb-1 mb-1 border-pink-500 overflow-hidden row-span-5">
        {output}
      </div> }  

      { helpList.length > 0 && <HelpList items={helpList} selected={helpListIndex}/> }  
     
      <div className="row-span-1">
        <span>{command}</span>
        <span className={`${shift ? 'bg-gray-600' : 'bg-gray-100'}`}>&nbsp;</span>
      </div>
    </code>
  );
};

const parsePipe = (cmd) => {
  return cmd.split('>').map(el=>el.split('.'))
}

