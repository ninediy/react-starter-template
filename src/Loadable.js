import React from 'react';
import Loadable from 'react-loadable';

import { Loader } from './common/Loader';

const LoadingComponent = props => {
  if (props.error) {
    return (
      <div>
        Error! <button onClick={props.retry}>Retry</button>
      </div>
    );
  } else if (props.timedOut) {
    return (
      <div>
        Taking a long time... <button onClick={props.retry}>Retry</button>
      </div>
    );
  } else if (props.pastDelay) {
    return <Loader />;
  } else {
    return null;
  }
};

export const HomeLoadable = Loadable({
  loader: () => import(/* webpackChunkName: "home" */ './features/Home/Home'),
  loading: LoadingComponent,
  timeout: 5000 // 5 s
  // delay: 0 // .3 s
});

export const ContactLoadable = Loadable({
  loader: () =>
    import(/* webpackChunkName: "contact" */ './features/Contact/Contact'),
  loading: LoadingComponent,
  timeout: 5000 // 5 s
  // delay: 0 // .3 s
});

export const MypageLoadable = Loadable({
  loader: () =>
    import(/* webpackChunkName: "Mypage" */ './features/Mypage/Mypage'),
  loading: LoadingComponent,
  timeout: 5000
});
