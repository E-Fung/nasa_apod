import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import Favorite from '@material-ui/icons/Favorite';

type Props = { date: Date };

export const LikeButton: React.FC<Props> = ({ date }) => {
  const [likable, setLikable] = useState(true as boolean);

  const toggleLike = async () => {
    let toggled = !likable;
    await localStorage.setItem(date.toString(), toggled.toString());
    setLikable(toggled);
  };

  return (
    <Button
      onClick={toggleLike}
      variant="contained"
      startIcon={<Favorite />}
      style={{ backgroundColor: 'white', position: 'absolute', bottom: '0px', right: '0px' }}
    >
      {console.log(likable, 'likable')}
      {localStorage.getItem(date.toString()) === 'true' ? 'Like' : 'Unlike'}
    </Button>
  );
};
