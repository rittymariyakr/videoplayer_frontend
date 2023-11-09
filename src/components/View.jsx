import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ViewCard from './ViewCard';
import { getAllVideos } from '../services/allAPI';


function View({uploadVideoStatus}) {  //state lifting - destructuring

  //state created for accessing the data inside the functn in outside
  const [allVideo, setAllVideo] = useState([])

  //creating state for deleting av video at viewcard.jsx (becoz, view.jsx is the parent of viewcard.jsx // pass thid to videocard at the bottom//then destructre it at the viewcard.jsx)
  const [deleteVideoStatus, setDeleteVideoStatus] = useState(false)

  //display function
  const getAllUploadedVideo = async()=>{
    const response = await getAllVideos()
    console.log(response);
    const {data} = response
    // console.log(data); //this data is inside the function. so we access this data outside the fuctn, so we  create a state 
    setAllVideo(data)  //now we can access this data outside this functn
  }
  

  //to view all the videos we uploaded at the first rendening of the page use useEffect hook
  useEffect(()=>{
    getAllUploadedVideo() //calling this functn on every first rendering
    setDeleteVideoStatus(false)//reset as false 
  },[uploadVideoStatus,deleteVideoStatus])  //Runs on the first render   - // for state lifting props is passed as dependency then also runs when the value of props or state changes // 'uploadVideoStatus' is based on props(becz state is created at the parent and state is destructred here) and 'deleteVideoStatus' based on state(becz state is created in ths componenet)


  return (
    <>
    <Row>
        
      { allVideo.length>0?
      allVideo.map((video)=>(<Col sm={12} md={6} lg={4} xl={3}>  {/* no. of colums to display  */}
        <ViewCard displayVideo = {video} setDeleteVideoStatus={setDeleteVideoStatus}/>    {/* parent to child data sharing(view.jsx to vewcard.jsx) . destructuring this at child(viewcard.jsx)*/}
      </Col>))
      :
        <p>Nothing to display</p>
        }

    </Row>

    </>
  )
}

export default View
