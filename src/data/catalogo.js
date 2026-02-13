const totalPaginas = 14;

const catalogo = Array.from({ length: totalPaginas }, (_, i) => {
  const numero = String(i + 1).padStart(2, "0");
  return `/images/pagina_${numero}.jpg`;
});

export default catalogo;
