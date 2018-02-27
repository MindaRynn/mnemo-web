import React from 'react'

class DropdownButton extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <div class="dropdown">
                    <button class="btn btn-dropdown">Dropdown</button>
                    <div class="dropdown-content">
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                        <a href="#">Link 3</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default DropdownButton