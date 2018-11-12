const ProviderEngine = require('web3-provider-engine')
const DefaultFixture = require('web3-provider-engine/subproviders/default-fixture.js')
const NonceTrackerSubprovider = require('web3-provider-engine/subproviders/nonce-tracker.js')
const CacheSubprovider = require('web3-provider-engine/subproviders/cache.js')
const FilterSubprovider = require('web3-provider-engine/subproviders/filters.js')
const SubscriptionSubprovider = require('web3-provider-engine/subproviders/subscriptions')
const InflightCacheSubprovider = require('web3-provider-engine/subproviders/inflight-cache')
const HookedWalletSubprovider = require('web3-provider-engine/subproviders/hooked-wallet-ethtx.js')
const SanitizingSubprovider = require('web3-provider-engine/subproviders/sanitizer.js')
const InfuraSubprovider = require('web3-provider-engine/subproviders/infura.js')
const FetchSubprovider = require('web3-provider-engine/subproviders/fetch.js')
const WebSocketSubprovider = require('web3-provider-engine/subproviders/websocket.js')

ProviderEngine.prototype.send = ProviderEngine.prototype.sendAsync;;

module.exports = ZeroClientProvider


function ZeroClientProvider(opts = {}){
  const connectionType = getConnectionType(opts)

  const engine = new ProviderEngine(opts.engineParams)

  // static
  const staticSubprovider = new DefaultFixture(opts.static)
  engine.addProvider(staticSubprovider)

  // nonce tracker
  engine.addProvider(new NonceTrackerSubprovider())

  // sanitization
  const sanitizer = new SanitizingSubprovider()
  engine.addProvider(sanitizer)

  // cache layer
  const cacheSubprovider = new CacheSubprovider()
  engine.addProvider(cacheSubprovider)

  // filters + subscriptions
  // for websockets, only polyfill filters
  if (connectionType === 'ws') {
    const filterSubprovider = new FilterSubprovider()
    engine.addProvider(filterSubprovider)
  // otherwise, polyfill both subscriptions and filters
  } else {
    const filterAndSubsSubprovider = new SubscriptionSubprovider()
    // forward subscription events through provider
    filterAndSubsSubprovider.on('data', (err, notification) => {
      engine.emit('data', err, notification)
    })
    engine.addProvider(filterAndSubsSubprovider)
  }

  // inflight cache
  const inflightCache = new InflightCacheSubprovider()
  engine.addProvider(inflightCache)

  // id mgmt
  const idmgmtSubprovider = new HookedWalletSubprovider({
    // accounts
    getAccounts: opts.getAccounts,
    // transactions
    processTransaction: opts.processTransaction,
    approveTransaction: opts.approveTransaction,
    signTransaction: opts.signTransaction,
    publishTransaction: opts.publishTransaction,
    getPrivateKey: opts.getPrivateKey,
    // messages
    // old eth_sign
    processMessage: opts.processMessage,
    approveMessage: opts.approveMessage,
    signMessage: opts.signMessage,
    // new personal_sign
    processPersonalMessage: opts.processPersonalMessage,
    processTypedMessage: opts.processTypedMessage,
    approvePersonalMessage: opts.approvePersonalMessage,
    approveTypedMessage: opts.approveTypedMessage,
    signPersonalMessage: opts.signPersonalMessage,
    signTypedMessage: opts.signTypedMessage,
    personalRecoverSigner: opts.personalRecoverSigner,
  })
  engine.addProvider(idmgmtSubprovider)

  // data source
  const dataSubprovider = opts.dataSubprovider || createDataSubprovider(connectionType, opts)
  // for websockets, forward subscription events through provider
  if (connectionType === 'ws') {
    dataSubprovider.on('data', (err, notification) => {
      engine.emit('data', err, notification)
    })
  }
  engine.addProvider(dataSubprovider)

  // start polling
  if (!opts.stopped) {
    engine.start()
  }

  return engine

}

function createDataSubprovider(connectionType, opts) {
  const { rpcUrl, debug } = opts

  // default to infura
  if (!connectionType) {
    return new InfuraSubprovider()
  }
  if (connectionType === 'http') {
    return new FetchSubprovider({ rpcUrl, debug })
  }
  if (connectionType === 'ws') {
    return new WebSocketSubprovider({ rpcUrl, debug })
  }

  throw new Error(`ProviderEngine - unrecognized connectionType "${connectionType}"`)
}

function getConnectionType({ rpcUrl }) {
  if (!rpcUrl) return undefined

  const protocol = rpcUrl.split(':')[0].toLowerCase()
  switch (protocol) {
    case 'http':
    case 'https':
      return 'http'
    case 'ws':
    case 'wss':
      return 'ws'
    default:
      throw new Error(`ProviderEngine - unrecognized protocol in "${rpcUrl}"`)
  }
}