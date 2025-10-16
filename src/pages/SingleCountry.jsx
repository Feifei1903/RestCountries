import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';

export default function SingleCountry() {

    const [country, setCountry] = useState(null);
    const { name } = useParams();

    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
            .then(response => {
                console.log(response.data)
                setCountry(response.data[0])
            })
            .catch(error => console.log(error))
    }, [])

    if (country === null) {
        return (
            <p>Loading...</p>
        )
    }

    console.log(country.currencies);

    let currencies = Object.keys(country.currencies).map((currency, i) => {
        return (
                <p key={i}>
                    
                    <b> Code:</b>{currency}
                    <b> Name:</b> {country.currencies[currency].name}
                    <b> Symbol:</b> {country.currencies[currency].symbol}
                </p>
        
        )
    })

    return (

        <Container>
            <Row>
                <Col>
                    <img src={country.flags.png} />
                    <p><b>Name: </b>{country.name.common}</p>
                    <p><b>Official Name: </b>{country.name.official}</p>
                    {currencies}

                    <img src={country.coatOfArms.png} />
                </Col>
            </Row>
        </Container>

    )
}