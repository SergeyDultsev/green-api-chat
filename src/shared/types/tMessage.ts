export type tMessage = {
    type: "incoming" | "outgoing";
    idMessage: string;
    timestamp: number;
    typeMessage: string;
    chatId: string;
    chatType: string;
    textMessage?: string;
    senderId?: string;
    senderName?: string;
    senderType?: string;
    senderContactName?: string;
    statusMessage?: string;
    sendByApi?: boolean;
    isForwarded: boolean;
    forwardingScore: number;
    deletedMessageId: string;
    editedMessageId: string;
    isEdited: boolean;
    isDeleted: boolean;
    isRead?: boolean;
    isReadTimestamp?: number;
    caption?: string;
    downloadUrl?: string;
    fileName?: string;
    videoNote?: false
};