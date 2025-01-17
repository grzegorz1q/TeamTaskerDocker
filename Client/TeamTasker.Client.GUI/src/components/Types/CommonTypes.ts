import { FormikErrors } from "formik";
import { CreateProjectDto } from "./CreateProjectDto";
import { AddTeamToProjectDto } from "./AddTeamToProjectDto";
import { CreateIssueDto } from "./CreateIssueDto";

export interface AddUserToTeamForm {
    employeeId: number,
    teamId: number
}

export interface CreateTeamForm {
    name: string,
    leaderId: number
}

export interface ChangeTeamLeader {
    id: number,
    leaderId: number
}

export type FormikUsersSetValue = (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<AddUserToTeamForm>>;

export type FormikCreateTeamSetValue = (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<CreateTeamForm>>;

export type FormikChangeTeamSetValue = (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<ChangeTeamLeader>>;

export type FormikCreateProjectSetValue = (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<CreateProjectDto>>;

export type FormikAssignTeamSetValue = (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<AddTeamToProjectDto>>;

export type FormikCreateIsssueSetValue = (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<CreateIssueDto>>;

export type FormikCreateIssueHandleChange = {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
};

export type FormikOnChangeHandler = {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
};