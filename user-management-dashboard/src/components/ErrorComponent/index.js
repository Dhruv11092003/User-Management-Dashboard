import "./index.css"

const ErrorCard = () => (
  <div className="error-card">
    <img src="ErrorImg.jpg" alt="error" className="error-image" />
    <h1 className="error-title">Error Loading the Content</h1>
    <p className="error-message">Try Again Later</p>
  </div>
);

export default ErrorCard;
