import PrescriptionPrint from "./PrescriptionPrint";
import "./PrescriptionViewer.css";

function PrescriptionViewer({
  prescription,
  onClose,
  onEdit,
}) {
  return (
    <div className="viewer-overlay">

      <div className="viewer-modal">

        <div className="viewer-toolbar">

          <button onClick={onEdit}>
            ✏ Edit
          </button>

          <button
            onClick={() => window.print()}
          >
            🖨 Print
          </button>

          <button onClick={onClose}>
            ❌ Close
          </button>

        </div>

        <PrescriptionPrint
          prescription={prescription}
        />

      </div>

    </div>
  );
}

export default PrescriptionViewer;