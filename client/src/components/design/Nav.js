import Keet_logo from '../../images/Keet_logo.jpg'
const Nav = ({ minimal, setshowModal, showModal, setIsSignUp }) => {
  const handleClick = () => {
    setshowModal(true)
    setIsSignUp(false)
  }
  const authToken = false
  return (
    /* making the navigator bar */
  
   <> 
   
   {!authToken && !minimal && (
        <button className="primary-button mt-6"   onClick={handleClick} disabled={showModal}>
          Log in
        </button>
      ) }
   </>
    
  
  )
}
export default Nav
