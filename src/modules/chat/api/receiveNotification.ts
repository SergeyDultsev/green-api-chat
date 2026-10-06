import type { tCredentials } from "@shared/types/tCredentials.ts";
import type { tNotification } from "@shared/types/tNotification.ts";

export type tReceiveNotificationResponse = {
    receiptId: number;
    body: tNotification;
};

export const receiveNotification = async (
    { idInstance, apiTokenInstance }: tCredentials,
    receiveTimeout = 5,
): Promise<tReceiveNotificationResponse | null> => {
    const url =
        `${import.meta.env.VITE_GREEN_API_URL}` +
        `/waInstance${idInstance}` +
        `/receiveNotification/${apiTokenInstance}` +
        `?receiveTimeout=${receiveTimeout}`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors",
    });

    if (!response.ok) {
        throw new Error(`Ошибка API: ${response.status}`);
    }

    const text = await response.text();

    if (!text || text === "null") return null;

    return JSON.parse(text) as tReceiveNotificationResponse;
};
