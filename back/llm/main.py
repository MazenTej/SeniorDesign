from langchain.document_loaders import DirectoryLoader, TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import SentenceTransformerEmbeddings
from langchain.vectorstores import Chroma
from langchain.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.chains.question_answering import load_qa_chain
from langchain.memory import ConversationBufferMemory
import os
os.environ["OPENAI_API_KEY"] = "Your API Key"
from ragas import evaluate
from datasets import Dataset
from ragas.metrics import (
    answer_relevancy,
    context_recall,
    context_precision,
)
# from ragas.llms import LangchainLLM
# from langchain.llms import OpenAI
default_ef = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")

if not os.path.exists("db"):
    text_loader_kwargs = {'autodetect_encoding': True}
    loader = DirectoryLoader("./llm/data", glob="**/*.txt", loader_cls=TextLoader,
                             loader_kwargs=text_loader_kwargs, silent_errors=True)
    documents = loader.load()
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=500, chunk_overlap=0, length_function=len)
    docs = text_splitter.split_documents(documents)
    db = Chroma.from_documents(
        documents=docs, embedding=default_ef, persist_directory="db")
    db.persist()

db = Chroma(persist_directory="db", embedding_function=default_ef)
gpt_turbo = ChatOpenAI(temperature=0.3, model_name='gpt-3.5-turbo-16k')

templateOne = """Scenario:
You are a Vanguard helper clerk assisting a user with their Vanguard questions.
Vanguard is an investment firm.
Instructions:
Convert the clients message into a search key in relation to actions the client can consider with the website. You have to key in the users intent into a vector database to get the results you want
Provide your response in the form of words separated by commas, produce up to 8 results.
Customer Message:
{text}
Question:
What actions would you suggest to the customer based on their message?"""

promptOne = PromptTemplate(input_variables=["text"], template=templateOne)
chainOne = LLMChain(llm=gpt_turbo, verbose=False, prompt=promptOne)

templateTwo = """You are a customer support specialist chatbot helping Vanguard clients with their questions while browsing the Vanguard website.
Vanguard is an investment firm.
Continue the conversation with the user by answering their question.
Use the following pieces of context and recommended actions and terms to answer the user's question if necessary otherwise ignore them.
If you don't know the answer, just say “Sorry, con’t answer your question, try to ask it in a different way”, don't try to make up an answer.
context: 
{context}
Recommendation:
{searchTermsResult} 
conversation history:
{chat_history} 
Human: {question}
Vanguard Chatbot:"""

promptTwo = PromptTemplate(
    input_variables=["chat_history", "question",
                     "context", "searchTermsResult"],
    template=templateTwo
)
memory = ConversationBufferMemory(
    memory_key="chat_history", input_key="question")
chainTwo = load_qa_chain(gpt_turbo, chain_type="stuff",
                         memory=memory, verbose=False, prompt=promptTwo)


templateThree = """Scenario:
You are a Vanguard chatbot who only responses with yes or no, assisting a user with their Vanguard questions.
Vanguard is an investment firm.
Instructions:
Consider the following conversation history with a user.
Output only 'yes' or 'no' if the users last message requires querying the vanguard information database.

conversation History:
{chat_history}
Human: {text}
Vanguard Chatbot:"""

promptThree = PromptTemplate(
    input_variables=["text", 'chat_history'], template=templateThree)
chainThree = LLMChain(llm=gpt_turbo, prompt=promptThree)


def create_eval_data_set():
    # Initialize a dictionary to hold data samples
    data_samples = {
        'question': [],
        'ground_truths': [],
        'answer': [],
        'contexts': []
    }
    try:
        with open('eval_questions.txt', 'r') as file:
            for line in file:
                # Splitting the line into question and ground truth
                question, ground_truth = line.split("ground_truths:", 1)

                memory.clear()
                answer, contexts = chat(question)
                # Combine and format context content
                formatted_contexts = [doc.page_content.replace(
                    "\n", " .") for doc in contexts]

                # Update the data_samples dictionary
                data_samples['question'].append(question)
                data_samples['contexts'].append(formatted_contexts)
                data_samples['answer'].append(answer)
                data_samples['ground_truths'].append([ground_truth])

    except FileNotFoundError:
        print("Error: eval_questions.txt file not found.")
        return

    # Convert to dataset and save
    dataset = Dataset.from_dict(data_samples)
    dataset.save_to_disk('eval_dataset')

    # Optional: Print dataset for verification
    print(dataset)


def evaluate_rag():
    loaded_dataset = Dataset.load_from_disk('eval_dataset')
    result = evaluate(
        loaded_dataset,
        metrics=[
            context_precision,  # checks if ground truth relevant items are in retrieved context
            answer_relevancy,  # checks how relevant llm answer is to the question
            context_recall,  # measures the extent to which the retrieved context aligns with the annotated answer
        ],
    )
    return result


def chat(query, EvaluationToggle=True):

    searchTerms = "".join(chainOne.run(query))
    st = searchTerms.split(",")
    matching_docs = []

    for s in st:
        seen_content = set()
        unique_documents = []
        documents = db.similarity_search(s, k=2)
        for doc in documents:
            if doc.page_content not in seen_content:
                seen_content.add(doc.page_content)
                unique_documents.append(doc)

        matching_docs += unique_documents

    response = chainTwo(
        {
            "input_documents": matching_docs,
            "question": query,
            "searchTermsResult": searchTerms,
        },
        return_only_outputs=True,
    )

    if EvaluationToggle:
        return response['output_text'], matching_docs
    else:
        return response['output_text']


def main(query):
    EvaluationToggle = False
    # toggle between chatting and evaluation
    # if EvaluationToggle:
    #     # Create evaluation dataset if it doesn't exist
    #     if not os.path.exists("eval_dataset"):
    #         create_eval_data_set()
    #     print(evaluate_rag())
    # else:
    #     while True:
    # query = input("Enter your query (type 'exit' to quit): ")
    # if query == "exit":
        # break
    # print(chat(query, EvaluationToggle))
    return (chat(query, EvaluationToggle))


if __name__ == "__main__":
    main(query)
