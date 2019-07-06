# ChainVoter
(Solution for Codefundo++ 2019)

Codefundo 2019:
Secure Voting Process using Azure Blockchain.

# Purpose :

Elections and the voting process using EVMs has been under criticism for being biased and corrupt. Further, many people are unable to be physically present in their constituencies at the time of voting, thus, reducing the voter turnout. 

In this project we are trying to make the electronic voting/polling process in the elections a smoother sail for everyone involved in it, by using Azure Blockchain to make things more secure, transparent, reliable and effective.
Our main aim is to make sure that every eligible resident of the country gets to vote with minimal effort on their part (other than the effort of deciding who to vote for) so that people can wield one of the most important rights they have in a democracy. We want to make sure that everyone gets to vote, gets to vote for whoever they want and gets the assurance that their vote is going to the right place.
Other than this, our mission is to make this process as transparent as possible so that all issues can be traced back to and handled at the source. We want to eradicate any cases of people not being there on the voters list, or not being able to vote from a different constituency, or claiming that their vote did not go to who they voted for.
With our solution people will not be required to stand in line at polling booths and will even be able to vote from outside their constituency as long as they have their aadhaar and Voter ID detials at hand. To get started with our application people will simply need to go to the website and register themselves there on the eve of election day. Then on election day they can simply login with their unique details and cast their vote comfortably.

# Features :

The app will first verify the user’s details. User’s Name, Aadhaar No. and Voter ID will be requested and compared with the database on https://data.gov.in/ . Also, the fingerprints of the user will be scanned and compared to the biometrics in Aadhaar. This will be used, along with the time of the login to create a unique User ID. 

The app will store the MAC ID of the device which is used to login, and will allow only 4 logins per device. Multiple logins have been allowed so that many family members can vote using the same device, or a user can re-attempt to cast his vote, if he fails the first time. Number of logins have been restricted for security purposes.

There will be a time-limit of 5 minutes within which the user needs to submit his vote. If the user is unable to complete it within the allotted time, or if the internet connection is lost during the process, he would have to re-login and get his identity verified again.

A block will be created containing User Details, MAC ID, Voting Details(Constituency, Voted For, etc.) and hash. The Voting Details will remain private and will be accessible only to the user. Such blocks will create a blockchain which will be transparent and immutable.
Before the addition of a new block, it will be verified if the user has already voted or not, the signature of the user is on his own vote and only one vote is added.


# Problems That May Arise :

1. If the user does not have an Aadhaar card or Voter ID, he can’t cast his vote.  In that case, he would be redirected to the required websites to get enrolled in the registration process.

2. For people without/with limited internet connectivity we hope to organize booths that can provide free internet for a limited period of time on providing suitable details (aadhaar, voter id). For those without devices capable of running our application, we plan to place multiple master devices in those booths themselves so that those people can come and vote in those devices. 
 
3. If the user’s mobile does not have a fingerprint scanner, he would need to use some other phone which has the required hardware, or visit one of the nearby voting centres.

4. User can still be made to vote by-force. In that case, an emergency button could be present in the app which would log out the user and block that MAC ID.


# Technology/Hardware Used :

1. JavaScript for coding
2. Microsoft Azure for implementing the blockchain
3. Fingerprint Scanner
4. Ionic v3 and Cordova for mobile app design

# Expected Result :
This app will make voting a more transparent and reliable process. This will allow voters to vote even without being physically present in their constituencies. Also, it will help in improving the database of the government. Our app will allow users to cast their vote from the comfort of their homes.

# Team Members: 
Ameya Laad,
Arijit Gupta,
Parth Agrawal
