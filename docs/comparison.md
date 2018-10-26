# Web3 browser market analysis

The purpose of this document is to provide comparison and description of current software that can deliver web3 experiense.

## Possible candidates for web3 browser:
- Parity shell
- Mist
- Beaker
- Atom
- VScode
- Electron based

## Brief comparison table

|                           |Parity | Mist | Beaker | Electron |
|---                        |---    |---    |---    |---       |
|Wallet                     |only ETH|only ETH(not safe)|no (metamask can be integrated)|no (metamask can be integrated)|
|IPFS integration           |no|no|no|no|
|User interface             |4/10|7/10|9/10|9/10|
|App developfriendly        |7/10|2/10|6/10| - |
|App deploy tool            |yes|no|yes(deploy using dat)|no|
|Web2 support               |no|yes|yes|yes|
|Core browser functionality |no|yes|yes|no|
|Community                  |3/10|6-7/10|7-8/10|7/10|
|Easy source code           |5/10|7/10|7/10|10/10|
|Project mission matching   |8/10|6/10|4/10|-|
|Web3 standart impl         |???|yes|no|no|
|UI framework               |React|React|co / yo yo|React|

## Detailed analysis

### `Shell (Parity)`

**Features**:
- Wallet
- Core dapps integration
- Contracts deploying, watching
- Basic marketplace from box
- Permissions for applications
- Light/Remotes nodes support
- Electron based
- Released for all platforms

**Pros**:
- Functional wallet
- Good account management
- Address book
- Permissions and dapps sandboxing (not work using official guidelines)
- Development and support by Parity tech (community)
- Light client support
- Set of core dapps
- Notification
- Open marketplace
- Extra security (generated wallpapers)
- uses ReactJS framework

**Cons**:
- Buggy
- Non stable working, sometimes
- web2 not supported
- ipfs not supported
- work only with ETH and parity

**Totals**:
- **+** Function wallet and good first steps to web3 browser
- **+** Permission and security features for users
- **-** Non stable working
- **-** Web2 logic not implemented (history, bookmarks, downloads, http browsing)
- **-** not use web3 standart api (custom parity api implemented)
- **-** a lot of code

### `Mist (Ethereum Foundation)`

**Features**:
- Web2/dapps browsing page browsing
- Wallet
- Contracts deploying, watching
- Light/Remotes nodes support
- Electron based
- Released for all platforms
- Swarm support
- ENS support

**Pros**:
- Integrated both Light/Remote nodes
- Swarm support (in beta)
- ENS support (contacts/tokens)

**Cons**:
- Non functional wallet at all
- Bad transaction fee management
- Proposed as non-secure by default
- Don't have permissions
- dapps browsing not stable and functional, actually not work
- Buggy user experience
- working only with Geth from box
- Use remote Infura nodes
- There are no any big features set delivery since 2016
- Not frequent releases
- There is no community
- Used Meteor (migrates to react in progress)

**Totals**:
- **-** In general not developed and maintained
- **-** Non functional and buggy

**Extracts**:
- with `parity --geth` Mist works with parity node (maybe)

### `Beaker`

**Features**:
- Working web2 browser
- DAT support
- Electron based
- Released for all platforms
- Built in editor

**Pros**:
- Fully functional UI (navigation,core apps: history, settings)
- Custom project/website publisher
- DAT support (network status, seed options)

**Cons**:
- No wallet
- No app store
- No frequent releases
- Weak community

**Totals**:
- Stable UI
- Core apps
- DAT support
- No blockchain integration

### `VScode`

**Pros**:
- Editor
- A lot of users
- Good UI

**Cons**:
- Development and support by Microsoft
- Need to build wallet/browser/app as plugins from scratch

### `Atom`

**Pros**:
- Very good editor
- Huge community
- Huge amount of users
- Development and support by Github
- Good plugin system
- Tons of goods (plugins)
- Good UI
- Stable working

**Cons**:
- Development and support by Github (Microsoft owns GitHub)
- Need to build wallet/browser/app as plugins from scratch

### `Raw Electron`
**Pros**:
- Way to build wallet/browser/app from scratch

**Cons**:
- Very hard to build wallet/browser/app from scratch

**Extracts**:
There is also [Muon](https://github.com/brave/muon), but there is the question about their future and maintenance
