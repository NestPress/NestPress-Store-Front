import { useState } from 'react';
interface Props {
  keyName: string;
  res: any;
  block: any
}
export const TagsField: React.FC<Props> = ({ keyName, res, block }) => {
  const [input, setInput] = useState('');
  const update = (value) => {
    res({ key: keyName, value: value, mutation: false});
    res({ key: keyName, value: value, mutation: true});
  }

  return (
    <>
      {block?.attrs[keyName] && <div className="flex flex-wrap">{block?.attrs[keyName].split(' ').map((tag, i) => <div className="bg-pink-600 flex rounded-sm my-px mr-1 text-white">
        <div className="py-1 pl-2 pr-1">{tag}</div>
        <div
          data-tagIndex={i}
          onClick={(el)=>{
            const tech = block?.attrs[keyName].split(' ');
            tech.splice(el.target.dataset.tagindex, 1)[0];
            update(tech.join(' '))
          }} 
          className="py-1 px-2 border-l border-white cursor-pointer bg-gray-600 hover:bg-red-400">x</div>
      </div>)}</div>}

      <div className="flex mt-0.5">
        <input 
          onChange={e => setInput(e.target.value)}
          value={input}
          className="col-span-3 border p-2 text-sm w-full" />
        <button 
          onClick={(e)=>{
            update(block?.attrs[keyName] ? block?.attrs[keyName] + ' ' + input : input)
            setInput('')
          }} 
          className="rounded bg-blue-400 ml-1 p-2 text-white">ADD</button>
      </div>
    </>
  );
};
