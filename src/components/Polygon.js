import { Component } from 'react';

class Polygon extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.polygon = false
        this.redrawPolygon = this.redrawPolygon.bind(this)

        //this. = this..bind(this)
    }
    componentDidMount() {

    }
    redrawPolygon() {
        this.polygon = new window.google.maps.Polygon({
            path: [
                { lat: 13.7739818, lng: 100.5464 },
                { lat: 13.5544, lng: 134.2465 },
                { lat: 35.5321, lng: 134.2454 },
                { lat: 35.5396, lng: 134.2609 },
                { lat: 35.5460, lng: 134.2622 }
            ],
            map: window.map,
            visible: false
        })
        
    }

    render() {
        this.redrawPolygon()
        return (null);
    }
}

export default Polygon;
