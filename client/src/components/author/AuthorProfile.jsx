import React from 'react'
import { Outlet,Link } from 'react-router-dom'

const AuthorProfile = () => {
  return (
    <div>
      <ul className='container article-dialog d-flex justify-content-around list-unstyled fs-3 p-3 rounded-4'>
        <li className='nav-item p-2 rounded-3'>
          <Link to='articles' className='nav-link fs-4 fw-semibold'>Articles</Link>
          </li>
        <li className='nav-item p-2 rounded-3'>
          <Link to='article' className='nav-link fs-4 fw-semibold'>Add new Article</Link>
          </li>
      </ul>
      <div className='mt-5'>
        <Outlet/>
      </div>
    </div>
  )
}

export default AuthorProfile