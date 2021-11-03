import { NavLink, LogoutLink } from 'components/nav'
import { FiCalendar, FiMapPin, FiRotateCcw, FiUser, FiMessageSquare, FiChevronRight, FiLogOut} from "react-icons/fi";

export const VerticalMenu: React.FC<Props> = () => {
  const slug = ''
  return (
    <>
      {/*<h2 className="text-xl font-bold">Panel</h2>*/}
      <div className="flex items-center">
        <FiUser/>
        <NavLink className={`m-2 ${slug==='profile'? 'text-green-700' : null}`} to="/panel/profile">Profile</NavLink> 
        { slug==='profile' ? <FiChevronRight className="ml-1 text-green-700"/> : null }
      </div>
      <div className="flex items-center">
        <FiLogOut/>
        <LogoutLink className={`m-2`}/>
        {/*<NavLink className={`leading-10 ml-2 ${slug==='questions'? 'text-green-700' : null}`} to="/panel/logout">Logout</NavLink> */}
        { slug==='questions' ? <FiChevronRight className="ml-1 text-green-700"/> : null }
      </div>
  </>
)}