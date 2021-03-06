/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { memo } from "react";
import { useBlocks, useForms, useQueries } from "store";
import { findOutByBlock } from "components/blocks/helpers/blocks";
import { parseBlockAttrs } from "helpers";
interface Props {
  attrs: any;
}
const RelatedPost: React.FC<Props> = memo(({ attrs, children }) => {
  attrs = attrs.dataTarget ? parseBlockAttrs(attrs, useQueries) : attrs;

  const blocks = useBlocks((state) => state.blocks);
  const updateForm = useForms((state) => state.updateForm);
  const ref = findOutByBlock(blocks, attrs.id, "form/Form")?.attrs?.refName;

  if (attrs.default && ref) {
    updateForm({ ref: ref, path: attrs.outputValue, data: attrs.default });
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
            ? updateForm({
                ref: ref,
                path: attrs.outputValue,
                data: e.target.value,
              })
            : null;
        }}
      />
      {children}
    </div>
  );
});
export default RelatedPost;
