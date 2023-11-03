//  import { useState } from 'react'
 import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {getAuth} from 'firebase/auth'
import {v4 as uuidv4} from 'uuid'
import {toast} from 'react-toastify'


 
 const useUploadFile = (files) => {
    const storage = getStorage()
    const auth = getAuth()
    
    const upLoadFile = async () => {
        try {
          const file_url = await Promise.all([...files].map((file) => storeFile(file)))
          return file_url
         
        }catch (error ) {
          toast.error('images not uploaded')
          return
        }
        
       
    }
  
    const storeFile = async file => {
        return new Promise((resolve, reject) => {
          const filename = `${auth.currentUser.uid}-${file.name}-${uuidv4()}`
          const storageRef = ref(storage, filename)
          const uploadTask = uploadBytesResumable(storageRef, file)
          uploadTask.on('state_changed', 
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(`Upload is ${progress} % done`)
              switch (snapshot.state) {
                case 'paused':
                  console.log('Upload is paused')
                  break;
                case 'running':
                  console.log('Upload is running')
                  break;
                default:
                  console.log('Upload state is unknown')
                  break;
              }
            },
            (error) => {
              reject(error)
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadUrl) => {
                  resolve(downloadUrl)
                })
            })
        })
      }
     
      return  { upLoadFile}
      
 }
 
 export default useUploadFile
 
 
