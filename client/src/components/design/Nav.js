import Keet_logo from '../../images/Keet_logo.jpg'
const Nav = ({ minimal, setshowModal, showModal, setIsSignUp }) => {
  const handleClick = () => {
    setshowModal(true)
    setIsSignUp(false)
  }
  const authToken = false
  return (
    <nav>
      <div className="logo-container">
        <img className="logo" src={Keet_logo} alt="logo" />
      </div>
      {!authToken && !minimal && (
        <button className="nav-button" onClick={handleClick} disabled={showModal}>
          Log in
        </button>
      )}
    </nav>
  )
}
export default Nav
