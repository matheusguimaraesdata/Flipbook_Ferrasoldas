import { useEffect, useRef, useState, useMemo } from "react";
import HTMLFlipBook from "react-pageflip";
import Page from "./Page";

function Flipbook() {
  const totalPages = 15;

  const bookRef = useRef(null);
  const zoomWrapperRef = useRef(null);

  const [size, setSize] = useState({ width: 515, height: 772 });
  const [zoom, setZoom] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const position = useRef({ x: 0, y: 0 });
  const start = useRef({ x: 0, y: 0 });

  // =============================
  // Responsividade OTIMIZADA
  // =============================
  useEffect(() => {
    const updateSize = () => {
      const screenWidth = window.innerWidth;
      const maxWidth = screenWidth * 0.9;
      const width = Math.min(515, maxWidth);
      const height = width * 1.5;

      setSize({ width, height });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // =============================
  // Zoom com Scroll (mais suave)
  // =============================
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();

      setZoom((prev) => {
        const newZoom = prev + (e.deltaY < 0 ? 0.08 : -0.08);
        return Math.min(Math.max(newZoom, 1), 2.5);
      });
    };

    const wrapper = zoomWrapperRef.current;

    if (wrapper) {
      wrapper.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (wrapper) {
        wrapper.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  // =============================
  // Reset posição quando zoom volta
  // =============================
  useEffect(() => {
    if (zoom === 1) {
      position.current = { x: 0, y: 0 };
    }
  }, [zoom]);

  // =============================
  // Drag com Clamp Inteligente
  // =============================
  const clamp = (value, min, max) => {
    return Math.min(Math.max(value, min), max);
  };

  const handleMouseDown = (e) => {
    if (zoom <= 1) return;

    setIsDragging(true);
    start.current = {
      x: e.clientX - position.current.x,
      y: e.clientY - position.current.y,
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const wrapper = zoomWrapperRef.current;
    if (!wrapper) return;

    const maxOffsetX = (size.width * (zoom - 1)) / 2;
    const maxOffsetY = (size.height * (zoom - 1)) / 2;

    const newX = clamp(
      e.clientX - start.current.x,
      -maxOffsetX,
      maxOffsetX
    );

    const newY = clamp(
      e.clientY - start.current.y,
      -maxOffsetY,
      maxOffsetY
    );

    position.current = { x: newX, y: newY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // =============================
  // Atualiza página atual
  // =============================
  const handleFlip = (e) => {
    setCurrentPage(e.data);
  };

  // =============================
  // Navegação com Teclado
  // =============================
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!bookRef.current) return;

      if (e.key === "ArrowRight" && currentPage < totalPages - 1) {
        bookRef.current.pageFlip().flipNext();
      }

      if (e.key === "ArrowLeft" && currentPage > 0) {
        bookRef.current.pageFlip().flipPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage]);

  // =============================
  // Memoização das páginas (PERFORMANCE)
  // =============================
  const pages = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => (
      <Page
        key={i}
        number={String(i + 1).padStart(2, "0")}
      />
    ));
  }, []);

  // =============================
  // Botões
  // =============================
  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      bookRef.current.pageFlip().flipNext();
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      bookRef.current.pageFlip().flipPrev();
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Botão Esquerda */}
      <button
        onClick={prevPage}
        disabled={currentPage === 0}
        style={{
          position: "absolute",
          left: "5%",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          background: currentPage === 0 ? "gray" : "rgba(0,0,0,0.6)",
          color: "white",
          border: "none",
          padding: "15px 20px",
          borderRadius: "50%",
          cursor: currentPage === 0 ? "not-allowed" : "pointer",
          fontSize: "18px",
        }}
      >
        ◀
      </button>

      {/* Área Zoom */}
      <div
        ref={zoomWrapperRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "default",
        }}
      >
        <div
          style={{
            transform: `translate(${position.current.x}px, ${position.current.y}px) scale(${zoom})`,
            transformOrigin: "center center",
            transition: isDragging ? "none" : "transform 0.2s ease",
            willChange: "transform",
          }}
        >
          <HTMLFlipBook
            ref={bookRef}
            width={size.width}
            height={size.height}
            size="fixed"
            mobileScrollSupport={false}
            startPage={0}
            showCover={true}
            usePortrait={false}
            drawShadow={false} // PERFORMANCE
            maxShadowOpacity={0.2}
            renderOnlyPageLengthChange={true}
            onFlip={handleFlip}
          >
            {pages}
          </HTMLFlipBook>
        </div>
      </div>

      {/* Botão Direita */}
      <button
        onClick={nextPage}
        disabled={currentPage === totalPages - 1}
        style={{
          position: "absolute",
          right: "5%",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          background:
            currentPage === totalPages - 1
              ? "gray"
              : "rgba(0,0,0,0.6)",
          color: "white",
          border: "none",
          padding: "15px 20px",
          borderRadius: "50%",
          cursor:
            currentPage === totalPages - 1
              ? "not-allowed"
              : "pointer",
          fontSize: "18px",
        }}
      >
        ▶
      </button>
    </div>
  );
}

export default Flipbook;
