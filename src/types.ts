export interface CommentData {
    postId: number
    id: number
    name: string
    email: string
    body: string
}

export type OmitValues = 'postId' | 'id' | 'name' | 'email' | 'body'