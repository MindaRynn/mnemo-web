import React from "react";

export default class DropdownButton extends React.Component {
  handleChange() {
    $("#tableMenu a").click(function(e) {
      e.preventDefault(); // cancel the link behaviour
      let selText = $(this).text();
      $("#tableButton").text(selText);
    });
  }

  render() {
    let { values } = this.props;

    return (
      <div>
        <div id="tableDiv" className="dropdown">
          <button
            id="tableButton"
            className="btn btn-dropdown"
            type="button"
            data-toggle="dropdown"
            onClick={this.handleChange}
          >
            {values[0]}
          </button>
          <ul id="tableMenu" className="dropdown-menu">
            {values.map(value => (
              <li key={value}>
                <a href="#">{value}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
