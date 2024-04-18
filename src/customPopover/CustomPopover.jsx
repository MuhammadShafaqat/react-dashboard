import React from 'react';
import Popover from '@mui/material/Popover';
// import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function CustomPopover({ open, anchorEl, onClose, onDelete, onEdit }) {
  const id = open ? 'simple-popover' : undefined;

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <IconButton onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={onEdit}>
          <EditIcon /> 
        </IconButton>
      </div>
    </Popover>
  );
}

export default CustomPopover;
