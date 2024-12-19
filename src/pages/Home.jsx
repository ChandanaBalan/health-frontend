import React, { useEffect, useState } from 'react'
import AddModal from '../components/AddModal'
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import {  getData, updateData } from '../services/allApi';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';







function Home() {
  const [data, setData] = useState([]);
  const [addStatus, setAddStatus] = useState({})
  const navigate = useNavigate()


  const fetchData = async () => {
    try {
      const response = await getData(); // Using the getData function from allApi
      setData(response.data.filter((item) => !item.recycled));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch data from the server
  // Empty dependency array means this runs once on mount

  // Delete function to remove data
  // const handleDelete = async (id) => {
  //   try {
  //     await deleteData(id); // Using the deleteData function from allApi
  //     setData(data.filter(item => item.id !== id)); // Remove from UI
  //   } catch (error) {
  //     console.error('Error deleting item:', error);
  //   }
  // };


  const handleDelete = async (id) => {
    try {
      const itemToRecycle = data.find((item) => item.id === id);
  
      if (itemToRecycle) {
        const updatedItem = { ...itemToRecycle, recycled: true };
        await updateData(id, updatedItem); // Mark the item as recycled in the backend
        setData(data.filter((item) => item.id !== id)); // Refresh the data to remove the item from active cards
      }
    } catch (error) {
      console.error('Error moving item to recycle bin:', error);
    }
  };
  
  useEffect(() => {

    fetchData();
  }, [addStatus]); 

  return (
    <>
      <div className='bg-white'  >
        <div className='container-fluid'>
          <div className="row">
            <img src="https://static.vecteezy.com/system/resources/previews/006/712/985/non_2x/abstract-health-medical-science-healthcare-icon-digital-technology-science-concept-modern-innovation-treatment-medicine-on-hi-tech-future-blue-background-for-wallpaper-template-web-design-vector.jpg" alt="no img" style={{ width: "100%", height: "50vh" }} className='p-0' />
            <div className="col-md-1"></div>
            <div className="col-md-10 justify-content-center align-item-center">

            </div>
            <div className="col-md-1">

            </div>

          </div>
          <div>
           
           
            {/* <div>
              <EditModal/>
            </div> */}
          </div>

          <div className="row mt-5">
            <div className="col-md-2"></div>
            <div className="col-md-8">
            <div className='d-flex justify-content-between align-items-center mt-5'>
              <AddModal setAddStatus={setAddStatus} />
              <Link to={'/home/recyclebin'}><button className='btn btn-danger'>RecycleBin</button></Link>
            </div>
              {data?.length>0?<div className="row mt-5">
                {data?.map((item)=>(
                  <div key={item.id} className="col-md-4 d-flex justify-content-center">
                  <Card style={{ width: '75%' }} className=' p-2 bg-white shadow mb-5 '>
                    <Card.Body>
                      <Card.Title className='text-center text-black'>{item.condition || 'Card Title'}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted text-center">{item.doctor || 'Card Subtitle'}</Card.Subtitle>
                      <div className='d-flex justify-content-around mt-5'>
                        <button onClick={() => navigate(`/home/viewdetails/${item?.id}`)}  className='btn btn-primary text-light'><FontAwesomeIcon icon={faEye} style={{ color: 'white' }} /> </button>
                        <button className='btn btn-danger' onClick={() => handleDelete(item.id)}><FontAwesomeIcon icon={faTrash} /></button>
                      </div>
              

                    </Card.Body>
                  </Card>
                </div>
                ))
                  }
                
              </div>
              :
                <div>
                  <h4 className='text-black text-center mb-5'>No Datas Added...</h4>
                </div>  }
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
      </div>



    </>
  )
}

export default Home