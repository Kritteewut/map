import React, { Component } from 'react';

class DrawOptionsPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.renderControl = this.renderControl.bind(this)
        this.markerControl = this.markerControl.bind(this)
        this.polygonControl = this.polygonControl.bind(this)
        this.polylineControl = this.polylineControl.bind(this)

    }
    componentDidMount() {

    }

    markerControl(controlDiv) {

        // Set CSS for the control border.
        var controlUI = document.createElement('button');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #fff';
        controlUI.style.borderRadius = '3px';
        controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginBottom = '22px';
        controlUI.style.textAlign = 'center';
        controlUI.title = 'Click to select marker drawer';
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        var controlText = document.createElement('div');
        controlText.style.color = 'rgb(25,25,25)';
        controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
        controlText.style.fontSize = '16px';
        controlText.style.lineHeight = '38px';
        controlText.style.paddingLeft = '5px';
        controlText.style.paddingRight = '5px';
        controlText.innerHTML = 'Marker';
        controlUI.appendChild(controlText);

        var self = this

        // window.google.maps.event.addDomListener(controlUI, 'click', function (e) {
        //     if (!(self.state.btnTypeCheck === 'marker')) {
        //         self.setState({
        //             btnTypeCheck: 'marker'
        //         })
        //         console.log('you just click me suckka!')
        //         console.log('marker is ready to create')
        //         window.map.setOptions({
        //             draggableCursor: 'crosshair',
        //             clickableIcons: false,
        //         })

        //         window.google.maps.event.addListener(window.map, 'click', function (e) {
        //             window.google.maps.event.clearInstanceListeners(window.map)

        //             console.log('draw marker')
        //             let lat = e.latLng.lat()
        //             let lng = e.latLng.lng()
        //             var marker = new window.google.maps.Marker({
        //                 position: { lat, lng },
        //                 map: window.map,
        //             })
        //             console.log(marker)
        //         })
        //         // window.map.addListener('mousemove', function (e) {
        //         //     let lat = e.latLng.lat()
        //         //     let lng = e.latLng.lng()
        //         //     console.log('lat is : ', lat, 'lng is ;', lng)
        //         // })
        //     }
        // });
    }


    polylineControl(controlDiv) {
        // Set CSS for the control border.
        var controlUI = document.createElement('button');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #fff';
        controlUI.style.borderRadius = '3px';
        controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginBottom = '22px';
        controlUI.style.textAlign = 'center';
        controlUI.title = 'Click to select polyline drawer';
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        var controlText = document.createElement('div');
        controlText.style.color = 'rgb(25,25,25)';
        controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
        controlText.style.fontSize = '16px';
        controlText.style.lineHeight = '38px';
        controlText.style.paddingLeft = '5px';
        controlText.style.paddingRight = '5px';
        controlText.innerHTML = 'Polyline';
        controlUI.appendChild(controlText);

        // var self = this
        // window.google.maps.event.addDomListener(controlUI, 'click', function (e) {
        //     if (!(self.state.btnTypeCheck === 'polyline')) {
        //         self.setState({
        //             btnTypeCheck: 'polyline'
        //         })
        //         console.log('you just click me pline!')
        //     }
        // });
    }
    polygonControl(controlDiv) {
        // Set CSS for the control border.
        var controlUI = document.createElement('button');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #fff';
        controlUI.style.borderRadius = '3px';
        controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginBottom = '22px';
        controlUI.style.textAlign = 'center';
        controlUI.title = 'Click to select polygon drawer';
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        var controlText = document.createElement('div');
        controlText.style.color = 'rgb(25,25,25)';
        controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
        controlText.style.fontSize = '16px';
        controlText.style.lineHeight = '38px';
        controlText.style.paddingLeft = '5px';
        controlText.style.paddingRight = '5px';
        controlText.innerHTML = 'Polygon';
        controlUI.appendChild(controlText);

        // var self = this
        // window.google.maps.event.addDomListener(controlUI, 'click', function (e) {
        //     if (!(self.state.btnTypeCheck === 'polygon')) {
        //         self.setState({
        //             btnTypeCheck: 'polygon'
        //         })



        //     }
        // });

    }

    renderControl() {

        var centerControlDiv = document.createElement('div');
        var centerControl = this.markerControl(centerControlDiv);

        var centerControlDiv2 = document.createElement('div');
        var centerControl2 = this.polylineControl(centerControlDiv2);

        var centerControlDiv3 = document.createElement('div');
        var centerControl3 = this.polygonControl(centerControlDiv3);

        centerControlDiv.index = 1;
        centerControlDiv2.index = 1;
        centerControlDiv3.index = 1;
        window.map.controls[window.google.maps.ControlPosition.RIGHT_CENTER].push(centerControlDiv);
        window.map.controls[window.google.maps.ControlPosition.RIGHT_CENTER].push(centerControlDiv2);
        window.map.controls[window.google.maps.ControlPosition.RIGHT_CENTER].push(centerControlDiv3);

    }

    render() {

        var self = this;
        if (self.props.status === 'done') {
            self.renderControl()
        }
        
        return (null)
    }
}
export default DrawOptionsPanel

{/*
function polygonListener(controlUI) {

    window.google.maps.event.addDomListener(controlUI, 'click', function (e) {
        window.google.maps.event.clearInstanceListeners(window.map)
        polygonListener(controlUI)
        drawPolygon()
    });
}
function drawPolygon() {
    console.log('polygon is ready to create')
    window.map.setOptions({
        draggableCursor: 'crosshair',
        clickableIcons: false,
    })

    var polygon = new window.google.maps.Polygon({
        map: window.map,
        editable: true
    })
    var coords = []

    window.google.maps.event.addListener(window.map, 'click', function (e) {
        let lat = e.latLng.lat()
        let lng = e.latLng.lng()
        coords.push({
            lat: lat,
            lng: lng
        })
        polygon.setOptions({
            path: coords
        })
        console.log(polygon.getPath())
    })
    // window.map.addListener('mousemove', function (e) {
    //     let lat = e.latLng.lat()
    //     let lng = e.latLng.lng()
    //     console.log('lat is : ', lat, 'lng is ;', lng)
    // })
}
function polylineListener(controlUI) {

    window.google.maps.event.addDomListener(controlUI, 'click', function (e) {
        console.log('polyline is ready to create')
        var polyline = new window.google.maps.Polyline({
            map: window.map,
            editable: true
        })

        window.map.setOptions({
            draggableCursor: 'crosshair'
        })
        var coords = []
        window.map.addListener('click', function (e) {
            let lat = e.latLng.lat()
            let lng = e.latLng.lng()
            coords.push({
                lat: lat,
                lng: lng
            })
            polyline.setOptions({
                path: coords
            })
            console.log(polyline.getPath())
        })
        // window.map.addListener('mousemove', function (e) {
        //     let lat = e.latLng.lat()
        //     let lng = e.latLng.lng()
        //     console.log('lat is : ', lat, 'lng is ;', lng)
        // })
    });
}

*/}