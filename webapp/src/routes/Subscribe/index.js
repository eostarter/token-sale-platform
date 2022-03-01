import React, { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@mui/styles'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import HelpIcon from '@mui/icons-material/Help'
import Tooltip from '@mui/material/Tooltip'
import ClickAwayListener from '@mui/material/ClickAwayListener'

import { tokenSaleUtil, useQuery } from '../../utils'
import { useSharedState } from '../../context/state.context'

import styles from './styles'

const useStyles = makeStyles(styles)

const Subscribe = () => {
  const classes = useStyles()
  const { t } = useTranslation('SubscribeRoute')
  const query = useQuery()
  const [{ user }, { showMessage }] = useSharedState()
  const [showInfo, setShowInfo] = useState(false)
  const [payload, setPayload] = useState({
    account: user.accountName
  })

  const handleOnChange = type => field => event => {
    let value = null

    switch (type) {
      case 'text':
        value = event.target.value
        break

      case 'bool':
        value = event.target.checked
        break

      case 'date':
        value = event
        break

      default:
        break
    }

    setPayload(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleOnSubmit = async () => {
    try {
      const response = await tokenSaleUtil.subscribe(user, payload)

      showMessage({
        type: 'success',
        content: t('successMessage', {
          trxid: response.transactionId.slice(-6)
        })
      })
      setPayload({
        account: user.accountName
      })
    } catch (error) {
      showMessage({
        type: 'error',
        content: t('errorMessage', {
          message: t(error.message)
        })
      })
    }
  }

  useEffect(() => {
    setPayload(prev => ({
      ...prev,
      pool: query.get('pool') || ''
    }))
  }, [query])

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      className={classes.form}
    >
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
        <CardContent className={classes.fields}>
          <TextField
            label={t('pool')}
            value={payload.pool || ''}
            onChange={handleOnChange('text')('pool')}
            variant="filled"
          />
        </CardContent>
        <CardActions>
          <Button onClick={handleOnSubmit}>{t('send')}</Button>
        </CardActions>
      </Card>
    </Box>
  )
}

Subscribe.propTypes = {}

export default memo(Subscribe)
