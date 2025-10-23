import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import CountryCard from '../components/countryCard';
import { Container } from 'react-bootstrap';

export default function Home({ query }) {
    const [countriesList, setCountriesList] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    //running the function
    useEffect(() => {
        // if query is blank .get,.then,.catch will run otherwise else function will run
        {
            axios.get("https://restcountries.com/v3.1/all?fields=flags,flag,name,capital,cca3")
                .then(response => {
                    console.log(response.data)
                    //stores countries data
                    setCountriesList(response.data)
                    setFilteredCountries(response.data);
                })
                .catch(error => console.log(error))
        }
    }, []);

    useEffect(() => {
        if (query.length >= 3) {
            const newList = countriesList.filter((country) => {
                return country.name.common.toLowerCase().includes(query.toLowerCase());
            })
            setFilteredCountries(newList);
        }
    }, [query]);
    //countryList get country and for each country create a country card
    let countryCard = filteredCountries.map((country) => {
        return (
            <CountryCard
                key={country.cca3}
                flagImg={country.flags.png}
                name={country.name.common}
                capital={country.capital} />
        )
    })



    return (
        <div>
            <Container>
                <h1>Home</h1>
                {countryCard}
            </Container>
        </div>
    );


};