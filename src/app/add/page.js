"use client"
import { useEffect, useState } from "react"
import Image from 'next/image'
import  {storage,database} from '../firebase'
import { useRouter } from "next/router"
import { ref,uploadBytes,listAll ,getDownloadURL} from "firebase/storage";
import {v4} from 'uuid';
import { collection,addDoc,getDocs,deleteDoc,doc } from "firebase/firestore";
import '../style1.css'

export default function page(){
    const [name,setName] = useState('');
    const [idno,setIdno] = useState('');
    const [issue,setIssue] = useState('');
    const [date,setDate] = useState('')
    const [fireData,setFireData] = useState([]);
    const databaseRef = collection (database,'CRUD DATA') 
   const [imageUpload,setImageUpload]= useState(null);
   const [imageList,setImageList] = useState([])


    const imageListRef = ref(storage,"images/")
    const uploadImage = ()=>{
      if(imageUpload === null) return;
     const imageRef = ref(storage, `images/${v4()}`)
     uploadBytes(imageRef,imageUpload) .then(() => {
        console.log("Image uploaded successfully");
        alert("Image uploaded successfully");
      })
      .catch((error) => {
        console.error("Error uploading image:", error.message);
      });
    console.log(imageUpload);
    }

   const addData = () => {
    console.log("Adding data:", { name, idno, issue, date });
    addDoc(databaseRef,{
        name:name,
        idno:idno,
        issue:issue,
        date:date

    }).then(()=>{
        alert('Data Sent')
        setName('')
        setIdno('')
        setIssue('')
        setDate('')
    }).catch((err) => {
        console.error(err.message);
    })
   }

   const getData = async ()=> {
    await getDocs(databaseRef)
    .then((response)=>{
      setFireData(response.docs.map((data)=>{
        return {...data.data(),id: data.id}
      }))
    })
   }

   getData();

   const deleteDocument = (id) => {
    let fieldToEdit = doc(database, 'CRUD DATA', id);
    deleteDoc(fieldToEdit)
    .then(() => {
      alert('Data Deleted')
      getData()
    })
    .catch((err) => {
      alert('Cannot Delete that field..')
    })
  }
   
   useEffect(()=>{
    listAll(imageListRef).then((response) => {
      response.items.forEach((item)=>{
         getDownloadURL(item).then((url)=>{
          setImageList((prev)=>[...prev,url])
         })
      })
    })
   },[]) 
   
    return (
        
      <div >
      <div className='formSection'>
        <h1 className='labelForFileInput'>ADD ISSUE</h1>
        <input className='inputField' value={name} type="text" placeholder="Name" onChange={event => setName(event.target.value)} />
        <input className='inputField' value={idno} type="number" placeholder="Idno" onChange={event => setIdno(event.target.value)} />
        <input className='inputField' value={issue} type="text" placeholder="Issue" onChange={event => setIssue(event.target.value)} />
        <input className='inputField' value={date} type="date" placeholder="Date" onChange={event => setDate(event.target.value)} />
        
        <button className='button' onClick={addData}>add data</button>
      </div>
      <div className='formSection'>
        <label htmlFor="imageInput" className='labelForFileInput' >Upload Image</label>
        <input
          type="file"
          id="imageInput"
          onChange={(event) => setImageUpload(event.target.files)}
          multiple
        />
        <button className='button' onClick={uploadImage}>Submit</button>
      </div>
      <br/>
      <br/>
      <br/>
      <div>
        <table className='dataTable' border='2'>
          <thead>
            <tr>
              <td>Name</td>
              <td>idno</td>
              <td>issue</td>
              <td>date</td>
              <td>delete</td>
              
            </tr>
          </thead>
          <tbody>
            {
              fireData.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{data.name}</td>
                    <td>{data.idno}</td>
                    <td>{data.issue}</td>
                    <td>{data.date}</td>
                    <td><button onClick={() => deleteDocument(data.id)}>Delete</button></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
      <div>
        {
          imageList.map((url)=>{
            return <img src={url} alt="hello" width={100} height={100}/>
          })
        }

      </div>
    </div>
    
  )
}

