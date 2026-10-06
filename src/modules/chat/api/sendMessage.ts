import type { tCredentials } from "@shared/types/tCredentials.ts";
import { GREEN_API_URL } from "@shared/config.ts";

export const sendMessage = async (
    { idInstance, apiTokenInstance }: tCredentials,
    chatId: string,
    message: string,
) => {
    const url =
        `${GREEN_API_URL}` +
        `/waInstance${idInstance}` +
        `/sendMessage/${apiTokenInstance}`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ chatId, message }),
        mode: "cors",
    });

    if (!response.ok) {
        throw new Error(`Ошибка API: ${response.status}`);
    }

    return response.json();
};
