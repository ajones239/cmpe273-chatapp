import React, { Component } from "react";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import './ImageSelector.scss';

class ImageSelector extends Component {
  constructor(props) {
    super(props);
    this.state = { images: [] };
  }

  componentDidMount() {
    let iterator = fetch("http://localhost:8000/api/image", {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    });
    iterator.then(res => res.json())
      .then(dat => {
        this.setState({images: dat});
      });
  }

  render() {
    console.log(this.state.images[0]);
    if (this.state.images[0] === undefined) {
      return (
        <div className="ImageSelector">
          <p>Images loading...</p>
        </div>
      );
    } else {
      const images = this.state.images.map((img, index) => (
        <input type="image" style={{width: "100px"}} src={`data:image/jpg;base64,${img.data}`} value={img.data} onClick={this.props.send} alt="" />
      ));

      return (
        
        <div className="ImageSelector">
          <AliceCarousel mouseTracking keyboardNavigation infinite>
            {images}
          </AliceCarousel>
        </div>
      );
    }
  }
}

export default ImageSelector;
