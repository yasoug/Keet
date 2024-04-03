import Keet_logo from '../../images/Keet_logo.jpg'
const Nav = ({ minimal, setshowModal, showModal, setIsSignUp }) => {
  const handleClick = () => {
    setshowModal(true)
    setIsSignUp(false)
  }
  const authToken = false
  return (
    <nav className='bar'>
      <div className="logo-container">
        <img className="logo" src={Keet_logo} alt="logo" />
      </div>
      <div className='Title'>Keet🐾</div>
      <div className='Sub'>Where felines find their Meow-tches!🐾🐾 </div>
      {!authToken && !minimal && (
        <button className="nav-button" onClick={handleClick} disabled={showModal} >
          Log in
        </button>
      ) }
  </nav>
  )
}
export default Nav
