import { createBrowserHistory, BrowserHistory } from "history";
import { useLayoutEffect, useState } from "react";
import { Router } from "react-router-dom";

interface ICustomRouter {
  history: BrowserHistory;
}

const CustomRouter: React.FC<ICustomRouter> = ({ history, ...props }) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      {...props}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
};

export default CustomRouter;

export const history = createBrowserHistory();
