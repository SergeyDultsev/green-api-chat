import { useParams } from "react-router-dom";
import { useCredentials } from "@/shared";
import { useChats, useMessages } from "@modules/chat/model/chat.queries.ts";
import type { tMessage } from "@shared/types/tMessage.ts";
import { useEffect, useRef } from "react";

export const useChat = () => {
    const { id } = useParams();
    const credentials = useCredentials();

    const { data: chats = [] } = useChats(credentials);
    const currentContact = chats.find(
        chat => chat.chatId === id
    );

    const {
        data: dataMessage,
        isLoading: isLoadingMessage,
        isError: isErrorMessage
    } = useMessages(credentials, id);

    const getMessages = (messages: tMessage[]) => {
        return messages.filter((message) => {
            if (message.isDeleted) return false;

            switch (message.typeMessage) {
                case 'deletedMessage':
                case 'videoMessage':
                case 'imageMessage':
                case 'audioMessage':
                case 'stickerMessage':
                case 'documentMessage':
                    return false;
                default:
                    return true;
            }
        }).reverse();
    }

    const messages = dataMessage
        ? getMessages(dataMessage)
        : [];

    const bottonChatRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        bottonChatRef.current?.scrollIntoView({ behavior: "auto" });
    }, [messages?.length]);

    return {
        currentContact,
        messages,
        isLoadingMessage,
        isErrorMessage,
        bottonChatRef,
    }
}