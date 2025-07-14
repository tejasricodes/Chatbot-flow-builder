# 🧠 BiteSpeed Chatbot Flow Builder — Frontend Task

**A React-based flow builder using React Flow to compose chatbot conversation sequences.**

Aimed at being extensible for future node types and features.

## 🖥️ Demo

Live Preview: Click [here](https://chatbot-flow-builder-bitespeed.netlify.app) to see the live demo.
(*Hosted on Netlify*)

---

## 🔍 Overview

This project is a task to build a chatbot flow builder using React and React Flow. The aim is to enable multiple message nodes to be connected visually, forming an execution sequence. Designing with extensibility in mind to support future node types.

---

## ✨ Features

1. **Text Node**

   * Drag and drop from the Nodes Panel.
   * Multiple text nodes per flow.

2. **Nodes Panel**

   * Displays supported node types (currently “Text”).
   * Built to easily support new types in future.

3. **Edge Handling**

   * Source handles: **max one outgoing edge**.
   * Target handles: **multiple incoming edges**.

4. **Settings Panel**

   * Replaces Nodes Panel when a node is selected.
   * Allows editing of the node’s text.

5. **Save Flow Button**

   * Persists the flow configuration.
   * Validates: shows error when >1 node has empty target handles. ([github.com][2], [github.com][6], [github.com][7], [github.com][8])

---

## 🧱 Tech Stack

* React (JavaScript)
* [React Flow](https://reactflow.dev/)
* Tailwind css

---

## 🚀 Installation

```bash
git clone https://github.com/tejasricodes/Chatbot-flow-builder.git
cd Chatbot-flow-builder
npm install
# or
yarn install
```

---

## ▶️ Usage

Start the development server:

```bash
npm run dev











