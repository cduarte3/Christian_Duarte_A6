import ArtworkCardDetail from '@/components/ArtworkCardDetail';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useRouter } from 'next/router';

export default function ID() {
    const router = useRouter();
    const { objectID } = router.query;

    return (<>
        <Row>
            <Col>
                <ArtworkCardDetail objectID={objectID} />
            </Col>
        </Row>
    </>);
}