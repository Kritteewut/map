import { Component } from 'react';

class Polyline extends Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.polyline = false
        this.redrawPolyline = this.redrawPolyline.bind(this)

        //this. = this..bind(this)
    }
    redrawPolyline() {
        var self = this
        if ( this.props.btnTypeCheck === 'polyline') {

            this.polyline = new window.google.maps.Polyline({
                // path:,
                //  overlayIndex:,
                // map: window.map,
               
            })
            this.polyline.setOptions({
                path: this.props.overlayDrawingCoords,
            })

            window.google.maps.event.addListener(self.polyline, 'mousedown', function (argument) {
                
                var d = self.polyline.getPath()
                console.log('down',d)
                window.google.maps.event.addListener(d, 'drag', function (e) {
                    console.log(d.getAt(argument.vertex))
                })
            })

            // var myLatLng = new window.google.maps.LatLng(this.props.overlayDrawingCoords[0]);
            // this.polyline.getPath().push(myLatLng)
        }
    }
    render() {
        this.redrawPolyline()
        return (null);
    }
}

export default Polyline;
