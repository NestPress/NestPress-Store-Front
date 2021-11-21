import { Composer, Tree } from "components/blocks";
import { useBlocks } from "store/blocksStore";
import { useStickyState } from "helpers/localMockupApi";

const Home: React.FC = () => {
  /* Mock mode */
  // const [
  //   blocks,
  //   setBlock
  // ] = useStickyState([], 'blocks');

  /* !Mock mode */

  const blocks = useBlocks((state) => state.blocks);

  return (
    blocks && (
      <>
        <div style={{ marginRight: "20rem" }}>
          <Tree blocks={blocks} />
        </div>
        <Composer />
      </>
    )
  );
};
export default Home;
