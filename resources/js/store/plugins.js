import {STORAGE_KEY} from "./mutations";

const localStoragePlugin = (store) => {

    store.subscribe((state, {todos}) => {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    })
};

export default process.env.MIX_ENV !== 'production'
    ? [localStoragePlugin]
    : [localStoragePlugin];
