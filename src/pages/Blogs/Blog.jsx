import React, {Component} from 'react';
import {isNil} from 'ramda';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import WithBlogs from 'components/HoC/WithBlogs';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  padding: 10px;
`;

const BlogPost = styled.div`
  width: 100%;
  height: 100%;
  color: black;
  margin: 10px;
`;

const Title = styled.div`
  background-color: rgba(242, 244, 247, .8);
  padding: 5px;
`;

const Content = styled.div`
  margin: 10px;
  background-color: rgba(242, 244, 247, .8);
  padding: 5px;
  height: 100%;
`;

class Blog extends Component {
  render() {
    const {blog, toBlogs} = this.props;

    // didn't find this specific blog, so take back to main view
    if (isNil(blog)) {
      toBlogs();
    }

    return (
      <Container>
        <BlogPost key={blog.id}>
          <Title>
            <h1>{blog.title}</h1>
            {blog.description && <h5>{blog.description}</h5>}
          </Title>
          <hr />
          <Content>
            <Markdown source={blog.content} />
          </Content>
        </BlogPost>
      </Container>
    );
  }
}
Blog.propTypes = {
  blog: PropTypes.object,
  toBlogs: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  toBlogs: () => dispatch(push('/blogs')),
});

export default connect(null, mapDispatchToProps)(WithBlogs(Blog));
