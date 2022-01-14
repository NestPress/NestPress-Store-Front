/* TODO fix type */
// @ts-ignore
// @ts-nocheck

import { useBlocks, useForms } from "store";
import { findOutByBlock } from "components/blocks/helpers/blocks"

interface Props {
  attrs: any;
}
const KeyValueField: React.FC<Props> = ({ attrs }) => {
  const blocks = useBlocks((state) => state.blocks);
  const updateForm = useForms((state) => state.updateForm);
  const ref = findOutByBlock(blocks, attrs.id, 'form/Form').attrs.refName

  return (
    <div className="">
      {attrs.label ? (
        <label className="text-gray-700 text-xs">{attrs.label}</label>
      ) : null}
      <div className="grid grid-cols-5 gap-1">
        <input
          placeholder={attrs.placeholder1 || 'key'}
          className="col-span-2 bg-white p-3 rounded-sm w-full text-gray-500 text-sm border mt-1"
          type="text"
          onChange={(e)=>{ 
            updateForm({ref:ref, path:`${attrs.outputValue}.key`, data:e.target.value}) 
          }}
        />
        <input
          placeholder={attrs.placeholder2 || 'value'}
          className="col-span-2 bg-white p-3 rounded-sm w-full text-gray-500 text-sm border mt-1"
          type="text"
          onChange={(e)=>{ 
            updateForm({ref:ref, path:`${attrs.outputValue}.value`, data:e.target.value}) 
          }}
          
        />
        <button className="bg-blue-400 w-full p-2 rounded mt-1 text-white hover:bg-blue-500">{attrs.submit || 'Insert'}</button>
      </div>
      
    </div>
  );
};
export default KeyValueField;