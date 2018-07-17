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
        var overlayDrawingCoords = this.props.overlayDrawingCoords
        var overlayIndex = this.props.overlayIndex
        if (this.props.isDrawing === 'polyline') {
            this.isRender = true
            this.polyline = new window.google.maps.Polyline({
                path: overlayDrawingCoords,
                map: window.map,
                overlayIndex: overlayIndex,
                overlayType: 'polyline',
                suppressUndo: true,
            })
            this.props.addPolylineListener(this.polyline)
        }
        else {
            if (this.props.overlayDrawingCoords.length > 0) {
                this.polyline.setOptions({
                    path: overlayDrawingCoords,
                })
            }
        }
    }
    render() {
        this.redrawPolyline()
        return (null);
    }
}

export default Polyline;
