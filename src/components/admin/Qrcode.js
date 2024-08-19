import React from "react";
import QRCode from "react-qr-code"; // Đảm bảo chỉ import một lần

const Qrcode = ({ value }) => {
  return (
    <div>
      <h2>QR Code</h2>
      <QRCode value={value} />
    </div>
  );
};

export default Qrcode;
