"""Prepare FashionFunks catalogue source images for the web storefront.

Usage:
    python scripts/prepare_catalog_images.py <source-directory>

The source directory is expected to contain the Women, Men, Unisex, Kids,
statement and Anime folders supplied for the catalogue image release.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

from PIL import Image, ImageOps


TARGET_SIZE = (1000, 1250)
WEBP_QUALITY = 86


def slugify(filename: str) -> str:
    stem = Path(filename).stem.casefold()
    return re.sub(r"[^a-z0-9]+", "-", stem).strip("-")


SOURCE_GROUPS = {
    "Women": ("women", None),
    "Men": ("men", None),
    "Unisex": ("unisex", None),
    "Kids": ("kids", None),
}

SPECIAL_IMAGES = {
    ("statement", "rouge-statement-jacket.png"): ("women", "rouge-statement-jacket"),
    ("statement", "midnight-bomber.png"): ("men", "midnight-bomber"),
    ("statement", "Noir City Jacket.png"): ("unisex", "noir-city-jacket"),
    ("statement", "ember-arc-haori-shirt.png"): ("fandom", "ember-arc-haori-shirt"),
    ("statement", "shadow-pulse-tech-jacket.png"): ("fandom", "shadow-pulse-tech-jacket"),
    ("Anime", "black panther.png"): ("fandom", "panther-shadow-heavyweight-tee"),
    ("Anime", "goku.png"): ("fandom", "saiyan-training-jersey"),
    ("Anime", "itachi.png"): ("fandom", "akatsuki-heavyweight-tee"),
    ("Anime", "levi and eren.png"): ("fandom", "scout-legends-heavyweight-tee"),
    ("Anime", "Pikachu.png"): ("kids", "spark-tutu-dress"),
    ("Anime", "Spiderman.png"): ("fandom", "web-signal-long-sleeve-tee"),
    ("Anime", "zoro.png"): ("fandom", "three-sword-hunter-oversized-tee"),
}


def edge_colour(image: Image.Image) -> tuple[int, int, int, int]:
    rgba = image.convert("RGBA")
    width, height = rgba.size
    points = [
        rgba.getpixel((0, 0)),
        rgba.getpixel((width - 1, 0)),
        rgba.getpixel((0, height - 1)),
        rgba.getpixel((width - 1, height - 1)),
    ]
    channels = list(zip(*points))
    return tuple(sorted(channel)[len(channel) // 2] for channel in channels)  # type: ignore[return-value]


def clean_noir_background(image: Image.Image) -> Image.Image:
    """Replace the baked light checkerboard with one warm-neutral backdrop."""
    rgb = image.convert("RGB")
    pixels = rgb.load()
    for y in range(rgb.height):
        for x in range(rgb.width):
            red, green, blue = pixels[x, y]
            if min(red, green, blue) >= 235 and max(red, green, blue) - min(red, green, blue) <= 8:
                pixels[x, y] = (238, 234, 226)
    return rgb


def prepare(source: Path, destination: Path, *, clean_noir: bool = False) -> None:
    with Image.open(source) as opened:
        image = ImageOps.exif_transpose(opened)
        if clean_noir:
            image = clean_noir_background(image)

        source_ratio = image.width / image.height
        target_ratio = TARGET_SIZE[0] / TARGET_SIZE[1]

        if abs(source_ratio - target_ratio) <= 0.025:
            prepared = ImageOps.fit(image, TARGET_SIZE, Image.Resampling.LANCZOS, centering=(0.5, 0.5))
        else:
            contained = ImageOps.contain(image, TARGET_SIZE, Image.Resampling.LANCZOS)
            has_transparency = contained.mode in ("RGBA", "LA") and contained.getextrema()[-1][0] < 255
            background = (0, 0, 0, 0) if has_transparency else edge_colour(image)
            prepared = Image.new("RGBA", TARGET_SIZE, background)
            offset = ((TARGET_SIZE[0] - contained.width) // 2, (TARGET_SIZE[1] - contained.height) // 2)
            if contained.mode == "RGBA":
                prepared.alpha_composite(contained, offset)
            else:
                prepared.paste(contained, offset)

        destination.parent.mkdir(parents=True, exist_ok=True)
        prepared.save(destination, "WEBP", quality=WEBP_QUALITY, method=6, exact=True)


def build(source_root: Path, destination_root: Path) -> None:
    jobs: list[tuple[Path, Path, bool]] = []

    for source_group, (destination_group, _) in SOURCE_GROUPS.items():
        for source in sorted((source_root / source_group).glob("*.png")):
            slug = slugify(source.name)
            destination = destination_root / destination_group / f"{slug}.webp"
            jobs.append((source, destination, False))

    for (source_group, filename), (destination_group, slug) in SPECIAL_IMAGES.items():
        source = source_root / source_group / filename
        destination = destination_root / destination_group / f"{slug}.webp"
        jobs.append((source, destination, slug == "noir-city-jacket"))

    missing = [str(source) for source, _, _ in jobs if not source.is_file()]
    if missing:
        raise FileNotFoundError("Missing catalogue sources:\n" + "\n".join(missing))

    for source, destination, clean_noir in jobs:
        prepare(source, destination, clean_noir=clean_noir)
        print(f"Prepared {source.relative_to(source_root)} -> {destination.relative_to(destination_root)}")

    print(f"Prepared {len(jobs)} catalogue images.")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit("Pass the extracted FashionFunks image directory as the only argument.")
    project_root = Path(__file__).resolve().parents[1]
    build(Path(sys.argv[1]).resolve(), project_root / "public" / "assets" / "images" / "products")
