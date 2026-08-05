// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState } from "react";
import Button from "./button";
import styles from "./form.module.css";
import BackButton from "./back-button";

function Form() {
    const [cityName, setCityName] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [notes, setNotes] = useState("");

    return (
        <form className={styles.form}>
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input
                    id="cityName"
                    onChange={(e) => setCityName(e.target.value)}
                    value={cityName}
                />
                {/* <span className={styles.flag}>{emoji}</span> */}
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>
                <input
                    id="date"
                    type="date"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                />
            </div>

            <div className={styles.row}>
                <label htmlFor="notes">Notes about your trip to {cityName}</label>
                <textarea
                    id="notes"
                    onChange={(e) => setNotes(e.target.value)}
                    value={notes}
                />
            </div>

            <div className={styles.buttons}>
                <Button onClick={() => { }} type="primary">Add</Button>
                <BackButton />
            </div>
        </form >
    );
}

export default Form;
