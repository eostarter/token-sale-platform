import React, { memo } from 'react'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'

import { mainConfig } from '../../config'

import styles from './styles'

const useStyles = makeStyles(styles)

const Footer = () => {
  const classes = useStyles()

  if (!mainConfig.footerLinks?.length) {
    return <></>
  }

  return (
    <Box className={classes.root}>
      <Grid container item xs={12}>
        <List>
          {mainConfig.footerLinks.map((link, index) => (
            <ListItem className={classes.listItem} key={index}>
              <ListItemText
                primary={
                  <a href={link.src} target="_blank" rel="noopener noreferrer">
                    {link.text}
                  </a>
                }
              />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Box>
  )
}

export default memo(Footer)
