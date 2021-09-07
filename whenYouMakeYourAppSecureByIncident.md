# Secure by incident and surprise 
## Story about wierd and totally unplanned countermeasurement for CSRF vulnerability that should not work
### What CSRF is
Let's begin with CSRF definition from owasp.org: 
> Cross-Site Request Forgery (CSRF) is an attack that forces an end user to execute unwanted actions on a web application in which they’re currently authenticated.

As this definition is clear, let's find out how the attack vector should looks like. First, victim needs be authenticated to application and enter malicious site, probably with some kind of phishing. Underneath, mailicious app calls, through the browser, the application, to wqhich, user is authenticated. And this request, changes the state of the application ie. email change, or transfer funds. Or creates new users to internal system. Or many other options.
### What SOP and CORS is
The Same-Origin Policy, known as SOP (yes, security guys loves acronyms), is browser mechanism that restricts how a document or script loaded by one origin can interact with a resource from another origin. Long story short, how one page can access data from other domains. Further reading: https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy

CORS - is mechnism, based on http headers, which allow server to specify which domains, other then origin should be allowed to load resources from apps. As the CORS is not simple, and many misunderstanding and misconfgurations were done during years (even on apps that 'should know better'), it's good get this knowledge!
Further reading: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS


### Random security feature
From this vast introduction, the most important thing is: CORS, simple request (without preflight request), POST there is only 3 values of `Content-Type` allowed:
* application/x-www-form-urlencoded, 
* multipart/form-data, 
* text/plain

Other requests, made by browser from page A to page B will be preceded by 'pre-flight' CROS request - `OPTIONS` method with `Access-Control-Request-Method` and `Access-Control-Request-Headers` headers 

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
