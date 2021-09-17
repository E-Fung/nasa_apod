import React, { useState } from 'react';
import { Button, IconButton, ButtonBase } from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';

type Props = { date: Date };

export const LikeButton: React.FC<Props> = ({ date }) => {
  const [likable, setLikable] = useState(() => {
    const likeState = localStorage.getItem(date.toString());
    return likeState === 'false' ? false : true;
  });

  const toggleLike = async () => {
    let toggled = !likable;
    await localStorage.setItem(date.toString(), toggled.toString());
    setLikable(toggled);
  };

  return (
    <IconButton centerRipple={true} onClick={toggleLike} style={{ opacity: '100%', position: 'absolute', bottom: '0px', right: '0px', padding: '7px' }}>
      {likable ? <FavoriteBorder style={{ color: 'white' }} /> : <Favorite style={{ color: 'red' }} />}
    </IconButton>
  );
};
