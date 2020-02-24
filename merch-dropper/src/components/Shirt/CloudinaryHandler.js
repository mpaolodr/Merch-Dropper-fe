import React, { useEffect } from "react";
import axios from "axios";
// import garment from "./DesignShirt";

const CloudinaryHandler = async (garment, images, setImages) => {
  const mockup = garment.mockUrl;
  // console.log(garment, "GARMENT URL")

  const urlPrepend = "https://res.cloudinary.com/dze74ofbf/image/upload/";

  const preset = "cropbasic";

  const options = { "X-Requested-With": "XMLHttpRequest" };

  const data = {
    "upload_preset": preset,
    "tags": "browser_upload",
    "file": mockup
  };

  await (async () => {
    const res = await axios
      .post("https://api.cloudinary.com/v1_1/dze74ofbf/upload", data, options)
      .catch(() => {
        console.log("error uploading image");
      });

    const response = await res;

    setImages({
      publicId: response.data.public_id,
      version: response.data.version,
      signature: response.data.signature,
      eTag: response.data.etag,
      url: response.data.url,
      secureUrl: response.data.secure_url,
      croppedUrl: `${urlPrepend}c_crop,g_north,h_650,q_auto:good,w_520,y_220/v${response.data.version}/${response.data.public_id}.jpg`,
      croppedThumbUrl: `${urlPrepend}c_crop,g_north,h_650,q_auto:good,w_520,y_220/c_scale,h_225,q_auto:good,w_180/v${response.data.version}/${response.data.public_id}.jpg`
    });
  })();

  return null;
};

export default CloudinaryHandler;