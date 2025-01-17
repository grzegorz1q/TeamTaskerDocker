import { Dialog, DialogContent, Divider, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIssueStatusSelect from "./Forms/IssueEditStatus";
import IssueEditPriority from "./Forms/IssueEditPriority";
import IssueEditDate from "./Forms/IssueEditDate";
import dayjs from "dayjs";
import TempGetUserById from "../../../Connection/API/TempGetUserById";
import { ReadIssueDto } from "../../../Types/ReadIssuesDto";
import IssueEditTitle from "./Forms/IssueEditTitle";
import IssueEditDescription from "./Forms/IssueEditDescription";
import CommentsSection from "./Comments/CommentsSection";
import IssueEditEmployee from "./Forms/IssueEditEmployee";

export default function IssueDescDialog({projectId, openDialog, setOpenDialog, ReadIssueDto, leaderPermission}: 
    {projectId: string, openDialog: boolean, setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>, ReadIssueDto: ReadIssueDto, leaderPermission: boolean})
{
    //TODO: Change these states implementation
    //*//
    const [userAvatar, setUserAvatar] = useState<string>("");
    const [tempUserInfo, setTempUserInfo] = useState<string>("");
    userAvatar;
    tempUserInfo;

    //*//

    // Cancel and submit related states - on hold, because of the bug
    //const [titleFocus, setTitleFocus] = useState<boolean>(false);
    //const [currentIssueInfo, setCurrentIssueInfo] = useState<ReadIssueDto>(ReadIssueDto);
    var trimmedDate = dayjs(ReadIssueDto.startDate).format('DD MMMM HH:mm');

    useEffect(() => {
        TempGetUserById(ReadIssueDto.employeeId, setUserAvatar, setTempUserInfo);
    }, []);

    return(
        <Dialog
        maxWidth="lg"
        open={openDialog}
        onClose={() => {setOpenDialog(false)}}
        sx={{width: "100%", minHeight: "30rem"}}
        scroll={"paper"}
        >
            <DialogContent sx={{width: "50vw", minWidth: "50rem", minHeight: "30vh"}}>
                <Typography variant="h4" fontWeight={500} mb={4}>
                    Issue Summary
                </Typography>

                <IssueEditTitle ReadIssueDto={ReadIssueDto} leaderPermission={leaderPermission}/>

                <Divider sx={{mt: "1rem"}}/>

                <Grid container display={"flex"} flexDirection={"row"} alignItems={"center"}>
                    <Grid item xs={2}>
                        <EditIssueStatusSelect issueStatus={ReadIssueDto.status} issueId={ReadIssueDto.id}/>    
                    </Grid>

                    <Grid item xs={7} sx={{backgroundColor: "none"}}>
                        <Typography fontFamily={"Arial"} color={"gray"} marginLeft={"auto"} sx={{fontStyle: 'italic'}}>
                            #{ReadIssueDto.id} - Created on {trimmedDate}
                        </Typography>
                    </Grid>

                    <Grid  item xs={2}>
                        <IssueEditEmployee projectId={projectId} issueId={ReadIssueDto.id} issueEmployee={ReadIssueDto.employeeId} leaderPermission={leaderPermission}/>
                    </Grid>

                </Grid>

                <IssueEditDescription ReadIssueDto={ReadIssueDto} leaderPermission={leaderPermission} /> 

                <Divider sx={{mt: "1rem"}}/>

                <Grid container mt={"1rem"}>
                    <Grid item xs={3}>
                        <IssueEditPriority issueId={ReadIssueDto.id} issuePriority={ReadIssueDto.priority} leaderPermission={leaderPermission}/>
                    </Grid>
                    <IssueEditDate ReadIssueDto={ReadIssueDto} leaderPermission={leaderPermission}/>
                </Grid>
                
                <CommentsSection issueId={ReadIssueDto.id} projectId={projectId}/>

            </DialogContent>
        </Dialog>
    );
}