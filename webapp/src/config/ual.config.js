import { Metamask } from 'ual-metamask'
import { Lynx } from 'ual-lynx'
import { Ledger } from 'ual-ledger'
import { TokenPocket } from 'ual-token-pocket'
import { MeetOne } from 'ual-meetone'
import { Anchor } from 'ual-anchor'

export const endpoint = `${process.env.REACT_APP_UAL_API_PROTOCOL}://${
  process.env.REACT_APP_UAL_API_HOST
}${process.env.REACT_APP_UAL_API_PORT ? ':' : ''}${
  process.env.REACT_APP_UAL_API_PORT
}`
export const appName =
  process.env.REACT_APP_UAL_APP_NAME || 'EOS Starter Token Sale Platform'
export const network = {
  chainId: process.env.REACT_APP_UAL_CHAIN_ID,
  rpcEndpoints: [
    {
      blockchain: 'eos',
      protocol: process.env.REACT_APP_UAL_API_PROTOCOL,
      host: process.env.REACT_APP_UAL_API_HOST,
      port: parseInt(process.env.REACT_APP_UAL_API_PORT)
    }
  ]
}
export const authenticators = [
  new Metamask([network]),
  new Lynx([network]),
  new Ledger([network]),
  new TokenPocket([network]),
  new MeetOne([network.chainId]),
  new Anchor([network], { appName })
]
