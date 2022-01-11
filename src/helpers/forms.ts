 import { findOutByBlock } from "helpers"

 export const fieldHead = (useApp, attrs) => {
   const blocks = useApp((state) => state.display.blocks);
   return {
      blocks:blocks, 
      updateData: useApp((state) => state.updateData),
      ref: findOutByBlock(blocks, attrs.id, 'form/Form')?.attrs?.refName
   }
 }
