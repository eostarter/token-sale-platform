export default theme => ({
  form: {
    display: 'flex',
    justifyContent: 'center'
  },
  card: {
    width: '100%',
    maxWidth: 320
  },
  fields: {
    display: 'flex',
    flexDirection: 'column',
    '& > div, & > label': {
      marginBottom: theme.spacing(2)
    }
  }
})
