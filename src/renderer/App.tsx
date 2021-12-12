import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import ApiIcon from '@mui/icons-material/Api';
import {
  Typography,
  Stack,
  Box,
  Button,
  TextField,
  MenuItem,
  Paper,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import './App.css';

function RestApi() {
  const { enqueueSnackbar } = useSnackbar();
  const [axiosFields, setAxiosFields] = useState({
    options: ['get', 'post', 'put', 'delete'],
    selected: 'get',
    url: '',
    responseData: {},
    responseFlag: false,
  });

  const handleChange = (event) => {
    const [key, value] = [event.target.name, event.target.value];
    setAxiosFields({ ...axiosFields, [key]: value });
  };

  const handleClick = async () => {
    try {
      let response = {};
      if (axiosFields.selected === 'get') {
        response = await axios.get(axiosFields.url);
      } else if (axiosFields.selected === 'post') {
        response = await axios.post(axiosFields.url);
      } else if (axiosFields.selected === 'put') {
        response = await axios.put(axiosFields.url);
      } else if (axiosFields.selected === 'delete') {
        response = await axios.delete(axiosFields.url);
      }
      setAxiosFields({
        ...axiosFields,
        responseData: response,
        responseFlag: true,
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        enqueueSnackbar(error.response.data.message, { variant: 'error' });
        // console.log(e.response.data.message);
      } else {
        enqueueSnackbar(
          'Check that the backend is running, reachable and returns valid JSON.',
          {
            variant: 'error',
          }
        );
      }
      return null;
    }
  };

  return (
    <>
      <Paper sx={{ maxWidth: 1000, height: '100%', margin: 'auto' }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <TextField
            name="url"
            placeholder="https://jsonplaceholder.typicode.com/todos/"
            margin="dense"
            label="URL"
            helperText="Enter url to check response"
            fullWidth
            value={axiosFields.url}
            onChange={handleChange}
            sx={{ maxWidth: 650, marginTop: 6 }}
          />
          <Stack direction="row" alignItems="center" sx={{ m: 2 }}>
            <TextField
              name="selected"
              select
              value={axiosFields.selected}
              onChange={handleChange}
            >
              {axiosFields.options.map((option) => (
                <MenuItem value={option}>{option.toUpperCase()}</MenuItem>
              ))}
            </TextField>
            <Button
              variant="contained"
              sx={{ p: 2, m: 1 }}
              onClick={handleClick}
            >
              Send
            </Button>
          </Stack>
          {axiosFields.responseFlag && (
            <Box
              id="response"
              className="responseClass"
              sx={{ maxWidth: 1000 }}
            >
              <Typography
                variant="h5"
                gutterBottom
                component="div"
                className="card card-body"
              >
                Status: {axiosFields.responseData.status}
              </Typography>

              <Box className="card mt-3">
                <Typography
                  variant="h5"
                  gutterBottom
                  component="div"
                  className="card-header"
                >
                  Headers
                </Typography>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  component="div"
                  className="card-body"
                >
                  <pre>
                    {JSON.stringify(axiosFields.responseData.headers, null, 2)}
                  </pre>
                </Typography>
              </Box>

              <Box className="card mt-3">
                <Typography
                  variant="h5"
                  gutterBottom
                  component="div"
                  className="card-header"
                >
                  Data
                </Typography>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  component="div"
                  className="card-body"
                >
                  <pre>
                    {JSON.stringify(axiosFields.responseData.data, null, 2)}
                  </pre>
                </Typography>
              </Box>

              <Box className="card mt-3">
                <Typography
                  variant="h5"
                  gutterBottom
                  component="div"
                  className="card-header"
                >
                  Config
                </Typography>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  component="div"
                  className="card-body"
                >
                  <pre>
                    ${JSON.stringify(axiosFields.responseData.config, null, 2)}
                  </pre>
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Paper>
    </>
  );
}

function Header() {
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ background: '#0c263b', color: '#0ef0f0' }}
      >
        <Typography variant="h4" component="div">
          REST Api Client
        </Typography>
        <ApiIcon sx={{ paddingLeft: 2 }} />
      </Stack>
    </>
  );
}

const RestApiClient = () => {
  return (
    <div>
      <Header />
      <RestApi />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={RestApiClient} />
      </Switch>
    </Router>
  );
}
