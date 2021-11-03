interface Props {
  label?: string;
  placeholder?: string;
  set?: any;
  className?: string;
  type?:string
}
export const InputField: React.FC<Props> = ({ label, set, type, placeholder, className }) => {
  return (
    <div className={`${className}`}>
      { label ? <label className="text-gray-700 text-xs">{label}</label> : null }
      <input 
        placeholder={placeholder}
        className="bg-white p-3 rounded-sm w-full text-gray-500 text-sm border mt-1"
        type={type || 'text'} 
        ref={ node => { set[0][set[1]] = node }}
        // defaultValue={set[0]} 
      />
    </div>
  );
};
