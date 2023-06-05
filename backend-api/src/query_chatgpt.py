import uuid
import hashlib

from langchain.document_loaders import TextLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.memory import ConversationBufferMemory
from langchain.docstore.document import Document

class QueryChatGPTSingleton():
    def __new__(cls):
        if not hasattr(cls, 'instance'):
            cls.instance = super(QueryChatGPTSingleton, cls).__new__(cls)
        return cls.instance
    
    def setup(self, openai_api_key, prompt_file):
        self.db = None
        self.ids = None
        self.openai_api_key = openai_api_key
        self.prompt_file = prompt_file

        self.__setup_chroma()
        self.__setup_retrieval()

    def __setup_chroma(self):
        # Load and parse the prompt file
        loader = TextLoader(self.prompt_file)
        documents = loader.load()
        texts = self.__split_text(documents[0].page_content)

        embedded_documents = [Document(page_content=x) for x in texts]
        ids = [self.__hash_string(str(x)) for x in texts]

        print(self.ids)

        # Setup vector database
        collection_name = 'JAMES_ANDERSON'
        persist_directory = 'db'
        embeddings = OpenAIEmbeddings(openai_api_key=self.openai_api_key)

        self.db = Chroma(
                collection_name=collection_name,
                embedding_function=embeddings,
                persist_directory=persist_directory)

        for index, embedded_document in enumerate(embedded_documents):
            try:
                self.db.add_documents(documents=[embedded_document], ids=[ids[index]])
            except:
                print(self.ids[index])

        # Load the initial prompt file to seed the database
        try:
            self.db = Chroma.from_documents(
                collection_name=collection_name, 
                documents=embedded_documents, 
                embedding=embeddings, 
                ids=self.ids, 
                persist_directory=persist_directory)
        except:
            print('Keys already exist.')
            self.db = Chroma(
                collection_name=collection_name,
                embedding_function=embeddings,
                persist_directory=persist_directory)

    def __setup_retrieval(self):
        # Setup conversation memory + 
        self.qa = RetrievalQA.from_chain_type(
            llm=ChatOpenAI(openai_api_key=self.openai_api_key, temperature=1),
            chain_type='stuff',
            retriever=self.db.as_retriever(),
            verbose=True,
            chain_type_kwargs={
                "verbose": True,
                "prompt": self.__init_template(),
                "memory": ConversationBufferMemory(
                    memory_key="history",
                    input_key="question"),
            }
        )        
        
    def add(self, input):
        # Add the new information to the vector database
        embedded_document = Document(page_content=input)
        id = self.__hash_string(str(input))

        try:
            self.db.add_documents(documents=[embedded_document], ids=[id])
        except:
            print(input, 'already exists.')

    def query(self, input, chain_uuid = None):
        output = self.qa.run(input)

        if chain_uuid is None:
            chain_uuid = str(uuid.uuid4())

        return {
            f'chain-uuid': chain_uuid,
            f'uuid': str(uuid.uuid4()),
            f'question': input,
            f'answer': output}
    
    def __init_template(self):
        # Setup the prompting template
        template = """
        You are an assistant responding to people who are suffering from Alzheimer's to help them remember things about themselves, their family and their past.
        Answer in a natural conversational manner. If you do not know how to respond or do not understand the prompt, respond with: I do not have information about your question, could you try again, or should I contact your caregiver?
        If someone responds with agreement to "I do not have information about your question, should I contact your caregiver?" respond with an affirming statement that you are contacting the caregiver defined in the context.
        The caregiver in this context is not a doctor.
        Use the following context (delimited by <ctx></ctx>) and the chat history (delimited by <hs></hs>) to answer the question:
        ------
        <ctx>
        {context}
        </ctx>
        ------
        <hs>
        {history}
        </hs>
        ------
        {question}
        Answer (in English):
        """
            
        return PromptTemplate(
            input_variables=["history", "context", "question"],
            template=template,
        )
    
    def __hash_string(self, string):
        # Create a SHA-256 hash object
        sha256_hash = hashlib.sha256()
        sha256_hash.update(string.encode('utf-8'))
        return sha256_hash.hexdigest()

    def __split_text(self, input):
        text_splitter = CharacterTextSplitter(    
            separator="\n",    
            chunk_size = 500,
            chunk_overlap = 100,
        )
        split_input = text_splitter.split_text(input)
        print("SPLIT OUTPUT")
        print(split_input)
        return split_input