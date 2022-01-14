import { FiMapPin } from "react-icons/fi";
import { useRouter } from 'next/router'
import Link from 'next/link'
import { routingTabType } from 'types/layout'

interface Props {
  className?: string;
  actions?: routingTabType
}

export const RoutingTabs: React.FC<Props> = ({ className, actions}) => {
  
  const router = useRouter()
  const { slug } = router.query
  const tab:string = slug?.[2] || 'address'

  const isActive = (name: string) => tab === name ? true : false
  const tabClass = (name: string) => `flex items-center justify-center gap-x-1 py-2.5 ${ isActive(name) ? 'border-b-2 border-green-500' : null}`

  return (
    <div className="flex border-b text-sm mb-2.5 gap-x-5">
      
      {actions?.map((el,i)=>{
          return (<Link key={i} href={`/single/${slug?.[0]}/${slug?.[1]}/${el.value}`}>
            <a  className={tabClass(el.value)}><div className="text-xs"><FiMapPin/></div><span>{el.label}</span></a>
          </Link>)
        })}
    </div>
  );
};

