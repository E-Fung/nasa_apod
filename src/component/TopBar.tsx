import React, { useState, useEffect, useRef } from 'react';
import { Button, Grid, MenuItem, Popper, Grow, ClickAwayListener, Paper, MenuList } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import { displayOption } from './../model/Models';
import { useAppContext } from '../AppContext';

let renderCount = 0;

export const TopBar: React.FC = () => {
  const [open, setOpen] = useState(false as boolean);
  const { displayType, setDisplayType, showLiked, setShowLiked, filterLiked, resetList } = useAppContext();
  const anchorRef = useRef<HTMLButtonElement>(null);
  const prevOpen = useRef(open);

  useEffect(() => {
    renderCount++;
  });

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const handleToggle = (): void => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>): void => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent): void {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const handleTypeChange = (newDisplay: displayOption): void => {
    setDisplayType(newDisplay);
  };

  const toggleShowLiked = (): void => {
    showLiked ? resetList() : filterLiked();
    setShowLiked((prevState: boolean) => !prevState);
  };

  return (
    <Grid container justifyContent="space-between">
      {console.log('Topbar rendered:', renderCount)}
      <Button onClick={toggleShowLiked} style={{ color: 'white' }}>
        {showLiked ? 'Show All' : 'Show Liked'}
      </Button>
      <Button
        endIcon={<ArrowDropDown />}
        style={{ color: 'white' }}
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        {displayType}
      </Button>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <MenuItem
                    onClick={(e) => {
                      handleClose(e);
                      handleTypeChange(displayOption.Recent);
                    }}
                  >
                    {displayOption.Recent}
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      handleClose(e);
                      handleTypeChange(displayOption.Oldest);
                    }}
                  >
                    {displayOption.Oldest}
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      handleClose(e);
                      handleTypeChange(displayOption.Random);
                    }}
                  >
                    {displayOption.Random}
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
