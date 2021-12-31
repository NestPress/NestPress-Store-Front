import { useQueries } from "store";
import { get, set } from "helpers/io"
interface Props {
  keyName: string;
  res: any;
  block: any
}
export const DataTarget: React.FC<Props> = ({ keyName, res, block }) => {
  
  const queries = useQueries((state) => state.queries)
  const pathArray = block?.attrs[keyName].split('.')

  const update = (value) => {
    res({ key: keyName, value: value, mutation: false});
    res({ key: keyName, value: value, mutation: true});
  }
  return (
    <div className="border-b mb-2">
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
      
      {(pathArray[0] == "" && queries[0]) && <div>
        <div className="py-1">select avilable query with results</div> 
        {Object.keys(queries).map(key => <div 
          onClick={e=>update(key)}
          className="cursor-pointer border-t py-1 text-indigo-600 hover:underline" key={key}>{key}</div>)}
      </div>}

      {(pathArray[0] != "" && queries[0]) && <div>
        <div className="py-1">select target key</div> 
        {!get(queries, pathArray.join('.')).length ? Object.keys(get(queries, pathArray.join('.'))).map(key => <div 
          onClick={e=>{
            pathArray = pathArray.concat([key])
            update(pathArray.join('.'))
          }}
          className="cursor-pointer border-t py-1 text-indigo-600 hover:underline" key={key}>{key}</div>) : null}
      </div>}

      {!queries[0] && <div className="border-t py-1">Not find storage queries</div>}
      
    </div>
  );
};
