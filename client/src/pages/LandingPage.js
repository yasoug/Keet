import Nav from '../components/design/Nav'
import AuthModal from '../components/AuthModal'
import { useState } from 'react'
import Keet_logo from '../images/Keet_logo.jpg'


// Functional component 'LandingPage'
const LandingPage = () => {
  // State for managing modal visibility and sign-up mode
  const [showModal, setshowModal] = useState(false)
  const [IsSignUp, setIsSignUp] = useState(true)
  // Dummy authentication token
  const authToken = false
  // Handler for button click
  const handleClick = () => {
    console.log('clicked')
    // Show modal and set it to sign-up mode
    setshowModal(true)
    setIsSignUp(true)
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">    
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure className='p-0'>
          <img src={Keet_logo} alt="logo" className='mt-2' style={{ width: "150px", height: "auto" }} />
        </figure>
        <div className="card-body pt-0 pb-0"> 
        <h2 className="card-title text-center mx-auto mb-3 text-xl font-bold text-green-500">
          KeetsConnect: Find Feline Love with Our Purrfect Dating App!
        </h2>
        <Nav
        minimal={false}
        setshowModal={setshowModal}
        showModal={showModal}
        setIsSignUp={setIsSignUp} 
        />
          <button className="primary-button  mt-8" onClick={()=>handleClick()}>
            {authToken ? 'Signout' : 'Create an account'}
          </button>
          {showModal && <AuthModal setshowModal={setshowModal} IsSignUp={IsSignUp} />}
          <p className="text-center text-lg text-red-600 mt-12 ">Hurry up and find the perfect match for your cat!</p>
        </div>
      
      
      </div>
    </div>
  )
}

export default LandingPage
