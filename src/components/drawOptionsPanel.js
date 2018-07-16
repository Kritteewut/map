import { Component } from 'react';

class DrawOptionsPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRender: false
        }
        this.renderControl = this.renderControl.bind(this)
        this.markerControl = this.markerControl.bind(this)
        this.polygonControl = this.polygonControl.bind(this)
        this.polylineControl = this.polylineControl.bind(this)
        this.grabControl = this.grabControl.bind(this)

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

        this.props.onAddListenerMarkerBtn(controlUI)

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

        this.props.onAddListenerPolylineBtn(controlUI)

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

        this.props.onAddListenerPolygonBtn(controlUI)

    }
    grabControl(controlDiv) {
        // Set CSS for the control border.
        var controlUI = document.createElement('button');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #fff';
        controlUI.style.borderRadius = '3px';
        controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginBottom = '22px';
        controlUI.style.textAlign = 'center';
        controlUI.title = 'Click to select gran map';
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        var controlText = document.createElement('div');
        controlText.style.color = 'rgb(25,25,25)';
        controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
        controlText.style.fontSize = '16px';
        controlText.style.lineHeight = '38px';
        controlText.style.paddingLeft = '5px';
        controlText.style.paddingRight = '5px';
        controlText.innerHTML = 'Grab';
        controlUI.appendChild(controlText);

        this.props.onAddListenerGrabBtn(controlUI)
    }
    renderControl() {
        var centerControlDiv1 = document.createElement('div');
        var centerControl = this.markerControl(centerControlDiv1);

        var centerControlDiv2 = document.createElement('div');
        var centerControl2 = this.polylineControl(centerControlDiv2);

        var centerControlDiv3 = document.createElement('div');
        var centerControl3 = this.polygonControl(centerControlDiv3);

        var centerControlDiv4 = document.createElement('div');
        var centerControl4 = this.grabControl(centerControlDiv4);


        centerControlDiv1.index = 1;
        centerControlDiv2.index = 1;
        centerControlDiv3.index = 1;
        centerControlDiv4.index = 1;

        window.map.controls[window.google.maps.ControlPosition.RIGHT_CENTER].push(centerControlDiv4);
        window.map.controls[window.google.maps.ControlPosition.RIGHT_CENTER].push(centerControlDiv1);
        window.map.controls[window.google.maps.ControlPosition.RIGHT_CENTER].push(centerControlDiv2);
        window.map.controls[window.google.maps.ControlPosition.RIGHT_CENTER].push(centerControlDiv3);


    }

    render() {
        var self = this;
        if (self.props.status === 'done') {
            if (self.state.isRender === false) {
                self.state.isRender = true;
                setTimeout(function () {
                    self.renderControl()
                }, 0);
            }
        }

        return (null)
    }
}
export default DrawOptionsPanel