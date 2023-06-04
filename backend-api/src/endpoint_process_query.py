from flask import request
from flask_restful import Resource
from image_manager import ImageManager

from query_chatgpt import QueryChatGPTSingleton

processed_requests = []

class QueryProcessRequest(Resource):
    def get(self):
        return {"all_requests": processed_requests}

    def put(self):
        input = request.form['data']

        processed_input = QueryChatGPTSingleton().query(input)

        processed_requests.append(processed_input)
        
        images = ImageManager().get_images(processed_input)
        print(images)
        processed_input['images'] = images

        return processed_input