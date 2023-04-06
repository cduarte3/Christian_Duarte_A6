import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { useRouter } from 'next/router';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from '@/styles/History.module.css';
import Button from 'react-bootstrap/Button';
import { removeFromHistory } from '@/lib/userData';

export default function History() {

    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const router = useRouter();
    if(!searchHistory) return null;

    let parsedHistory = [];
    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });

    function historyClicked(e, index) {
        router.push(`/artwork?${searchHistory[index]}`);
    }

    async function removeHistoryClicked(e, index) {
        e.stopPropagation(); // stop the event from trigging other events
        setSearchHistory(await removeFromHistory(searchHistory[index])) 
    }

    if (parsedHistory != null || parsedHistory != undefined) {
        return (
            <>
            <br/>
                <ListGroup>
                    {parsedHistory.length > 0 ? parsedHistory.map((item, index) => (
                        <ListGroup.Item key={index} className={styles.historyListItem} onClick={e => historyClicked(e, index)}>
                            {Object.keys(item).map((key) => (
                                <span key={key}>
                                    {key}: <strong>{item[key]}</strong>&nbsp;
                                </span>
                            ))}
                            <Button className="float-end" variant="danger" size="sm"
                                onClick={e => removeHistoryClicked(e, index)}>&times;</Button>

                        </ListGroup.Item>
                    )) : <Card className='text-center'><br /><h4>Nothing Here</h4><p>Try searching for some Artwork</p><br /></Card>}
                </ListGroup>
            </>
        );
    }
}