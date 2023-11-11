import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Badge from 'react-bootstrap/Badge'
import Container from 'react-bootstrap/Container'
import {LinkContainer} from 'react-router-bootstrap'
import {useContext} from 'react'
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SignupScreen from './screens/SignupScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
function App() {
  
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod')
  };

  return (
    <BrowserRouter>
    <div >
      <header>
      <Navbar bg="dark" variant="dark">
      <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Ecommerce</Navbar.Brand>
          </LinkContainer>
          <Nav className="me-auto">
            <Link to="/cart" className='nav-link'>
              Cart 
              {cart.cartItems.length>0 && (
                <Badge pill bg="danger">
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </Badge>
              )}
            </Link>
            {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    
                    
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signoutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="/signin">
                    Sign In
                  </Link>
                )}
          </Nav>
          </Container>
      </Navbar>
       
      </header>
      
      <main>
        <Container className='mt-3'>
        <Routes>
          <Route path="/product/:slug" element={<ProductScreen/>}/>
          <Route path="/" element={<HomeScreen/>}/>
          <Route path="/cart" element={<CartScreen/>}/>
          <Route path="/shipping" element={<ShippingAddressScreen/>}/>
          <Route path="/signin" element={<SigninScreen/>}/>
          <Route path="/signup" element={<SignupScreen/>}/>
          <Route path="/payment" element={<PaymentMethodScreen/>}/>
          <Route path="/placeorder" element={<PlaceOrderScreen />} />
          <Route path="/order/:id" element={<OrderScreen/>} />
        </Routes>
        </Container>
        
      </main>
      
    </div>
    </BrowserRouter>
  );



/*
  <LinkContainer to="/profile">
          <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    */
}

export default App;
