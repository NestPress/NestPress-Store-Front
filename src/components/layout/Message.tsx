import { useMessage } from 'store/messageStore'
import { Breakpoints } from 'components/layout'
import { FiInfo, FiX, FiAlertTriangle, FiSmile } from "react-icons/fi";

export const Message: React.FC = () => {
  const msg:any = useMessage( state => state )
  return msg.active ? (
     
        <div 
          className={`
            ${ msg.type === 'info' && 'bg-blue-100 border-blue-400 '}
            ${ msg.type === 'success' && 'bg-green-100 border-green-400 '}
            ${ msg.type === 'error' && 'bg-red-100 border-red-400 '}
            absolute w-full top-0  border-t-4 rounded-b text-teal-900 px-4 py-3 shadow-md"
          `}
          role="alert">
          <Breakpoints>
            <div className="flex justify-between">
              <div className="py-1 mr-2">
                 { msg.type === 'info' && <FiInfo className="text-blue-400 w-8 h-8"/>}
                 { msg.type === 'error' && <FiAlertTriangle className="text-red-400 w-8 h-8"/>}
                 { msg.type === 'success' && < FiSmile className="text-green-400 w-8 h-8"/>}
              </div>
              <div className="flex-1">
                {msg.title && <p className="font-bold">{msg.title}</p>}
                {msg.content && <p className="text-sm">{msg.content}</p>}
              </div>
              <div className="py-1 ml-2" onClick={()=>{useMessage.setState({ active: false })}}>
                <FiX className="text-gray-900 w-8 h-8 cursor-pointer"/>
              </div>
            </div>
          </Breakpoints>
        </div> 
  ) : null
};