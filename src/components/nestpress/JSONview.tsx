/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import React, { useState } from "react";
import { FiArrowDownLeft } from "react-icons/fi";

export const JSONview = ({
  data,
  name = null,
  isLast = true,
}) => {
  const isDataArray = Array.isArray(data);
  return (
    <div
      className={`text-xs ml-2 ${isDataArray && "flex flex-wrap items-center"}`}
    >
      {name 
        ? <div className={`key flex items-end ${isDataArray && ""}`}>{name}: 
          {!isDataArray&&<FiArrowDownLeft/>}</div> 
        : <span>></span>}
      {
       data && Object.keys(data).map((v, i, a) =>
        typeof data[v] === 'object' ? 
          <JSONview
            key={`${name}-${v}-${i}`}
            data={data[v]}
            isLast={i === a.length - 1}
            name={isDataArray ? null : v}
          />
         : 
          <p
            key={`${name}-${v}-${i}`} 
            className={`p-px my-px 
              ${isDataArray 
                ? " px-1 border border-gray-700 mx-px" 
                : 'pl-2'}`}
          >
            {isDataArray ? '' : <span className="key ">{v}: </span>}
            <span className="text-indigo-500 cursor-pointer hover:underline">{data[v]}</span>
          </p>
      )
      }
    </div>
  );
};