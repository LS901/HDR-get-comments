// I have made all these fields optional as all of them are able to be omitted.
export interface CommentData {
    postId?: number
    id?: number
    name?: string
    email?: string
    body?: string
}

export type OmitValues = 'postId' | 'id' | 'name' | 'email' | 'body'