import { Composer, Tree } from "components/blocks";
import { useBlocks } from "store/blocksStore";
import { useStickyState } from "helpers/localMockupApi";
import { useRouter } from "next/router";

const Home: React.FC = () => {

  const slugPath = useRouter().query?.slugPath || ["home"];
  
  /* Mock mode */
  const [ storageBlocks, setStoregeBlock ] = useStickyState([], 'storageBlocks');
  const blocksBySlug = () => storageBlocks?.filter((x) => x.post === slugPath[0]);
  const blocks = useBlocks((state) => state.blocks);
  if(blocks.length == 0){
    useBlocks.setState({ blocks: blocksBySlug() });
  }
  
  return (
    blocks?.length > 0 && (
      <div>
        <div style={{ marginRight: "20rem" }}>
          <Tree blocks={blocks} />
        </div>
        <Composer />
      </div>
    )
  );
};
export default Home;



// import { Composer, Tree } from "components/blocks";
// import { useBlocks } from "store/blocksStore";
// import { useStickyState } from "helpers/localMockupApi";

// const Home: React.FC = () => {
//   /* Mock mode */
//   // const [
//   //   blocks,
//   //   setBlock
//   // ] = useStickyState([], 'blocks');

//   /* !Mock mode */

//   const blocks = useBlocks((state) => state.blocks);

//   return (
//     blocks && (
//       <>
//         <div style={{ marginRight: "20rem" }}>
//           <Tree blocks={blocks} />
//         </div>
//         <Composer />
//       </>
//     )
//   );
// };
// export default Home;