import React from "react";
import LayoutSiderBar from "../components/LayoutAdmin2";
import Espace from "./espace";

export default function Contact() {
  return (
    <>
      <h1>Contact</h1>
      <span>📞</span>
    </>
  );
}
Contact.auth = true;
Contact.layout = "profile";
