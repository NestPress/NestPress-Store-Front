/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { useForms, useQueries, useActions } from "store";
import { FiDatabase } from "react-icons/fi";
import JSONViewer from 'react-json-viewer';
import { JsonView } from "components/blocks";
import React, { useState } from "react";


export const Data: React.FC = () => {
  
  const forms = useForms((state) => state.forms);
  const queries = useQueries((state) => state.queries);
  const pageData = useForms((state) => state.pageData);
  const globalData = useForms((state) => state.globalData);
  const actions = useActions((state) => state.actions);

  const [active, setActive] = useState('');
  
  const buttonClass =
    " bg-blue-400 w-full p-2 rounded mt-1 text-white hover:bg-blue-500 flex items-center";
  const buttonDeleteClass =
    " bg-red-400 w-full p-2 rounded mt-1 text-white hover:bg-red-500 flex items-center";

    console.log(queries)

  return(
   <div>
      <div className="p-2 flex items-center bg-pink-600 text-white">
          <FiDatabase />
          <span className="ml-2">Data store</span>
          <span className="ml-2 text-xs flex-1 text-right">
            
          </span>
      </div>
      

      <div>
        <div className="p-2 border-b cursor-pointer" 
          onClick={e => setActive(active==='queries' ? '' : 'queries')}>Queries data</div>
        {active==='queries' && <JsonView data={queries} />}
        <div className="p-2 border-b cursor-pointer" 
          onClick={e => setActive(active==='forms' ? '' : 'forms')}>Forms data</div>
        {active==='forms' && <JsonView data={forms} />}
        <div className="p-2 border-b cursor-pointer" 
          onClick={e => setActive(active==='page' ? '' : 'page')}>Page data</div>
        {active==='page' && <JsonView data={pageData} />}
        <div className="p-2 border-b cursor-pointer" 
          onClick={e => setActive(active==='global' ? '' : 'global')}>Global data</div>
        {active==='global' && <JsonView data={globalData} />}
      </div>
      <div className="p-2 border-b bg-pink-600 text-white" >
        Actions
      </div>
      <div>
        {actions.map(el=>{
          return (<div className={`px-2 py-1 text-xs border-b ${el.type === 'success' ? 'bg-green-100' : 'bg-red-100'}`}>
            <div>{el.key} {el.type}</div> {JSON.stringify(el.value) ? <textarea style={{resize: 'none', overflow:'hidden', background:'transparent'}} className="w-full">{JSON.stringify(el.value)}</textarea> : el.value}
          </div>)
        })}
      </div>
      
      
      

      {/* <pre className="text-xs">{JSON.stringify(forms, null, 2)}</pre>*/}
    </div>
  )
}