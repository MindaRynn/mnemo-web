import React from 'react';
import PropTypes from 'prop-types';

class CategoryList extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    let {tags} = this.props;

    // debugger
    return (
      <div className="list col-3 filter-container">Category
        {tags.map((tag, index) => {
          return (
            <div className="filter-list" key={index}>
              <input type="checkbox" className="form-check-input"/>
              <label> {tag.tag} </label>
            </div>
          );
        })}
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
