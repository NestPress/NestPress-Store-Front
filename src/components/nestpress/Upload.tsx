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
  const [fileLocalUrl, setFileLocalUrl] = useState(null);

  const handleFileLoad = (event) => {
    setIsFilePicked(event.target.result);
  }

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    const reader = new FileReader()
    reader.onload = handleFileLoad;
    reader.readAsText(event.target.files[0])

    setFileLocalUrl(URL.createObjectURL(event.target.files[0]));

  };

  const handleSubmission = () => {
    res(isFilePicked, selectedFile)
  };

  const buttonClass =
    " bg-blue-400 w-full p-2 rounded mt-1 text-white hover:bg-blue-500 flex items-center";
  const buttonDeleteClass =
    " bg-red-400 w-full p-2 rounded mt-1 text-white hover:bg-red-500 flex items-center";

  const fileInput = {}

  return(
   <div>
      <input ref={ref=> fileInput = ref} className="text-xs p-2 w-full" type="file" name="file" onChange={changeHandler} />
      {selectedFile && 
        <>
          <div className="text-xs p-2 grid grid-cols-3 ">
            <p className="border-b p-1">Filename:</p> 
            <p className="border-b p-1 col-span-2">{selectedFile?.name}</p>
            <p className="border-b p-1" >Filetype:</p> 
            <p className="border-b p-1 col-span-2">{selectedFile?.type}</p>
            <p className="border-b p-1">Size in bytes:</p> 
            <p className="border-b p-1 col-span-2">{selectedFile?.size}</p>
            <p className="border-b p-1">lastModifiedDate:{' '}</p>
            <p className="border-b p-1 col-span-2">
              {selectedFile?.lastModifiedDate.toLocaleDateString()}
            </p>
            
          </div>
          { (fileLocalUrl && selectedFile?.type === 'image/png') && <img src={fileLocalUrl} style={{width:'100%', height:"auto"}}/>}
        </>
      }
       {selectedFile && <div className="border-b px-2 pb-2 grid grid-cols-2 gap-1">
        <button className={buttonClass} onClick={handleSubmission}>Submit file</button>
        <button className={buttonDeleteClass} onClick={()=>{
          fileInput.value = ""; 
          setSelectedFile(false) 
          setIsFilePicked(false)
          setFileLocalUrl(null)
        }}>Clear</button>
      </div>      }
    </div>
  )
}