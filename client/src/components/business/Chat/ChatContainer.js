import ChatHeader from './ChatHeader'
import MatchesDisplay from './MatchesDisplay'
import ChatDisplay from './ChatDisplay'

const ChatContainer = ({ user, onLogout }) => {
    return (
        <div className="chat-container">
            <ChatHeader user={user} onLogout={onLogout}/>

      <div>
        <button className="option">Matches</button>
        <button className="option">Chat</button>
      </div>

      <MatchesDisplay />

      <ChatDisplay />
    </div>
  )
}

export default ChatContainer
