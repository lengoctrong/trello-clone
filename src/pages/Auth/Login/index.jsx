import GoogleIcon from '@mui/icons-material/Google'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { useGoogleLogin } from '@react-oauth/google'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { loginUser } from '../../../redux/apiRequest'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const login = useGoogleLogin({
    onSuccess: async (res) => {
      const accessToken = res.access_token
      try {
        loginUser(dispatch, navigate, accessToken)
      } catch (err) {
        console.log(err)
      }
    }
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    // const data = new FormData(event.currentTarget)
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password')
    // })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <NavLink to="/">Go back</NavLink>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 1 }}>
            <Typography variant="h6">OR</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              onClick={() => login()}
              style={{ display: 'flex', gap: 1, alignItems: 'center' }}
            >
              Login with Google <GoogleIcon />
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default Login
