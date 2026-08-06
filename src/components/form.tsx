// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
// `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
import { useEffect, useState } from "react";
import Button from "./button";
import styles from "./form.module.css";
import BackButton from "./back-button";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./message";
import Spinner from "./spinner";
import { useCities } from "../context/use-cities";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode?: string) {
    if (!countryCode || countryCode.length !== 2) return "";
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
}

function Form() {
    const BASE_URL = "https://nominatim.openstreetmap.org/reverse"
    const { createCity, isLoading } = useCities();
    const navigate = useNavigate();
    const [lat, lng] = useUrlPosition();

    const [cityName, setCityName] = useState("");
    const [country, setCountry] = useState("")
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [notes, setNotes] = useState("");
    const [geocodingError, setGeocodingError] = useState("");
    const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
    const [emoji, setEmoji] = useState("")

    useEffect(() => {
        if (!lat || !lng) return; //it will show blank form

        async function fetchCityName() {
            try {
                setIsLoadingGeocoding(true)
                setGeocodingError("")
                const res = await fetch(`${BASE_URL}?format=json&lat=${lat}&lon=${lng}`)
                const data = await res.json()
                // setCityName(data.cityName || data.locality || "")
                // setCountry(data.country)
                // setEmoji(convertToEmoji(data.countryCode))
                if (!data.address) {
                    throw new Error("That doesn't seem to be a city. Click somewhere else!");
                }

                setCityName(data.address.city || data.address.town || data.address.village || "");
                setCountry(data.address.country || "");
                setEmoji(convertToEmoji(data.address.country_code));
            }
            catch (err) {
                if (err instanceof Error) {
                    setGeocodingError(err.message);
                }
            }
            finally {
                setIsLoadingGeocoding(false)
            }
        }
        fetchCityName()
    }, [lat, lng])

    async function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();

        if (!cityName || !date) return;

        const newCity = {
            cityName,
            emoji,
            country,
            date,
            notes,
            position: { lat, lng }
        }
        await createCity(newCity)
        navigate("/app/cities")
    }

    if (isLoadingGeocoding) return <Spinner />
    if (!lat && !lng) return <Message message="Click somewhere else on the map to begin" />
    if (geocodingError) return <Message message={geocodingError} />

    return (
        <form className={`${styles.form} ${isLoading ? styles.loading : ""}`} onSubmit={handleSubmit}>
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input
                    id="cityName"
                    onChange={(e) => setCityName(e.target.value)}
                    value={cityName}
                />
                <span className={styles.flag}>{emoji}</span>
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
