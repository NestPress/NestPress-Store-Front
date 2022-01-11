/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { memo } from "react";
import { useState } from "react";
import { useBlocks, useForms, useQueries } from "store";
import { findOutByBlock, parseBlockAttrs } from "components/blocks/helpers/blocks"
interface Props {
  attrs: any;
}
const ButtonsField: React.FC<Props> = memo(({ attrs, children }) => {
  
  attrs = attrs.dataTarget ? parseBlockAttrs(attrs, useQueries) : attrs
  
  const blocks = useBlocks((state) => state.blocks);
  const updateForm = useForms((state) => state.updateForm);
  const ref = findOutByBlock(blocks, attrs.id, 'form/Form')?.attrs?.refName

  if(attrs.default && ref){
    updateForm({ref:ref, path:attrs.outputValue, data:attrs.default})
  }

  const [active, setActive] = useState(false);
  const [activeValue, setActiveValue] = useState(attrs.value);

  return (
    <div  className={`block ${attrs.classes}`}>
      {attrs.label ? (
        <label className="text-gray-700 text-xs">{attrs.label}</label>
      ) : null}
      {attrs.options.length &&
        attrs.options.map((el,i) => {
          return (
            <div
              onClick={() => {
                setActiveValue(el.value);
                setActive(i);
                updateForm({ref:ref, path:attrs.outputValue, data:el.value}) 
              }}
              className={`${active == i ? 'border-blue-600 text-gray-800' : 'border-gray-200 text-gray-500 cursor-pointer'} block select-none flex items-center border border-b-2  border-opacity-80 px-5 py-2 rounded-sm w-full`}
            >
              {el.label}
            </div>
          );
        })}
      {children}
    </div>
  );
});
export default ButtonsField;
