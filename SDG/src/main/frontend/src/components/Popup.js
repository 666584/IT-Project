import './Popup.css';
const CustomAlert = ({ message, isVisible, onClose }) => {
    if (!isVisible) return null;

    return (
        <div className="popup-overlay">
            <div className="popup">
                <button className="close-button" onClick={onClose}>X</button>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default CustomAlert;