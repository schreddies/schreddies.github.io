# Threat Modelling 101
## Hacking on the whiteboard

In this post I would like to present practical point of view on Application Threat Modelling, in other words: How to hack application without any line of code. Straight, lightweight and flexible Threat Modelling approach to show everyone how to hack application before first line of code is written.  

 

## Intro  

Threat Modelling is the structured and continuous process of identifying security threats in the software. In other words - without any sophisticated tools, you can identify the potential threats in your application.  

In Microsoft STRIDE methodology there are 6 categories of threats: 

* Spoofing - attacker pretending to be someone else 

* Tampering - attacker force user to perform action 

* Repudiation - attacker performing attack without being noticed/ proved 

* Information disclosure (privacy breach or data leak) - aka GDPR circle of interest 

* Denial of service - attack that will limit or disable application usability 

* Elevation of privilege - attacker pretending to have access to data/ privilege to some action 

There are couple others: DREAD, OCTAVE, Trike... It’s really matters to have good understanding of methodology and what is our goal – find threats in the software.  

In Microsoft Security Development Lifecycle, third phase, after training and requirements, is called "Design" with Threat Modelling as one of the activities. It is clear indication that Threat Modelling should be performed before writing first line of code or in any kind of iteration in development lifecycle with implementation of new features. And why? On this stage, major changes are still relatively cheap to make. But it’s also made sense to do it on third iteration of your agile methodology sprint. Or after 15 years of development of application. And on every new feature or sprint – continuous is a keyword.  

## How to – the Cheatsheet 

Beginning won’t be easy to perform good Application Threat Modelling, you’ll need a couple of requirements to perform one.  

### Requirements 

One, well motivated, team (min. 2-3 team members) of good performers with product/ feature requirements and strong knowledge what they are going to write, or what they already have, 

* One moderator (optimally, a person with security knowledge - you), 

* Room with whiteboard and markers (for whiteboard…). 

And that’s it! No sophisticated tools, no special features.  

### Preparation 

I am not big fan of templates but they are helpful to not forget about something. I am not going to give you one… yet – see future section. Right now, I will give you some advice how to create one that will fit your product. 

Good starting point for me in creating your own Application Threat Modelling Checklist, or template, is various of the OWASP project. OWASP ASVS project is clearly best option but, in many cases, you need to adjust it to your product – and for some questions no one will give you clear answer. This is principal document for application security and every penetration test will cover these topics as well. Then, moving to specific technology in your application that needs to be covered – additional research is required I.e. if you have websockets - additional, targeted questions should be asked. SingleSignOn? Appropriate questions should be on your list. One warning – do not close yourself only to ask questions from the list – these should be indications and reminders. The good thing is that developing many applications or modules and having templates for, let’s say web application, you can reuse it and speed up finding some threats on base, technical level. On the other hand, complicated flows will be hard to cover using only templates – additional work will be required, with deep understanding of the application domain.  

Of course, you should loosely hold to the STRIDE and all points that this methodology highlights. Even if it’s quite high level and sometimes too detached from the code and developers it’s also base level in this kind of assessment – high level, overall help.  

### DO IT 

First things first: open questions are the only option to create good output. As moderator, you have one task – to ask open questions, that makes team, think about their solution. In ideal threat modelling, questions – “What we would like to create?”, “What possibly can go wrong?” and “How we are going to deal if something goes wrong?” – can be the only ones that need to be asked.  

You need to know – what is the new feature/ solution. Sometimes you get some information before Threat Modelling, for example name: ‘reporting service’ but you cannot just imagine how blurry and fuzzy, names can be, especially in the IT industry. Ask about what this product is all about – listen carefully and make notes. Underneath there is good starting point – overall application description: 

“Our solution is the plain application for pizza delivery staff. It’s the web-based, application with Angluar JS as frontend, Java on backend and PostgresSQL database. There is one type of the user: authenticated user will be able to change status of the pizza delivery. There are couple of the types of the delivery, everything will be stored in database, all actions will be logged in changelog. “ 

With that, we can start creating overview drawing of the product. It shouldn’t be too precise and everyone should agree that the diagram on the whiteboard is a good representation of an actual architecture design. Do not take shortcuts using already available drawings – it can be outdated or useless for the job. On the other hand, using hand-made designs made on-site can be first discussion between team members. 

I was using several different approaches to diagrams, but right now I am trying to keep it as simple as possible with DFD (Data Flow Diagram) – like most of the people, on first level. I’ve used to perform some Threat Modelling sessions using TAM Diagram (Technical Architecture Modelling Standard). These two are equally good in terms of accuracy, but DFD is clearer to non-technical users and widely spread in the technical part of society.  

|NOTE to Flows: What is not going to be covered by checklist: business flows. Of course, you can have point in your list ‘do we have good business flows that cannot be used in malicious way?’ but it’s not the point. Spend some time with the team and ask everyone how they recognize some of the flows that seem to be worrying you. Maybe these business features can be done with more secure manner.|
|-------------|

 So, let’s assume that we have to create application for pizza staff in DFD level 1 done with OWASP Threat Dragon tool. 

 ![alt text](https://github.com/schreddies/schreddies.github.io/raw/master/Screenshot%202020-03-04%20at%2022.04.21.png)

User (pizza delivery staff) can change pizza delivery status when authenticated - she/he is outside of the Trust Boundary (dashed line) - everything from there should be consider unsafe. Change (pizza) state process will take pizza state from list of possible options and save status to database and changelog. On the end will return status to the user. User is outside of the trust boundary – potentially dangerous component in diagram.  

Keeping your diagram simple and with that kind of detailing is essential and will keep possibility to return to this diagram in next TM iteration.  

Next thing, which should be result of the previous one – you need to create list of assets, users and systems that your product communicates with. This step helps you with better understanding of product in question and also this is a perfect starting point where you can get knowledge about assets technology. So, to our example library app, here we’ve got following assets list: 

* Assets: 

** Angular JS 1.5.8 

** Jquery 3.3.1 

** Nginx 1.10.3 

** Java 

** PostgreSQL 

* Actors: 

** User – every user that have access to application 

Trust Boundaries: 

 

Entry Points: 

We have overall knowledge about architecture, system components and actors that will be using application - now it is time for the “meat” of the Threat Modelling: asking and listening to the answers. Your task, as moderator is to ask open questions to create discussion between team members – that’s why you have them all. You need to remember that debate can end up with mutually exclusive thesis on how this software works, or should work. Use diagram, modify it accordingly during meeting if required. Architects, backend and frontend developers, business analysts and QAs can have very different point of view, and knowledge, how things were done and how something is done in the final product.  

Keep discussion focused on security but let them talk you through their concepts of the application and business cases. Sometimes using application business logic in malicious way is far more dangerous than another XSS. Your goal is to have lively discussion about product/ feature, about how something will be done, with what kind of technology, what kind of encryption will be there… and on and on. But when you see that this talk is not going anywhere – two sides trying to outshout others – it’s time to change area of interest and ask questions about things.  

Communicate threats – it’s great idea to talk through attendants about your and others security concerns. Be 100% sure that everyone in the room understand security threat – no one should leave TM with uncertainty about findings, it will be easier to everyone with attack vector ‘on the table’. Also rating of security threats should be done together: you need to decide how is likely to this issue to be exploited (and how hard is to exploit this issue. Of course, form perspective of the builders, main reason for that is to prioritize everything accordingly: we are going to fix lack of tenant separation in cloud application as soon as possible but threat of clickjacking may have lower priority (but “Defence-in-Depth" is a thing so proper headers are certainly something you should employ!). All threats should be written down during session – using Jira providing additional usability and transparency for the teams in the future, and also can be treated as database for threats and security issues. 

So, after around 2h you should end up with something like this: a list of couple of threats to your product or feature.  

Threat List: 

Unvalidated parameter from user input appended to SQL query - Possible SQL Injection 

Insufficient output encoding for username – possible XSS 

Outdated and vulnerable 3rd party components – lack of 3rd party components scanning or update the procedure 

Unauthenticated user can change delivery status – bypass Authentication on the endpoint 

Lack of brute force prevention mechanism on login page – weakness of authentication mechanism 

“Delivered” status do not block change possibility – business flaw 

 

## Remark: Think like... You! 

In many publications there is strong encouragement to 'Think like attacker'. It makes same sense as this: 

 ![alt text](https://github.com/schreddies/schreddies.github.io/raw/master/Screenshot%202020-03-04%20at%2022.04.21.png)

You are not Dolp… attacker, so there are little chances to think like one. Unless you have background as penetration tester, auditor or any other security professional, then you can employ some of the thinking ‘in attacker way’ that you already have in your mind and share it with the team.  

But Performing Threat Modelling, from perspective of ‘Builder’ give you the possibility of covering more topics and more precise solution to the problems. And knowledge about security can be added through checklist or questions to SEC Team.  

## Future 

Right now, I am working on opensource Threat Modelling list/ tool to make everything easier for the teams or start-ups. Or lone developers. Or Security professionals. Students. In the other words – everyone. Right now, main goal is to create database of threats that can be easily adjusted to your application. 

## Outro 

I hope that this post will help you in some points about security in your product. Threat Modelling is one of the major points in Security Development Lifecycle – it will give you big picture of your solution in terms of security and helps you to mitigate threats in early phases. Focusing on open questions and having lively discussion during meeting is the key for performing good Threat Modelling. You don’t need to be perfect at the first time with everything, you have privilege to work with application on daily basis. Having more iterations makes sense – perform it as often as you need… Or as often as people want to have meetings with you 🙂. 

 
