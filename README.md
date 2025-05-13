# 🇺🇸 US States REST API

This is a RESTful API built with **Node.js**, **Express**, and **MongoDB (Mongoose)** that provides information and fun facts about U.S. states. It uses static JSON data for core details and MongoDB to store and manage fun facts.

---

## 🚀 Deploy to Glitch

### 🔁 Remix from GitHub

To deploy this API using [Glitch](https://glitch.com):

1. Open the GitHub import page:
https://glitch.com/edit/#!/import/github

mathematica
Copy
Edit

2. Paste your repository URL:
https://github.com/juane253/Final-Project

markdown
Copy
Edit

3. Wait for Glitch to import and install dependencies.

4. Add your MongoDB URI:
- In Glitch, open the `.env` file (or create it)
- Add:
  ```
  DATABASE_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/usStates?retryWrites=true&w=majority
  ```

5. Visit your deployed app:
https://your-app-name.glitch.me/
