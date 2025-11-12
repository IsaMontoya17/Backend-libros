import express from "express";
import js2xmlparser from "js2xmlparser";
import fetch from "node-fetch";
import PDFDocument from "pdfkit";
import { Readable } from "stream";

const router = express.Router();

router.get("/", async (req, res) => {
  try {

    const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

    const [librosResp, autoresResp, editorialesResp] = await Promise.all([
      fetch(`${BASE_URL}/api/libros`),
      fetch(`${BASE_URL}/api/autores`),
      fetch(`${BASE_URL}/api/editoriales`),
    ]);

    const [libros, autores, editoriales] = await Promise.all([
      librosResp.json(),
      autoresResp.json(),
      editorialesResp.json(),
    ]);

    
    const libreria = {
      libros: { libro: libros },
      autores: { autor: autores },
      editoriales: { editorial: editoriales },
    };

    const xml = js2xmlparser.parse("libreria", libreria);

    const totalLibros = libros.length;
    const disponibles = libros.filter((l) => l.disponible).length;
    const porcentajeDisponibles = ((disponibles / totalLibros) * 100 || 0).toFixed(2);

    const totalAutores = autores.length;
    const autoresConLibros = autores.filter((a) =>
      libros.some((l) => l.autor && l.autor === String(a._id))
    ).length;
    const porcentajeAutoresConLibros = ((autoresConLibros / totalAutores) * 100 || 0).toFixed(2);

    const totalEditoriales = editoriales.length;
    const editorialesConLibros = editoriales.filter((e) =>
      libros.some((l) => l.editorial && l.editorial === String(e._id))
    ).length;
    const porcentajeEditorialesConLibros = (
      (editorialesConLibros / totalEditoriales) * 100 || 0
    ).toFixed(2);

   
    const doc = new PDFDocument({ margin: 50 });
    const stream = new Readable().wrap(doc);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="informe_libreria.pdf"');

   
    doc.font("Helvetica-Bold").fontSize(20).text("Informe de Librería", { align: "center" });
    doc.moveDown(1.5);

  
    doc.font("Helvetica-Bold").fontSize(14).text("Libros:");
    doc.font("Helvetica").fontSize(12);
    doc.text(`Total: ${totalLibros}`);
    doc.text(`Disponibles: ${disponibles} (${porcentajeDisponibles}%)`);
    doc.moveDown();

 
    doc.font("Helvetica-Bold").fontSize(14).text("Autores:");
    doc.font("Helvetica").fontSize(12);
    doc.text(`Total: ${totalAutores}`);
    doc.text(`Con libros publicados: ${autoresConLibros} (${porcentajeAutoresConLibros}%)`);
    doc.moveDown();

    doc.font("Helvetica-Bold").fontSize(14).text("Editoriales:");
    doc.font("Helvetica").fontSize(12);
    doc.text(`Total: ${totalEditoriales}`);
    doc.text(`Con libros publicados: ${editorialesConLibros} (${porcentajeEditorialesConLibros}%)`);
    doc.moveDown();


    doc.font("Helvetica-Bold").fontSize(14).text("Árbol XML:");
    doc.moveDown(0.5);


    doc.font("Courier").fontSize(8).text(xml, {
      width: 500,
      align: "left",
    });

    doc.end();
    doc.pipe(res);
  } catch (err) {
    console.error("❌ Error al generar informe:", err);
    res.status(500).json({ message: "Error al generar informe" });
  }
});

export default router;
