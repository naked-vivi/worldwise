import CountryItem from './country-item'
import styles from './country-list.module.css'
import Spinner from './spinner'
import Message from './message';
import { useCities } from '../context/use-cities';

type Country = {
    country: string;
    emoji: string;
};

function CountryList() {
    const { cities, isLoading } = useCities();
    
    if (isLoading) return <Spinner />

    if (!cities.length) return <Message message="Add your first city by clicking on the city on the map" />

    // const countries = cities.reduce<Country[]>((arr, city) => {
    //     if (!arr.map(el => el.country).includes(city.country))
    //         return [...arr, { country: city.country, emoji: city.emoji }];
    //     else return arr
    // }, [])

    const countries = cities.reduce<Country[]>((arr, city) => {
        const exists = arr.some(el => el.country === city.country);
        return exists
            ? arr
            : [...arr, { country: city.country, emoji: city.emoji }];
    }, []);

    return (
        <ul className={styles.countryList}>
            {countries.map((country) =>
                <CountryItem country={country} key={country.country} />)}
        </ul>
    )
}

export default CountryList
