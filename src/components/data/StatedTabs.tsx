import React, { useState } from 'react';
import { FiHome, FiDollarSign } from "react-icons/fi";
import { getBy } from "helpers";
import { useApp } from "store";
interface Props {
  attrs: any;
}
export const StatedTabs: React.FC<Props> = ({ attrs , children }) => {
  
  const data = { queries: useApp((state) => state.queries) }
  const item = getBy( data, `${attrs.dataTarget}.${attrs.queryIndex - 1}`)
  const types = []
  item?.rightRelatedPosts?.forEach((el,i) => {
    if(el.relationType == "addresses"){
      types.push({...el, label:`Adres ${i+1}`,Icon:<FiHome/>,name:el.id})
    }
  });
  
  const [active, setActive] = useState(item?.rightRelatedPosts?.[0]);
  
  return <div className="text-gray-600">
    <div className="flex border-b text-sm mb-3 gap-x-5">
    {types.map((type) => (
      <div
        key={type.name}
        className={`flex items-center justify-center gap-x-1 py-2.5 select-none  
          ${active?.id === type.name 
            ? 'border-b-2 border-blue-500 cursor-auto' 
            : 'cursor-pointer'}`}
        onClick={() => setActive(type)}
      >
        <div className="text-xs">{type.Icon}</div>
        {type.label}
      </div>
    ))}
    </div>
    <div className="">
      <div className="flex gap-1">
        <FiHome/>
        <span>ul. {active && active.rightPost?.customFields.street}</span>  
        <span>{active && active.rightPost?.customFields.postalCode}</span> 
        <span>{active && active.rightPost?.customFields.city}</span> 
      </div>
      <div className="flex gap-1 mt-2">
        <FiDollarSign/>
        <span>{active && active.customFields.services?.[0]?.name}</span>  
        <span>{active && active.customFields.services?.[0]?.price}PLN</span> 
      </div>
    </div>

  </div>
};
export default StatedTabs;