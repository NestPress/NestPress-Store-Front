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
export const EnumField: React.FC<Props> = ({ keyName, res,  block }) => {

  const update = (value) => {
    res({ key: keyName, value: value, mutation: false});
    res({ key: keyName, value: value, mutation: true});
  }

  const form = {key:'', value:''}

  return (
    <div className="">
      <div className="border-b">
        {Object.keys(block?.attrs[keyName]).map(function(key, index) {
          return <div className="grid grid-cols-7  border-t">
            <div className="border-l border-r p-1 col-span-1 overflow-hidden">{key}</div>
            <div className="border-r p-1 underline text-blue-800 col-span-5 overflow-hidden">{block?.attrs[keyName][key]}</div>
            <div
              onClick={e=>{
                const out = Object.assign([],block?.attrs[keyName])
                out.splice(parseInt(key), 1);
                update(out)
              }} 
              className="text-center border-r p-1 text-blue-800 underline cursor-pointer hover:text-red-600">x</div>
          </div>;
        })}
      </div>
    
      <div className="grid grid-cols-7 gap-1">
        <input
          placeholder="key"
          className="col-span-6 bg-white p-2 rounded-sm w-full text-gray-500 text-xs border mt-1"
          type="text"
          onChange={(e)=>{form.value = e.target.value}}
        />
        <button className="bg-blue-400 w-full p-2 rounded mt-1 text-white hover:bg-blue-500"
          onClick={(e)=>{
            const out = Object.assign([],block?.attrs[keyName])
            out = [...out, form.value]
            update(out)
          }}
        >Add</button>
      </div>
      
    </div>
  );
};
