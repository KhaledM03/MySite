"""Create metadata-free WebP deployment copies of preserved Cove Dev screenshots."""

from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public" / "projects" / "the_cove_dev_site"
OUTPUT = ROOT / "public" / "media" / "the-cove-dev"

FILES = {
    "project1_the_cove_dev_home.png": "home.webp",
    "project1_the_cove_dev_about_us.png": "about.webp",
    "project1_the_cove_dev_services.png": "services.webp",
}


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for source_name, output_name in FILES.items():
        with Image.open(SOURCE / source_name) as image:
            flattened = Image.new("RGB", image.size, "#ffffff")
            if image.mode == "RGBA":
                flattened.paste(image, mask=image.getchannel("A"))
            else:
                flattened.paste(image.convert("RGB"))
            flattened.save(
                OUTPUT / output_name,
                "WEBP",
                quality=84,
                method=6,
                exif=b"",
                icc_profile=b"",
            )


if __name__ == "__main__":
    main()
