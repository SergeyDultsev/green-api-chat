import { useQuery} from "@tanstack/react-query";
import { getChats } from "@modules/chat/api/getChats.ts";
import { getMessages } from "@modules/chat/api/getMessages.ts";
import type { tCredentials } from "@shared/types/tCredentials.ts";

export const chatKeys = {
    all: ['chats'] as const,
    list: (creds: tCredentials) => [...chatKeys.all, creds.idInstance] as const,
    messages: (creds: tCredentials, chatId: string) => [...chatKeys.all, 'messages', creds.idInstance, chatId] as const,
};

export const useChats = (creds: tCredentials) => {
    return useQuery({
        queryKey: chatKeys.list(creds),
        queryFn: () => getChats(creds),
        enabled: Boolean(creds.idInstance && creds.apiTokenInstance),
        initialData: []
    });
};

export const useMessages = (creds: tCredentials, chatId: string | undefined) => {
    return useQuery({
        queryKey: chatKeys.messages(creds, chatId ?? ''),
        queryFn: () => getMessages(creds, chatId as string),
        enabled: Boolean(creds.idInstance && creds.apiTokenInstance && chatId),
        initialData: []
    });
};