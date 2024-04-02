import { useState } from 'react'
import Layout from '../components/layout'
import Messages from '../components/business/Messages'
import Matches from '../components/business/Matches'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Messaging from './Messaging'

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

const users = [
  {
    title: 'Fred',
    subHeader: "I'm a really big fan of socks and cardboards",
    media: 'https://i.imgur.com/Jvh1OQm.jpeg'
  },
  {
    title: 'Whiskers',
    subHeader: 'A really active kitty that likes to go out and play fight',
    media: 'https://i.imgur.com/VgYAFPI.jpeg'
  },
  {
    title: 'Legolas',
    subHeader: 'A prince in paws',
    media: 'https://i.imgur.com/JHfRHrJ.jpeg'
  },
  {
    title: 'Bowser',
    subHeader: 'I love to sunbathe and play with my toys',
    media: 'https://i.imgur.com/rtLmWHZ.jpeg'
  }
]

const Home = () => {
  const navigate = useNavigate()

  const [tab, handleChangeTab] = useState(0)

  const handleNavigate = (route) => () => {
    navigate(`/home/${route}`)
  }

  const tabs = [
    <Messages key="matches" messages={matches} onMessageClick={handleNavigate('messages')} />,
    <Messages key="messages" messages={messages} onMessageClick={handleNavigate('messages')} />
  ]
  console.log(location.pathname)
  return (
    <Layout onChangeTab={handleChangeTab} current={tab} tabs={tabs}>
      {/* Conditionally render Matches only if the route path is not "messages" */}
      
      
      <Routes>
        <Route path='/' element={<Matches users={users} />} exact/>
        <Route path="messages" element={<Messaging />} />
      </Routes>
    </Layout>
  );
}

export default Home
