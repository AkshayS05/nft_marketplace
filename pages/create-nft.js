import { useState, useMemo, useContext, useCallback } from "react";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useTheme } from "next-themes";

import { Button, Input } from "../components";
import images from "../assets";
import { NFTContext } from "../context/NFTContext";

const CreateNFT = () => {
  // to set form inputs
  const [ formInput, setFormInput ] = useState({ price:'', description:'', name:'' });
  const { theme } = useTheme();
  const [ fileUrl, setFileUrl ] = useState(null);
  const { uploadToIpfs } = useContext(NFTContext);

  // accepted file will be provided by react dropzone
  const onDrop = useCallback(async (acceptedFile)=>{
    // upload image to the ipfs
   const url = await uploadToIpfs(acceptedFile[0]);
    console.log(url);
   setFileUrl(url);
  },[]);

// to check if the file type is valid of not jn order to change styles of the dropzone
const {getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } =  useDropzone({
  onDrop,
  accept:'image/*',
  maxSize:5000000,
});

  const fileStyle = useMemo(()=>(
    `dark:bg-nft-black-1 bg-white border dark:border-white border-nft-gray-2 p-5 flex flex-col items-center rounded-sm border-dashed
    ${isDragActive && 'border-file-active'}
    ${isDragAccept && 'border-file-accept'}
    ${isDragReject && 'border-file-reject'}
    `
  ),[isDragActive, isDragAccept, isDragReject]);

  return (
    <div className="flex justify-center p-12 sm:px-4">
    <div className="w-3/5 md:w-full">
      <h1 className="font-popins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">Create new NFT</h1>
      <div className="mt-16">
        <p className="font-popins dark:text-white text-nft-black-1 font-semibold text-xl">Upload File</p>
      </div>
      <div className="mt-4">
        <div {...getRootProps} className={fileStyle}>
          <input {...getInputProps}/>
          <div className="flexCenter flex-col text-center">
            <p className="font-popins dark:text-white text-nft-black-1 font-semibold text-xl">
            JPG, PNG, GIF, SVG, WEBM MAX 100mb</p>
            <div className="w-full my-12 flex justify-center">
              <Image src={images.upload} 
                width={100}
                height={100}
                objectFit="contain"
                alt="file upload"
                className={theme === 'light' && 'filter invert'}
              />
            </div>
            <p className="font-popins dark:text-white text-nft-black-1 font-semibold text-sm">
            Drag and Drop File</p>
            <p className="mt-2 font-popins dark:text-white text-nft-black-1 font-semibold text-sm">
            or Browse media on your device</p>
          </div>
        </div>
        {fileUrl && (
          <aside>
            <div>
              <img src={fileUrl} alt="asset_file" />
            </div>
          </aside>
        )}
      </div>
          <Input 
          inputType='input' 
            title='Name'
            placeholder='NFT Name'
            handleClick={(e)=> setFormInput({...formInput, name:e.target.value})} />

          <Input 
          inputType='textarea' 
            title='Description'
            placeholder='NFT Description'
            handleClick={(e)=> setFormInput({...formInput, description:e.target.value})} />
            
          <Input 
          inputType='number' 
            title='Price'
            placeholder='NFT Price'
            handleClick={(e)=> setFormInput({...formInput, price:e.target.value})} />

        <div className='mt-7 w-full justify-end'>
        <Button 
        btnName='Create NFT'
        className='rounded-xl'
        handleClick={()=>{}}
      />
            </div>
      </div>

    </div>
  )
}

export default CreateNFT;