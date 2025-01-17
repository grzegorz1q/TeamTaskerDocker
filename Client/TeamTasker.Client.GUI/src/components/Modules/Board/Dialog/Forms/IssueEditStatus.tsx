import { MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { UpdateStatusRequest } from "../../../API/Board/EditIssueRequests";
import DataPostSnackbar from "../../../../Connection/Notifies/DataPostSnackbar";
import { handleIssueChange } from "../BoardReloadOnChange";

export default function EditIssueStatusSelect({issueStatus, issueId}: {issueStatus: string, issueId: number})
{
    const statusString: {[key: string]: string} = {
        "NewIssue": "⬜ New Issue",
        "InProgress": "🟦 In Progress",
        "OnHold": "🟪 On Hold",
        "IssueDone": "🟩 Issue Done",
        default: "⬛ Can't load status"
      }

    const statusValue: {[key: string]: number} = {
        "NewIssue": 1,
        "InProgress": 2,
        "OnHold": 3,
        "IssueDone": 4,
        default: -1
    }

    // const statusValueNumber: {[key: number]: string} = {
    //     1: "NewIssue",
    //     2: "InProgress",
    //     3: "OnHold",
    //     4: "IssueDone"
    // }

    const [selectStatus, setSelectStatus] = useState<number | string>(statusValue[issueStatus]);
    const [sendingState, setSendingState] = useState<boolean>(false);
    const [sendSucess, setSendSucess] = useState<number>(0);

    return(
        <>
            {sendingState == false && sendSucess == 2 ? <DataPostSnackbar TextIndex={0} IsDangerSnackBar={true}/> : <></>}
            <Select 
                sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
                defaultValue={1}
                disabled={sendingState ? true : false}
                //onChange={(event) => {ChangeTaskStatus(issue.id, event.target.value, setSendingState, setSendSucess)}}
                value={selectStatus}
                onChange={(event) => {
                    //setSelectStatus(event.target.value);
                    UpdateStatusRequest(issueId, event.target.value, setSendingState, setSendSucess, setSelectStatus);
                    handleIssueChange(event.target.value.toString() + String(Math.random()));
                }}
                >
                <MenuItem key={1} value={1}>{statusString["NewIssue"]}</MenuItem>
                <MenuItem key={2} value={2}>{statusString["InProgress"]}</MenuItem>
                <MenuItem key={3} value={3}>{statusString["OnHold"]}</MenuItem>
                <MenuItem key={4} value={4}>{statusString["IssueDone"]}</MenuItem>
            </Select>
        </>
    );
}