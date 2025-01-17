import { ReadEmployeeDto } from "../../Types/ReadEmployeeDto";
import { ReadIssueDto } from "../../Types/ReadIssuesDto";

export default function IssuesListFilter(issue: ReadIssueDto, currentUserEmail: string, projectEmployees: ReadEmployeeDto[])
{
    //Filter options, loaded from the Web's session storage
    const userGroupFilter = sessionStorage.getItem('issuesOptions') ?? "project";
    const statusFilter = sessionStorage.getItem('statusOptions') ?? "default";
    const priorityFilter = sessionStorage.getItem('priorityOptions') ?? "default";
    const currentUserId = projectEmployees.find(employee => employee.email == currentUserEmail)?.id ?? 0;

    //Implemented to use JS filter method, to simplify implementation
    const singularIssueArray: ReadIssueDto[] = [issue];

    //Issues of the logged in user
    if(userGroupFilter === "user" && currentUserId != 0)
    {
        if(statusFilter === "default" && priorityFilter === "default")
            return (singularIssueArray.filter(issue => issue.employeeId === currentUserId).length === 0 ? false : true);

        if(statusFilter === "default" && priorityFilter !== "default")
            return singularIssueArray.filter(issue => issue.employeeId === currentUserId && issue.priority === priorityFilter).length === 0 ? false : true;

        if(statusFilter !== "default" && priorityFilter === "default")
            return singularIssueArray.filter(issue => issue.employeeId === currentUserId && issue.status === statusFilter).length === 0 ? false : true;

        if(statusFilter !== "default" && priorityFilter !== "default")
            return singularIssueArray.filter(issue => issue.employeeId === currentUserId && issue.status === statusFilter && issue.priority === priorityFilter).length === 0 ? false : true;

        return true;
    }

    //Isseus of the whole project
    if(statusFilter === "default" && priorityFilter === "default")
        return true;

    if(statusFilter === "default" && priorityFilter !== "default")
        return singularIssueArray.filter(issue => issue.priority === priorityFilter).length === 0 ? false : true;

    if(statusFilter !== "default" && priorityFilter === "default")
        return singularIssueArray.filter(issue => issue.status === statusFilter).length === 0 ? false : true;

    if(statusFilter !== "default" && priorityFilter !== "default")
        return singularIssueArray.filter(issue => issue.status === statusFilter && issue.priority === priorityFilter).length === 0 ? false : true;

    return true;
}