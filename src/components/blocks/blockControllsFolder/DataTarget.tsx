/* TODO fix type */
// @ts-ignore
// @ts-nocheck

import { useApp } from "store";
import { getBy } from "helpers"
interface Props {
  keyName: string;
  res: any;
  block: any
}
export const DataTarget: React.FC<Props> = ({ keyName, res, block }) => {
  
  const store = {
    queries: useApp((state) => state.queries),
    forms: useApp((state) => state.forms),
    custom: useApp((state) => state.custom),
    router: useApp((state) => state.router)
  };
  const storageData = getBy(store, block?.attrs[keyName]) || store
  const pathArray = block?.attrs[keyName] ? block?.attrs[keyName].split('.') : []

  const update = (value) => {
    res({ key: keyName, value: value, mutation: false});
    res({ key: keyName, value: value, mutation: true});
    // res({ key: keyName, value: ``, mutation: true});
    // res({ key: keyName, value: ``, mutation: false});
  }

  return (
    <div className="border-b mb-2 text-xs">
      <>
        { (pathArray.length > 0) && <div className="flex flex-wrap">{pathArray.map((tag, i) => <div className="bg-pink-600 flex rounded-sm my-px mr-px text-white">
        <div className="py-1 pl-2 pr-1">{tag}</div>
        {pathArray.length-1 == i &&<div
          data-tagIndex={i}
          onClick={(el)=>{
            update(pathArray.slice(0, -1).join('.'))
          }} 
          className="py-1 px-2 border-l border-white cursor-pointer bg-gray-600 hover:bg-red-400 select-none">x</div>}
        </div>
        )}</div>}
      </>

       {!Array.isArray(storageData) && <div>
        <div className="bg-yellow-100 p-1 my-1">Select data to merge:</div> 
        {Object.keys(storageData).map(key => <div 
          onClick={e=>update(block?.attrs[keyName] ? `${block?.attrs[keyName]}.${key}` : key)}
          className="bg-white cursor-pointer border-t border-l border-r p-2 text-indigo-600 hover:bg-blue-50" key={key}>{key}</div>)}
      </div>}
    </div>
  );
};
