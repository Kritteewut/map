import { Component } from 'react';

class DrawOptionsPanel extends Component {
    constructor(props) {
        super(props);
        this.centerControl = this.centerControl.bind(this)
        this.renderControl = this.renderControl.bind(this)

        this.state = {

        }
    }

    centerControl(controlDiv) {

        // Set CSS for the control border.
        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #fff';
        controlUI.style.borderRadius = '3px';
        controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginBottom = '22px';
        controlUI.style.textAlign = 'center';
        controlUI.title = 'Click to recenter the map';
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        var controlText = document.createElement('div');
        controlText.style.color = 'rgb(25,25,25)';
        controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
        controlText.style.fontSize = '16px';
        controlText.style.lineHeight = '38px';
        controlText.style.paddingLeft = '5px';
        controlText.style.paddingRight = '5px';
        controlText.innerHTML = 'Center Map';
        controlUI.appendChild(controlText);

        // Setup the click event listeners: simply set the map to Chicago.
        // controlUI.addEventListener('click', function () {

        // });

    }
    renderControl() {
        var centerControlDiv = document.createElement('div');
        var centerControl = new this.centerControl(centerControlDiv);
        centerControlDiv.index = 1;
        window.map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
    }

    render() {
        this.renderControl()
        return (null)
    }
}
export default DrawOptionsPanel