import { useReducer, type ReactNode } from "react"
import type { AuthState, AuthAction } from "../Type";
import { AuthContext } from "./auth-context";


const initialState = {
    user: null,
    isAuthenticate: false,
}

function reducer(state: AuthState, action: AuthAction) {
    switch (action.type) {
        case "login":
            return {
                ...state, user: action.payload, isAuthenticate: true,
            }
        case "logout":
            return {
                ...state, ...initialState
            }
        default:
            throw new Error("Unexpected error type")
    }
}

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [{ user, isAuthenticate }, dispatch] = useReducer(reducer, initialState);

    const FAKE_USER = {
        name: "Jack",
        email: "jack@example.com",
        password: "qwerty",
        avatar: "https://i.pravatar.cc/100?u=zz",
    };

    function login(email: string, password: string) {
        if (email === FAKE_USER.email && password === FAKE_USER.password)
            dispatch({ type: "login", payload: FAKE_USER })
    }

    function logout() {
        dispatch({ type: "logout" })
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticate, login, logout }} >
            {children}
        </AuthContext.Provider>
    )
}

