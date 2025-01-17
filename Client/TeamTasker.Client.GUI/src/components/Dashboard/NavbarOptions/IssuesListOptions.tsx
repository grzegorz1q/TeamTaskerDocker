import * as React from 'react';
import Button from '@mui/material/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Typography } from '@mui/material';

export default function IssuesListOptions() 
{
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);
  const [anchorEl3, setAnchorEl3] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);
  const open3 = Boolean(anchorEl3);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClick3 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl3(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorEl2(null);
    setAnchorEl3(null);
  };

  const handleMenuItemClickIssues = (option: string) => {
    sessionStorage.setItem('issuesOptions', option);
    window.dispatchEvent(new Event('storage'));
    setAnchorEl(null);
  };

  const handleMenuItemClickStatus = (option: string) => {
    sessionStorage.setItem('statusOptions', option);
    window.dispatchEvent(new Event('storage'));
    setAnchorEl2(null);
  };

  const handleMenuItemClickPriority = (option: string) => {
    sessionStorage.setItem('priorityOptions', option);
    window.dispatchEvent(new Event('storage'));
    setAnchorEl3(null);
  };

  return (
    <>
      {/*Select Issues*/}

       <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{textTransform: "none"}}
      >
        <Typography fontWeight={500} sx={{display: "flex", flexDirection: "row", alignItems: "center"}} color={{color: "#363b4d"}}>
            <ArrowDropDownIcon sx={{color: "#363b4d"}}/> {"Select Issues"}
        </Typography>
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
        <MenuItem onClick={() => handleMenuItemClickIssues('user')}>Your Issues</MenuItem>
        <MenuItem onClick={() => handleMenuItemClickIssues('project')}>Project Issues</MenuItem>
      </Menu>

  {/*Select Status*/}
      <Button
        id="basic-button2"
        aria-controls={open2 ? 'basic-menu2' : undefined}
        aria-haspopup="true"
        aria-expanded={open2 ? 'true' : undefined}
        onClick={handleClick2}
        sx={{textTransform: "none"}}
      >
        <Typography fontWeight={500} sx={{display: "flex", flexDirection: "row", alignItems: "center"}} color={{color: "#363b4d"}}>
            <ArrowDropDownIcon sx={{color: "#363b4d"}}/> {"Select Status"}
        </Typography>
      </Button>
      <Menu
        id="basic-menu2"
        anchorEl={anchorEl2}
        open={open2}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button2',
        }}
      >
        <MenuItem onClick={() => handleMenuItemClickStatus('default')}>{"⭐ All issues"}</MenuItem>
        <MenuItem onClick={() => handleMenuItemClickStatus('NewIssue')}>{"⬜ New Issue"}</MenuItem>
        <MenuItem onClick={() => handleMenuItemClickStatus('InProgress')}>{"🟦 In Progress"}</MenuItem>
        <MenuItem onClick={() => handleMenuItemClickStatus('OnHold')}>{"🟪 On Hold"}</MenuItem>
        <MenuItem onClick={() => handleMenuItemClickStatus('IssueDone')}>{"🟩 Issue Done"}</MenuItem>
      </Menu>

        {/*Select Priority*/}
        <Button
        id="basic-button3"
        aria-controls={open3 ? 'basic-menu3' : undefined}
        aria-haspopup="true"
        aria-expanded={open3 ? 'true' : undefined}
        onClick={handleClick3}
        sx={{textTransform: "none"}}
      >
        <Typography fontWeight={500} sx={{display: "flex", flexDirection: "row", alignItems: "center"}} color={{color: "#363b4d"}}>
            <ArrowDropDownIcon sx={{color: "#363b4d"}}/> {"Select Priority"}
        </Typography>
      </Button>
      <Menu
        id="basic-menu3"
        anchorEl={anchorEl3}
        open={open3}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button3',
        }}
      >
        <MenuItem onClick={() => handleMenuItemClickPriority('default')}>{"⭐ All priorities"}</MenuItem>
        <MenuItem onClick={() => handleMenuItemClickPriority('High')}>{"🔴 High"}</MenuItem>
        <MenuItem onClick={() => handleMenuItemClickPriority('Medium')}>{"🔵 Normal"}</MenuItem>
        <MenuItem onClick={() => handleMenuItemClickPriority('Low')}>{"🟢 Low"}</MenuItem>
      </Menu>
    </>
  );
}