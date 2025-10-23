import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';

import "../components/style.css"
export default function SingleCountry() {

    const [country, setCountry] = useState(null);
    const [celebrities, setCelebrities] = useState([]);
    const [product, setProduct] = useState([]);

    const { name } = useParams();

    const getCelebrity = (cca2) => {
        axios.get(`https://api.api-ninjas.com/v1/celebrity?nationality=${cca2}`, {
            headers: { 'X-Api-Key': 'mBJDl32Py2ZYdBXNsSDPoQ==7P5VHSEr6RMOR9eF' }
        })
            .then(response => {
                console.log(response.data)
                setCelebrities(response.data)
            })
            .catch(error => console.log(error))

    }

    const getProduct = () => {
        axios.get("https://world.openfoodfacts.net/api/v2/product/3017624010701")
            .then(response => {
                console.log(response.data)
                setProduct(response.data)
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
            .then(response => {
                console.log(response.data)
                setCountry(response.data[0])
                getCelebrity(response.data[0].cca2)
                getProduct(response.data[0])
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

                    {(product) ? (
                        <>
                            <h2>Celebrities from {country.name.common}: </h2>
                            <ul>

                                {product.map((product, i) => {
                                    return <li>{product.id}</li>
                                })}

                            </ul>
                        </>
                    ) : ""}
                    {(celebrities) ? (
                        <>
                            <h2>Celebrities from {country.name.common}: </h2>
                            <ul>

                                {celebrities.map((celeb, i) => {
                                    return <li key={i} >{celeb.name}</li>
                                })}

                            </ul>
                        </>
                    ) : ""}


                    <img src={country.coatOfArms.png} />
                </Col>
            </Row>
        </Container>

    )
}