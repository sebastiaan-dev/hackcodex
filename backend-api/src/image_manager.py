import glob
import io
from base64 import encodebytes
from PIL import Image

class ImageManager():
    def __new__(cls):
        if not hasattr(cls, 'instance'):
            cls.instance = super(ImageManager, cls).__new__(cls)
        return cls.instance
    
    def load_all_image_names(self):
        self.image_dict = {}

        image_list = [f for f in glob.glob("images/*.jpg")]
        for image_path in image_list:
            image_name = image_path.split("\\")[-1].split(".")[0]

            self.image_dict[image_name] = image_path

        print(self.image_dict)

    def get_images(self, input):
        images_to_add = self.__parse_input(input)
        encoded_images = {}
        for image_path in images_to_add.keys():
            # encoded_images[images_to_add[image_path]] = {'title': images_to_add[image_path], 'image': 'test'}   
            encoded_images[images_to_add[image_path]] = {'title': images_to_add[image_path], 'image': self.__get_response_image(image_path)}
        return list(encoded_images.values())
    
    def __parse_input(self, input):
        images_to_add = {}

        for value in input.values():
            for key in self.image_dict.keys():
                key = str(key)
                if key in value or key.split(' ')[0] in value:
                    images_to_add[self.image_dict.get(key)] = key 

        print('parsed the images')
        print(images_to_add)
        return images_to_add
    
    def __get_response_image(self, image_path):
        pil_img = Image.open(image_path, mode='r') # reads the PIL image
        byte_arr = io.BytesIO()
        pil_img.save(byte_arr, format='PNG') # convert the PIL image to byte array
        encoded_img = encodebytes(byte_arr.getvalue()).decode('ascii') # encode as base64
        return encoded_img
    