interface Props {
  keyName: string;
  res: any;
  block: any
}
export const Rounded: React.FC<Props> = ({ keyName, res, block }) => {
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
        Empty definition
      </option>
      <option
        selected={block?.attrs[keyName] === "rounded"}
        value="rounded"
      >
        Rounded
      </option>
    </select>
  );
};
