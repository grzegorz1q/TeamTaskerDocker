import { useEffect, useState } from "react";
import { Avatar, Box, CircularProgress, Divider, Grid, IconButton, Input, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { ReadCommentDto } from "../../../../Types/CommentDtos";
import CommentCard from "./CommentCard";
import { ReadEmployeeDto } from "../../../../Types/ReadEmployeeDto";
import TempGetCurrentUserByEmail from "../../../../Connection/API/TempGetCurrentUserByEmail";
import { GetProjectEmployees } from '../../../API/GetProjectEmployees';
import GetIssueComments from "../../../API/Board/GetIssueComments";
import { AddCommentToIssue } from "../../../API/Board/AddCommentToIssue";
import DataPostSnackbar from "../../../../Connection/Notifies/DataPostSnackbar";
import { handleIssueChange } from "../BoardReloadOnChange";
import dayjs from "dayjs";

export default function CommentsSection({issueId, projectId}: {issueId: number, projectId: string})
{
    const tempEmployee: ReadEmployeeDto = { id: 0, firstName: "", lastName: "", email: "", position: "", roleId: 0, avatar: "", isTeamLeader: false }
    const [currentEmployee, setCurrentEmployee] = useState<ReadEmployeeDto>(tempEmployee);
    const [projectEmployees, setProjectEmployees] = useState<ReadEmployeeDto[]>([]);

    const [sendingState, setSendingState] = useState<boolean>(false);
    const [sendSucess, setSendSucess] = useState<number>(0);
    const [comments, setComments] = useState<ReadCommentDto[]>([]);

    const [newComment, setNewComment] = useState<string>("");

    //TODO: Change temp implementation of comments list update
    const [selectedOption, setSelectedOption] = useState<string>(() => {
        const storedOption = sessionStorage.getItem('issuesChange');
        return storedOption ? storedOption : "null";
      });

    useEffect(() => {
        TempGetCurrentUserByEmail(setCurrentEmployee);
        GetProjectEmployees(projectId, setProjectEmployees);
        GetIssueComments(issueId, setSendingState, setSendSucess, setComments);

        const handleStorageChange = () => {
            const storedOption = sessionStorage.getItem('issuesChange');
            if (storedOption && storedOption !== selectedOption) {
              setSelectedOption(storedOption);
            }
          };
          console.log("Changed on Session storage change: " + selectedOption);
          window.addEventListener('issuesChange', handleStorageChange);
    
          return () => {
              window.removeEventListener('issuesChange', handleStorageChange);
              //sessionStorage.removeItem('issuesChange');
          };

    }, [selectedOption]);

    //var trimmedDate = dayjs(ReadIssueDto.startDate).format('DD MMMM HH:mm');

    return(
        <>
            {sendingState == false && sendSucess == 2 ? <DataPostSnackbar TextIndex={0} IsDangerSnackBar={true}/> : <></>}
                <Typography variant="h5" sx={{mt: "2rem", mb: "0.5rem"}}>
                    Comments ({comments.length})
                </Typography>
                <Divider/>

                <Grid container display={"flex"} flexDirection={"row"} sx={{mt: "1.5rem"}}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}>
                        <Avatar alt="?" src={currentEmployee.avatar} sx={{width: "2.5rem", height: "2.5rem"}} />
                    </Grid>
                    <Grid item xs={8}>
                        <Input fullWidth
                        value={newComment}
                        onChange={(event) => {setNewComment(event.target.value)}}
                        placeholder="Type here to add a new comment..."
                        endAdornment={<IconButton onClick={() => {
                            AddCommentToIssue([issueId, currentEmployee.id, newComment], setSendingState, setSendSucess, setNewComment);
                            handleIssueChange(newComment + String(Math.random()));
                        }}>
                            <SendIcon/></IconButton>}
                        />
                    </Grid>
                    <Grid item xs={2}></Grid>

                    <Grid item xs={12}>
                    <Box sx={{mt: "4rem", mb: "3rem", width: "100%", display: "flex", flexDirection: "row", justifyContent: "center"}}>

                        {comments.length == 0 
                        ? 
                            <Typography variant="h6" color={"gray"}>
                                {sendingState ? <CircularProgress/> : "No comments were added to this issue."}
                            </Typography>
                        
                        : 
                            <Box>
                                { comments.sort((a, b) => {
                                    const dateA = dayjs(a.created);
                                    const dateB = dayjs(b.created);
                                    return dateB.diff(dateA);
                                }).map( comment => (
                                    <CommentCard cardComment={comment} 
                                    commentEmployee={projectEmployees.find(employee => employee.id === comment.userId)} 
                                    currentEmployee={currentEmployee.id}
                                    />
                                  ))
                                }
                            </Box>
                        }
                    </Box>
                    </Grid>
                    
                </Grid>


        </>
    );
}