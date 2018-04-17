import React from 'react';
import PropTypes from 'prop-types';

class CategoryList extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="list col-3 filter-container">
        Category
        <div className="filter-list">
          <input type="checkbox" className="form-check-input" id=""/>
          <label> Event </label>
        </div>
        <div className="filter-list">
          <input type="checkbox" className="form-check-input" id=""/>
          <label> Life style </label>
        </div>
        <div className="filter-list">
          <input type="checkbox" className="form-check-input" id=""/>
          <label> People </label>
        </div>
        <div className="filter-list" data-toggle="collapse" href="#sub-filter-list">
          <input type="checkbox" className="form-check-input" id=""/>
          <label> Emotion </label>
        </div>
        <div id="sub-filter-list" className="collapse">
          <div className="sub-filter-list">
            <input type="checkbox" className="form-check-input" id=""/>
            <label> Happy </label>
          </div>
          <div className="sub-filter-list">
            <input type="checkbox" className="form-check-input" id=""/>
            <label> Love </label>
          </div>
          <div className="sub-filter-list">
            <input type="checkbox" className="form-check-input" id=""/>
            <label> Funny </label>
          </div>
          <div className="sub-filter-list">
            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
            <label> Sad </label>
          </div>
        </div>
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
