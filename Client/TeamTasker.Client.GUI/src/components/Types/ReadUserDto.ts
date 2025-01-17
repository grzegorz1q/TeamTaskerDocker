export type ReadUserDto = {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    resetPassword: boolean,
    position: string,
    roleId: 1,
    isTeamLeader: boolean
}