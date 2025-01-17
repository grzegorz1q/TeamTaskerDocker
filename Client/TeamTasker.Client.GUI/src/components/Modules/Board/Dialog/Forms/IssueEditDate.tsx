import { Grid} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { ReadIssueDto } from "../../../../Types/ReadIssuesDto";
import {UpdateEndDateRequest, UpdateStartDateRequest} from "../../../API/Board/EditIssueRequests";
import DataPostSnackbar from "../../../../Connection/Notifies/DataPostSnackbar";
import { handleIssueChange } from "../BoardReloadOnChange";

export default function IssueEditDate({ReadIssueDto, leaderPermission}: {ReadIssueDto: ReadIssueDto, leaderPermission: boolean})
{
    const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(ReadIssueDto.startDate));
    const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(ReadIssueDto.endDate));

    const [sendingState, setSendingState] = useState<boolean>(false);
    const [sendSucess, setSendSucess] = useState<number>(0);

    useEffect(() => {
        console.log("Przeładowanie!");
        console.log(startDate?.toString());
        console.log(sendingState);
    }, [sendSucess]);

    return(
        <>
            <Grid item xs={5}>
                {sendingState == false && sendSucess == 2 ? <DataPostSnackbar TextIndex={0} IsDangerSnackBar={true}/> : <></>}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                {sendingState == false ? 
                    <DatePicker
                        name="startDate"
                        label="Start Date"
                        maxDate={dayjs(endDate)}
                        minDate={dayjs()}
                        disabled={!leaderPermission ? true : (sendingState ? true : false)}
                        //defaultValue={dayjs(startDate)}
                        value={startDate}
                        onChange={(value) => {
                            UpdateStartDateRequest(value, ReadIssueDto.id, setSendingState, setSendSucess, setStartDate);
                            handleIssueChange(startDate!.toISOString() + String(Math.random()));
                        }}
                        />
                        :
                        <LocalizationProvider><DatePicker label="Start Date" disabled defaultValue={startDate}/></LocalizationProvider>
                }
                </LocalizationProvider>
            </Grid>
            <Grid item xs={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                {sendingState == false ? 
                <DatePicker
                name="endDate"
                label="End Date"
                minDate={dayjs(startDate)}
                disabled={!leaderPermission ? true : (sendingState ? true : false)}
                defaultValue={endDate}
                onChange={(value) => {
                    UpdateEndDateRequest(value, ReadIssueDto.id, setSendingState, setSendSucess, setEndDate);
                    handleIssueChange(endDate!.toISOString() + String(Math.random()));
                }}
                />
                : 
                <LocalizationProvider><DatePicker label="Start Date" disabled defaultValue={endDate}/></LocalizationProvider>
                }
                </LocalizationProvider>
            </Grid>
        </>
    );
    
}