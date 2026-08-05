import styles from "./button.module.css";

interface ButtonProps {
    children: React.ReactNode;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    type: "primary" | "back" | "position";
}

function Button({ children, onClick, type }: ButtonProps) {
    return (
        <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
            {children}
        </button>
    )
}

export default Button