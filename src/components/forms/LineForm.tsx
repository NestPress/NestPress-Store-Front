import dynamic from 'next/dynamic'
import { Button } from 'components/forms'
import React from 'react';
import { FiArrowRightCircle } from "react-icons/fi";
interface Props {
  className?: string;
  fields:any;
  callback:any;
  submit :any;
}
export const LineForm: React.FC<Props> = ({ className, fields, callback, submit }) => {
  const components = {}
  return (
    <form className={className} onSubmit={(e) => submit(e, callback)}>
      {fields.map((el) => {
          components[el.component] = (dynamic(() => import(`components/forms/${el.component || 'InputField'}`)))
          const FormField:string = components[el.component];
          return (<FormField
              key={el.name}
              label={el.label} 
              className="md:flex-2" 
              placeholder={el.placeholder} 
              set={[fields,el.name]}/>)
      })}
      <Button className="w-max">
        <FiArrowRightCircle className="mr-1"/>
        <span>Login</span>
      </Button>
    </form>
  );
};

{/*classic form example*/}
{/*<label>Email</label>
<InputField 
  className="md:flex-2" 
  placeholder="Email" 
  set={[fields,'username']} />

<label>Password</label>
<InputField 
  className="md:flex-2" 
  placeholder="Email" 
  set={[fields,'password']} />*/}