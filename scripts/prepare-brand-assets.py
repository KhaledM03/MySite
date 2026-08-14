"""Build deployment-ready chibi brand assets from the preserved master.

The source artwork stays outside ``public`` so the site only ships correctly
sized derivatives. Pillow writes fresh files without carrying EXIF metadata.
"""

from pathlib import Path

from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets/brand-source/chibi-khaled-option-b.png"
MASTER = ROOT / "assets/brand-source/chibi-khaled-master.png"
PUBLIC = ROOT / "public"
BRAND = PUBLIC / "brand"
APP = ROOT / "app"
REVIEW = ROOT / "review/brand"

PLUM = (87, 50, 68, 255)
CREAM = (247, 240, 223, 255)
CORAL = (233, 109, 80, 255)


def alpha_crop(image: Image.Image, padding_ratio: float = 0.045) -> Image.Image:
    alpha = image.getchannel("A")
    bounds = alpha.getbbox()
    if bounds is None:
        raise ValueError("Brand source contains no visible pixels")

    left, top, right, bottom = bounds
    padding = round(max(right - left, bottom - top) * padding_ratio)
    return image.crop(
        (
            max(0, left - padding),
            max(0, top - padding),
            min(image.width, right + padding),
            min(image.height, bottom + padding),
        )
    )


def contain(image: Image.Image, size: int, inset: int = 0) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    maximum = size - inset * 2
    layer = image.copy()
    layer.thumbnail((maximum, maximum), Image.Resampling.LANCZOS)
    x = (size - layer.width) // 2
    y = (size - layer.height) // 2
    canvas.alpha_composite(layer, (x, y))
    return canvas


def branded_icon(subject: Image.Image, size: int) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), PLUM)
    draw = ImageDraw.Draw(canvas)
    ring = max(2, round(size * 0.035))
    margin = max(2, round(size * 0.035))
    draw.ellipse(
        (margin, margin, size - margin, size - margin),
        fill=CREAM,
        outline=CORAL,
        width=ring,
    )

    maximum = round(size * 0.94)
    layer = subject.copy()
    layer.thumbnail((maximum, maximum), Image.Resampling.LANCZOS)
    x = (size - layer.width) // 2
    y = max(0, (size - layer.height) // 2 - round(size * 0.006))
    canvas.alpha_composite(layer, (x, y))
    return canvas.convert("RGB")


def save_png(image: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    image.save(path, "PNG", optimize=True)


def main() -> None:
    BRAND.mkdir(parents=True, exist_ok=True)
    REVIEW.mkdir(parents=True, exist_ok=True)

    source = Image.open(SOURCE).convert("RGBA")
    subject = alpha_crop(source)

    transparent_master = contain(subject, 1024, inset=34)
    save_png(transparent_master, MASTER)

    header = contain(subject, 256, inset=6)
    header.save(
        BRAND / "chibi-khaled-header.webp",
        "WEBP",
        quality=92,
        method=6,
        exact=True,
    )

    icon_512 = branded_icon(subject, 512)
    icon_192 = icon_512.resize((192, 192), Image.Resampling.LANCZOS)
    apple_icon = icon_512.resize((180, 180), Image.Resampling.LANCZOS)

    save_png(icon_512, PUBLIC / "icon-512.png")
    save_png(icon_192, PUBLIC / "icon-192.png")
    save_png(apple_icon, PUBLIC / "apple-touch-icon.png")
    save_png(icon_512, APP / "icon.png")
    save_png(apple_icon, APP / "apple-icon.png")

    favicon_path = PUBLIC / "favicon.ico"
    icon_512.save(
        favicon_path,
        "ICO",
        sizes=[(16, 16), (32, 32), (48, 48)],
    )
    (APP / "favicon.ico").write_bytes(favicon_path.read_bytes())

    preview = Image.new("RGB", (520, 190), CREAM[:3])
    draw = ImageDraw.Draw(preview)
    x = 34
    for dimension, scale in ((16, 4), (32, 3), (48, 2)):
        exact = icon_512.resize((dimension, dimension), Image.Resampling.LANCZOS)
        enlarged = exact.resize(
            (dimension * scale, dimension * scale), Image.Resampling.NEAREST
        )
        preview.paste(enlarged, (x, 34))
        draw.text((x, 142), f"{dimension}px", fill=PLUM[:3])
        x += enlarged.width + 54
    save_png(preview, REVIEW / "favicon-scale-preview.png")


if __name__ == "__main__":
    main()
