import { Component } from 'react';

class ExamplePolygon extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.examplePolygon = false

        this.redrawExamplePolygon = this.redrawExamplePolygon.bind(this)
        //this. = this..bind(this)
    }
    redrawExamplePolygon() {
        var examplePolygonCoords = this.props.examplePolygonCoords
        if (this.examplePolygon === false) {
            this.examplePolygon = new window.google.maps.Polygon({
                path: examplePolygonCoords,
                map: window.map,
                clickable: false,
                strokeOpacity: 0.5,
                overlayType: 'examplePolygon',
                strokeColor: '#aa0011',
                fillColor: '#1122aa',
                strokeWeight: '10',
                draggable: true
            })
        }
        else {
            this.examplePolygon.setOptions({
                paths: examplePolygonCoords
            })
        }
    }

    render() {
        this.redrawExamplePolygon()
        return (null);
    }
}

export default ExamplePolygon;
