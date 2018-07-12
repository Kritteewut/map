
import React, { Component } from 'react';

class MapClass extends Component {
    constructor(props) {
        super(props);
        this.initMap = this.initMap.bind(this)
        this.mapEventHandler = this.mapEventHandler.bind(this)

        //this.deleteme = this.deleteme.bind(this)
        this.state = {
            isLoad: false,
            status: 'start',
            coords: [],
        }
    }

    componentDidMount() {
         window.initMap = this.initMap
    }

    initMap() {
        window.map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
        });
        this.setState({
            isLoad: true
        })
        this.mapEventHandler()
    }
    mapEventHandler() {
        var self = this
        window.google.maps.event.addListener(window.map, 'rightclick', function (e) {
            window.map.setOptions({
                draggableCursor: 'grab',
                clickableIcons: true,
                draggingCursor: 'grab',
            })
            window.google.maps.event.clearInstanceListeners(window.map)
            console.log('event is clear')
            self.mapEventHandler()
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
