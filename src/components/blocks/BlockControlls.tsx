/* TODO fix type */
// @ts-ignore
// @ts-nocheck

import { FiCornerRightDown, FiArrowDown, FiExternalLink } from "react-icons/fi";
import { BlocksHeader, MainTabs } from "components/blocks";
import { useBlocks } from "store/blocksStore";

import { useMutation} from '@apollo/client';
import { UPDATE_BLOCK, DELETE_BLOCK } from "components/blocks/gql/composer"

import { getNestedChildren } from 'components/blocks/helpers/blocks'
import { TagsField, InputField, ImgObjectFit, ImgLayout, TextareaField, NumberField } from "components/blocks/blockControlls"

export const BlockControlls: React.FC = () => {

  const blocks = useBlocks((state) => state.blocks);
  const block = () => blocks.find((x) => x.id === selectedBlockId);
  const selectedBlockId = useBlocks((state) => state.selectedBlockId);
  const setBlockAttrs = useBlocks((state) => state.setBlockAttrs);
  const replace = useBlocks((state) => state.replace);
  const removeBlock = useBlocks((state) => state.removeBlock);

  const [updateBlock, { updateBlockData, updateBlockLoading, updateBlockError }] = useMutation(UPDATE_BLOCK, {
    onCompleted(updateBlockData) {
      console.log('update', updateBlockData)
    }
  });

  const [deleteBlock, { deleteBlockData, deleteBlockLoading, deleteBlockError }] = useMutation(DELETE_BLOCK, {
    onCompleted(deleteBlockData) {
      console.log('delete', deleteBlockData)
    }
  });

  const buttonClass =
    "flex items-center bg-blue-400 w-full p-2 rounded  text-white hover:bg-blue-500";
  const buttonDel =
    "flex items-center bg-red-400 w-full p-2 rounded  text-white hover:bg-blue-500";
  
  const res = (res) => {
    setBlockAttrs(res)
    if(res.key === "text" || res.key === "mutation" || res.key === "query" || res.key === "classes" || res.key === "handler"){

    }else{
      saveData(res)
    }
  }
  const resout = (res) => {
    if(res.key === "text" || res.key === "mutation" || res.key === "query" || res.key === "classes" || res.key === "handler"){
        saveData(res)
    }
  }

  function saveData(res){
      const refBlock = block();
      const copy = Object.assign({}, refBlock.attrs)
      copy[res.key] = res.value
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
    <div>
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

              <div key={index} className="py-1 flex items-center mt-1">
                {key}:
              </div>

              {(
                key === "width" ||
                key === "height" 
                ) && (
                <NumberField key={`nbr-${index}`} keyName={key} res={res} block={block()} />
              )}

              {(key === "text" || key === "query" || key === "mutation") && (
                <TextareaField key={`txa-${index}`} keyName={key} res={res} block={block()} resout={resout}/>
              )}

              {key === "imglayout" && (
                <ImgLayout key={`bgc-${index}`} keyName={key} res={res} block={block()}/>
              )}
              {key === "objectfit" && (
                <ImgObjectFit key={`bgc-${index}`} keyName={key} res={res} block={block()}/>
              )}

              {key === "classes" && (
                <TagsField key={`bgc-${index}`} keyName={key} res={res} block={block()} resout={resout}/>
              )}

              {key !== "text" &&
                key !== "mutation" &&
                key !== "query" &&
                key !== "imglayout" &&
                key !== "objectfit" &&
                key !== "width" &&
                key !== "height" &&
                key !== "classes" &&
               (
                  <InputField key={`brd-${index}`} keyName={key} res={res} resout={resout} block={block()}/>
                )}
            </div>
          ) : null;
        })}
      </div>

      {!replace ? (
        <div className="px-2 mt-2 border-t pt-2 grid grid-cols-2 gap-1 text-sm">
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
            <FiArrowDown />
            <span className="ml-2">Insert next</span>
          </button>
          
          <button
            className={buttonClass}
            onClick={(e) => useBlocks.setState({ replace: true })}
          >
            <FiExternalLink />
            <span className="ml-2">Replace deep</span>
          </button>
          
          <button
            className={buttonDel}
            onClick={(e) => {
              useBlocks.setState({ panel: "mainPanel" });
              removeBlock();
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
