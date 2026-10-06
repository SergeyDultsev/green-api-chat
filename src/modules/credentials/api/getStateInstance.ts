import type { tCredentials } from "@shared/types/tCredentials.ts";
import { GREEN_API_URL } from "@shared/config.ts";

export type StateInstanceResponse = {
    stateInstance: string;
};

export const getStateInstance = async ({
  idInstance,
  apiTokenInstance,
}: tCredentials): Promise<StateInstanceResponse> => {
    const url =
        `${GREEN_API_URL}` +
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