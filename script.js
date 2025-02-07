window.jsPDF = window.jspdf.jsPDF
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("retirementForm");
    const resultsDiv = document.getElementById("results");
    const resultsTable = document.getElementById("resultsTable").getElementsByTagName("tbody")[0];
    const summaryP = document.getElementById("summary");
  
    const modal = document.getElementById("infoModal");
    const modalSummary = document.getElementById("modalSummary");
    const modalTableContainer = document.getElementById("modalTableContainer");
    const whatsappButton = document.getElementById("whatsappButton");
    const pdfButton = document.getElementById("pdfButton");
    const closeButton = document.querySelector(".close-button");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const name = document.getElementById("name").value;
      const age = Number.parseInt(document.getElementById("age").value);
      const monthlyContribution = Number.parseFloat(document.getElementById("contribution").value);
  
      const annualInterestRate = 0.12;
      const retirementAge = 65;
      const yearsUntilRetirement = retirementAge - age;
  
      let totalSavings = 0;
      let totalContributions = 0;
  
      resultsTable.innerHTML = "";
  
      for (let year = 1; year <= yearsUntilRetirement; year++) {
        const annualContribution = monthlyContribution * 12;
        totalContributions += annualContribution;
  
        const interestEarned = (totalSavings + annualContribution) * annualInterestRate;
        totalSavings = totalSavings + annualContribution + interestEarned;
  
        const row = resultsTable.insertRow();
        row.insertCell(0).textContent = year;
        row.insertCell(1).textContent = formatNumber(annualContribution);
        row.insertCell(2).textContent = formatNumber(totalContributions);
        row.insertCell(3).textContent = formatNumber(interestEarned);
        row.insertCell(4).textContent = formatNumber(totalSavings);
      }
  
      const monthlyPension = totalSavings / 240;
  
      // Resumen en la página
      summaryP.innerHTML = `${name} con una aportación mensual de <strong>$${formatNumber(monthlyContribution)}</strong>, podrías llegar a tener un patrimonio de <strong>$${formatNumber(totalSavings)}</strong> a los 65 años. Equivalente a una autopensión de <strong>$${formatNumber(monthlyPension)}*</strong> que podrías recibir mes a mes en tu edad de jubilación.`;
  
      // Resumen en el Modal
      modalSummary.innerHTML = `<name>¡Hola, ${name}!</name><br>Con una aportación mensual de <strong>$${formatNumber(monthlyContribution)}</strong>, podrías llegar a tener un patrimonio de <strong>$${formatNumber(totalSavings)}</strong> a los 65 años. Equivalente a una autopensión de <strong>$${formatNumber(monthlyPension)}</strong> que podrías recibir mes a mes en tu edad de jubilación.<br><br><small><em>*La cantidad de autopensión mensual mostrada se calcula tomando en cuenta 20 años a partir de tu jubilación, es decir una esperanza de vida de 85 años. La tasa anual usada para este ejemplo es del 12%.</em></small>`;
      
      // Mostrar el modal
      modal.style.display = "block";
      document.body.style.overflow = "hidden";
      
  
      // Enviar a WhatsApp
      whatsappButton.addEventListener("click", () => {
        const message = encodeURIComponent(`¡Hola, ${name}! Con una aportación mensual de $${formatNumber(monthlyContribution)}, podrías llegar a tener un patrimonio de $${formatNumber(totalSavings)} a los 65 años. Equivalente a una autopensión de $${formatNumber(monthlyPension)} que podrías recibir mes a mes.`);
        window.open(`https://wa.me/?text=${message}`, "_blank");
      });
  
      // Generar PDF
      pdfButton.addEventListener("click", () => {
        const doc = new jsPDF;

        const logo = 'imgs/logo-morales-pesina.png'; // Ruta de la imagen
        doc.addImage(logo, 'PNG', 10, 10, 100, 20); // Posición (x, y), y tamaño (ancho, alto)

        doc.setFontSize(18);
        doc.text(`¡Hola, ${name}!`, 10, 40);
        doc.setFontSize(15);
        doc.text(`Con una aportación mensual de $${formatNumber(monthlyContribution)}, podrías llegar a tener un patrimonio de $${formatNumber(totalSavings)} a los 65 años.`, 10, 50, {maxWidth: 190});
        doc.text(`Equivalente a una autopensión de $${formatNumber(monthlyPension)} que podrías recibir mes a mes.`, 10, 65);
        doc.setFontSize(10);
        doc.text(`*La cantidad de autopensión mensual mostrada se calcula tomando en cuenta 20 años a partir de tu jubilación.`, 10, 75, {maxWidth: 190});
        doc.text(`La tasa anual usada para este ejemplo es del 12%.`, 10, 80);
  
        const startY = 90; // Posición vertical inicial para la tabla
        doc.text(" ", 10, startY - 10); // Título de la tabla, por ejemplo
        doc.autoTable({
        html: "#resultsTable",
        startY: startY, // Empieza la tabla después del texto
        margin: { top: 10 }, // Margen superior para separar la tabla del texto
        tableWidth: 'auto', // Ajustar el ancho de las columnas
        styles: {
        fontSize: 10, // Tamaño de fuente más pequeño
        cellPadding: 2, // Relleno de las celdas
        overflow: 'linebreak', // Manejo de texto largo
        halign: 'center' // Alinear texto en las celdas
        },
        headStyles: {
            fillColor: [0, 146, 135],  // Color de fondo del encabezado (en formato RGB)
            textColor: [255, 255, 255],  // Color del texto del encabezado (en formato RGB)
            halign: 'center'              // Alineación horizontal del texto
          },
        columnStyles: {
        0: { cellWidth: 20 }, // Puedes ajustar el tamaño de las columnas individualmente
        1: { cellWidth: 40 },
        2: { cellWidth: 40 },
        3: { cellWidth: 40 },
        4: { cellWidth: 40 }
        }
      });
  
        // Descargar el PDF
        doc.save("resultados_jubilacion.pdf");
      });
    });
  
    function formatNumber(number) {
      return Number(number.toFixed(2)).toLocaleString("es-MX");
    }
    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
    );
});
  