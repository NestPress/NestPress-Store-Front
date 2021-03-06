interface Props {
  keyName: string;
  res: any;
  block: any
}
export const TextareaField: React.FC<Props> = ({ keyName, res, block }) => {
  let timeout = null;
  return (
    <textarea
      onChange={e => res({ key: keyName, value: e.target.value, mutation: false })}
      onBlur={e => res({ key: keyName, value: e.target.value, mutation: true })}
      /* TODO fix type */
      // @ts-ignore: Unreachable code error
      rows="3"
      className="col-span-3 border p-1 w-full"
      value={block?.attrs[keyName]}
    />
  );
};

