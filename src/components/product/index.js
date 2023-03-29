import Popup from 'reactjs-popup'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import './index.css'

const Product = props => {
  const {details} = props
  const {
    thumbnail,
    title,
    brand,
    stock,
    price,
    discountPercentage,
    images,
    description,
  } = details

  const getThreePics = () => (
    <div className="demo-imgs-con">
      <img src={images[0]} alt="demo1" />
      <img src={images[1]} alt="demo2" />
      <img src={images[2]} alt="demo3" />
    </div>
  )

  const getSinglePic = () => (
    <div className="demo-imgs-con">
      <img src={images[0]} alt="demo1" />
    </div>
  )

  const stockStatus = stock > 0 ? 'In stock' : 'Out of stock'
  const originalPrice = Math.floor((price / (100 - discountPercentage)) * 100)
  return (
    <div className="product-con">
      <img src={thumbnail} alt="logo" className="thumbnail" />
      <p className="title">
        {title} <br /> <span className="brand"> {brand} </span>
      </p>
      <p className="title">
        {stockStatus} <br /> <span className="brand">{stock}</span>
      </p>
      <p className="title">
        {`Rs.${price}`} <br />{' '}
        <span className="original-price">{`Rs.${originalPrice}`}</span> (
        {discountPercentage}%)
      </p>
      <div>
        <Popup
          modal
          trigger={
            <button className="view-btn" type="button">
              View
            </button>
          }
        >
          {close => (
            <div className="popup-con">
              <button
                type="button"
                className="popup-close-btn"
                onClick={() => {
                  close()
                }}
              >
                <AiOutlineCloseCircle size={22} />
              </button>
              <p className="product-des">{description}</p>
              {images.length >= 3 ? getThreePics() : getSinglePic()}
            </div>
          )}
        </Popup>
      </div>
    </div>
  )
}

export default Product
