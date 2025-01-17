import { Box, Button, Typography } from "@mui/material";
import PreviewIssuesTable from "../../components/Modules/IssuesList/PreviewIssuesTable";
import { useEffect, useState } from "react";
import CheckLeaderPermission from "../../components/Connection/API/CheckLeaderPermission";
import CreateIssueDialog from "../../components/Modules/IssuesList/Dialog/CreateIssueDialog";

export default function IssuesList({projectId}: {projectId: string})
{
    const [userPermission, setUserPermission] = useState<boolean>(false);
    CheckLeaderPermission(setUserPermission);

    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [updateList, setUpdateList] = useState<boolean>(false);

    useEffect(() => {setUpdateList(false)}, [updateList]);

    return(
        <>
            <CreateIssueDialog projectId={projectId} openDialog={openDialog} setOpenDialog={setOpenDialog} setUpdateList={setUpdateList}/>

            <Box sx={{width: "100%", minHeight: "38rem", marginLeft: "6rem"}}>
                <Box sx={{display: "flex", mb: "1.5rem", mt: "4rem"}}>
                    <Typography variant="h4" sx={{marginRight: "auto"}}>
                        Issues List 
                        {userPermission ?
                            <Button onClick={() => {setOpenDialog(true)}} sx={{ml: "1rem", height: "2.3rem", backgroundColor: "#363b4d"}}variant="contained">Create Issue</Button>
                        :
                        <></>
                        }
                    </Typography>
                </Box>
                <PreviewIssuesTable projectId={projectId} reloadCondition={updateList}/>
            </Box>
        </>
    );
}