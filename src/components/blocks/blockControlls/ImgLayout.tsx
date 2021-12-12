interface Props {
  keyName: string;
  res: any;
  block: any
}
export const ImgLayout: React.FC<Props> = ({ keyName, res, block }) => {
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
      <option
        selected={block?.attrs[keyName] === "intrinsic"}
        value="intrinsic"
      >
        Intrinsic
      </option>
      <option
        selected={block?.attrs[keyName] === "fixed"}
        value="fixed"
      >
        Fixed
      </option>
      <option
        selected={block?.attrs[keyName] === "responsive"}
        value="responsive"
      >
        Responsive
      </option>
       <option
        selected={block?.attrs[keyName] === "fill"}
        value="fill"
      >
        Fill
      </option>
    </select>
  );
};
