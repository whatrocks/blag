# blag

charlie's web syte

## run local

syte serve

## nice commands

Add missing `/img/` to markdown images for a single page

```bash
sed 's/!\[\(.*\)](/![\1](\/img\//g' afternoon-with-arduino.md
```

Same thing, but for all md files:

```bash
sed -i -- 's/!\[\(.*\)](/![\1](\/img\//g' *.md
```
