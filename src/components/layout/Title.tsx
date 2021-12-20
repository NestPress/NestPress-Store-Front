import { memo } from "react";
import { useQueries } from "store";
import { shortcode } from "components/blocks/helpers/blocks"
interface Props {
  attrs: any;
}
const Title: React.FC<Props> = memo(({ attrs }) => {
  
  const queries = useQueries((state) => state.queries)?.[attrs.queryRef]?.[attrs.queryIndex-1];
  return (
    <h1
      key={attrs.id+attrs.queryIndex}
      className={`font-bold ${attrs?.classes}`}
    >
      {shortcode('text', attrs, queries)}
    </h1>
  );
});
export default Title;
