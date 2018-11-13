const localStorageItemName = 'appMenu';

const initState = {
    items: [
        {
            name: 'Wallet',
            rootDura: 'wallet.cyb',
            subItems: {},
        },
        {
            name: 'Chaingear',
            rootDura: '.chaingear/#/',
            subItems: {},
        },
        {
            name: 'Settings',
            rootDura: 'settings.cyb',
            subItems: {},
        },
        {
            name: 'Root registry',
            rootDura: 'rr.cyb',
            subItems: {},
        },
        {
            name: 'Help',
            rootDura: '.help/#/',
            subItems: {},
        },
        {
            name: 'Cyber Search',
            rootDura: '.cyber',
            subItems: {},
        },
        {
            name: 'Wiki',
            rootDura: '.wiki/wiki/',
            subItems: {},
        },
        {
            name: 'Turkish Wiki',
            rootDura: '.ewiki/wiki/Anasayfa.html',
            subItems: {},
        },
        {
            name: 'test',
            rootDura: '.test',
            subItems: {},
        },
    ],
    openMenu: false,
    pendingAddToFavorites: false,
};

export const reducer = (state = initState, action) => {
    switch (action.type) {
    case 'SET_MENU_ITEMS': {
        return {
            ...state,
            items: [...action.payload],
        };
    }

    case 'SET_PENDING_ADD_TO_BOOKMARKS': {
        return {
            ...state,
            pendingAddToFavorites: action.payload,
            openMenu: action.payload,
        };
    }

    case 'TOGGLE_MENU': {
        return {
            ...state,
            openMenu: !state.openMenu,
        };
    }

    default:
        return state;
    }
};

export const init = () => (dispatch, getState) => {
    let menuItems;
    const menuItemsJson = localStorage.getItem(localStorageItemName);

    if (menuItemsJson == null) {
        menuItems = initState.items;
    } else {
        menuItems = JSON.parse(menuItemsJson);
    }

    dispatch({
        type: 'SET_MENU_ITEMS',
        payload: menuItems,
    });
    dispatch(saveMenuItemsInLs());
};

export const showInput = () => (dispatch, getState) => {
    dispatch({
        type: 'SET_PENDING_ADD_TO_BOOKMARKS',
        payload: true,
    });
};

export const hideInput = () => (dispatch, getState) => {
    dispatch({
        type: 'SET_PENDING_ADD_TO_BOOKMARKS',
        payload: false,
    });
};
const saveMenuItemsInLs = () => (dispatch, getState) => {
    const registryItems = getState().appMenu.items;

    localStorage.setItem(localStorageItemName, JSON.stringify(registryItems));
};

export const toggleMenu = () => ({ type: 'TOGGLE_MENU' });

export const deleteMenuItem = rootDura => (dispatch, getState) => {
    let menuItems = getState().appMenu.items;

    menuItems = menuItems.filter((item) => {
        console.log(item.rootDura !== rootDura);
        return item.rootDura !== rootDura;
    });

    dispatch({
        type: 'SET_MENU_ITEMS',
        payload: menuItems,
    });
    dispatch(saveMenuItemsInLs());
};

export const getMenuItems = state => state.appMenu.items;

export const addMenuItem = (name, dura) => (dispatch, getState) => {
    const menuItems = getState().appMenu.items;

    menuItems.push({
        name,
        rootDura: dura,
        subItems: {},
    });

    dispatch({
        type: 'SET_MENU_ITEMS',
        payload: menuItems,
    });
    dispatch(saveMenuItemsInLs());
};
