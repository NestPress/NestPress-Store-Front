import { findOutByBlock, setBy, runCommands, parseBlockAttrs } from "helpers";
import { useState } from "react";

export const fHead = (useApp: any, attrs: any, router:any) => {
  
  const ref = findOutByBlock(useApp((state: any) => state.display.blocks), attrs.id, "form/Form")
  const [activeDefault, setActiveDefault] = useState(true);
  attrs = attrs.dataTarget ? parseBlockAttrs(attrs) : attrs;


  
  if (attrs.default && activeDefault && ref) {
    if(attrs.selected == ''){
     // if(attrs.selected == 'true'){
     //  runCommands(
     //    [`${attrs.default}>PUSH>display.blocks.${ref.attrs.index}.attrs.variables.${attrs.outputValue}`], 
     //    router, attrs
     //  );
     // }
    }else{
     runCommands(
      [`${attrs.default}>SET>display.blocks.${ref.attrs.index}.attrs.variables.${attrs.outputValue}`], 
      router, attrs
      );
    }
    setActiveDefault(false)
  }
  return [attrs, ref]
};


/* 
  Build form output object
*/
export const buildFormOutput = (blocks:any) => {
  const out = {}
  blocks.map((el:any)=>{
    el.attrs.outputValue ? setBy(out, el.attrs.outputValue, el.attrs.defaultValue || '') : null
  })
  console.log('s',out)
  return out
}
