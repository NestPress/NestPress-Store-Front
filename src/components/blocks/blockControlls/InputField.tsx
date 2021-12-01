interface Props {
  keyName: string;
  res: any;
  block: any
}
export const InputField: React.FC<Props> = ({ keyName, res, block }) => {
  return (
    <input
      type="text"
      onChange={(e) => {
        res({ 
          key: keyName, 
          value: e.target.value
        })
      }
      }
      className="col-span-3 border p-2 text-sm w-full"
      value={block?.attrs[keyName]}
    />
  );
};
