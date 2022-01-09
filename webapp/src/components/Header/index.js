import React, { memo, useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useLocation, useHistory } from 'react-router-dom'
import Hidden from '@mui/material/Hidden'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import LanguageIcon from '@mui/icons-material/Language'
import FingerprintIcon from '@mui/icons-material/Fingerprint'
import AccountIcon from '@mui/icons-material/AccountCircle'
import ExitIcon from '@mui/icons-material/ExitToApp'
import MoreIcon from '@mui/icons-material/MoreVert'
import { Sun as SunIcon, Moon as MoonIcon } from 'react-feather'

import { useSharedState } from '../../context/state.context'
import { mainConfig } from '../../config'
import PageTitle from '../PageTitle'

import styles from './styles'

const useStyles = makeStyles(styles)

const SwitchThemeModeButton = memo(({ useDarkMode, onSwitch }) => {
  const { t } = useTranslation('header')

  return (
    <Button
      startIcon={useDarkMode ? <SunIcon /> : <MoonIcon />}
      onClick={() => onSwitch(!useDarkMode)}
    >
      {t(useDarkMode ? 'lightMode' : 'darkMode')}
    </Button>
  )
})

SwitchThemeModeButton.displayName = 'SwitchThemeModeButton'

SwitchThemeModeButton.propTypes = {
  useDarkMode: PropTypes.bool,
  onSwitch: PropTypes.func
}

const LanguageButton = memo(({ current, onChange }) => {
  const [languageAnchorEl, setLanguageAnchorEl] = useState(null)
  const languages = [
    {
      value: 'en',
      label: 'EN'
    },
    {
      value: 'es',
      label: 'ES'
    }
  ]

  const handleLanguajeMenuOpen = event => {
    setLanguageAnchorEl(event.currentTarget)
  }

  const handleLanguajeMenuClose = language => {
    setLanguageAnchorEl(null)
    typeof language === 'string' && onChange && onChange(language)
  }

  return (
    <>
      <Button startIcon={<LanguageIcon />} onClick={handleLanguajeMenuOpen}>
        {(current || '').toUpperCase()}
      </Button>
      <Menu
        keepMounted
        anchorEl={languageAnchorEl}
        open={!!languageAnchorEl}
        onClose={handleLanguajeMenuClose}
      >
        {languages.map(language => (
          <MenuItem
            key={`language-menu-${language.value}`}
            onClick={() => handleLanguajeMenuClose(language.value)}
          >
            {language.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
})

LanguageButton.propTypes = {
  current: PropTypes.string,
  onChange: PropTypes.func
}

const UserButton = memo(({ user }) => (
  <>{user && <Button startIcon={<AccountIcon />}>{user.accountName}</Button>}</>
))

UserButton.displayName = 'UserButton'

UserButton.propTypes = {
  user: PropTypes.any
}

const AuthButton = memo(({ user, onLogin, onSignOut }) => {
  const { t } = useTranslation()

  return (
    <>
      {user && (
        <Button startIcon={<ExitIcon />} onClick={onSignOut}>
          {t('signOut')}
        </Button>
      )}
      {!user && (
        <Button startIcon={<FingerprintIcon />} onClick={onLogin}>
          {t('login')}
        </Button>
      )}
    </>
  )
})

AuthButton.displayName = 'AuthButton'

AuthButton.propTypes = {
  user: PropTypes.any,
  onLogin: PropTypes.func,
  onSignOut: PropTypes.func
}

const Header = memo(({ onDrawerToggle }) => {
  const classes = useStyles()
  const { t } = useTranslation('routes')
  const history = useHistory()
  const location = useLocation()
  const [state, { setState, login, logout }] = useSharedState()
  const { i18n } = useTranslation('translations')
  const [currentLanguaje, setCurrentLanguaje] = useState()
  const [menuAnchorEl, setMenuAnchorEl] = useState()

  const handleSwitchThemeMode = useDarkMode => {
    setState({ useDarkMode })
  }

  const handleChangeLanguage = languaje => i18n.changeLanguage(languaje)

  const handleLogin = () => {
    login()
  }

  const handleSignOut = () => {
    logout()
    history.push('/')
  }

  const handleOpenMenu = event => {
    setMenuAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setMenuAnchorEl(null)
  }

  useEffect(() => {
    setCurrentLanguaje(i18n.language?.substring(0, 2) || 'en')
  }, [i18n.language])

  return (
    <AppBar className={classes.appBar} position="sticky">
      <Toolbar className={classes.toolbar}>
        <Hidden mdUp>
          <IconButton aria-label="Open drawer" onClick={onDrawerToggle}>
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Typography className={classes.typography} variant="h4">
          {t(`${location.pathname}>heading`, '')}
        </Typography>
        <PageTitle title={t(`${location.pathname}>title`, mainConfig.title)} />
        <Box className={classes.desktopSection}>
          <SwitchThemeModeButton
            useDarkMode={state.useDarkMode}
            onSwitch={handleSwitchThemeMode}
          />
          <LanguageButton
            current={currentLanguaje}
            onChange={handleChangeLanguage}
          />
          <UserButton user={state.user} />
          <AuthButton
            user={state.user}
            onLogin={handleLogin}
            onSignOut={handleSignOut}
          />
        </Box>
        <Box className={classes.mobileSection}>
          <IconButton
            aria-label="show more"
            aria-haspopup="true"
            onClick={handleOpenMenu}
          >
            <MoreIcon />
          </IconButton>
        </Box>
      </Toolbar>
      <Menu
        anchorEl={menuAnchorEl}
        open={!!menuAnchorEl}
        onClose={handleCloseMenu}
      >
        <MenuItem>
          <SwitchThemeModeButton
            useDarkMode={state.useDarkMode}
            onSwitch={handleSwitchThemeMode}
          />
        </MenuItem>
        <MenuItem>
          <LanguageButton
            current={currentLanguaje}
            onChange={handleChangeLanguage}
          />
        </MenuItem>
        {state.user && (
          <MenuItem>
            <UserButton user={state.user} />
          </MenuItem>
        )}
        <MenuItem>
          <AuthButton
            user={state.user}
            onLogin={handleLogin}
            onSignOut={handleSignOut}
          />
        </MenuItem>
      </Menu>
    </AppBar>
  )
})

Header.displayName = 'Header'

Header.propTypes = {
  onDrawerToggle: PropTypes.func
}

export default Header
