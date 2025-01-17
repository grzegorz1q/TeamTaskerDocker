import {Dayjs} from "dayjs";

export type CreateIssueDto = {
    name: string,
    description: string,
    startDate: Dayjs,
    endDate: Dayjs,
    priority: number,
    employeeId: number,
    projectId: number
}