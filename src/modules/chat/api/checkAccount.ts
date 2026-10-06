import type { tCredentials } from "@shared/types/tCredentials.ts";
import { GREEN_API_URL } from "@shared/config.ts";

export type CheckAccountResponse = {
    exist: boolean;
    chatId: string;
    fromCache: boolean;
};

export const checkAccount = async (
    { idInstance, apiTokenInstance }: tCredentials,
    phoneNumber: number,
): Promise<CheckAccountResponse> => {
    const url =
        `${GREEN_API_URL}` +
        `/waInstance${idInstance}` +
        `/checkAccount/${apiTokenInstance}`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }),
        mode: "cors",
    });

    if (!response.ok) {
        throw new Error(`Ошибка API: ${response.status}`);
    }

    return response.json();
};
