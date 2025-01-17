import { Avatar, Grid, IconButton, Input } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";
import { AddCommentToIssue } from "../../API/Board/AddCommentToIssue";
import { handleFeedChange } from "../handleFeedChange";

type setSendingState = React.Dispatch<React.SetStateAction<boolean>>;
type setSendSuccess =  React.Dispatch<React.SetStateAction<number>>;

export default function FeedPostAddComment({issueId: postId, currentEmployeeId, setSendingState, setSendSucess, tempAvatarUrl}: 
    {issueId: number, currentEmployeeId: number, setSendingState: setSendingState, setSendSucess: setSendSuccess, tempAvatarUrl: string})
{
    const [newComment, setNewComment] = useState<string>("");

    return(
        <Grid container sx={{mt: "4rem", mb: "4rem"}}>
            <Grid item xs={1}>
                <Avatar alt="?" src={tempAvatarUrl} sx={{width: "2.5rem", height: "2.5rem"}}>?</Avatar>
            </Grid>
            <Grid item xs={11}>
                <Input fullWidth
                value={newComment}
                onChange={(event) => {setNewComment(event.target.value)}}
                placeholder="Type here to add a new comment..."
                endAdornment={<IconButton onClick={() => {
                    AddCommentToIssue([postId, currentEmployeeId, newComment], setSendingState, setSendSucess, setNewComment);
                    handleFeedChange(newComment + String(Math.random()));
                }}>
                    <SendIcon/></IconButton>}
                />
            </Grid>
        </Grid>
    );
}