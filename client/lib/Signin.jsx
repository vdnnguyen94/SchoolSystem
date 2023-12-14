import React, {useState} from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import auth from './auth-helper.js'
import {Navigate} from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import {signin} from './api-auth.js'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2),
    // Increase the button size by setting padding and font size
    padding: theme.spacing(2),
    fontSize: '1.2rem',
    width: '300px',
  },
  resetButton: {
    marginLeft: 'auto',
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(1),
    fontSize: '0.6rem',
  },
  
}))

export default function Signin(props) {
  const location = useLocation();
  console.log(location.state)
  const classes = useStyles()
  const [values, setValues] = useState({
      username: '',
      password: '',
      error: '',
      redirectToReferrer: false
  })

  const clickSubmit = () => {
    const user = {
      username: values.username || undefined,
      password: values.password || undefined
    }
console.log(user)
    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error})
      } else {
        console.log(data)
        auth.authenticate(data, () => {
          setValues({ ...values, error: '',redirectToReferrer: true})
        })
      }
    })
  }


  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const {from} = location.state || {
      from: {
        pathname: '/'
      }
  }
  const {redirectToReferrer} = values
  const resetPassword = () => {
    // Redirect the user to the reset password page
    props.history.push('/resetpassword');
  };
  if (redirectToReferrer) {
    return <Navigate to={from}/>;
      
  }

  return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Sign In
          </Typography>
          <TextField id="username" type="username" label="username" className={classes.textField} value={values.username} onChange={handleChange('username')} margin="normal"/><br/>
          <TextField id="password" type="password" label="Password" className={classes.textField} value={values.password} onChange={handleChange('password')} margin="normal"/>
          <br/> {
            values.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {values.error}
            </Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>LOG IN</Button>
          
        </CardActions>
        <a href="/resetpassword" className={classes.resetButton}>
          <Button color="primary" variant="contained">
            Reset Password
          </Button>
        </a>
      </Card>
    )
}
