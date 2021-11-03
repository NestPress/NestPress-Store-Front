// https://blog.logrocket.com/building-a-custom-dropdown-menu-component-for-react-e94f02ced4a1/
import { FiChevronDown, FiX } from "react-icons/fi";
import React, { useState } from 'react';
import { categoryType } from 'types/layout'

// TODO - add vlid types
interface Props {
  label?: string;
  placeholder?: string;
  value?: string;
  className?: string;
  options?: any;
  list?: any
}

export const SelectField: React.FC<Props> = ({ label, value, placeholder, options, className }) => {
  const [active, setActive] = useState(false);
  const [activeValue, setActiveValue] = useState(value);
  return (
    <>
      {active ? 
        <div onClick={() => { setActive(false); }}  className="fixed top-0 left-0 w-full h-full bg-gray-900 opacity-50 z-10"></div> : null
      }
      <div className={`relative text-sm  ${className}  ${active?'z-10':null}`}>
        { label ? <label>{label}</label> : null }
        <input 
          className="bg-white p-2.5 pr-12 rounded-sm w-full border"
          type="text" 
          defaultValue={activeValue} 
          onChange={e => setActiveValue(e.target.value)}
        />
        {/* dropdownicon */}
        <div 
          style={{transform:'scale(0.95)', transformOrigin:'top'}}
          className="absolute w-11 h-auto p-3.5 m-px border-l border-gray-300 top-0 right-0 bg-white rounded-r flex items-center justify-center cursor-pointer"
          onClick={() => setActive(!active)}
          >
          { active ? <FiX/> : <FiChevronDown/> }
          
        </div>

        {/* options*/}
        {active ? 
          <ul className="w-full md:w-auto absolute text-left bg-white mt-1 rounded-sm flex flex-col right-0 cursor-pointer z-10">
            {options && options.map((el:categoryType)=>{
              return <li 
                onClick={() => { setActiveValue(el.value); setActive(!active); }} 
                className="px-3 py-1 leading-8 border-b hover:bg-gray-100">{el.label}</li>
            })}
          </ul>
        : null}
      </div>
   </>
  );
};