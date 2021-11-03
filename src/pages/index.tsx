
import dynamic from 'next/dynamic'
import { MainMenu, Footer, NavLink } from 'components/nav'
import { HighlightedCard, IHTCard } from 'components/layout'
import { FiSearch, FiWatch, FiPhoneCall, FiCalendar, FiMapPin, FiVideo} from "react-icons/fi";
import { mainCategory } from 'blogData/data'
import { categoryType } from 'types/layout'
const Layout = dynamic(() => import(`layouts/Layout`))


const Home: React.FC = () => {
  
  return (
    <Layout>
      <h1 className="text-8xl font-bold text-right">SimpleBlog</h1>
      <h2 className="text-6xl font-bold text-right">Template</h2>
      {/*<!-- CATEGORIES -->*/}
      <HighlightedCard className="text-sm mt-2" color="darkbg">
        { mainCategory.map((el:categoryType,i:number)=>{
          return <span key={i}>
            <NavLink to={`/results/${el.value}`}>{el.label}</NavLink> 
            <span> · </span>
            </span>
          })
        }
      </HighlightedCard>
      {/*<!-- SHORT SLOGANS -->*/}
      <section className="md:flex gap-x-5 pt-10 px-5 md:px-0">
        <IHTCard title="Slogan 1" Icon={FiSearch} className="md:flex-1" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."/>
        <IHTCard title="Slogan 2" Icon={FiWatch} className="md:flex-1" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."/>
        <IHTCard title="Slogan 3" Icon={FiPhoneCall} className="md:flex-1" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."/>
        <IHTCard title="Slogan 4" Icon={FiCalendar} className="md:flex-1" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."/>
      </section>
    </Layout>
  );
};
export default Home;