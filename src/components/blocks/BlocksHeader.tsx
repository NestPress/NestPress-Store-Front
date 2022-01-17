import { FiEyeOff, FiEye, FiChevronLeft } from "react-icons/fi";
import { useBlocks, useApp, getFromStore, setToStore } from "store";
import { useRouter } from "next/router"
interface Props {
  title?: string;
}
export const BlocksHeader: React.FC<Props> = ({title}) => {
  
  const router = useRouter();
  const rMix = Object.assign({}, getFromStore({store:"router"}), router.query)
  
  return (
    <div className="flex justify-between bg-pink-600 text-white">
      <div
        onClick={(e) => useBlocks.setState({ panel: "mainPanel" })}
        className="border-r p-2 flex items-center cursor-pointer"
      >
        <FiChevronLeft />
      </div>
      <div className="p-2 flex-1">Block: {title}</div>
      <div
        onClick={(e) => {
          // useApp.setState({ custom: { activeTargeter:false }})
          setToStore({'store':'custom',ref:'activeTargeter', data:false})
          // useBlocks.setState({ preview: false });
          router.push(`/${rMix.slugPath[0]}/${rMix.slugPath[1]}`)}}

        className="border-l p-2 flex items-center cursor-pointer"
      >
        
          <div>
            <FiEye />
          </div>
        
          
      </div>
    </div>
  );
};
