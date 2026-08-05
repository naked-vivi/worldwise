import { useNavigate } from "react-router-dom";
import Button from "./button";

function BackButton() {
    const navigate = useNavigate();
    return (
        <Button onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            navigate(-1)
        }}
            type="back">
            &larr; Back
        </Button>
    )
}

export default BackButton