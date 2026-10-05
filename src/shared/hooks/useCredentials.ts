import type { tCredentials } from "@shared/types/tCredentials.ts";

export const useCredentials = (): tCredentials | null => {
    const raw = sessionStorage.getItem('credentials');
    if (!raw) return null;

    try {
        return JSON.parse(raw) as tCredentials;
    } catch {
        return null;
    }
};