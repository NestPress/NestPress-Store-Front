/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import React, { useState } from "react";
export const JSONview = ({
  data,
  toggled = true,
  name = null,
  isLast = true,
  isChildElement = false,
  isParentToggled = true
}) => {
  const [isToggled, setIsToggled] = useState(toggled);
  const isDataArray = Array.isArray(data);
  return (
    <div
      className={`text-xs mx-1`}
    >
      <span
        className=""
        onClick={() => setIsToggled(!isToggled)}
      />
      {name ? <div className={`key  ${isDataArray && "inline leading-6"}`}>{name}:</div> : <span></span>}

      {
       data && Object.keys(data).map((v, i, a) =>
        typeof data[v] === 'object' ? 
          <JSONview
            key={`${name}-${v}-${i}`}
            data={data[v]}
            isLast={i === a.length - 1}
            name={isDataArray ? null : v}
            isChildElement
            isParentToggled={isParentToggled && isToggled}
          />
         : 
          <p
            key={`${name}-${v}-${i}`} 
            className={`p-px my-px ${isDataArray ? "inline leading-4 px-1 border-r border-gray-700 mx-px" : 'pl-3'}`}
          >
            {isDataArray ? '' : <span className="key ">{v}: </span>}
            <span className="text-indigo-500 cursor-pointer hover:underline">{data[v]}</span>
          </p>
      )
      }
    </div>
  );
};