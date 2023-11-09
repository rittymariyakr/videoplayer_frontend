import React from 'react'
import {Link} from 'react-router-dom'

function Footer() {
  return (
    
    <div style={{ width: '100%', height: '300px' }} className='d-flex justify-content-center align-items-center flex-column '>
      <div className="footer d-flex justify-content-evenly align-items-center w-100">
        <div className="website" style={{ width: '400px' }}>
          <h4>
            <i className="fa-solid fa-video fa-beat text-warning me-4 mt-5"></i>
            {' '} Video Player
          </h4>
          <h6>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates eius reiciendis similique natus! Excepturi dolorum dignissimos unde similique, soluta temporibus voluptatibus fuga possimus? Inventore sapiente iure harum saepe? Accusantium, porro.
          </h6>
          <h6>Lorem ipsum dolor sit amet </h6>
        </div>
        <div className="Links d-flex flex-column">
          <h4 className='mt-1'>Links</h4>
          <Link to={'/'} style={{textDecoration:"none",color:'white'}}>Landing Page</Link>
          <Link to={'/home'} style={{textDecoration:"none",color:'white'}}>Home</Link>
          <Link to={'/watch'} style={{textDecoration:"none",color:'white'}}>Watch History</Link>
        </div>
        <div className='guides d-flex flex-column'>
        <h4 className='mt-1'>Guides</h4>
          <Link to={'https://react.dev/'} style={{textDecoration:"none",color:'white'}}>React</Link>
          <Link to={'https://react-bootstrap.netlify.app/'} style={{textDecoration:"none",color:'white'}}>React Bootstrap</Link>
          <Link to={'https://bootswatch.com/'} style={{textDecoration:"none",color:'white'}}>Bootswatch</Link>
        </div>
        <div className='contact d-flex flex-column '>
        <h4 className='mt-4'>Contact us</h4>
        <div className='d-flex mt-1'>
            <input type="text" className='form-control' placeholder='Enter Your Email ID' />
            <button className='btn btn-warning text-white ms-2'>Subscribe</button>
        </div>
        <div className='icons d-flex justify-content-evenly mt-3'>
        <Link to={'https://react.dev/'} style={{textDecoration:"none",color:'white'}}><i class="fa-brands fa-whatsapp fa-2x"></i></Link>
          <Link to={'https://react-bootstrap.netlify.app/'} style={{textDecoration:"none",color:'white'}}><i class="fa-brands fa-instagram fa-2x"></i></Link>
          <Link to={'https://bootswatch.com/'} style={{textDecoration:"none",color:'white'}}><i class="fa-brands fa-facebook fa-2x"></i></Link>
        </div>
        </div>
      </div>
      <p>Copyright @2023 Media player. Built with React</p>
    </div>

  )
}

export default Footer
