import React from 'react';
import Loader from 'react-loader-spinner';
import { Grid } from '@material-ui/core';

export const LoadingIndic: React.FC = () => {
  return (
    <Grid
      style={{
        width: '100%',
        height: '100',
        display: 'flex',
        position: 'relative',
        bottom: '35px',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Loader type="ThreeDots" color="white" height="100" width="100" />
    </Grid>
  );
};
