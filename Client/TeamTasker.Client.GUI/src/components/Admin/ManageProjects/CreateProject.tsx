import { Box, Button, CircularProgress, FormControl, Grid, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Form, Formik, useFormikContext } from "formik";
import { useState } from "react";
import { FormLabel, Input, Textarea } from "@mui/joy";
//import { CreateTeamRequest } from "./ProjectsApi";
import DataPostSnackbar from "../../Connection/Notifies/DataPostSnackbar";
import { CreateProjectDto } from "../../Types/CreateProjectDto";
import GeneriCreateProjectInput from "./Forms/GenericCreateProjectInput";
import TempStatusSelect from "./Forms/TempStatusSelect";
import { CreateProjectRequest } from "./ProjectsApi";

function onSubmit(formikValues: CreateProjectDto, setSendingState: React.Dispatch<React.SetStateAction<boolean>>, sendSucess: React.Dispatch<React.SetStateAction<number>>)
{
     const projectToCreate: CreateProjectDto = {
         name: formikValues.name,
         deadline: "2025-06-01T12:00:00.000Z",
         status: formikValues.status,
         description: formikValues.description
     }

        CreateProjectRequest(projectToCreate, setSendingState, sendSucess);
}

function CreateTeamContent({sendingState}: {sendingState: boolean})
{
    const formikProps = useFormikContext<CreateProjectDto>();

    return(
        <>
            <Form>
                <Box sx={{width: "93vw", height: "85vh", backgroundColor: "none"}}>
                    <Grid container spacing={12}>

                        <Grid item xs={12} sx={{display: "flex"}}>
                            <Button onClick={() => {location.href = "/admindashboard/manageprojects";}}>
                                <ArrowBackIcon sx={{color: "black", fontSize: "2rem"}}/>
                            </Button>
                            <Typography variant="h4">
                                Create Project
                            </Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <Grid container spacing={7} sx={{display: "flex", flexDirection: "column"}}>

                                <Grid item xs={4}>
                                    <FormLabel>
                                        <Typography sx={{mr: "1rem"}}>
                                            Name a Project: 
                                        </Typography>
                                        <FormControl>
                                            <GeneriCreateProjectInput idName={"name"} FormikValue={formikProps.values.name} 
                                            FormikValueOnChange={formikProps.handleChange} placeholder={"Project's name"} 
                                            />
                                        </FormControl>
                                    </FormLabel>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormLabel>
                                        <Typography sx={{mr: "1rem"}}>
                                            Main deadline:
                                        </Typography>
                                        <Input disabled value={"June, 2025"} sx={{minWidth: "25rem"}}/>
                                    </FormLabel>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormLabel>
                                        <Typography>
                                            Initial Status
                                        </Typography>
                                        <TempStatusSelect FormikValue={formikProps.values.status} formikSetValue={formikProps.setFieldValue} idName={"status"} />
                                    </FormLabel>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormLabel>
                                        <Typography>
                                            Description
                                        </Typography>
                                        <Textarea sx={{ minWidth: "25rem", maxWidth: "25rem", minHeight: "10rem", maxHeight: "18rem"}}
                                        placeholder="Type your project's description here." name="description"
                                        value={formikProps.values.description} onChange={formikProps.handleChange}
                                        />
                                    </FormLabel>
                                </Grid>

                                <Grid item xs={4}>
                                    {formikProps.values.name != null && formikProps.values.status != null && formikProps.values.description != null
                                    ?
                                    sendingState != true ? <Button type="submit" sx={{ color: "black", backgroundColor: "lightBlue", minWidth: "10rem"}}>Confirm</Button> : <CircularProgress/>
                                    :
                                    <Button disabled sx={{ color: "black", backgroundColor: "lightBlue", minWidth: "10rem"}}>Confirm</Button>
                                    }
                                </Grid>
                                
                            </Grid>
                        </Grid>

                        {/* Guarantees new line */}
                        <Grid item xs={9}></Grid> 

                    </Grid>
                </Box>
            </Form>
        </>
    );
}

export default function CreateTeam()
{
    const [sendingState, setSendingState] = useState<boolean>(false);
    const [sendSucess, setSendSucess] = useState<number>(0);

    return(
        <>
            {sendSucess == 2 ? <DataPostSnackbar TextIndex={0} IsDangerSnackBar={true}/> : <></>}
            {sendSucess == 1 ? <DataPostSnackbar TextIndex={1} IsDangerSnackBar={false}/> : <></>}
            <Formik initialValues={{name: "", deadline: "", status: 1, description: ""}}
            onSubmit={(values) => {console.log(values), onSubmit(values, setSendingState, setSendSucess)}}
            >
                <CreateTeamContent sendingState={sendingState}/>
            </Formik>
        </>
    );
}