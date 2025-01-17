import { Input, Textarea } from "@mui/joy";
import { Button, CircularProgress, Dialog, DialogContent, Divider, InputLabel, Typography } from "@mui/material";
import { useState } from "react";
import { handleFeedChange } from "../handleFeedChange";
import { AddNewFeedPost } from "../../API/Feed/AddNewFeedPost";
import { CreateFeedPostDto } from "../../../Types/CreateFeedPostDto";
import DataPostSnackbar from "../../../Connection/Notifies/DataPostSnackbar";

function tempValidateForm(titleValue: string | undefined, descriptionValue: string | undefined)
{
    if(titleValue === undefined || descriptionValue === undefined)
        return true;

    if(titleValue!.length > 3 && descriptionValue!.length > 3)
        return false;

    return true;
}

export default function PublishPostDialog({projectId, openDialog, setOpenDialog, userId}: 
    {projectId: string, openDialog: boolean, setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>, userId: number})
{
    const [titleValue, setTitleValue] = useState<string>();
    const [descriptionValue, setDescriptionValue] = useState<string>();

    const [sendingState, setSendingState] = useState<boolean>(false);
    const [sendSucess, setSendSucess] = useState<number>(0);
    userId;

    return(
        <>
            {sendingState == false && sendSucess == 2 ? <DataPostSnackbar TextIndex={0} IsDangerSnackBar={true}/> : <></>}
            <Dialog
            maxWidth="lg"
            open={openDialog}
            onClose={() => {setOpenDialog(false)}}
            sx={{minWidth: "100%", minHeight: "10rem"}}
            scroll={"paper"}
            >
                <DialogContent sx={{minWidth: "50rem", width: "40vw", height: "" }}>
                    <Typography variant="h4" fontWeight={500} mb={4}>
                        Publish a new post
                    </Typography>

                {/*Title Section*/}
                    <Typography color={"gray"} fontWeight={550}>Title</Typography>
                    <InputLabel>
                        <Divider sx={{mb: "1rem"}}/>
                        <Input
                        id="name"
                        value={titleValue}
                        onChange={(event)=>{setTitleValue(event.target.value)}}
                        sx={{width: "100%"}}
                        placeholder="Title of the post"
                        />
                    </InputLabel>

                {/*Description Section*/}
                    <Typography color={"gray"} sx={{mt: "2rem"}} fontWeight={550}>Description</Typography>
                    <InputLabel>
                        <Divider sx={{mb: "1rem"}}/>
                        <Textarea 
                        name="description"
                        sx={{minHeight: "8rem", maxHeight: "8rem"}} placeholder="Description of the post"
                        value={descriptionValue}
                        onChange={(event) => {setDescriptionValue(event.target.value)}}
                        />
                    </InputLabel>

                {sendingState 
                ? 
                    <CircularProgress size={40} sx={{mt: "1.5rem", color: "#363b4d"}}/> 
                
                : 
                
                <Button 
                type="submit" 
                sx={{mt: "3rem", height: "2.3rem", backgroundColor: "#363b4d"}}
                variant="contained"
                disabled={tempValidateForm(titleValue, descriptionValue)}
                onClick={() => {
                    const tempPost: CreateFeedPostDto = {name: titleValue!, description: descriptionValue!, projectId: Number(projectId)}
                    console.log("Added post: " + tempPost.name + " | " + tempPost.description + " | " + tempPost.projectId);
                    AddNewFeedPost(tempPost, setSendingState, setSendSucess);
                    handleFeedChange(String(Math.random()));
                }}
                >
                    Publish
                </Button>}

                </DialogContent>
            </Dialog>
        </>
    );
}