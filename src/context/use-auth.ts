import { useContext } from "react"
import { AuthContext } from "./auth-context"

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth is using out of AuthProvider")
    }
    return context
}
