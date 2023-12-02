# ChatBotAPI
---
## Overview 💡

This repository contains complete code for ChatBotAPI. The ChatBotAPI is the try to achieve personal chatbot training platform, this API could help several small business or small bots to have the power of nlp with having less time in development.
The model behind the curtains has a a feedforward neural network with three fully connected layers and ReLU activation functions.
The hyperparameters used for training are:
1. `batch_size = 8`
2. `hidden_size = 8`
3. `output_size = len(tags)` here number of tags is output size
4. `input_size = len(X_train[0])` here length of the bag of words is input size.

## Installation 

To get started, follow these steps:

1. Clone this repository: `git clone https://github.com/TNEM22/ChatBotAPI.git`
2. Install dependencies: `pip install -r requirements.txt`
3. Run the program `python flask_app.py`.

## Running the trained model

1. Download the zip file [here](https://github.com/TNEM22/ChatBotAPI/blob/main/static/outs/chat.zip).
2. Unzip the zip file using any file archiver.
3. Open terminal inside the folder chat.
4. Run the program: `python chat.py`
