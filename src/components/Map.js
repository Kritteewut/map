import React, { Component } from 'react';

class MapClass extends Component {
    constructor(props) {
        super(props);
        this.initMap = this.initMap.bind(this)
        this.getGeoLocation = this.getGeoLocation.bind(this)

        //this.deleteme = this.deleteme.bind(this)
        this.state = {
            isLoad: false,
            zoom: 15,
            center: { lat: 13, lng: 100 },
        }
    }
    componentWillMount() {
        this.getGeoLocation()
    }
    componentDidMount() {
        window.initMap = this.initMap
    }
    getGeoLocation() {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position.coords, 'getGeoIsActive')
            this.setState({
                center: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                },
                zoom: 15,
            })
        })

    }
    initMap() {
        var self = this
        window.map = new window.google.maps.Map(document.getElementById('map'), {
            center: self.state.center,
            zoom: self.state.zoom,
            clickableIcons: false,
        })
        this.setState({
            isLoad: true
        })
   
    }

    render() {
        var childrenOutput = null;
        if (this.state.isLoad === true) {
            childrenOutput = this.props.children;
        }

        return (
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                }}
                id="map">
                {childrenOutput}
            </div>
        );
    }
}
export default MapClass;
