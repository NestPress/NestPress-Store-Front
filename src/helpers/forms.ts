import { findOutByBlock, setBy } from "helpers";

// export const fieldHead = (useApp: any, attrs: any) => {
//   const blocks = useApp((state: any) => state.display.blocks);
//   return {
//     blocks: blocks,
//     updateData: useApp((state: any) => state.updateData),
//     ref: findOutByBlock(blocks, attrs.id, "form/Form")?.attrs?.refName,
//   };
// };


/* 
  Build form output object
*/
export const buildFormOutput = (blocks) => {
  const out = {}
  blocks.map((el)=>{
    el.attrs.outputValue ? setBy(out, el.attrs.outputValue, el.attrs.defaultValue || '') : null
  })
  console.log('s',out)
  return out
}
