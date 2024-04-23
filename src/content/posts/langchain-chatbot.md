---
id: langchain-chatbot
title: "From UIs to Text Boxes: Building an AI powered chatbot with LangChain JS (Part 1 of 2)"
description: "Discover the chatbot revolution with LangChain: UIs to Text Boxes. Unveil the adventure now!"
isPublished: true
date: "2023-11-10"
image: "/images/thumbnails/chat-ai.webp"
---

Welcome to the wild world of AI, where chatbots are multiplying faster than rabbits on a caffeine high—seriously, **EVERYTHING** has a chatbot now. I'm starting to think even my coffee maker needs one! 🤖☕️ Do we really need a chatbot for every platform, though? It's not just a joke; it feels like we're hurtling into the chatbot/agent abyss.

Now, gather 'round for a dose of "Storytime" magic : Picture this - an engineer at a conference drops the bomb that he'd rather chat with a bot than scroll through a web page for info, especially when it comes to the conference schedule. He said it with a smirk, like he just spilled the secret to the universe: UIs are so last season, and a plain old text box is the new superstar. But hey, call me old-fashioned—I still believe a killer UI is worth more than a thousand words.

Let me play devil's advocate for a moment, I'm not a fan of chatbots on websites; I prefer talking to a human who can solve my problems. However, AI-powered chatbots are very useful; they have specific context and can assist a user without the need for another human's help. For this reason, let's explore how easy it is to create a chatbot using [LangChain JS](https://js.langchain.com) with a focus on how chains are formed.

First, let's review some basic concepts of **Natural Language Processing (NLP)**. To make computers understand language, words need to be represented as numbers, and this process is done by dividing the text into units known as **tokens**; this is called **tokenization**. These tokens are transformed into **vectors**, which are representations of the words themselves. **Embeddings** are vectors representing real-world objects that capture the semantic meaning of the word. In other words, vectors that are closer share more meaning than those that are farther apart. Here is a visual:

<div className="flex justify-center">
    <Image src="/images/embeddings.png" alt="Embedding examples" className="py-6 animate-fade-in" height={300} width={700} />
</div>

To create our chatbot, we'll do the following:

1. [Setting up a vector store: preparing our information](#vector-store)
2. [Creating prompts: making requests to the model](#creating-prompts)
3. [Building chains: sequencing requests](#building-chains)

<div id="vector-store">
# Setting up a vector store: preparing our information
</div>

Now, to create our chatbot with specific knowledge, we need to pass our data to a vector store. To do this, we need to break our data into chunks, create embeddings from those chunks, and store them in a vector store.

**NOTE:** The vector store will be our source of knowledge, and in our case, we'll use the Supabase vector store. We won't delve into this in much detail as it can be done in many different ways.

In my case, I'm opting for Alice in Wonderland as the source of knowledge. To organize our information, we'll leverage the `RecursiveCharacterTextSplitter` from the LangChain package. It's worth noting that the parameters are customizable based on the nature of the information and the desired chatbot performance.

<CodeBlock code={`
    const text = await readFile('aliceInWonderland.txt', 'utf-8')
        
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 500,
            separators: ['\\n\\n', '\\n', ' ', ''], // default setting
            chunkOverlap: 50
        })

    const output = await splitter.createDocuments([text])
`} language="js" />


Subsequently, we'll craft our database and embeddings simultaneously using `SupabaseVectorStore` and `OpenAIEmbeddings`.

<CodeBlock code={`
    const supabaseApiKey = process.env.SUPABASE_API_KEY
    const supabaseURL = process.env.SUPABASE_URL
    const openAIApiKey = process.env.OPENAI_API_KEY


    const client = createClient(supabaseURL, supabaseApiKey)

    await SupabaseVectorStore.fromDocuments(
        output,
        new OpenAIEmbeddings({ openAIApiKey }),
        {
            client,
            tableName: 'documents'
        }
    )
`} language="js" />

Now, we've got our database with embeddings ready:

![Supabase database with embeddings from Alice in Wonderland](/images/supabase-alice.png)

<div id="creating-prompts">
# Creating prompts: making requests to the model
</div>

A prompt provides explicit instructions for a model to produce the desired result. In a chat, we have the user's question and the model's response. A prompt for that could be:

>**Text prompt:** "Given the user's question, provide a context-based response."

However, using this prompt, the user's question may contain information irrelevant to the model. Questions that don't contain context or additional information are called standalone questions. For example:

>**Standalone Question:** "How are you?"

>**Non-Standalone:** "Can you tell me how you are?"

In the standalone version, "How are you?" forms a complete and grammatically correct sentence. It doesn't require any additional information to be understood. In contrast, the non-standalone version requires additional context to be a complete sentence.

For that reason, we're going to create two prompts—one for obtaining a standalone question and another for the chatbot's response:

<CodeBlock code={`
    const standaloneQuestionTemplate = \`Given a question, convert it to a standalone 
    question: {question} 
    standalone question:\`

    const standaloneQuestionPrompt = PromptTemplate.fromTemplate(standaloneQuestionTemplate)

    const answerTemplate = \`You are a helpful and enthusiastic support bot who can answer
    a given question about Alice in Wonderland based on the context provided. Try to find
    the answer in the context. If you really don't know the answer, say "I'm sorry, I don't
    know the answer to that." Don't try to make up an answer. Always speak as if you were
    chatting to a friend.
    context: {context}
    question: {question}
    answer:\`

    const answerPrompt = PromptTemplate.fromTemplate(answerTemplate)

`} language="js" />

<div id="building-chains">
# Building chains: sequencing requests
</div>

In many cases, calling a model with a prompt is sufficient. But what if our chatbot has multiple requests to make to a model? We find ourselves in this situation since we want to obtain the standalone question and the user's response. LangChain provides a mechanism for chaining these requests to Large Language Models (LLMs). A chain is simply a sequence of components, which can, in turn, contain other chains.

First, let's create a chain to construct the standalone question:

<CodeBlock code={`
    // We use a temperature of 0 to ensure the model stays focused and not be creative
    const llm = new ChatOpenAI({ openAIApiKey, temperature: 0 })

    const standaloneQuestionChain = RunnableSequence.from([
        standaloneQuestionPrompt, // This is our prompt for the model
        llm, // The model that we are using
        new StringOutputParser() // A parser to return the output as a string
    ])
`} language="js" />

The next step is to build a chain to query the vector store; the result should return all the information relevant for constructing a response:

<CodeBlock code={`
    const supabaseApiKey = process.env.SUPABASE_API_KEY
    const supabaseURL = process.env.SUPABASE_URL
    const client = createClient(supabaseURL, supabaseApiKey)

    const vectorStore = new SupabaseVectorStore(
        new OpenAIEmbeddings({ openAIApiKey }), 
        {
            client,
            tableName: 'documents',
            queryName: 'match_documents'
        }
    )

    const retriever = vectorStore.asRetriever()

    function combineDocuments(docs){
        return docs.map((doc)=>doc.pageContent).join('\\n\\n')
    }

    const retrieverChain = RunnableSequence.from([
        previousResult => previousResult.standalone_question, // The standalone question from the previous chain
        retriever, // The database as source of knowledge
        combineDocuments // A function to combine all the data from the retriever
    ])
`} language="js" />

Following that, we need a chain that will utilize the information from our source of knowledge and construct a response for the user:

<CodeBlock code={`
    const answerChain = RunnableSequence.from([
        answerPrompt, // This is our prompt for the model
        llm, // The model that we are using
        new StringOutputParser() // A parser to return the output as a string
    ])
`} language="js" />

Finally, we move on to constructing the main chain that incorporates all our previous chains:

<CodeBlock code={`
    const chain = RunnableSequence.from([
        // Standalone question chain
        {
            standalone_question: standaloneQuestionChain,
            input_variables: new RunnablePassthrough()
        },
        // Retriever chain
        {
            context: retrieverChain,
            question: ({ input_variables }) => input_variables.question
        },
        // Answer chain
        answerChain
    ])
`} language="js" />


In the previous chain, we utilized `RunnablePassthrough` to access our prompt variables, essential for the subsequent chain.

The final step to execute a chain is as follows:

<CodeBlock code={`
    const result = await chain.invoke({
        question: question
    })
`} language="js" />


It's worth noting that there are various ways to build chains, and `RunnableSequence` is just one example of how to structure them. For more information, please refer to the [LangChain JS](https://js.langchain.com) documentation.

Now, [this is how the complete code looks](https://gist.github.com/agovc/bab7b31e934541af601354ddd6a035ff).

In summary, the rise of AI-driven chatbots prompts a reflection on their necessity and effectiveness. While debates surround the role of traditional user interfaces, AI-powered chatbots, particularly those employing Natural Language Processing, prove invaluable in delivering quick and contextually relevant information.

Our exploration of creating a chatbot using LangChain JS underscored the importance of foundational NLP concepts. From setting up a vector store to building chains, the intricacies involved in leveraging AI for intelligent and context-aware chatbots became evident.

In the battle of human charm versus AI wizardry, the debate rages on. Some crave the human touch, while AI enthusiasts dream of a world where chatbots are our virtual BFFs. As tech keeps evolving, finding the sweet spot between user-friendly interfaces and AI magic is the ongoing quest. Stay tuned for the next chatbot saga; the AI adventure is far from over! 🚀✨
