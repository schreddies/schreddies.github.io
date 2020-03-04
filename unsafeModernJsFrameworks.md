# Secure by default, unsafe by you

## Disclaimer
|This post is the presentation of how to make code **UNSAFE**. Please, do not use these code snippets in your application, unless you fancy to have a XSS. Read that, for extra protection: https://owasp.org/www-community/xss-filter-evasion-cheatsheet|
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |


## Intro
In this small repo/blog will show you how to make modern, secure JS Frameworks, unsafe in nice way. Using purely these frameworks, we are going to end up with XSS. Following examples might be useful during code review or making a new version of DVWA, it’s up to you. Yes, you can find all these informations in the docs, but let's be honest - RTFM is not for everyone. 


## The Overview: Brave New World of JavaScript  
Using this marvellous blog post [Top JS Frameworks 2019](https://medium.com/javascript-scene/top-javascript-frameworks-and-topics-to-learn-in-2019-b4142f38df20) and followed by this awesome research [State of JS 2019](https://2019.stateofjs.com/front-end-frameworks/) it’s naturally that that I’ve did research on following ones: 

* The most popular, the king: The ReactJS; 
* The third, mr. lightweight Vue.js;
* I’ve also added Mithril, because why not.

I am planning do something similar to others also. Stay tunned

### ReactJS

Along with other possiblities of 'standard' XSS, this one using React DOM. Attribute called `dangerouslySetInnerHTML` can be used to set HTMLdirectly form REACT. `dangerously` part should suggest the user, that she/he doing something risky. In princple the DOM node will be updated with the object with key `_html`, the HTML. And yes, I've seen this in the wild, with data suppiled by user.

```javascript
<div dangerouslySetInnerHTML={{__html: 'Not safe at all <img src=x onerror=alert(1)>'}} />
```
[Documentation](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml)

### VueJS

Remember, the [Client side template injection with AnglarJS](https://portswigger.net/research/xss-without-html-client-side-template-injection-with-angularjs)? If not, go there. In Agluar 1.6, they removed whole sandbox thigh altogether, but last payload, from Sir Mario Heiderich ```{{constructor.constructor('alert(1)')()}}```. Elegant, isn't it? And right now, it works on VueJS because of template possibility and mixing clientside and serverside rendering [Great post with PoC on that](https://github.com/dotboris/vuejs-serverside-template-xss)


```javascript
<a>Not great, not terrible{{constructor.constructor('alert(1)')()}}<a>
```
[Documentation](https://vuejs.org/v2/guide/security.html)

### Mithril

Starting from the [middle](https://mithril.js.org/trust.html#avoid-trusting-html) the `m.trust` should be avoidalbe, but if not, it can be dangerous, especially with user supplied data. Especially unsanitized data. 

```javascript
m("div", [
    m.trust("<h1>Here's some <img src=x onerror=alert(1)></h1>")
])
```
[Documentation](https://mithril.js.org/trust.html)
