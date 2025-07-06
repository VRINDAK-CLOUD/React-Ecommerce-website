import React, { useContext } from 'react';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import './Cart.css';
import { ProductCountContext } from "./ProductCountContext";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    productCount
  } = useContext(ProductCountContext);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  ).toFixed(2);

  return (
    <section className="h-100 h-custom cart-section">
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol size="12">
            <MDBCard className="card-registration card-registration-2 cart-card">
              <MDBCardBody className="p-0">
                <MDBRow className="g-0">
                  {/* Cart Items */}
                  <MDBCol lg="8">
                    <div className="p-5">
                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <MDBTypography tag="h1" className="fw-bold mb-0 text-black">
                          Shopping Cart
                        </MDBTypography>
                        <MDBTypography className="mb-0 text-muted">
                          {cartItems.length} items
                        </MDBTypography>
                      </div>

                      <hr className="my-4" />

                      {cartItems.map((item, index) => (
                        <MDBRow key={index} className="mb-4 d-flex justify-content-between align-items-center">
                          <MDBCol md="2" lg="2" xl="2">
                            <MDBCardImage
                              src={item.images?.[0]}
                              fluid
                              className="rounded-3"
                              alt={item.title}
                            />
                          </MDBCol>
                          <MDBCol md="3" lg="3" xl="3">
                            <MDBTypography tag="h6" className="text-muted">
                              {item.category?.name}
                            </MDBTypography>
                            <MDBTypography tag="h6" className="text-black mb-0">
                              {item.title}
                            </MDBTypography>
                          </MDBCol>
                          <MDBCol md="3" lg="3" xl="3" className="d-flex align-items-center">
                            <MDBBtn color="link" className="px-2" onClick={() => decreaseQuantity(item.id)}>
                              <MDBIcon fas icon="minus" />
                            </MDBBtn>

                            <MDBInput type="number" value={item.quantity} readOnly size="sm" />

                            <MDBBtn color="link" className="px-2" onClick={() => increaseQuantity(item.id)}>
                              <MDBIcon fas icon="plus" />
                            </MDBBtn>
                          </MDBCol>
                          <MDBCol md="3" lg="2" xl="2" className="text-end">
                            <MDBTypography tag="h6" className="mb-0">
                              $ {(item.price * item.quantity).toFixed(2)}
                            </MDBTypography>
                          </MDBCol>
                          <MDBCol md="1" lg="1" xl="1" className="text-end">
                            <a href="#!" className="text-muted" onClick={() => removeFromCart(item.id)}>
                              <MDBIcon fas icon="times" />
                            </a>
                          </MDBCol>
                        </MDBRow>
                      ))}

                      <hr className="my-4" />

                      <div className="pt-5">
                        <MDBTypography tag="h6" className="mb-0">
                          <MDBCardText tag="a" href="/home" className="text-body">
                            <MDBIcon fas icon="long-arrow-alt-left me-2" /> Back to shop
                          </MDBCardText>
                        </MDBTypography>
                      </div>
                    </div>
                  </MDBCol>

                  {/* Summary */}
                  <MDBCol lg="4" className="bg-grey">
                    <div className="p-5">
                      <MDBTypography tag="h3" className="fw-bold mb-5 mt-2 pt-1">
                        Summary
                      </MDBTypography>

                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-4">
                        <MDBTypography tag="h5" className="text-uppercase">
                          Items: {productCount}
                        </MDBTypography>
                        <MDBTypography tag="h5">$ {totalPrice}</MDBTypography>
                      </div>

                      <MDBTypography tag="h5" className="text-uppercase mb-3">
                        Shipping
                      </MDBTypography>

                      <div className="mb-4 pb-2">
                        <select className="select rounded bg-grey full-width">
                          <option value="1">Standard Delivery - $5.00</option>
                          <option value="2">Express - $10.00</option>
                          <option value="3">Next Day - $20.00</option>
                        </select>
                      </div>

                      <MDBTypography tag="h5" className="text-uppercase mb-3">
                        Promo Code
                      </MDBTypography>

                      <div className="mb-5">
                        <MDBInput size="lg" label="Enter your code" />
                      </div>

                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-5">
                        <MDBTypography tag="h5" className="text-uppercase">
                          Total
                        </MDBTypography>
                        <MDBTypography tag="h5">$ {totalPrice}</MDBTypography>
                      </div>

                      <MDBBtn className="register-btn" block size="lg">
                        Checkout
                      </MDBBtn>
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default Cart;
