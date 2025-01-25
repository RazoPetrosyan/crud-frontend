import React, { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {
  Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../components/commons/Wrapper';
import { signIn } from '../store/actions/signIn';

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    email: '',
    password: '',
  });
  const { token, user } = useSelector((state) => state.signIn);

  useEffect(() => {
    if (token) {
      navigate('/home');
      window.location.reload();
      sessionStorage.setItem('token', token);
    }
  }, [token]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = useCallback(async () => {
    setEmailError(false);
    setPasswordError(false);
    const newErrorMessages = {
      email: '',
      password: '',
    };

    let hasError = false;
    if (!email) {
      setEmailError(true);
      newErrorMessages.email = 'Email is required';
      hasError = true;
    }
    if (!password) {
      setPasswordError(true);
      newErrorMessages.password = 'Password is required';
      hasError = true;
    }

    setErrorMessages(newErrorMessages);

    if (hasError) return;
    const signInResult = await dispatch(signIn({
      email,
      password,
    }));
    console.log(signInResult);
    console.log(token, user);
  }, [email, password, dispatch]);

  return (
    <Wrapper>
      <div className="sign__in">
        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete="off"
        >
          <h1 className="sign__in__title">Sign In</h1>
          <TextField
            value={email}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            helperText={emailError ? 'Email is required' : ''}
          />
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              endAdornment={(
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPassword ? 'hide the password' : 'display the password'}
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )}
              label="Password"
              helperText={passwordError ? 'Password is required' : ''}
            />
            {errorMessages.password && <p className="input__error">{errorMessages.password}</p>}
          </FormControl>
          <a className="sign__in__forgot" href="/">Forgot Password?</a>
          <Stack spacing={2} direction="row">
            <Button variant="outlined" onClick={handleSubmit}>Sign In</Button>
          </Stack>
        </Box>
      </div>
    </Wrapper>
  );
}

export default SignIn;
