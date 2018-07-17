import { Component } from 'react';

class UserLocationMarker extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.userLocationMarker = false

        this.userLocationMarker = this.userLocationMarker.bind(this)
        //this. = this..bind(this)
    }
    userLocationMarker() {
        var self = this
        if (this.props.isDrawing === 'marker' && this.props.overlayDrawingCoords.length > 0) {
            this.userLocationMarker = new window.google.maps.Marker({
                position: this.props.overlayDrawingCoords[0],
                map: window.map,
            })
            console.log(this.marker)
        }
    }

    render() {
        this.userLocationMarker()
        return (null);
    }
}
export default UserLocationMarker;
