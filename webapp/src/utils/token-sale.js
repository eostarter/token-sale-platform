import { eosApi } from './eosapi'
import { mainConfig } from '../config'

const ROLES = {
  ADMIN: 'ADMIN',
  OWNER: 'OWNER',
  INVESTOR: 'INVESTOR'
}

const ROLES_NAMES = {
  0: 'ADMIN',
  1: 'OWNER',
  2: 'INVESTOR'
}

const ROLES_IDS = {
  ADMIN: 0,
  OWNER: 1,
  INVESTOR: 2
}

const POOL_STATUS_NAMES = {
  0: 'REJECTED',
  1: 'PENDING_APPROVAL',
  2: 'PENDING_TOKEN_DEPOSIT',
  3: 'READY_FOR_SALE',
  4: 'ACTIVE_SALE',
  5: 'CLAIM_IN_PROGRESS',
  6: 'COMPLETED_SALE'
}

const SUBSCRIPTION_STATUS = {
  0: 'REJECTED',
  1: 'PENDING_APPROVAL',
  2: 'APPROVED',
  3: 'CLAIM_IN_PROGRESS',
  4: 'PAID'
}

const TOKEN_DEPOSIT_PREFIX = 'pool:'

const CONTRIBUTION_PREFIX = 'contribution:'

const CONTRIBUTION_CONTRACT = 'eosio.token'

const CONTRIBUTION_SYMBOL = 'EOS'

const CONTRIBUTION_PRECISION = 4

const GUEST_ROLE = 'guest'

const addPool = (user, payload) => {
  return user.signTransaction(
    {
      actions: [
        {
          account: mainConfig.tokenSaleContract,
          name: 'addpool',
          authorization: [
            {
              actor: user.accountName,
              permission: 'active'
            }
          ],
          data: payload
        }
      ]
    },
    {
      broadcast: true,
      blocksBehind: 3,
      expireSeconds: 60
    }
  )
}

const approvePool = (user, payload) => {
  return user.signTransaction(
    {
      actions: [
        {
          account: mainConfig.tokenSaleContract,
          name: 'approvepool',
          authorization: [
            {
              actor: user.accountName,
              permission: 'active'
            }
          ],
          data: payload
        }
      ]
    },
    {
      broadcast: true,
      blocksBehind: 3,
      expireSeconds: 60
    }
  )
}

const tokenDeposit = (user, payload) => {
  return user.signTransaction(
    {
      actions: [
        {
          account: payload.token_contract,
          name: 'transfer',
          authorization: [
            {
              actor: user.accountName,
              permission: 'active'
            }
          ],
          data: {
            from: user.accountName,
            to: mainConfig.tokenSaleContract,
            quantity: payload.tokens_on_sale,
            memo: `${TOKEN_DEPOSIT_PREFIX}${payload.name}`
          }
        }
      ]
    },
    {
      broadcast: true,
      blocksBehind: 3,
      expireSeconds: 60
    }
  )
}

const startSale = (user, payload) => {
  return user.signTransaction(
    {
      actions: [
        {
          account: mainConfig.tokenSaleContract,
          name: 'startsale',
          authorization: [
            {
              actor: user.accountName,
              permission: 'active'
            }
          ],
          data: payload
        }
      ]
    },
    {
      broadcast: true,
      blocksBehind: 3,
      expireSeconds: 60
    }
  )
}

const subscribe = (user, payload) => {
  return user.signTransaction(
    {
      actions: [
        {
          account: mainConfig.tokenSaleContract,
          name: 'subscribe',
          authorization: [
            {
              actor: user.accountName,
              permission: 'active'
            }
          ],
          data: payload
        }
      ]
    },
    {
      broadcast: true,
      blocksBehind: 3,
      expireSeconds: 60
    }
  )
}

const approveSubscription = (user, payload) => {
  return user.signTransaction(
    {
      actions: [
        {
          account: mainConfig.tokenSaleContract,
          name: 'approvesubsc',
          authorization: [
            {
              actor: user.accountName,
              permission: 'active'
            }
          ],
          data: payload
        }
      ]
    },
    {
      broadcast: true,
      blocksBehind: 3,
      expireSeconds: 60
    }
  )
}

const contribution = (user, payload) => {
  return user.signTransaction(
    {
      actions: [
        {
          account: CONTRIBUTION_CONTRACT,
          name: 'transfer',
          authorization: [
            {
              actor: user.accountName,
              permission: 'active'
            }
          ],
          data: {
            from: user.accountName,
            to: mainConfig.tokenSaleContract,
            quantity: `${parseFloat(payload.tokens_to_send).toFixed(
              CONTRIBUTION_PRECISION
            )} ${CONTRIBUTION_SYMBOL}`,
            memo: `${CONTRIBUTION_PREFIX}${payload.name}`
          }
        }
      ]
    },
    {
      broadcast: true,
      blocksBehind: 3,
      expireSeconds: 60
    }
  )
}

const endSale = (user, payload) => {
  return user.signTransaction(
    {
      actions: [
        {
          account: mainConfig.tokenSaleContract,
          name: 'endsale',
          authorization: [
            {
              actor: user.accountName,
              permission: 'active'
            }
          ],
          data: payload
        }
      ]
    },
    {
      broadcast: true,
      blocksBehind: 3,
      expireSeconds: 60
    }
  )
}

const ownerClaim = (user, payload) => {
  return user.signTransaction(
    {
      actions: [
        {
          account: mainConfig.tokenSaleContract,
          name: 'ownerclaim',
          authorization: [
            {
              actor: user.accountName,
              permission: 'active'
            }
          ],
          data: payload
        }
      ]
    },
    {
      broadcast: true,
      blocksBehind: 3,
      expireSeconds: 60
    }
  )
}

const investorClaim = (user, payload) => {
  return user.signTransaction(
    {
      actions: [
        {
          account: mainConfig.tokenSaleContract,
          name: 'invesclaim',
          authorization: [
            {
              actor: user.accountName,
              permission: 'active'
            }
          ],
          data: payload
        }
      ]
    },
    {
      broadcast: true,
      blocksBehind: 3,
      expireSeconds: 60
    }
  )
}

const getPools = async owner => {
  let options = {}

  if (owner) {
    options = {
      key_type: 'name',
      index_position: 2,
      lower_bound: owner,
      upper_bound: owner
    }
  }

  const { rows } = await eosApi.getTableRows({
    json: true,
    code: mainConfig.tokenSaleContract,
    scope: mainConfig.tokenSaleContract,
    table: 'pool',
    ...options
  })

  return rows.map(row => ({ ...row, status: POOL_STATUS_NAMES[row.status] }))
}

const getPool = async name => {
  if (!name) {
    return null
  }

  const { rows } = await eosApi.getTableRows({
    json: true,
    code: mainConfig.tokenSaleContract,
    scope: mainConfig.tokenSaleContract,
    table: 'pool',
    lower_bound: name,
    upper_bound: name
  })

  return rows[0]
}

const getUsers = async () => {
  const { rows } = await eosApi.getTableRows({
    json: true,
    code: mainConfig.tokenSaleContract,
    scope: mainConfig.tokenSaleContract,
    table: 'user'
  })

  return rows.map(row => ({ ...row, role: ROLES_NAMES[row.role] }))
}

const getUser = async name => {
  if (!name) {
    return null
  }

  const { rows } = await eosApi.getTableRows({
    json: true,
    code: mainConfig.tokenSaleContract,
    scope: mainConfig.tokenSaleContract,
    table: 'user',
    lower_bound: name,
    upper_bound: name
  })

  return rows[0]
}

const getUserRole = async accountName => {
  if (!accountName) {
    return GUEST_ROLE
  }

  if (accountName === mainConfig.tokenSaleContract) {
    return ROLES_NAMES[0]
  }

  const { rows } = await eosApi.getTableRows({
    json: true,
    code: mainConfig.tokenSaleContract,
    scope: mainConfig.tokenSaleContract,
    table: 'user',
    lower_bound: accountName,
    upper_bound: accountName
  })

  if (!rows.length) {
    return GUEST_ROLE
  }

  return ROLES_NAMES[rows[0].role] || GUEST_ROLE
}

const addUser = (user, payload) => {
  return user.signTransaction(
    {
      actions: [
        {
          account: mainConfig.tokenSaleContract,
          name: 'adduser',
          authorization: [
            {
              actor: user.accountName,
              permission: 'active'
            }
          ],
          data: payload
        }
      ]
    },
    {
      broadcast: true,
      blocksBehind: 3,
      expireSeconds: 60
    }
  )
}

const editUser = (user, payload) => {
  console.log(payload)
  return user.signTransaction(
    {
      actions: [
        {
          account: mainConfig.tokenSaleContract,
          name: 'edituser',
          authorization: [
            {
              actor: user.accountName,
              permission: 'active'
            }
          ],
          data: payload
        }
      ]
    },
    {
      broadcast: true,
      blocksBehind: 3,
      expireSeconds: 60
    }
  )
}

const getSubscriptions = async name => {
  const { rows } = await eosApi.getTableRows({
    json: true,
    code: mainConfig.tokenSaleContract,
    scope: name,
    table: 'subscription'
  })

  return rows.map(row => ({ ...row, status: SUBSCRIPTION_STATUS[row.status] }))
}

export const tokenSaleUtil = {
  ROLES,
  ROLES_NAMES,
  ROLES_IDS,
  POOL_STATUS_NAMES,
  SUBSCRIPTION_STATUS,
  getUserRole,
  getUsers,
  getUser,
  addUser,
  editUser,
  addPool,
  approvePool,
  getPool,
  tokenDeposit,
  startSale,
  subscribe,
  approveSubscription,
  contribution,
  endSale,
  ownerClaim,
  investorClaim,
  getPools,
  getSubscriptions
}
