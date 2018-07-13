import { Component } from 'react';

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
    redrawMarker() {
        var self = this
        if (this.props.btnTypeCheck === 'marker' && this.props.isMapClick === true) {
            this.marker = new window.google.maps.Marker({
                position: this.props.overlayDrawingCoords,
                overlayIndex: this.props.overlayIndex,
                map: window.map
            })
            this.props.addMarkerListener(this.marker)
        }
    }

    render() {
        this.redrawMarker()
        return (null);
    }
}
export default Marker;
