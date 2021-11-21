import { gql } from "@apollo/client";
import { useBlocks } from 'store/blocksStore'
interface Props {
  attrs: any
}
const Form: React.FC<Props> = ({  attrs, children }) => {
  const blocks = useBlocks((state) => state.blocks);
  const mutation = gql`mutation registerAdministratorWithProfile($input: CreateAdministratorWithProfileInput!) {
    registerAdministratorWithProfile(input: $input) {
      id
    }
  }`

  const allChildrens = (parentId) => {
    // TODO infinity walker 
    const elements = blocks.filter((item) => item.parentId === parentId)
    elements.length ? elements.map(el => allChildrens(el.parentId)) : null
  }

  return (
    <form onSubmit={(e) => { 
      e.preventDefault();
      console.log(allChildrens(attrs.id))
    }}>
      {children}
    </form>
  );
};
export default Form