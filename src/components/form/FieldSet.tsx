import dynamic from 'next/dynamic'
interface Props {
  label?: string
  className?: string
  index?:number
  fields?:any
}  
const FieldSet: React.FC<Props> = ({ label,  className, fields, index}) => {
  {/* TODO fix types */}
  const components:any = {}
  return (
    <fieldset key={index} className={`${className}`}>
      { label ? <label className="text-gray-700 text-xs">{label}</label> : null }
      {/* TODO fix types */}
      { fields.map((el:any, i:number) => {
          components[el.component] = (dynamic(() => import(`components/forms/${el.component || 'InputField'}`)))
          const FormField:string = components[el.component];
          return (<FormField
              key={`${el.name}-${el.i}`}
              /* TODO fix type */
              // @ts-ignore: Unreachable code error
              index={i}
              label={el.label} 
              className="md:flex-2" 
              placeholder={el.placeholder} 
              set={[fields,el.name]}/>)
      })}
    </fieldset>
  );
};
export default FieldSet