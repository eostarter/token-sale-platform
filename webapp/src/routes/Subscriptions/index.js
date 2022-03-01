import React, { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@mui/styles'
import { useParams, Link as RouterLink } from 'react-router-dom'
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
  const { name } = useParams()

  const handleGetRowId = row => row.account

  const renderOptions = params => {
    switch (user.role) {
      case tokenSaleUtil.ROLES.ADMIN:
        return (
          <Box>
            {params.row.account}
            {' | '}
            <Link
              component={RouterLink}
              to={`/approve-subscription?account=${params.row.account}&pool=${name}`}
            >
              {t('approve')}
            </Link>
          </Box>
        )

      default:
        break
    }

    return <Box>{params.row.account}</Box>
  }

  useEffect(() => {}, [])

  useEffect(() => {
    const load = async () => {
      const pools = await tokenSaleUtil.getSubscriptions(name)

      setPools(pools)
    }

    load()
  }, [name])

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
          title={t('title', { name })}
          subheader={t('subtitle')}
        />
        <CardContent className={classes.cardContent}>
          <DataGrid
            getRowId={handleGetRowId}
            rows={pools}
            columns={[
              {
                field: 'account',
                headerName: t('account'),
                minWidth: 160,
                renderCell: renderOptions
              },
              {
                field: 'status',
                headerName: t('status'),
                minWidth: 100
              },
              {
                field: 'max_allocation',
                headerName: t('max_allocation')
              },
              {
                field: 'contribution',
                headerName: t('contribution')
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
    </Box>
  )
}

Pools.propTypes = {}

export default memo(Pools)
