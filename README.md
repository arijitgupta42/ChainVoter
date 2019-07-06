# ChainVoter
(Solution for Codefundo++ 2019)

Codefundo 2019:
Secure Voting Process using Azure Blockchain.

# Purpose :

Elections and the voting process using EVMs has been under criticism for being biased and corrupt. Further, many people are unable to be physically present in their constituencies at the time of voting, thus, reducing the voter turnout. 

In this project we are trying to make the electronic voting/polling process in the elections a smoother sail for everyone involved in it, by using Azure Blockchain to make things more secure, transparent, reliable and effective.

This app will allow users to cast their vote from anywhere easily.

# Features :

Creation of block using MAC ID, User ID(containing Name, Aadhaar, Voter ID, and scanned fingerprints after verification), Voter ID(votedFor,constituency) and hash.

4 logins per MAC ID to account for failed voting due to internet failure.

Time limit of 5 minutes within which the user needs to cast his/her vote. 

Before addition of block in the chain, verification if the user has already voted.


# Countermeasures :

1. Organising booths with master devices installed for people with inadequate hardware/internet connectivity.
2. An emergency button for people being made to vote-by-force, which blocks the MAC ID.
3. Redirecting people without Voter ID or Aadhaar to registration websites.


# Team Members: 
Ameya Laad,
Arijit Gupta,
Parth Agrawal
