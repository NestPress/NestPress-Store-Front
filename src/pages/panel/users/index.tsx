
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { FiArrowRightCircle} from "react-icons/fi";
import { TextareaField, InputField,SelectField, Button } from 'components/forms'
import { getLayout } from 'helpers/getLayout'

import { gql, useQuery } from '@apollo/client';
import { CUSTOMERS } from "modules/user/gql"

const Users: React.FC = () => {
  const router = useRouter();
  const Layout = dynamic(() => import(`layouts/${getLayout(router)}`)) 
  const { loading, error, data } = useQuery(CUSTOMERS,{
    onCompleted(data) {
      // console.log('getUsers',data.customers.items)
    }
  });
  return (
    <Layout>
        <h2 className="text-xl mb-5">Users</h2>
        <table className="w-full">
          <tr className="text-sm">
            <th className="p-2">Nick name</th>
            <th className="p-2">First name</th>
            <th className="p-2">Last name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Phone number</th>
          </tr>
          {data?.customers?.items.map(customer => (
            <tr 
              className="border-b text-sm hover:bg-gray-100 cursor-pointer"
              key={customer.id}  
              onClick={()=>router.push(`/panel/profile/${customer.id}`)}>
              <td className="p-2">{customer.title}</td>
              <td className="p-2">{customer.firstName}</td>
              <td className="p-2">{customer.lastName}</td>
              <td className="p-2">{customer.emailAddress}</td>
              <td className="p-2">{customer.phoneNumber}</td>
            </tr>
          ))}
        </table>
    </Layout>
  );
};
export default Users;