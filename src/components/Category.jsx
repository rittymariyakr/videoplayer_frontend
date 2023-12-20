import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { addAllCategory, deleteCategory, getAVideo, getAllCategories, updateCategory } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import Row from 'react-bootstrap/Row';
  import Col from 'react-bootstrap/Col';
import ViewCard from './ViewCard';
function Category() {

  //state to store category name value from input field
  const [categoryName, setCategoryName] = useState("")

  const [category , setCategory] = useState([])

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //function to add category
  const addCategory = async()=>{
    console.log(categoryName);
    
    if(categoryName){  //if category is there
      //creating a body to store categoryname and all videos belongs to that category
      let body = {
        categoryName, //categoryName:categoryName => categoryName
        allVideos:[], // empty array for storing that particular category of videos
      }

      //function call form allAPI
      const response = await addAllCategory(body) //now the value  will be added to the db
      console.log(response);

      if(response.status>=200 && response.status<300){
        toast.success('Category Added Successfully')
        //state value is made null
        setCategoryName("")
        //close the modal
        handleClose()
        //to automatic appearance of category without refreshing the page
        allCategory()
      }
      else{
        toast.error('Somethimg Went Wrong. Please try again later')
      }
    }
    else{
      toast.warning('Please Enter Category Name')
    }
  }

  //function to get all categories
  const allCategory = async()=>{
    const {data} = await getAllCategories()
    // console.log(data);
    setCategory(data)
  }
  console.log(category);

  //function to delte category
  const deleteACategory = async(id)=>{
    await deleteCategory(id)
    //automatic disapperance of acteogery when delte
    allCategory()
  }

  //function to prevent reload at dragg and drop ,so that the data we send wont lost
  const dragOver = (e)=>{
    e.preventDefault()
  }

  const videoDrop = async(e,categoryId)=>{
    console.log(`dropped on the category Id : ${categoryId}`);

    let videoId = e.dataTransfer.getData("videoID") //getData is to get data that send from viewcard 
    console.log(videoId);

    const {data} = await getAVideo(videoId)
    console.log(data);

    const selectedCategory = category.find(item=>item.id===categoryId)
    selectedCategory.allVideos.push(data)
    console.log(selectedCategory);

    await updateCategory(categoryId, selectedCategory)
    allCategory()
  }


  useEffect(()=>{
    allCategory()
  },[])

  return (
    <>
    <div className='d-grid ms-3'>
       <Button onClick={handleShow} variant="warning">Add New Category</Button>{' '}
       {/* <button className='btn btn-warning'>Add New Category</button> */}
    </div>

    {category?.length>0?
    category.map((item)=>(<div className='mt-5 ms-5 border border-secondary p-2 rounded'>
    <div className='d-flex justify-content-between align-items-center' droppable onDragOver={(e)=>dragOver(e)} onDrop={(e)=>videoDrop(e,item?.id)}>
      <h6>{item.categoryName}</h6>
      <button onClick={()=>deleteACategory(item?.id)} className='btn btn-danger'><i class="fa-solid fa-trash-can"></i></button>
    </div>
    <Row>
      <Col>
      {item?.allVideos.length>0?
      item?.allVideos?.map(card=>(<ViewCard displayVideo={card} ispresent={true}/>))
      : <p>Nothing to display</p>
      }

      </Col>
    </Row>
  </div>))
      
    :
    <p className='m-3 fw-bolder fs-5 text-danger'>No Category</p>}

    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <form className='border border-secondary p-3 rounded'>
          <Form.Label>Category Name</Form.Label>
         <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control onChange={(e)=>setCategoryName(e.target.value)} type="text" placeholder="Category Name" autoComplete='off'/>
         </Form.Group>
         
          </form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={addCategory} variant="warning">Upload</Button>
        </Modal.Footer>
      </Modal>

      {/* toasting customixation */}
      <ToastContainer position='top-center' theme='colored' autoClose={2000}/>

    </>
  )
}

export default Category

