"use client";

import { useState } from "react";
import { Trash2, ShoppingCart } from "lucide-react";
import "./pages.css";

export default function WishlistPage() {
  // Sample Wishlist items - in a real app, this would come from context/state management
  const [WishlistItems, setWishlistItems] = useState([
    {
      id: 301,
      name: "Football Training Kit",
      price: 149.99,
      category: "Football",
      image: "/api/placeholder/300/300",
    },
    {
      id: 401,
      name: "Tennis Racket Elite",
      price: 199.99,
      category: "Tennis",
      image: "/api/placeholder/300/300",
    },
    {
      id: 501,
      name: "Golf Clubs Set",
      price: 899.99,
      category: "Golf",
      image: "/api/placeholder/300/300",
    },
  ]);

  // Remove item from Wishlist
  const removeItem = (id) => {
    setWishlistItems(WishlistItems.filter((item) => item.id !== id));
  };

  // Move item to cart (in a real app, this would update cart state/context)
  const moveToCart = (id) => {
    console.log(`Moving item ${id} to cart`);
    // Here you would add the item to cart
    // Then remove from Wishlist
    removeItem(id);
    // Show a notification that item was added to cart
    alert("Item added to cart!");
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Your Wishlist</h1>
      </div>

      <div className="container">
        {WishlistItems.length === 0 ? (
          <div className="empty-state">
            <h2>Your Wishlist is empty</h2>
            <p>
              Save items you love to your Wishlist and find them here anytime.
            </p>
            <a href="/" className="cta-button">
              Explore Products
            </a>
          </div>
        ) : (
          <div className="Wishlist-container">
            <div className="product-grid">
              {WishlistItems.map((item) => (
                <div className="product-card Wishlist-card" key={item.id}>
                  <div className="product-image">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                    />
                    <div className="Wishlist-actions">
                      <button
                        className="Wishlist-action-btn move-to-cart"
                        onClick={() => moveToCart(item.id)}
                        aria-label="Add to cart"
                      >
                        <ShoppingCart size={18} />
                        <span>Add to Cart</span>
                      </button>
                      <button
                        className="Wishlist-action-btn remove"
                        onClick={() => removeItem(item.id)}
                        aria-label="Remove from Wishlist"
                      >
                        <Trash2 size={18} />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                  <div className="product-info">
                    <span className="product-category">{item.category}</span>
                    <h3 className="product-name">{item.name}</h3>
                    <span className="product-price">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
