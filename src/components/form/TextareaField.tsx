// @ts-nocheck
import { memo } from "react";
import { runCommands, fHead } from "helpers";
import { useApp, getFromStore } from "store";
import { useRouter } from "next/router";

interface Props {
  attrs: any;
}
const TextareaField: React.FC<Props> = memo(({ attrs, children }) => {
  const router = useRouter()
  const [pAttrs, ref] = fHead(useApp, attrs, router)

  return (
    <div className={`block ${pAttrs.classes}`}>
      {pAttrs.label ? (
        <label className="text-gray-700 text-xs">{pAttrs.label}</label>
      ) : null}
      <textarea
        rows={pAttrs.rows}
        placeholder={pAttrs.placeholder}
        className="bg-white p-3 rounded-sm w-full text-gray-500 text-sm border mt-1"
        type={pAttrs.type || "text"}
        defaultValue={pAttrs.default}
        onChange={(e) => {
          ref
            ? runCommands(
              [`${e.target.value}>SET>display.blocks.${ref.attrs.index}.attrs.variables.${pAttrs.outputValue}`], 
              router, pAttrs
            )
            : null;
        }}
      />
      {children}
    </div>
  );
});
export default TextareaField;
