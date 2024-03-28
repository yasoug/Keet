import { makeStyles } from '@mui/styles'

import Card from '../design/Card/Card'


const useStyles = makeStyles({
  content: { display: 'flex', alignItems: 'flex-start', flexDirection: 'column' },


})

const Messages = ({ messages, onMessageClick }) => {

  const classes = useStyles()


  const handleClick = (msg) => () => {
    onMessageClick(msg)
  }

  return messages.map((msg) => (
    <Card
      key={msg.user}
      media={msg.img}
      title={msg.user}
      subheader={msg.lastMessage}
      onClick={handleClick(msg.user)}
      classes={classes}
    />
  ))
}

export default Messages
