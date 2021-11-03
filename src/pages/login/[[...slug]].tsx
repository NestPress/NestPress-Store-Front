import dynamic from 'next/dynamic'
import { MainMenu, Footer } from 'components/nav'
import { Breakpoints,EmptyCard, HighlightedCard } from 'components/layout'
import { menu } from 'mockData/main'
import { LineForm } from 'components/forms'
import { useMutation } from "@apollo/client";
import { useRouter } from 'next/router'
import { form, submit } from "./form"
import { AUTHENTICATE } from "./gql"
import { useMessage } from 'store/messageStore'

const Layout = dynamic(() => import(`layouts/PageLayout`))

const Login: React.FC<Props> = () => {

  const router = useRouter()
  const { slug } = router.query
  
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
      <h2 className="text-2xl font-bold">Login</h2>
      {/*<!-- SPACE -->*/}
      <div className="h-5"></div>
        <EmptyCard className="mb-2.5">
          <HighlightedCard className="md:flex text-sm mb-2.5 gap-x-5">
            <LineForm 
              className="flex flex-col flex-1 gap-2 text-gray-400" 
              name="loginForm" 
              fields={form} 
              callback={addAuthenticate} 
              submit={submit}  />
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