import { Component } from 'react';

class Polyline extends Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.polyline = false
        this.redrawPolyline = this.redrawPolyline.bind(this)

        //this. = this..bind(this)
    }

    componentDidMount() {
        console.log('hithere from polyline')
    }

    redrawPolyline() {
        this.polyline = new window.google.maps.Polyline({
            path: [{ lat: 13.7739818, lng: 100.546488 },
            { lat: 13.5544, lng: 134.2465 },
            { lat: 35.5321, lng: 134.2454 },
            { lat: -34.397, lng: 150.644 }
            ],
            map: window.map,
        })
    }

    render() {
        this.redrawPolyline()
        return (null);
    }
}

export default Polyline;
