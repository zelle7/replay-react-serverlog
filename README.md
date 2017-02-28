# Replay React Redux
This App is a simple showcase for a replay function with react and redux. 
The server components can be easily build with other server technologies. This project
uses spring boot and a hsqldb as storage (but you could also make a php app or whatever you want)

## Dev

    npm run start //this will start the dev server with hot reloading
    
    mvn spring-boot:run //start the api server 

## Build 
### Build js
Build and set the correct urls with. 

    REACT_APP_API_URL=http://test.at npm run build 

In development you can create a .env file and put your ENV varibales there.

### Build war
 To create a deployable war run 
 
    mvn package 

inside the java folder. This war can be used with tomcat, all js files will be copied from the build folder of the npm scripts, so
in order to get a complete app you have to run the npm build script first. 
## create-react-app
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
See https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md for further infos on 
create-react app

