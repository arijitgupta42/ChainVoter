#Info
the chockblain folder is the mobile application ionic folder
the chockblain-users folder is the loopback folder
the three batch files need to be edited and run in the following order:
1. server.bat: change the paths to the respective paths of mongod and the data directory
2. loopback.bat: this will start the loopback-api client
3. serve.bat: this will run the ionic program on the browser //not required
4. deploy.bat: this will deploy the app on your android device.

# Use
You will need to install ionic cli, loopback(3.x), nodejs and cordova (below versions) for the program to run.
Please also install the android platform on cordova.

#IMPORTANT: Please make sure your mobile and the mongoDb server are on the smae network.

#Environment info:
cli packages: (C:\Users\ameya\AppData\Roaming\npm\node_modules)

    @ionic/cli-utils  : 1.19.3
    ionic (Ionic CLI) : 3.20.1

global packages:

    cordova (Cordova CLI) : 8.1.1 (cordova-lib@8.1.0)

local packages:

    @ionic/app-scripts : 3.2.2
    Cordova Platforms  : none
    Ionic Framework    : ionic-angular 3.9.5

System:

    Android SDK Tools : 26.1.1
    Node              : v8.11.1
    npm               : 5.6.0
    OS                : Windows 10
