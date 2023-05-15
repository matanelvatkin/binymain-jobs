import { useEffect, useState } from "react";
import Input from "../components/Input";
import NewEvent from "../pages/NewEvent";
import $ from "jquery";
import apiCalls from "../function/apiCalls";
import ImageUpload from "../components/ImageUpload/ImageUpload";

export default function Kobi() {
  return (
    <div>
      <ImageUpload />
    </div>
  );
}
