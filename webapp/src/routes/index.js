import React, { lazy } from 'react'

import {
  Grid as GridIcon,
  PlusSquare as PlusSquareIcon,
  CheckSquare as CheckSquareIcon,
  DollarSign as DollarSignIcon,
  Calendar as CalendarIcon,
  Rss as RssIcon,
  ThumbsUp as ThumbsUpIcon,
  TrendingUp as TrendingUpIcon,
  List as ListIcon,
  Info as InfoIcon,
  HelpCircle as HelpIcon,
  GitMerge as GitMergeIcon,
  GitHub as GitHubIcon,
  Send as TelegramIcon
} from 'react-feather'

import { mainConfig } from '../config'

const Home = lazy(() => import('./Home'))
const AddUser = lazy(() => import('./AddUser'))
const Pools = lazy(() => import('./Pools'))
const AddPool = lazy(() => import('./AddPool'))
const ApprovePool = lazy(() => import('./ApprovePool'))
const TokenDeposit = lazy(() => import('./TokenDeposit'))
const StartSale = lazy(() => import('./StartSale'))
const Subscribe = lazy(() => import('./Subscribe'))
const Subscriptions = lazy(() => import('./Subscriptions'))
const ApproveSubscription = lazy(() => import('./ApproveSubscription'))
const Contribution = lazy(() => import('./Contribution'))
const EndSale = lazy(() => import('./EndSale'))
const OwnerClaim = lazy(() => import('./OwnerClaim'))
const InvestorClaim = lazy(() => import('./InvestorClaim'))
const About = lazy(() => import('./About'))
const Help = lazy(() => import('./Help'))
const Page404 = lazy(() => import('./Route404'))

const routes = [
  {
    name: 'home',
    icon: <GridIcon />,
    component: Home,
    path: '/',
    exact: true
  },
  {
    name: 'adduser',
    icon: <PlusSquareIcon />,
    component: AddUser,
    path: '/add-user',
    exact: true,
    roles: ['ADMIN']
  },
  {
    name: 'pools',
    icon: <ListIcon />,
    component: Pools,
    path: '/pools',
    exact: true,
    roles: ['ADMIN', 'OWNER', 'INVESTOR']
  },
  {
    name: 'addpool',
    icon: <PlusSquareIcon />,
    component: AddPool,
    path: '/add-pool',
    exact: true,
    roles: ['OWNER']
  },
  {
    name: 'approvepool',
    icon: <CheckSquareIcon />,
    component: ApprovePool,
    path: '/approve-pool',
    exact: true,
    roles: ['ADMIN']
  },
  {
    name: 'tokendeposit',
    icon: <DollarSignIcon />,
    component: TokenDeposit,
    path: '/token-deposit',
    exact: true,
    roles: ['OWNER']
  },
  {
    name: 'startsale',
    icon: <CalendarIcon />,
    component: StartSale,
    path: '/start-sale',
    exact: true,
    roles: ['ADMIN']
  },
  {
    name: 'subscribe',
    icon: <RssIcon />,
    component: Subscribe,
    path: '/subscribe',
    exact: true,
    roles: ['INVESTOR']
  },
  {
    component: Subscriptions,
    path: '/pool/:name/subscriptions',
    exact: true,
    roles: ['ADMIN']
  },
  {
    name: 'approvesubscription',
    icon: <ThumbsUpIcon />,
    component: ApproveSubscription,
    path: '/approve-subscription',
    exact: true,
    roles: ['ADMIN']
  },
  {
    name: 'contribution',
    icon: <DollarSignIcon />,
    component: Contribution,
    path: '/contribution',
    exact: true,
    roles: ['INVESTOR']
  },
  {
    name: 'endsale',
    icon: <CalendarIcon />,
    component: EndSale,
    path: '/end-sale',
    exact: true,
    roles: ['ADMIN']
  },
  {
    name: 'ownerclaim',
    icon: <TrendingUpIcon />,
    component: OwnerClaim,
    path: '/owner-claim',
    exact: true,
    roles: ['OWNER']
  },
  {
    name: 'investorclaim',
    icon: <TrendingUpIcon />,
    component: InvestorClaim,
    path: '/investor-claim',
    exact: true,
    roles: ['INVESTOR']
  },
  {
    header: 'docs',
    name: 'about',
    icon: <InfoIcon />,
    component: About,
    path: '/about',
    exact: true
  },
  {
    name: 'help',
    icon: <HelpIcon />,
    component: Help,
    path: '/help',
    exact: true
  },
  {
    name: 'changelog',
    badge: mainConfig.appVersion,
    path: 'https://github.com/eostarter/token-sale-platform/tags',
    icon: <GitMergeIcon />,
    exact: true
  },
  {
    header: 'community',
    name: 'github',
    path: 'https://github.com/eostarter/token-sale-platform',
    icon: <GitHubIcon />
  },
  {
    name: 'telegram',
    path: 'https://t.me/eostarter',
    icon: <TelegramIcon />
  },
  {
    component: Page404
  }
]

export default role => {
  const routesForRole = routes.filter(
    route => !route.roles || route.roles.includes(role)
  )

  return {
    sidebar: routesForRole.filter(route => !!route.name),
    browser: routesForRole
      .reduce(
        (routes, route) => [
          ...routes,
          ...(route.childrens ? route.childrens : [route])
        ],
        []
      )
      .filter(route => !!route.component)
  }
}
