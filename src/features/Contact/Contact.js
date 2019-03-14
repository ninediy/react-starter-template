import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

// Redux
import { setContactLocation } from './redux';

class Contact extends Component {
  render() {
    return (
      <div>
        <h1>Contact</h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>Contact</li>
        </ul>
        <hr />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  contact_location: state.Contact.contact_location
});

const mapDispatchToProps = {
  setContactLocation
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Contact)
);
