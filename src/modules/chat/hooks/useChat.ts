import { useParams } from "react-router-dom";
import { useCredentials } from "@/shared";
import { useChats, useMessages, useSendMessage } from "@modules/chat/model/chat.queries.ts";
import type { tMessage } from "@shared/types/tMessage.ts";
import { useEffect, useRef, useState } from "react";

export const useChat = () => {
    const { id } = useParams();
    const credentials = useCredentials();

    const { data: chats = [] } = useChats(credentials);

    const currentContact = chats.find(
        chat => chat.chatId === id
    ) ?? {
        chatId: id ?? '',
        name: id?.split('@')[0] ?? 'Имя собеседника',
        type: 'user',
        phoneNumber: Number(id?.split('@')[0]) || 0,
        unreadCount: 0,
    };

    const {
        data: dataMessage,
        isLoading: isLoadingMessage,
        isError: isErrorMessage
    } = useMessages(credentials, id);

    const [message, setMessage] = useState('');
    const [sendError, setSendError] = useState<string | null>(null);

    const { mutateAsync: sendMessageRequest, isPending: isSending } =
        useSendMessage(credentials);

    const setFromMessage = (_name: string, value: string | number) => {
        setSendError(null);
        setMessage(String(value));
    };

    const sendMessage = async () => {
        const text = message.trim();

        if (!id || !text) return;

        try {
            await sendMessageRequest({ chatId: id, message: text });
            setMessage('');
        } catch {
            setSendError('Не удалось отправить сообщение.');
        }
    };

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
        message,
        sendError,
        isSending,
        setFromMessage,
        sendMessage,
    }
}
