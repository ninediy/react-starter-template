import React, { Component } from 'react';

import { Loader } from './../common/Loader';

const isEmpty = prop =>
  prop === null ||
  prop === undefined ||
  (prop.hasOwnProperty('length') && prop.length === 0) ||
  (prop.constructor === Object && Object.keys(prop).length === 0);

const LoadingHOC = loadingProp => WrappedComponent => {
  return class LoadingHOC extends Component {
    componentDidMount() {
      this.startTimer = Date.now();
    }

    componentWillUpdate(nextProps) {
      if (!isEmpty(nextProps[loadingProp])) {
        this.endTimer = Date.now();
      }
    }

    render() {
      const myProps = {
        loadingTime: ((this.endTimer - this.startTimer) / 1000).toFixed(2)
      };

      if (isEmpty(this.props[loadingProp])) {
        return <Loader />;
      } else {
        return <WrappedComponent {...this.props} {...myProps} />;
      }
    }
  };
};

export default LoadingHOC;
