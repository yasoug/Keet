import Nav from '../components/design/Nav'
import AuthModal from '../components/AuthModal'
import { useState } from 'react'

const LandingPage = () => {
  const [showModal, setshowModal] = useState(false)
  const [IsSignUp, setIsSignUp] = useState(true)
  const authToken = false

  const handleClick = () => {
    console.log('clicked')
    setshowModal(true)
    setIsSignUp(true)
  }

  return (
    <div className="overlay">
      <Nav
        minimal={false}
        setshowModal={setshowModal}
        showModal={showModal}
        setIsSignUp={setIsSignUp}
      />
      <div className="home">
        <h1 className="primary-title">Like that profile</h1>
        <button className="primary-button" onClick={handleClick}>
          {authToken ? 'Signout' : 'Create an account'}
        </button>

        {showModal && <AuthModal setshowModal={setshowModal} IsSignUp={IsSignUp} />}
      </div>
    </div>
  )
}

export default LandingPage
