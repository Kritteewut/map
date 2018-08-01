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
    redrawTransparentMaker() {
        const { overlayCoords } = this.props
        
        if (this.transparentMaker === false) {
            var length = overlayCoords.length
            this.transparentMaker = new window.google.maps.Marker({
                position: overlayCoords[length - 1],
                map: window.map,
                icon: transparent_icon,
                clickable: false,
                label: {
                    text: 'ขึ้นเถอะ',
                    color: 'black',
                    //fontFamily:,
                    fontSize: '17px',
                    //fontWeight:,
                },
            })
            console.log('create',overlayCoords[length - 1])
        }
    }
    render() {
        this.redrawTransparentMaker()
        return (null)
    }
}
export default TransparentMaker