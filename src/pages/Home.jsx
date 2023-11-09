import React, { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import View from '../components/View';
import Category from '../components/Category';
import Add from '../components/Add';
import { Link } from 'react-router-dom';


function Home() {
  //state creating for state lifting data sharing (data stored in 'uploadVideoStatus' and the value changing functn is 'setUploadVideoStatus' ). so, here value changing at Add.jsx and value stored is displayed at View.jsx. so give 'setUploadVideoStatus' in Add.jsx and give 'uploadVideoStatus' in View.jsx
  const [uploadVideoStatus, setUploadVideoStatus] = useState({}) //videos are uploaded as objects, so give empty object notation curly brackets

  return (
    <>
      <div className='container mt-5 mb-5 d-flex justify-content-between align-items-center'>
        <div className="add-videos">
          <Add setUploadVideoStatus={setUploadVideoStatus} /> {/* state lifting - give 'setUploadVideoStatus' in Add.jsx , // then we can destructure tis at the add.jsx */}
        </div>
        <Link to={'/watch-history'} style={{fontFamily:'Lorem', textDecoration:'none',color:'white',fontSize:'30px'}}>Watch History</Link>
        
      </div>
      <div className="container-fluid w-100 mt-5 mb-5 d-flex justify-content-between">
        <div className="all-videos col-lg-9">
          <h4 className='mb-5'>All Videos</h4>
          <View uploadVideoStatus={uploadVideoStatus}/>  {/* state lifting - give 'uploadVideoStatus' in View.jsx . //// then we can destructure tis at the View.jsx*/}
        </div>
        <div className="category col-lg-3">
          <Category/>
        </div>

      </div>
     
    </>

  )
}

export default Home