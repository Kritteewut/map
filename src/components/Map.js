import React, { Component } from 'react';

class MapClass extends Component {
    constructor(props) {
        super(props);
        this.initMap = this.initMap.bind(this)

        //this.deleteme = this.deleteme.bind(this)
        this.state = {
            isLoad: false,
            zoom: 6,
            center: { lat: 13.64216294160931, lng: 100.4371240746384 },
        }
    }
    componentDidMount() {
        window.initMap = this.initMap
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
        window.google.maps.event.addListener(window.map, 'click', function (event) {
        })
    }

    render() {
        var childrenOutput = null;
        if (this.state.isLoad === true) {
            childrenOutput = this.props.children;
        }

        return (
            <div style={{
                position: 'absolute',
                top: 0,
                left: this.props.left,
                right: 0,
                bottom: this.props.bottom,
                justifyContent: 'flex-end',
                
            }}
                className="Map" id="map" >
                {childrenOutput}
            </div>
        );
    }
}
export default MapClass;