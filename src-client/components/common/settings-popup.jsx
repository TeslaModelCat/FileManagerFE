import React, {
  useCallback, useEffect, useRef, useState
} from 'react';
import { observer } from 'mobx-react-lite';
import {
  FormControl, FormControlLabel, FormLabel,
  Grow, IconButton, Paper, Popper, Radio, RadioGroup
} from '@material-ui/core';
import { Settings } from '@material-ui/icons';
import { useStores } from '../../stores/context';

const SettingsPopup = () => {
  const { sessionStore } = useStores();

  const [open, setOpen] = useState(false);
  const [newValue, setNewValue] = useState(sessionStore.user.notificationSettings);
  const buttonRef = useRef(null);
  const popperRef = useRef(null);

  const handleClose = () => {
    setOpen(false);
    setNewValue(sessionStore.user.notificationSettings);
  };

  useEffect(() => {
    const listener = (event) => {
      if (
        !popperRef.current
        || popperRef.current.contains(event.target)
      ) return;
      handleClose();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [popperRef]);

  const handleSubmit = useCallback(() => {
    sessionStore.setNotificationSettings({ settings: newValue }).then(() => {
      handleClose();
    });
  }, [newValue]);

  return (
    <>
      <IconButton
        className="icon-btn"
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        aria-label="Uploads"
        aria-haspopup="true"
      >
        <Settings style={{ color: 'white' }} />
      </IconButton>
      <Popper
        ref={popperRef}
        open={open}
        anchorEl={buttonRef.current}
        role={undefined}
        placement="bottom-end"
        transition
        disablePortal
        style={{ zIndex: 1100 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper elevation={2}>
              <div className="settings-container">
                <FormControl component="fieldset">
                  <FormLabel component="legend">Mailing Settings</FormLabel>
                  <RadioGroup
                    aria-label="settings"
                    value={newValue}
                    name="radio-buttons-group"
                    onChange={(e) => setNewValue(e.target.value)}
                  >
                    <FormControlLabel value="instantly" control={<Radio />} label="Instantly" />
                    <FormControlLabel value="every-10-notifications" control={<Radio />} label="Every 10 notification" />
                    <FormControlLabel value="every-5-minutes" control={<Radio />} label="Every 5 minute" />
                  </RadioGroup>
                </FormControl>
                <button type="button" className="save-button" onClick={handleSubmit}>Save</button>
              </div>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default observer(SettingsPopup);
