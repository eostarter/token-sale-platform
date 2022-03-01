import React, { memo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@mui/styles'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import HelpIcon from '@mui/icons-material/Help'
import Tooltip from '@mui/material/Tooltip'
import ClickAwayListener from '@mui/material/ClickAwayListener'

import { mainConfig } from '../../config'
import { tokenSaleUtil } from '../../utils'
import { useSharedState } from '../../context/state.context'

import styles from './styles'

const useStyles = makeStyles(styles)

const AddUser = () => {
  const classes = useStyles()
  const { t } = useTranslation('AddUserRoute')
  const [showInfo, setShowInfo] = useState(false)
  const [payload, setPayload] = useState({
    verified: false,
    referral: mainConfig.tokenSaleContract
  })
  const [{ user }, { showMessage }] = useSharedState()

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
      const response = await tokenSaleUtil.addUser(user, payload)

      showMessage({
        type: 'success',
        content: t('successMessage', {
          trxid: response.transactionId.slice(-6)
        })
      })
      setPayload({
        verified: false,
        referral: mainConfig.tokenSaleContract
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
            label={t('account')}
            value={payload.account || ''}
            onChange={handleOnChange('text')('account')}
            variant="filled"
          />
          <TextField
            label={t('username')}
            value={payload.username || ''}
            onChange={handleOnChange('text')('username')}
            variant="filled"
          />
          <FormControlLabel
            control={
              <Switch
                checked={!!payload.verified}
                onChange={handleOnChange('bool')('verified')}
                variant="filled"
              />
            }
            label={t('verified')}
          />
          <TextField
            label={t('role')}
            value={payload.role || ''}
            onChange={handleOnChange('text')('role')}
            variant="filled"
          />
          <TextField
            label={t('referral')}
            value={payload.referral || ''}
            onChange={handleOnChange('text')('referral')}
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

AddUser.propTypes = {}

export default memo(AddUser)
