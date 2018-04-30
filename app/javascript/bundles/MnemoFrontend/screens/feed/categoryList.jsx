import React from 'react';
import PropTypes from 'prop-types';

class CategoryList extends React.Component {

  constructor(props) {
    super(props)

    this.state = {checkedList: []}

    this._checkboxChangeHandler = this._checkboxChangeHandler.bind(this);
  }

  _checkboxChangeHandler(e) {
    let {checkedList} = this.state;
    let {actions} = this.props;

    if(e.target.checked) {
      this.setState({
        checkedList: checkedList.concat(e.target.value)
      })

      actions.filterByTag(checkedList.concat(e.target.value))
    } else {

      let newCheckedList = checkedList.filter(function(value, arrIndex) {return value !== e.target.value})

      this.setState({checkedList: newCheckedList})

      actions.filterByTag(newCheckedList)
    }
  }

  render() {
    let {tags} = this.props;

    // debugger
    return (
      <div className="list col-3 filter-container">Category
        {tags.map((tag, index) => {
          return (
            <div className="filter-list" key={index}>
              <input type="checkbox" className="form-check-input" onChange={e => this._checkboxChangeHandler(e)} value={tag.tag} />
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
