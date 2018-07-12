import { Component } from 'react';

class Marker extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.marker = false
        this.redrawMarker = this.redrawMarker.bind(this)

        //this. = this..bind(this)
    }
    componentDidMount() {
    }

    redrawMarker() {
        this.marker = new window.google.maps.Marker({
            position: this.props.coords,
            map: window.map,
        })
        var self = this
        window.google.maps.event.addListener(self.marker, 'click', function (e) {
            self.props.click(self.marker)
        })

    }


    render() {
        this.redrawMarker()

        return (null);
    }
}

export default Marker;
