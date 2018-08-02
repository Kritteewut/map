import React, { Component } from 'react';
import transparent_icon from './icons/transparent_icon.png';


class TransparentMaker extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.transparentMaker = false
        this.redrawTransparentMaker = this.redrawTransparentMaker.bind(this)

        //this.deleteme = this.deleteme.bind(this)
    }
    componentWillUnmount() {
        if (this.transparentMaker !== false) {
            this.transparentMaker.setMap(null)
        }
    }
    redrawTransparentMaker() {
        const { midpoint, disBtw } = this.props
        if (this.transparentMaker === false) {
            this.transparentMaker = new window.google.maps.Marker({
                position: midpoint,
                map: window.map,
                icon: transparent_icon,
                clickable: false,
                label: {
                    text: disBtw.toFixed(3) + ' m',
                    //color: 'black',
                    fontFamily: 'Vast Shadow',
                    fontSize: '15px',
                    //fontWeight: 'Lightest',
                },
            })
        }
    }
    render() {
        this.redrawTransparentMaker()
        return (null)
    }
}
export default TransparentMaker