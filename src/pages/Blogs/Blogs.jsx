import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import WithBlogs from 'components/HoC/WithBlogs';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  padding: 10px;
  flex-wrap: wrap;
`;

const BlogPost = styled.div`
  cursor: pointer;
  width: 400px;
  height: 150px;
  background-color: rgba(242, 244, 247, .8);
  color: black;
  margin: 10px;
  text-align: center;
`;

class Blogs extends Component {
  render() {
    const {blogs, router} = this.props;
    return (
      <Container>
        {blogs.map(blog => {
          return (
            <BlogPost onClick={() => router.push(`/blogs/${blog.id}`)} key={blog.id}>
              <h1>{blog.title}</h1>
              {blog.description && <h5>{blog.description}</h5>}
              <i>Author: {blog.author}</i>
            </BlogPost>
          );
        })}
      </Container>
    );
  }
}
Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  router: PropTypes.object.isRequired,
};

export default withRouter(WithBlogs(Blogs));
