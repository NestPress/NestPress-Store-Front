import { memo } from 'react'
interface Props {
  attrs: any
}
const Title: React.FC<Props> = memo(({ attrs }) => {
   const colspan = [
    '',
    'col-span-1',
    'col-span-2',
    'col-span-3',
    'col-span-4',
  ]
  return (
    <h1 className={`grid font-bold ${attrs.colspan ? colspan[attrs.colspan] : null} `}>{attrs?.text}</h1>
  );
});
export default Title