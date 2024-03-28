import MUICard from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import MuiAvatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'


const Card = ({ Avatar, avatar, media, title, subheader, onClick, classes, sx }) => {

  const handleClick = () => onClick(title)

  return (
    <MUICard onClick={onClick ? handleClick : null} sx={[{ cursor: onClick ? 'pointer' : '' }]}>
      <CardHeader
        avatar={
          Avatar ?? (
            <MuiAvatar src={media} sx={{ ...sx?.avatar }} aria-label="recipe">
              {avatar}
            </MuiAvatar>
          )
        }
        title={title}
        subheader={subheader}
        classes={classes}
        action={[
          <IconButton key="x" aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        ]}
      />
    </MUICard>
  )
}

export default Card
