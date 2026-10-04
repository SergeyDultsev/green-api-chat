import { useMutation } from "@tanstack/react-query";
import { getStateInstance } from "@modules/credentials/api/getStateInstance.ts";

export const useCredentials = () => {
    return useMutation({
        mutationFn: getStateInstance,
    });
};