import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsList, BsFillXCircleFill} from 'react-icons/bs'
import CartContext from '../../context/CartContext'
import './index.css'

class Header extends Component {
  state = {showMenu: false}

  onLogout = () => {
    const {history} = this.props
    //  console.log(history)
    //   console.log('logout')
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  renderCartItemCount = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartItemsCount = cartList.length
        console.log(cartItemsCount)
        return (
          <div>
            {cartItemsCount > 0 ? (
              <span className="cart-item-count">{cartList.length}</span>
            ) : null}
          </div>
        )
      }}
    </CartContext.Consumer>
  )

  renderHamburgerMenu = () => {
    const {location} = this.props
    const {pathname} = location
    const path = pathname.split('/')[1]
    return (
      <div className="mobile-menu">
        <ul className="mobile-menu-options">
          <Link to="/" className="nav-link">
            <li
              className={`
                ${pathname === '/' ? 'active-for-class' : 'nav-item-mobile'}  ${
                path === 'restaurant' ? 'active-for-class' : 'nav-item-mobile'
              }  `}
            >
              Home
            </li>
          </Link>
          <Link to="/cart" className="nav-link">
            <li
              className={
                path === 'cart' ? 'active-for-class' : 'nav-item-mobile'
              }
            >
              <div className="header-cart-count">
                Cart {this.renderCartItemCount()}
              </div>
            </li>
          </Link>
          <li className="nav-item-mobile">
            <button
              type="button"
              className="logout-mobil-button"
              onClick={this.onLogout}
            >
              Logout
            </button>
          </li>
        </ul>
        <button
          type="button"
          className="close-button"
          onClick={this.onChangeShowMenu}
        >
          <BsFillXCircleFill className="close-menu-options" />
        </button>
      </div>
    )
  }

  onChangeShowMenu = () => {
    this.setState(prevState => ({showMenu: !prevState.showMenu}))
  }

  render() {
    const {showMenu} = this.state
    const {location} = this.props
    const {pathname} = location
    const path = pathname.split('/')[1]
    return (
      <nav className="navbar-container">
        <div className="nav-container">
          <div className="nav-header">
            <Link to="/" className="nav-link">
              <div className="logo-name-container">
                <img
                  src="https://res.cloudinary.com/dy8lqwi3r/image/upload/v1660412417/swiggy_logo_to9j9a.jpg "
                  alt="website logo"
                  className="website-logo-img"
                />
                <h1 className="heading-name">Tasty Kitchen</h1>
              </div>
            </Link>
            <ul className="desktop-header-container">
              <Link to="/" className="nav-link">
                <li
                  className={`
                    ${path === 'restaurant' ? 'active-class' : 'nav-item'} ${
                    pathname === '/' ? 'active-class' : 'nav-item'
                  }`}
                >
                  Home
                </li>
              </Link>
              <Link to="/cart" className="nav-link">
                <li className={path === 'cart' ? 'active-class' : 'nav-item'}>
                  <div className="header-cart-count">
                    Cart {this.renderCartItemCount()}
                  </div>
                </li>
              </Link>
              <li className=" nav-item">
                <button
                  type="button"
                  className="logout-desktop-button"
                  onClick={this.onLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
            <div className="mobile-header-container">
              <button
                type="button"
                className="mobile-button"
                onClick={this.onChangeShowMenu}
              >
                <BsList />
              </button>
            </div>
          </div>
        </div>
        <div className="mobile-menu-only-options">
          {showMenu && this.renderHamburgerMenu()}
        </div>
      </nav>
    )
  }
}
export default withRouter(Header)
