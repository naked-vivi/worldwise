import { useNavigate, useParams } from "react-router-dom";

import buttonStyles from "./button.module.css";
import styles from "./city.module.css";

const formatDate = (date: string) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long",
    }).format(new Date(date));

function City() {
    const navigate = useNavigate();

    const x = useParams();
    console.log(x)

    // TEMP DATA
    const currentCity = {
        cityName: "Lisbon",
        emoji: "🇵🇹",
        date: "2027-10-31T15:59:59.138Z",
        notes: "My favorite city so far!",
    };

    const { cityName, emoji, date, notes } = currentCity;

    return (
        <div className={styles.city}>
            <div className={styles.row}>
                <h6>City name</h6>
                <h3>
                    <span>{emoji}</span> {cityName}
                </h3>
            </div>

            <div className={styles.row}>
                <h6>You went to {cityName} on</h6>
                <p>{formatDate(date)}</p>
            </div>

            {notes && (
                <div className={styles.row}>
                    <h6>Your notes</h6>
                    <p>{notes}</p>
                </div>
            )}

            <div className={styles.row}>
                <h6>Learn more</h6>
                <a
                    href={`https://en.wikipedia.org/wiki/${cityName}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    Check out {cityName} on Wikipedia &rarr;
                </a>
            </div>

            <div>
                <button
                    className={`${buttonStyles.btn} ${buttonStyles.back}`}
                    onClick={() => navigate(-1)}
                >
                    &larr; Back
                </button>
            </div>
        </div>
    );
}

export default City;
