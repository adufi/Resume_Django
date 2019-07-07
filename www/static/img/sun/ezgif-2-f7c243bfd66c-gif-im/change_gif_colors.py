import imageio

from os import listdir


def image(filename):
	# Verbose
	print ('Current image : ', filename)

	image = imageio.imread(filename)
	for ys in range(len(image)):
		for xs in range(len(image[ys])):

			# Test current pixel color
			if image[ys][xs][0] == 0 and image[ys][xs][1] == 0 and image[ys][xs][2] == 0:

				# Change color of a pixel
				image[ys][xs][3] = 0

	imageio.imwrite('PNG/' + filename.replace('.gif', '.png'), image)


def main():
	images = []
	raw_files = listdir()

	for f in raw_files:
		if '.gif' in f:
			image(f)


if __name__ == '__main__':
	main()