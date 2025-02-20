import {Post} from "@mattermost/types/lib/posts";

export type JSONMessageData = {
    channel_display_name: string,
    channel_name: string,
    channel_type: string,
    mentions?: string,
    post: string,
    sender_name: string
}

export type MessageData = {
    channel_display_name: string,
    channel_name: string,
    channel_type: string,
    mentions: string[],
    post: Post,
    sender_name: string
}

export type AiResponse = {
    message: string,
    props?: Record<string, string>,
    fileId?: string,
    intermediate?: boolean
}