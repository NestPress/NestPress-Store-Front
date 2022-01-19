/* TODO fix type */
// @ts-ignore
// @ts-nocheck

import { runCommands } from "helpers";
interface Props {
  attrs: any;
}
const ActionButton: React.FC<Props> = ({ attrs, children }) => {
  return (
    <button
      onClick={() => {
        runCommands([
          "display.blocks>FIND -id -3c951451-fc92-4310-8956-0bbda2820cd1>SET>custom.block>UID>SET>custom.block.id",
          "custom.block>PUSH>display.blocks",
        ]);
      }}
      className={`block select-none flex items-center border-b-2 border-gray-600 border-opacity-20 action-background text-white px-5 py-2 rounded-sm w-full ${attrs.classes}`}
    >
      {attrs.title ? <div>{attrs.title}</div> : null}
      {children}
    </button>
  );
};
export default ActionButton;
