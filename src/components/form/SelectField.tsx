import { memo } from "react";
import { parseBlockAttrs, findOutByBlock } from "helpers";
import { useState } from "react";
import { useApp } from "store";
import { useRouter } from "next/router";
import { runCommands } from "helpers";

import { FiChevronDown, FiX } from "react-icons/fi";
import { categoryType } from "types/layout";

// TODO - add vlid types
interface Props {
  attrs: any;
}

const SelectField: React.FC<Props> = ({ attrs, children }) => {
  
  const router = useRouter()
  const ref = findOutByBlock(useApp((state: any) => state.display.blocks), attrs.id, "form/Form")
  attrs = attrs.dataTarget ? parseBlockAttrs(attrs) : attrs;
  if (attrs.default && ref) {
    runCommands(
      [`${e.target.value}>SET>display.blocks.${ref.attrs.index}.attrs.variables.${attrs.outputValue}`], 
      router, attrs
    );
  }

  const [active, setActive] = useState(false);
  const [activeValue, setActiveValue] = useState(attrs.value);
  return (
    <div className={`block ${attrs.classes}`}>
      {active ? (
        <div
          onClick={() => {
            setActive(false);
          }}
          className="fixed top-0 left-0 w-full h-full bg-gray-900 opacity-50 z-10"
        ></div>
      ) : null}
      {attrs.label ? <label className="text-xs">{attrs.label}</label> : null}
      <div className={`relative w-full text-sm ${active ? "z-10" : null}`}>
        <input
          className="bg-white p-2.5 pr-12 rounded-sm w-full border"
          type="text"
          placeholder={attrs.placeholder}
          value={activeValue}
          onChange={(e) => {
            setActiveValue(e.target.value);
            
            runCommands(
              [`${e.target.value}>SET>display.blocks.${ref.attrs.index}.attrs.variables.${attrs.outputValue}`], 
            router, attrs
          );
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
          <ul
            style={{ maxHeight: "340px" }}
            className="overflow-y-scroll w-full md:w-auto absolute text-left bg-white mt-1 rounded-sm flex flex-col right-0 cursor-pointer z-10"
          >
            {attrs.options.length &&
              attrs.options.map((el: categoryType) => {
                return (
                  <li
                    onClick={() => {
                      setActiveValue(el.value);
                      setActive(!active);
                      runCommands(
                        [`${el.value}>SET>display.blocks.${ref.attrs.index}.attrs.variables.${attrs.outputValue}`], 
                        router, attrs
                      );
                    }}
                    className="w-64 px-3 py-1 leading-8 border-b hover:bg-gray-100"
                  >
                    {el.label}
                  </li>
                );
              })}
          </ul>
        ) : null}
      </div>
      {children}
    </div>
  );
};
export default SelectField;
