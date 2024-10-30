import React, { useState } from 'react';
import DashboardAPI from '../../services/DashboardAPI.js';
import StarbucksImg from '../../assets/DashboardAssets/Images/starbuck.png';
import RedeemedImg from '../../assets/DashboardAssets/Images/redeemed.png';
import MorePointsImg from '../../assets/DashboardAssets/Images/morepoints.png'; // New image import
import './CouponsSection.css';

const CouponsSection = ({ currPoints, userId }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isInsufficientPointsPopupOpen, setInsufficientPointsPopupOpen] = useState(false); // New state
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

  const handleCouponClick = () => {
    if (currPoints < requiredPoints) {
      setInsufficientPointsPopupOpen(true); // Open insufficient points popup
    } else {
      couponRedeem();
      setPopupOpen(true); // Open success popup
    }
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    window.location.reload();
  };

  const handleCloseInsufficientPointsPopup = () => {
    setInsufficientPointsPopupOpen(false); // Close insufficient points popup
  };

  return (
    <div className="coupons-section">
      <div className="section-header">
        <h3 className="couponn">Coupons</h3>
        <button className="view-all-button">View all</button>
      </div>
      <div className="coupon-list">
        {/* Coupon Cards */}
        {[10, 15, 20, 25].map((discount, index) => (
          <div key={index} className="coupon-card" onClick={handleCouponClick}>
            <div className="coupon-content">
              <img
                src={StarbucksImg}
                alt="Starbucks Logo"
                className="coupon-logo"
              />
              <div className="coupon-details">
                <p className="coupon-title">{`${discount}% off Starbucks`}</p>
                <p className="points-required">{message}</p>
                <span className="claim-text">Claim Voucher</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Redeemed Success Popup */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="close-button" onClick={handleClosePopup}>
              X
            </button>
            <img src={RedeemedImg} alt="Redeemed" className="redeemed-image" />
            <p>Well done. Your voucher is redeemed.</p>
          </div>
        </div>
      )}

      {/* Insufficient Points Popup */}
      {isInsufficientPointsPopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="close-button" onClick={handleCloseInsufficientPointsPopup}>
              X
            </button>
            <img
              src={MorePointsImg}
              alt="More Points Needed"
              className="redeemed-image"
            />
            <p>You need at least 75 points to get this coupon.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CouponsSection;
