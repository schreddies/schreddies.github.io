During my daily tasks, I am working with some well known solution for SAST testing. It's well thought solution, with great 'user base' and amazing features, and one of them is the automated fixing of the vulnerabilites. The idea is, when vulnerable part of the code was found, the fix could be applied, and the vulnerability no longer exsist in the code. As the feature is great, bu there are some problems, connected, mainly, to the writing generic fixes (for board vulnerability patterns). 
That got me thinking, maybe there is already some solution, that might operate on the streams. Without further due, there is: `sed` 
Qoute: 
> sed is a stream editor. A stream editor is used to perform basic text transformations on an input stream (a file or input from a pipeline). While in some > ways similar to an editor which permits scripted edits (such as ed), sed works by making only one pass over the input(s), and is consequently more 
> efficient. But it is sed’s ability to filter text in a pipeline which particularly distinguishes it from other types of editors.

We do have simeple `test.sh` file:
```
curl http://internal.eks-asdf.zooz.co/asdf
curl https://internal.eks-asdf.zooz.co/asdf
```
Let's start with some simple cases:
```
sed 's+http://+https://+g' test.sh
```


```sed '/sys.exit/! s+exit+sys.exit+g' sys_exit.py```
