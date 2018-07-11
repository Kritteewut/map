
import React, { Component } from 'react';

class DrawingTools extends Component {
    constructor(props) {
        super(props);

        this.state = {}
        this.drawingManager = false
        this.renderDrawingTools = this.renderDrawingTools.bind(this)

        //this.deleteme = this.deleteme.bind(this)
    }

    renderDrawingTools() {
        this.drawingManager = new window.google.maps.drawing.DrawingManager({
            drawingMode: window.google.maps.drawing.OverlayType.MARKER,
            drawingControl: true,
            drawingControlOptions: {
                position: window.google.maps.ControlPosition.TOP_CENTER,
                drawingModes: ['marker', 'circle', 'polygon', 'polyline', 'rectangle']
            },
            markerOptions: { icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png' },
            circleOptions: {
                fillColor: '#ffff00',
                fillOpacity: 1,
                strokeWeight: 5,
                clickable: false,
                editable: true,
            }
        })
        this.drawingManager.setMap(window.map);
    }
    render() {
        this.renderDrawingTools()
        return (null)
    }
}
export default DrawingTools