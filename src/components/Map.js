
import React, { Component } from 'react';

function new_script(src) {
    return new Promise(function (resolve, reject) {
        var script = document.createElement('script');
        script.src = src;
        script.addEventListener('load', function () {
            resolve();
        });
        script.addEventListener('error', function (e) {
            reject(e);
        });
        document.body.appendChild(script);
    })
};
// Promise Interface can ensure load the script only once
var my_script = new_script('https://maps.googleapis.com/maps/api/js?libraries=drawing,places&key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&callback=initMap&v=3.32');

class MapClass extends Component {
    constructor(props) {
        super(props);
        this.initMap = this.initMap.bind(this)
        this.state = {
            isLoad: false,
            status: 'start',
            coords: []
            ,

        }
    }
    do_load = () => {
        var self = this;
        my_script.then(function () {
            self.setState({ 'status': 'done' });
        }).catch(function () {
            self.setState({ 'status': 'error' });
        })
    }
    componentDidMount() {
        window.initMap = this.initMap
        console.log('hi there from map')
    }

    initMap() {

        window.map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8
        });
        this.setState({
            isLoad: true
        })
    }
    render() {
        var self = this;
        if (self.state.status === 'start') {
            self.state.status = 'loading';
            setTimeout(function () {
                self.do_load()
            }, 0);
        }
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
