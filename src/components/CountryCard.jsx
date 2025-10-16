import { Link } from 'react-router';

export default function CountryCard({flagImg, name, capital}) {
    return(
        <>
        <img alt={name} src={flagImg}/>
       <p> <b>Name: </b> <Link to={`/country/${name}`}>{name} </Link> </p>
       <p> <b>Capital: </b> {capital.join(',')}</p>       
        </>
    )
}