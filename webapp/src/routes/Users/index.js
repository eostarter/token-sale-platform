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

import styles from './styles'

const useStyles = makeStyles(styles)

const Users = () => {
  const classes = useStyles()
  const { t } = useTranslation('UsersRoute')
  const [showInfo, setShowInfo] = useState(false)
  const [users, setUsers] = useState([])

  const handleGetRowId = row => row.account

  const renderOptions = params => {
    return (
      <Box>
        {params.row.account}
        {' | '}
        <Link
          component={RouterLink}
          to={`/edit-user?account=${params.row.account}`}
        >
          {t('edit')}
        </Link>
      </Box>
    )
  }

  useEffect(() => {
    const load = async () => {
      const users = await tokenSaleUtil.getUsers()

      setUsers(users)
    }

    load()
  }, [])

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
            rows={users}
            columns={[
              {
                field: 'account',
                headerName: t('account'),
                minWidth: 380,
                renderCell: renderOptions
              },
              {
                field: 'username',
                headerName: t('username'),
                minWidth: 160
              },
              {
                field: 'verified',
                headerName: t('verified'),
                valueGetter: params => t(params.row.verified ? 'yes' : 'no')
              },
              {
                field: 'role',
                headerName: t('role')
              },
              {
                field: 'referral',
                headerName: t('referral')
              }
            ]}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </CardContent>
      </Card>

      <Fab color="primary" component={RouterLink} to="/add-user">
        <AddIcon />
      </Fab>
    </Box>
  )
}

Users.propTypes = {}

export default memo(Users)
