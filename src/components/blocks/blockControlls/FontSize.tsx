interface Props {
  keyName: string;
  res: any;
  block: any
}
export const FontSize: React.FC<Props> = ({ keyName, res, block }) => {
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
      <option selected={block?.attrs[keyName] === ""} value="">
        No defined (basetext)
      </option>
      <option
        selected={block?.attrs[keyName] === "text-xs"}
        value="text-xs"
      >
        Extra small (XS)
      </option>
      <option
        selected={block?.attrs[keyName] === "text-sm"}
        value="text-sm"
      >
        Small (S)
      </option>
      <option
        selected={block?.attrs[keyName] === "text-lg"}
        value="text-lg"
      >
        Large (L)
      </option>
      <option
        selected={block?.attrs[keyName] === "text-xl"}
        value="text-xl"
      >
        Extra Large (XL)
      </option>
      <option
        selected={block?.attrs[keyName] === "text-3xl"}
        value="text-3xl"
      >
        Extra Large (3XL)
      </option>
      
    </select>
  );
};
