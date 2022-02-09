import { memo } from "react";
import { runCommands, fHead, transformNumStringToInt} from "helpers";
import { useApp, getFromStore } from "store";
import { useRouter } from "next/router";


// TODO - add vlid types
interface Props {
  attrs: any;
}
const EnumField: React.FC<Props> = memo(({ attrs, children }) => {
  const router = useRouter()
  const [pAttrs, ref] = fHead(useApp, attrs, router)

  return (
    <div className={`block flex items-center ${pAttrs.classes}`}>
     
      <input
        placeholder={pAttrs.placeholder}
        className="mr-2 h-5 w-5 cursor-pointer hover:shadow"
        type={pAttrs.type || "checkbox"}
        defaultValue={transformNumStringToInt(pAttrs.default)}
        
        onChange={(e) => {
          if(e.target.checked){
            attrs.selected = 'true'
            const thisPath = `display.blocks.${ref.attrs.index}.attrs.variables`    
            runCommands(
              [
                `${thisPath}>ISFALSE>OBJECT>SET>${thisPath}`,
                `${thisPath}.${pAttrs.outputValue}>ISFALSE>ARRAY>SET>${thisPath}.${pAttrs.outputValue}`,
                `${thisPath}.${pAttrs.outputValue}>ISTRUE>${e.target.value}>PUSH>${thisPath}.${pAttrs.outputValue}`,
              ], 
              router, pAttrs
            );
            // console.log(getFromStore({store:'display', ref:`blocks.${ref.attrs.index}.attrs`}))
          }
        }}
      />
      {pAttrs.label ? (
        <label className="">{pAttrs.label}</label>
      ) : null}
      {children}
    </div>
  );
});
export default EnumField;


