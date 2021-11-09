import { NavLink, LogoutLink } from 'components/nav'
import { FiChevronRight, } from "react-icons/fi";
import { menuType } from 'types/layout'
import { useRouter } from 'next/router'
import { useUser } from 'store/userStore'

interface Props {
  className?: string
  actions: menuType
  iconColor?: string
}

export const VerticalMenu: React.FC<Props> = ({className, iconColor,  actions}) => {
  const router = useRouter()
  const token = () => useUser( state => state )?.token;
  return (
    <>
      {actions?.map((el,i)=>{
          
          const link = (<div className="flex items-center">
              [ico]
              <NavLink className={`m-2 ${router.asPath === el.to ? 'text-green-700' : null}`} to={el.to}>{el.label}</NavLink> 
              { router.asPath === el.to ? <FiChevronRight className="ml-1 text-green-700"/> : null }
            </div>)

          return ( 
            el.auth 
              ? ( el.auth == 'logout' && !token()) 
                ? link 
                : ( el.auth == 'login' && token()) 
                  ? link 
                  : null
              : link 
            )
        })} 
      <div className="flex items-center">
        [ico]
        <LogoutLink className={`m-2`}/>
      </div>
  </>
)}