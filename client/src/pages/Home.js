// Importing necessary dependencies and components from React and custom modules
import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/layout'
import Messages from '../components/business/Messages'
import Matches from '../components/business/Matches'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Messaging from './Messaging'
// Sample data for messages, matches, and users
const messages = [
  {
    user: 'Glen',
    lastMessage: '',
    img: 'https://i.imgur.com/aMPNEAw.jpg'
  },
  {
    user: 'Jake',
    lastMessage: 'hellooo',
    img: 'https://i.imgur.com/FnmRIGi.jpeg'
  }
]

const matches = [
  {
    user: 'Glen',
    img: 'https://i.imgur.com/aMPNEAw.jpg'
  },
  {
    user: 'Jake',
    img: 'https://i.imgur.com/FnmRIGi.jpeg'
  }
]



const Home = () => {
 
  const navigate = useNavigate()
  // State to track the active tab
  const [tab, handleChangeTab] = useState(0)
  const [users, setUsers] = useState([]);

  useEffect(() => {

    fetchUserData();
  }, []);

  const handleNavigate = (route) => () => {
    navigate(`/home/${route}`)
  }

  
  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/users'); 
      console.log(response)
      if (response) {
        const formattedUsers = response.data.map(user => ({
          title: user.name,
          subHeader: user.likes,
          media: user.url
        }));
        setUsers(formattedUsers);
        console.log('users',users)
      } 
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const tabs = [
    <Messages key="matches" messages={matches} onMessageClick={handleNavigate('messaging')} />,
    <Messages key="messages" messages={messages} onMessageClick={handleNavigate('messaging')} />
  ]

  return (
    <Layout onChangeTab={handleChangeTab} current={tab} tabs={tabs}>
      <Matches users={users} />
      <Routes>
        <Route path="messaging" element={<Messaging />} />
      </Routes>
    </Layout>
  )
}

export default Home
