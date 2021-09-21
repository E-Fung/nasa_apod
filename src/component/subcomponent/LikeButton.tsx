import React from 'react';
import { IconButton, makeStyles, Grid } from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  likeButton: { opacity: '100%', position: 'absolute', bottom: '0px', right: '0px' },
}));

type Props = { date: Date; liked: boolean; toggleLike: () => void };

export const LikeButton: React.FC<Props> = ({ date, liked, toggleLike, children }) => {
  const classes = useStyles();

  return (
    <Grid container justifyContent="space-between">
      <Grid item className={classes.likeButton}>
        <Grid container alignContent="center">
          <IconButton
            centerRipple={true}
            onClick={() => {
              toggleLike();
            }}
          >
            {liked ? <Favorite style={{ color: 'red' }} /> : <FavoriteBorder style={{ color: 'white' }} />}
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};
