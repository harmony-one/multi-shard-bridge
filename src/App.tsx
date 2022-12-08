import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { baseTheme } from 'themes';
import { GlobalStyle } from './GlobalStyle';
import { Providers } from './Providers';
import { Redirect, Route, Switch } from 'react-router';
import { ActionModals } from './components/ActionModals';
import { TransferPage } from './pages/Transfer/TransferPage';
import { routes } from './constants/routePaths';
import { WatcherBalance } from './components/WatcherBalance';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Disclaimer } from './components/DisclaimerWarning';

const App: React.FC = () => (
  <ErrorBoundary>
    <Providers>
      <Switch>
        <Route exact path={routes.home} component={TransferPage} />
        <Redirect to={routes.home} />
      </Switch>
      <Disclaimer />
      <WatcherBalance />
      <ActionModals />
      <GlobalStyle theme={...baseTheme as any} />
    </Providers>
  </ErrorBoundary>
);

export default hot(App);
