import React, { Component } from 'react';
import MapClass from './components/Map'
import Marker from './components/Marker';
import Polygon from './components/Polygon';
import Polyline from './components/Polyline';
import SearchBox from './components/searchBox';
import ExampleLine from './components/ExampleLine';
import ExamplePolygon from './components/ExamplePolygon';
import NiceModal from './components/Modal';
import GeolocatedMe from './components/Geolocation';
import IconLabelButtons from './components/DrawingBtn';
import UserLocationMarker from './components/UserLocationMarker';
import PermanentDrawer from './components/Navigation'
import { db } from './config/firebase'
import OverlayOptions from './components/OverlayOptions';
import OpenSide from './components/openSideBtn';
import OpenOption from './components/openOption'
import icon_point from './components/icons/icon_point.png';
import DetailedExpansionPanel from './components/DetailedExpansionPanel'
import TransparentMaker from './components/TransparentMaker';


const shapesRef = db.collection('shapes')
const planRef = db.collection('plan')

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
var my_script = new_script('https://maps.googleapis.com/maps/api/js?&libraries=geometry,drawing,places,visualization&key=&callback=initMap&v=3.32');
var my_script2 = new_script('https://cdn.rawgit.com/bjornharrtell/jsts/gh-pages/1.0.2/jsts.min.js')


class App extends Component {
  static async getInitialProps(props) {
    return console.log('get init!', props)
    // auth.onAuthStateChanged((user) => {
    //     if (user) {
    //         this.setState({ user });
    //         console.log(user)
    //     }
    // });
  }
  constructor(props) {
    super(props)
    this.state = {
      status: 'start',
      btnTypeCheck: '',
      overlayObject: [],
      overlayIndex: 0,
      selectedOverlay: null,
      exampleLineCoords: [],
      isFirstDraw: true,
      examplePolygonCoords: [],
      userLocationCoords: [],
      polylineLength: 0,
      planData: [],
      currentPlanData: [],
      fillColor: '#ffa500',
      strokeColor: '#ff4500',
      user: null,
      selectedColor: '',
      openSide: false,
      openOption: false,
      left: '0vw',
      bottom: '0vw',
      isOverlayOptionsOpen: false,
      overlayOptionsType: '',
      icon: icon_point,
      currentDate: new Date(),
      circleAroundMarkerCoords: [],
      panelName: '',
      panelDetail: '',
      distanceDetail: [],
    }
    this.onAddListenerMarkerBtn = this.onAddListenerMarkerBtn.bind(this)
    this.onAddListenerPolygonBtn = this.onAddListenerPolygonBtn.bind(this)
    this.onAddListenerPolylineBtn = this.onAddListenerPolylineBtn.bind(this)
    this.onAddListenerGrabBtn = this.onAddListenerGrabBtn.bind(this)
    this.addMarkerListener = this.addMarkerListener.bind(this)
    this.addPolygonListener = this.addPolygonListener.bind(this)
    this.addPolylineListener = this.addPolylineListener.bind(this)
    this.onSquereMetersTrans = this.onSquereMetersTrans.bind(this)
    this.onAddPlan = this.onAddPlan.bind(this)
    this.getGeolocation = this.getGeolocation.bind(this)
    this.onSelectCurrentPlanData = this.onSelectCurrentPlanData.bind(this)
    this.onSaveToFirestore = this.onSaveToFirestore.bind(this)
    this.onSetUser = this.onSetUser.bind(this)
    this.onChangePolyStrokeColor = this.onChangePolyStrokeColor.bind(this)
    this.onChangePolyFillColor = this.onChangePolyFillColor.bind(this)
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this)
    this.handleDrawerClose = this.handleDrawerClose.bind(this)
    this.handleOptionOpen = this.handleOptionOpen.bind(this)
    this.onSetSelectedIcon = this.onSetSelectedIcon.bind(this)
    this.addUserMarkerListener = this.addUserMarkerListener.bind(this)


  }
  componentDidMount() {
    this.onQueryPlanFromFirestore()
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
      this.setState({ btnTypeCheck: type })
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
    const { isFirstDraw, overlayObject, distanceDetail } = this.state
    if (isFirstDraw === false) {
      const currentOvrelay = overlayObject[overlayObject.length - 1]
      const coordsLength = currentOvrelay.coords.length
      if (currentOvrelay.overlayType === 'polygon' && coordsLength < 3) {
        overlayObject.splice(overlayObject.length - 1, 1)
        distanceDetail.splice(distanceDetail.length - 1, 1)
        alert('รูปหลายเหลี่ยมที่มีจำนวนจุดมากกว่าสองจุดเท่านั้นจึงจะถูกบันทึกได้')
      }
      if (currentOvrelay.overlayType === 'polyline' && coordsLength < 2) {
        overlayObject.splice(overlayObject.length - 1, 1)
        distanceDetail.splice(distanceDetail.length - 1, 1)
        alert('เส้นเชื่อมที่มีจำนวนจุดมากหนึ่งจุดเท่านั้นจึงจะถูกบันทึกได้')
      }
      this.setState((prevState) => {
        return {
          overlayIndex: prevState.overlayIndex + 1,
          isFirstDraw: true
        };
      }, () => console.log(this.state.overlayObject, 'overlayCoords'));
    }
    this.onExampleLineReset()
    this.onResetSelectedOverlay()
  }
  onAddListenerMarkerBtn() {
    this.onUtilitiesMethod()
    if (!(this.onBtnTypeChange('marker'))) {
      this.onSetMarkerOptions()
      this.handleOptionOpen()
      this.onClearSomeMapEventListener()
      this.onSetDrawingCursor()
      this.drawMarker()
    }
  }
  onAddListenerPolygonBtn() {
    this.onUtilitiesMethod()
    if (!(this.onBtnTypeChange('polygon'))) {
      this.onSetPolyOptions()
      this.handleOptionOpen()
      this.onClearSomeMapEventListener()
      this.onSetDrawingCursor()
      this.drawPolygon()
    }
  }
  onAddListenerPolylineBtn() {
    this.onUtilitiesMethod()
    if (!(this.onBtnTypeChange('polyline'))) {
      this.onSetPolyOptions()
      this.handleOptionOpen()
      this.onClearSomeMapEventListener()
      this.onSetDrawingCursor()
      this.drawPolyline()
    }
  }
  onAddListenerGrabBtn() {
    this.handleOptionClose()
    this.onClearSomeMapEventListener()
    this.onUtilitiesMethod()
    this.onSetDragMapCursor()
    this.setState({
      btnTypeCheck: ''
    })
  }
  drawMarker() {
    var self = this
    window.google.maps.event.addListener(window.map, 'click', function (event) {
      let { overlayIndex, isFirstDraw, overlayObject, icon } = self.state
      let lat = event.latLng.lat()
      let lng = event.latLng.lng()
      if (isFirstDraw === true) {
        overlayObject.push({
          coords: [{ lat, lng }],
          overlayIndex,
          overlayType: 'marker',
          overlayDrawType: 'draw',
          icon: icon,
        })
      }
      self.setState({
        overlayObject,
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
        let { overlayIndex, overlayObject, strokeColor } = self.state
        overlayObject.push({
          coords: [{ lat, lng }],
          overlayIndex,
          overlayType: 'polyline',
          overlayDrawType: 'draw',
          strokeColor: strokeColor,
        })
        self.onDrawExampleLine(event)
        self.onPolydistanceBtwComputeForCoords()
        self.setState({
          isFirstDraw: false,
          btnTypeCheck: '',
          overlayObject,
        })
      } else {
        let { overlayObject } = self.state
        overlayObject[overlayObject.length - 1].coords.push({ lat, lng })
        self.onPolyLengthComputeForCoords()
        self.setState({ overlayObject })
        self.onDrawExampleLine(event)
        self.onPolydistanceBtwComputeForCoords()
      }
    })
  }
  drawPolygon() {
    var self = this
    window.google.maps.event.addListener(window.map, 'click', function (event) {
      let lat = event.latLng.lat()
      let lng = event.latLng.lng()

      if (self.state.isFirstDraw === true) {
        let { overlayIndex, overlayObject, fillColor, strokeColor, } = self.state
        overlayObject.push({
          coords: [{ lat, lng }],
          overlayIndex,
          overlayType: 'polygon',
          overlayDrawType: 'draw',
          fillColor: fillColor,
          strokeColor: strokeColor,
        })
        self.onDrawExampleLine(event)
        self.onPolydistanceBtwComputeForCoords()
        self.setState({
          isFirstDraw: false,
          btnTypeCheck: '',
          overlayObject,
        })
      } else {
        let { overlayObject } = self.state
        overlayObject[overlayObject.length - 1].coords.push({ lat, lng })
        self.onPolyLengthComputeForCoords()
        self.setState({ overlayObject })
        self.onDrawExampleLine(event)
        self.onPolydistanceBtwComputeForCoords()
      }
    })
  }
  onSetSelectOverlay(overlay) {
    this.onResetSelectedOverlay()
    if (overlay.overlayType === 'polygon' || overlay.overlayType === 'polyline') {
      overlay.setOptions({ editable: true, })
      this.setState({ selectedOverlay: overlay })
    }
    if (overlay.overlayType === 'marker') {
      overlay.setOptions({ draggable: true, })
      var coords = { lat: overlay.getPosition().lat(), lng: overlay.getPosition().lng() }
      this.setState({ selectedOverlay: overlay, circleAroundMarkerCoords: coords })

      // window.google.maps.event.addListener(window.map, 'zoom_changed', function () {
      // })
    }
  }
  onResetSelectedOverlay() {
    const { selectedOverlay } = this.state
    if (selectedOverlay !== null) {
      if (selectedOverlay.overlayType === 'polygon' || selectedOverlay.overlayType === 'polyline') {
        selectedOverlay.setOptions({ editable: false, })
        this.setState({ selectedOverlay: null })
      }
      if (selectedOverlay.overlayType === 'marker') {
        selectedOverlay.setOptions({ draggable: false, })
        this.setState({ selectedOverlay: null })
      }
    }
  }
  addMarkerListener(marker) {
    var self = this
    window.google.maps.event.addListener(marker, 'mousedown', function () {
      self.onSetMarkerOptions()
      self.onOverlayOptionsOpen()
      self.onSetSelectOverlay(marker)
    })
    window.google.maps.event.addListener(marker, 'drag', function () {
      self.setState({ selectedOverlay: marker })
    })
    window.google.maps.event.addListener(marker, 'dragend', function () {
      let overlayCoords = self.state.overlayObject
      let markerIndex = marker.overlayIndex
      let overlayIndex = overlayCoords.findIndex(overlay => overlay.overlayIndex === markerIndex)
      let editCoords = []
      editCoords = [{ lat: marker.getPosition().lat(), lng: marker.getPosition().lng() }]
      overlayCoords[overlayIndex].coords = editCoords
      self.setState({ overlayCoords })
      console.log(self.state.overlayObject[overlayIndex], 'ediited coords')
    })
  }
  addPolygonListener(polygon) {
    var self = this
    window.google.maps.event.addListener(polygon, 'click', function () {
      self.onSetPolyOptions()
      self.onOverlayOptionsOpen()
      self.onSetSelectOverlay(polygon)
      self.onPolyLengthComputeForOverlay()
    })
    window.google.maps.event.addListener(polygon, 'mouseup', function (event) {
      if (event.vertex !== undefined || event.edge !== undefined) {
        self.onPolyCoordsEdit(polygon)
        self.onPolyLengthComputeForOverlay()
        self.onPolydistanceBtwComputeForOverlay()
      }
    })
  }
  addPolylineListener(polyline) {
    var self = this
    window.google.maps.event.addListener(polyline, 'click', function () {
      self.onSetPolyOptions()
      self.onOverlayOptionsOpen()
      self.onSetSelectOverlay(polyline)
      self.onPolyLengthComputeForOverlay()
    })
    window.google.maps.event.addListener(polyline, 'mouseup', function (event) {
      if (event.vertex !== undefined || event.edge !== undefined) {
        self.onPolyCoordsEdit(polyline)
        self.onPolyLengthComputeForOverlay()
        self.onPolydistanceBtwComputeForOverlay()
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
    // let { examplePolygonCoords } = this.state
    // let length = examplePolygonCoords.length
    // var self = this
    // window.google.maps.event.addListener(window.map, 'mousemove', function (event) {
    //   let mousemoveLat = event.latLng.lat()
    //   let mousemoveLng = event.latLng.lng()
    //   let mlatlng = { lat: mousemoveLat, lng: mousemoveLng }
    //   self.setState({
    //     examplePolygonCoords: coords
    //   }, () => console.log(self.state.examplePolygonCoords))
    //})
  }
  onPolyCoordsEdit(polygon) {
    let overlayCoords = this.state.overlayObject
    let polyIndex = polygon.overlayIndex
    let overlayIndex = overlayCoords.findIndex(overlay => overlay.overlayIndex === polyIndex)
    let editCoords = []
    polygon.getPath().getArray().forEach(element => {
      let lat = element.lat()
      let lng = element.lng()
      editCoords.push({ lat, lng })
    })
    overlayCoords[overlayIndex].coords = editCoords
    this.setState({ overlayCoords })
  }
  onMarkerCoordsEdit(marker) {

  }
  onSetDrawingCursor() {
    window.map.setOptions({ draggableCursor: 'crosshair' })
  }
  onSetDragMapCursor() {
    window.map.setOptions({ draggableCursor: null, draggingCursor: null })
  }
  onPolyLengthComputeForCoords() {
    var { overlayObject } = this.state
    var currentObject = overlayObject[overlayObject.length - 1]
    var currentCoords = currentObject.coords
    var endPoint = currentCoords[currentCoords.length - 1]
    var startPoint = currentCoords[0]

    var endLatLng = new window.google.maps.LatLng(endPoint);
    var startLatLng = new window.google.maps.LatLng(startPoint);

    var polyCom = new window.google.maps.Polyline({ path: currentCoords })
    var sumLength = window.google.maps.geometry.spherical.computeLength(polyCom.getPath())

    if (currentObject.overlayType === 'polygon' && currentCoords.length > 2) {
      let endTostartDis = window.google.maps.geometry.spherical.computeDistanceBetween(endLatLng, startLatLng)
      sumLength += endTostartDis
    }
    console.log('ความยาวรวม', sumLength.toFixed(3), 'เมตร')

  }
  onPolydistanceBtwComputeForCoords() {
    var { distanceDetail, overlayObject, isFirstDraw, overlayIndex } = this.state
    var currentCoords = overlayObject[overlayObject.length - 1].coords
    if (isFirstDraw === true) {
      distanceDetail.push({ detail: [], overlayIndex })
      console.log('ce')
    } else {
      console.log('re')
      var currentDetial = distanceDetail[distanceDetail.length - 1]
      currentDetial.detail = []
      this.setState({ distanceDetail })

      for (var i = 1; i < currentCoords.length; i++) {
        let endPoint = currentCoords[i]
        let prevEndPoint = currentCoords[i - 1]
        let endLatLng = new window.google.maps.LatLng(endPoint);
        let prevEndLatLng = new window.google.maps.LatLng(prevEndPoint);
        currentDetial.detail.push({
          midpoint: { lat: (endPoint.lat + prevEndPoint.lat) / 2, lng: (endPoint.lng + prevEndPoint.lng) / 2 },
          disBtw: window.google.maps.geometry.spherical.computeDistanceBetween(endLatLng, prevEndLatLng),
        })
      }

      if (overlayObject[overlayObject.length - 1].overlayType === 'polygon') {
        let endPoint = currentCoords[currentCoords.length - 1]
        let startPoint = currentCoords[0]
        let endLatLng = new window.google.maps.LatLng(endPoint);
        let startLatLng = new window.google.maps.LatLng(startPoint);
        currentDetial.detail.push({
          midpoint: { lat: (endPoint.lat + startPoint.lat) / 2, lng: (endPoint.lng + startPoint.lng) / 2 },
          disBtw: window.google.maps.geometry.spherical.computeDistanceBetween(endLatLng, startLatLng)
        })
      }
      this.setState({ distanceDetail })
    }
  }

  onPolyLengthComputeForOverlay() {
    var { selectedOverlay } = this.state
    let sumLength = window.google.maps.geometry.spherical.computeLength(selectedOverlay.getPath())
    if (selectedOverlay.overlayType === 'polygon') {
      let end = selectedOverlay.getPath().getAt(selectedOverlay.getPath().getLength() - 1)
      let start = selectedOverlay.getPath().getAt(0)
      let endTostartDis = window.google.maps.geometry.spherical.computeDistanceBetween(start, end)
      sumLength += endTostartDis
    }
    console.log('ความยาวรวม', sumLength.toFixed(3), 'เมตร')
  }
  onPolydistanceBtwComputeForOverlay() {
    var { distanceDetail, selectedOverlay, } = this.state
    var overlayIndex = selectedOverlay.overlayIndex
    var detailIndex = distanceDetail.findIndex(detail => detail.overlayIndex === overlayIndex)
    distanceDetail.splice(detailIndex, 1)
    this.setState({ distanceDetail })
    var editCoords = []
    selectedOverlay.getPath().getArray().forEach(element => {
      let lat = element.lat()
      let lng = element.lng()
      editCoords.push({ lat, lng })
    })

    distanceDetail.push({ detail: [], overlayIndex })
    var currentDetial = distanceDetail[distanceDetail.length - 1]

    for (var i = 1; i < editCoords.length; i++) {
      let endPoint = editCoords[i]
      let prevEndPoint = editCoords[i - 1]
      let endLatLng = new window.google.maps.LatLng(endPoint);
      let prevEndLatLng = new window.google.maps.LatLng(prevEndPoint);
      currentDetial.detail.push({
        midpoint: { lat: (endPoint.lat + prevEndPoint.lat) / 2, lng: (endPoint.lng + prevEndPoint.lng) / 2 },
        disBtw: window.google.maps.geometry.spherical.computeDistanceBetween(endLatLng, prevEndLatLng),
      })
    }
    if (selectedOverlay.overlayType === 'polygon') {
      let endPoint = editCoords[editCoords.length - 1]
      let startPoint = editCoords[0]
      let endLatLng = new window.google.maps.LatLng(endPoint);
      let startLatLng = new window.google.maps.LatLng(startPoint);
      currentDetial.detail.push({
        midpoint: { lat: (endPoint.lat + startPoint.lat) / 2, lng: (endPoint.lng + startPoint.lng) / 2 },
        disBtw: window.google.maps.geometry.spherical.computeDistanceBetween(endLatLng, startLatLng)
      })
    }
    this.setState({ distanceDetail })
  }
  onSquereMetersTrans(polygon) {
    var area = window.google.maps.geometry.spherical.computeArea(polygon.getPath())
    let rnwString = ''
    var rai, ngan, wa, raiFraction, nganFraction

    rai = Math.floor(area / 1600)
    raiFraction = area % 1600
    ngan = Math.floor(raiFraction / 400)
    nganFraction = raiFraction % 400
    wa = parseFloat((nganFraction / 4).toFixed(3), 10)

    if (rai > 0) { rnwString = rnwString + rai + ' ไร่ ' }
    if (ngan > 0) { rnwString = rnwString + ngan + ' งาน ' }
    if (wa > 0) { rnwString = rnwString + wa + ' ตารางวา ' }
    else { rnwString = '0 ตารางวา' }
    return console.log('พื้นที่คือ ', rnwString)
  }
  onSaveToFirestore() {
    let self = this
    let overlayCoords = this.state.overlayObject
    overlayCoords.map(value => {
      // add coords array to cloud firestore
      if (value.overlayDrawType === 'draw') {
        shapesRef.add({
          // add data here
          coords: value.coords,
          overlayType: value.overlayType,
          planId: value.planId,
          //overlayOptions: value['overlayOptions'],
        }).then(
          console.log('notice me senpai!'))
      } else {
        shapesRef.doc(value.overlayIndex).set({
          coords: value.coords,
        }, { merge: true });
      }
      return null;
    })
    self.onOverlayRedraw()
  }
  onOverlayRedraw() {
    let self = this
    let planId = self.state.currentPlanData.planId
    this.setState({ overlayCoords: [] })
    shapesRef.where('planId', '==', planId).get().then(function (querySnapshot) {
      let overlayCoords = self.state.overlayObject
      querySnapshot.forEach(function (doc) {
        let coords = doc.data().coords
        let overlayIndex = doc.id
        let overlayType = doc.data().overlayType
        overlayCoords.push({
          coords: coords,
          overlayIndex: overlayIndex,
          overlayType: overlayType,
          overlayDrawType: 'redraw',
          planId,
        })
      })
      self.setState({ overlayCoords: overlayCoords })
      self.onFitBounds(overlayCoords)
    })

  }
  onAddPlan(planName) {
    var self = this
    var uid = this.state.user.uid

    planRef.add({ planName, uid })
    planRef.onSnapshot(function (snapshot) {
      snapshot.docChanges().forEach(function (change) {
        if (change.type === "added") {
          //console.log(change.doc.data())
          self.onQueryPlanFromFirestore()
        }
      });
    });
  }
  getGeolocation() {
    var LatLngString = ''
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position.coords)
      window.map.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude })
      window.map.setZoom(18)
      window.map.panTo({ lat: position.coords.latitude, lng: position.coords.longitude })
      LatLngString = 'lattitude : ' + position.coords.latitude.toFixed(4) + ' , ' + 'longtitude : ' + position.coords.longitude.toFixed(4)
      this.setState({
        userLocationCoords: [{ lat: position.coords.latitude, lng: position.coords.longitude }],
        panelDetail: LatLngString,
        panelName: 'Your Location'
      })
    })
  }
  onSetMapNullUserMaker() {
    this.setState({ userLocationCoords: [] })
  }
  addUserMarkerListener(marker) {
    var self = this
    window.google.maps.event.addListener(marker, 'click', function () {
      self.onSetMapNullUserMaker()
    })
  }
  onQueryPlanFromFirestore() {
    // get all plan list from frirestore filter by user ID
    this.setState({
      planData: []
    })
    let planData = this.state.planData
    var self = this
    planRef.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        planData.push({
          planName: doc.data().planName,
          planId: doc.id,
        })
      })
      self.setState({
        planData: planData
      })
    })

  }
  onSelectCurrentPlanData(planData) {
    var self = this
    this.setState({
      currentPlanData: planData
    }, () => self.onOverlayRedraw())
    console.log(this.state.currentPlanData)
  }

  onFitBounds(overlayCoords) {
    if (overlayCoords.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      overlayCoords.forEach(value => {
        value.coords.forEach(value2 => {
          bounds.extend(new window.google.maps.LatLng(value2))
        })
      })
      window.map.fitBounds(bounds)
    }
  }
  onChangePolyStrokeColor(color) {
    var { selectedOverlay, overlayObject } = this.state
    if (selectedOverlay !== null) {
      selectedOverlay.setOptions({
        strokeColor: color
      })
      let polyIndex = selectedOverlay.overlayIndex
      let overlayIndex = overlayObject.findIndex(overlay => overlay.overlayIndex === polyIndex)
      overlayObject[overlayIndex].strokeColor = color
      this.setState({ overlayObject })
    }
    this.setState({
      strokeColor: color
    })
  }
  onChangePolyFillColor(color) {
    var { selectedOverlay, overlayObject } = this.state
    if (selectedOverlay) {
      selectedOverlay.setOptions({ fillColor: color })
      let polyIndex = selectedOverlay.overlayIndex
      let overlayIndex = overlayObject.findIndex(overlay => overlay.overlayIndex === polyIndex)
      overlayObject[overlayIndex].fillColor = color
      this.setState({ overlayObject })
    }
    this.setState({ fillColor: color })
  }
  onSetUser(user, email) {
    this.setState({
      user: user,
      email: email
    }, () => console.log(this.state.user.uid))
  }

  onOverlayOptionsOpen() {
    this.setState({ isOverlayOptionsOpen: true })
  }
  onOverlayOptionsClose() {
    this.setState({ isOverlayOptionsOpen: false })
  }
  onSetMarkerOptions() {
    this.setState({ overlayOptionsType: 'marker' })
  }
  onSetPolyOptions() {
    this.setState({ overlayOptionsType: 'poly' })
  }
  onSetSelectedIcon(icon) {
    var { selectedOverlay, overlayObject } = this.state
    if (selectedOverlay) {
      selectedOverlay.setOptions({ icon: icon })
      let markerIndex = selectedOverlay.overlayIndex
      let overlayIndex = overlayObject.findIndex(overlay => overlay.overlayIndex === markerIndex)
      overlayObject[overlayIndex].icon = icon
      this.setState({ overlayObject })
    }
    this.setState({ icon: icon })
  }

  handleDrawerOpen = () => {
    this.setState({
      openSide: true,
      left: '350px',
    });
  };

  handleDrawerClose = () => {
    this.setState({
      openSide: false,
      left: '0vw',
    });
  };

  handleOptionOpen = () => {
    this.setState({
      openOption: true,
      bottom: '8.7vw',
    });
  };

  handleOptionClose = () => {
    this.setState({
      openOption: false,
      bottom: '0vw',
    });
  };

  //this is rederrrrr
  render() {
    var self = this;
    if (self.state.status === 'start') {
      self.state.status = 'loading';
      setTimeout(function () {
        self.do_load()
      }, 0);
    }
    return (
      <div
        style={{
          height: '100%',
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
        }}
      >
      <input id="pac-input" class="controls" type="text" placeholder="Find place"/>
        <MapClass
          left={this.state.left}
          bottom={this.state.bottom}
        >
          {this.state.overlayObject.map(value => {

            const overlayCoords = value.coords
            const overlayIndex = value.overlayIndex
            const overlayDrawType = value.overlayDrawType
            const fillColor = value.fillColor
            const strokeColor = value.strokeColor
            const icon = value.icon
            if (value.overlayType === 'polygon') {
              return (
                <Polygon
                  key={overlayIndex}
                  overlayCoords={overlayCoords}
                  overlayIndex={overlayIndex}
                  overlayDrawType={overlayDrawType}
                  fillColor={fillColor}
                  strokeColor={strokeColor}
                  addPolygonListener={this.addPolygonListener}
                  isFirstDraw={this.state.isFirstDraw}
                />
              )
            }
            if (value.overlayType === 'polyline') {
              return (
                <div>
                  <Polyline
                    key={overlayIndex}
                    overlayCoords={overlayCoords}
                    overlayIndex={overlayIndex}
                    overlayDrawType={overlayDrawType}
                    strokeColor={strokeColor}
                    addPolylineListener={this.addPolylineListener}
                    isFirstDraw={this.state.isFirstDraw}
                  />
                </div>
              )
            }
            if (value.overlayType === 'marker') {
              return (
                <Marker
                  key={overlayIndex}
                  overlayCoords={overlayCoords}
                  overlayIndex={overlayIndex}
                  overlayDrawType={overlayDrawType}
                  addMarkerListener={this.addMarkerListener}
                  icon={icon}
                />
              )

            }
            return (null)
          })
          }
          <SearchBox
            status={this.state.status}
          />

          <ExampleLine
            exampleLineCoords={this.state.exampleLineCoords}
            onPolylineLengthCompute={this.onPolyLengthCompute}
            strokeColor={this.state.strokeColor}
          />

          <ExamplePolygon
            examplePolygonCoords={this.state.examplePolygonCoords}
          />

          {this.state.userLocationCoords.map(value => {
            return (
              <UserLocationMarker
                userLocationCoords={value}
                addUserMarkerListener={this.addUserMarkerListener}
              />
            )
          })
          }
          <GeolocatedMe
            getGeolocation={this.getGeolocation}
          />

          <NiceModal
            onAddPlan={this.onAddPlan}
          />
          {this.state.distanceDetail.map(value => {
            return (
              value.detail.map(value2 => {
                return (
                  <TransparentMaker
                    midpoint={value2.midpoint}
                    disBtw={value2.disBtw}
                  />
                )
              })
            )
          })
          }
          <OpenSide
            handleDrawerOpen={this.handleDrawerOpen}
            handleDrawerClose={this.handleDrawerClose}
            openSide={this.state.openSide}
          />

          <IconLabelButtons
            onAddListenerMarkerBtn={this.onAddListenerMarkerBtn}
            onAddListenerPolygonBtn={this.onAddListenerPolygonBtn}
            onAddListenerPolylineBtn={this.onAddListenerPolylineBtn}
            onAddListenerGrabBtn={this.onAddListenerGrabBtn}
            onSaveToFirestore={this.onSaveToFirestore}
          />
          <DetailedExpansionPanel
            {...this.state}
          />
        </MapClass>
        <PermanentDrawer
          planData={this.state.planData}
          currentPlanData={this.state.currentPlanData}
          onSelectCurrentPlanData={this.onSelectCurrentPlanData}
          onSetUser={this.onSetUser}
          {...this.state}
        />
        <OverlayOptions
          onSetSelectedColor={this.onSetSelectedColor}
          onChangePolyStrokeColor={this.onChangePolyStrokeColor}
          onChangePolyFillColor={this.onChangePolyFillColor}
          onSetSelectedIcon={this.onSetSelectedIcon}
          {...this.state}
        />

      </div>
    );
  }
}

export default App;