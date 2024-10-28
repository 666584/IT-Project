import React, { useState } from 'react';
import DashboardAPI from '../../services/DashboardAPI.js';
import StarbucksImg from '../../assets/DashboardAssets/Images/starbuck.png'
import RedeemedImg from '../../assets/DashboardAssets/Images/redeemed.png'
import './CouponsSection.css';

const CouponsSection = ({ currPoints, userId }) => {
  // State to handle whether the popup is open
  const [isPopupOpen, setPopupOpen] = useState(false);
  const requiredPoints = 75;
  const message =
    currPoints >= requiredPoints
      ? `You have enough points! (${currPoints} points available)`
      : `${requiredPoints} points required`;

  const couponRedeem = async () => {
    try {
      const response = await DashboardAPI.coupon({ userId });
      if (!response.data) {
        throw new Error('Failed to update points');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Function to handle coupon click
  const handleCouponClick = () => {
    if (currPoints < 75) {
      alert('You need at least 75 points to get this coupon.');
    } else {
      couponRedeem();
      setPopupOpen(true);
    }
  };

  // Function to close the popup
  const handleClosePopup = () => {
    setPopupOpen(false);
    window.location.reload();
  };

  return (
    <div className="coupons-section">
      <div className="section-header">
        <h3 className='couponn'>Coupons</h3>
        <button className="view-all-button">View all</button>
      </div>
      <div className="coupon-list">
        {/* First Coupon Card */}
        <div className="coupon-card" onClick={handleCouponClick}>
          <div className="coupon-content">
            <img
              src={StarbucksImg}
              alt="Starbucks Logo"
              className="coupon-logo"
            />
            <div className="coupon-details">
              <p className="coupon-title">10% off Starbucks</p>
              <p className="points-required">{message}</p>
              {/* Changed button to span */}
              <span className="claim-text">Claim Voucher</span>
            </div>
          </div>
        </div>

        {/* Second Coupon Card */}
        <div className="coupon-card" onClick={handleCouponClick}>
          <div className="coupon-content">
            <img
              src={StarbucksImg}
              alt="Starbucks Logo"
              className="coupon-logo"
            />
            <div className="coupon-details">
              <p className="coupon-title">15% off Starbucks</p>
              <p className="points-required">{message}</p>
              <span className="claim-text">Claim Voucher</span>
            </div>
          </div>
        </div>

        {/* Third Coupon Card */}
        <div className="coupon-card" onClick={handleCouponClick}>
          <div className="coupon-content">
            <img
              src={StarbucksImg}
              alt="Starbucks Logo"
              className="coupon-logo"
            />
            <div className="coupon-details">
              <p className="coupon-title">20% off Starbucks</p>
              <p className="points-required">{message}</p>
              <span className="claim-text">Claim Voucher</span>
            </div>
          </div>
        </div>

        {/* Fourth Coupon Card */}
        <div className="coupon-card" onClick={handleCouponClick}>
          <div className="coupon-content">
            <img
              src={StarbucksImg}
              alt="Starbucks Logo"
              className="coupon-logo"
            />
            <div className="coupon-details">
              <p className="coupon-title">25% off Starbucks</p>
              <p className="points-required">{message}</p>
              <span className="claim-text">Claim Voucher</span>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="close-button" onClick={handleClosePopup}>
              X
            </button>
            <img
              src={RedeemedImg}
              alt="Redeemed"
              className="redeemed-image"
            />
            <p>Well done. Your voucher is redeemed.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CouponsSection;
