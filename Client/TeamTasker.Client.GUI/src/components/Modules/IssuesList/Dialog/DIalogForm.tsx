import { Input, Textarea } from "@mui/joy";
import { Button, CircularProgress, Divider, Grid, InputLabel, Typography } from "@mui/material";
import ProjectEmployeeSelect from "../ProjectEmployeeSelect";
import PrioritySelect from "../PrioritySelect";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Form, Formik, FormikValues, useFormikContext } from "formik";
import { CreateIssueDto } from "../../../Types/CreateIssueDto";
import { useEffect, useState } from "react";
import { PostNewIssue } from "../../API/PostNewIssue";
import DataPostSnackbar from "../../../Connection/Notifies/DataPostSnackbar";
import React from "react";

function onSubmit(projectId: string, formikValues: FormikValues, setSendingState: React.Dispatch<React.SetStateAction<boolean>>, setSendSucess: React.Dispatch<React.SetStateAction<number>>)
{
    const newIssueToAdd: CreateIssueDto = {
        name: formikValues.name,
        description: formikValues.description,
        startDate: formikValues.startDate,
        endDate: formikValues.endDate,
        priority: formikValues.priority,
        employeeId: formikValues.employeeId,
        projectId: parseInt(projectId)
    }

    console.log(newIssueToAdd);

    PostNewIssue(newIssueToAdd, setSendingState, setSendSucess);
}

function DialogFormContent({projectId, sendingState}: {projectId: string, sendingState: boolean})
{
    const formikProps = useFormikContext<CreateIssueDto>();
            formikProps.setFieldValue
    return(
        <>
            <Form>
                <InputLabel>
                    <Typography fontWeight={550}>Title</Typography>
                    <Divider sx={{mb: "1rem"}}/>
                    <Input
                    id="name"
                    value={formikProps.values.name}
                    onChange={formikProps.handleChange}
                    sx={{width: "100%"}}
                    placeholder="Title of the issue"
                    />
                </InputLabel>

                <Grid container sx={{mt: "2rem"}}>
                    {/*Assign to | Set priority*/}
                    <Grid item xs={6}>
                        <InputLabel>
                            <Typography fontWeight={550}>Assign to</Typography>
                            <Divider sx={{width: "90%", mb: "1rem"}}/>
                            <ProjectEmployeeSelect formikValue={formikProps.values.employeeId} formikHandleChange={formikProps.handleChange} projectId={projectId}/>
                        </InputLabel>
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel>
                            <Typography fontWeight={550}>Set priority</Typography>
                            <Divider sx={{mb: "1rem"}}/>
                            <PrioritySelect formikValue={formikProps.values.priority} formikHandleChange={formikProps.handleChange}/>
                        </InputLabel>
                    </Grid>

                    {/*Start Date | End Date*/}
                    <Grid item xs={6}>
                        <InputLabel sx={{mt: "2rem"}}>
                            <Typography fontWeight={550}>Start Date</Typography>
                            <Divider sx={{width: "90%", mb: "1rem"}}/>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker 
                                name="startDate"
                                minDate={dayjs()}
                                maxDate={formikProps.values.endDate}
                                defaultValue={dayjs()}
                                value={formikProps.values.startDate}
                                onChange={(value, event) => {formikProps.setFieldValue("startDate", value); event}}
                                />
                            </LocalizationProvider>
                        </InputLabel>
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel sx={{mt: "2rem"}}>
                            <Typography fontWeight={550}>End Date</Typography>
                            <Divider sx={{mb: "1rem"}}/>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                name="endDate"
                                minDate={formikProps.values.startDate}
                                defaultValue={dayjs().add(1, 'week')}
                                value={formikProps.values.endDate}
                                onChange={(value, event) => {formikProps.setFieldValue("endDate", value); event}}
                                />
                            </LocalizationProvider>
                        </InputLabel>
                    </Grid>

                </Grid>

                <InputLabel sx={{mt: "2rem"}}>
                    <Typography fontWeight={550}>Description</Typography>
                    <Divider sx={{mb: "1rem"}}/>
                    <Textarea 
                    name="description"
                    sx={{minHeight: "8rem", maxHeight: "8rem"}} placeholder="Description of the issue"
                    value={formikProps.values.description}
                    onChange={formikProps.handleChange}
                    />
                </InputLabel>

                {sendingState ? <CircularProgress/> : <Button type="submit" sx={{mt: "3rem", height: "2.3rem", backgroundColor: "#363b4d"}}variant="contained">Create</Button>}
            </Form>
        </>
    );
}

export default function DialogForm({projectId, setOpenDialog, setUpdateList}: 
    {projectId:string, setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>, setUpdateList: React.Dispatch<React.SetStateAction<boolean>>})
{
    const [sendingState, setSendingState] = useState<boolean>(false);
    const [sendSucess, setSendSucess] = useState<number>(0);
    
    useEffect(()=> {
        if(sendingState == false && sendSucess == 1)
            setOpenDialog(false);

            //setUpdateList(false);
            setUpdateList(true);
    }, [sendSucess]);

    return(
        <>
            {sendingState == false && sendSucess == 1 ? <DataPostSnackbar TextIndex={1} IsDangerSnackBar={false}/> : <></>}
            {sendingState == false && sendSucess == 2 ? <DataPostSnackbar TextIndex={0} IsDangerSnackBar={true}/> : <></>}
            <Formik 
            initialValues={{name: "", description: "", startDate: dayjs(), endDate: dayjs().add(1, 'week'), priority: 0, employeeId: 0, projectId: 0}}
            onSubmit={(values) => {onSubmit(projectId, values, setSendingState, setSendSucess)}}
            >
                <DialogFormContent projectId={projectId} sendingState={sendingState}/>
            </Formik>
        </>
    );
}