/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { gql } from "@apollo/client";
import { useBlocks, useForms, getForm } from "store";
import { getNestedChildren, buildFormOutput } from "components/blocks/helpers/blocks"
interface Props {
  attrs: any;
}
const Form: React.FC<Props> = ({ attrs, children }) => {
  const blocks = useBlocks((state) => state.blocks);
  const addForm = useForms((state) => state.addForm);
  const mutation = gql`
    mutation registerAdministratorWithProfile(
      $input: CreateAdministratorWithProfileInput!
    ) {
      registerAdministratorWithProfile(input: $input) {
        id
      }
    }
  `;

  const form = getNestedChildren(blocks, attrs.id)
  getForm({ref:attrs.refname}) 
    ? null 
    : addForm({ref:attrs.refname, data:buildFormOutput(form)})
  
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(getForm({ref:attrs.refname}));
      }}
    >
      {children}
    </form>
  );
};
export default Form;
