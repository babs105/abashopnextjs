import React from "react";

function NotAuthorizate() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Acces limite</h1>{" "}
      <p style={{ textAlign: "center" }}>Seuls les Administrateurs ont acces a cette ressource </p>
    </div>
  );
}

export default NotAuthorizate;
