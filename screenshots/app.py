import os
import json

import systems

from utils import classify
from utils import annotate
# Customer Import

# Variables
INPUT_DIR = '/home/tovilht/Desktop/TVP/playright/output'
OUTPUT_DIR = '/home/tovilht/Desktop/TVP/playright/screenshots/annotated'

# Change ALL Three variables
CUSTOMER_URL = 'https:||customer.beauty-queen.explore.com.hk'
ADMIN_URL = 'https:||admin.beauty-queen.explore.com.hk'
BACKEND_URL = 'https:||backend.beauty-queen.explore.com.hk'


def toJson(jsonObj):
    with open("output.json", "w") as outputFile:
        json.dump(jsonObj, outputFile)


def main():
    imagesByType = classify.imagesByType(
        INPUT_DIR, CUSTOMER_URL, ADMIN_URL, BACKEND_URL
    )
    systemsClassified = classify.systemClassification(
        systems.SETTINGS, imagesByType

    )

    for system in sorted(systemsClassified.keys()):
        annotate.draw(systemsClassified[system],
                      systemsClassified[system]['title'],
                      INPUT_DIR,
                      OUTPUT_DIR
                      )


if __name__ == '__main__':
    main()
