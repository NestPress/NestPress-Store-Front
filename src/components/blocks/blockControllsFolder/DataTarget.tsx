import { useApp } from "store";
import { get, set } from "components/blocks/helpers/blocks"
interface Props {
  keyName: string;
  res: any;
  block: any
}
export const DataTarget: React.FC<Props> = ({ keyName, res, block }) => {
  
  
  const storageData = {
    queries: useApp((state) => state.queries),
    forms: useApp((state) => state.forms),
    custom: useApp((state) => state.custom),
    router: useApp((state) => state.router)
  }
  // const queries = useApp((state) => state.queries)

  const pathArray = block?.attrs[keyName] ? block?.attrs[keyName].split('.') : []

  const update = (value) => {
    res({ key: keyName, value: value, mutation: false});
    res({ key: keyName, value: value, mutation: true});
  }

  console.log('pathArray',pathArray)

  return (
    <div className="border-b mb-2 text-xs">
    Targeter
      <div>
        { (pathArray && pathArray[0] != "") && <div className="flex flex-wrap">{pathArray.map((tag, i) => <div className="bg-pink-600 flex rounded-sm my-px mr-px text-white">
        <div className="py-1 pl-2 pr-1">{tag}</div>
        {pathArray.length-1 == i &&<div
          data-tagIndex={i}
          onClick={(el)=>{
            update(pathArray.slice(0, -1).join('.'))
          }} 
          className="py-1 px-2 border-l border-white cursor-pointer bg-gray-600 hover:bg-red-400 select-none">x</div>}
        </div>
        )}</div>}
      </div>


      <div>
        <div className="bg-yellow-100 p-1 my-1">select avilable query with results</div> 
        {Object.keys(storageData).map(key => <div 
          onClick={e=>update(key)}
          className="bg-white cursor-pointer border-t border-l border-r p-2 text-indigo-600 hover:bg-blue-50" key={key}>{key}</div>)}
      </div>

      
      {/*{(pathArray[0] == "" && Object.keys(queries).length !== 0) && <div>
        <div className="bg-yellow-100 p-1 my-1">select avilable query with results</div> 
        {Object.keys(queries).map(key => <div 
          onClick={e=>update(key)}
          className="bg-white cursor-pointer border-t border-l border-r p-2 text-indigo-600 hover:bg-blue-50" key={key}>{key}</div>)}
      </div>}

      {(pathArray.length && pathArray[0] != "" && Object.keys(queries).length !== 0) && <div>
        <div className="bg-yellow-100 p-1 my-1">select target key</div> 
        {!get(queries, pathArray.join('.')).length ? Object.keys(get(queries, pathArray.join('.'))).map(key => <div 
          onClick={e=>{
            pathArray = pathArray.concat([key])
            update(pathArray.join('.'))
          }}
          className="bg-white cursor-pointer border-t border-l p-2 border-r text-indigo-600 hover:bg-blue-50" key={key}>{key}</div>) : <div>asdas</div>}
      </div>}

      {!pathArray.length && <div>asdsad</div>} 

      {Object.keys(queries).length === 0 && <div className="bg-yellow-100 p-1 my-1">Not find storage queries</div>}*/}
      
    </div>
  );
};
