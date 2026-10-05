import { useQuery} from "@tanstack/react-query";
import { getChats } from "@modules/chat/api/getChats.ts";
import { getMessages } from "@modules/chat/api/getMessages.ts";
import type { Credentials } from "@shared/types/types.ts";

export const chatKeys = {
    all: ['chats'] as const,
    list: (creds: Credentials) => [...chatKeys.all, creds.idInstance] as const,
    messages: (creds: Credentials, chatId: string) => [...chatKeys.all, 'messages', creds.idInstance, chatId] as const,
};

export const useChats = (creds: Credentials) => {
    return useQuery({
        queryKey: chatKeys.list(creds),
        queryFn: () => getChats(creds),
        enabled: Boolean(creds.idInstance && creds.apiTokenInstance),
    });
};

export const useMessages = (creds: Credentials, chatId: string | undefined) => {
    return useQuery({
        queryKey: chatKeys.messages(creds, chatId ?? ''),
        queryFn: () => getMessages(creds, chatId as string),
        enabled: Boolean(creds.idInstance && creds.apiTokenInstance && chatId),
    });
};