import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {loadBlogs} from 'state/blogs';

const WithBlogs = WrappedComponent => {
  class WithBlogsClass extends React.Component {
    static propTypes = {
      isBlogsLoaded: PropTypes.bool,
      load: PropTypes.func.isRequired,
      blogs: PropTypes.array,
    };

    componentDidMount() {
      const {isBlogsLoaded, load} = this.props;
      if (!isBlogsLoaded) {
        load();
      }
    }

    render() {
      const {isBlogsLoaded, blogs} = this.props;
      return isBlogsLoaded ? <WrappedComponent {...this.props} blogs={blogs} /> : null;
    }
  }

  const mapStateToProps = state => {
    return {
      isBlogsLoaded: state.blogs.loaded,
      blogs: state.blogs.all,
    };
  };

  const mapDispatchToProps = dispatch => {
    return {load: () => dispatch(loadBlogs())};
  };
  return connect(mapStateToProps, mapDispatchToProps)(WithBlogsClass);
};

export default WithBlogs;
