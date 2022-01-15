/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import React, { useState } from "react";
export const JsonView = ({
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
      className={`text-xs mx-1 `}
    >
      <span
        className=""
        onClick={() => setIsToggled(!isToggled)}
      />
      {name ? <div className={`key p-1 border-b mt-1 text-gray-700 ${isDataArray && "inline leading-6"}`}>{name}:</div> : <span></span>}

      {
       data && Object.keys(data).map((v, i, a) =>
        typeof data[v] === 'object' ? 
          <JsonView
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
            className={`p-1 pl-3 border-b my-px ${isDataArray && "inline rounded leading-6 border  mx-px"}`}
          >
            {isDataArray ? '' : <span className="key ">{v}: </span>}
            <span className="text-blue-800 cursor-pointer hover:underline">{data[v]}</span>
          </p>
      )
      }
    </div>
  );
};