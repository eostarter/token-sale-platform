import React from 'react'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import { useTranslation } from 'react-i18next'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

import styles from './styles'

const useStyles = makeStyles(styles)

const About = () => {
  const classes = useStyles()
  const { t } = useTranslation('aboutRoute')

  return (
    <Box>
      <Grid container direction="column">
        <Grid item xs>
          <Grid container direction="column">
            <Typography variant="h3" className={classes.title}>
              {t('title')}
            </Typography>
            <Typography variant="h4">{t('subtitle1')}</Typography>
            <Typography variant="body2" align="justify" paragraph>
              {t('paragraph1')}
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs>
          <Grid container direction="column">
            <Typography variant="h4">{t('subtitle2')}</Typography>
            <Typography variant="body2" align="justify" paragraph>
              {t('paragraph2')}
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs>
          <Grid container direction="column">
            <Typography variant="h4">{t('subtitle3')}</Typography>
            <Typography variant="body2" align="justify" paragraph>
              {t('paragraph3')}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default About
