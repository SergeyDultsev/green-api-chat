import type { Credentials } from "@modules/credentials/model/types.ts";

export const getStateInstance = async ({
  idInstance,
  apiTokenInstance,
}: Credentials) => {
    const url =
        `${import.meta.env.VITE_GREEN_API_URL}` +
        `/waInstance${idInstance}` +
        `/getStateInstance/${apiTokenInstance}`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors",
    });

    if (!response.ok) {
        throw new Error('Не удалось проверить инстанс');
    }

    return response.json();
};