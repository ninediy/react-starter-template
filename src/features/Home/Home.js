import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

// Redux
import { setAppName, getPosts } from './redux';
// Styled Component
import { PostBox } from './../../common/PostBox';
import { Loader } from './../../common/Loader';
// Component
import Pagination from './../../utils/Pagination';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      limit: 8
    };
  }

  changeAppName(name) {
    this.props.setAppName(name);
  }

  doGetPost() {
    this.props.getPosts();
  }

  renderPosts() {
    const { posts } = this.props;
    const { page, limit } = this.state;
    if (this.props.loading) {
      return <Loader />;
    } else if (this.props.posts.length > 0) {
      return posts.slice(limit * (page - 1), limit * page).map(item => {
        return (
          <PostBox key={item.id} hovColor="red">
            <b>{item.title}</b>
            <span>{item.body}</span>
          </PostBox>
        );
      });
    }
  }

  onChangePage(page) {
    this.setState({
      page: page
    });
  }

  onPrevPage() {
    this.setState({
      page: this.state.page - 1
    });
  }

  onNextPage() {
    this.setState({
      page: this.state.page + 1
    });
  }

  render() {
    const { page, limit } = this.state;
    return (
      <div>
        <h1>Home : {this.props.name}</h1>
        <ul>
          <li>Home</li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <hr />
        <h3>Set app name</h3>
        <button onClick={() => this.changeAppName('Garena')}>Garena</button>
        &nbsp;
        <button onClick={() => this.changeAppName('World')}>World</button>
        <hr />
        <button onClick={() => this.doGetPost()}>Fetch Posts</button>
        {this.renderPosts()}
        <br />
        <br />
        <div style={{ textAlign: 'center' }}>
          <Pagination
            sum={this.props.posts.length}
            limit={limit}
            page={page}
            onChangePage={this.onChangePage.bind(this)}
            onPrevPage={this.onPrevPage.bind(this)}
            onNextPage={this.onNextPage.bind(this)}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  name: state.Home.name,
  posts: state.Home.posts,
  loading: state.Home.loading,
  error: state.Home.error
});

const mapDispatchToProps = {
  setAppName,
  getPosts // async action
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
