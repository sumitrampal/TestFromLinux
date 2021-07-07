import React from "react";
import "./viewGallery.scss";

class ViewGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeThumbnail: `${this.props.id}-0`,
      previewedImage: this.props.images[0]
    };
  }
  onThumbnailClick = (id) => {
    let image = document.getElementById(id).src;
    this.setState({ activeThumbnail: id, previewedImage: image });
  };
  componentDidMount() {
    document
      .getElementById(this.state.activeThumbnail)
      .classList.add("active-thumbnail");
  }
  componentDidUpdate(prevProps, prevState) {
    let image = document.getElementById(this.state.activeThumbnail);
    // let src= image.src
    image.classList.add("active-thumbnail");
    document
      .getElementById(prevState.activeThumbnail)
      .classList.remove("active-thumbnail");
  }
  render() {
     const photos = this.props.images
    const images = [
      "https://ik.imagekit.io/hbj42mvqwv/dual_monitor_wallpapers_geralt_ciri_pack_left_EN_FLffoU7Mhb.png",
      "https://ik.imagekit.io/hbj42mvqwv/Witcher_3_Wild_Hunt__The_-__wallpaper_5_dPdvHEA4f.jpg",
      "https://ik.imagekit.io/hbj42mvqwv/wallpaper_5120_witcher_3_wild_hunt_the_blood_and_wine_iC5op98cT.jpg",
      "https://ik.imagekit.io/hbj42mvqwv/ACO_ogobalvcS.png",
    ];
    return (
      <div className="view-gallery">
        <div className="view-gallery-flex">
          <div className="image-thumbnails">
            {photos.map((image, i) => {
              return (
                <img
                  onClick={() => this.onThumbnailClick(`${this.props.id}-${i}`)}
                  src={image}
                  id={`${this.props.id}-${i}`}
                  key={i}
                  className="thumbnail"
                  alt={`thumb-${i}`}
                />
              );
            })}
          </div>
          <div className="vr"></div>
          <div className="image-preview">
            <img
              src={this.state.previewedImage}
              alt="preview"
              className="preview"
            />
          </div>
        </div>
      </div>
    );
  }
}
export default ViewGallery;
