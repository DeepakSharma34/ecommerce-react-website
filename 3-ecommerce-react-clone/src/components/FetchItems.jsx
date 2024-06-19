import { useSelector, useDispatch } from "react-redux"
import {itemsActions} from '../store/itemsSlice'
import { useEffect } from "react";
import { fetchStatusActions } from "../store/fetchStatusSlice";
const FetchItems = () => {
    const fetchStatus = useSelector((store) => store.fetchStatus);
    const dispatch = useDispatch();
    useEffect(() => {
        if (fetchStatus.fetchDone) return;
        const controller = new AbortController();

        dispatch(fetchStatusActions.markFetchingStarted());
        const signal = controller.signal;
        fetch("http://localhost:8080/items", { signal })
            .then((res) => res.json())
            .then(({ items }) => {
      dispatch(fetchStatusActions.markFetchDone())
      dispatch(fetchStatusActions.markFetchingFinished());
      dispatch(itemsActions.addInitialItems(items));
            });

        return () => {
            controller.abort();
        };
    }, [fetchStatus]);

    return <></>
}

export default FetchItems;