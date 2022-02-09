interface Props {
  items: any;
  selected: int;
}
export const HelpList: React.FC = ({items, selected}) => {
	return (<div className="border-t border-r border-l border-gray-600 self-end  mb-1 overflow-hidden row-span-5 bg-gray-900">
		<div className="text-xs px-1 py-1 border-gray-600  bg-gray-700 border-b">use Arrows, Tab to set or Esc</div>
		{items.map((el,i)=><div 
			className={`py-px px-1 border-b border-gray-600 ${selected==i && 'bg-gray-800'}`}>{el}</div>)}
	</div>)
}