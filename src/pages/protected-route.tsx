import { useEffect, type ReactNode } from "react";
import { useAuth } from "../context/use-auth";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: ReactNode }) {
    const { isAuthenticate } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticate)
            navigate("/")
    }, [isAuthenticate, navigate])

    return isAuthenticate ? children : null;
}

export default ProtectedRoute