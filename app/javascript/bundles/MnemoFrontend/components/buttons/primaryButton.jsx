import React from 'react'

export default class PrimaryButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <button className="btn btn-primary" type="submit">{this.props.text}</button>
            </div>
        );
    }
}