import type { tCredentials } from "@shared/types/tCredentials.ts";
import type { tChat } from "@shared/types/tChat.ts";
import { GREEN_API_URL } from "@shared/config.ts";

export const getChats = async ({
  idInstance,
  apiTokenInstance,
}: tCredentials): Promise<tChat[]> => {
    const url =
        `${GREEN_API_URL}` +
        `/waInstance${idInstance}` +
        `/getChats/${apiTokenInstance}`;

    const response = await fetch(url, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error(`Ошибка API: ${response.status}`);
    }

    return response.json();
};