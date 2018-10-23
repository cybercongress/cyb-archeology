const localStorageItemName = 'rootRegistry';

const initState = {
    items: {
        'help': {
            hash: 'QmT26rKxQdkD6XruyN8J3LDkRxWy6ZAjeYabfQUe9GssGf',
            protocol: 'ipfs'
        },
        'cyber': {
            hash: 'QmQx6Kvezww3ZLjDuwKQ68aBjNWsYEHeMPi1Ho6uPQB6xT',
            protocol: 'ipfs'
        },
        'wiki': {
            hash: 'QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco',
            protocol: 'ipfs'
        },
        'ewiki': {
            hash: 'QmT5NvUtoM5nWFfrQdVrFtvGfKFmG7AHE8P34isapyhCxX',
            protocol: 'ipfs'
        },
        'test': {
            hash: 'Qma2CP6cRe8K6QExZ2MwGW5XYC76r9CZYxbbWEtnMzcZ6g',
            protocol: 'ipfs'
        },
        'chaingear': {
            hash: 'QmfBnoeaTX4YVFFWWrDsafSwEyXSoUtvypr77yBcsKqQYZ',
            protocol: 'ipfs'
        }
    },
}

export const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_ROOT_REGISTRY_ITEMS': {
            return {
                ...state,
                items: {...action.payload},
            }
        }

        default:
            return state;
    }
}

export const init = () => (dispatch, getState) => new Promise(resolve => {
    let registryItems = JSON.parse(localStorage.getItem(localStorageItemName) || '{}');

    if (Object.keys(registryItems).length === 0) {
        registryItems = initState.items;
    }

    dispatch({
        type: 'SET_ROOT_REGISTRY_ITEMS',
        payload: registryItems
    });
    dispatch(saveRootRegistryItemsInLs());

    resolve(registryItems);
})

export const deleteRegistryItem = (itemName) => (dispatch, getState) => {
    let registryItems = getState().rootRegistry.items;
    delete registryItems[itemName];

    dispatch({
        type: 'SET_ROOT_REGISTRY_ITEMS',
        payload: registryItems
    });
    dispatch(saveRootRegistryItemsInLs());
}

export const getRegistryItemsAsArray = (state) => {
    const registryItems = state.rootRegistry.items;
    const registryItemsArray = Object.keys(registryItems).map(key => ({
        name: key,
        hash: registryItems[key].hash,
        protocol: registryItems[key].protocol,
    }));

    return registryItemsArray;
}

export const getRegistryItems = (state) => {
    return state.rootRegistry.items
}

export const addRegistryItem = (name, hash, protocol) => (dispatch, getState) => new Promise(resolve => {
    let registryItems = getState().rootRegistry.items;

    registryItems[name] = {
        hash,
        protocol
    };

    dispatch({
        type: 'SET_ROOT_REGISTRY_ITEMS',
        payload: registryItems
    });
    dispatch(saveRootRegistryItemsInLs());

    resolve(registryItems);
})

const saveRootRegistryItemsInLs = () => (dispatch, getState) => {
    const registryItems = getState().rootRegistry.items;
    localStorage.setItem(localStorageItemName, JSON.stringify(registryItems));
}
