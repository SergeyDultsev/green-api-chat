import type { tCredentials } from "@shared/types/tCredentials.ts";

export const getChats = async ({
  idInstance,
  apiTokenInstance,
}: tCredentials) => {
    const url =
        `${import.meta.env.VITE_GREEN_API_URL}` +
        `/waInstance${idInstance}` +
        `/getChats/${apiTokenInstance}`;

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

    return response.json();
};