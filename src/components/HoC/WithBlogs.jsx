import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {loadBlogs} from 'state/blogs';

const WithBlogs = WrappedComponent => {
  class WithBlogsClass extends React.Component {
    static propTypes = {
      blogs: PropTypes.array,
      isBlogsLoaded: PropTypes.bool,
      load: PropTypes.func.isRequired,
      params: PropTypes.object.isRequired,
    };

    componentDidMount() {
      const {isBlogsLoaded, load} = this.props;
      if (!isBlogsLoaded) {
        load();
      }
    }

    render() {
      const {blogs, isBlogsLoaded, params} = this.props;
      const blog = params.blogId ? blogs.filter(b => b.id === params.blogId) : null;
      return isBlogsLoaded ? <WrappedComponent {...this.props} blogs={blogs} blog={blog ? blog[0] : null} /> : null;
    }
  }

  const mapStateToProps = state => {
    return {
      blogs: state.blogs.all,
      isBlogsLoaded: state.blogs.loaded,
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      load: () => dispatch(loadBlogs()),
    };
  };
  return connect(mapStateToProps, mapDispatchToProps)(WithBlogsClass);
};

export default WithBlogs;
