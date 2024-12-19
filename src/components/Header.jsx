import { faNotesMedical, faPowerOff, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useLocation ,useNavigate } from 'react-router-dom';
import { getUserData } from '../services/allApi';



function Header() {
  // Get current location
  const location = useLocation();

  const navigate = useNavigate();

  const [user,setuser]=useState([])

  // Check if the current route is the landing page
  const isExcludedPage = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register';

  const handleLogout = () => {
    navigate('/');  
  };

  // const getuser =async(id)=>{
  //   const result =await getUserData(id)
  //   setuser(result)
   const inputStyle = {
    borderRadius: "15px",
   };

  useEffect(()=>{
    getUserData()
  },[])

  return (
    <>

      <div className='bg-primary container-fluid fixed-top' >
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8 py-3">
            <div className='d-flex justify-content-between align-items-center'>
              <Link to={'/'} style={{textDecoration:"none"}}><h1><FontAwesomeIcon icon={faNotesMedical} style={{ color: "black" }} className='me-3' />Healthy you.</h1></Link>
              <div>
                {!isExcludedPage && (
                  <button className='btn btn-danger' onClick={handleLogout}><FontAwesomeIcon icon={faPowerOff} className='me-2' />Logout</button>
                )
              }
              </div>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>

    </>
  )
}

export default Header