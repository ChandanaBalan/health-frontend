import React from 'react';
import { Link } from 'react-router-dom';

function Landingpage() {
  return (
    <>
      <div className='bg-white' style={{marginTop:"110px"}}>
        <div className='container py-5'  >
          <div className='row align-items-center justify-content-between' >
            <div className="col-md-6 text-center text-md-start">
              <h1 className='text-primary  p-3 p-md-0'>
                We're <span className='fw-bolder text-primary-emphasis'>determined</span> for <br />
                your <span className='fw-bolder text-primary-emphasis'>better life</span>.
              </h1>
              <p className=' p-3 pe-md-5 p-md-0'>
              Your Health, Our Priority
              Stay organized, track your wellness, and make health management simple and secure with us.
              </p>
              <div className='d-flex justify-content-center justify-content-md-start'>
                <Link to={'/register'}><button className='rounded-pill btn btn-primary text-white me-2'>Register</button></Link>
               <Link to={'/login'}> <button className='rounded-pill btn btn-primary text-white'>Login</button></Link>
              </div>
            </div>
            <div className="col-md-6">
              <img
                width={'500px'}
                src="https://technext.github.io/live-doc/v1.0.0/assets/img/gallery/hero.png"
                alt="Healthcare illustration"
                className="img-fluid mt-5 mt-md-0"
              />
            </div>
          </div>
        </div>
  
        <div className='container'>
          <div className='row mt-5 align-items-center'>
            <div className='col-md-5'>
              <img
                width={'100%'}
                src="https://technext.github.io/live-doc/v1.0.0/assets/img/gallery/eye-care.png"
                alt="Eye Care"
                className="img-fluid p-3 p-md-0"
              />
            </div>
            <div className="col-md-2"></div>
            <div className='col-md-5'>
              <h3 className='text-primary  p-3 p-md-0'>
                We've built a healthcare system that puts your needs first.
              </h3>
              <p className=' p-3 p-md-0'>
              Securely store and track medical records, prescriptions, and appointments, while keeping complete health histories accessible. Designed for convenience, our platform empowers you to take control of your well-being.
              </p>
              <img
                src="https://th.bing.com/th/id/OIP.z-p7vLPjwCUuvyR2dKPxIwHaE8?rs=1&pid=ImgDetMain"
                alt="Healthcare Solution"
                className="img-fluid my-5"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landingpage;
