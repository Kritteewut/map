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
    componentDidUpdate() {
        if (this.polyline !== false && this.props.isFirstDraw === true) {
            this.polyline.setOptions({
                clickable: true
            })
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
                clickable: true

            })
            this.props.addPolylineListener(this.polyline)
            
        }
        else {
            if (overlayCoords.length > 0) {
                this.polyline.setOptions({
                    path: overlayCoords,
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