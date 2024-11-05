import '../Popup.css';
const DeletePopup = ({ message, isVisible, onClose, onDelete }) => {
    if (!isVisible) return null;

    return (
        <div className="popup-overlay">
            <div className="popup">
                <button className="close-button" onClick={onClose}>X</button>
                <button className="submit-button" onClick={onDelete}>YES</button>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default DeletePopup;