"use client"

import { useState } from "react"
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react"
import "./pages.css"

export default function CartPage() {
  // Sample cart items - in a real app, this would come from context/state management
  const [cartItems, setCartItems] = useState([
    {
      id: 101,
      name: "Pro Runner Shoes",
      price: 129.99,
      category: "Running",
      image: "https://www.campusshoes.com/cdn/shop/products/FLOWPRO_22G-957_L.GRY-F.ORG_2.jpg?v=1753800235",
      quantity: 1,
    },
    {
      id: 202,
      name: "Indoor Basketball",
      price: 59.99,
      category: "Basketball",
      image: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Basketball.png",
      quantity: 2,
    },
  ])

  // Calculate cart totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const tax = subtotal * 0.08 // 8% tax rate
  const shipping = subtotal > 100 ? 0 : 9.99 // Free shipping over $100
  const total = subtotal + tax + shipping

  // Handle quantity changes
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return

    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Your Cart</h1>
      </div>

      <div className="container">
        {cartItems.length === 0 ? (
          <div className="empty-state">
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any products to your cart yet.</p>
            <a href="/" className="cta-button">
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="product-grid">
              {cartItems.map((item) => (
                <div className="product-card Wishlist-card" key={item.id}>
                  <div className="product-image">
                    <img src={item.image || "/placeholder.svg"} alt={item.name} />
                    <div className="Wishlist-actions">
                      <div className="quantity-adjuster" style={{alignSelf: "center"}}>
                        <button
                          className="Wishlist-action-btn"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="quantity-value">{item.quantity}</span>
                        <button
                          className="Wishlist-action-btn"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button
                        className="Wishlist-action-btn remove"
                        onClick={() => removeItem(item.id)}
                        aria-label="Remove from cart"
                      >
                        <Trash2 size={18} />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                  <div className="product-info">
                    <span className="product-category">{item.category}</span>
                    <h3 className="product-name">{item.name}</h3>
                    <span className="product-price">${item.price.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button className="checkout-btn">
                Proceed to Checkout <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
