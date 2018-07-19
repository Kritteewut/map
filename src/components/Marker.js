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
    componentWillUnmount() {
        if (this.marker !== false) {
            this.marker.setMap(null)
        }
    }
    redrawMarker() {
        var overlayCoords = this.props.overlayCoords
        var overlayIndex = this.props.overlayIndex
        var overlayDrawType = this.props.overlayDrawType
        if (this.marker === false) {
            this.marker = new window.google.maps.Marker({
                position: overlayCoords[0],
                overlayIndex: overlayIndex,
                map: window.map,
                overlayType: 'marker',
                overlayDrawType: overlayDrawType
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
