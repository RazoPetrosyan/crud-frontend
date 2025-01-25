import React, { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {
  Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../components/commons/Wrapper';
import { register } from '../store/actions/register';
import passwordRequirements from '../helpers/passwordRequirements';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUsername] = useState('');
  const [errorMessages, setErrorMessages] = useState({
    userName: '',
    email: '',
    password: '',
    repeatPassword: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowRepeatPassword = () => setShowRepeatPassword((show) => !show);

  const handleSubmit = useCallback(async () => {
    let hasError = false;
    const newErrorMessages = {
      userName: '',
      email: '',
      password: '',
      repeatPassword: '',
    };

    if (!userName) {
      newErrorMessages.userName = 'User Name is required';
      hasError = true;
    }
    if (!email) {
      newErrorMessages.email = 'Email is required';
      hasError = true;
    }
    if (!password) {
      newErrorMessages.password = 'Password is required';
      hasError = true;
    }
    if (!repeatPassword) {
      newErrorMessages.repeatPassword = 'Please repeat the password';
      hasError = true;
    }
    if (password && repeatPassword && password !== repeatPassword) {
      newErrorMessages.repeatPassword = 'Passwords do not match';
      hasError = true;
    }

    setErrorMessages(newErrorMessages);

    if (hasError) {
      return;
    }

    const data = { email, userName, password };
    const signUpResult = await dispatch(register(data));
    if (register.fulfilled.match(signUpResult)) {
      navigate('/signin');
    }
  }, [email, userName, password, repeatPassword, dispatch]);

  return (
    <Wrapper>
      <div className="sign__up">
        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete="off"
        >
          <h1 className="sign__up__title">Sign Up</h1>
          <TextField
            value={userName}
            id="outlined-basic"
            label="UserName"
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
            error={Boolean(errorMessages.userName)}
            helperText={errorMessages.userName}
          />
          <TextField
            value={email}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
            error={Boolean(errorMessages.email)}
            helperText={errorMessages.email}
          />
          {password && (
            <ul className="password__req">
              {passwordRequirements.map((requirement) => (
                <li
                  key={requirement.id}
                  style={{
                    color: requirement.test(password) ? 'green' : 'red',
                    textDecoration: requirement.test(password) ? 'line-through' : 'none',
                  }}
                >
                  {requirement.label}
                </li>
              ))}
            </ul>
          )}
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" error={Boolean(errorMessages.password)}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            />
            {errorMessages.password && <p className="input__error">{errorMessages.password}</p>}
          </FormControl>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" error={Boolean(errorMessages.repeatPassword)}>
            <InputLabel htmlFor="repeat-password">Repeat Password</InputLabel>
            <OutlinedInput
              id="repeat-password"
              type={showRepeatPassword ? 'text' : 'password'}
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              endAdornment={(
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showRepeatPassword ? 'hide the password' : 'display the password'}
                    onClick={handleClickShowRepeatPassword}
                    edge="end"
                  >
                    {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )}
              label="Repeat Password"
            />
            {errorMessages.repeatPassword && <p className="input__error">{errorMessages.repeatPassword}</p>}
          </FormControl>
          <Stack spacing={2} direction="row">
            <Button variant="outlined" onClick={handleSubmit}>Sign Up</Button>
          </Stack>
        </Box>
      </div>
    </Wrapper>
  );
}

export default SignUp;
