import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { uploadVideo } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function Add({setUploadVideoStatus}) { // state lifting  - destructuring 
    const [show, setShow] = useState(false);

    //to store data single usestate is created and given the data as object
    const [Videos, setVideos] = useState({
      id:"",
      caption:"",
      url:"",
      embedLink:""
    })
  // console.log(Videos);
  
  //for link slicing and giving it to embed link
  const embedVideoLink=(e)=>{
    const {value} = e.target
    console.log(value.slice(-11));
    const link =`https://www.youtube.com/embed/${value.slice(-11)}`
     setVideos({...Videos,embedLink:link})    }
  console.log(Videos);
  //<iframe width="853" height="480" src="https://www.youtube.com/embed/szvt1vD0Uug" title="LEO - Naa Ready Lyric Video | Thalapathy Vijay | Lokesh Kanagaraj | Anirudh Ravichander" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

  //video uploading
const handleUpload = async()=>{
  const {id, caption, url, embedLink} = Videos
  if(!id || !caption || !url || !embedLink){ //if no values entered
    toast.warning("please fill the form Completely")
  }
  else{
    const response = await uploadVideo(Videos)
    console.log(response);
    if(response.status>=200 && response.status<300){
      setUploadVideoStatus(response.data)  //state lifting-  giving the data into state changing function
      toast.success('Video Uploaded Successfully')
      //to close the modal after uploading
      handleClose()
    }
    else{
      console.log(response);
      toast.error('Something went Wrong. Try again later!!')
    }
  }
}

  //handle close //to close the modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  return (
    <>
    <div className='d-flex align-items-center'>
      <h5 style={{fontFamily:'Lorem'}}><i class="fa-solid fa-film me-2 text-warning"></i>Upload new Video</h5>
      <button onClick={handleShow} className='btn'><i class="fa-solid fa-cloud-arrow-up fs-5"></i></button>
    </div>
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload Videos</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <form className='border border-secondary p-3 rounded'>
          <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control onChange={(e)=>setVideos({...Videos,id:e.target.value})}  type="text" placeholder="Enter Video ID " />
         </Form.Group>
         <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control onChange={(e)=>setVideos({...Videos,caption:e.target.value})}  type="text" placeholder="Enter Video Caption" />
         </Form.Group>
         <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control onChange={(e)=>setVideos({...Videos,url:e.target.value})} type="text" placeholder="Enter Video Image URL" />
         </Form.Group>
         <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control  onChange={embedVideoLink}  type="text" placeholder="Enter YouTube Video Link" />
         </Form.Group>
          </form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUpload} variant="warning">Upload</Button>
        </Modal.Footer>
      </Modal>
      {/* toasting customixation */}
      <ToastContainer position='top-center' theme='colored' autoClose={2000}/>
    </>
  )
}

export default Add
