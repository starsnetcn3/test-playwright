import os
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import hashlib

FONT = ImageFont.truetype(
    '/home/tovilht/Desktop/TVP/playright/screenshots/utils/Source Han Sans CN Light.otf', 28)


def pasteOnPaper(image_path):
    image = Image.open(image_path)

    paper_width = int(image.size[0]*1.2)
    paper_height = int(image.size[1]*1.2)

    paper = Image.new("RGB", (paper_width, paper_height), (255, 255, 255))

    paper.paste(image, (int(paper_width*.1), int(paper_height*.1)))
    return paper


def drawOnPaper(paper, title, url):
    draw = ImageDraw.Draw(paper)
    # draw.text((56, 36), title, fill=(0, 0, 255), font=FONT)
    # draw.text((56, 36 + 24), url, fill=(0, 0, 255), font=FONT)
    return paper


def hash(drawing):
    md5hash = hashlib.md5(drawing.tobytes())
    return md5hash.hexdigest()


def draw(system, title, INPUT_DIR, OUTPUT_DIR):
    images = [system['keywords'][key] for key in system['keywords'].keys()]
    images = [item for sublist in images for item in sublist]
    images = list(dict.fromkeys(images))
    images = sorted(images)

    hashes = []
    image_idx = 0
    for image in images:
        imagePath = os.path.join(INPUT_DIR, image)
        paper = pasteOnPaper(imagePath)
        drawing = drawOnPaper(
            paper, title, url=image.replace('|', '/'))

        md5hash = hash(drawing)
        if md5hash not in hashes:
            hashes.append(md5hash)
            drawing.save(os.path.join(
                OUTPUT_DIR, f"{title}_{image_idx}_{image}"))
            image_idx += 1
