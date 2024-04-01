import { Box, Typography, IconButton } from '@mui/material';
import MatchCard from '../design/Card/MatchCard';
import LikeIcon from '@mui/icons-material/Favorite';
import DislikeIcon from '@mui/icons-material/Clear';
import { useEffect, useState } from 'react';
import Maybe from '../layout/Maybe';

const Matches = ({ onMatchClick = () => {console.log('clicked ')}, onAttemptMatch = () => {console.log('match')}, users }) => {
  const [_users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(users);
  }, [users]);

  const handleClick = () => {
    onMatchClick(_users[0]);
  };

  const attemptMatching = () => {
    const [potential, ...rest] = _users;
    onAttemptMatch(potential);
    setUsers(rest);
  };

  const actions = [
    <IconButton onClick={attemptMatching} key="dislike" aria-label="dislike">
      <DislikeIcon />
    </IconButton>,
    <IconButton onClick={attemptMatching} key="like" aria-label="like">
      <LikeIcon />
    </IconButton>
  ];

  return (
    <div className='w-96'>
           <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Maybe
        condition={_users.length > 0}
        fallback={
          <Typography
            sx={{
              backgroundColor: '#f1f5f9',
              opacity: 0.7,
              paddingY: 3,
              paddingX: 2,
              borderRadius: 3,
              boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px'
            }}
            variant="h5"
          >
            There are no more matches in your area
          </Typography>
        }
      >
        <MatchCard
          data={_users[0]}
          onClick={handleClick}
          onSwipe={attemptMatching}
          options={{ expandable: true, swipable: true }}
          actions={actions}
        />
      </Maybe>
    </Box>
    </div>
    
  );
};

export default Matches
