import { useMutation } from "@tanstack/react-query";
import { getStateInstance } from "@modules/credentials/api/getStateInstance.ts";

export const useCheckCredentials = () => {
    return useMutation({
        mutationFn: getStateInstance,
    });
};