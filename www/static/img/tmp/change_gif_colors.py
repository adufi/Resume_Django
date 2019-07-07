import imageio

from os import listdir

# img_ext = '.gif'
img_ext = '.png'

old_color = [0, 17, 30]
new_color = [3, 61, 94]

def image(filename):
    # Verbose
    print ('Current image : ', filename)

    # Read the image
    image = imageio.imread(filename)

    # Loop through
    for ys in range(len(image)):
        for xs in range(len(image[ys])):

            # Test current pixel color
            if image[ys][xs][0] == old_color[0] and image[ys][xs][1] == old_color[1] and image[ys][xs][2] == old_color[2]:

                # Change pixel colors
                image[ys][xs][0] = new_color[0]
                image[ys][xs][1] = new_color[1]
                image[ys][xs][2] = new_color[2]

                # Change pixel alpha
                # image[ys][xs][3] = 0

    # Write img
    imageio.imwrite('PNG/' + filename.replace('.gif', '.png'), image)


def main():
    images = []
    raw_files = listdir()

    for f in raw_files:

        # Check if extension is in current file
        if img_ext in f:

            # Process image
            image(f)


if __name__ == '__main__':
    main()