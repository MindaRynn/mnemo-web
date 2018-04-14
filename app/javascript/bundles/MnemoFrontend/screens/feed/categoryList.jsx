import React from 'react';
import PropTypes from 'prop-types';

class CategoryList extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="list col-4">
        Category
      </div>
    );
  }
}

CategoryList.contextTypes = {
  /**
   * Holds the current logged in user
   * */
  currentUser: PropTypes.object.isRequired
};

export default CategoryList;