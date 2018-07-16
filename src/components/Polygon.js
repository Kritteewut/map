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
        var overlayDrawingCoords = this.props.overlayDrawingCoords
        var overlayIndex = this.props.overlayIndex
        if (this.polygon === false) {
            this.polygon = new window.google.maps.Polygon({
                path: overlayDrawingCoords,
                map: window.map,
                draggable: true,
                overlayIndex: overlayIndex,
            })
            console.log(this.polygon, 'polygon is create', )
        }
        else {
            if (this.props.overlayDrawingCoords.length > 0) {
                this.polygon.setOptions({
                    path: overlayDrawingCoords,
                })
                console.log(this.polygon.getPath(), 'polygon is drawing', )
            }
        }
    }

    render() {
        this.redrawPolygon()
        return (null);
    }
}

export default Polygon;
