import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { tCredentials } from "@shared/types/tCredentials.ts";
import { receiveNotification } from "@modules/chat/api/receiveNotification.ts";
import { deleteNotification } from "@modules/chat/api/deleteNotification.ts";
import { chatKeys } from "@modules/chat/model/chat.queries.ts";
import { isMessageWebhook } from "@shared/types/tNotification.ts";

const RECEIVE_TIMEOUT = 5;
const RETRY_DELAY = 5000;

export const useReceiveNotifications = (credentials: tCredentials | null) => {
    const queryClient = useQueryClient();
    const timerRef = useRef<number | null>(null);

    const idInstance = credentials?.idInstance;
    const apiTokenInstance = credentials?.apiTokenInstance;

    useEffect(() => {
        if (!idInstance || !apiTokenInstance) return;

        const creds: tCredentials = { idInstance, apiTokenInstance };

        let active = true;

        const clearTimer = () => {
            if (timerRef.current !== null) {
                window.clearTimeout(timerRef.current);
                timerRef.current = null;
            }
        };

        const tick = async () => {
            if (!active) return;

            try {
                const notification = await receiveNotification(creds, RECEIVE_TIMEOUT);

                if (notification && active) {
                    await deleteNotification(creds, notification.receiptId);

                    const typeWebhook = notification.body?.typeWebhook;

                    if (isMessageWebhook(typeWebhook)) {
                        const chatId = notification.body?.senderData?.chatId;

                        if (chatId) {
                            queryClient.invalidateQueries({
                                queryKey: chatKeys.messages(creds, chatId),
                            });
                        }
                    }

                    if (typeWebhook === "incomingMessageReceived") {
                        queryClient.invalidateQueries({ queryKey: chatKeys.list(creds) });
                    }
                }

                if (active) {
                    tick();
                }
            } catch {
                if (active) {
                    clearTimer();
                    timerRef.current = window.setTimeout(tick, RETRY_DELAY);
                }
            }
        };

        tick();

        return () => {
            active = false;
            clearTimer();
        };
    }, [idInstance, apiTokenInstance, queryClient]);
};
