<h1 align="center">
  SDG website
</h1>

[SDG Website] is an interactive platform where you can explore **Sustainable Development Goals** through engaging games, contribute to community discussions, and access a dedicated learning space. 

<hr/>

## Dependencies

Before cloning and attempting to run this code, you will need:

- Node (npm)
- Spring tool Suite 4
- Firebase CLI (Optional, for deployment only)
- Google Cloud VM or AWS EC2

<br/>

## Getting Started

0. clone this repo to your device.

###Frontend
1. run `npm install` on SDG/src/main/frontend, assuming you have node installed on your device.
2. Create a new firebase project in the [Firebase Console](https://console.firebase.google.com/) and activate Authentication, Firestore (w/ rules optionally), and Storage. To troubleshoot, please view Firebase's own documentation.
3. Run `touch .env` to generate a environment file
4. go to your Firebase project's settings, copy the project keys, and paste them into the .env file you created
5. Run `npm start` to develop on localhost:3000

###Backend
1. Open IntelliJ IDEA or Eclipse and go to Import Project, assuming you have OpenJDK 17 and lombok installed.
2. Make a environment file.
3. Select Run on Intellij, or in Eclipse, select Run As > Spring Boot App.

<br/>

## Deployment

### Frontend 

You can deploy this site to any hosting platform of your choice, but this project recommends Firebase Hosting, as this will allow you to connect your hosting to the Firebase project used in the Getting Started section. Note that you need to run `npm run build` before you can deploy the site. To deploy your local copy of this repository:

1. if you haven't already, run `firebase login` to login to your google account with your Firebase Project for this app
2. run `firebase init hosting` and follow the instructions given (making sure to select the appropriate Firebase Project)
3. run `firebase deploy --only hosting` to deploy your site to the URLs <PROJECT_ID>.web.app and <PROJECT_ID>.firebaseapp.com. You can find your Project ID in the project settings page in the Firebase console.

For further hosting configuration (such as setting up a custom domain), please view Firebase's own documentation.

### Backend

You can deploy server with Virtual Machine such as AWS EC2 or Google Compute Engie, first, launch a virtual machine on your chosen platform. Next, use SSH to upload your JAR file to the VM. Once the application is transferred, start it using the `java -jar` command. To ensure the application continues running even after you log out, consider using nohup to run it in the background or create a systemd service that automatically starts the application whenever the server reboots.

You can create your own database (MYSQL) on Google Cloud, and put the url link on the src/main/sources/application.properties. You should purchase a domain and create an SSL key to use your server over HTTPS.

## Features


<br/>

## Tech Stack

- Frontend: React (deployed on Firebase)
- Backend: Spring Boot with Google Cloud (MySQL database connection)
- Testing: Jest and Junit
- CI: Github Actions (used for automated testing and deployment)

<br/>

## Frontend

### Pages

`SDG/src/main/frontend/src/pages`
This directory is organized to include several individual page components, each representing a different section of the app. Each page is fully customizable, allowing for modifications as needed.

### Componenets

`SDG/src/main/frontend/src/components`
These files contain React components that are integrated into the page files. Each component serves specific purposes, such as providing a reusable layout or encapsulating distinct functionalities for each page. 

<br/>

## Backend

`SDG/src/main//java`
In the backend, the architecture is organized around several key components:

Member: This module manages user-related functionalities, including user registration, authentication, and profile management.
<details>
Member.JWT: This component handles JSON Web Tokens for secure authentication, ensuring that user sessions are managed effectively and safely.

Member.Auth: This part is responsible for the authentication logic, verifying user credentials and managing access controls within the application.

Member.Mapper: This is responsible for mapping database operations related to the member entity, facilitating interactions with the database using MyBatis.
</details>
SDG: This module focuses on Sustainable Development Goals (SDGs), managing the data related to each goal, including their details and metrics.

Post: This component manages user-generated content, allowing users to create, read, update, and delete posts related to the SDGs or community discussions.

Sdgmodule: This module is responsible for recording and managing the user's learning progress and other features related to user learing SDGs. This module tracks how users engage with the educational content related to the Sustainable Development Goals (SDGs), ensuring that their progress is accurately documented and can be referenced for future learning or achievements. 

<br/>

## Testing
### Frontend
`SDG/src/main/frontend/src/tests`
These files contain all the tests to ensure the code is running as intended. They can be run using `npm test`. Additions and modifications to test can be done here.
### Backend
`SDG/src/test`
These files contain all the tests to ensure the code is running as intended. They can be run using `./gradlew test`. Additions and modifications to test can be done here.
<br/>

## Contributors

### 1. [Changqing Ge](https://github.com/GCQ2002)
- **role:** Front End
<a href="https://github.com/GCQ2002">
<img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/161282055?v=4" width="50px"/>
</a>

### 2. [Wenxin Da](https://github.com/Wenxin20968)
- **role:** Back End
<a href="https://github.com/Wenxin20968">
<img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/161175214?v=4" width="50px"/>
</a>

### 3. [Yurim Cho](https://github.com/666584)
- **role:** Back End
<a href="https://github.com/666584">
<img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/65121233?v=4" width="50px"/>
</a>

### 4. [Harleen Kaur Singh](https://github.com/harleen113)
- **role:** Front End, Design
<a href="https://github.com/harleen113">
<img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/126838328?v=4" width="50px"/>
</a>

### 5. [Aryan Saini](https://github.com/StephR1128)
- **role:** Front End, Design, Product Owner
<a href="https://github.com/StephR1128">
<img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/76251834?v=4" width="50px"/>
</a>
<br/>

<br/>

## License

SDG Learning Hub is licensed under the terms of the BSD Zero Clause License (0BSD) and is available as open-source and free.


<br/>

## Links

- [Website](https://sdglearninghub.firebaseapp.com/) (Server is currently stopped.)
- [Documentation: Confluence](https://global-sustainability-goals.atlassian.net/wiki/spaces/~712020187b06aabf8f4374afa5eff383235b56/pages)
- [Source Code](https://github.com/666584/IT-Project)
