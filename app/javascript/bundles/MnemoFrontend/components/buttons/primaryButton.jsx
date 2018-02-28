import React from 'react'

export default class PrimaryButton extends React.Component {
    render() {
        let {text} = this.props;

        return (
            <div>
                <button className="btn btn-primary" type="submit">{text}</button>
            </div>
        );
    }
}