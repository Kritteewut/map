import { Component } from 'react';

class Polygon extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.polygon = false
        this.redrawPolygon = this.redrawPolygon.bind(this)

        //this. = this..bind(this)
    }
    redrawPolygon() {
        // var self = this
        // if (this.props.btnTypeCheck === 'polygon' && this.props.isMapClick === true) {
        //     this.polygon = new window.google.maps.Polygon({
        //         path: this.props.overlayDrawingCoords,
        //         overlayIndex: this.props.overlayIndex,
        //         map: window.map,
        //     })
        //     this.props.addPolygonListener(this.polygon)
        // }

    }

    render() {
        this.redrawPolygon()
        return (null);
    }
}

export default Polygon;
