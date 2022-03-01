import React, { memo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@mui/styles'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import DateTimePicker from '@mui/lab/DateTimePicker'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import HelpIcon from '@mui/icons-material/Help'
import Tooltip from '@mui/material/Tooltip'
import ClickAwayListener from '@mui/material/ClickAwayListener'

import { tokenSaleUtil } from '../../utils'
import { useSharedState } from '../../context/state.context'

import styles from './styles'

const useStyles = makeStyles(styles)

const AddPool = () => {
  const classes = useStyles()
  const { t } = useTranslation('AddPoolRoute')
  const [{ user }, { showMessage }] = useSharedState()
  const [showInfo, setShowInfo] = useState(false)
  const [payload, setPayload] = useState({
    owner: user.accountName
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
      const response = await tokenSaleUtil.addPool(user, payload)

      showMessage({
        type: 'success',
        content: t('successMessage', {
          trxid: response.transactionId.slice(-6)
        })
      })
      setPayload({
        owner: user.accountName
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
            label={t('name')}
            value={payload.name || ''}
            onChange={handleOnChange('text')('name')}
            variant="filled"
          />
          <TextField
            label={t('info')}
            value={payload.info || ''}
            onChange={handleOnChange('text')('info')}
            variant="filled"
          />
          <TextField
            label={t('url')}
            value={payload.url || ''}
            onChange={handleOnChange('text')('url')}
            variant="filled"
          />
          <TextField
            label={t('owner')}
            value={payload.owner || ''}
            onChange={handleOnChange('text')('owner')}
            variant="filled"
          />
          <TextField
            label={t('token_contract')}
            value={payload.token_contract || ''}
            onChange={handleOnChange('text')('token_contract')}
            variant="filled"
          />
          <TextField
            label={t('token_symbol')}
            value={payload.token_symbol || ''}
            onChange={handleOnChange('text')('token_symbol')}
            variant="filled"
          />
          <TextField
            label={t('token_price')}
            value={payload.token_price || ''}
            onChange={handleOnChange('text')('token_price')}
            variant="filled"
          />
          <TextField
            label={t('tokens_on_sale')}
            value={payload.tokens_on_sale || ''}
            onChange={handleOnChange('text')('tokens_on_sale')}
            variant="filled"
          />
          <DateTimePicker
            label={t('launch_date')}
            value={payload.launch_date || new Date()}
            onChange={handleOnChange('date')('launch_date')}
            renderInput={params => <TextField variant="filled" {...params} />}
          />
          <DateTimePicker
            label={t('end_date')}
            value={payload.end_date || new Date()}
            onChange={handleOnChange('date')('end_date')}
            renderInput={params => <TextField variant="filled" {...params} />}
          />
          <TextField
            label={t('project_immidiate_vesting')}
            value={payload.project_immidiate_vesting || ''}
            onChange={handleOnChange('text')('project_immidiate_vesting')}
            variant="filled"
          />
          <TextField
            label={t('project_vesting_days')}
            value={payload.project_vesting_days || ''}
            onChange={handleOnChange('text')('project_vesting_days')}
            variant="filled"
          />
          <TextField
            label={t('investor_immediate_vesting')}
            value={payload.investor_immediate_vesting || ''}
            onChange={handleOnChange('text')('investor_immediate_vesting')}
            variant="filled"
          />
          <TextField
            label={t('investor_vesting_days')}
            value={payload.investor_vesting_days || ''}
            onChange={handleOnChange('text')('investor_vesting_days')}
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

AddPool.propTypes = {}

export default memo(AddPool)
