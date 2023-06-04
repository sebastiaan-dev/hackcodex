from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS

from backup_api_key_loader import load_openai_api_key, load_prompt_file
from image_manager import ImageManager
from query_chatgpt import QueryChatGPTSingleton
from endpoint_process_query import QueryProcessRequest
from endpoint_add_info import AddInfoRequest

openai_api_key = load_openai_api_key() # os.environ['OPENAI_API_KEY']
prompt_file = load_prompt_file() # os.environ['PROMT_FILE']

QueryChatGPTSingleton().setup(openai_api_key, prompt_file)
ImageManager().load_all_image_names()

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})
api = Api(app)

api.add_resource(QueryProcessRequest, '/query')
api.add_resource(AddInfoRequest, '/add')
# api.add_resource(TextProcessRequest, '/process_chain/<string:chain_uuid>')

if __name__ == '__main__':
    app.run(host="0.0.0.0",debug=True)