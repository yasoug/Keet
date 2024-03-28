import { makeStyles } from '@mui/styles'

import Card from '../design/Card/Card'

const useStyles = makeStyles({
  content: { display: 'flex', alignItems: 'flex-start' }
})

const UserHeader = ({ onClick }) => {
  const classes = useStyles()

  return (
    <Card
      media="https://i.imgur.com/BsKiLdih.jpg"
      sx={{ avatar: { height: 50, width: 50 } }}
      title="Binks"
      classes={classes}
      onClick={onClick}
    />
  )
}

export default UserHeader
