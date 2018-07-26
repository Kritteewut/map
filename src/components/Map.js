import React, { Component } from 'react';
import '../App.css';
class MapClass extends Component {
    constructor(props) {
        super(props);
        this.initMap = this.initMap.bind(this)

        //this.deleteme = this.deleteme.bind(this)
        this.state = {
            isLoad: false,
            zoom: 15,
            center: { lat: 13.0003076, lng: 100 },
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
    }

    render() {
        var childrenOutput = null;
        if (this.state.isLoad === true) {
            childrenOutput = this.props.children;
        }
        return (
            <span
                style={{
                    position: 'absolute',
                    top: 0,
                    left: '25vw',
                    right: 0,
                    bottom: 0,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                }}
                id="map">
                {childrenOutput}
            </span>
        );
    }
}
export default MapClass;