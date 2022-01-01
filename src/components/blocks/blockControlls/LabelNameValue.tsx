/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { useBlocks, useForms } from "store";
import { findOutByBlock } from "components/blocks/helpers/blocks"

interface Props {
  keyName: string;
  res: any;
  block: any,
}
export const LabelNameValue: React.FC<Props> = ({ keyName, res,  block }) => {

  const update = (value) => {
    res({ key: keyName, value: value, mutation: false});
    res({ key: keyName, value: value, mutation: true});
  }

  const form = {label:'', value:''}

  console.log('test',block?.attrs[keyName])

  return (
    <div className="">
      <div className="border-b">
        {block?.attrs[keyName].map(function(el, index) {
          return <div className="grid grid-cols-7  border-t">
            <div className="border-l p-1 col-span-3 overflow-hidden">{el.label}</div>
            <div className="border-l border-r p-1 col-span-3 overflow-hidden">{el.value}</div>
            <div
              onClick={e=>{
                const out = Object.assign([],block?.attrs[keyName])
                out.splice(index, 1)
                update(out)
              }} 
              className="text-center border-r p-1 text-blue-800 underline cursor-pointer hover:text-red-600">x</div>
          </div>;
        })}
      </div>
    
      <div className="grid grid-cols-7 gap-1">
        <input
          placeholder="label"
          className="col-span-3 bg-white p-2 rounded-sm w-full text-gray-500 text-xs border mt-1"
          type="text"
          onChange={(e)=>{form.label = e.target.value}}
          
        />
        <input
          placeholder="value"
          className="col-span-3 bg-white p-2 rounded-sm w-full text-gray-500 text-xs border mt-1"
          type="text"
          onChange={(e)=>{form.value = e.target.value}}
          
        />
        <button className="bg-blue-400 w-full p-2 rounded mt-1 text-white hover:bg-blue-500"
          onClick={(e)=>{
            const out = Object.assign([],block?.attrs[keyName])
            out.push(form)
            update(out)
          }}
        >+</button>
      </div>
      
    </div>
  );
};
