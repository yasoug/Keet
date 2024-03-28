
import {  useState } from 'react';
import { useCookies } from 'react-cookie';
import Card from './Card';
import ChatContainer from '../components/ChatContainer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Dashboard = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({})
  const [userbysex] = useState(null)
  const [ cookies, , removeCookie] = useCookies('user')
  const logout = () => {
    removeCookie('user_id', cookies.user_id)
    removeCookie('AuthToken', cookies.AuthToken)
    navigate('/')
  }

const user_id = cookies.user_id
  const getUser = async () => {
    try {
      if (user_id){
      const response = axios.get('http://localhost:8000/user', { params: {user_id}})
      setUser(response.data)  
      }
    } catch (err) {
      console.error(err)
    }
  }

  /*const getuserbysex = async () => {
    try {
      const response = await axios.get('http://localhost:8000/users_sex', {
        params: {sex: user?.sex_interest}
      })
      setUserbysex(response.data)
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getUser()
    getuserbysex()
  }, [user, userbysex])*/


console.log('user', user);
console.log('users of sex', userbysex);


  const updatedmatches = async (matcheduserId) => {
    try {
      await axios.put('http://localhost:8000/addmatch', {
        user_id,
        matcheduserId
      })
      getUser()
    } catch (error) {
      console.log(error);
    }
  }
  console.log(user)
  const profiles = [
    { id: 1, name: 'Mika', bio: 'Likes playing', image: 'LWbxZcb.jpeg' }
    // Add more profiles as needed
  ]
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0)

  const handleLike = () => {
    updatedmatches(user_id)
    // Handle the like action (e.g., update state, fetch next profile, etc.)
    // For simplicity, we'll just move to the next profile
    setCurrentProfileIndex(currentProfileIndex + 1)
  }

  const handleDislike = () => {
    // Handle the dislike action (e.g., update state, fetch next profile, etc.)
    // For simplicity, we'll just move to the next profile
    setCurrentProfileIndex(currentProfileIndex + 1)
  }

  return (
    <div className="dashboard">
      <ChatContainer user={user} onLogout={logout} />

      {currentProfileIndex < profiles.length ? (
        <Card profile={profiles[currentProfileIndex]} />
      ) : (
        <p>No more profiles</p>
      )}
      <div className="buttons">
        <button onClick={handleDislike}>Dislike</button>
        <button onClick={handleLike}>Like</button>
      </div>
    </div>
  )
}

export default Dashboard
