import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const ExportReportButton = () => {
  const exportPDF = async () => {
    const input = document.getElementById("report-content");

    try {
      // ✅ Wait for HTML to fully render before capturing
      await new Promise((resolve) => setTimeout(resolve, 100));

      // ✅ Convert Report to High-Quality Canvas
      const canvas = await html2canvas(input, {
        scale: 3, // Increased for better quality
        useCORS: true, // ✅ Fixes image loading issues
        allowTaint: true,
      });

      const imgData = canvas.toDataURL("image/png");

      // ✅ Create PDF
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // ✅ Ensure Image is Properly Processed
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight, undefined, "FAST");
      pdf.save("Budget_Report.pdf");
    } catch (error) {
      console.error("❌ Error generating PDF:", error);
    }
  };

  return (
    <section className='flex justify-end gap-2 items-center px-8'>
    <button
        className='flex gap-2 items-center px-4 py-3 bg-purple-500 rounded-xl'
        onClick={exportPDF} 
    >
        🔃
        <span className='hidden sm:block'>Export</span>
    </button>
</section>
  );
};

export default ExportReportButton;
