import { memo } from "react";
import { parseBlockAttrs, fieldHead } from "helpers";
import { useApp } from "store";

// TODO - add vlid types
interface Props {
  attrs: any;
}
const InputField: React.FC<Props> = ({ attrs, children }) => {
  attrs = attrs.dataTarget ? parseBlockAttrs(attrs) : attrs;
  const { updateData, ref } = fieldHead(useApp, attrs);

  if (attrs.default && ref) {
    updateData({
      ref: ref,
      path: attrs.outputValue,
      data: attrs.default,
      store: "forms",
    });
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
          ref
            ? updateData({
                ref: ref,
                path: attrs.outputValue,
                data: e.target.value,
                store: "forms",
              })
            : null;
        }}
      />
      {children}
    </div>
  );
};
export default InputField;
