
import { Component } from 'react';

class DrawingTools extends Component {
    constructor(props) {
        super(props);

        this.state = {}
        this.drawingManager = false
        this.renderDrawingTools = this.renderDrawingTools.bind(this)
        this.overlayListener = this.overlayListener.bind(this)
        this.mapListener = this.mapListener.bind(this)

        {/*
        this.deleteme = this.deleteme.bind(this)
        */}
    }

    renderDrawingTools() {
        this.drawingManager = new window.google.maps.drawing.DrawingManager({
            drawingControl: true,
            drawingControlOptions: {
                position: window.google.maps.ControlPosition.BOTTOM_CENTER,
                drawingModes: ['polygon', 'polyline', 'marker',]
            },
        })
        this.drawingManager.setMap(window.map);
        this.mapListener()
        this.overlayListener()

    }
    overlayListener() {
        window.google.maps.event.addListener(this.drawingManager, 'overlaycomplete', function (event) {
            if (event.type === 'polygon') {
                var polygon = event.overlay;
                console.log(polygon)

            }
            if (event.type === 'polyline') {
                var polyline = event.overlay;
                console.log(polyline)
            }
            if (event.type === 'marker') {
                var marker = event.overlay;
                console.log(marker)
            }
        });
    }
    mapListener() {
        window.google.maps.event.trigger(this.drawingManager, 'click', function (e) {
            
        })
    }
    render() {
        this.renderDrawingTools()
        return (null)
    }
}
export default DrawingTools