
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { addToHistory, deleteAVideos } from '../services/allAPI';

function ViewCard({displayVideo, setDeleteVideoStatus}) {  //destructuring the data (displayVideo) from parent (View.jsx)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = async() => {setShow(true)
        //to add to watch history when user opens this modal/playing a video
        const {caption, embedLink} = displayVideo
        //to get time and date of system
        let today = new Date()
        console.log(today);
        //to format date the object Intl.DateTimeFormat is used
        let timestamp = new Intl.DateTimeFormat("en-GB",{year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit'}).format(today)

        console.log(timestamp);

        //creating body for adding history
        let videoDetails = {
            //if key and value are same then given as one. Eg:: caption:caption  => caption
            caption, embedLink, timestamp
        }

        //calling function from allAPI
        await addToHistory(videoDetails)
    }


    //2.  to delete video
const removeVideo = async(id)=>{
    const response = await deleteAVideos(id) //function from AllApi.js
    setDeleteVideoStatus(true) //changing the state as true after deleting a video or when we get a response //becoz the video is disappering only after refreshing the page. to avoid this situation doing this
}

//function to drag the viewCard
const cardDrag = (e,id)=>{
    console.log(`The id of the videoCard dragges is ${id}`);
    e.dataTransfer.setData("videoID",id) // for data transefring to category use dataTransfer method // data stored in setData method
}

    return (

        <>
        <Card onDragStart={(e)=>cardDrag(e,displayVideo?.id)} style={{ width: '100%' , height:'380px'}} className='mb-3' draggable >
            <Card.Img height={'280px'} onClick={handleShow} variant="top" src={displayVideo.url} /> {/*using the above destructured data here  */}
            <Card.Body>
                <Card.Title className='d-flex justify-content-between align-items-center'>
                    <h6>{displayVideo.caption}</h6>
                    {/*1. functn call - if the removeVideo functn has any argumnet give it as call back functn */}
                    <Button onClick={()=>removeVideo(displayVideo?.id)} className='btn btn-danger'><i class="fa-solid fa-trash-can"></i></Button>

                    </Card.Title>
            </Card.Body>
        </Card>

        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        >
        <Modal.Header closeButton>
                <Modal.Title>{displayVideo.caption}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <iframe width="100%" height="530" src={`${displayVideo.embedLink}?autoplay=1`} title={displayVideo.caption}
                 frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                 allowfullscreen></iframe>

                </Modal.Body>
                
            </Modal>
            </>

    );
}

export default ViewCard