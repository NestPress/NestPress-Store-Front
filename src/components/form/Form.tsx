import { gql } from "@apollo/client";
import { useBlocks } from "store/blocksStore";
interface Props {
  attrs: any;
}
const Form: React.FC<Props> = ({ attrs, children }) => {
  const blocks = useBlocks((state) => state.blocks);
  const mutation = gql`
    mutation registerAdministratorWithProfile(
      $input: CreateAdministratorWithProfileInput!
    ) {
      registerAdministratorWithProfile(input: $input) {
        id
      }
    }
  `;

  const allChildrens = (parentId: string) => {
    // TODO infinity walker
    // const elements = blocks.filter((item) => item.parentId = parentId);
    // elements.length ? elements.map((el) => allChildrens(el.parentId)) : null;
  };
  // const test: any = [
  //   {
  //     id: 1,
  //   },
  //   {
  //     id: 5,
  //   },
  //   {
  //     id: 2,
  //     parent_id: 1,
  //   },
  //   {
  //     id: 3,
  //     parent_id: 1,
  //   },
  //   {
  //     id: 42,
  //     parent_id: 5,
  //   },
  //   {
  //     id: 67,
  //     parent_id: 5,
  //   },
  //   {
  //     id: 68,
  //     parent_id: 42,
  //   },
  //   {
  //     id: 69,
  //     parent_id: 42,
  //   },
  //   {
  //     id: 70,
  //     parent_id: 69,
  //   },
  // ];
  // const getNestedChildren = (arr: any, parent: number) => {
  //   const out: any = [];
  //   for (const i in arr) {
  //     if (arr[i].parent_id === parent) {
  //       const children = getNestedChildren(arr, arr[i].id);
  //       if (children.length) {
  //         children.map((el: any) => out.push(el));
  //       }
  //       out.push(arr[i]);
  //     }
  //   }
  //   return out;
  // };
  // {
  //   console.log("t", getNestedChildren(test, 5));
  // }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(allChildrens(attrs.id));
      }}
    >
      {children}
    </form>
  );
};
export default Form;
