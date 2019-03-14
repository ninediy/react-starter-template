import React, { Component } from 'react';
import styled from 'styled-components';

const Paginate = styled.div`
  display: inline-block;
  span {
    user-select: none;
    color: black;
    float: left;
    padding: 8px 16px;
    text-decoration: none;
    transition: 0.3s all;
    cursor: pointer;
    margin-left: 1px;
    margin-top: 3px;
    &.active {
      background-color: red;
      border-radius: 5px;
    }
    &:hover {
      background-color: red;
      border-radius: 5px;
    }
  }
`;

export default class Pagination extends Component {
  renderPage(sum, limit, page) {
    const pageNum = Math.ceil(sum / limit);
    return new Array(pageNum).fill(0).map((val, key) => {
      return (
        <Paginate
          key={'page_' + key + 1}
          onClick={() => this.onChangePage(key + 1)}
        >
          <span className={key + 1 === page ? 'active' : ''}>{key + 1}</span>
        </Paginate>
      );
    });
  }

  onChangePage(page) {
    if (this.props.onChangePage) {
      this.props.onChangePage(page);
    }
  }

  onNextPage() {
    if (this.props.page + 1 <= Math.ceil(this.props.sum / this.props.limit)) {
      this.props.onNextPage();
    }
  }

  onPrevPage() {
    if (this.props.page - 1 > 0) {
      this.props.onPrevPage();
    }
  }

  render() {
    const { sum, limit, page } = this.props;
    if (sum > 0) {
      return (
        <div>
          <Paginate onClick={() => this.onPrevPage()}>
            <span>&lt;</span>
          </Paginate>
          {this.renderPage(sum, limit, page)}
          <Paginate onClick={() => this.onNextPage()}>
            <span>&gt;</span>
          </Paginate>
        </div>
      );
    } else {
      return null;
    }
  }
}
