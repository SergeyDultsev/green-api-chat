import type { tCredentials } from "@shared/types/tCredentials.ts";
import { GREEN_API_URL } from "@shared/config.ts";

export const deleteNotification = async (
    { idInstance, apiTokenInstance }: tCredentials,
    receiptId: number,
) => {
    const url =
        `${GREEN_API_URL}` +
        `/waInstance${idInstance}` +
        `/deleteNotification/${apiTokenInstance}/${receiptId}`;

    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors",
    });

    if (!response.ok) {
        throw new Error(`Ошибка API: ${response.status}`);
    }

    return response.json();
};
