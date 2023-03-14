import {useAtom} from 'jotai';
import { favouritesAtom } from '@/store';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ArtworkCard from '@/components/ArtworkCard';

export default function Favourites(){

    const [favouritesList] = useAtom(favouritesAtom);
    if (favouritesList != null || favouritesList != undefined) {
        return (<>
            <Row className="gy-4">
                {favouritesList.length > 0 ? favouritesList.map((currentObjectID) => (
                    <Col lg={3} key={currentObjectID}><ArtworkCard objectID={currentObjectID} /></Col>
                )) : <Card className='text-center'><br /><h4>Nothing Here</h4><p>Try searching for something else</p><br /></Card>}
            </Row>
        </>)
    }
    else {
        return (
            <>
            <Card>
                <h2>Nothing here. Try adding some new Artwork to the list.</h2>
            </Card>
            </>
        );
    }
}