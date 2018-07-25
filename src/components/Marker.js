import { Component } from 'react';
import icon_point from './icons/icon_point.png';

class Marker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRender: false,
            marker: []
        }
        this.marker = false

        this.redrawMarker = this.redrawMarker.bind(this)
        //this. = this..bind(this)
    }
    componentWillUnmount() {
        if (this.marker !== false) {
            this.marker.setMap(null)
        }
    }
    redrawMarker() {
        const { overlayCoords, overlayIndex, overlayDrawType, icon } = this.props
        if (this.marker === false) {
            this.marker = new window.google.maps.Marker({
                position: overlayCoords[0],
                overlayIndex: overlayIndex,
                map: window.map,
                overlayType: 'marker',
                overlayDrawType: overlayDrawType,
                icon: icon,
            })
            console.log(icon_point)
            this.props.addMarkerListener(this.marker)
        }
    }

    render() {
        this.redrawMarker()
        return (null);
    }
}
export default Marker;