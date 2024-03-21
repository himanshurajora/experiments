from transformers import pipeline
from PIL import Image

# Open a file: file
file = open("test.txt", mode="r")

# read all lines at once
all_of_it = file.read()

pipe = pipeline("question-answering", model="deepset/roberta-base-squad2")

question = "where do people respect cows?"

context = all_of_it

file.close()

print(pipe(context=context, question=question))
