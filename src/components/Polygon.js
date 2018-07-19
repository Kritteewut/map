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
    redrawPolygon() {
        var onSquereMetersTrans = this.props.onSquereMetersTrans
        var overlayCoords = this.props.overlayCoords
        var overlayIndex = this.props.overlayIndex
        var overlayDrawType = this.props.overlayDrawType

        if (this.polygon === false) {
            this.polygon = new window.google.maps.Polygon({
                path: overlayCoords,
                map: window.map,
                overlayIndex: overlayIndex,
                overlayType: 'polygon',
                suppressUndo: true,
                //clickable: false,
                overlayDrawType: overlayDrawType
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
