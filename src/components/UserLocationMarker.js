import { Component } from 'react';

class UserLocationMarker extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.userLocationMarker = false
        this.RedrawUserLocationMarker = this.RedrawUserLocationMarker.bind(this)
        //this. = this..bind(this)
    }
    componentWillUnmount() {
        if (this.userLocationMarker !== false) {
            this.userLocationMarker.setMap(null)
        }
    }
    RedrawUserLocationMarker() {
        var self = this
        var { userLocationCoords,addUserMarkerListener } = this.props
        if (this.userLocationMarker === false) {
            this.userLocationMarker = new window.google.maps.Marker({
                position: userLocationCoords,
                map: window.map,
                animation: window.google.maps.Animation.BOUNCE
            })
            addUserMarkerListener(this.userLocationMarker)
            console.log('create')
        }

    }

    render() {
        this.RedrawUserLocationMarker()
        return (null);
    }
}
export default UserLocationMarker;
