import React, { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "../styles/QR.css";

const QRModal = ({ qrData, onClose }) => {
    const qrRef = useRef(null);
    const qrUrl = `${window.location.origin}/item/${qrData}`;

    const handlePrint = () => {
        const printWindow = window.open("", "_blank");
        printWindow.document.write("<html><head><title>Print QR</title></head><body>");
        printWindow.document.write("<h3>Scan the QR Code</h3>");
        printWindow.document.write(qrRef.current.innerHTML);
        printWindow.document.write("</body></html>");
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <div className="qr-modal-overlay">
            <div className="qr-modal">
                <h2>QR Code</h2>
                <div ref={qrRef} className="qr-code-container">
                    <QRCodeCanvas value={qrUrl} size={200} />
                </div>
                <p className="qr-text">Scan this QR code to view details</p>
                <div className="qr-buttons">
                    <button className="print-button" onClick={handlePrint}>🖨️ Print</button>
                    <button className="close-button" onClick={onClose}>❌ Close</button>
                </div>
            </div>
        </div>
    );
};

export default QRModal;
