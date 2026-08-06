import { Link } from "react-router-dom";
import type { City } from "../Type";
import styles from './city-item.module.css'
import { useCities } from "../context/use-cities";

interface CityItemProps {
    city: City
}
const formatDate = (date: string) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));


function CityItem({ city }: CityItemProps) {
    const { currentCity, deleteCity } = useCities();
    const { id } = city;

    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        deleteCity(id);
    }

    return (
        <li >
            <Link
                to={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}
                className={`${styles.cityItem} ${city.id === currentCity?.id ? styles["cityItem--active"] : ""}`}
            >
                <span className={styles.emoji}>{city.emoji}</span>
                <h3 className={styles.name}>{city.cityName}</h3>
                <time className={styles.date}>({formatDate(city.date)})</time>
                <button className={styles.deleteBtn} onClick={handleClick}>&times;</button>
            </Link>
        </li>
    )
}

export default CityItem
