/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { TestMapper } from "pages/test/TestMapper";
import React, { useState, memo } from "react";

const data = [
  {
    "id": "1",
    "attrs":{classes:"border p-2"},
    "block":"layout/Grid",
    "parentId":0
  },
  {
    "id": "2",
    "attrs":{classes:"border p-2"},
    "block":"layout/Grid",
    "parentId":"1"
  },
  {
    "id": "3",
    "attrs":{classes:"border p-2"},
    "block":"layout/Grid",
    "parentId":"1"
  },
  {
    "id": "4",
    "attrs":{classes:"border p-2"}, 
    "block":"layout/Grid",
    "parentId":"1"
  },
]
  
const Test: React.FC = () => {
  const app = {
    _blocks:data,
    _router:{},
    _forms:{},
    _queries:{},
    _user:{}
  };
  const components = {};
  const [blockKeys, setBlockKey] = useState([]);

  return (
    <div>
      {app._blocks.length > 0 && (
        <TestMapper
          app={app}
          blockKeys={blockKeys}
          setBlockKey={setBlockKey}
          components={components}
          parentId={0}
        />
      )}
    </div>
  );
};
export default Test;