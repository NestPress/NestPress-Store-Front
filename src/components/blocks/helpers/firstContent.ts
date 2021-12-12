import { CREATE_BLOCK } from "components/blocks/gql/composer"
import { gql, useQuery, useMutation} from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';

 /* mutation */
   export const [addNewBlock, { addNewBlockData, addNewBlockLoading, addNewBlockError }] = useMutation(CREATE_BLOCK, {
      onCompleted(addNewBlockData) {
        addNewBlockData.createBlock.parentId = 0
        useBlocks.setState({ blocks: [addNewBlockData.createBlock] })
      }, 
    });

export const createFirstContent = () => {

    console.log('nenada')




    
    return false

    addNewBlock({ 
      variables: { 
        input:{
          id: uuidv4(),
          parentId: "0",
          block: "layout/Grid",
          post: slugPath[1],
          order: `0-${slugPath[1]}`,
          attrs: {
            handler:""
          }
        }
      }
    }).catch(error => {
       console.log(error.message)
        // if (error.networkError) {
        //   getNetworkErrors(error).then(console.log)
        // } else {
        //   console.log(error.message)
        // }
    })
  
}