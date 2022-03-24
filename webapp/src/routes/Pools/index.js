import React, { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@mui/styles'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import HelpIcon from '@mui/icons-material/Help'
import Tooltip from '@mui/material/Tooltip'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import { DataGrid } from '@mui/x-data-grid'
import Link from '@mui/material/Link'
import { Link as RouterLink } from 'react-router-dom'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'

import { tokenSaleUtil } from '../../utils'
import { useSharedState } from '../../context/state.context'

import styles from './styles'

const useStyles = makeStyles(styles)

const Pools = () => {
  const classes = useStyles()
  const { t } = useTranslation('PoolsRoute')
  const [{ user }] = useSharedState()
  const [showInfo, setShowInfo] = useState(false)
  const [pools, setPools] = useState([])

  const handleGetRowId = row => row.name

  const renderOptions = params => {
    switch (user.role) {
      case tokenSaleUtil.ROLES.ADMIN:
        return (
          <Box>
            {params.row.name}
            {' | '}
            <Link
              component={RouterLink}
              to={`/approve-pool?name=${params.row.name}`}
            >
              {t('approve')}
            </Link>
            {' | '}
            <Link
              component={RouterLink}
              to={`/start-sale?name=${params.row.name}`}
            >
              {t('start sale')}
            </Link>
            {' | '}
            <Link
              component={RouterLink}
              to={`/end-sale?name=${params.row.name}`}
            >
              {t('end sale')}
            </Link>
            {' | '}
            <Link
              component={RouterLink}
              to={`/pool/${params.row.name}/subscriptions`}
            >
              {t('subscriptions')}
            </Link>
          </Box>
        )
      case tokenSaleUtil.ROLES.OWNER:
        return (
          <Box>
            {params.row.name}
            {' | '}
            <Link
              component={RouterLink}
              to={`/token-deposit?name=${params.row.name}`}
            >
              {t('token deposit')}
            </Link>
            {' | '}
            <Link
              component={RouterLink}
              to={`/owner-claim?pool=${params.row.name}`}
            >
              {t('claim')}
            </Link>
          </Box>
        )
      case tokenSaleUtil.ROLES.INVESTOR:
        return (
          <Box>
            {params.row.name}
            {' | '}
            <Link
              component={RouterLink}
              to={`/subscribe?pool=${params.row.name}`}
            >
              {t('subscribe')}
            </Link>
            {' | '}
            <Link
              component={RouterLink}
              to={`/contribution?name=${params.row.name}`}
            >
              {t('contribution')}
            </Link>
            {' | '}
            <Link
              component={RouterLink}
              to={`/investor-claim?pool=${params.row.name}`}
            >
              {t('claim')}
            </Link>
          </Box>
        )

      default:
        break
    }

    return <Box>{params.row.name}</Box>
  }

  useEffect(() => {
    const load = async () => {
      const pools = await tokenSaleUtil.getPools(
        user.role === tokenSaleUtil.ROLES.OWNER ? user.accountName : null
      )

      setPools(pools)
    }

    load()
  }, [user])

  return (
    <Box className={classes.root}>
      <Card className={classes.card}>
        <CardHeader
          action={
            <ClickAwayListener onClickAway={() => setShowInfo(false)}>
              <Tooltip
                PopperProps={{
                  disablePortal: true
                }}
                onClose={() => setShowInfo(false)}
                title={t('tooltip')}
                open={showInfo}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                arrow
              >
                <IconButton onClick={() => setShowInfo(true)}>
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            </ClickAwayListener>
          }
          title={t('title')}
          subheader={t('subtitle')}
        />
        <CardContent className={classes.cardContent}>
          <DataGrid
            getRowId={handleGetRowId}
            rows={pools}
            columns={[
              {
                field: 'name',
                headerName: t('name'),
                minWidth: 380,
                renderCell: renderOptions
              },
              {
                field: 'status',
                headerName: t('status'),
                minWidth: 160
              },
              {
                field: 'info',
                headerName: t('info')
              },
              {
                field: 'url',
                headerName: t('url')
              },
              {
                field: 'owner',
                headerName: t('owner')
              },
              {
                field: 'token_contract',
                headerName: t('token_contract')
              },
              {
                field: 'token_symbol',
                headerName: t('token_symbol')
              },
              {
                field: 'token_price',
                headerName: t('token_price')
              },
              {
                field: 'tokens_on_sale',
                headerName: t('tokens_on_sale')
              },
              {
                field: 'launch_date',
                headerName: t('launch_date')
              },
              {
                field: 'end_date',
                headerName: t('end_date')
              },
              {
                field: 'project_immidiate_vesting',
                headerName: t('project_immidiate_vesting')
              },
              {
                field: 'project_vesting_days',
                headerName: t('project_vesting_days')
              },
              {
                field: 'investor_immediate_vesting',
                headerName: t('investor_immediate_vesting')
              },
              {
                field: 'investor_vesting_days',
                headerName: t('investor_vesting_days')
              },
              {
                field: 'total_balance',
                headerName: t('total_balance')
              },
              {
                field: 'paid_balance',
                headerName: t('paid_balance')
              },
              {
                field: 'daily_vesting',
                headerName: t('daily_vesting')
              },
              {
                field: 'last_claim',
                headerName: t('last_claim')
              }
            ]}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </CardContent>
      </Card>
      {user.role === tokenSaleUtil.ROLES.OWNER && (
        <Fab color="primary" component={RouterLink} to="/add-pool">
          <AddIcon />
        </Fab>
      )}
    </Box>
  )
}

Pools.propTypes = {}

export default memo(Pools)
