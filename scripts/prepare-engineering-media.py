"""Create metadata-free deployment copies while preserving source evidence."""

from pathlib import Path

from PIL import Image, ImageEnhance, ImageOps


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public" / "projects"
OUTPUT = ROOT / "public" / "media" / "engineering-lab"


def open_oriented(relative_path: str) -> Image.Image:
    with Image.open(SOURCE / relative_path) as source:
        return ImageOps.exif_transpose(source).convert("RGB")


def save_webp(image: Image.Image, name: str, *, max_size: tuple[int, int], quality: int = 82) -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    image.thumbnail(max_size, Image.Resampling.LANCZOS)
    # A freshly encoded image receives no source EXIF, GPS, ICC, or XMP payload.
    image.save(OUTPUT / name, "WEBP", quality=quality, method=6)


def cover_crop(image: Image.Image, size: tuple[int, int], center: tuple[float, float]) -> Image.Image:
    return ImageOps.fit(
        image,
        size,
        method=Image.Resampling.LANCZOS,
        centering=center,
    )


lab_one = open_oriented("hands_on/oscilloscope_lab_img1.jpeg")
lab_two = open_oriented("hands_on/oscilloscope_lab_img2.jpeg")
lab_three = open_oriented("hands_on/oscilloscope_lab_img3.jpeg")
lab_four = open_oriented("hands_on/oscilloscope_lab_img4.jpeg")

# Work-card crop: foreground the oscilloscope trace and generator without
# assigning a circuit function that the source evidence does not establish.
card = cover_crop(lab_one, (1600, 1120), (0.53, 0.46))
card = ImageEnhance.Contrast(card).enhance(1.08)
card = ImageEnhance.Color(card).enhance(1.05)
save_webp(card, "oscilloscope-card.webp", max_size=(1600, 1120), quality=84)

# Case-study cover keeps the actual instrument face legible and cinematic.
cover = cover_crop(lab_one, (1800, 1320), (0.54, 0.40))
cover = ImageEnhance.Contrast(cover).enhance(1.07)
save_webp(cover, "oscilloscope-cover.webp", max_size=(1800, 1320), quality=84)

for image, name in [
    (lab_one, "oscilloscope-measurement-01.webp"),
    (lab_two, "oscilloscope-measurement-02.webp"),
    (lab_three, "oscilloscope-measurement-03.webp"),
    (lab_four, "electronics-bench-04.webp"),
]:
    save_webp(image, name, max_size=(1800, 1800), quality=82)

for relative_path, name in [
    ("logisim/logisim_circuit1.png", "digital-logic-simulation.webp"),
    ("3d_models/fusion360_model1.png", "cad-study-01.webp"),
    ("3d_models/fusion360_model2.png", "cad-study-02.webp"),
]:
    save_webp(open_oriented(relative_path), name, max_size=(1800, 1400), quality=86)
