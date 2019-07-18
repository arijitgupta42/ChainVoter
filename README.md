# ChainVoter
(Solution for Codefundo++ 2019)

Codefundo 2019:
Secure Voting Process using Azure Blockchain.

# Purpose :

Elections and the voting process using EVMs has been under criticism for long, in search for better solutions. Further, many people are unable to be physically present in their constituencies at the time of voting, thus, reducing the voter turnout. 

Our main aim is to make sure that every eligible resident of the country gets to vote with minimal effort on their part (other than the effort of deciding who to vote for) so that people can wield one of the most important rights they have in a democracy. We want to make sure that everyone gets to vote, gets to vote for whoever they want and gets the assurance that their vote is going to the right place.

We also aim to make this process as transparent as possible so that all issues can be traced back to and handled at the source. With our solution, users will be able to vote from a different constituency. Claims by voters that their vote did not go to who they voted for will also be removed by the transparent process and use of the blockchain (while still remaning anonymous.

People will not be required to stand in line at polling booths and will even be able to vote from outside their constituency as long as they have their aadhaar and Voter ID details at hand. To get started with our application people will simply need to go to the website/application and register themselves there on the eve of election day. Then on election day they can simply login with their unique details and cast their vote comfortably.

# Features :

Creation of block using Cookies, User ID(containing Name, Party, Constituency, Aadhaar, Voter ID, and scanned fingerprints after verification from https://data.gov.in/ ), Signature(Name, Aadhaar, Voter ID) and hashing them.

Two factor authentication of voters using face recognition with Microsoft Face API and MongoDB database.

4 logins per device (recognized using cookies) to account for failed voting due to internet failure. These logins may also be used for family members, like senior citizens, using the same mobile phone to vote.

Time limit of 5 minutes within which the user needs to cast his/her vote, failing which he/she will be logged out.

Before addition of block in the chain, verification if the user has already voted or not.


# Countermeasures :

1. Organising booths with master devices installed for people with inadequate hardware/internet connectivity.
2. An emergency button for people being made to vote-by-force, which actually blocks the MAC ID but still gives the impression that vote has been cast.
3. Redirecting people without Voter ID or Aadhaar to registration websites.


# Team Members: 
Ameya Laad,
Arijit Gupta,
Parth Agrawal

P.S. The WebApp has seperate README on how to run it on your device
