import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getChats } from "@modules/chat/api/getChats.ts";
import { getMessages } from "@modules/chat/api/getMessages.ts";
import { sendMessage } from "@modules/chat/api/sendMessage.ts";
import type { tCredentials } from "@shared/types/tCredentials.ts";
import { checkAccount } from "@modules/chat/api/checkAccount.ts";

export const chatKeys = {
    all: ['chats'] as const,
    list: (creds: tCredentials | null) => [...chatKeys.all, creds?.idInstance ?? ''] as const,
    messages: (creds: tCredentials | null, chatId: string) => [...chatKeys.all, 'messages', creds?.idInstance ?? '', chatId] as const,
};

export const useChats = (creds: tCredentials | null) => {
    return useQuery({
        queryKey: chatKeys.list(creds),
        queryFn: () => getChats(creds as tCredentials),
        enabled: Boolean(creds?.idInstance && creds?.apiTokenInstance),
        initialData: []
    });
};

export const useMessages = (creds: tCredentials | null, chatId: string | undefined) => {
    return useQuery({
        queryKey: chatKeys.messages(creds, chatId ?? ''),
        queryFn: () => getMessages(creds as tCredentials, chatId as string),
        enabled: Boolean(creds?.idInstance && creds?.apiTokenInstance && chatId),
        initialData: []
    });
};

export const useSendMessage = (creds: tCredentials | null) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ chatId, message }: { chatId: string; message: string }) =>
            sendMessage(creds as tCredentials, chatId, message),
        onSuccess: (_data, { chatId }) => {
            queryClient.invalidateQueries({ queryKey: chatKeys.messages(creds, chatId) });
            queryClient.invalidateQueries({ queryKey: chatKeys.list(creds) });
        },
    });
};

export const useCheckAccount = (creds: tCredentials | null) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ phoneNumber }: { phoneNumber: number }) =>
            checkAccount(creds as tCredentials, phoneNumber),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: chatKeys.list(creds) });
        },
    });
};
