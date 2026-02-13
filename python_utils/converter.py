import sys
from pdf2image import convert_from_path
from PIL import Image
from pathlib import Path

# -----------------------------------
# CONFIGURAÇÕES
# -----------------------------------

BASE_DIR = Path(__file__).resolve().parent.parent

PDF_FOLDER = BASE_DIR / "public" / "pdfs"
OUTPUT_FOLDER = BASE_DIR / "public" / "images"

POPPLER_PATH = Path(r"C:\poppler-25.12.0\Library\bin")

DPI = 200
IMAGE_WIDTH = 1200
IMAGE_HEIGHT = 1754
JPG_QUALITY = 95

# -----------------------------------
# VALIDAÇÕES INICIAIS
# -----------------------------------

def validate_environment():
    if not PDF_FOLDER.exists():
        sys.exit(f"Erro: Pasta de PDFs não encontrada em {PDF_FOLDER}")
        
    if not POPPLER_PATH.exists():
        sys.exit(f"Erro: Caminho do Poppler não encontrado em {POPPLER_PATH}")
        
    OUTPUT_FOLDER.mkdir(parents=True, exist_ok=True)

# -----------------------------------
# CONVERSÃO
# -----------------------------------

def convert_pdf_to_images(pdf_path: Path, output_path: Path):
    try:
        images = convert_from_path(
            pdf_path,
            dpi=DPI,
            poppler_path=str(POPPLER_PATH)
        )

        if not images:
            print(f"Aviso: PDF sem páginas {pdf_path.name}")
            return

        image = images[0]

        image.thumbnail((IMAGE_WIDTH, IMAGE_HEIGHT), Image.LANCZOS)

        image.save(output_path, "JPEG", quality=JPG_QUALITY)
        print(f"Convertido: {pdf_path.name}")

    except Exception as e:
        print(f"Erro ao converter {pdf_path.name}: {e}")

# -----------------------------------
# MAIN
# -----------------------------------

def main():
    validate_environment()

    pdf_files = sorted(PDF_FOLDER.glob("*.pdf"))

    if not pdf_files:
        print("Aviso: Nenhum arquivo PDF encontrado.")
        return

    for index, pdf_file in enumerate(pdf_files, start=1):
        output_filename = f"pagina_{index:02d}.jpg"
        output_path = OUTPUT_FOLDER / output_filename

        convert_pdf_to_images(pdf_file, output_path)

if __name__ == "__main__":
    main()
