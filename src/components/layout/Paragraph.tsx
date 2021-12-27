/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { memo } from "react";
import { useQueries } from "store";
import { shortcode } from "components/blocks/helpers/blocks"
interface Props {
  attrs: any;
}
const Paragraph: React.FC<Props> = memo(({ attrs, children }) => {
  
  const queries = useQueries((state) => state.queries)?.[attrs.queryRef]?.[attrs.queryIndex-1];
  return (
    <p className={`block ${attrs.classes}`}>
      {typeof queries === 'object' ? shortcode('text', attrs, queries) : attrs.text}
      {children}  
    </p>
  );
});
export default Paragraph;
