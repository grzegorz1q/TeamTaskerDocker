import { Box, Divider, Grid, Typography } from "@mui/material";
import FeedPostCommentCard from "./FeedPostCommentCard";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useEffect, useState } from "react";
import FeedPostAddComment from "./FeedPostAddComment";
import { AnimatePresence, motion } from "framer-motion";
import { ReadEmployeeDto } from "../../../Types/ReadEmployeeDto";
import { ReadCommentDto } from "../../../Types/CommentDtos";
import TempGetCurrentUserByEmail from "../../../Connection/API/TempGetCurrentUserByEmail";
import { GetProjectEmployees } from "../../API/GetProjectEmployees";
import GetIssueComments from "../../API/Board/GetIssueComments";
import dayjs from "dayjs";

//TODO: Better implementation of the comments

export default function FeedPostCommentSection({postId, projectId, tempAvatarUrl}: {postId: number, projectId: string, tempAvatarUrl: string})
{
    const [dropDownIcon, setDropDownIcon] = useState<boolean>(false);
    
    const tempEmployee: ReadEmployeeDto = { id: 0, firstName: "", lastName: "", email: "", position: "", roleId: 0, avatar: "", isTeamLeader: false }
    const [currentEmployee, setCurrentEmployee] = useState<ReadEmployeeDto>(tempEmployee);
    const [projectEmployees, setProjectEmployees] = useState<ReadEmployeeDto[]>([]);

    const [sendingState, setSendingState] = useState<boolean>(false);
    const [sendSucess, setSendSucess] = useState<number>(0);
    const [comments, setComments] = useState<ReadCommentDto[]>([]);
    sendingState;
    sendSucess;

    const [selectedOption, setSelectedOption] = useState<string>(() => {
        const storedOption = sessionStorage.getItem('issuesChange');
        return storedOption ? storedOption : "null";
      });

    useEffect(() => {
        TempGetCurrentUserByEmail(setCurrentEmployee);
        GetProjectEmployees(projectId, setProjectEmployees);
        GetIssueComments(postId, setSendingState, setSendSucess, setComments);

        const handleStorageChange = () => {
            const storedOption = sessionStorage.getItem('feedChange');
            if (storedOption && storedOption !== selectedOption) {
              setSelectedOption(storedOption);
            }
          };
          console.log("Changed onSession storage change: " + selectedOption);
          window.addEventListener('feedChange', handleStorageChange);
    
          return () => {
              window.removeEventListener('feedChange', handleStorageChange);
              //sessionStorage.removeItem('issuesChange');
          };
    }, [selectedOption]);

    return(
        <Box mt={"2.5rem"}>
            <Box
            onClick={() => {setDropDownIcon(!dropDownIcon)}}
            sx={{cursor: "pointer"}}
            >
                <Grid container>
                    <Grid item xs={3} sx={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                        <Typography variant="h5" sx={{mb: "0.5rem", minWidth: "10rem"}}>
                        Comments {"("+ comments.length + ")"}
                        </Typography>
                        {dropDownIcon ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}
                    </Grid>
                </Grid>
            </Box>

            <Divider/>
            {dropDownIcon ? 
                <AnimatePresence>
                    <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    >
                        <FeedPostAddComment issueId={postId} currentEmployeeId={currentEmployee.id} setSendingState={setSendingState} setSendSucess={setSendSucess} tempAvatarUrl={tempAvatarUrl} />
                        
                        <Box>
                            { comments.sort((a, b) => {
                                const dateA = dayjs(a.created);
                                const dateB = dayjs(b.created);
                                return dateB.diff(dateA);
                            }).map( comment => (
                                <FeedPostCommentCard cardComment={comment} 
                                commentEmployee={projectEmployees.find(employee => employee.id === comment.userId)} 
                                currentEmployee={currentEmployee.id}/>
                                ))
                            }
                        </Box>
                    </motion.div>
                </AnimatePresence>
            :
                <></>
            }
        </Box>
    );
}