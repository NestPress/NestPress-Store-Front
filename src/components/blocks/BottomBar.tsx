import { useRouter, useHistory } from "next/router"; 
import { FiEdit } from "react-icons/fi";

export const BottomBar: React.FC = () => {
  const router = useRouter()
  const slugPath = router.query?.slugPath || ["Page", "home"];
  return (
    <div className="fixed border-t bottom-0 w-full bg-pink-500 text-white flex items-center">
      <div className="p-2 border-r ">NP NestPress</div>    
      <div
        onClick={e=>router.push(['composer',...slugPath].join('/'))} 
        className="p-3 border-r underline text-xs cursor-pointer flex items-center gap-1">
        <FiEdit/>Open composer
      </div>    
    </div>
  );
};
