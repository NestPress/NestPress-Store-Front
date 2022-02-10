/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { memo,useState } from "react";
import { parseBlockAttrs, findOutByBlock } from "helpers";
import { useApp, getFromStore } from "store";
import { useRouter } from "next/router";
import { runCommands } from "helpers";


interface Props {
  attrs: any;
}

const ButtonsField: React.FC<Props> = memo(({ attrs, children }) => {
  const router = useRouter()
  const ref = findOutByBlock(useApp((state: any) => state.display.blocks), attrs.id, "form/Form")
  attrs = attrs.dataTarget ? parseBlockAttrs(attrs) : attrs;
  if (attrs.default && ref) {
    runCommands(
      [`${e.target.value}>SET>display.blocks.${ref.attrs.index}.attrs.variables.${attrs.outputValue}`], 
      router, attrs
    );
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
                runCommands(
                  [`${e.target.value}>SET>display.blocks.${ref.attrs.index}.attrs.variables.${attrs.outputValue}`], 
                  router, attrs
                );
              }}
              className={`${
                active == i
                  ? "border-blue-600 text-gray-800"
                  : "border-gray-200 text-gray-500 cursor-pointer"
              } block select-none flex items-center border  px-5 py-2 rounded-3xl`}
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
