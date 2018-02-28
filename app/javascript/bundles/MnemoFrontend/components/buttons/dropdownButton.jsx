import React from 'react'

class DropdownButton extends React.Component {
    constructor(props) {
        super(props)
    }

    handleChange() {
        $("#tableMenu a").click(function(e){
            e.preventDefault(); // cancel the link behaviour
            var selText = $(this).text();
            $("#tableButton").text(selText);
        });
    }

    render() {
        return (
            <div>
                <div id="tableDiv" className="dropdown">
                    <button id="tableButton" className="btn btn-dropdown" type="button" data-toggle="dropdown" onClick={this.handleChange}>
                        {this.props.values[0]}
                    </button>
                    <ul id="tableMenu" className="dropdown-menu">
                        {
                            this.props.values.map((value) => <li key={value}><a href="#">{value}</a></li>)
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default DropdownButton