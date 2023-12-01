import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { deleteVideoHistory, getAllHistory } from '../services/allAPI';

function WatchHistory() {

  //state for accessing data inside allHistory function outside that function
  const [history, setHistory] = useState([])//data returns array of objects. ie, data is an object. so initial value of state is given as empty array

  //function to get details from history
  const allHistory = async () => {
    const { data } = await getAllHistory()
    // console.log(data); //this data returns array of objects//to access this data outside to this function create a state
    setHistory(data)
  }
  // console.log(history);


  //function to remove history 
  const removeHistory = async (id) => {
    await deleteVideoHistory(id) //function from allAPI
    //to get the remaining history
    allHistory()
  }
  
  //to call function allHistory when we load the watchhistory page
  useEffect(() => {
    allHistory()
  }, [])

  return (
    <div>
      <div className="container mt-5 d-flex justify-content-between">
        <h3>Watch History</h3>
        <Link to={'/home'} className='d-flex align-items-center' style={{ textDecoration: 'none', color: 'white', fontSize: '20px' }}><i class="fa-solid fa-arrow-left me-2"></i>Back to Home</Link>
      </div>
      <table className='table mt-5 mb-5 container'>
        <thead>
          <tr>
            <th >#</th>
            <th >Caption</th>
            <th >URL</th>
            <th >Time Stamp</th>
            <th >Action</th>
          </tr>
        </thead>
        <tbody>
          {/* multiplying this row based on data from allHistory() */}
          {history?.length > 0 ?
            // fetching each item from array (now data are stored in history. data are arrays)
            history?.map((item, index) => (<tr>
              <td>{index + 1}</td>
              <td>{item.caption}</td>
              <td><a href={`${item.embedLink}?autoplay=1`} target='_blank'>{item.embedLink}</a></td>
              <td>{item.timestamp}</td>
              <td><button onClick={() => removeHistory(item?.id)} className="btn btn-danger"><i class="fa-solid fa-trash-can"></i></button></td>

            </tr>))

            :
            <p className='mt-5 fw-bolder fs-4 text-danger text-center'>No Watch History</p>
          }
        </tbody>
      </table>
    </div>
  )
}

export default WatchHistory;
