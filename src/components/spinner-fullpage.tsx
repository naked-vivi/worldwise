import Spinner from "./spinner";
import styles from "./spinner-fullpage.module.css";

function SpinnerFullPage() {
    return (
        <div className={styles.spinnerFullpage}>
            <Spinner />
        </div>
    );
}

export default SpinnerFullPage;