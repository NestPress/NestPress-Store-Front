/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { memo } from "react";
import { parseBlockAttrs } from "helpers";
interface Props {
  attrs: any;
}
const SubmitButton: React.FC<Props> = ({ attrs, children }) => {
  attrs = attrs.dataTarget ? parseBlockAttrs(attrs) : attrs;
  return (
    <button
      className={`block select-none flex items-center border-b-2 border-gray-600 border-opacity-20 action-background text-white px-5 py-2 rounded-sm w-full ${attrs.classes}`}
    >
      {attrs.title ? <div>{attrs.title}</div> : null}
      {children}
    </button>
  );
};
export default SubmitButton;
