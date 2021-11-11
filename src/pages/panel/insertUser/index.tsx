
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { FiArrowRightCircle} from "react-icons/fi";
import { TextareaField, InputField,SelectField, Button } from 'components/forms'
import { getLayout } from 'helpers/getLayout'


const InsertUser: React.FC = () => {
  const Layout = dynamic(() => import(`layouts/${getLayout(useRouter())}`)) 
  /* form */
  const form = {}
  const sendForm = (event:any) => {
    event.preventDefault();
  }
  return (
    <Layout>
        <h2 className="text-xl mb-5">Insert user</h2>
        <form className="flex flex-col flex-1 gap-2" onSubmit={(event)=> {sendForm(event)}}>
          <InputField label="First name" placeholder="First name" className="md:flex-2"  set={[form, 'setFormFirstName']} /> 
          <InputField label="Last name" placeholder="Last name" className="md:flex-2" set={[form, 'setFormLastName']} /> 
          <InputField label="Phone number" className="md:flex-2" placeholder="File name" set={[form, 'setFormPhoneNumber']} /> 
          <InputField label="Nick name" className="md:flex-2" placeholder="File name" set={[form, 'setFormNickName']} /> 
          <TextareaField label="Short descriotion" className="md:flex-2" placeholder="File name" value="" /> 
          <label>Primary category</label>
          <SelectField className="md:flex-2" placeholder="File name" value='' />
          <label>Secondary category</label>
          <SelectField className="md:flex-2" placeholder="File name" value='' />
          <Button className="w-max">
            <FiArrowRightCircle className="mr-1"/>
            <span>Save profile</span>
          </Button>
        </form>
    </Layout>
  );
};
export default InsertUser;