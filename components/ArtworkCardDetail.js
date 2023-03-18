import useSWR from 'swr';
import Error from "next/error";
import Card from 'react-bootstrap/Card';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

//const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ArtWorkCardDetail({ objectID }) {

    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [showAdded, setShowAdded] = useState(false);

    useEffect(() => {
        setShowAdded(favouritesList.includes(objectID));
    }, [favouritesList, objectID]);

    const favouritesClicked = () => {
        if(showAdded === true){
            setFavouritesList(current => current.filter(fav => fav != objectID));
            setShowAdded(false);
        }
        else{
            setFavouritesList(current => [...current, objectID]);
            setShowAdded(true);
        }
    };
    const { data, error } = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null);
    if (!error && data && data.length === 0) {
        return null;
    }
    if (error) {
        return (
            <>
                <Error statusCode={404} />
            </>
        );
    }
    else {
        return (
            <>
            <br/>
                <Card>
                    {data?.primaryImage && <Card.Img variant="top" src={data?.primaryImage} />}
                    <Card.Body>
                        <Card.Title>{data?.title ? data?.title : "N/A"}</Card.Title>
                        <Card.Text>
                            <strong>Date: </strong>{data?.objectDate ? data?.objectDate : "Date: N/A"}<br/>
                            <strong>Classification: </strong>{data?.classification ? data?.classification : "N/A"}<br/>
                            <strong>Medium: </strong>{data?.medium ? data?.medium : "Medium: N/A"}
                            <br />
                            <br />
                            {data?.artistDisplayName ? (
                                <div>
                                    <strong>Artist: </strong>{data?.artistDisplayName} <a href={data?.artistWikidata_URL} target="_blank" rel="noreferrer" >Wiki</a>
                                </div>
                            ) : <div><strong>Wiki: </strong>N/A</div>}
                            <strong>Credit Line: </strong>{data?.creditLine ? data?.creditLine : "Credit Line: N/A"}<br/>
                            <strong>Dimensions: </strong>{data?.dimensions ? data?.dimensions : "Dimensions: N/A"}<br/><br/>
                            <Button variant={showAdded === true ? "primary" : "outline-primary"} onClick={favouritesClicked}>{showAdded === true ? "+ Favourite (added)" : "+ Favourite"}</Button>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </>
        );
    }
}