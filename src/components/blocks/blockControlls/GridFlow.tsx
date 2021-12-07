interface Props {
  keyName: string;
  res: any;
  block: any
}
export const GridFlow: React.FC<Props> = ({ keyName, res, block }) => {
  return (
    <select
      className="col-span-3 border bg-white py-3 px-1 w-full"
      onChange={(e) => {
        res({ 
          key: keyName, 
          value: e.target.value
        })
      }}
    >
      <option selected={block?.attrs[keyName] === "grid"} value="grid">
        Empty definition
      </option>
      <option
        selected={block?.attrs[keyName] === "grid-flow-row grid"}
        value="grid-flow-row grid"
      >
        Flow row
      </option>
      <option
        selected={block?.attrs[keyName] === "grid grid-flow-col"}
        value="grid grid-flow-col"
      >
        Flow col
      </option>
      <option
        selected={block?.attrs[keyName] === "flex items-center"}
        value="flex"
      >
        As flexbox
      </option>

    </select>
  );
};
