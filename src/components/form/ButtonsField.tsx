/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { memo, useState } from "react";
import { useApp } from "store";
import { parseBlockAttrs, fieldHead } from "helpers";

interface Props {
  attrs: any;
}

const ButtonsField: React.FC<Props> = memo(({ attrs, children }) => {
  attrs = attrs.dataTarget ? parseBlockAttrs(attrs, useQueries) : attrs;

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

  const [active, setActive] = useState(false);
  const [activeValue, setActiveValue] = useState(attrs.value);

  return (
    <div className={`block ${attrs.classes}`}>
      {attrs.label ? (
        <label className="text-gray-700 text-xs">{attrs.label}</label>
      ) : null}
      {attrs.options.length &&
        attrs.options.map((el, i) => {
          return (
            <div
              onClick={(e) => {
                setActiveValue(el.value);
                setActive(i);
                updateData({
                  ref: ref,
                  path: attrs.outputValue,
                  data: e.target.value,
                  store: "forms",
                });
              }}
              className={`${
                active == i
                  ? "border-blue-600 text-gray-800"
                  : "border-gray-200 text-gray-500 cursor-pointer"
              } block select-none flex items-center border border-b-2  border-opacity-80 px-5 py-2 rounded-sm w-full`}
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
