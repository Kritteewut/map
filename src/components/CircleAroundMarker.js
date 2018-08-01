import { Component } from 'react';

class CircleAroundMarker extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.circleAroundMarker = false
        this.redrawCircleAroundMarker = this.redrawCircleAroundMarker.bind(this)
        //this. = this..bind(this)
    }
    componentWillUnmount() {
    }
    redrawCircleAroundMarker() {
        const { circleAroundMarkerCoords } = this.props
        if (this.circleAroundMarker === false) {
            this.circleAroundMarker = new window.google.maps.Circle({
                clickable: false,
                map: window.map,
                strokeColor: '#ff4500',
                fillOpacity: 0,
            })
        } else {
            this.circleAroundMarker.setOptions({
                center: circleAroundMarkerCoords,
                radius: window.map.getZoom(),
            })
        }
    }

    render() {
        this.redrawCircleAroundMarker()
        return (null);
    }
}
export default CircleAroundMarker;
