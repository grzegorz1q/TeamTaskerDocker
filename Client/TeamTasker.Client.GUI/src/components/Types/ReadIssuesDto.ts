export type ReadIssueDto = {
    id: number,
    projectIssueId: number,
    name: string,
    description: string,
    startDate: string,
    endDate: string,
    priority: string,
    status: string,
    completeTime: string | null,
    employeeId: number,
    projectId: number
}
