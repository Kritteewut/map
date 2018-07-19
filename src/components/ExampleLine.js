import { Component } from 'react';

class ExampleLine extends Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.exampleLine = false
        this.redrawExampleLine = this.redrawExampleLine.bind(this)
        //this. = this..bind(this)
    }
    redrawExampleLine() {
        var exampleLineCoords = this.props.exampleLineCoords
        if (this.exampleLine === false) {
            this.exampleLine = new window.google.maps.Polyline({
                path: exampleLineCoords,
                map: window.map,
                clickable: false,
                strokeOpacity: 0.5,
                overlayType: 'exampleLine',
            })
        }
        else {
            this.exampleLine.setOptions({
                path: exampleLineCoords,
            })
            //this.props.onPolylineLengthCompute(this.exampleLine)
        }
    }
    render() {
        this.redrawExampleLine()
        return (null);
    }
}

export default ExampleLine;
