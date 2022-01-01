/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { memo } from "react";
import { useQueries } from "store";
import { shortcode } from "components/blocks/helpers/blocks"
interface Props {
  attrs: any;
}
// const Title: React.FC<Props> = memo(({ attrs, children }) => {
//   const queries = useQueries((state) => state.queries)?.[attrs.queryRef]?.[attrs.queryIndex-1];
//   return (<h1 className={`block ${attrs.classes}`}>{typeof queries === 'object' ? shortcode('text', attrs, queries) : attrs.text}{children}  </h1>);
// });


const Title: React.FC<Props> = memo(({ attrs, children }) => {
  return (<h1 className={`block ${attrs.classes}`}> {attrs.text}  {children}</h1>);
});
export default Title;
