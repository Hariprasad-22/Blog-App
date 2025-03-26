import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useClerk,useUser} from '@clerk/clerk-react'
import {UserAuthorContextObj} from '../../contexts/UserAuthorContext'

const Header = () => {
  const {signOut}=useClerk()
  const {currentUser,setCurrentUser}=useContext(UserAuthorContextObj)
  const navigate=useNavigate()

  async function handleSignout() {
    await signOut();
    setCurrentUser(null)
    navigate('/')
    
  }
  const {isSignedIn,user,isLoaded}=useUser()

  return (
    <div>
      <nav className='header d-flex justify-content-between align-items-center'>
       <div>
        <Link to='/'>
        <img src="https://img.pikbest.com/png-images/20241027/classic-quill-pen-emblem_11009572.png!sw800" alt="no image" srcset=""  width={"60px"}/>
        </Link>
       </div>
       <div>
        <ul  className=' d-flex  justify-content-center align-items-center list-unstyled gap-4 my-auto fs-5 fw-semibold'>
          {
            !isSignedIn?
            <>
          <li><Link to=''>Home</Link></li>
          <li><Link to='signin'>Signin</Link></li>
          <li><Link to='signup'>Signup</Link></li>
            </>
            :
            <div className='user-button d-flex align-items-center'>
              <div>
                <img src={user.imageUrl} width={'40px'} className='rounded-circle me-1' alt="" srcset="" />
                </div>
                <div ><p className='mb-0'>{user.firstName}</p></div>
                <div><p className='mb-0 ms-1'>({currentUser.role})</p></div>
                <div><button className="btn btn-danger ms-3" onClick={handleSignout}>Sign Out</button></div>
            </div>
          }

        </ul>
       </div>
      </nav>
    </div>
  )
}

export default Header