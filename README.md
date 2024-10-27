<h1 align="center">
  SDG website
</h1>

[SDG Website] is an interactive platform where you can explore **Sustainable Development Goals** through engaging games, contribute to community discussions, and access a dedicated learning space. 

<hr/>

## Dependencies

Before cloning and attempting to run this code, you will need:

- Node (npm)
- Springboot Suite 4
- Firebase CLI (Optional, for deployment only)
- Google Cloud VM or AWS EC2

<br/>

## Getting Started

1. clone this repo to your device.

Front-end: 
1-1. run `npm install` on SDG/src/main/frontend, assuming you have node installed on your device.
1-2. Create a new firebase project in the [Firebase Console](https://console.firebase.google.com/) and activate Authentication, Firestore (w/ rules optionally), and Storage. To troubleshoot, please view Firebase's own documentation.
1-3. Run `touch .env` to generate a environment file
1-4. go to your Firebase project's settings, copy the project keys, and paste them into the .env file you created
1-5. Run `npm start` to develop on localhost:3000

Back-end:
2-1. Open IntelliJ IDEA or Eclipse and go to Import Project, assuming you have OpenJDK 17 and lombok installed.
2-2. Make a environment file.
2-3. Select Run on intellij, or in Eclipse, select Run As > Spring Boot App.

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

You can create your own database (MYSQL) on Google Cloud, and put the url link on the src/main/sources/application.properties. 

## Features


<br/>

## Tech Stack

- Frontend: React (deployed on Firebase)
- Backend: Spring Boot with Google Cloud (MySQL database connection)
- Testing: Jest and Junit
- CI/CD: Github Actions (used for automated testing and deployment)

<br/>

## Frontend

### Pages
src/


### Componenets


<br/>

## Backend

### Data Models



### Utilities



<br/>

## Testing



<br/>

## Contributors

### 1. [Changqing Ge](https://github.com/GCQ2002)
- **role:** Back End
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



<br/>

## Links

- [Website]()
- [Documentation: Google Drive]()
- [Documentation: Confluence](https://global-sustainability-goals.atlassian.net/wiki/spaces/~712020187b06aabf8f4374afa5eff383235b56/pages)
- [Source Code](https://github.com/666584/IT-Project)
