import React, { Component } from 'react';

class MapClass extends Component {
    constructor(props) {
        super(props);
        this.initMap = this.initMap.bind(this)
        //this.deleteme = this.deleteme.bind(this)
        this.state = {
            isLoad: false,
            coords: [],
        }
    }
    componentWillMount() {
        window.initMap = this.initMap
    }
    initMap() {
        var self = this
        window.map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
        });
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
