interface Props {
  keyName: string;
  res: any;
  block: any
}
export const ImgObjectFit: React.FC<Props> = ({ keyName, res, block }) => {
  return (
    <select
      className="col-span-3 border bg-white py-3 px-1 w-full"
      onChange={(e) => {
        res({ key: keyName, value: e.target.value, mutation: false});
        res({ key: keyName, value: e.target.value, mutation: true});
      }}
    >
      <option selected={block?.attrs[keyName] === ""} value="">
        Empty definition
      </option>
      <option
        selected={block?.attrs[keyName] === "objectFit"}
        value="objectFit"
      >
        Object fit
      </option>
      <option
        selected={block?.attrs[keyName] === "cover"}
        value="cover"
      >
        Cover
      </option>
    </select>
  );
};
