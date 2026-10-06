import type { tMessage } from "@shared/types/tMessage.ts";

const UNSUPPORTED_MESSAGE_TYPES = new Set([
    'deletedMessage',
    'videoMessage',
    'imageMessage',
    'audioMessage',
    'stickerMessage',
    'documentMessage',
]);

export const getRenderableMessages = (messages: tMessage[]) =>
    messages
        .filter(
            (message) =>
                !message.isDeleted &&
                !UNSUPPORTED_MESSAGE_TYPES.has(message.typeMessage),
        )
        .reverse();
