import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import AppsIcon from '@mui/icons-material/Apps';
import MessageIcon from '@mui/icons-material/Message';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import ViewListIcon from '@mui/icons-material/ViewList';
import BallotIcon from '@mui/icons-material/Ballot';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';

function ChoosePredefinedIcon(listKey: number)
{
    //TODO: Implement better solution ASAP - this is only a temporary solution

    if(listKey == 0)
        return <AppsIcon/>;

    if(listKey == 1)
        return <MessageIcon/>;

    if(listKey == 2)
        return <CalendarMonthIcon/>;

    if(listKey == 3)
        return <ManageAccountsIcon/>;

    if(listKey == 4)
        return <BallotIcon/>;

    if(listKey == 5)
        return <VideoLabelIcon/>;

    if(listKey == 6)
        return <ViewListIcon/>;

    if(listKey == 7)
        return <PeopleAltIcon/>;

    if(listKey == 8)
        return <SettingsSuggestIcon/>;

    if(listKey == 9)
        return <NotificationsIcon/>;

    if(listKey == 10)
        return <SpaceDashboardIcon/>;
}

export default function ModuleButton({isOpen, listKey, buttonText}: {isOpen: boolean, listKey: number, buttonText: string}){
    return(
        <ListItem key={listKey} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
            sx={{
                minHeight: 48,
                justifyContent: isOpen ? 'initial' : 'center',
                px: 2.5,
            }}
            >
            <ListItemIcon
                sx={{
                minWidth: 0,
                mr: isOpen ? 3 : 'auto',
                justifyContent: 'center',
                color: "white"
                }}
            >
                {ChoosePredefinedIcon(listKey)}

            </ListItemIcon>
            <ListItemText primary={buttonText} sx={{ opacity: isOpen ? 1 : 0, color: "white"}} />
            </ListItemButton>
        </ListItem>
    );
}