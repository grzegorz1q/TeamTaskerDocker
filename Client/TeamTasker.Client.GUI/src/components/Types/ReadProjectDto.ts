export type ReadProjectDto = {
    id: number,
    name: string,
    status: string,
    description: string,
    deadline: string,
    isComplete: boolean,
    teamId: number,
    picture: string,
    comments: any[]
}