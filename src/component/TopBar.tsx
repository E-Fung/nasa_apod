import React, { useState, useEffect, useRef } from 'react';
import { Button, Grid, MenuItem, Popper, Grow, ClickAwayListener, Paper, MenuList, makeStyles, Typography } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import { displayOption } from './../model/Models';
import { useAppContext } from '../AppContext';

const useStyles = makeStyles(() => ({
  white: {
    color: 'white',
  },
}));

export const TopBar: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState(false as boolean);
  const { displayType, setDisplayType, showLiked, setShowLiked, filterLiked, resetList } = useAppContext();
  const anchorRef = useRef<HTMLButtonElement>(null);
  const prevOpen = useRef(openDropdown);
  const classes = useStyles();

  useEffect(() => {
    if (prevOpen.current === true && openDropdown === false) {
      anchorRef.current!.focus();
    }
    prevOpen.current = openDropdown;
  }, [openDropdown]);

  const handleToggleDropdown = (): void => {
    setOpenDropdown((prevOpen) => !prevOpen);
  };

  const handleCloseDropdown = (event: React.MouseEvent<EventTarget>): void => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpenDropdown(false);
  };

  const handleListKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenDropdown(false);
    }
  };

  const handleTypeChange = (newDisplayMode: displayOption): void => {
    setDisplayType(newDisplayMode);
  };

  const handleShowLiked = (): void => {
    showLiked ? resetList() : filterLiked();
    setShowLiked((prevState: boolean) => !prevState);
  };

  return (
    <Grid container justifyContent="space-between">
      <Button onClick={handleShowLiked} className={classes.white}>
        {showLiked ? 'Show All' : 'Show Liked'}
      </Button>
      <Button
        endIcon={<ArrowDropDown />}
        className={classes.white}
        ref={anchorRef}
        aria-controls={openDropdown ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggleDropdown}
      >
        {displayType}
      </Button>
      <Popper open={openDropdown} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
            <Paper>
              <ClickAwayListener onClickAway={handleCloseDropdown}>
                <MenuList autoFocusItem={openDropdown} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <MenuItem
                    onClick={(e) => {
                      handleCloseDropdown(e);
                      handleTypeChange(displayOption.Recent);
                    }}
                  >
                    {displayOption.Recent}
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      handleCloseDropdown(e);
                      handleTypeChange(displayOption.Oldest);
                    }}
                  >
                    {displayOption.Oldest}
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Grid>
  );
};
