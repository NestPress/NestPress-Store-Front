// @ts-nocheck

import { memo } from "react";
import { parseBlockAttrs, fieldHead } from "helpers";
import { useApp } from "store";

interface Props {
  attrs: any;
}
const TextareaField: React.FC<Props> = memo(({ attrs, children }) => {
  attrs = attrs.dataTarget ? parseBlockAttrs(attrs) : attrs;
  const { blocks, updateData, ref } = fieldHead(useApp, attrs);

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
      <textarea
        rows={attrs.rows}
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
});
export default TextareaField;
