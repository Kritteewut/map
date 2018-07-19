import React, { Component } from 'react';
import MapClass from './components/Map'
import Marker from './components/Marker';
import Polygon from './components/Polygon';
import Polyline from './components/Polyline';
import DrawOptionsPanel from './components/drawOptionsPanel';
import SearchBox from './components/searchBox';
import AddBtn from './components/AddBtn'
import ExampleLine from './components/ExampleLine';
import ExamplePolygon from './components/ExamplePolygon';

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
var my_script = new_script('https://maps.googleapis.com/maps/api/js?&libraries=geometry,drawing,places&key=AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo&callback=initMap&v=3.32');
var my_script2 = new_script('https://cdn.rawgit.com/bjornharrtell/jsts/gh-pages/1.0.2/jsts.min.js')

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      status: 'start',
      btnTypeCheck: '',
      overlayObject: [],
      overlayCoords: [],
      overlayIndex: 0,
      selectedOverlay: [],
      isFirstDraw: true,
      exampleLineCoords: [],
      examplePolygonCoords: [],
      polylineLength: 0,
    }
    this.onAddListenerMarkerBtn = this.onAddListenerMarkerBtn.bind(this)
    this.onAddListenerPolygonBtn = this.onAddListenerPolygonBtn.bind(this)
    this.onAddListenerPolylineBtn = this.onAddListenerPolylineBtn.bind(this)
    this.onAddListenerGrabBtn = this.onAddListenerGrabBtn.bind(this)
    this.addMarkerListener = this.addMarkerListener.bind(this)
    this.addPolygonListener = this.addPolygonListener.bind(this)
    this.addPolylineListener = this.addPolylineListener.bind(this)
    this.onPolylineLengthCompute = this.onPolylineLengthCompute.bind(this)
    this.onSquereMetersTrans = this.onSquereMetersTrans.bind(this)
    this.onAddPlan = this.onAddPlan.bind(this)

  }

  do_load = () => {
    var self = this;

    my_script.then(function () {
      self.setState({ 'status': 'done' });
    }).catch(function () {
      self.setState({ 'status': 'error' });
    })
    my_script2.then(function () {

    })
  }
  onBtnTypeChange(type) {
    if (this.state.btnTypeCheck === type) {
      return true
    } else {
      this.setState({
        btnTypeCheck: type
      })
    }
  }
  onExampleLineReset() {
    this.setState({
      exampleLineCoords: []
    })
  }
  onClearSomeMapEventListener() {
    window.google.maps.event.clearListeners(window.map, 'click')
    window.google.maps.event.clearListeners(window.map, 'mousemove')
  }
  onUtilitiesMethod() {
    var isFirstDraw = this.state.isFirstDraw
    if (isFirstDraw === false) {
      this.setState((prevState) => {
        return {
          overlayIndex: prevState.overlayIndex + 1,
          isFirstDraw: true
        };
      }, () => console.log(this.state.overlayCoords, 'overlayCoords'));
    }
    this.onExampleLineReset()
    //this.onResetSelectedOverlay()
  }
  onAddListenerMarkerBtn(btn) {
    var self = this
    window.google.maps.event.addDomListener(btn, 'click', function () {
      if (!(self.onBtnTypeChange('marker'))) {
        console.log('marker is click')
        self.onUtilitiesMethod()
        self.onClearSomeMapEventListener()
        self.onSetDrawingCursor()
        self.drawMarker()
      }
    })
  }
  onAddListenerPolygonBtn(btn) {
    var self = this
    window.google.maps.event.addDomListener(btn, 'click', function () {
      if (!(self.onBtnTypeChange('polygon'))) {
        console.log('polygon is click')
        self.onUtilitiesMethod()
        self.onClearSomeMapEventListener()
        self.onSetDrawingCursor()
        self.drawPolygon()
      }
    })
  }
  onAddListenerPolylineBtn(btn) {
    var self = this
    window.google.maps.event.addDomListener(btn, 'click', function () {
      if (!(self.onBtnTypeChange('polyline'))) {
        console.log('polyline is click')
        self.onUtilitiesMethod()
        self.onClearSomeMapEventListener()
        self.onSetDrawingCursor()
        self.drawPolyline()
      }
    })
  }
  onAddListenerGrabBtn(btn) {
    var self = this
    window.google.maps.event.addDomListener(btn, 'click', function () {
      self.onUtilitiesMethod()
      self.onClearSomeMapEventListener()
      self.onSetDragMapCursor()
      self.setState({
        btnTypeCheck: ''
      })
    })
  }
  onAddOverlayObject(overlay) {
    var temp = this.state.overlayObject
    temp.push(overlay)
    this.setState({
      overlayObject: temp
    }, () => console.log(this.state.overlayObject, 'overlay object'))
  }
  drawMarker() {
    var self = this
    window.google.maps.event.addListener(window.map, 'click', function (event) {
      let overlayIndex = self.state.overlayIndex
      let isFirstDraw = self.state.isFirstDraw
      let overlayCoords = self.state.overlayCoords
      let lat = event.latLng.lat()
      let lng = event.latLng.lng()
      if (isFirstDraw === true) {
        overlayCoords.push({ coords: [{ lat, lng }], overlayIndex, overlayType: 'marker', overlayDrawType: 'draw' })
      }
      self.setState({
        overlayCoords: overlayCoords,
        btnTypeCheck: '',
        isFirstDraw: false,
      }, () => {
        self.onUtilitiesMethod()
      })
    })
  }
  drawPolyline() {
    var self = this
    window.google.maps.event.addListener(window.map, 'click', function (event) {
      let lat = event.latLng.lat()
      let lng = event.latLng.lng()
      if (self.state.isFirstDraw === true) {
        let overlayIndex = self.state.overlayIndex
        let overlayCoords = self.state.overlayCoords
        overlayCoords.push({ coords: [{ lat, lng }], overlayIndex, overlayType: 'polyline', overlayDrawType: 'draw' })
        self.setState({
          isFirstDraw: false,
          btnTypeCheck: '',
          overlayCoords: overlayCoords,
        })
        self.onDrawExampleLine(event)
      } else {
        let overlayCoords = self.state.overlayCoords
        let coords = overlayCoords[overlayCoords.length - 1].coords
        coords.push({ lat, lng })
        self.setState(
          overlayCoords[overlayCoords.length - 1].coords = coords
        )
        self.onDrawExampleLine(event)
      }

    })
  }
  drawPolygon() {
    var self = this
    window.google.maps.event.addListener(window.map, 'click', function (event) {
      let lat = event.latLng.lat()
      let lng = event.latLng.lng()
      if (self.state.isFirstDraw === true) {
        let overlayIndex = self.state.overlayIndex
        let overlayCoords = self.state.overlayCoords
        overlayCoords.push({ coords: [{ lat, lng }], overlayIndex, overlayType: 'polygon', overlayDrawType: 'draw' })
        self.setState({
          isFirstDraw: false,
          btnTypeCheck: '',
          overlayCoords: overlayCoords,
        })
        //() => console.log(overlayCoords[overlayCoords.length - 1].coords)
        //self.onDrawExamplePolygon(coords)
        self.onDrawExampleLine(event)
      } else {
        let overlayCoords = self.state.overlayCoords
        let coords = overlayCoords[overlayCoords.length - 1].coords
        coords.push({ lat, lng })
        self.setState(
          overlayCoords[overlayCoords.length - 1].coords = coords
        )
        //self.onDrawExamplePolygon(coords)
        self.onDrawExampleLine(event)
      }
    })
  }
  onSetSelectOverlay(overlay) {
    this.onResetSelectedOverlay(overlay)
    if (overlay.overlayType === 'polygon' || overlay.overlayType === 'polyline') {
      overlay.setOptions({
        editable: true,
      })
    }
    if (overlay.overlayType === 'marker') {
      overlay.setOptions({
        draggable: true
      })
    }
  }
  onResetSelectedOverlay() {
  }
  addMarkerListener(marker) {
    var self = this
    window.google.maps.event.addListener(marker, 'click', function () {
      self.onSetSelectOverlay(marker)
    })
  }
  addPolygonListener(polygon) {

    var self = this
    window.google.maps.event.addListener(polygon, 'mouseup', function (event) {
      self.onSetSelectOverlay(polygon)
      if (event.vertex !== undefined || event.edge !== undefined) {
        self.onPolyCoordsEdit(polygon)
      }

    })
  }
  addPolylineListener(polyline) {
    var self = this
    window.google.maps.event.addListener(polyline, 'mouseup', function (event) {
      self.onSetSelectOverlay(polyline)
      if (event.vertex !== undefined || event.edge !== undefined) {
        self.onPolyCoordsEdit(polyline)
      }
    })
  }
  onDrawExampleLine(clickEvent) {
    var self = this
    window.google.maps.event.addListener(window.map, 'mousemove', function (event) {
      let mousemoveLat = event.latLng.lat()
      let mousemoveLng = event.latLng.lng()
      let clickLat = clickEvent.latLng.lat()
      let clickLng = clickEvent.latLng.lng()
      self.setState({
        exampleLineCoords: [{ lat: clickLat, lng: clickLng }, { lat: mousemoveLat, lng: mousemoveLng }]
      })
    })
  }
  onDrawExamplePolygon(coords) {
    var self = this
    let tempCoords = coords
    window.google.maps.event.addListener(window.map, 'mousemove', function (event) {
      let mousemoveLat = event.latLng.lat()
      let mousemoveLng = event.latLng.lng()

      let length = coords.length
      tempCoords[length] = { lat: mousemoveLat, lng: mousemoveLng }

      console.log(tempCoords, 'exam')

      // self.setState({
      //   examplePolygonCoords: coords
      // })

    })
  }
  onPolyCoordsEdit(poly) {
    let overlayCoords = this.state.overlayCoords
    let polyIndex = poly.overlayIndex
    let overlayIndex = overlayCoords.findIndex(overlay => overlay.overlayIndex === polyIndex)

    let editCoords = []

    poly.getPath().b.forEach(element => {
      let lat = element.lat()
      let lng = element.lng()
      editCoords.push({ lat, lng })
    })
    this.setState(
      overlayCoords[overlayIndex].coords = editCoords
    )
    console.log(this.state.overlayCoords,'ediited coords')
  }

  onSetDrawingCursor() {
    window.map.setOptions({
      draggableCursor: 'crosshair'
    })
  }
  onSetDragMapCursor() {
    window.map.setOptions({
      draggableCursor: null,
      draggingCursor: null
    })
  }
  onPolylineLengthCompute = (polyline) => {
    var length = window.google.maps.geometry.spherical.computeLength(polyline.getPath())
    return console.log('ความยาวรวม', length.toFixed(3), 'เมตร')
  }
  onSquereMetersTrans(polygon) {
    var area = window.google.maps.geometry.spherical.computeArea(polygon.getPath())
    let rnwString = ''
    var rai, ngan, wa, temp1, temp2

    rai = Math.floor(area / 1600)
    temp1 = area % 1600
    ngan = Math.floor(temp1 / 400)
    temp2 = temp1 % 400
    wa = parseFloat((temp2 / 4).toFixed(3), 10)

    if (rai > 0) {
      rnwString = ''
      rnwString = rnwString + rai + ' ไร่ '
    }
    if (ngan > 0) {
      rnwString = rnwString + ngan + ' งาน '
    }
    if (wa > 0) {
      rnwString = rnwString + wa + ' ตารางวา '
    }
    else { rnwString = '0 ตารางวา' }

    return console.log('พื้นที่คือ ', rnwString)
  }
  onAddPlan() {
    // var overlayCoords = this.state.overlayCoords
    this.setState({
      overlayCoords: []
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
          {this.state.overlayCoords.map(value => {
            let overlayCoords = value.coords
            let overlayIndex = value.overlayIndex
            let overlayDrawType = value.overlayDrawType

            if (value.overlayType === 'polygon') {
              return (
                <Polygon
                  key={overlayIndex}
                  overlayCoords={overlayCoords}
                  overlayIndex={overlayIndex}
                  overlayDrawType={overlayDrawType}
                  addPolygonListener={this.addPolygonListener}
                  onSquereMetersTrans={this.onSquereMetersTrans}
                />
              )
            }
            if (value.overlayType === 'polyline') {
              return (<Polyline
                key={overlayIndex}
                overlayCoords={overlayCoords}
                overlayIndex={overlayIndex}
                overlayDrawType={overlayDrawType}
                addPolylineListener={this.addPolylineListener}
                onPolylineLengthCompute={this.onPolylineLengthCompute}
              />)
            }
            if (value.overlayType === 'marker') {
              return (
                <Marker
                  key={overlayIndex}
                  overlayCoords={overlayCoords}
                  overlayIndex={overlayIndex}
                  overlayDrawType={overlayDrawType}
                  addMarkerListener={this.addMarkerListener}
                />
              )
            }
            return null;
          })
          }
          <SearchBox
            status={this.state.status}
          />
          <ExampleLine
            exampleLineCoords={this.state.exampleLineCoords}
            onPolylineLengthCompute={this.onPolylineLengthCompute}
          />
          <ExamplePolygon
            examplePolygonCoords={this.state.examplePolygonCoords}
          />
        </MapClass>
        <AddBtn
          onAddPlan={this.onAddPlan}
        />
        <DrawOptionsPanel
          status={this.state.status}
          onAddListenerMarkerBtn={this.onAddListenerMarkerBtn}
          onAddListenerPolygonBtn={this.onAddListenerPolygonBtn}
          onAddListenerPolylineBtn={this.onAddListenerPolylineBtn}
          onAddListenerGrabBtn={this.onAddListenerGrabBtn}
        />
      </div>
    );
  }
}

export default App;
