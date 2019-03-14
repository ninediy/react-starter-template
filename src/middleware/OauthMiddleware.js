import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getParam, setCookie, getCookie, delCookie } from './../utils/Tools';
import { getJwtToken, setLoginUrl, setLogoutUrl } from '../features/redux';
import { Loader } from '../common/Loader';

import styled from 'styled-components';

const OauthFail = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  text-align: center;
  line-height: 100vh;
  h4 {
    color: red;
    margin-top: 40px;
  }
`;

class OauthMiddleware extends Component {
  componentWillMount() {
    this.checkLogin();
  }

  componentDidMount() {
    /* 
                let currentLoc = window.location.href.toString();
                currentLoc =
                    currentLoc.substring(currentLoc.length - 1) === '/'
                        ? currentLoc
                        : currentLoc + '/';
         */
    const loginUrl = `${
      process.env.REACT_APP_OAUTH_URL
    }/oauth/login?response_type=token&client_id=${
      process.env.REACT_APP_OAUTH_APP_ID
    }&redirect_uri=https://auth.garena.in.th/login/callback/${
      process.env.REACT_APP_OAUTH_APP_NAME
    }/&locale=${process.env.REACT_APP_LOCALE}&all_platforms=1&platform=${
      process.env.REACT_APP_OAUTH_PLATFORM
    }`;

    this.props.setLoginUrl(loginUrl);
  }

  login() {
    setCookie(
      process.env.REACT_APP_OAUTH_COOKIE_NAME,
      this.props.sessionKey,
      30,
      process.env.REACT_APP_OAUTH_COOKIE_DOMAIN
    );
    let uri = window.location.href.substring(
      0,
      window.location.href.lastIndexOf('?')
    ); // get rid of the query string
    window.location.href = uri; // we need hard refresh
  }

  logout() {
    if (this.props.logoutUrl) {
      window.location.href = this.props.logoutUrl;
    } else {
      const oauthToken = getCookie('oauth_token');
      const logoutUrl = `${
        process.env.REACT_APP_OAUTH_URL
      }/oauth/logout?access_token=${oauthToken}`;
      window.location.href = logoutUrl;
    }
    delCookie(
      process.env.REACT_APP_OAUTH_COOKIE_NAME,
      process.env.REACT_APP_OAUTH_COOKIE_DOMAIN
    );
  }

  checkLogin() {
    var oauthParam = getParam('access_token') || getParam('token');
    var oauthCookie = getCookie('oauth_token');
    var sTicket = getParam('sTicket');
    var sTicketCookie = getCookie('detect');

    if (oauthParam && oauthParam.length > 0) {
      setCookie('oauth_token', oauthParam, 1);
      if (typeof sTicket !== 'undefined') {
        if (sTicket !== '') {
          setCookie('detect', '532c28d5412dd75bf975fb951c740a30', 1);
        }
      }
      var url = window.location.href.substring(
        0,
        window.location.href.lastIndexOf('?')
      ); // get rid of the query string
      window.location.href = url; // we need hard refresh
    } else {
      if (typeof sTicketCookie === 'undefined') {
        sTicketCookie = 'test';
      }
      if (oauthCookie) {
        this.props.getJwtToken({
          sTicketCookie: sTicketCookie,
          oauthCookie: oauthCookie
        });
      }
    }
  }

  render() {
    const { jwtError, jwtToken, jwtLoading } = this.props;
    if (jwtLoading) {
      return <Loader />;
    } else if (jwtError || jwtToken === undefined) {
      return (
        <OauthFail>
          <Loader />
          <h4>Please try again later _/\_</h4>
        </OauthFail>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => ({
  jwtError: state.Main.error,
  jwtToken: state.Main.jwtToken,
  jwtLoading: state.Main.loading,
  loginUrl: state.Main.loginUrl,
  logoutUrl: state.Main.logoutUrl
});

const mapDispatchToProps = {
  getJwtToken,
  setLoginUrl,
  setLogoutUrl
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OauthMiddleware);
