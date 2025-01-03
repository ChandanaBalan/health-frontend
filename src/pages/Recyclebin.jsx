import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { deleteData, getData, updateData } from '../services/allApi';


function Recyclebin() {
  const [recycledData, setRecycledData] = useState([]);


  // Fetch recycled data
  const fetchRecycledData = async () => {
    try {
      const response = await getData();
      const recycledItems = response.data.filter((item) => item.recycled); // Filter for recycled items
      setRecycledData(recycledItems);
    } catch (error) {
      console.error('Error fetching recycled data:', error);
    }
  };

 // Restore an item
 const handleRestore = async (id) => {
  try {
    const itemToRestore = recycledData.find((item) => item.id === id);

    if (itemToRestore) {
      const updatedItem = { ...itemToRestore, recycled: false }; // Mark as not recycled
      await updateData(id, updatedItem); // Update backend
      fetchRecycledData(); // Refresh recycle bin data
    }
  } catch (error) {
    console.error("Error restoring item:", error);
  }
};


  // Delete permanently
  const handlePermanentDelete = async (id) => {
    try {
      await deleteData(id); // Delete item permanently from the backend
      fetchRecycledData(); // Refresh recycled data
    } catch (error) {
      console.error('Error deleting item permanently:', error);
    }
  };

  useEffect(() => {
    fetchRecycledData();
  }, []);

  return (
    <>

    <div className='bg-white container-fluid' style={{marginTop:"110px", height:"100vh"}}>
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8 table-responsive">
        
          {recycledData.length>0?<table className='table table-bordered mt-5'>
            <thead>
              <tr>
                <th className='text-center'>No.</th>
                <th className='text-center'>Health condition</th>
                <th className='text-center'>Action</th>
              </tr>
            </thead>
            <tbody>
              {recycledData.map((item, index) => (
                <tr key={item.id}>
                <td className='text-center'>{index + 1}</td>
                <td className='text-center'>{item.condition}</td>
                <td className='text-center'><Button
                        variant="success"
                        className="me-2"
                        onClick={() => handleRestore(item.id)}
                      >
                        Restore
                      </Button>
                      <Button variant="danger" onClick={() => handlePermanentDelete(item.id)}>Delete</Button></td>
              </tr>
              ))
                }
              
            </tbody>
          </table>
:
          <div>
                <h4 className='text-black text-center mt-5'>Recycle bin is empty.</h4>
          </div>}
          <div className='d-flex justify-content-end  px-5'>
             
             <Link to={'/home'}><h5 className='text-black'> <FontAwesomeIcon icon={faHouse} /> Back Home</h5></Link>
           </div>
        </div>
        <div className="col-md-2"></div>
      </div>
    </div>
       
    </>
  )
}

export default Recyclebin