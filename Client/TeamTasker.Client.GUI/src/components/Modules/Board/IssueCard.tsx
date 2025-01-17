import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import { ReadIssueDto } from "../../Types/ReadIssuesDto";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import TempGetUserById from "../../Connection/API/TempGetUserById";
import IssueDescDialog from "./Dialog/IssueDescDialog";


export default function IssueCard({ReadIssueDto, projectId, leaderPermission}: {ReadIssueDto: ReadIssueDto, projectId: string, leaderPermission: boolean})
{
    const [userAvatar, setUserAvatar] = useState<string>("");
    const [tempUserInfo, setTempUserInfo] = useState<string>("");
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    tempUserInfo;

    var trimmedDate = dayjs(ReadIssueDto.startDate).format('DD MMMM HH:mm');

    useEffect(() => {
        TempGetUserById(ReadIssueDto.employeeId, setUserAvatar, setTempUserInfo);
    }, []);

    return(
        <>
            <IssueDescDialog projectId={projectId} openDialog={openDialog} setOpenDialog={setOpenDialog} ReadIssueDto={ReadIssueDto} leaderPermission={leaderPermission}/>

            <Box onClick={() => {setOpenDialog(true)}} sx={{cursor: "pointer"}}>
                <Paper elevation={2} sx={{width: "100%", minHeight: "6rem", mt: "1rem"}}>
                    <Grid container>
                        <Grid item xs={2}>
                            <Typography fontSize={15} color="gray" sx={{mt: "0.2rem", ml: "0.2rem"}}>
                                #{ReadIssueDto.projectIssueId}
                            </Typography>
                        </Grid>
                        <Grid item xs={10}>
                        </Grid>

                        <Typography fontSize={15} sx={{mt: "0.2rem", ml: "0.5rem", textAlign: "left", pr: "0.3rem"}}>
                                {ReadIssueDto.name}
                        </Typography>
                    </Grid>
                    <Box sx={{display: "flex", flexDirection: "row", ml: "0.5rem", mt: "1.0rem", mb: "0.3rem"}}>
                        <Avatar alt="?" src={userAvatar} sx={{width: "1.2rem", height: "1.2rem"}} />
                        <Typography color="lightgray" variant="body1" fontSize={13} fontWeight={540} sx={{marginRight: "auto", ml: "0.3rem"}}>
                            {trimmedDate}
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </>
    );
}