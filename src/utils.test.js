import * as utils from './utils';

const apps = {
    help: {
        hash: 'QmT26rKxQdkD6XruyN8J3LDkRxWy6ZAjeYabfQUe9GssGf',
        protocol: 'ipfs',
    },
    cyber: {
        hash: 'QmXZ5GeuFGYJswXT93hmjG5Z6fGJM2ifgXsXBxyomi63GN',
        protocol: 'ipfs',
    },
    wiki: {
        hash: 'QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco',
        protocol: 'ipfs',
    },
    chaingear: {
        hash: 'QmfBnoeaTX4YVFFWWrDsafSwEyXSoUtvypr97yBcsKqQYZ',
        protocol: 'ipfs',
    },
    ch: {
        hash: 'QmbLwHKfuk6DfiCpG5tvcwNAcwtMPjuC5pbSwshGrSPpCs',
        protocol: 'ipns',
    },
};

it('parseURL .dev:5600', () => {
    const { query, app, path, port } = utils.parseURL('.dev:5600');

    expect(query).toEqual('');
    expect(app).toEqual('dev');
    expect(path).toEqual('');
    expect(port).toEqual('5600');
});


it('parseURL 12.dev:5600', () => {
    const { query, app, path, port } = utils.parseURL('12.dev:5600');

    expect(query).toEqual('12');
    expect(app).toEqual('dev');
    expect(path).toEqual('');
    expect(port).toEqual('5600');
});


it('parseURL 12.dev:5600/#/page1', () => {
    const { query, app, path, port } = utils.parseURL('12.dev:5600/#/page1');

    expect(query).toEqual('12');
    expect(app).toEqual('dev');
    expect(path).toEqual('#/page1');
    expect(port).toEqual('5600');
});

it('default dev port is 5000', () => {
    const { query, app, path, port } = utils.parseURL('.dev');

    expect(query).toEqual('');
    expect(app).toEqual('dev');
    expect(path).toEqual('');
    expect(port).toEqual('5000');
});

it('parseURL .help', () => {
    const { query, app, path } = utils.parseURL('.help');

    expect(query).toEqual('');
    expect(app).toEqual('help');
    expect(path).toEqual('');
});


it('parseURL .wiki', () => {
    const { query, app, path } = utils.parseURL('.wiki');

    expect(query).toEqual('');
    expect(app).toEqual('wiki');
    expect(path).toEqual('');
});


it('parseURL 1.help', () => {
    const { query, app, path } = utils.parseURL('1.help');

    expect(query).toEqual('1');
    expect(app).toEqual('help');
    expect(path).toEqual('');
});


it('parseURL 43', () => {
    const { query, app, path } = utils.parseURL('43');

    expect(query).toEqual('43');
    expect(app).toEqual('cyber');
    expect(path).toEqual('');
});


it('parseURL .wiki/test', () => {
    const { query, app, path } = utils.parseURL('.wiki/test');

    expect(query).toEqual('');
    expect(app).toEqual('wiki');
    expect(path).toEqual('test');
});


it('parseURL .wiki/page.html', () => {
    const { query, app, path } = utils.parseURL('.wiki/page.html');

    expect(query).toEqual('');
    expect(app).toEqual('wiki');
    expect(path).toEqual('page.html');
});

it('parseURL .wiki/wiki/page1.html', () => {
    const { query, app, path } = utils.parseURL('.wiki/wiki/page1.html');

    expect(query).toEqual('');
    expect(app).toEqual('wiki');
    expect(path).toEqual('wiki/page1.html');
});


it('-> /ipfs/wikiHash/wiki/ =>  .wiki/wiki/', () => {
    const dura = utils.URLToDURA('/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco/wiki/', apps);

    expect(dura).toEqual('.wiki/wiki/');
});

it('-> /ipfs/wikiHash/test/ =>  .wiki/test/', () => {
    const dura = utils.URLToDURA('/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco/test/', apps);

    expect(dura).toEqual('.wiki/test/');
});


it('-> /ipfs/wikiHash/test/ =>  .wiki/wiki/page5.html', () => {
    const dura = utils.URLToDURA('/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco/wiki/page5.html', apps);

    expect(dura).toEqual('.wiki/wiki/page5.html');
});


it('-> URLToDURA', () => {
    const dura = utils.URLToDURA('http://earth.cybernode.ai:34402/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco/wiki/', apps);

    expect(dura).toEqual('.wiki/wiki/');
});

it('localhost dev mode -> port.dev', () => {
    const dura = utils.URLToDURA('http://localhost:5600/#/', apps,);

    expect(dura).toEqual('.dev:5600/#/');
});

it('localhost dev mode -> port.dev with query', () => {
    const dura = utils.URLToDURA('http://localhost:5600/#/', apps, 'testQuery123');

    const query = utils.getQuery();

    expect(query).toEqual('testQuery123');
    expect(dura).toEqual('testQuery123.dev:5600/#/');

});

it('dura with params, dura without params', () => {
    const duraWithParam = utils.URLToDURA('http://localhost:6666/#/page0', apps, 'tramParam');

    expect(utils.getQuery()).toEqual('tramParam');

    const dura = utils.URLToDURA('http://localhost:5644/#/page1123', apps, '');

    expect(utils.getQuery()).toEqual('');
});

it('localhost dev mode -> port.dev with query', () => {
    const dura = utils.URLToDURA('http://localhost:8080/ipfs/QmXZ5GeuFGYJswXT93hmjG5Z6fGJM2ifgXsXBxyomi63GN/#/', apps, '');

    expect(dura).toEqual('.cyber/#/');
});

it(' ipfs hash -> correct dura', () => {
    const dura = utils.URLToDURA('http://earth.cybernode.ai:34402/ipfs/QmfBnoeaTX4YVFFWWrDsafSwEyXSoUtvypr77yBcsKqQYZ/#/', apps);

    expect(dura).toEqual('QmfBnoeaTX4YVFFWWrDsafSwEyXSoUtvypr77yBcsKqQYZ.ipfs/#/');
});

it(' ipfs hast -> known app extention', () => {
    const dura = utils.URLToDURA('http://earth.cybernode.ai:34402/ipfs/QmfBnoeaTX4YVFFWWrDsafSwEyXSoUtvypr97yBcsKqQYZ/#/', apps);

    expect(dura).toEqual('.chaingear/#/');
});

it('should correct work with local ipfs node ', () => {
    const dura = utils.URLToDURA('http://localhost:8080/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco/wiki/', apps);

    expect(dura).toEqual('.wiki/wiki/');
});

it('-> URLToDURA with ipns ', () => {
    const dura = utils.URLToDURA('http://earth.cybernode.ai:34402/ipns/QmbLwHKfuk6DfiCpG5tvcwNAcwtMPjuC5pbSwshGrSPpC2', apps);

    expect(dura).toEqual('QmbLwHKfuk6DfiCpG5tvcwNAcwtMPjuC5pbSwshGrSPpC2.ipns');
});

it(' correct dura with # after f5 -> dura', () => {
    const { url, dura } = utils.DURAToURL('.notresolvedapp/#/', apps, 'http://earth.cybernode.ai:34402');

    expect(url).toEqual('');
    expect(dura).toEqual('notfound.cyb');
});

it('-> DURAToURL', () => {
    const { url } = utils.DURAToURL('.wiki/wiki/', apps, 'http://earth.cybernode.ai:34402');

    expect(url).toEqual('http://earth.cybernode.ai:34402/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco/wiki/');
});

it('-> DURAToURL empty => ipfshome ', () => {
    const { url, dura } = utils.DURAToURL('', apps, '');

    expect(url).toEqual('/ipfs/QmZfSNpHVzTNi9gezLcgq64Wbj1xhwi9wk4AxYyxMZgtCG/');
    expect(dura).toEqual('');
});

it('DURAToURL should change dura after call', () => {
    const { url, dura } = utils.DURAToURL('.cyber', apps, '');

    expect(url).toEqual(`/ipfs/${apps.cyber.hash}/`);
    expect(dura).toEqual('.cyber');
});

it('DURAToURL should process ipfs', () => {
    const { url, dura } = utils.DURAToURL('QmZP5VsY5r2i7FekSJf6tjkByw97FusJKSQ2Y8euczfhZw.ipfs', apps, '');

    expect(url).toEqual('/ipfs/QmZP5VsY5r2i7FekSJf6tjkByw97FusJKSQ2Y8euczfhZw/');
    expect(dura).toEqual('QmZP5VsY5r2i7FekSJf6tjkByw97FusJKSQ2Y8euczfhZw.ipfs');
});

it('DURAToURL should process q', () => {
    const { url, dura, query } = utils.DURAToURL('43.cyber', apps, '');

    expect(url).toEqual(`/ipfs/${apps.cyber.hash}/`);
    expect(query).toEqual('43');
    expect(dura).toEqual('43.cyber');
});

it('port.dev => localhost:port with #', () => {
    const { url, dura } = utils.DURAToURL('.dev:4000/#/page1', apps, '');

    expect(url).toEqual('http://localhost:4000/#/page1');
    expect(dura).toEqual('.dev:4000/#/page1');
});

it('default.dev => localhost:5000', () => {
    const { url, dura } = utils.DURAToURL('.dev', apps, '');

    expect(url).toEqual('http://localhost:5000');
    expect(dura).toEqual('.dev:5000');
});

it('port.dev => localhost:port with custom port', () => {
    const { url, dura } = utils.DURAToURL('.dev:4000', apps, '');

    expect(url).toEqual('http://localhost:4000');
    expect(dura).toEqual('.dev:4000');
});

it('.dev => localhost:5000/#/page1 (default port with #)', () => {
    const { url, dura } = utils.DURAToURL('.dev/#/page1', apps, '');

    expect(url).toEqual('http://localhost:5000/#/page1');
    expect(dura).toEqual('.dev:5000/#/page1');
});

it('DURAToURL with ipns', () => {
    const { url, dura } = utils.DURAToURL('.ch', apps, '');

    expect(url).toEqual(`/ipns/${apps.ch.hash}/`);
    expect(dura).toEqual('.ch');
});
