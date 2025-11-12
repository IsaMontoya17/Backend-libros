import js2xmlparser from "js2xmlparser";
import fetch from "node-fetch";

const generarInforme = async () => {
  try {
    const BASE_URL = "https://backend-libros-db7v.onrender.com/api";

    const response = await fetch(`${BASE_URL}/libros`);
    const libros = await response.json();

    const autoresResp = await fetch(`${BASE_URL}/autores`);
    const autores = await autoresResp.json();

    const editorialesResp = await fetch(`${BASE_URL}/editoriales`);
    const editoriales = await editorialesResp.json();

    const libreria = {
      libros: { libro: libros },
      autores: { autor: autores },
      editoriales: { editorial: editoriales }
    };

    const xml = js2xmlparser.parse("libreria", libreria);
    console.log("Árbol XML:\n", xml);

    const totalLibros = libros.length;
    const disponibles = libros.filter(libro => libro.disponible).length;
    const noDisponibles = totalLibros - disponibles;
    const porcentajeDisponibles = ((disponibles / totalLibros) * 100).toFixed(2);

    const totalAutores = autores.length;
    const autoresConLibros = autores.filter(autor =>
      libros.some(libro => libro.autor && libro.autor === String(autor._id))
    ).length;
    const porcentajeAutoresConLibros = ((autoresConLibros / totalAutores) * 100).toFixed(2);

    const totalEditoriales = editoriales.length;
    const editorialesConLibros = editoriales.filter(editorial =>
      libros.some(libro => libro.editorial && libro.editorial === String(editorial._id))
    ).length;
    const porcentajeEditorialesConLibros = ((editorialesConLibros / totalEditoriales) * 100).toFixed(2);

    console.log("----- Resumen -----");
    console.log(`Libros totales: ${totalLibros}`);
    console.log(`Libros disponibles: ${disponibles}`);
    console.log(`Libros no disponibles: ${noDisponibles}`);
    console.log(`Porcentaje de libros disponibles: ${porcentajeDisponibles}%\n`);

    console.log(`Autores totales: ${totalAutores}`);
    console.log(`Autores con libros publicados: ${autoresConLibros}`);
    console.log(`Porcentaje de autores con libros: ${porcentajeAutoresConLibros}%\n`);

    console.log(`Editoriales totales: ${totalEditoriales}`);
    console.log(`Editoriales con libros publicados: ${editorialesConLibros}`);
    console.log(`Porcentaje de editoriales con libros: ${porcentajeEditorialesConLibros}%`);
  } catch (err) {
    console.error("❌ Error al generar informe:", err);
  }
};

generarInforme();
