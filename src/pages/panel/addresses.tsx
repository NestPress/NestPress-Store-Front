import { FiArrowRightCircle} from "react-icons/fi";
import { TextareaField, InputField,SelectField, Button } from 'components/forms'
import { Panel } from 'components/custom-layout'
const Addresses: React.FC = () => {
  /* form */
  const form = {}
  const sendForm = (event:any) => {
    event.preventDefault();
  }
  return (
    <Panel>
        <h2 className="text-xl mb-5">Addresses</h2>
    </Panel>
  );
};
export default Addresses;