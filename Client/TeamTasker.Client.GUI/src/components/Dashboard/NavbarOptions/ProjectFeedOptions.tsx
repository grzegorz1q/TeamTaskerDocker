import { Box, Typography } from "@mui/material";
import AddCommentIcon from '@mui/icons-material/AddComment';
import { useState } from "react";
import PublishPostDialog from "../../Modules/ProjectFeed/PublishPostDialog/PublishPostDialog";
import CheckLeaderPermission from "../../Connection/API/CheckLeaderPermission";

export default function ProjectFeedOptions({projectId}: {projectId: string})
{
    const [openDialog, setOpenDialog] = useState<boolean>(false);
 
    const [userPermission, setUserPermission] = useState<boolean>(false);
    CheckLeaderPermission(setUserPermission);

    if(!userPermission)
        return <></>

    return(
        <>
            <PublishPostDialog projectId={projectId} openDialog={openDialog} setOpenDialog={setOpenDialog} userId={0} />
            <Box sx={{color: "#363b4d", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer"}}
            onClick={() => {setOpenDialog(true)}}
            >
                <AddCommentIcon sx={{mr: "0.5rem"}}/>
            <Typography color={"black"}>
                    Publish
                </Typography>
            </Box>
        </>
    );
}