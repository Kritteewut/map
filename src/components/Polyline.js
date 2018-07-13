import { Component } from 'react';

class Polyline extends Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.polyline = false
        this.redrawPolyline = this.redrawPolyline.bind(this)

        //this. = this..bind(this)
    }
    redrawPolyline() {
        var self = this
        if (this.props.btnTypeCheck === 'polyline' && this.props.isMapClick === true) {
            this.polyline = new window.google.maps.Polyline({
                path: this.props.overlayDrawingCoords,
                overlayIndex: this.props.overlayIndex,
                map: window.map,
            })
            this.props.addMarkerListener(this.polyline)
        }

        // var myLatLng = new window.google.maps.LatLng(this.props.overlayDrawingCoords[0]);
        // this.polyline.getPath().push(myLatLng)
    }
    render() {
        this.redrawPolyline()
        return (null);
    }
}

export default Polyline;
