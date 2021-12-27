// @ts-nocheck
import { useBlocks, useForms } from "store";
import { findOutByBlock } from "components/blocks/helpers/blocks"

interface Props {
  attrs: any;
}
const TextareaField: React.FC<Props> = ({ attrs, children }) => {
  const blocks = useBlocks((state) => state.blocks);
  const updateForm = useForms((state) => state.updateForm);
  const ref = findOutByBlock(blocks, attrs.id, 'form/Form').attrs.refName

  return (
    <div className="block">
      {attrs.label ? (
        <label className="text-gray-700 text-xs">{attrs.label}</label>
      ) : null}
      <textarea
        rows={attrs.rows}
        placeholder={attrs.placeholder}
        className="bg-white p-3 rounded-sm w-full text-gray-500 text-sm border mt-1"
        type={attrs.type || "text"}
        onChange={(e)=>{ 
          updateForm({ref:ref, path:attrs.outputValue, data:e.target.value}) 
        }}
      />
      {children}
    </div>
  );
};
export default TextareaField;
