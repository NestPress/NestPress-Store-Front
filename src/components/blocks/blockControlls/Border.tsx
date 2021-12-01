interface Props {
  keyName: string;
  res: any;
  block: any
}
export const Border: React.FC<Props> = ({ keyName, res, block }) => {
  return (
    <select
      className="col-span-3 border bg-white py-3 px-1"
      onChange={(e) => {
        res({ 
          key: keyName, 
          value: e.target.value
        })
      }}
    >
      <option selected={block?.attrs[keyName] === ""} 
        value="main-text"
      >
        Empty definition
      </option>

      <option
        selected={block?.attrs[keyName] === "border"}
        value="border"
      >
        Border
      </option>

      <option
        selected={block?.attrs[keyName] === "border-r"}
        value="border-r"
      >
        Border right
      </option>

      <option selected={block?.attrs[keyName] === "border-b"} 
        value="border-b"
      >
        Border bottom
      </option>

      <option selected={block?.attrs[keyName] === "border-l"} 
        value="border-l"
      >
        Border left
      </option>

      <option selected={block?.attrs[keyName] === "border-r"} 
        value="border-r"
      >
        Border right
      </option>

      <option selected={block?.attrs[keyName] === "border-t"} 
        value="border-t"
      >
        Border top
      </option>
      
      
    </select>
  );
};
