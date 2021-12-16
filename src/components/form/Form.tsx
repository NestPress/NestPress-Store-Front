/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { gql, useMutation } from "@apollo/client";
import { useBlocks, useForms, getForm, useActions } from "store";
import { getNestedChildren, buildFormOutput } from "components/blocks/helpers/blocks"
interface Props {
  attrs: any;
}
const Form: React.FC<Props> = ({ attrs, children }) => {
  const blocks = useBlocks((state) => state.blocks);
  const addForm = useForms((state) => state.addForm);
  const addAction = useActions((state) => state.addAction);

  const form = getNestedChildren(blocks, attrs.id)
  getForm({ref:attrs.refname}) 
    ? null 
    : addForm({ref:attrs.refname, data:buildFormOutput(form)})

  /* mutation */
  try {
    if(attrs.mutation){
      const MUTATION = attrs.mutation ? gql`${attrs.mutation}` : ``;
      const [formMutation, { data, loading, error }] = useMutation(MUTATION, {
          onCompleted(data) {
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
      className={attrs.classes}
      onSubmit={(e) => {
        e.preventDefault();
        addAction({type:'success', key:"submitFormStart", value:{ref:attrs.refname, data: getForm({ref:attrs.refname}) }})
        try {
          if(attrs.mutation){
            formMutation({ variables: getForm({ref:attrs.refname})}).catch(error => {
              addAction({type:'error', key:"submitForm", value:error.message})
            });
          }
        } catch (error) {}
      }}
    >
      {children}
    </form>
  );
};
export default Form;
