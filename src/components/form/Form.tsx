/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { memo } from "react";
import { gql, useMutation } from "@apollo/client";
import { useBlocks, useForms, getForm, useActions } from "store";
import { getNestedChildren, buildFormOutput, buildVariables } from "components/blocks/helpers/blocks"
import { actionsParser } from "components/blocks/helpers/actions"
import { useRouter } from 'next/router'

interface Props {
  attrs: any;
}
const Form: React.FC<Props> = memo(({ attrs, children }) => {
  
  const router = useRouter()
  const blocks = useBlocks((state) => state.blocks);
  const setBlockAttrs = useBlocks((state) => state.setBlockAttrs);
  const addForm = useForms((state) => state.addForm);
  const addAction = useActions((state) => state.addAction);
  const form = getNestedChildren(blocks, attrs.id)


  getForm({ref:attrs.refName}) 
    ? null 
    : addForm({ref:attrs.refName, data:{...buildFormOutput(form), ...buildVariables(attrs.consts)}})

  /* mutation */
  try {
    if(attrs.mutation){
      const MUTATION = attrs.mutation ? gql`${attrs.mutation}` : ``;
      const [formMutation, { data, loading, error }] = useMutation(MUTATION, {
          onCompleted(data) {
            attrs.successActions ? actionsParser(attrs.successActions, getForm({ref:attrs.refName}), blocks, setBlockAttrs, router) : null
            
            // set results to actions store (this is unless)
            addAction({type:'success', key:"submitFormCompleted", value:data})
          }, 
          update: (cache) => {
            cache.evict({ id: "ROOT_QUERY", fieldName: "getPosts" });
          },
        });
    }
  } catch (error) { 
    addAction({type:'error', key:"submitForm", value:error})
  }

  return (
    <form
      className={`block ${attrs.classes}`}
      onSubmit={(e) => {
        e.preventDefault();
        
        // set results to actions store (this is unless)
        addAction({type:'success', key:"submitFormStart", value:{ref:attrs.refName, data: getForm({ref:attrs.refName}) }})
        
        // always success if mutation is undefined
        !attrs.mutation && attrs.successActions ? actionsParser(attrs.successActions, getForm({ref:attrs.refName}), blocks, setBlockAttrs, router) : null
        
        try {
          if(attrs.mutation){
            formMutation({ variables: getForm({ref:attrs.refName})}).catch(error => {
              addAction({type:'error', key:"submitForm", value:error.message})
            });
          }
        } catch (error) {}
      }}
    >
      {children}
    </form>
  );
});
export default Form;
