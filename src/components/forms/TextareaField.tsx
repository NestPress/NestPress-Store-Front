interface Props {
  label?: string;
  placeholder?: string;
  set?: any;
  className?: string;
  type?:string
}
const TextareaField: React.FC<Props> = ({ label, set, type, placeholder, className }) => {
  return (
    <div className={`${className}`}>
      { label ? <label className="text-gray-700 text-xs">{label}</label> : null }
      <textarea 
        className="bg-white p-3 rounded-sm w-full text-gray-500 text-sm border mt-1"
        placeholder={placeholder}
        ref={ node => { set[0][set[1]] = node }}
      />
    </div>
  );
};
export default TextareaField

