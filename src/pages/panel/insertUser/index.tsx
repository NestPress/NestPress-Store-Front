
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useMutation } from "@apollo/client";
import { FiArrowRightCircle} from "react-icons/fi";
import { getLayout } from 'helpers/getLayout'
import { LineForm } from 'components/forms'
import { useMessage } from 'store/messageStore'

import { createNewCustomerForm, submitNewCustomerForm } from "modules/user/form"
import { CREATE_CUSTOMER } from "modules/user/gql"

const InsertUser: React.FC = () => {
  const Layout = dynamic(() => import(`layouts/${getLayout(useRouter())}`)) 
  /* mutation */
  const [addNewCustomer, { data, loading, error }] = useMutation(CREATE_CUSTOMER, {
    onCompleted(data) {
        console.log('addNewCustomer',data)
        useMessage.setState(  data.createCustomer.__typename === 'Customer' ? { 
          active: true,
          title: 'Create new user success',
          type: 'success' 
        }:{ 
          active: true,
          title: data.createCustomer.__typename,
          type: 'error'  
        }) 
    }, 
    optimisticResponse(){
      useMessage.setState({ active: false })
    }
  });
  return (
    <Layout>
      <h2 className="text-xl mb-5">Insert new user</h2>
      <LineForm 
        className="flex flex-col flex-1 gap-2 text-gray-400" 
        fields={createNewCustomerForm} 
        callback={addNewCustomer} 
        submit={submitNewCustomerForm}  />
    </Layout>
  );
};
export default InsertUser;