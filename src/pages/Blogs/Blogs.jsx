import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import WithBlogs from 'components/HoC/WithBlogs';
import WithGroups from 'components/HoC/WithGroups';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const BlogContainer = styled.div`
  display: flex;
  margin: 10px;
  flex-wrap: wrap;
  width: 85%;
`;

const GroupContainer = styled.div`
  width: 15%;
  background-color: rgba(242, 244, 247, .8);
  margin: 10px;
`;

const BlogPost = styled.div`
  cursor: pointer;
  width: 300px;
  height: 200px;
  background-color: rgba(242, 244, 247, .8);
  color: black;
  margin: 5px;
  text-align: center;
`;

const Title = styled.h3`
  text-align: center;
`;

const Groups = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 5px;
`;

const Group = styled.li`
  display: flex;
  margin: 5px 0 5px 0;
  cursor: pointer;
`;

class Blogs extends Component {
  render() {
    const { blogs, groups, router } = this.props;
    return (
      <Container>
        <BlogContainer>
          {blogs.map(blog => {
            return (
              <BlogPost onClick={() => router.push(`/blogs/${blog.id}`)} key={blog.id}>
                <h1>{blog.title}</h1>
                {blog.description && <h5>{blog.description}</h5>}
                <i>Author: {blog.author}</i>
              </BlogPost>
            );
          })}
        </BlogContainer>
        <GroupContainer>
          <Title>Groups</Title>
          <Groups>
            {groups.map(group => {
              return (
                <Group>
                  {group.is_member && <FontIcon className="material-icons">flight_takeoff</FontIcon>}
                  <p>{group.name}</p>
                </Group>
              );
            })}
          </Groups>
        </GroupContainer>
      </Container>
    );
  }
}
Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  groups: PropTypes.array.isRequired,
  router: PropTypes.object.isRequired,
};

export default withRouter(WithGroups(WithBlogs(Blogs)));
