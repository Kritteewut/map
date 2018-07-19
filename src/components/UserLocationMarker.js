import { Component } from 'react';

class UserLocationMarker extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.userLocationMarker = false
        this.RedrawUserLocationMarker = this.RedrawUserLocationMarker.bind(this)
        //this. = this..bind(this)
    }
    RedrawUserLocationMarker() {
        var self = this
        var userLocationCoords = this.props.userLocationCoords
        if (this.userLocationMarker === false) {
            this.userLocationMarker = new window.google.maps.Marker({
                map: window.map,
                animation: window.google.maps.Animation.BOUNCE
            })
            window.google.maps.event.addListener(this.userLocationMarker, 'click', function () {
                self.userLocationMarker.setOptions({
                    visible: false
                })
            })
        } else {
            if (userLocationCoords.length > 0) {
                this.userLocationMarker.setOptions({
                    position: userLocationCoords[0],
                    visible: true,
                    animation: window.google.maps.Animation.BOUNCE,
                })
            }
        }
    }

    render() {
        this.RedrawUserLocationMarker()
        return (null);
    }
}
export default UserLocationMarker;
