import Link from 'next/link'
import { Stars } from 'components/layout'
import { NavLink } from 'components/nav'
import Image from 'next/image'

interface Props {
  className?: string;
  image?: string;
  name?: string;
  category?: string;
  stars?: number;
  href:string;
}

export const IdCard: React.FC<Props> = ({ className, image, name, category, stars, href }) => {
  return (
    <div className="flex gap-x-5 pb-2.5">
        {/*<!-- Image -->*/}
        <div className=" w-24 h-24 pb-1/4 relative bg-blue-300 rounded overflow-hidden">
          <Link href={href}>
            <a>
              <Image layout="fill" objectFit="cover" src={image || '/empty-person.png'} alt="Picture of the person"  />
            </a>
          </Link>
        </div>
    
        {/*<!-- Descripton -->*/}
        <div className="flex-1">
          <NavLink to={href}>
            <h3 className="text-md font-bold">{name}</h3>
          </NavLink>
          <p className="text-xs pb-1.5 text-gray-500">{category}</p>
          <Stars stars={stars} />
        </div>
      </div>
  );
};