import { Avatar, Box, Grid, Typography } from "@mui/material";
import FeedPostCommentSection from "./PostComments/FeedPostCommentSection";
import { ReadIssueDto } from "../../Types/ReadIssuesDto";
import dayjs from "dayjs";
import { ReadEmployeeDto } from "../../Types/ReadEmployeeDto";

export default function FeedPostCard({feedPost, projectId, tempProjectEmployees}: {feedPost: ReadIssueDto, projectId: string, tempProjectEmployees: ReadEmployeeDto[]})
{
    var trimmedDate = dayjs(feedPost.startDate).format('DD MMMM HH:mm');
    return(
        <>
            {/*Post Content Section*/}
            <Grid item xs={5} mt={"2.5rem"}>
                <Box display={'flex'} flexDirection={'row'}>
                    <Avatar alt="Cindy Baker" src={tempProjectEmployees.find(employee => employee.id === feedPost.employeeId)?.avatar} sx={{width: "4rem", height: "4rem"}}/> 
                    <Typography fontSize={20} fontWeight={550} sx={{alignSelf: "center", ml: "1rem", textAlign: "left"}}>
                        {feedPost.name}
                    </Typography>
                </Box>

                <Box display={'flex'} flexDirection={'row'} sx={{mt: "1.0rem"}}>
                    <Typography color={"gray"} fontSize={14} fontWeight={500} sx={{alignSelf: "center", ml: "0rem", fontStyle: 'italic'}}>
                        Added by Test Testowy on {trimmedDate}.
                    </Typography>
                </Box>

                <Box display={'flex'} flexDirection={'row'} sx={{mt: "1.0rem"}}>
                    <Typography fontSize={14} fontWeight={500} sx={{alignSelf: "center", ml: "0rem", textAlign: "left"}}>
                        {feedPost.description}
                    </Typography>
                </Box>
            </Grid>

            <Grid item xs={7}></Grid>
            
            {/*Comments Section*/}
            <Grid item xs={5}>
                <FeedPostCommentSection postId={feedPost.id} projectId={projectId} tempAvatarUrl={tempProjectEmployees.find(employee => employee.id === feedPost.employeeId)?.avatar ?? ""} />
            </Grid>

            <Grid item xs={7}></Grid>
        </>
    );
}