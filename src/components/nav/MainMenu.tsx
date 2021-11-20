// @ts-nocheck
import { ApperianceType } from 'types/layout'
import { useState, useEffect } from 'react';
import { useMenu } from 'store/menuStore'
import { NavLink } from 'components/nav'
import { menuType } from 'types/layout'
import { useUser } from 'store/userStore'

interface Props {
  className?: string
  actions: menuType
  hideIcon?: boolean
  iconColor?: string
}
const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = typeof window !== 'undefined' ? 
    window : 
    {innerWidth:769, innerHeight:100};
  return {
    width,
    height
  };
}
export const MainMenu: React.FC<Props> = ({ className, actions, hideIcon, iconColor }) => {

  const menu = useMenu( state => state )
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
  const token = () => useUser( state => state )?.token;
 
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div className={className}>  
      <div className={`${ (!menu.isOpen && (windowDimensions?.width < 768) ) ? 'hidden' : null } flex pt-3 flex-col md:pt-0 md:flex-row items-center md:text-xs xl:text-sm md:gap-x-3 xl:gap-x-5 flex-auto`}>
        {actions?.map((el,i)=>{
          const link = <NavLink  key={i} to={el.to} className="leading-8">{el.label}</NavLink>
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
      </div>

      {!hideIcon &&
      <div className="md:hidden absolute right-0 top-0">
        <button
            onClick={() => useMenu.setState({ isOpen: !menu.isOpen })}
            type="button"
            className={`bg-white inline-flex items-center justify-center p-1 mx-2 my-4 rounded-md dark-text hover:light-text hover:light-background `}
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {!menu.isOpen ? (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            ) : (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
      </div>
    }
      
    </div>
  );
};