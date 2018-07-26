import { Component } from 'react';

class Polygon extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.polygon = false

        this.redrawPolygon = this.redrawPolygon.bind(this)
        //this. = this..bind(this)
    }
    componentWillUnmount() {
        if (this.polygon !== false) {
            this.polygon.setMap(null)
        }
    }
    componentDidUpdate() {
        if (this.polygon !== false && this.props.isFirstDraw !== true) {
            this.polygon.setOptions({
                clickable: true
            })
        }
    }
    redrawPolygon() {
        //var onSquereMetersTrans = this.props.onSquereMetersTrans
        const {
            overlayCoords,
            overlayIndex,
            overlayDrawType,
            fillColor,
            strokeColor,
        } = this.props

        if (this.polygon === false) {
            this.polygon = new window.google.maps.Polygon({
                path: overlayCoords,
                map: window.map,
                overlayIndex: overlayIndex,
                overlayType: 'polygon',
                suppressUndo: true,
                overlayDrawType: overlayDrawType,
                strokeColor: strokeColor,
                fillColor: fillColor,
                clickable: false,
            })
            this.props.addPolygonListener(this.polygon)
        }
        else {
            if (overlayCoords.length > 0) {
                this.polygon.setOptions({
                    path: overlayCoords,
                })
                //onSquereMetersTrans(this.polygon)
            }
        }
    }

    render() {
        this.redrawPolygon()
        return (null);
    }
}

export default Polygon;
