# Zero Trust Architecture for Applications


## Zero Trust Concept
The idea of 'Zero Trust Network' was introduced by John Kindervag back in 2010 and to concept was focused about company networks and access to them securely by users from where ever they want. Around 2014 Google introduced their 'Beyond Corp' concept: security framework based on shifiting the authentication and authorization, from service edge to each user or device. And here we are now, in 2021, sitting nearly whole year on forced home office, with little chances for change utilizing this concept widly. 

## BackOffice is a new Admin
As we know, beside the, enduser applications, some environments needs something called 'backoffice' applications. The purpose of these, additional, applications sometimes covers more then 'front' application itself -  It's like admin console, not only form adminstrative purpose but also to provide some bussiness needs as soon as someone got the idea. And how companies used to access them? With VPN and some local accounts. Or SSO in best case. 

## Treat Your Backoffice 'Clients' as 'Enduser'
What is the difference between the user accessing the application and client (tenant) employee accessing backoffice? From perspective of the managing the multi-tenant, cloud based application - none. They could have diffrent authentication methods, for sure different 

Why don't go even further, why we can have one app for them all with proper authentication and authorization 
istio
