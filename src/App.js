import React, { Component } from 'react';
import MapClass from './components/Map'
import Marker from './components/Marker';
import Polygon from './components/Polygon';
import Polyline from './components/Polyline';
import DrawOptionsPanel from './components/DrawOptionsPanel';

function new_script(src) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    script.src = src;
    script.addEventListener('load', function () {
      resolve();
    });
    script.addEventListener('error', function (e) {
      reject(e);
    });
    document.body.appendChild(script);
  })
};

// Promise Interface can ensure load the script only once
var my_script = new_script('https://maps.googleapis.com/maps/api/js?&libraries=drawing&key=AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo&callback=initMap&v=3.32');

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      status: 'start',
      btnTypeCheck: '',
      isRender: false,
      overlayObject: [],
      overlayDrawingCoords: [],
      overlayIndex: 0,
      isMapClick: false,
      selectedOverlay: [],
    }
    this.onBtnTypeChange = this.onBtnTypeChange.bind(this)
    this.onAddListenerMarkerBtn = this.onAddListenerMarkerBtn.bind(this)
    this.onAddListenerPolygonBtn = this.onAddListenerPolygonBtn.bind(this)
    this.onAddListenerPolylineBtn = this.onAddListenerPolylineBtn.bind(this)
    this.onAddListenerGrabBtn = this.onAddListenerGrabBtn.bind(this)
    this.onAddListenerSaveBtn = this.onAddListenerSaveBtn.bind(this)
    this.onAddOverlayObject = this.onAddOverlayObject.bind(this)
    this.drawMarker = this.drawMarker.bind(this)
    this.addMarkerListener = this.addMarkerListener.bind(this)

  }

  do_load = () => {
    var self = this;
    my_script.then(function () {
      self.setState({ 'status': 'done' });
    }).catch(function () {
      self.setState({ 'status': 'error' });
    })
  }

  onBtnTypeChange(type) {
    if (this.state.btnTypeCheck === type) {
      return true
    } else {
      this.setState({
        btnTypeCheck: type
      }, console.log(type, 'type'))
    }

  }
  onAddListenerMarkerBtn(btn) {
    var self = this
    window.google.maps.event.addDomListener(btn, 'click', function () {
      if (!(self.onBtnTypeChange('marker'))) {
        self.drawMarker()
        console.log('marker button is click')
      }
    })
  }
  onAddListenerPolygonBtn(btn) {
    var self = this
    window.google.maps.event.addDomListener(btn, 'click', function () {
      self.onOverlayDrawingCoordsClear()
      if (!(self.onBtnTypeChange('polygon'))) {
        console.log('polygon is click')
        self.onAddListenerMap()
      }
    })
  }
  onAddListenerPolylineBtn(btn) {
    var self = this
    window.google.maps.event.addDomListener(btn, 'click', function () {
      self.onOverlayDrawingCoordsClear()
      if (!(self.onBtnTypeChange('polyline'))) {
        console.log('polyline is click')
        self.onAddListenerMap()
      }
    })
  }
  onAddListenerGrabBtn(btn) {
    var self = this

    window.google.maps.event.addDomListener(btn, 'click', function () {
      if (!(self.onBtnTypeChange('grab'))) {
        console.log('grab is click')
        window.google.maps.event.clearInstanceListeners(window.map)
      }
    })
  }
  onAddListenerSaveBtn(btn) {
    var self = this
    window.google.maps.event.addDomListener(btn, 'click', function () {
      if (!(self.onBtnTypeChange('save'))) {
        window.google.maps.event.clearListeners(window.map, 'click')
      }
    })
  }
  onAddOverlayObject(overlay) {
    var temp = this.state.overlayObject
    temp.push(overlay)
    this.setState({
      overlayObject: temp
    })
  }

  drawMarker() {

    var self = this
    let overlayDrawingCoords = self.state.overlayDrawingCoords
    let overlayObject = self.state.overlayObject
    let overlayIndex = self.state.overlayIndex
    window.google.maps.event.clearInstanceListeners(window.map)
    window.google.maps.event.addListener(window.map, 'mousedown', function (event) {

      let lat = event.latLng.lat()
      let lng = event.latLng.lng()

      overlayDrawingCoords = { lat, lng }
      self.setState({
        isMapClick: true,
        overlayDrawingCoords: overlayDrawingCoords
      })
    })
    window.google.maps.event.addListener(window.map, 'mouseup', function (event) {
      overlayIndex += 1
      overlayObject.push({
        overlayDrawingCoords,
        overlayIndex
      })
      self.setState({
        isMapClick: false,
        overlayIndex: overlayIndex,
        overlayObject: overlayObject,
      }, () => console.log(overlayObject))
    })
  }
  drawPolyline(event) {
    var self = this
    var temp = this.state.overlayDrawingCoords
    let lat = event.latLng.lat()
    let lng = event.latLng.lng()
    temp.push({ lat, lng })
    console.log(temp, 'temp')
    self.setState({
      overlayDrawingCoords: temp
    })
  }
  drawPolygon(event) {
    var self = this
    var temp = this.state.overlayDrawingCoords
    let lat = event.latLng.lat()
    let lng = event.latLng.lng()

  }
  setSelectOverlay(overlay) {
    this.setState({
      selectedOverlay: overlay
    })
  }
  addMarkerListener(marker) {
    var self = this
    window.google.maps.event.addListener(marker, 'click', function () {
      console.log(marker.setMap(null))
    })
  }


  //rederrr
  render() {
    var self = this;
    if (self.state.status === 'start') {
      self.state.status = 'loading';
      setTimeout(function () {
        self.do_load()
      }, 0);
    }

    return (
      <div className="App">
        <MapClass>

          <Marker
            btnTypeCheck={this.state.btnTypeCheck}
            overlayDrawingCoords={this.state.overlayDrawingCoords}
            isMapClick={this.state.isMapClick}
            onAddOverlayObject={this.onAddOverlayObject}
            addMarkerListener={this.addMarkerListener}
          />

          {/*<Polygon
            overlayDrawingCoords={this.state.overlayDrawingCoords}
            onAddOverlayObject={this.onAddOverlayObject}
            onOverlayDrawingCoordsClear={this.onOverlayDrawingCoordsClear}
            btnTypeCheck={this.state.btnTypeCheck}>
          </Polygon>
          <Polyline
            overlayDrawingCoords={this.state.overlayDrawingCoords}
            onAddOverlayObject={this.onAddOverlayObject}
            onOverlayDrawingCoordsClear={this.onOverlayDrawingCoordsClear}
            btnTypeCheck={this.state.btnTypeCheck}
          >
          </Polyline>*/}


        </MapClass>

        <DrawOptionsPanel
          status={this.state.status}
          onBtnTypeChange={this.onBtnTypeChange}
          onBtnRender={this.onBtnRender}
          onAddListenerMarkerBtn={this.onAddListenerMarkerBtn}
          onAddListenerPolygonBtn={this.onAddListenerPolygonBtn}
          onAddListenerPolylineBtn={this.onAddListenerPolylineBtn}
          onAddListenerGrabBtn={this.onAddListenerGrabBtn}
          onAddListenerSaveBtn={this.onAddListenerSaveBtn}
        >
        </DrawOptionsPanel>
      </div>
    );
  }
}

export default App;
