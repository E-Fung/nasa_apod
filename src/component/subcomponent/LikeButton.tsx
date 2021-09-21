import React, { useState, useEffect } from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import { useAppContext } from './../../AppContext';
import { Apod } from './../../model/Models';

const useStyles = makeStyles(() => ({
  likeButton: { opacity: '100%', position: 'absolute', bottom: '0px', right: '0px', padding: '7px' },
}));

type Props = { date: Date };

export const LikeButton: React.FC<Props> = ({ date }) => {
  const classes = useStyles();
  const [liked, setLiked] = useState(false as boolean);
  const { displayList, setDisplayList, showLiked } = useAppContext();

  useEffect(() => {
    let likeState = localStorage.getItem(date.toString());
    setLiked(likeState === 'true' ? true : false);
  }, [date]);

  const toggleLike = (): void => {
    let toggled: boolean = !liked;

    localStorage.setItem(date.toString(), toggled.toString());
    setLiked(toggled);
    if (toggled === false && showLiked) {
      let temp: Apod[] = [...displayList];
      temp = temp.filter((obj) => obj.date !== date);
      console.log(date, temp);
      setDisplayList(temp);
    }
  };

  return (
    <IconButton
      centerRipple={true}
      onClick={() => {
        toggleLike();
      }}
      className={classes.likeButton}
    >
      {liked ? <Favorite style={{ color: 'red' }} /> : <FavoriteBorder style={{ color: 'white' }} />}
    </IconButton>
  );
};
