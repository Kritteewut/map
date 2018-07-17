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
        if (this.props.isDrawing === 'polygon') {
            this.isRender = true
            this.polygon = new window.google.maps.Polygon({
                path: overlayDrawingCoords,
                map: window.map,
                overlayIndex: overlayIndex,
                overlayType: 'polygon',
                suppressUndo: true
            })
            this.props.addPolygonListener(this.polygon)
        }
        else {
            if (this.props.overlayDrawingCoords.length > 0) {
                this.polygon.setOptions({
                    path: overlayDrawingCoords,
                })
            }
        }
    }

    render() {
        this.redrawPolygon()
        return (null);
    }
}

export default Polygon;
