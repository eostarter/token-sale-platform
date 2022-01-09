import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const Home = () => {
  const { t } = useTranslation('homeRoute')

  return (
    <Box>
      <Typography>{t('welcomeMessage')}</Typography>
    </Box>
  )
}

Home.propTypes = {}

export default memo(Home)
