/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { useBlocks, useForms } from "store";
import { findOutByBlock } from "components/blocks/helpers/blocks";

import { FiToggleLeft, FiToggleRight } from "react-icons/fi";
import React, { useState } from "react";
interface Props {
  attrs: any;
}
const SwithField: React.FC<Props> = ({ attrs, children }) => {
  const blocks = useBlocks((state) => state.blocks);
  const updateForm = useForms((state) => state.updateForm);
  const ref = findOutByBlock(blocks, attrs.id, "form/Form").attrs.refName;

  const [active, setActive] = useState(false);
  return (
    <div className={`block ${attrs.classes}`}>
      {attrs.label ? (
        <label className="text-gray-700 text-xs">{attrs.label}</label>
      ) : null}
      <div
        className="text-3xl p-1 cursor-pointer"
        onClick={(e) => {
          setActive(!active);
          updateForm({
            ref: ref,
            path: attrs.outputValue,
            data: e.target.value,
          });
        }}
      >
        {!active ? (
          <div className="text-gray-600">
            <FiToggleLeft />
          </div>
        ) : (
          <div className="text-green-600">
            <FiToggleRight />
          </div>
        )}
      </div>
      {children}
    </div>
  );
};
export default SwithField;
