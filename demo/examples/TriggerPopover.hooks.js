import React from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Popover from '@mui/material/Popover'
import {
  bindPopover,
  bindTrigger,
  usePopupState,
} from 'material-ui-popup-state/hooks'
//

const TriggerPopover = () => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover',
  })
  return (
    <div>
      <Button variant="contained" {...bindTrigger(popupState)}>
        Open Popover
      </Button>
      <Popover
        {...bindPopover(popupState)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography>The content of the Popover.</Typography>
      </Popover>
    </div>
  )
}

TriggerPopover.propTypes = {}

export default TriggerPopover
