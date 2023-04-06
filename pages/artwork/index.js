import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Error from 'react-bootstrap/Error';
import useSWR from 'swr';
import Card from 'react-bootstrap/Card';
import Pagination from 'react-bootstrap/Pagination';
import ArtworkCard from '@/components/ArtworkCard';
import validObjectIDList from '@/public/data/validObjectIDList.json'
const PER_PAGE = 12;

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Artwork() {

    const [page, setPage] = useState(1);
    const [artworkList, setArtList] = useState([]);

    const router = useRouter();
    let finalQuery = router.asPath.split('?')[1];
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`, fetcher);


    function previousPage() {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    function nextPage() {
        if (page < artworkList.length) {
            setPage(page + 1);
        }
    }

    useEffect(() => {
        let results = [];
        if (data != null || data != undefined) {

            let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x));

            results = [];
            for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
                const chunk = filteredResults.slice(i, i + PER_PAGE);
                results.push(chunk);
            }
            setArtList(results);
            setPage(1);
        }
    }, [data]);

    if (error) {
        return (
            <>
                <Error statusCode={404} />
            </>
        );
    }

    if (artworkList != null || artworkList != undefined) {
        return (<>
            <Row className="gy-4">
                {artworkList.length > 0 ? artworkList[page - 1].map((currentObjectID) => (
                    <Col lg={3} key={currentObjectID}><ArtworkCard objectID={currentObjectID} /></Col>
                )) : <Card className='text-center'><br /><h4>Nothing Here</h4><p>Try searching for something else</p><br /></Card>}
            </Row>
            {artworkList.length > 0 && (
                <Row>
                    <Col>
                        <br />
                        <Pagination>
                            <Pagination.Prev onClick={previousPage}></Pagination.Prev>
                            <Pagination.Item>{page}</Pagination.Item>
                            <Pagination.Next onClick={nextPage}></Pagination.Next>
                        </Pagination>
                    </Col>
                </Row>
            )}
        </>)
    }
    else {
        return (
            <>

            </>
        );
    }
}