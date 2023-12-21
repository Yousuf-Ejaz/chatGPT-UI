
# ChatGPT WebUI

Welcome to the ChatGPT WebUI, a user-friendly interface for interacting with ChatGPT. This application is built using React.js for the basic UI, Redux for state management, TailwindCSS for styling, and yarn for dependency management.

## [Live Deployment](https://chat-gpt-ui-tau-ashen.vercel.app/)

## Features

### 1. API Integration

#### a. Actual Response

The application successfully integrates with the ChatGPT API to provide actual responses to user queries. Axios library is utilized for making API requests. To enhance user experience, local storage is employed for caching, ensuring that previously fetched responses are stored locally.

#### b. Multiple Chat Instances

The primary data structure for managing conversations is an array of threads. Each thread represents a chat stream, consisting of a unique ID and an array of chats. A chat, in turn, represents a query-response pair.

- **Thread Structure:**
  - Unique ID
  - Array of Chats

- **Chat Structure:**
  - Query
  - Response (Initially set to null)

When a user requests the homepage, a new thread is created with a single chat inside it. Since responses take some time to load, the initial response after firing the request is set to null. Once the promise of the request is resolved, the corresponding chat is populated with the correct response, replacing the null placeholder.

All changes to threads are recorded in local storage, ensuring the application maintains consistency even after a page reload.

### 2. User-Friendly Interface and Responsiveness

The application features a user-friendly interface designed for ease of use. TailwindCSS is employed for styling, providing a clean and modern look. Additionally, the use of appropriate media queries ensures that the application is responsive across various devices, adapting to different screen sizes for an optimal user experience.

## Getting Started

To run the ChatGPT WebUI locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/Yousuf-Ejaz/chatGPT-UI.git
   ```
2.  Navigate to the project directory:    
    ```
    cd chatGPT-UI
    ``` 
    
3.  Install dependencies:        
    ```
    yarn
    ```
 4. Create a .env file with the following field:        
    ```
    VITE_LONGSHOT_API_KEY = your_key
    ``` 
4.  Start the development server:    
    ```
    yarn dev
    ``` 
    

The application should now be running locally at http://localhost:5173.

Feel free to explore the ChatGPT WebUI and engage in interactive conversations with the ChatGPT model!

## Feedback and Contributions

If you have any feedback or would like to contribute to the project, please feel free to contact me. Your input is highly valued.

Happy chatting with ChatGPT! 🚀
