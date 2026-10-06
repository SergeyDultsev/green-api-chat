export const MESSAGE_WEBHOOK_TYPES = [
    "incomingMessageReceived",
    "outgoingMessageReceived",
    "outgoingAPIMessageReceived",
] as const;

export type tMessageWebhookType = (typeof MESSAGE_WEBHOOK_TYPES)[number];

export const isMessageWebhook = (
    type: string,
): type is tMessageWebhookType =>
    (MESSAGE_WEBHOOK_TYPES as readonly string[]).includes(type);

export type tNotification = {
    typeWebhook: string;
    instanceData: {
        idInstance: number;
        wid: string;
        typeInstance: string;
    };
    timestamp: number;
    idMessage: string;
    senderData?: {
        chatId?: string;
        chatName?: string;
        chatType?: string;
        sender?: string;
        senderName?: string;
        senderType?: string;
        senderContactName?: string;
        senderPhoneNumber?: number;
    };
    messageData?: {
        typeMessage?: string;
        textMessageData?: {
            textMessage?: string;
        };
        [key: string]: unknown;
    };
};