import useSWR from 'swr';
import Error from "next/error";
import Card from 'react-bootstrap/Card';
import Link from "next/link";
import Button from 'react-bootstrap/Button';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ArtWorkCard({ objectID }) {

    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`, fetcher);
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
                <Card style={{ width: '18rem' }}>
                    {data?.primaryImageSmall ? <Card.Img variant="top" src={data?.primaryImageSmall} /> : <Card.Img variant="top" src="https://via.placeholder.com/375x375.png?text=%5b+Not+Available+%5d" />}

                    <Card.Body>
                        <Card.Title>{data?.title ? data?.title : "N/A"}</Card.Title>
                        <Card.Text>
                            <strong>Date: </strong>{data?.objectDate ? data?.objectDate : "Date: N/A"}<br/>
                            <strong>Classification: </strong>{data?.classification ? data?.classification : "N/A"}<br/>
                            <strong>Medium: </strong>{data?.medium ? data?.medium : "Medium: N/A"}
                            <br/><br/>
                            <Link href={`/artwork/${objectID}`} passHref>
                                <Button variant="primary">{objectID}</Button>
                            </Link>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </>
        );
    }
}