import React from "react";

const Page = React.forwardRef(({ number }, ref) => {
  return (
    <div ref={ref} className="page">
      <img
        src={`/paginas/pagina-${number}.jpg`}
        alt={`Página ${number}`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    </div>
  );
});

export default Page;
