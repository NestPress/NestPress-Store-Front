
import { Breakpoints } from 'components/layout'
import { NavLink } from 'components/nav'
import Image from 'next/image'
interface Props {
  logo?: string
}
export const Footer: React.FunctionComponent<Props> = ({logo}) => {
  return (
    <Breakpoints className="text-gray-700 ">
      <section className="md:flex gap-x-5 py-10 text-left">
        <div className="md:flex-1">
          <h3>Service</h3>
          <ul className="text-sm py-5 text-gray-500 leading-6">
            <li><NavLink to="/article/cookies">Cookies</NavLink></li>
            <li><NavLink to="/article/about-us">About us</NavLink></li>
            <li><NavLink to="/article/contact">Contant</NavLink></li>
            <li><NavLink to="/article/work-with-us">Work with us</NavLink></li>
            <li><NavLink to="/article/terms-of-service">Terms of service</NavLink></li>
          </ul>
        </div>
        <div className="md:flex-1">
          <h3>For the patients</h3>
          <ul className="text-sm py-5 text-gray-500 leading-6">
            <li><NavLink to="/article/cookies">Cookies</NavLink></li>
            <li><NavLink to="/article/about-us">About us</NavLink></li>
            <li><NavLink to="/article/contact">Contant</NavLink></li>
            <li><NavLink to="/article/work-with-us">Work with us</NavLink></li>
            <li><NavLink to="/article/terms-of-service">Terms of service</NavLink></li>
          </ul>
        </div>
        <div className="md:flex-1">
          <h3>For professionals</h3>
          <ul className="text-sm py-5 text-gray-500 leading-6">
            <li><NavLink to="/article/cookies">Cookies</NavLink></li>
            <li><NavLink to="/article/about-us">About us</NavLink></li>
            <li><NavLink to="/article/contact">Contant</NavLink></li>
            <li><NavLink to="/article/work-with-us">Work with us</NavLink></li>
            <li><NavLink to="/article/terms-of-service">Terms of service</NavLink></li>
          </ul>
        </div>
        <div className="md:flex-1">
          <ul className="text-sm py-5 text-gray-500 leading-6">
            <li>
              {logo &&
               <Image
                src={logo}
                alt="Picture of the author"
                width={100}
                height={50}
              />
              }
            </li>
            <li  className="mt-1">
              <div>1026 Tanglewood Road</div>
              <div>39211 MS Jackson Mississippi</div>
            </li>
           
          </ul>
        </div>
      </section>
    </Breakpoints>
  );
};
