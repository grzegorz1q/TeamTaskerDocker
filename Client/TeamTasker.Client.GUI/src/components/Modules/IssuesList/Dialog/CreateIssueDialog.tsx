import { Dialog, DialogContent, Typography } from "@mui/material";
import DialogForm from "./DIalogForm";
import React from "react";

export default function CreateIssueDialog({projectId, openDialog, setOpenDialog, setUpdateList}: 
    {projectId: string, openDialog: boolean, setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>, setUpdateList: React.Dispatch<React.SetStateAction<boolean>>})
{
    return(
        <Dialog 
        maxWidth="lg"
        open={openDialog}
        onClose={() => {setOpenDialog(false)}}
        sx={{width: "100%"}}
        scroll={"paper"}
        //PaperProps={{style: {overflowY: "visible"}}}
        >
            <DialogContent sx={{width: "50vw", minWidth: "50rem", minHeight: "30vh"/*, overflowY: "visible"*/}}>
                <Typography variant="h4" fontWeight={500} mb={4}>
                    Create New Issue
                </Typography>

                <DialogForm projectId={projectId} setOpenDialog={setOpenDialog} setUpdateList={setUpdateList}/>
                
            </DialogContent>
        </Dialog>
    );
}