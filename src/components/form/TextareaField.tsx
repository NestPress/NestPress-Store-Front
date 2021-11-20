// @ts-nocheck
interface Props {
  attrs: any
}
const TextareaField: React.FC<Props> = ({ attrs }) => {
  return (
    <div className="">
      { attrs.label ? <label className="text-gray-700 text-xs">{attrs.label}</label> : null }
      <textarea
        rows={attrs.rows}
        placeholder={attrs.placeholder}
        className="bg-white p-3 rounded-sm w-full text-gray-500 text-sm border mt-1"
        type={attrs.type || 'text'} 
      />
    </div>
  );
};
export default TextareaField
