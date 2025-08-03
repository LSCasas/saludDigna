import { jsPDF } from "jspdf";

export function pdfReceta(data) {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: [216, 140],
  });

  const azul = "#0e85ad";
  const negro = "#000000";

  // Logos
  doc.addImage("/images/logoipn.png", "PNG", 10, 10, 25, 25);
  doc.addImage("/images/simbolomedicina.png", "PNG", 175, 10, 20, 20);

  // Marca de agua centrada
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const mwWidth = 60;
  const mwHeight = 60;
  const mwX = (pageWidth - mwWidth) / 2;
  const mwY = (pageHeight - mwHeight) / 2;

  doc.setGState(new doc.GState({ opacity: 0.15 }));
  doc.addImage(
    "/images/simbolomedicina.png",
    "PNG",
    mwX,
    mwY,
    mwWidth,
    mwHeight
  );
  doc.setGState(new doc.GState({ opacity: 1 }));

  // Encabezado
  doc.setTextColor(azul);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("CONSULTORIO MEDICO", 105, 12, null, null, "center");
  doc.setFontSize(11);
  doc.text("Dra. Anabel Sánchez Guadarrama", 105, 18, null, null, "center");
  doc.setFont("helvetica", "normal");
  doc.text("Médico Cirujano y Partero", 105, 23, null, null, "center");
  doc.text("CED. PROF. 9768898", 105, 28, null, null, "center");

  // Nombre del paciente y fecha
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(azul);
  doc.text("Nombre del Paciente:", 10, 42);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(negro);
  doc.text(
    `${data.paciente.nombre} ${data.paciente.apellidoP} ${data.paciente.apellidoM}`,
    60,
    42
  );
  doc.line(58, 43, 160, 43);

  doc.setTextColor(azul);
  doc.text("Fecha:", 165, 42);
  doc.setTextColor(negro);
  doc.text(`${data.receta.fecha_receta}`, 180, 42);
  doc.line(179, 43, 210, 43);

  // Datos verticales
  const vertical = [
    ["Edad", `${data.receta.edad ?? "-"}`],
    ["I.D.", `${data.paciente.genero ?? "-"}`],
    ["Peso", `${data.receta.peso ?? "-"} kg`],
    ["Talla", `${data.receta.talla ?? "-"} cm`],
    ["FR", `${data.receta.frecuencia_respiratoria ?? "-"}`],
    ["FC", `${data.receta.frecuencia_cardiaca ?? "-"}`],
    ["Temp.", `${data.receta.temperatura ?? "-"}°C`],
    ["T/A", `${data.receta.tension_arterial ?? "-"}`],
    ["Alergias", `${data.receta.alergia ?? "-"}`],
    ["DX", `${data.receta.diagnostico ?? "-"}`],
  ];

  let y = 50;
  for (const [titulo, valor] of vertical) {
    doc.setTextColor(azul);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(`${titulo}:`, 10, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(negro);
    doc.setFontSize(11);
    doc.text(valor, 30, y);
    doc.line(29, y + 1, 70, y + 1);
    y += 7;
  }

  // Indicaciones médicas
  const indicaciones = data.receta.indicaciones?.split("\n") ?? [];
  let yIndicacion = 50;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(negro);

  for (const linea of indicaciones) {
    if (yIndicacion > 125) break;
    doc.text(linea, 80, yIndicacion);
    yIndicacion += 6;
  }

  // Próxima cita y nota
  doc.setTextColor(azul);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("Próxima cita:", 150, 123);
  doc.line(172, 123, 210, 123);
  doc.setFont("helvetica", "normal");
  doc.text("Nota: Favor de traer receta.", 150, 128);

  // Pie de página
  doc.setFontSize(9);
  doc.setTextColor(azul);
  doc.setFont("helvetica", "normal");
  doc.text(
    "Dirección: Zarzaparrilla, Edo. de Méx, 4 Mz.32, Lt. 23, Hacienda, Coacalco, C.P. 55712",
    10,
    138
  );
  doc.setFont("helvetica", "bold");
  doc.text("Tel: 55-9299-7463", 136, 138);
  doc.text("Firma:", 166, 138);
  doc.line(178, 138, 210, 138);

  doc.save(`Receta_${data.paciente.nombre}_${data.paciente.apellidoP}.pdf`);
}
