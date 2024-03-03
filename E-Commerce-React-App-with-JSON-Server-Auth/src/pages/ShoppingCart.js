import { useState, useEffect } from 'react';
import { PDFDocument, StandardFonts } from 'pdf-lib';


import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRadio,
  MDBRow
} from "mdb-react-ui-kit";
export function ShoppingCart() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const productItems = cart.map((product, index) => (
    <ProductItem
      key={product.id}
      product={product}
      cart={cart}
      updateCart={updateCart}
      index={index}
    />
  ));

  return (
    <section className="h-100 h-custom">
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol>
            {productItems}
            <OrderSummary cart={cart} />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}

function ProductItem({ product, cart, updateCart, index }) {

  const [quantity, setQuantity] = useState(() => {
    const productInCart = cart.find(item => item.id === product.id);
    return productInCart ? productInCart.quantity : 0;

  });

  const increase = () => {
    const updatedQuantity = quantity + 1;
    setQuantity(updatedQuantity);
    updateCartQuantity(updatedQuantity);
  };

  const decrease = () => {
    if (quantity > 1) {
      const updatedQuantity = quantity - 1;
      setQuantity(updatedQuantity);
      updateCartQuantity(updatedQuantity);
    }
  };

  const removeProduct = () => {
    const updatedCart = cart.filter((item) => item.id !== product.id);
    updateCart(updatedCart);
  };

  const updateCartQuantity = (updatedQuantity) => {
    const updatedCart = cart.map((item) =>
      item.id === product.id ? { ...item, quantity: updatedQuantity } : item
    );
    setQuantity(updatedQuantity);
    updateCart(updatedCart);
  };

  let totalPrice = product.price * quantity;

  return (
    <div className="row g-3">
      <div className="col">
        <h3 className="mb-3">{product.name}</h3>
        <div className="row g-3">
          <div className="col-6">
            <p className="mb-1"><strong>Marque :</strong> {product.brand}</p>
            <p className="mb-1"><strong>Catégorie :</strong> {product.category}</p>
            <p className="mb-1"><strong>Prix unitaire :</strong> ${product.price}</p>
          </div>
          <div className="col-6 d-flex align-items-center justify-content-end">
            <button className="btn btn-primary me-2" onClick={increase}>
              +
            </button>
            <div className="btn-group">
              <span className="btn btn-secondary">{quantity > 0 ? quantity : '0'}</span>
            </div>
            <button className="btn btn-primary ms-2" onClick={decrease}>
              -
            </button>
            <div className="col-3">
              <p className="ml-4"><strong>Total :</strong> ${totalPrice}</p>
            </div>
            <button className="btn btn-danger ml-5 d-flex align-items-center" onClick={removeProduct}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
              </svg>
              <span className="ms-2">Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

  
  

export function OrderSummary({ cart }) {
  const totalPrice = cart.reduce(
    (total, product) => total + (product.price || 0) * (product.quantity || 0),
    0
  );

  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [name, setname] = useState('');

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };
  const handlename = (event) => {
    setname(event.target.value);
  };

  const createOrder = async () => {
    // Logic to create the order using the address and paymentMethod
    console.log('Order created:', {
      address,
      paymentMethod,
      cart,
      totalPrice,
    });

    // Création du document PDF
    const pdfDoc = await PDFDocument.create();

    // Ajout d'une page au document PDF
    const page = pdfDoc.addPage();

    // Écriture des données de la commande sur la page PDF

    page.drawText(`Nom: ${name}`, { x: 50, y: 700, PDFFont: StandardFonts.Helvetica });
    page.drawText(`Payment Method: ${paymentMethod}`, { x: 50, y: 650, PDFFont: StandardFonts.Helvetica });
    page.drawText(`Total Price: $${totalPrice}`, { x: 50, y: 600, PDFFont: StandardFonts.Helvetica });

    // Enregistrement du document PDF
    const pdfBytes = await pdfDoc.save();

    // Téléchargement du fichier PDF
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'order_summary.pdf';
    link.click();
  };

  return (
    <section className="h-100 h-custom" style={{
      "@media (min-width: 1025px)": {
        ".h-custom": {
          height: "100vh",
          important: true
        }
      }
    }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCard
            className="shadow-2-strong mb-5 mb-lg-0"
            style={{ borderRadius: "16px" }}
          >
            <MDBCardBody className="p-4">
              <MDBRow>
                <MDBCol md="6" lg="4" xl="3" className="mb-4 mb-md-0">
                  <form>
                    <div className="d-flex flex-row pb-3">
                      <div className="d-flex align-items-center pe-2">
                        <MDBRadio
                          type="radio"
                          name="radio1"
                          checked={paymentMethod === 'credit card'}
                          value="credit card"
                          aria-label="..."
                          onChange={handlePaymentMethodChange}
                        />
                      </div>
                      <div className="rounded border w-100 p-3">
                        <p className="d-flex align-items-center mb-0">
                          <MDBIcon class="bi bi-credit-card" />
                          Credit Card
                        </p>
                      </div>
                    </div>
                    <div className="d-flex flex-row pb-3">
                      <div className="d-flex align-items-center pe-2">
                        <MDBRadio
                          type="radio"
                          name="radio1"
                          checked={paymentMethod === 'paypal'}
                          value="paypal"
                          aria-label="..."
                          onChange={handlePaymentMethodChange}
                        />
                      </div>
                      <div className="rounded border w-100 p-3">
                        <p className="d-flex align-items-center mb-0">
                          <MDBIcon class="bi bi-paypal" />
                          PayPal
                        </p>
                      </div>
                    </div>
                    <div className="d-flex flex-row pb-3">
                      <div className="d-flex align-items-center pe-2">
                        <MDBRadio
                          type="radio"
                          name="radio1"
                          checked={paymentMethod === 'bank transfer'}
                          value="bank transfer"
                          aria-label="..."
                          onChange={handlePaymentMethodChange}
                        />
                      </div>
                      <div className="rounded border w-100 p-3">
                        <p className="d-flex align-items-center mb-0">
                          <MDBIcon class="bi bi-credit-card-fill" />
                          Bank Transfer
                        </p>
                      </div>
                    </div>
                  </form>
                </MDBCol>
                <MDBCol md="6" lg="4" xl="6">
                  <MDBRow>
                    <MDBCol size="12" xl="6">
                      <label htmlFor="nameOnCard">Name On Card</label>
                      <MDBInput
                        id="nameOnCard"
                        className="mb-1 mb-xl-5"
                        placeholder="lastname_FirstName"
                        // value="bank transfer"
                        size="lg"
                        onChange={handlename}
                      />
                      <label htmlFor="Expiration">Expiration</label>
                      <MDBInput
                        id="expirationDate"
                        className="mb-4 mb-xl-5"
                        
                        placeholder="MM/YY"
                        size="lg"
                        maxLength={7}
                        minLength={7}
                      />

                    </MDBCol>
                    <MDBCol size="12" xl="6">
                    <label htmlFor="Numéro de carte">Numéro de carte</label>
                      <MDBInput
                        className="mb-4 mb-xl-5"
                        
                        placeholder="1111 2222 3333 4444"
                        size="lg"
                        minlength="19"
                        maxlength="19"
                      />
                      <label htmlFor="CVV">CVV</label>
                      <MDBInput
                        className="mb-4 mb-xl-5"
                        
                        placeholder="&#9679;&#9679;&#9679;"
                        size="lg"
                        minlength="3"
                        maxlength="3"
                        type="password"
                      />
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
                <MDBCol lg="4" xl="3">
                  <div
                    className="d-flex justify-content-between"
                    style={{ fontWeight: "500" }}
                  >
                    <p className="mb-2">Subtotal</p>
                    <p className="mb-2">${totalPrice}</p>
                  </div>
                  <div
                    className="d-flex justify-content-between"
                    style={{ fontWeight: "500" }}
                  >
                    <p className="mb-0">Shipping</p>
                    <p className="mb-0">$2.99</p>
                  </div>
                  <hr className="my-4" />
                  <div
                    className="d-flex justify-content-between mb-4"
                    style={{ fontWeight: "500" }}
                  >
                    <p className="mb-2">Total (tax included)</p>
                    <p className="mb-2">${totalPrice + 2.99}</p>
                  </div>
                  <MDBBtn block size="lg" onClick={createOrder}>
                    <div className="d-flex justify-content-between ">
                      <span>Checkout</span>
                      <span>${totalPrice + 2.99 }</span>
                    </div>
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}



