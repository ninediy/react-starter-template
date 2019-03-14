import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setUsername, getPosts } from './redux';
import { Loader } from '../../common/Loader';

class Mypage extends Component {
  setUsername(name) {
    this.props.setUsername(name);
  }

  componentDidMount() {
    console.log('posts', this.props.posts);
  }

  render() {
    return (
      <div>
        <Loader />
        <h1>My page</h1>
        <h2>username: {this.props.username}</h2>
        <hr />

        <button onClick={() => this.setUsername('yong')}>yong</button>
        <button onClick={() => this.setUsername('jomm')}>jomm</button>
        <button onClick={() => this.setUsername('haris')}>haris</button>

        <hr />

        <button
          disabled={this.props.loading}
          onClick={() => this.props.getPosts()}
        >
          Fetch
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: state.Mypage.username,
  posts: state.Mypage.posts,
  loading: state.Mypage.loading
});

const mapDispatchToProps = {
  setUsername,
  getPosts
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Mypage);
