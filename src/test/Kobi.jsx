import { useEffect, useState } from "react";

import apiCalls from "../function/apiCalls";
import ImageUpload from "../components/ImageUpload/ImageUpload";
import Crop from "../components/Crop/Crop";

export default function Kobi() {
  return (
    <div>
      <ImageUpload />
    </div>
  );
}
