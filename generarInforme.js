import js2xmlparser from "js2xmlparser";
import fetch from "node-fetch";

const generarInforme = async () => {
  try {
    // 1️⃣ Obtener libros con populate de autores y editoriales
    const response = await fetch("http://localhost:5000/api/libros");
    const libros = await response.json();

    // 2️⃣ Obtener autores
    const autoresResp = await fetch("http://localhost:5000/api/autores");
    const autores = await autoresResp.json();

    // 3️⃣ Obtener editoriales
    const editorialesResp = await fetch("http://localhost:5000/api/editoriales");
    const editoriales = await editorialesResp.json();

    // 4️⃣ Armar el objeto jerárquico con etiquetas específicas
    const libreria = {
      libros: { libro: libros },
      autores: { autor: autores },
      editoriales: { editorial: editoriales }
    };

    // 5️⃣ Convertir a XML
    const xml = js2xmlparser.parse("libreria", libreria);
    console.log("Árbol XML:\n", xml);

    // 6️⃣ Calcular totales y porcentajes

    // 📚 Libros
    const totalLibros = libros.length;
    const disponibles = libros.filter(libro => libro.disponible).length;
    const noDisponibles = totalLibros - disponibles;
    const porcentajeDisponibles = ((disponibles / totalLibros) * 100).toFixed(2);

    // 👩‍🏫 Autores
    const totalAutores = autores.length;
    const autoresConLibros = autores.filter(autor =>
      libros.some(libro => libro.autor && libro.autor === String(autor._id))
    ).length;
    const porcentajeAutoresConLibros = ((autoresConLibros / totalAutores) * 100).toFixed(2);

    // 🏢 Editoriales
    const totalEditoriales = editoriales.length;
    const editorialesConLibros = editoriales.filter(editorial =>
      libros.some(libro => libro.editorial && libro.editorial === String(editorial._id))
    ).length;
    const porcentajeEditorialesConLibros = ((editorialesConLibros / totalEditoriales) * 100).toFixed(2);

    // 7️⃣ Mostrar resultados
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
