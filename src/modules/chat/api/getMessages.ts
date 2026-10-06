import type { tCredentials } from "@shared/types/tCredentials.ts";
import type { tMessage } from "@shared/types/tMessage.ts";
import { GREEN_API_URL } from "@shared/config.ts";

export const getMessages = async (
    { idInstance, apiTokenInstance }: tCredentials,
    chatId: string,
): Promise<tMessage[]> => {
    const url =
        `${GREEN_API_URL}` +
        `/waInstance${idInstance}` +
        `/getChatHistory/${apiTokenInstance}`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ chatId }),
        mode: "cors",
    });

    if (!response.ok) {
        throw new Error(`Ошибка API: ${response.status}`);
    }

    return response.json();
};
