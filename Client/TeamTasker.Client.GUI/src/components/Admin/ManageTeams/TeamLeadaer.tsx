import { Box, Button, CircularProgress, FormControl, Grid, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FormLabel, Input } from "@mui/joy";
import { useState } from "react";
import { Form, Formik, useFormikContext } from "formik";
import { ChangeTeamLeader } from "../../Types/CommonTypes";
import DataPostSnackbar from "../../Connection/Notifies/DataPostSnackbar";
import { ChangeTeamLeaderRequest } from "./TeamsApi";
import ChangeLeaderTeamsSelect from "./Forms/ChangeLeaderTeamsSelect";
import ChangeLeaderEmployeesSelect from "./Forms/ChangeLeaderEmployeesSelect";

function onSubmit(formikValues: ChangeTeamLeader, setSendingState: React.Dispatch<React.SetStateAction<boolean>>, sendSucess: React.Dispatch<React.SetStateAction<number>>)
{
    const newTeamLeader: ChangeTeamLeader = {
        id: formikValues.id,
        leaderId: formikValues.leaderId
    }

    ChangeTeamLeaderRequest(newTeamLeader, setSendingState, sendSucess);
}

function TeamLeaderContent({sendingState}: {sendingState: boolean})
{
    const [currentLeader, setCurrentLeader] = useState<string>("");
    const formikProps = useFormikContext<ChangeTeamLeader>();

    return(
        <>
            <Form>
                <Box sx={{width: "93vw", height: "85vh", backgroundColor: "none"}}>
                    <Grid container spacing={12}>

                        <Grid item xs={12} sx={{display: "flex"}}>
                            <Button onClick={() => {location.href = "/admindashboard/manageteams";}}>
                                <ArrowBackIcon sx={{color: "black", fontSize: "2rem"}}/>
                            </Button>
                            <Typography variant="h4">
                                Team Leader
                            </Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Grid container spacing={7} sx={{display: "flex", flexDirection: "column"}}>

                                <Grid item xs={4}>
                                    <FormLabel>
                                        <Typography sx={{mr: "1rem"}}>
                                            Choose a team: 
                                        </Typography>
                                        <ChangeLeaderTeamsSelect FormikValue={formikProps.values.id} formikSetValue={formikProps.setFieldValue} idName="id" setCurrentLeader={setCurrentLeader}/>
                                    </FormLabel>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormLabel>
                                        <Typography sx={{mr: "1rem"}}>
                                            Current Leader: 
                                        </Typography>
                                        <FormControl>
                                            <Input disabled id="name" placeholder="" sx={{minWidth: "18rem"}} 
                                            value={currentLeader}
                                            />
                                        </FormControl>
                                    </FormLabel>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormLabel>
                                        <Typography sx={{mr: "1rem"}}>
                                            Choose a new leader: 
                                        </Typography>
                                        <ChangeLeaderEmployeesSelect FormikValue={formikProps.values.leaderId} formikSetValue={formikProps.setFieldValue} idName="leaderId"/>
                                    </FormLabel>
                                </Grid>

                                <Grid item xs={4}>
                                        {formikProps.values.leaderId != null && formikProps.values.id != null 
                                        ?
                                        sendingState != true ? <Button type="submit" sx={{ color: "black", backgroundColor: "lightBlue", minWidth: "10rem"}}>Confirm</Button> : <CircularProgress/>
                                        :
                                        <Button disabled sx={{ color: "black", backgroundColor: "lightBlue", minWidth: "10rem"}}>Confirm</Button>
                                        }
                                </Grid>

                            </Grid>
                        </Grid>

                        
                        {/* Guarantees new line */}
                        <Grid item xs={8}></Grid> 
                    </Grid>
                </Box>
            </Form>
        </>
    );
}

export default function TeamLeader()
{
    const [sendingState, setSendingState] = useState<boolean>(false);
    const [sendSucess, setSendSucess] = useState<number>(0);

    return(
        <>
            {sendSucess == 2 ? <DataPostSnackbar TextIndex={0} IsDangerSnackBar={true}/> : <></>}
            {sendSucess == 1 ? <DataPostSnackbar TextIndex={1} IsDangerSnackBar={false}/> : <></>}
            <Formik initialValues={{id: 0, leaderId: 0}}
            onSubmit={(values) => {console.log(values), onSubmit(values, setSendingState, setSendSucess)}}
            >
                <TeamLeaderContent sendingState={sendingState}/>
            </Formik>
        </>
    );
}