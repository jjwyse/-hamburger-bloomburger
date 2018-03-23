import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadGroups } from 'state/groups';

const WithGroups = WrappedComponent => {
  class WithGroupsClass extends React.Component {
    static propTypes = {
      groups: PropTypes.array,
      isGroupsLoaded: PropTypes.bool,
      load: PropTypes.func.isRequired,
      params: PropTypes.object.isRequired,
    };

    componentDidMount() {
      const { isGroupsLoaded, load } = this.props;
      if (!isGroupsLoaded) {
        load();
      }
    }

    render() {
      const { groups, isGroupsLoaded, params } = this.props;
      const group = params.groupId ? groups.filter(b => b.id === params.groupId) : null;
      return isGroupsLoaded ? <WrappedComponent {...this.props} groups={groups} group={group ? group[0] : null} /> : null;
    }
  }

  const mapStateToProps = state => {
    return {
      groups: state.groups.all,
      isGroupsLoaded: state.groups.loaded,
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      load: () => dispatch(loadGroups()),
    };
  };
  return connect(mapStateToProps, mapDispatchToProps)(WithGroupsClass);
};

export default WithGroups;
