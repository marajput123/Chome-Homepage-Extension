import os

basename = "src/static/images/weatherIcons/icons"


def deleteImage(basename, filename):
    path = f'{basename}/{filename}'
    os.remove(path)


with os.scandir(basename) as entries:
    for entry in entries:
        if(entry.name.startswith("._")):
            deleteImage(basename, entry.name)
