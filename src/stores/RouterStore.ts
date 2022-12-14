import { createBrowserHistory } from 'history';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { generatePath } from 'react-router';

export default class CustomRouterStore extends RouterStore {
  constructor() {
    super();
    const browserHistory = createBrowserHistory();

    this.history = syncHistoryWithStore(browserHistory, this);
  }

  goTo(path: string, params: Record<string, string | number> = {}) {
    this.push(this.generatePath(path, params));
  }

  generatePath(route: string, params: Record<string, string | number> = {}) {
    return generatePath(route, params);
  }
}
