import type { tCredentials } from "@shared/types/tCredentials.ts";

export type StateInstanceResponse = {
    stateInstance: string;
};

export const getStateInstance = async ({
  idInstance,
  apiTokenInstance,
}: tCredentials): Promise<StateInstanceResponse> => {
    const url =
        `${import.meta.env.VITE_GREEN_API_URL}` +
        `/waInstance${idInstance}` +
        `/getStateInstance/${apiTokenInstance}`;

    const response = await fetch(url, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error(`Ошибка API: ${response.status}`);
    }

    return response.json();
};