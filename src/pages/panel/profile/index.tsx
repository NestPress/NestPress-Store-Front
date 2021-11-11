
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { FiArrowRightCircle} from "react-icons/fi";
import { getLayout } from 'helpers/getLayout'
import { LineForm } from 'components/forms'
import { form, submit } from "modules/profile/form"
import { AUTHENTICATE } from "modules/login/gql"
import { useMutation } from "@apollo/client";

const Profile: React.FC = () => {
  const Layout = dynamic(() => import(`layouts/${getLayout(useRouter())}`)) 
   /* mutation */
  const [addAuthenticate, { data, loading, error }] = useMutation(AUTHENTICATE, {
    onCompleted(data) {
        useMessage.setState(  data.authenticate.__typename === 'CurrentUser' ? { 
          active: true,
          title: 'CurrentUser login success',
          type: 'success' 
        }:{ 
          active: true,
          title: 'CredentialError',
          type: 'error'  
        }) 
    }, 
    optimisticResponse(){
      useMessage.setState({ active: false })
    }
  });
  return (
    <Layout>
        <h2 className="text-xl mb-5">Profile</h2>
       <LineForm 
              className="flex flex-col flex-1 gap-2 text-gray-400" 
              fields={form} 
              callback={addAuthenticate} 
              submit={submit}  />
    </Layout>
  );
};
export default Profile;