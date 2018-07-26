import { Component } from 'react';
import '../components/SearchBoxStyles.css'

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRender: false
    }
    this.searchBox = false
    this.markers = []
    this.bounds = false
    this.renderSearchBox = this.renderSearchBox.bind(this)
    //this.deleteme = this.deleteme.bind(this)
  }

  renderSearchBox() {
    var input = document.getElementById('pac-input');
    this.searchBox = new window.google.maps.places.SearchBox(input);
    window.map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    window.map.addListener('bounds_changed', () => {
      this.searchBox.setBounds(window.map.getBounds());
    });

    this.markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    this.searchBox.addListener('places_changed', () => {
      var places = this.searchBox.getPlaces();

      if (places.length === 0) {
        return;
      }

      // Clear out the old markers.
      this.markers.forEach((marker) => {
        marker.setMap(null);
      });
      this.markers = [];

      // For each place, get the icon, name and location.
      this.bounds = new window.google.maps.LatLngBounds();
      places.forEach((place) => {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        var icon = {
          url: place.icon,
          size: new window.google.maps.Size(71, 71),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(17, 34),
          scaledSize: new window.google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        this.markers.push(new window.google.maps.Marker({
          map: window.map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          this.bounds.union(place.geometry.viewport);
        } else {
          this.bounds.extend(place.geometry.location);
        }
      });
      window.map.fitBounds(this.bounds);
    });

  }

  render() {

    var self = this;
    if (self.props.status === 'done') {
      if (self.state.isRender === false) {
        self.state.isRender = true;
        setTimeout(function () {
          self.renderSearchBox()
        }, 0);
      }
    }
    return (null)
  }
}
export default SearchBox