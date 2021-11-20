
import dynamic from 'next/dynamic'
import { NavLink } from 'components/nav'
import { HighlightedCard, IHTCard } from 'components/layout'
import { FiSearch, FiWatch, FiPhoneCall, FiCalendar, FiMapPin, FiVideo} from "react-icons/fi";
import { mainCategory } from 'blogData/data'
import { categoryType } from 'types/layout'
import Tree from 'components/Tree'
const Layout = dynamic(() => import(`layouts/Layout`))


const Home2: React.FC = () => {

const treeData = [
  { "id": 1, "text": "Fruits", "parentId": 0, component:"layout/Background" },
  { "id": 2, "text": "Colors", "parentId": 0 },
  { "id": 3, "text": "Cities", "parentId": 0 },
  { "id": 4, "text": "Citrus", "parentId": 1 },
  { "id": 5, "text": "Stone fruits", "parentId": 1 },
  { "id": 6, "text": "Berries", "parentId": 1 },
  { "id": 7, "text": "Orange", "parentId": 4 },
  { "id": 8, "text": "Grapefruit", "parentId": 4 },
  { "id": 9, "text": "Lime", "parentId": 4 },
  { "id": 10, "text": "Nectarine", "parentId": 5 },
  { "id": 11, "text": "Apricot", "parentId": 5 },
  { "id": 12, "text": "Peach", "parentId": 5 },
  { "id": 13, "text": "Strawberry", "parentId": 6 },
  { "id": 14, "text": "Raspberry", "parentId": 6 },
  { "id": 15, "text": "Blueberry", "parentId": 6 },
  { "id": 16, "text": "Darker", "parentId": 2 },
  { "id": 17, "text": "Lighter", "parentId": 2 },
  { "id": 18, "text": "MidnightBlue", "parentId": 16 },
  { "id": 19, "text": "ForestGreen", "parentId": 16 },
  { "id": 20, "text": "Maroon", "parentId": 16 },
  { "id": 21, "text": "SkyBlue", "parentId": 17 },
  { "id": 22, "text": "LightGray", "parentId": 17 },
  { "id": 23, "text": "Khaki", "parentId": 17 },
  { "id": 24, "text": "Europe", "parentId": 3 },
  { "id": 25, "text": "America", "parentId": 3 },
  { "id": 26, "text": "Asia", "parentId": 3 },
  { "id": 27, "text": "Rome", "parentId": 24 },
  { "id": 28, "text": "Berlin", "parentId": 24 },
  { "id": 29, "text": "Madrid", "parentId": 24 },
  { "id": 30, "text": "Beijing", "parentId": 26 },
  { "id": 31, "text": "Chengdu", "parentId": 26 },
  { "id": 32, "text": "Guangzhou", "parentId": 26 },
  { "id": 33, "text": "Houston", "parentId": 25 },
  { "id": 34, "text": "Los Angeles", "parentId": 25 },
  { "id": 35, "text": "New York", "parentId": 25 }
]

  
  return (
    <Layout>
      <h1 className="text-8xl font-bold text-right">SimpleBlog</h1>
      <h2 className="text-6xl font-bold text-right">Template</h2>
      {/*<!-- CATEGORIES -->*/}
      <HighlightedCard className="text-sm mt-2" textcolor="main-text">
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
        <IHTCard iconcolor="main-text" title="Slogan 1" Icon={FiSearch} className="md:flex-1" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."/>
        <IHTCard iconcolor="main-text" title="Slogan 2" Icon={FiWatch} className="md:flex-1" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."/>
        <IHTCard iconcolor="main-text" title="Slogan 3" Icon={FiPhoneCall} className="md:flex-1" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."/>
        <IHTCard iconcolor="main-text" title="Slogan 4" Icon={FiCalendar} className="md:flex-1" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."/>
      </section>
     <Tree treeData={treeData} />
    </Layout>
  );
};
export default Home;