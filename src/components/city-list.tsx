import CityItem from './city-item'
import styles from './city-list.module.css'
import Spinner from './spinner'
import Message from './message';
import { useCities } from '../context/use-cities';

function CityList() {
    const { cities, isLoading } = useCities();
    if (isLoading) return <Spinner />

    if (!cities.length) return <Message message="Add your first city by clicking on the city on the map" />

    return (
        <ul className={styles.cityList}>
            {cities.map((city) =>
                <CityItem city={city} key={city.id} />)}
        </ul>
    )
}

export default CityList
