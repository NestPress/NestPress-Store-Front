import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { FiArrowRightCircle} from "react-icons/fi";
import { getLayout, prepareFromQuery, prepareToMutate } from 'helpers'
import { LineForm } from 'components/forms'
import { EmptyCard, HighlightedCard  } from 'components/layout'
import { loginForm, AUTHENTICATE } from "modules/auth"
import { useMutation, useQuery } from "@apollo/client";
import { useMessage } from 'store/messageStore'

const Login: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query
  const Layout = dynamic(() => import(`layouts/Layout`)) 
  const form = loginForm;

  /* mutation */
  const [addMutation, { data, loading, error }] = useMutation(AUTHENTICATE, {
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
      <h2 className="text-2xl font-bold">{ slug }</h2>
      {/*<!-- SPACE -->*/}
      <div className="h-5"></div>
        <EmptyCard className="mb-2.5">
          <HighlightedCard className="md:flex text-sm mb-2.5 gap-x-5">
            <LineForm 
              className="flex flex-col flex-1 gap-2 text-gray-400" 
              fields={form} 
              callback={addMutation} 
              submit={(e)=>{
                e.preventDefault(); 
                addMutation({ 
                  variables: prepareToMutate(form)
                });
              }}
            />
            <div className="flex-1">
              <p className="mt-5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
              </p>
              <p className="mt-5">
                Forgot password?
              </p>
            </div>
          </HighlightedCard>
        </EmptyCard>
      <div className="h-10"></div>
    </Layout>
  );
};
export default Login;