import path from 'path';

let query;

export const getQuery = () => query;

export const setQuery = (newQuery) => {
    query = newQuery;
};

export const URLToDURA = (url, apps, newQuery = '') => {
    let hash;
    let path = '';
    query = newQuery;
    let app = 'ipfs';
    let ipfsIndex = url.indexOf('ipfs');

    if (ipfsIndex === -1) {
        const ipnsIndex = url.indexOf('ipns');

        if (ipnsIndex !== -1) {
            app = 'ipns';
            ipfsIndex = ipnsIndex;
        }
    }

    if (ipfsIndex !== -1) {
        hash = url.substr(ipfsIndex + 5, 46);
        path = url.substr(ipfsIndex + 46 + 5, url.length);
        // console.log(' hash ', hash);
        let find = false;

        Object.keys(apps).forEach((key) => {
            if (apps[key].hash === hash) {
                app = key;
                find = true;
            }
        });

        if (!find) {
            query = hash;
        }
    }

    if (url.indexOf('localhost') > 0 && url.indexOf('ipfs') === -1) {
        const rawPort = url.split('localhost:')[1];
        const slashIndex = rawPort.indexOf('/');
        const port = rawPort.substring(0, slashIndex);

        path = rawPort.substring(slashIndex, rawPort.length);

        return `${query}.dev:${port}${path}`;
    }

    return `${query}.${app}${path}`;
};

export const parseURL = (url) => {
    let query = '';
    let app = '';
    let path = '';
    let port = '5000';

    const dotIndex = url.indexOf('.');

    if (dotIndex !== -1) {
        query = url.substr(0, dotIndex);
        app = url.substr(dotIndex + 1, url.length);

        const slashIndex = app.indexOf('/');

        if (slashIndex !== -1) {
            path = app.substr(slashIndex + 1, url.length);
            app = app.substr(0, slashIndex);
        }

        const colonIndex = app.indexOf(':');
        if (colonIndex !== -1) {
            port = app.substr(colonIndex + 1, slashIndex !== -1 ? slashIndex : app.length);
            app = app.substr(0, colonIndex);
        }
    } else {
        query = url;
        app = 'cyber';
    }

    return { query, app, path, port };
};

export const DURAToURL = (dura, apps = {}, IPFS_END_POINT = 'http://localhost:8080') => {
    if (dura === '') {
        return {
            url: `${IPFS_END_POINT}/ipfs/QmZfSNpHVzTNi9gezLcgq64Wbj1xhwi9wk4AxYyxMZgtCG/`,
            dura: '',
        };
    }

    const { query, app, path, port } = parseURL(dura);

    if (apps[app]) {
        const { hash, protocol } = apps[app];

        return {
            url: `${IPFS_END_POINT}/${protocol}/${hash}/${path}`,
            dura: `${query || ''}.${app}${path ? `/${path}` : ''}`,
            query,
        };
    }

    if (app === 'ipfs' || app === 'ipns') {
        const protocol = app;
        const hash = query;

        return {
            url: `${IPFS_END_POINT}/${protocol}/${hash}/`,
            dura: `${hash}.${app}`,
        };
    }

    if (app === 'dev') {
        return {
            url: `http://localhost:${port}${path ? `/${path}` : ''}`,
            dura: `${query}.${app}:${port}${path ? `/${path}` : ''}`,
            query,
        };
    }

    return {
        url: '',
        dura: 'notfound.cyb',
        query,
    };
};

export const isDevMode = () => {
    const { remote } = window.require('electron');

    return remote.process.argv[2] === '--dev';
};

export const getPreloadPath = () => {
    // // Condition necessary for store.spec.js
    // const basePath = remote.app.getPath('userData');

    // // Replace all backslashes by front-slashes (happens in Windows)
    // // Note: `dirName` contains backslashes in Windows. One would assume that
    // // path.join in Windows would handle everything for us, but after some time
    // // I realized that even in Windows path.join here bahaves like POSIX (maybe
    // // it's electron, maybe browser env?). Switching to '/'. -Amaury 12.03.2018
    // const posixDirName = basePath.replace(/\\/g, '/');
    // const buildPath = path.join(
    //   posixDirName,
    //   '..',
    //   '.build');

    // return buildPath;

    const { remote } = window.require('electron');

    if (isDevMode()) {
        return `file://${path.join(remote.app.getAppPath(), 'src', 'preload.js')}`;
    }

    return `file://${path.join(remote.app.getAppPath(), './build/preload.js')}`;
};

// export {URLToDURA, DURAToURL, parseURL}
