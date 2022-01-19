/* TODO fix type */
// @ts-ignore
// @ts-nocheck
// https://tailwindcss-custom-forms.netlify.app/

import { Upload } from "components/nestpress";


export const Users: React.FC = () => {
  
 

  const buttonClass =
    " bg-blue-400 w-full p-2 rounded mt-1 text-white hover:bg-blue-500";

  const checkFile = (c, f) => {
    console.log(c,f)
  }

  return (
    <div className="text-sm">
      <div className="flex items-center text-base p-2 bg-pink-600 text-white">
        {/*<FiFile />*/}
        <span className="ml-2">Assets</span>
      </div>
      <div className="p-2 mt-1 border-t border-b">
        <div className="flex items-center text-base mb-2">
          {/*<FiAnchor />*/}
          <span className="ml-2">Upload new asset</span>
        </div>
        <Upload res={(c,f)=>checkFile(c,f)}/>
      </div>
    </div>
  );
};
