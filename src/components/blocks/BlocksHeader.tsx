import { FiEyeOff, FiEye, FiChevronLeft } from "react-icons/fi";
import { useBlocks } from "store/blocksStore";

export const BlocksHeader: React.FC<props> = ({title}) => {
  const preview = useBlocks((state) => state.preview);
  return (
    <div className="flex justify-between bg-pink-600 text-white">
      <div
        onClick={(e) => useBlocks.setState({ panel: "mainPanel" })}
        className="border-r p-2 flex items-center cursor-pointer"
      >
        <FiChevronLeft />
      </div>
      <div className="p-2 flex-1">{title}</div>
      <div
        onClick={(e) => useBlocks.setState({ preview: !preview })}
        className="border-l p-2 flex items-center cursor-pointer"
      >
        {!preview ? (
          <div>
            <FiEye />
          </div>
        ) : (
          <div>
            <FiEyeOff />
          </div>
        )}
      </div>
    </div>
  );
};
