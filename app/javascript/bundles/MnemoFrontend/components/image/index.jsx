import React from 'react'

const types = {
    notification: 95,
    standard: 150,
    post: 60
}

class Image extends React.Component {

    render() {
        const size = types[this.props.type] || types.standard
        return (
            <div>
                <img className="img img-border" width={size} height={size} src={this.props.src} />
            </div>
        )
    }
}

export default Image
/**
 * 
 * <Image type="standard" src="http://..." />
 * <Image type="post" src="http://..." />
 */