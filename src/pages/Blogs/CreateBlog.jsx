import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Markdown from 'react-markdown';
import { createBlog } from 'state/blogs';

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const Editor = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(242, 244, 247, .8);
  margin: 10px;
`;

const Label = styled.label`
  margin: 10px;
 `;

const TextArea = styled.textarea`
  width: 95%;
  height: 400px;
  margin: 10px;
`;

const MarkdownWrapper = styled.div`
  background-color: rgba(2, 43, 53, .9);
  margin: 10px;
  width: 95%;
  height: 400px;
  color: rgba(131, 144, 146, 1);
`;

class CreateBlog extends Component {
  constructor(props) {
    super(props);

    this.state = { name: '', description: null, content: '', group: null };
  }

  handleChange = (key) => e => this.setState({ [key]: e.target.value })

  handleSubmit = e => {
    e.preventDefault();

    const { create } = this.props;
    create(this.state);
  }

  render() {
    return (
      <Container>
        <Editor>
          <form onSubmit={this.handleSubmit}>
            <TextArea required value={this.state.content} onChange={this.handleChange('content')} />
            <Label>Name: <input required type="text" name="name" onChange={this.handleChange('name')} /></Label>
            <Label>Description: <input required type="text" name="description" onChange={this.handleChange('description')} /></Label> <br />
            <select value={this.state.group} onChange={this.handleChange('group')}>
              <option value="grapefruit">Grapefruit</option>
              <option value="lime">Lime</option>
              <option value="coconut">Coconut</option>
              <option value="mango">Mango</option>
            </select>
            <br />
            <input type="submit" value="Submit" />
          </form>
        </Editor>
        <Editor>
          <MarkdownWrapper>
            <Markdown source={this.state.content} />
          </MarkdownWrapper>
        </Editor>
      </Container>
    );
  }
}
CreateBlog.propTypes = {
  create: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  create: blog => dispatch(createBlog(blog))
});

export default connect(null, mapDispatchToProps)(CreateBlog);
