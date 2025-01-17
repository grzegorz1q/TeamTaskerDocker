import { BarSeriesType, PieValueType } from "@mui/x-charts";
import { MakeOptional } from "@mui/x-date-pickers/internals";
import { ReadIssueDto } from "../../../Types/ReadIssuesDto";
import axios, { AxiosResponse } from "axios";
import { AxiosOptions } from "../../../Types/AxiosOptions";
import { ReadEmployeeDto } from "../../../Types/ReadEmployeeDto";

type barChartData = MakeOptional<BarSeriesType, "type">;
type pieChartData = MakeOptional<PieValueType, "id">;
type chartDataUseState = React.Dispatch<React.SetStateAction<MakeOptional<BarSeriesType, "type">[]>>;
type chartDoneAndAll = React.Dispatch<React.SetStateAction<MakeOptional<PieValueType, "id">[]>>;
//type setSuccessState = React.Dispatch<React.SetStateAction<number>>;
type setSendindStatus = React.Dispatch<React.SetStateAction<boolean>>;

//{data: [10], stack: '1', label: 'Leader User'}, {data: [3], stack: '2', label: 'Test Testowy'}
// { data: [10], stack: 'A', label: 'New Issues' },
// { data: [15], stack: 'B', label: 'In Progress' },
// { data: [10], stack: 'C', label: 'On Hold' },
// { data: [8], stack: 'D', label: 'Issues Done' }

export default async function GetIssuesByStatus(setIssuesByUser: chartDataUseState, setIssuesByStatus: chartDataUseState, setIssuesDone: chartDoneAndAll,
                                                projectEmployees: ReadEmployeeDto[], projectId: string | undefined, setSendingState: setSendindStatus) 
{
    var response: AxiosResponse<ReadIssueDto[], any>;
    setSendingState(true);
    if(projectId == "0" || undefined)
        return;

    try 
    {
        response = await axios.get<ReadIssueDto[]>(`https://localhost:7014/api/Issue/GetAllIssuesFromProject?projectId=${projectId}`, AxiosOptions);
        console.log("Project Preview: " + response.data);
    } 
    catch (error)
    {
        console.log("Project Preview error: " + error);
        setSendingState(false);
        return;
    }

    //If none issues in the database
    if(response! === undefined || response.data.length == 0)
        return;

    var employeesChartInfo: barChartData[] = [];
    var statusesChartInfo: barChartData[] = [];
    var doneAndAllChartInfo: pieChartData[] = [];

    console.log(projectEmployees.length);

    projectEmployees.forEach(employee => 
            employeesChartInfo.push({
                data: [response.data.filter(issue => issue.employeeId == employee.id && issue.status === "IssueDone").length], 
                stack: employee.email, 
                label: employee.firstName + ' ' + employee.lastName})
    );

    statusesChartInfo = 
    [
        {
            data: [response.data.filter(issue => issue.status === "NewIssue").length], 
            stack: 'A', 
            label: "New Issues"
        },
        {
            data: [response.data.filter(issue => issue.status === "InProgress").length], 
            stack: 'B', 
            label: "In Progress"
        },
        {
            data: [response.data.filter(issue => issue.status === "OnHold").length], 
            stack: 'C', 
            label: "On Hold"
        },
        {
            data: [response.data.filter(issue => issue.status === "IssueDone").length], 
            stack: 'D', 
            label: "Issues Done"
        }
    ]

    doneAndAllChartInfo =
    [
        { 
            id: 0,
            value: response.data.filter(issue => issue.status === "IssueDone").length, 
            label: 'Done' 
        },
        { 
            id: 1,
            value: response.data.length - response.data.filter(issue => issue.status === "IssueDone").length,
            label: 'Remaining' 
        }
    ]

    
    setIssuesByUser(employeesChartInfo);
    setIssuesByStatus(statusesChartInfo);
    setIssuesDone(doneAndAllChartInfo);
    setSendingState(false);
}