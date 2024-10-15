import React, { useState } from 'react';
import './CouponsSection.css'; // Add styles if needed

const CouponsSection = () => {
  // State to handle whether the popup is open
  const [isPopupOpen, setPopupOpen] = useState(false);

  // Function to handle coupon click
  const handleCouponClick = () => {
    setPopupOpen(true);
  };

  // Function to close the popup
  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div className="coupons-section">
      <div className="section-header">
        <h3>Coupons</h3>
        <button className="view-all-button">View all</button>
      </div>
      <div className="coupon-list">
        {/* Each coupon is now a clickable button */}
        <div className="coupon-card" onClick={handleCouponClick}>
          <div className="coupon-content">
            <img
              src={require('./Images/starbuck.png')}
              alt="Starbucks Logo"
              className="coupon-logo"
            />
            <div className="coupon-details">
              <p className="coupon-title">10% off Starbucks</p>
              <p className="points-required">75 points required</p>
              <button className="claim-button">Claim Voucher</button>
            </div>
          </div>
          <div className="coupon-dashed-border"></div>
        </div>

        {/* Repeat for more coupon cards */}
        <div className="coupon-card" onClick={handleCouponClick}>
          <div className="coupon-content">
            <img
              src={require('./Images/starbuck.png')}
              alt="Starbucks Logo"
              className="coupon-logo"
            />
            <div className="coupon-details">
              <p className="coupon-title">10% off Starbucks</p>
              <p className="points-required">75 points required</p>
              <button className="claim-button">Claim Voucher</button>
            </div>
          </div>
          <div className="coupon-dashed-border"></div>
        </div>
      </div>

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="close-button" onClick={handleClosePopup}>X</button>
            <img src={require('./Images/redeemed.png')} alt="Redeemed" className="redeemed-image" />
            <p>Well done. Your voucher is redeemed.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CouponsSection;
