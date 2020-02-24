# Secure by default, unsafe by you

## Disclaimer
|This post is the presentation of how to make code **UNSAFE**. Please, do not use these code snippets in your application, unless you fancy to be called in the middle of the night by SOC team.|
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

## Intro
In this small repo/blog will show you how to make modern, secure JS Frameworks, unsafe. Using purely these frameworks, we are going to end up with XSS. Following examples might be useful during code review or making a new version of DVWA, it’s up to you.

## The Overview: Brave New World of JavaScript  
Using this marvellous blog post [Top JS Frameworks 2019](https://medium.com/javascript-scene/top-javascript-frameworks-and-topics-to-learn-in-2019-b4142f38df20) and followed by this awesome research [State of JS 2019](https://2019.stateofjs.com/front-end-frameworks/) it’s naturally that that I’ve did research on following ones: 

* The most popular, the king: The ReactJS; 
* The second popular, Ms/r. Big, the Angular;
* The third, Vue.js;
* I’ve also added Mithril, because why not.

I am planning do something similar to others also. So, as already everyone feels offended, we can go to interesting part. 

### ReactJS

```javascript
<div dangerouslySetInnerHTML={{__html: 'Not safe at all <img src =x onerror=alert(1)>'}} />
```

### Angular

### VueJS

### Mithril
