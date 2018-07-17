import { Component } from 'react';

class ExampleLine extends Component {

    constructor(props) {
        super(props);
        this.state = {
            exampleLineObject: []
        }
        this.exampleLine = false

        this.redrawExampleLine = this.redrawExampleLine.bind(this)

        //this. = this..bind(this)
    }
    redrawExampleLine() {
        var overlayDrawingCoords = this.props.overlayDrawingCoords
        if (this.exampleLine === false) {
            this.exampleLine = new window.google.maps.Polyline({
                path: overlayDrawingCoords,
                map: window.map,
                clickable: false,
                strokeOpacity: 0.5,
            })
            //console.log(this.exampleLine)
            //this.props.onAddExampleLineListener(this.exampleLine)
        }
        else {
            this.exampleLine.setOptions({
                path: overlayDrawingCoords
            })
        }
    }
    render() {
        this.redrawExampleLine()
        return (null);
    }
}

export default ExampleLine;
