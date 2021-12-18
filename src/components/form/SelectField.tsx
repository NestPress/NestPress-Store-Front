/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { useBlocks, useForms } from "store";
import { findOutByBlock } from "components/blocks/helpers/blocks"

// https://blog.logrocket.com/building-a-custom-dropdown-menu-component-for-react-e94f02ced4a1/
import { FiChevronDown, FiX } from "react-icons/fi";
import { useState } from "react";
import { categoryType } from "types/layout";

// TODO - add vlid types
interface Props {
  attrs: any;
}

  // label?: string;
  // placeholder?: string;
  // value?: string;
  // options?: any;

const SelectField: React.FC<Props> = ({attrs}) => {
  const blocks = useBlocks((state) => state.blocks);
  const updateForm = useForms((state) => state.updateForm);
  const ref = findOutByBlock(blocks, attrs.id, 'form/Form').attrs.refName

  const [active, setActive] = useState(false);
  const [activeValue, setActiveValue] = useState(attrs.value);
  return (
    <>
      {active ? (
        <div
          onClick={() => {
            setActive(false);
          }}
          className="fixed top-0 left-0 w-full h-full bg-gray-900 opacity-50 z-10"
        ></div>
      ) : null}
      {attrs.label ? <label className="text-xs">{attrs.label}</label> : null}
      <div
        className={`relative text-sm ${active ? "z-10" : null}`}
      >
        
        <input
          className="bg-white p-2.5 pr-12 rounded-sm w-full border"
          type="text"
          defaultValue={activeValue}
          onChange={(e)=>{ 
            setActiveValue(e.target.value)
            updateForm({ref:ref, path:attrs.outputValue, data:e.target.value}) 
          }}
        />
        {/* dropdownicon */}
        <div
          style={{ transform: "scale(0.95)", transformOrigin: "top" }}
          className="absolute w-11 h-auto p-3.5 m-px border-l border-gray-300 top-0 right-0 bg-white rounded-r flex items-center justify-center cursor-pointer"
          onClick={() => setActive(!active)}
        >
          {active ? <FiX /> : <FiChevronDown />}
        </div>

        {/* options*/}
        {active ? (
          <ul className="w-full md:w-auto absolute text-left bg-white mt-1 rounded-sm flex flex-col right-0 cursor-pointer z-10">
            {attrs.options &&
              attrs.options.map((el: categoryType) => {
                return (
                  <li
                    onClick={() => {
                      setActiveValue(el.value);
                      setActive(!active);
                      updateForm({ref:ref, path:attrs.outputValue, data:e.target.value}) 
                    }}
                    className="px-3 py-1 leading-8 border-b hover:bg-gray-100"
                  >
                    {el.label}
                  </li>
                );
              })}
          </ul>
        ) : null}
      </div>
    </>
  );
};
export default SelectField;
