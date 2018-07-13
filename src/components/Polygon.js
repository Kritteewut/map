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
        var self = this
        if (this.props.overlayDrawingCoords.length > 0 && this.props.btnTypeCheck === 'polygon') {
            this.polygon = new window.google.maps.Polygon({
                // path:,
                // map: window.map,
                // overlayIndex: 1,
            })
            window.google.maps.event.addListener(this.polygon, 'click', function () {
                console.log(self.polygon, 'p')
            })
            
            // var myLatLng = new window.google.maps.LatLng(this.props.overlayDrawingCoords[0]);
            // this.polyline.getPath().push(myLatLng)
        }

    }

    render() {
        this.redrawPolygon()
        return (null);
    }
}

export default Polygon;
