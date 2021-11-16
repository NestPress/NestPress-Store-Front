
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { FiArrowRightCircle} from "react-icons/fi";
import { getLayout, prepareFromQuery, prepareToMutate } from 'helpers'
import { LineForm } from 'components/forms'
import { updateCustomerForm, CUSTOMER, UPDATE_CUSTOMER } from "modules/user"
import { useMutation, useQuery } from "@apollo/client";
import { useMessage } from 'store/messageStore'

const Profile: React.FC = () => {
  const router = useRouter();
  const formConst = {id : router.query.id?.[0]}
  const Layout = dynamic(() => import(`layouts/${getLayout(router)}`)) 
  const form = updateCustomerForm;
  
  /* QUERY */
  useQuery(CUSTOMER,{
    variables:{
      id: formConst.id || 0
    },
    onCompleted(data) { 
      prepareFromQuery(form, data, formConst);
    }
  });

  /* MUTATION */
  const [addMutation, { data }] = useMutation(UPDATE_CUSTOMER, {
    onCompleted(data) {
      if(data.updateCustomer.__typename === 'Customer'){
        useMessage.setState({ 
            active: true,
            title: 'Profile updated',
            content: 'You should be proud of yourself',
            type: 'success' 
        })
      } 
      if(data.updateCustomer.__typename === 'EmailAddressConflictError'){
        useMessage.setState({ 
            active: true,
            title: 'Email Address Conflict Error',
            content: 'Try update profile with another email address',
            type: 'error' 
        })
      } 
    }, 
    optimisticResponse(){
      useMessage.setState({ active: false })
    }
  });
  return (
    <Layout>
      <h2 className="text-xl mb-5">User profile</h2>
      <LineForm 
        className="flex flex-col flex-1 gap-2 text-gray-400" 
        fields={form} 
        callback={addMutation} 
        submit={(e)=>{
          e.preventDefault(); 
          // console.log(prepareToMutate(form))
          addMutation({ 
            variables: prepareToMutate(form)
          });
        }}  />
    </Layout>
  );
};
export default Profile;