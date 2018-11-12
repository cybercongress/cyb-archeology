import path from 'path';

export const URLToDURA = (url, apps, IPFS_END_POINT = '') => {
    let hash;
    let path = '';
    let q = '';
    let app = 'ipfs';
    const ipfsIndex = url.indexOf('ipfs');

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
            q = hash;
        }
    }

    if (url.indexOf('localhost') > 0 && url.indexOf('ipfs') === -1) {
        const rawPort = url.split('localhost:')[1];
        const slashIndex = rawPort.indexOf('/');

        q = rawPort.substring(0, slashIndex);
        path = rawPort.substring(slashIndex, rawPort.length);
        app = 'dev';
    }

    return `${q}.${app}${path}`;
};

export const parseURL = (url) => {
    let q = '';
    let app = '';
    let path = '';

    const dotIndex = url.indexOf('.');

    if (dotIndex !== -1) {
        q = url.substr(0, dotIndex);
        app = url.substr(dotIndex + 1, url.length);
        const slashIndex = app.indexOf('/');

        if (slashIndex !== -1) {
            path = app.substr(slashIndex + 1, url.length);
            app = app.substr(0, slashIndex);
        }
    } else {
        q = url;
        app = 'cyber';
    }

    return { q, app, path };
};

export const DURAToURL = (dura, apps = {}, IPFS_END_POINT = 'http://localhost:8080') => {
    if (dura === '') {
        return {
            url: `${IPFS_END_POINT}/ipfs/QmZfSNpHVzTNi9gezLcgq64Wbj1xhwi9wk4AxYyxMZgtCG/`,
            dura: '',
        };
    }

    const { q, app, path } = parseURL(dura);

    if (apps[app]) {
        const { hash, protocol } = apps[app];

        return {
            url: `${IPFS_END_POINT}/${protocol}/${hash}/${path}${q ? `?query=${q}` : ''}`,
            dura: `${q || ''}.${app}${path ? `/${path}` : ''}`,
        };
    }

    if (app === 'ipfs' || app === 'ipns') {
        const protocol = app;
        const hash = q;

        return {
            url: `${IPFS_END_POINT}/${protocol}/${hash}/`,
            dura: `${hash}.${app}`,
        };
    }

    if (app === 'dev') {
        const port = q || '5000';

        return {
            url: `http://localhost:${port}`,
            dura: `${port}.${app}`,
        };
    }

    return {
        url: '',
        dura: 'notfound.cyb',
    };
};

export const getPreloadPath = () => {
    const isDev = window.require('electron-is-dev');
    const { remote } = window.require('electron');

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

    console.log('>>> ', remote.getGlobal('dirname'));

    if (isDev) {
        return `file://${path.join(remote.app.getAppPath(), 'src', 'preload.js')}`;
    }

    return `file://${path.join(remote.app.getAppPath(), './build/preload.js')}`;
};

// export {URLToDURA, DURAToURL, parseURL}
