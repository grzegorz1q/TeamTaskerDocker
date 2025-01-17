export type ReadCommentDto = {
    id: number,
    created: string,
    content: string,
    issueId: number,
    userId: number
  }

export type CreateCommentDto = {
    issueId: number,
    userId: number,
    content: string
}