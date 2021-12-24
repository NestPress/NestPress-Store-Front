/* TODO fix type */
// @ts-ignore
// @ts-nocheck
import { useState } from 'react';

interface Props {
  res: any
}

export const Upload: React.FC = ({ res }) => {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const handleFileLoad = (event) => {
    setIsFilePicked(event.target.result);
  }

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    const reader = new FileReader()
    reader.onload = handleFileLoad;
    reader.readAsText(event.target.files[0])
  };

  const handleSubmission = () => {
    // console.log('jo upload', isFilePicked, selectedFile)
    res(isFilePicked, selectedFile)
  };

  const buttonClass =
    " bg-blue-400 w-full p-2 rounded mt-1 text-white hover:bg-blue-500 flex items-center";
  const buttonDeleteClass =
    " bg-red-400 w-full p-2 rounded mt-1 text-white hover:bg-red-500 flex items-center";

  const fileInput={}
  return(
   <div>
      <input ref={ref=> fileInput = ref} className="text-xs p-2 w-full" type="file" name="file" onChange={changeHandler} />
      {selectedFile && 
        <>
          <div className="text-xs p-2 grid grid-cols-2">
            <p>Filename:</p> <p>{selectedFile?.name}</p>
            <p>Filetype:</p> <p>{selectedFile?.type}</p>
            <p>Size in bytes:</p> <p>{selectedFile?.size}</p>
            <p>
              lastModifiedDate:{' '}
              {selectedFile?.lastModifiedDate.toLocaleDateString()}
            </p>
            <p>Select a file to show details</p>
          </div>
          
        </>
      }
      <div className="border-b px-2 pb-2 grid grid-cols-2 gap-1">
        <button className={buttonClass} onClick={handleSubmission}>Submit file</button>
        <button className={buttonDeleteClass} onClick={()=>{fileInput.value = ""; setSelectedFile(false) }}>Clear</button>
      </div>
    </div>
  )
}