import React from 'react';
import { Apod, MediaType } from '../../model/Models';
import { Grid } from '@material-ui/core';
import { LikeButton } from './LikeButton';

type Props = { Apod: Apod };

export const ApodCard: React.FC<Props> = ({ Apod }) => {
  const getPic = (pod: Apod): string => {
    console.log(pod);
    if (pod.media_type === MediaType.Image) {
      return pod.hdurl;
    } else {
      return pod.thumbnail_url;
    }
  };

  return (
    <Grid style={{ margin: '5px', position: 'relative' }}>
      <img alt={Apod.explanation} src={getPic(Apod)} style={{ width: '100%', margin: '0', padding: '0' }}></img>
      <Grid style={{ position: 'absolute', color: 'white', top: '0px' }}>{Apod.date}</Grid>
      <Grid style={{ position: 'absolute', color: 'grey', bottom: '0px' }}>{Apod.date}</Grid>
      <LikeButton date={Apod.date} />
    </Grid>
  );
};
