import { memo } from "react";
import { parseBlockAttrs, findOutByBlock } from "helpers";
import { useApp, getFromStore } from "store";
import { useRouter } from "next/router";
import { runCommands } from "helpers";

// TODO - add vlid types
interface Props {
  attrs: any;
}
const InputField: React.FC<Props> = memo(({ attrs, children }) => {
  const router = useRouter()
  const ref = findOutByBlock(useApp((state: any) => state.display.blocks), attrs.id, "form/Form")
  attrs = attrs.dataTarget ? parseBlockAttrs(attrs) : attrs;
  if (attrs.default && ref) {
    runCommands(
      [`${attrs.default}>SET>display.blocks.${ref.attrs.index}.attrs.variables.${attrs.outputValue}`], 
      router, attrs
    );
  }

  return (
    <div className={`block ${attrs.classes}`}>
      {attrs.label ? (
        <label className="text-gray-700 text-xs">{attrs.label}</label>
      ) : null}
      <input
        placeholder={attrs.placeholder}
        className="bg-white p-3 rounded-sm w-full text-gray-500 text-sm border mt-1"
        type={attrs.type || "text"}
        defaultValue={attrs.default}
        onChange={(e) => {
          runCommands(
            [`${e.target.value}>SET>display.blocks.${ref.attrs.index}.attrs.variables.${attrs.outputValue}`], 
            router, attrs
          );
        }}
      />
      {children}
    </div>
  );
});
export default InputField;
