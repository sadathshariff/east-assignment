import React from "react";
import "./Card.css";

interface Props {
  loading: boolean;
  userDetails: { name: string; email: string } | null;
  refresh: () => void;
  error:string;
}

const Card: React.FC<Props> = ({ loading, userDetails, refresh, error }) => {
  return (
    <div className="card">
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <>
          {userDetails ? (
            <>
              <p>
                <span className="label">Name:</span> {userDetails?.name}
              </p>
              <p>
                <span className="label">Email:</span> {userDetails?.email}
              </p>
            </>
          ) : (
            <p>No user details available</p>
          )}
        </>
      )}
      {error && <p className="error">{error}</p>}
      <button className="btn" onClick={refresh}>
        Refresh
      </button>
    </div>
  );
};

export default Card;
