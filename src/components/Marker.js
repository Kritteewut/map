import { Component } from 'react';

class Marker extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.marker = false
        this.redrawMarker = this.redrawMarker.bind(this)

        //this. = this..bind(this)
    }
    componentDidMount() {
        console.log('hithere from marker')
    }
    redrawMarker() {
        this.marker = new window.google.maps.Marker({
            position: { lat: -34.397, lng: 150.644 },
            map: window.map,
            title: 'Hello World!'
        })
    }

    render() {
        this.redrawMarker()
        return (null);
    }
}

export default Marker;
