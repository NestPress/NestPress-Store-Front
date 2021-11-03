import { InputField, Button, LineForm } from 'components/forms'
import { FiArrowRightCircle } from "react-icons/fi";
interface Props {
  className?: string;
  fields:any;
  callback:any;
  submit :any;
}
export const LineForm: React.FC<Props> = ({ className, fields, callback, submit }) => {
  console.log('fields',fields)
  return (
    <>
    <form className={className} onSubmit={(e) => submit(e, callback)}>
      
      <label>Email</label>
      <InputField 
        className="md:flex-2" 
        placeholder="Email" 
        set={[fields,'username']} />
      
      <label>Password</label>
      <InputField 
        className="md:flex-2" 
        placeholder="Email" 
        set={[fields,'password']} />
    
      <Button className="w-max">
        <FiArrowRightCircle className="mr-1"/>
        <span>Login</span>
      </Button>
    </form>
    </>
  );
};