/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { FiSettings, FiSave, FiLogIn, FiLogOut } from "react-icons/fi";
import { useRouter } from "next/router";
import { usePage } from "store/pageStore";
import { Upload } from "components/blocks"
import { useApp } from "store";
import { downloadObjectAsJson } from "components/blocks/helpers/blocks";
import { useQuery } from '@apollo/client';
import { FILTER_POSTS } from "components/blocks/gql/composer"
import { useState } from "react";

export const Settings: React.FC = () => {
  
 const [selectedOption, setSelectedOption] = useState(0)



  const router = useRouter()
  const slugPath = router.query?.slugPath || ["Page", "home"];
  const buttonClass =
    " bg-blue-400 w-full p-2 rounded mt-1 text-white hover:bg-blue-500 flex items-center";
  const buttonDeleteClass =
    " bg-red-400 w-full p-2 rounded mt-1 text-white hover:bg-red-500";

  const blocks = useApp((state) => state.display.blocks) || [];

  const { loading, error, data, refetch } = useQuery(FILTER_POSTS,{
    variables: { 
      filter:{
        postType:{
          in: ['Layout','Page']
        }
      }
    },
  });

 console.log('data',data)
  return (
    
      <div>
        <div className="p-2 flex items-center bg-pink-600 text-white">  
          <FiSettings />
          <span className="ml-2">Settings</span>
        </div>

        <div className="text-xs px-4 py-2 border-b bg-yellow-100">
          Message {selectedOption}
        </div>


       
      <div className="mx-2 mt-2">

<select onChange={event => setSelectedOption(event.target.options.selectedIndex)}>
<option>Current page</option>
<option>Layouts and pages</option>
<option>Posts</option>
<option>Events</option>
  </select>     

        {/*<select
        name="form-field-name"
        placeholder="Select a brand"
        searchable={false}
        value={selectedOption}
        onChange={handleChange}
        options={options}
        className="form-select mt-1 block w-full border py-2 bg-white text-xs"
      />
        */}

</div>

       

        <div className="p-2 border-b">
          <button className={buttonClass} 
            onClick={(e)=>download()}>
            <FiSave/>
            <span className="ml-2">Export data</span>
          </button>
        </div>

{/*        (e)=>downloadObjectAsJson({
              slug:slugPath[1],
              postType:slugPath[0],
              blocks:blocks
            },`NP-export-${slugPath[0]}-${slugPath[1]}`)*/}

        
        <Upload res={(content,file)=>{
          if(content){
            const res = JSON.parse(content);
            router.push(`/composer/${res['postType']}/${res['slug']}`)
            console.log(JSON.parse(content),file)
          }else{
            alert('select file')
          }
        }}/>

      </div>
 
  );
};
