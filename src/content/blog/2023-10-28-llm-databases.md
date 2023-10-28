---
title: Picking the right database for your LLM project
description: With so many new options available, it's hard to choose the right one
pubDatetime: 2023-10-28
tags:
  - technical
  - llm
---

So you want to start a project in 2023 or beyond, possibly with cool new LLM features. But with the plethora of database options available, it’s more challenging than ever to pick the right one. It’s easy to spend hours on end reading landing pages and comparison blogs. Here’s a one-stop-post that can help you make the right decision fast.

First of all, I collected a list of options that you might want to consider. Below that, I cover the main choices for each database type, and make some suggestions.

| Database            | Open Source | Tech       | Main DB | Vector Store | Full text search | Free tier |
| ------------------- | ----------- | ---------- | ------- | ------------ | ---------------- | --------- |
| **Supabase**        | Yes         | PostgreSQL | Yes     | Yes          | Limited          | Good      |
| **Planetscale**     | No          | MySQL      | Yes     | Soon         | Limited          | Good      |
| **Firebase**        | No          | NoSQL      | Yes     | No           | Limited          | Regular   |
| **DynamoDB**        | No          | NoSQL      | Yes     | No / Hacky   | Very limited     | Good      |
| **Atlas (MongoDB)** | Yes         | NoSQL      | Yes     | Yes          | Regular          | Regular   |
| **FaunaDB**         | No          | NoSQL      | Yes     | Hacky        | Limited          | Regular   |
| **ElasticSearch**   | Yes         | NoSQL      | No      | Yes          | Very good        | No        |
| **OpenSearch**      | Yes         | NoSQL      | No      | Yes          | Very good        | Very Good |
| **Algolia**         | No          | NoSQL      | No      | No           | Yes              | Regular   |
| **Meilisearch**     | Yes         | NoSQL      | No      | No           | Yes              | No        |
| **Typesense**       | Yes         | NoSQL      | No      | Yes          | Yes              | No        |
| **LanceDB**         | Yes         | NoSQL      | No      | Yes          | Limited          | No        |
| **Pinecone**        | No          | NoSQL      | No      | Yes          | No               | Good      |
| **Chroma**          | Yes         | NoSQL      | No      | Yes          | No               | No        |

## Main DBs

The main DB is where you’ll store user and business related data. This is commonly a good-old SQL database, and you’ll need a _really_ good excuse to switch to NoSQL for this. You can always spin up your own little Postgres or MySQL database and run it in your basement server, but the simplest approach is to rely on one of the popular cloud offerings. Start with something like **Railway** or **DigitalOcean**, or go with one of my two recommendations below for a few more features and better free tiers.

**Supabase** is a feature-complete cloud database based on Postgres with all the features you might need, including built-in authentication. They also happen to lean in heavily on the AI side of things, so you’ll find several features such as vector store support (based on pgvector) and an online query completion engine.

**Planetscale** is another contender based on MySQL with a very generous free tier and excellent DX thanks to their branching functionality. It doesn’t offer vector store support at the time of writing, but [it was announced that it would be coming soon](https://planetscale.com/ai).

## Full text search

If your project relies heavily on text and you need to be able to search and retrieve strings or documents, you’ll have to be careful about the full-text-search capabilities of DBs. While most DBs do offer some sort of text search, it’s usually very rudimentary and not enough if you have big search needs.

Among SQL databases, Postgres has the most advanced search capabilities, especially thanks to its wide variety of extensions. For this reason, in many cases **Supabase** or Postgres hosted on Railway or DigitalOcean will be a strong choice.

MySQL, and by extension **Planetscale**, has weaker text search, with only basic features available. If that’s all you need and you already have a Planetscale database, then you don’t need to shop around any further.

Now, in some cases, you need advanced and powerful full-text-search. Without beating around the bush, there’s only one real choice here: **ElasticSearch**. It offers all the advanced features you can dream of, including fuzzy matching, ranking, relevancy, semantic similarity, integrations with ML models, and much more. It comes at a cost, though. Self-hosting ElasticSearch is challenging, and whether you host yourself or choose a cloud plan, it gets expensive really fast.

Some ElasticSearch contenders exist, such as Algolia, Meilisearch and Typesense. They can all make sense in certain scenarios, but the long development history of ElasticSearch makes it difficult to compete against in performance and features. Look into these alternatives and check if if they do fit your needs.

## Vector Stores

When working with LLMs, providing the right context in the prompt is of utmost importance. Garbage in, garbage out. Value in, value out. For this reason, vector stores enable us to retrieve the context that is most similar to the user query, and inject it into our prompts to return more accurate results. Say you are building a chatbot for your wiki pages. You’ll want to store each chunk of wiki page in a vector store (by processing the chunk through an embedding model). Now, when the user asks a question to your new shiny chatbot, we can query the vector store to retrieve the most appropriate text.

If you already have a main database but need the additional vector store capability, then the two most common options are **Chroma** and **Pinecone**. They are similar in features, and the latter offers a hosted plan with a free tier, while the former requires self-hosting for now. Both options are focused solely on vector stores, so you can expect good performance and features supporting vector handling.

On the other hand, it can be challenging to maintain multiple databases simultaneously, especially if some of the data is shared and must stay in sync. Consider using a database that can serve as both your main database as well as being a vector store. **Supabase** already offers this functionality, while **Planetscale** is planning to add the feature soon. ElasticSearch and OpenSearch also have this capability, so if you need both full-text search as well as a vector store, it can be a great option.

## What I chose for [PaperStudio](https://www.paperstudio.app)

For my own project, I have my main database in **PlanetScale**. I love their DX, especially the ability to do database branching for schema changes. It is very performant and can scale to planet-scale (hurr hurr), albeit that’s not something we should worry about when just starting out. However, my project also needs both advanced full-text-search features as well as a vector store, so I additionally use **OpenSearch** to cover those needs. I chose OpenSearch over ElasticSearch for now due to the generous AWS free tier (1 year of limited free usage). In the future, I might consider switching to ElasticSearch since it has more features.

I find it challenging to maintain my data in sync. When adding additional papers to my database, I have to separately add them to both PlanetScale and OpenSearch, and ensure they stay in sync.

## My recommendation

I suggest going with **Supabase** due to being an all-in-one solution. The only reason why I personally didn’t go down this route is the fact that Postgres full-text-search could not be compared with ElasticSearch/OpenSearch, and this was a dealbreaker in my case.
