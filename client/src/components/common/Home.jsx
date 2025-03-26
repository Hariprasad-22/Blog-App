import {useContext,useEffect,useState} from 'react'
import {UserAuthorContextObj} from '../../contexts/UserAuthorContext'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
const Home = () => {
  const {currentUser,setCurrentUser}=useContext(UserAuthorContextObj)
  const [error,setError]=useState("");

  const {isSignedIn,user,isLoaded}=useUser()

async function onSelectRole(e){
  setError('')
   const selectedRole=e.target.value
   console.log(selectedRole)
   currentUser.role=selectedRole
   let res=null
   
   if(selectedRole==='author'){
    res=await axios.post('http://localhost:5000/author-api/author',currentUser)
    let {message,payload}=res.data
    if(message==='author'){
      setCurrentUser({...currentUser,...payload})
    }else{
      setError(message)
    }
   }
   if(selectedRole=='user'){
    res=await axios.post('http://localhost:5000/user-api/user',currentUser)
    let {message,payload}=res.data
    if(message=='user'){
      setCurrentUser({...currentUser,...payload})
    }else{
      setError(message)
    }
   }
 }

  useEffect(()=>{
    setCurrentUser({
      ...currentUser,
      firstName:user?.firstName,
      lastName:user?.lastName|| "",
      email:user?.emailAddresses[0].emailAddress,
      profileImageUrl:user?.imageUrl
    })
  },[isLoaded])
  
  const navigate=useNavigate()
  useEffect(()=>{
    if(currentUser?.role=="user" && error.length==0){
      navigate(`/user-profile/${currentUser.email}`)
    }
    if(currentUser?.role=="author" && error.length==0){
      navigate(`/author-profile/${currentUser.email}`)
    }
  },[currentUser?.role])
  return (
    <div className='container'>
      {
        isSignedIn==false && <div>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, mollitia assumenda quas necessitatibus nemo fuga deserunt accusantium autem neque voluptatum sunt tempore maxime totam, eaque laborum, ratione eius magnam sit!</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, mollitia assumenda quas necessitatibus nemo fuga deserunt accusantium autem neque voluptatum sunt tempore maxime totam, eaque laborum, ratione eius magnam sit!</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, mollitia assumenda quas necessitatibus nemo fuga deserunt accusantium autem neque voluptatum sunt tempore maxime totam, eaque laborum, ratione eius magnam sit!</p>
        </div>
      }
      {
        isSignedIn==true && 
        <div className='profile rounded-5'>
          <div className=' d-flex justify-content-around p-3 '>
        <img src={user.imageUrl} alt="" width={'100px'} srcset="" className='rounded-circle'/>
        <p className='display-4'>{user.firstName}</p> 
        </div>
        <div>
        <p className="fs-4 fw-semibold ms-4">Select role:</p>
        {
          error?.length>0 && (
            <p className='text-danger fs-5' style={{fontFamily:"sans-serif"}}>
              {error}
            </p>
          )
        }
        </div>
        <div className=' d-flex gap-5 bg-black justify-content-center text-light fs-5 rounded-4 p-2'>
        <div className="form-check">
          <input type="radio" name="role" id="user" value="user" className='form-check-input' onChange={onSelectRole} />
          <label htmlFor="user" className='form-check-label'>User</label>
     </div>
      <div className='form-check'>
          <input type="radio" name="role" id="author" value='author' className='form-check-input' onChange={onSelectRole} />
          <label htmlFor="author" className='form-check-label'>Author</label>
        </div>
        </div>
        </div>
 
      
      }
      
    </div>
  )
}

export default Home