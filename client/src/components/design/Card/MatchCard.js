import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea, CardActions, IconButton } from '@mui/material'
import Collapse from '@mui/material/Collapse'

import { styled } from '@mui/material/styles'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import TinderCard from 'react-tinder-card'
import { useState } from 'react'

const ExpandMore = styled((props) => {
  const {  ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}))

const defaultStyle = { media: { height: 550 }, card: { width: 350, maxWidth: 500, borderRadius: 6 } }

const MatchCard = ({ children, data, actions, onClick, onSwipe, onLeftScreen = () => {}, options = {}, styles = {} }) => {
  const [expanded, setExpanded] = useState(false)

  const handleSwipe = (direction) => onSwipe({ ...data, direction })

  const handleLeftScreen = () => onLeftScreen(data)

  const Swiper = (props) =>
    options?.swipable ? (
      <TinderCard
        onSwipe={handleSwipe}
        onCardLeftScreen={handleLeftScreen}
        preventSwipe={['down', 'up'] }
        swipeRequirementType="position"
        swipeThreshold="400">
        {props.children}
      </TinderCard>
    ) : (
      <>{props.children}</>
    )

  return (
    <Swiper>
      <Card onClick={onClick} sx={styles?.card ?? defaultStyle.card}>
        <CardActionArea>
          <CardMedia
            component="img"
            height={styles?.media?.height ?? defaultStyle.media.height}
            image={data?.media}
            alt={data?.alt}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" align="left">
              {data?.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="left">
              {data?.subHeader}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions disableSpacing>
          {actions}
          {options?.expandable && (
            <ExpandMore
              expand={expanded}
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
              aria-label="show more">
              <ExpandMoreIcon />
            </ExpandMore>
          )}
        </CardActions>
        {options?.expandable ? (
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>{children}</CardContent>
          </Collapse>
        ) : (
          <CardContent>{children}</CardContent>
        )}
      </Card>
    </Swiper>
  )
}

export default MatchCard
