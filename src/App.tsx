import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import createStore from './store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import MultiChart from './components/MultiChart';
import Switches from './components/Switches';
import Wrapper from './components/Wrapper';
import MultipleMetrics from './Features/MultipleMetrics/multipleMetrics';
import Subscription from './Features/Subscription/subscription';
const store = createStore();
const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'rgb(226,231,238)',
    },
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <Wrapper>
        <MultipleMetrics />
        <Subscription />
        <Header />
        <Switches />
        <MultiChart />
        <ToastContainer />
      </Wrapper>
    </Provider>
  </MuiThemeProvider>
);

export default App;
