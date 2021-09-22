# Secure by incident and surprise 
## Story about weird and totally unplanned countermeasures for CSRF vulnerability that should not work
## Intro 1
To properly reheat your pizza: turn on stow on the middle option. After putting pizza on a hot skillet, heat it for a few minutes. Then, add some water drops around and put the lid on top and heat for a few more minutes. 
## Proper intro
Story of how I was stumbled, by a fairly simple non-vulnerable vulnerability. 
## What CSRF is
Let's begin with CSRF definition from owasp.org: 
> Cross-Site Request Forgery (CSRF) is an attack that forces an end user to execute unwanted actions on a web application in which they’re currently authenticated.

Successful attacks consist of a user entering a malicious site (phishing), while being authenticated to a vulnerable application, which is without CSRF countermeasures (no token based mitigation: random value sent through hidden fields or headers). Underneath, malicious app calls, through the browser, using browsers’ automatic cookie sending, to the application in question. And this request, changes the state of the application ie. email change, or transfer funds. Or creates new users to internal system.
## What SOP and CORS is
The Same-Origin Policy, known as SOP, is a browser mechanism that restricts how a document or script loaded by one origin can interact with a resource from another origin. Long story short, how one page can access data from other domains. Further reading: https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy

CORS - is a mechanism, based on http headers, which allows the server to specify which domains, other than origin, should be allowed to load resources from apps. As the CORS is not simple, and many misunderstandings and misconfigurations were done over the years (even on apps that 'should know better'), it's good to get this knowledge!
Further reading: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

From this modest introduction, the question which is probably on your mind: `Why SOP and CORS, in CSRF of POST request`? Let me explain.

## Things get serious, exploitation time
Request to, CSRF suspected, endpoint looks like this:
```diff
# POST /new-product HTTP/2
# Host: vulnerableapp.com
# Cookie: <removed>
# User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:91.0) Gecko/20100101 Firefox/91.0
# Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
# Accept-Language: en-US,en;q=0.5
# Accept-Encoding: gzip, deflate
# Content-Type: application/json
# Content-Length: 139
# Origin: http://vulnerableapp.com
# Referer: http://vulnerableapp.com/auth
# 
# {"name":"csrf","size":"c","active":true}
```
No special countermeasures for CSRF. And the response, `201 Created` as expected. 

### First attempt 
CORS simple request (without preflight request) and POST request is allowed with three values of `Content-Type`:
* application/x-www-form-urlencoded, 
* multipart/form-data, 
* text/plain
Any other value for this header, made by browser from page A to page B, will be preceded by 'preflight' CORS request - `OPTIONS` method with `Access-Control-Request-Method` and `Access-Control-Request-Headers` headers.

Trying the same request but with SOPs' allowed `Content-Type`, i.e. we can use `text/plain` MIME type, in that case, we need to add the `=` character to trick app to use equals sign as valid json.
```diff
# POST /new-product HTTP/2
# Host: vulnerableapp.com
# Cookie: <removed>
# User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:91.0) Gecko/20100101 Firefox/91.0
# Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
# Accept-Language: en-US,en;q=0.5
# Accept-Encoding: gzip, deflate
# Content-Type: text/plain
# Content-Length: 139
# Origin: http://vulnerableapp.com
# Referer: http://vulnerableapp.com
# 
# {"name":"csrf","size":"c","active":true,
+"trick=":"here"}
```
Unfortunately, no success - 500 error. From now on, it was clear that it won't be easy- the application is responding 500 error everytime when, even slight, there is change in request. 

### Second
Another option is to use XHR and 'go with the flow' of CORS. Set the header `Content-Type` with `xhr.setRequestHeader` to `application/json` and send the payload as it is. The only prerequisites are following response headers: 
```diff
# Access-Control-Allow-Origin: https://www.attacker.com
# Access-Control-Allow-Credentials: true 
```
No luck here. CORS are wide open with `Access-Control-Allow-Origin: *`, which mean, that is no `Access-Control-Allow-Credentials` header and, no credentials would be send to vulnerable page by browser. And, as a result, no CSRF.

### Third: last but least 
> If it looks stupid but works, it isn't stupid
However it won't. But it's worth mentioning that the CORS standard allows browser, send requests with multiple values of the `Content-Type` header. And it is against the RFC2616 14.17 (HTTP 1.1). If the server would check only if the value of headers contains `application/json` that would be a victory. You should try it.

## I LOST. Badly 
It should have been a walk in the park, but it wasn't. I was defeated by multiple standards and vulnerable applications and I cannot even complain, that's impressive. If you have any ideas, how to bypass it (and help with my sleepless nights becuase of this problem), please answer here: https://security.stackexchange.com/questions/254895/secure-against-csrf-by-accident

