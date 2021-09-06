# Secure by incident and surprise 
## Story about wierd and totally unplanned countermeasurement for CSRF vulnerability that should not work
### What CSRF is
Let's begin with CSRF definition from owasp.org: 
> Cross-Site Request Forgery (CSRF) is an attack that forces an end user to execute unwanted actions on a web application in which they’re currently authenticated.

As this definition is clear, let's find out how the attack vector should looks like. First, victim needs be authenticated to application and enter malicious site. Underneath, mailicious app calls, through the browser, the application, where user is authenticated to. And this call change the state of the application ie. email change. And that's bad. The objective is to change 'something' rather than 'read data' - in that case, that would be more SOP exploitation. 
### What SOP is
The Same-Origin Policy (you guess, SOP), is browser mechanism that restricts how a document or script loaded by one origin can interact with a resource from another origin. Long story short, how one page can access data from other domains. Further reading: https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy

For us, the most important thing is: for simple request (without preflight request), POST there is only 3 values of `Content-Type` allowed:


### Random security feature
So request looks like this:
```
POST /new-product HTTP/2
Host: vulnerableapp.com
Cookie: <removed>
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:91.0) Gecko/20100101 Firefox/91.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Content-Type: application/json
Content-Length: 139
Origin: http://vulnerableapp.com
Referer: http://vulnerableapp.com

{"name":"csrf","size":"c","active":true}

```
No special contermeasurments for CSRF. And the response, `201 Created` as expected. But there is the problem, the SOP's 'simple request' is not accepting the `application/json` as the `Content-Type` value to other domain.  


```
POST /new-product HTTP/2
Host: vulnerableapp.com
Cookie: <removed>
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:91.0) Gecko/20100101 Firefox/91.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Content-Type: text/plain
Content-Length: 139
Origin: http://burpsuite
Referer: http://burpsuite/

{"name":"csrf","size":"c","active":true}

```
