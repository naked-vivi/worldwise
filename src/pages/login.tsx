import { useEffect, useState } from "react";
import styles from "./login.module.css";
import PageNav from "../components/page-nav";
import Button from "../components/button";
import { useAuth } from "../context/use-auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const { login, isAuthenticate } = useAuth();
    // PRE-FILL FOR DEV PURPOSES
    const [email, setEmail] = useState("jack@example.com");
    const [password, setPassword] = useState("qwerty");



    function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();

        if (email && password) login(email, password);
    }

    useEffect(() => {
        if (isAuthenticate)
            navigate("/app/cities", { replace: true })// when back it will redirect /app
    }, [navigate, isAuthenticate])

    return (
        <main className={styles.login}>
            <PageNav />
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.row}>
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>

                <div className={styles.row}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>

                <div>
                    <Button type="primary">Login</Button>
                </div>
            </form>
        </main>
    );
}