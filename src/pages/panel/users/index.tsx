
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { FiArrowRightCircle} from "react-icons/fi";
import { TextareaField, InputField,SelectField, Button } from 'components/forms'
import { getLayout } from 'helpers/getLayout'


const Users: React.FC = () => {
  const Layout = dynamic(() => import(`layouts/${getLayout(useRouter())}`)) 
  /* form */
  const form = {}
  const sendForm = (event:any) => {
    event.preventDefault();
  }
  return (
    <Layout>
        <h2 className="text-xl mb-5">Users</h2>
        list
    </Layout>
  );
};
export default Users;