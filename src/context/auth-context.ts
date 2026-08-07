import { createContext } from "react";
import type { User } from "../Type";

export type AuthContextValue = {
    user: User | null;
    isAuthenticate: boolean;
    login: (email: string, password: string) => void; // Must match how you call it!
    logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);