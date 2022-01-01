/* TODO fix type */
// @ts-ignore
// @ts-nocheck

import { FiCornerRightDown, FiArrowDown, FiArrowUp, FiExternalLink, FiArrowRight } from "react-icons/fi";
import { BlocksHeader, MainTabs } from "components/blocks";
import { useBlocks } from "store/blocksStore";
import { useRouter } from "next/router";

import { useMutation } from '@apollo/client';
import { UPDATE_BLOCK, DELETE_BLOCK } from "components/blocks/gql/composer"

import { getNestedChildren } from 'components/blocks/helpers/blocks'
import { DataTarget, QueryField, TagsField, InputField, ImgObjectFit, ImgLayout, TextareaField, KeyValueField, NumberField } from "components/blocks/blockControlls"

export const BlockControlls: React.FC = () => {

  const blocks = useBlocks((state) => state.blocks);
  const block = () => blocks.find((x) => x.id === selectedBlockId);
  const selectedBlockId = useBlocks((state) => state.selectedBlockId);
  const swapBlocks = useBlocks((state) => state.swapBlocks)
  const setBlockAttrs = useBlocks((state) => state.setBlockAttrs);
  const replace = useBlocks((state) => state.replace);
  const removeBlock = useBlocks((state) => state.removeBlock);
  const router = useRouter();
  const slugPath = router.query?.slugPath || ["Page","home"];

  const [updateBlock, { updateBlockData, updateBlockLoading, updateBlockError }] = useMutation(UPDATE_BLOCK, {
    onCompleted(updateBlockData) {
     
      console.log('update', updateBlockData)

    },
    update: (cache) => {
      cache.evict({ id: "ROOT_QUERY", fieldName: "getBlocks" });
      cache.evict({ id: "ROOT_QUERY", fieldName: "getPosts" });
    }, 
  });

  const [deleteBlock, { deleteBlockData, deleteBlockLoading, deleteBlockError }] = useMutation(DELETE_BLOCK, {
    onCompleted(deleteBlockData) {
      // console.log('delete', deleteBlockData)
      removeBlock(deleteBlockData.deleteBlock);
      useBlocks.setState({ panel: "mainPanel" })
    },
    update: (cache) => {
      cache.evict({ id: "ROOT_QUERY", fieldName: "getBlocks" });
      cache.evict({ id: "ROOT_QUERY", fieldName: "getPosts" });
    }
  });

  const buttonClass =
    "flex items-center bg-blue-400 w-full p-2 rounded  text-white hover:bg-blue-500";
  const buttonDel =
    "flex items-center bg-red-400 w-full p-2 rounded  text-white hover:bg-blue-500";
  
  const res = (res) => {
    res.mutation ? saveData(res) : setBlockAttrs({...res,id:selectedBlockId})
    /* hack to rerender after first loading */
    router.push(`${slugPath[0]}/${slugPath[1]}/${Math.floor(Math.random() * 9999)}`)
  }

  function saveData(res){
      const refBlock = block();
      const copy = JSON.parse(JSON.stringify(refBlock.attrs))
      copy[res.key] = res.value
      
      /* -------------------------- */
      /* build paths to shortcodes */

      if(typeof res.value === 'string'){
        const matches = res.value.match(/(?<=\$\{).+?(?=\})/g);
        if(matches?.length > 0){
          copy['shortcodes'][res.key] = matches
        }else{
          copy['shortcodes']?.[res.key] ? delete copy['shortcodes'][res.key] : null
        }
      }
      /* TODO - for queries variables */
      if(typeof res.value === 'object'){
        console.log('start update object', res.key, res.value, copy)
      }
      /* -------------------------- */
      updateBlock({ 
        variables: {
          id: refBlock.id,
          input:{
            id: refBlock.id,
            post: refBlock.post,
            parentId: refBlock.parentId === 0 ? "0" : refBlock.parentId,
            block: refBlock.block,
            attrs:copy
          }
        }
      }).catch(error => {
        // if (error.networkError) {
        //   getNetworkErrors(error).then(console.log)
        // } else {
          console.log(error.message)
        //}
      });
    }



  return (
    <div style={{height:"100vh", overflowX:"scroll"}}>
      <MainTabs/>
      <BlocksHeader title={block()?.block || ""} />
      <div className='grid grid-cols-2 text-xs gap-1 p-2'>
      <div className="py-1 col-span-2">ID:</div>
        <div className="col-span-2 bg-gray-100 p-1 border">
          {block()?.id || ""}
        </div>
        <div className="py-1 col-span-2">ParentID:</div>
        <div className="col-span-2 bg-gray-100 p-1 border">
          {block()?.parentId || ""}
        </div>
      </div>

      <div className="col-span-2 p-2 mt-2 text-xs font-bold bg-gray-200">Attributes</div>

      <div className={`${updateBlockLoading ? 'pointer-events-none' : null}  grid grid-cols-2 text-xs gap-1 px-2`}>
        
        {Object.keys(block()?.attrs || {}).map((key, index) => {
          return !replace ? (
            <div key={index} className={` ${ 
                key !== "width" &&
                key !== "height" ? 'col-span-2' : ''
              }`}>


              { 
                /* Print key */
                key !== "childrenSlots" && <div key={index} className="py-1 flex items-center mt-1 font-bold text-gray-600">
                {key}:
              </div>}

              {
                /* Print number controll */ (
                key === "width" ||
                key === "height" 
                ) && (
                <NumberField key={`nbr-${index}`} keyName={key} res={res} block={block()} />
              )}

              {
                /* Print textarea controll */ 
                (key === "text" ||  key === "mutation") && (
                <TextareaField key={`txa-${index}`} keyName={key} res={res} block={block()}/>
              )}

              {key === "imglayout" && (
                <ImgLayout key={`bgc-${index}`} keyName={key} res={res} block={block()}/>
              )}
              {key === "objectfit" && (
                <ImgObjectFit key={`bgc-${index}`} keyName={key} res={res} block={block()}/>
              )}

              {(
                key === "variables" || 
                key === "options" || 
                key === "consts" || 
                key === "errorActions" || 
                key === "successActions") && (
                <KeyValueField key={`bgc-${index}`} keyName={key} res={res} block={block()}/>
              )}

              {key === "classes" && (
                <TagsField key={`bgc-${index}`} keyName={key} res={res} block={block()}/>
              )}

              {key === "query" && (
                <QueryField key={`bgc-${index}`} keyName={key} res={res} block={block()}/>
              )}

              {key === "dataTarget" && (
                <DataTarget key={`bgc-${index}`} keyName={key} res={res} block={block()}/>
              )}

              

              {key !== "text" &&
                key !== "mutation" &&
                key !== "imglayout" &&
                key !== "objectfit" &&
                key !== "width" &&
                key !== "height" &&
                key !== "classes" &&
                key !== "query" &&
                key !== "options" &&
                key !== "variables" &&
                key !== "consts" &&
                key !== "errorActions" &&
                key !== "successActions" &&
                key !== "childrenSlots" &&
                key !== "dataTarget" &&
                
               (
                  <InputField key={`brd-${index}`} keyName={key} res={res}  block={block()}/>
                )}
            </div>
          ) : null;
        })}
      </div>

      {!replace ? (
        <div style={{position: "sticky", bottom: 0}} className="bg-white px-2 mt-2 border-t pt-2 grid grid-cols-2 gap-1 text-sm">
          <button
            className={buttonClass}
            onClick={(e) => useBlocks.setState({ panel: "insertChild" })}
          >
            <FiCornerRightDown />
            <span className="ml-2">Insert child</span>
          </button>
          
          <button
            className={buttonClass}
            onClick={(e) => useBlocks.setState({ panel: "insertNext" })}
          >
            <FiArrowRight />
            <span className="ml-2">Insert next</span>
          </button>

          <button
            className={buttonClass}
            onClick={(e) => swapBlocks({mode:'up'})}
          >
            <FiArrowUp />
            <span className="ml-2">Move up</span>
          </button>

          <button
            className={buttonClass}
           onClick={(e) => swapBlocks({mode:'down'})}
          >
            <FiArrowDown />
            <span className="ml-2">Move down</span>
          </button>
          
          <button
            className={buttonClass}
            onClick={(e) => useBlocks.setState({ replace: true })}
          >
            <FiExternalLink />
            <span className="ml-2">Click and drop</span>
          </button>
          
          <button
            className={buttonDel}
            onClick={(e) => {
              useBlocks.setState({ panel: "mainPanel" });
              deleteBlock({ 
                variables: {
                  id: selectedBlockId,
                }
              }).catch(error => {
                // if (error.networkError) {
                //   getNetworkErrors(error).then(console.log)
                // } else {
                  console.log(error.message)
                //}
              });

            }}
          >
            <FiExternalLink />
            <span className="ml-2">Remove</span>
          </button>
        </div>
      ) : (
        <div className="text-xs p-2 border-t border-b bg-yellow-100">
          Select parent block to replace
        </div>
      )}
    </div>
  );
};
