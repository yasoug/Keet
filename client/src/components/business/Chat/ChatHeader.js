const ChatHeader = ({ user = {}, onLogout }) => {
  return (

    <div className="chat-container-header">
      <div className="profile">
        <div className="img-container">
          <img src={user?.url} alt={"photo of " + user?.name} />
        </div>
        <h3>{user?.name}</h3>
      </div>
      <i className="log-out-icon" onClick={onLogout}>logout</i>
    </div>
  )
}

export default ChatHeader
