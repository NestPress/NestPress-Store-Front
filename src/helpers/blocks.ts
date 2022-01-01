import { v4 as uuidv4 } from 'uuid';
import { get, interpolate } from 'helpers'

export const parseBlockAttrs = (attrs, useQueries) => {
  const queries = useQueries((state) => state.queries)
  const partialData = get(queries, attrs.dataTarget)
  partialData?.length ? partialData = partialData[attrs.queryIndex] : null
  return partialData ? JSON.parse(interpolate(JSON.stringify(attrs), partialData)) : attrs
}


/* 
  Get blocks and change ids to unique
*/
export const prepareBlocksToClone = (blocks, dataToParse = {}) => {
  var text = JSON.stringify(blocks)
  blocks.map(el=>{
    text = text.replaceAll(el.id, uuidv4())
  })
  return JSON.parse(text);
} 