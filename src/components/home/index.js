import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import './index.css'
import Product from '../product'

class Home extends Component {
  state = {allProducts: [], inputVal: '', skip: 0, inputProducts: [], total: 0}

  componentDidMount() {
    this.getAllProductsData()
    this.userValueBasedData()
  }

  getAllProductsData = async () => {
    const {skip} = this.state
    const url = `https://dummyjson.com/products?limit=10&skip=${skip}`
    const response = await fetch(url)
    const data = await response.json()
    this.setState({allProducts: data.products})
  }

  userValueBasedData = async () => {
    const {inputVal} = this.state
    const url = `https://dummyjson.com/products/search?q=${inputVal}`
    const response = await fetch(url)
    const data = await response.json()
    this.setState({inputProducts: data.products, total: data.total})
  }

  getNextPage = () => {
    const {skip} = this.state
    if (skip < 90) {
      this.setState(prev => ({skip: prev.skip + 10}), this.getAllProductsData)
    }
  }

  getPreviousPage = () => {
    const {skip} = this.state
    if (skip > 0) {
      this.setState(prev => ({skip: prev.skip - 10}), this.getAllProductsData)
    }
  }

  getUserInput = event => {
    this.setState({inputVal: event.target.value}, this.userValueBasedData)
  }

  getBasicProducts = () => {
    const {allProducts, skip} = this.state
    return (
      <>
        {allProducts.map(each => (
          <Product details={each} key={each.id} />
        ))}
        <div className="pagination-btn-con">
          <button
            type="button"
            onClick={this.getPreviousPage}
            className="page-btn"
          >
            Prev
          </button>
          <button type="button" onClick={this.getNextPage} className="page-btn">
            Next
          </button>
        </div>
        <p className="item-index">{`${skip} to ${skip + 10}`}</p>
      </>
    )
  }

  getInputBasedProducts = () => {
    const {inputProducts, total} = this.state
    if (inputProducts.length === 0) {
      return (
        <div className="no-result-view-con">
          <h1 className="not-matched">Not Found</h1>
          <p className="try-another">Try Another Keyword</p>
        </div>
      )
    }
    return (
      <>
        {inputProducts.map(each => (
          <Product details={each} key={each.id} />
        ))}
        <p>{`${total} items found`}</p>
      </>
    )
  }

  render() {
    const {inputVal} = this.state
    const result =
      inputVal === '' ? this.getBasicProducts() : this.getInputBasedProducts()
    return (
      <div className="main-con">
        <div className="search-con">
          <div className="search-icon-con">
            <BsSearch className="search-icon" />
            <input
              className="search-bar"
              type="search"
              placeholder="Search"
              onChange={this.getUserInput}
              value={inputVal}
            />
          </div>
        </div>
        {result}
      </div>
    )
  }
}

export default Home
