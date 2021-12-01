interface Props {
  keyName: string;
  res: any;
  block: any
}
export const BackgroundColor: React.FC<Props> = ({ keyName, res, block }) => {
 
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
      <option selected={block?.attrs[keyName] === ""} value="">
        Empty definition
      </option>
      <option
        selected={block?.attrs[keyName] === "main-background"}
        value="main-background"
      >
        Main background
      </option>
      <option
        selected={block?.attrs[keyName] === "light-background"}
        value="light-background"
      >
        Lignt background
      </option>
      <option
        selected={block?.attrs[keyName] === "dark-background"}
        value="dark-background"
      >
        Dark background
      </option>
      <option
        selected={block?.attrs[keyName] === "action-background"}
        value="action-background"
      >
        Action background
      </option>
      <option
        selected={
          block?.attrs[keyName] === "main-background-gradient"
        }
        value="main-background-gradient"
      >
        Main background gradient
      </option>
    </select>
  );
};
