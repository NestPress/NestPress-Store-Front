/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { gql, useMutation } from "@apollo/client";
import { useBlocks, useForms, getForm } from "store";
import { getNestedChildren, buildFormOutput } from "components/blocks/helpers/blocks"
interface Props {
  attrs: any;
}
const Form: React.FC<Props> = ({ attrs, children }) => {
  const blocks = useBlocks((state) => state.blocks);
  const addForm = useForms((state) => state.addForm);

  console.log('mutation', attrs.mutation)
  const MUTATION = attrs.mutation ? gql`${attrs.mutation}` : ``;

  const form = getNestedChildren(blocks, attrs.id)
  getForm({ref:attrs.refname}) 
    ? null 
    : addForm({ref:attrs.refname, data:buildFormOutput(form)})

  /* mutation */
  if(attrs.mutation){
    const [addNewBlock, { data, loading, error }] = useMutation(MUTATION, {
      onCompleted(data) {
          console.log('mutate form complete', data)
          // addBlock(data.createBlock);
      }, 
    });
  }
  
  
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // console.log(getForm({ref:attrs.refname}), attrs);
        addNewBlock({ variables: getForm({ref:attrs.refname})});
      }}
    >
      {children}
    </form>
  );
};
export default Form;
