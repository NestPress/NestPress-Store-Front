/* TODO fix type */
// @ts-ignore
// @ts-nocheck

import { useBlocks } from "store/blocksStore";
import { useEffect , useRef} from "react";
import { getNestedChildren } from 'components/blocks/helpers/blocks'
import { TextareaField, BackgroundColor, NumberField, FontSize, TextColor, Border } from "components/blocks/blockControlls"
interface Props {
  id: string;
}
export const Copypaste: React.FC<props> = ({id}) => {
  const props = useRef(id);

  // useEffect(() => {
  //   window.addEventListener('keydown', (e) => {
  //     e = e || window.event; 
  //     const key = e.which || e.keyCode, ctrl = e.ctrlKey ? e.ctrlKey : ((key === 17)
  //         ? true : false);
  //     if (key == 86 && ctrl) {
  //         id && console.log(props)
  //     }
  //     else if (key == 67 && ctrl) {
  //         id && console.log(id )
  //     }
  //   });
  // }, [props]);


  return <div>dupa {id}</div>;
};
