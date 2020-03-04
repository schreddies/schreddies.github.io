# Secure by default, unsafe by you

## Disclaimer
|This post is the presentation of how to make code **UNSAFE**. Please, do not use these code snippets in your application, unless you fancy to have a xss|
|Read that, for extra protection: https://owasp.org/www-community/xss-filter-evasion-cheatsheet|
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

## Intro
In this small repo/blog will show you how to make modern, secure JS Frameworks, unsafe. Using purely these frameworks, we are going to end up with XSS. Following examples might be useful during code review or making a new version of DVWA, it’s up to you. Yes, you can find all these informations in the docs, but let's be honest - RTFM is not for everyone. 


## The Overview: Brave New World of JavaScript  
Using this marvellous blog post [Top JS Frameworks 2019](https://medium.com/javascript-scene/top-javascript-frameworks-and-topics-to-learn-in-2019-b4142f38df20) and followed by this awesome research [State of JS 2019](https://2019.stateofjs.com/front-end-frameworks/) it’s naturally that that I’ve did research on following ones: 

* The most popular, the king: The ReactJS; 
* The third, mr. lightweight Vue.js;
* I’ve also added Mithril, because why not.

I am planning do something similar to others also. Stay tunned

### ReactJS

```javascript
<div dangerouslySetInnerHTML={{__html: 'Not safe at all <img src =x onerror=alert(1)>'}} />
```

### VueJS

```javascript
<a>Not great, not terrible{{constructor.constructor("alert('1')")() }}<a>
```
and many more

### Mithril

```javascript
m("div", [
    m.trust("<h1>Here's some <img src=x onerror=alert(1)></h1>")
])
```
