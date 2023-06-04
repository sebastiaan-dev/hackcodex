from flask import request
from flask_restful import Resource

from query_chatgpt import QueryChatGPTSingleton

processed_requests = []

class AddInfoRequest(Resource):
    def get(self):
        return {"all_requests": processed_requests}

    def put(self):
        input = request.form['data']

        QueryChatGPTSingleton().add(input)

        processed_requests.append(input)

        return {"added": input}