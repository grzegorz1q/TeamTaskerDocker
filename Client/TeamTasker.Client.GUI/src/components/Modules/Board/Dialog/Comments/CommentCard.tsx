import { Avatar, Box, Button, Card, CardContent, Typography } from "@mui/material";
import { ReadCommentDto } from "../../../../Types/CommentDtos";
import { ReadEmployeeDto } from "../../../../Types/ReadEmployeeDto";
import dayjs from "dayjs";

export default function CommentCard({cardComment, commentEmployee, currentEmployee}: {cardComment: ReadCommentDto, commentEmployee: ReadEmployeeDto | undefined, currentEmployee: number})
{
    var trimmedDate = dayjs(cardComment.created).format('DD MMMM HH:mm');
    var commentEmployeeId = commentEmployee !== undefined ? commentEmployee.id : 0;

    return(
        <Card elevation={6} sx={{mb: "1.5rem"}}>
        <Box display={"flex"} flexDirection={"row"} minWidth={600} maxWidth={600} minHeight={100}>
            <CardContent>
                <Avatar src={commentEmployee !== undefined ? commentEmployee.avatar : ""}>?</Avatar>
            </CardContent>

            <CardContent>
                <Typography sx={{mt: "0.5rem"}}>{cardComment.content}</Typography>
            </CardContent>
        </Box>
        <Box display={"flex"} flexDirection={"row"} alignItems={"center"} mb={1}>
            {commentEmployeeId === currentEmployee 
            ?
                <><Button sx={{color: "gray", ml: "0.5rem"}}>Edit</Button><Button sx={{color: "gray"}}>DELETE</Button></>
            : 
            <></>
            }
            <Typography fontWeight={550} fontFamily={"Arial"} color={"gray"} marginLeft={"auto"} sx={{fontStyle: 'italic'}}>
                {`${commentEmployee !== undefined ? commentEmployee.firstName : ""} ${commentEmployee !== undefined ? commentEmployee.lastName : ""}`}
            </Typography>
            <Typography fontFamily={"Arial"} color={"gray"} sx={{fontStyle: 'italic', mr: "1rem"}}>
                , on {trimmedDate}
            </Typography>
        </Box>
        </Card>
    );
}