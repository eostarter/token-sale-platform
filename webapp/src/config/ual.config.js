import { Scatter } from 'ual-scatter'
import { Ledger } from 'ual-ledger'
import { Lynx } from 'ual-lynx'
import { TokenPocket } from 'ual-token-pocket'
import { MeetOne } from 'ual-meetone'
import { Anchor } from 'ual-anchor'
import { Wombat } from 'ual-wombat'
import { Metamask } from 'ual-metamask'

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
  new Scatter([network], { appName }),
  new Wombat([network], { appName }),
  new TokenPocket([network]),
  new MeetOne([network.chainId]),
  new Anchor([network], { appName })
]
