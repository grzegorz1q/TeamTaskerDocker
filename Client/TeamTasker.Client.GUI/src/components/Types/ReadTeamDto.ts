import { ReadEmployeeDto } from "./ReadEmployeeDto"

export type ReadTeamDto = {
    id: number,
    name: string,
    leaderId: number,
    employees: ReadEmployeeDto[]
}