import * as React from 'react';
import Button from '@mui/material/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DeleteTokenFromCookies from '../Connection/DeleteTokenFromCookies';
import { Avatar } from '@mui/material';
import CheckAdminPermission from '../Connection/API/CheckAdminPermission';
import { useState } from 'react';

function onLogoutClick()
{
    DeleteTokenFromCookies();
    location.href = "/login";
}

export default function UserAvatarMenu({avatarUrl}: {avatarUrl: string}) 
{
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [adminUserPermission, setAdminUserPermission] = useState<boolean>(false);
  const [loadingAdminState, setLoadingAdminState] = useState<boolean>(true);
  loadingAdminState;

  CheckAdminPermission(setAdminUserPermission, setLoadingAdminState);

  return (
    <>
       <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <ArrowDropDownIcon sx={{color: "#363b4d"}}/>
        <Avatar alt="?" src={avatarUrl} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {!adminUserPermission ? <MenuItem onClick={() => {location.href = "/projectspage"}}>Projects Page</MenuItem> : <></>}
        <MenuItem onClick={() => {onLogoutClick()}}>Logout</MenuItem>
      </Menu>
    </>
  );
}