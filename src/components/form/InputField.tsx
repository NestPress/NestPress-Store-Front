import { memo } from "react";
import { runCommands, fHead } from "helpers";
import { useApp, getFromStore } from "store";
import { useRouter } from "next/router";

// TODO - add vlid types
interface Props {
  attrs: any;
}
const InputField: React.FC<Props> = memo(({ attrs, children }) => {
  const router = useRouter()
  const [pAttrs, ref] = fHead(useApp, attrs, router)

  return (
    <div className={`block ${pAttrs.classes}`}>
      {pAttrs.label ? (
        <label className="text-gray-700 text-xs">{attrs.label}</label>
      ) : null}
      <input
        placeholder={pAttrs.placeholder}
        className="bg-white p-4 rounded-sm w-full text-gray-500 text-sm border mt-1"
        type={pAttrs.type || "text"}
        defaultValue={pAttrs.default}
        onChange={(e) => {
           runCommands(
            [`${e.target.value}>SET>display.blocks.${ref.attrs.index}.attrs.variables.${pAttrs.outputValue}`], 
            router, pAttrs
          );
        }}
      />
      {children}
    </div>
  );
});
export default InputField;
