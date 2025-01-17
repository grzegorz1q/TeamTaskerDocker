import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import { AxiosOptions } from "../../../Types/AxiosOptions";

//TODO: Github Issue #87 - make temp methods more generic

export async function UpdatePriorityRequest(issueId: number, issuePriority: string | number, setSendingState: React.Dispatch<React.SetStateAction<boolean>>, 
    setSendSucess: React.Dispatch<React.SetStateAction<number>>, setSelectPriority: React.Dispatch<React.SetStateAction<string | number>>)
{
    setSendingState(true);
    try{
        await axios.put(`https://localhost:7014/api/Issue/UpdateIssuePriority`, {"id": issueId, "priority": issuePriority}, AxiosOptions);
        console.log("Success!");
        setSendingState(false);
        setSendSucess(1);
        setSelectPriority(issuePriority);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSendSucess(0);
    }
    catch(error)
    {
        console.error("There was an issie with \"UpdatePriorityRequest\" POST request: ", {error});
        setSendSucess(2);
        setSendingState(false);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSendSucess(0);
    }
}

export async function UpdateEmployeeRequest(issueId: number, employeeId: string | number, setSendingState: React.Dispatch<React.SetStateAction<boolean>>, 
    setSendSucess: React.Dispatch<React.SetStateAction<number>>, setSelectEmployee: React.Dispatch<React.SetStateAction<string | number>>)
{
    setSendingState(true);
    try{
        await axios.put(`https://localhost:7014/api/Issue/UpdateIssueEmployee`, {"id": issueId, "employeeId": employeeId}, AxiosOptions);
        console.log("Success!");
        setSendingState(false);
        setSendSucess(1);
        setSelectEmployee(employeeId);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSendSucess(0);
    }
    catch(error)
    {
        console.error("There was an issie with \"UpdatePriorityRequest\" POST request: ", {error});
        setSendSucess(2);
        setSendingState(false);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSendSucess(0);
    }
}


export async function UpdateStatusRequest(issueId: number, issueStatus: string | number, setSendingState: React.Dispatch<React.SetStateAction<boolean>>, 
    setSendSucess: React.Dispatch<React.SetStateAction<number>>, setSelectStatus: React.Dispatch<React.SetStateAction<string | number>>)
{
    setSendingState(true);
    try{
        await axios.put(`https://localhost:7014/api/Issue/UpdateIssueStatus`, {"id": issueId, "status": issueStatus}, AxiosOptions);
        console.log("Success!");
        setSendingState(false);
        setSendSucess(1);
        setSelectStatus(issueStatus);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSendSucess(0);
    }
    catch(error)
    {
        console.error("There was an issie with \"UpdateStatusRequest\" POST request: ", {error});
        setSendSucess(2);
        setSendingState(false);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSendSucess(0);
    }
}

export async function UpdateTitleRequest(issueId: number, issueTitle: string, setSendingState: React.Dispatch<React.SetStateAction<boolean>>, 
    setSendSucess: React.Dispatch<React.SetStateAction<number>>, setTitle: React.Dispatch<React.SetStateAction<string>>, initialValue: string)
{
    setSendingState(true);
    try{
        await axios.put(`https://localhost:7014/api/Issue/UpdateIssueName`, {"id": issueId, "name": issueTitle}, AxiosOptions);
        console.log("Success!");
        setSendingState(false);
        setSendSucess(1);
        setTitle(issueTitle);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSendSucess(0);
    }
    catch(error)
    {
        console.error("There was an issie with \"UpdatePriorityRequest\" POST request: ", {error});
        setSendSucess(2);
        setSendingState(false);
        setTitle(initialValue);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSendSucess(0);
    }
}

export async function UpdateDescriptionRequest(issueId: number, issueDescription: string, setSendingState: React.Dispatch<React.SetStateAction<boolean>>, 
    setSendSucess: React.Dispatch<React.SetStateAction<number>>, setDescription: React.Dispatch<React.SetStateAction<string>>, initialValue: string)
{
    setSendingState(true);
    try{
        await axios.put(`https://localhost:7014/api/Issue/UpdateIssueDescription`, {"id": issueId, "description": issueDescription}, AxiosOptions);
        console.log("Success!");
        setSendingState(false);
        setSendSucess(1);
        setDescription(issueDescription);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSendSucess(0);
    }
    catch(error)
    {
        console.error("There was an issie with \"UpdatePriorityRequest\" POST request: ", {error});
        setSendSucess(2);
        setSendingState(false);
        setDescription(initialValue);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSendSucess(0);
    }
}

export async function UpdateStartDateRequest(startDate: Dayjs | null, issueId: number,
    setSendingState: React.Dispatch<React.SetStateAction<boolean>>, setSendSucess: React.Dispatch<React.SetStateAction<number>>, setStartDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>)
{
    if(startDate == null || startDate == undefined)
        return;

    const startDateToSend: {[key: string]: number | string} = 
    {
        "id": issueId,
        "startDate": startDate.toISOString()
    }

    console.log(startDateToSend);

    setSendingState(true);
    try{
        await axios.put(`https://localhost:7014/api/Issue/UpdateIssueStartDate`, startDateToSend, AxiosOptions);
        setSendingState(false);
        setSendSucess(1);
        setStartDate(startDate);
        await new Promise(resolve => setTimeout(resolve, 3000));
        setSendSucess(0);
    }
    catch(error)
    {
        console.error("There was an issie with \"UpdateStartDateRequest\" POST request: ", {error});
        setSendSucess(2);
        setSendingState(false);
        await new Promise(resolve => setTimeout(resolve, 3000));
        setSendSucess(0);
    }
}


export async function UpdateEndDateRequest(endDate: Dayjs | null, issueId: number,
    setSendingState: React.Dispatch<React.SetStateAction<boolean>>, setSendSucess: React.Dispatch<React.SetStateAction<number>>, setEndDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>)
{
    if(endDate == null || endDate == undefined)
        return;

    const endDateToSend: {[key: string]: number | string} = 
    {
        "id": issueId,
        "endDate": endDate.toISOString()
    }

    console.log(endDateToSend);

    setSendingState(true);
    try{
        await axios.put(`https://localhost:7014/api/Issue/UpdateIssueEndtDate`, endDateToSend, AxiosOptions);
        setSendingState(false);
        setSendSucess(1);
        setEndDate(endDate);
        await new Promise(resolve => setTimeout(resolve, 3000));
        setSendSucess(0);
    }
    catch(error)
    {
        console.error("There was an issie with \"UpdateEndDateRequest\" POST request: ", {error});
        setSendSucess(2);
        setSendingState(false);
        await new Promise(resolve => setTimeout(resolve, 3000));
        setSendSucess(0);
    }
}