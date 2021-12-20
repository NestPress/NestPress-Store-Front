import { memo } from "react";
import { useQueries } from "store";
import { shortcode } from "components/blocks/helpers/blocks"
interface Props {
  attrs: any;
}
const Paragraph: React.FC<Props> = memo(({ attrs }) => {
  
  const queries = useQueries((state) => state.queries)?.[attrs.queryRef]?.[attrs.queryIndex-1];
  // const dataPart =  queries

  return (
    <p className={attrs?.classes}>
      {typeof queries === 'object' ? shortcode('text', attrs, queries) : attrs.text}
    </p>
  );
});
export default Paragraph;
