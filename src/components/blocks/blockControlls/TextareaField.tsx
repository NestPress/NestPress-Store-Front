interface Props {
  keyName: string;
  res: any;
  resout:any;
  block: any
}
export const TextareaField: React.FC<Props> = ({ keyName, res, resout, block }) => {
  let timeout = null;
  return (
    <textarea
      onChange={(e) => {
        res({ 
          key: keyName, 
          value: e.target.value
        })
      }
      }
      onBlur={(e) => {
        resout({ 
          key: keyName, 
          value: e.target.value
        })
      }
      }
      /* TODO fix type */
      // @ts-ignore: Unreachable code error
      rows="3"
      className="col-span-3 border p-1"
      value={block?.attrs[keyName]}
    />
  );
};

