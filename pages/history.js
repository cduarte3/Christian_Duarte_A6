import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { useRouter } from 'next/router';
import Card from 'react-bootstrap/Card';


export default function History() {

    const [searchHistory] = useAtom(searchHistoryAtom);
    const router = useRouter();

    let parsedHistory = [];
    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });

    function historyClicked(e, index) {
        router.push(`/artwork?${searchHistory}[${index}]`);
    }

    function removeHistoryClicked(e, index) {
        e.stopPropagation(); // stop the event from trigging other events
        setSearchHistory(current => {
            let x = [...current];
            x.splice(index, 1)
            return x;
        });
    }

    if (parsedHistory != null || parsedHistory != undefined) {
        return (
            <>
                <ListGroup>
                    <ListGroup.Item>{Object.keys(historyItem).map(key => (<>{key}: <strong>{historyItem[key]}</strong>&nbsp;</>))}</ListGroup.Item>
                </ListGroup>
            </>
        );
    }
    else{
        return(
            <>
                <Card>
                    <h2>Nothing here. Try searching for some Artwork.</h2>
                </Card>
            </>
        );
    }

}