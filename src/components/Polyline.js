import { Component } from 'react';

class Polyline extends Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.polyline = false
        this.redrawPolyline = this.redrawPolyline.bind(this)
        //this. = this..bind(this)
    }
    componentWillUnmount() {
        if (this.polyline !== false) {
            this.polyline.setMap(null)
        }
    }
    redrawPolyline() {
        var {
            overlayCoords,
            overlayIndex,
            overlayDrawType,
            strokeColor,
        } = this.props
        if (this.polyline === false) {
            this.polyline = new window.google.maps.Polyline({
                path: overlayCoords,
                map: window.map,
                overlayIndex: overlayIndex,
                overlayType: 'polyline',
                suppressUndo: true,
                overlayDrawType: overlayDrawType,
                strokeColor: strokeColor,

            })
            this.props.addPolylineListener(this.polyline)
            //this.props.onPolylineLengthCompute(this.polyline)
        }
        else {
            if (overlayCoords.length > 0) {
                this.polyline.setOptions({
                    path: overlayCoords,
                })
                //this.props.onPolylineLengthCompute(this.polyline)
            }
        }
    }
    render() {
        this.redrawPolyline()
        return (null);
    }
}

export default Polyline;