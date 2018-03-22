import React, {Component} from 'react';
import PropTypes from 'prop-types';

import WithBlogs from 'components/HoC/WithBlogs';

class Blogs extends Component {
  render() {
    return (
      <div>
        <h1>
          Blogs
        </h1>
      </div>
    );
  }
}
Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
};

export default WithBlogs(Blogs);
