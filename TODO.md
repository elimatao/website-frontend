# TODO
## Content
- [x] Add github and youtube links to the contact thing.
- [x] !!Lösung für E-Mail in Kontakt, Rechtlich und Datenschutz finden
- [x] !!Games section
- [x] !Update at least the index.html site
- [x] !Add an image to the "about me" page.

## API
- [ ] Use more GET requests for better linking <-- How can I do better linking if the URL is not from the server? --> Hacky javascript workaround. Fucking nightmare.

## Structure
- [ ] Breakdown and refactor script.js
- [ ] Sollte cs/list eigentlich cs/taxonomy sein?
- [ ] Make the news viewable as single page?
- [x] header vereinen
- [x] Aboutheader und indexheader vereinen
- [x] Karten vereinen

## General
- [ ] !fix missing https
- [ ] Endgültige Lösung für *Bilder* finden (in-text) -> Abhängig von aspect ratio.
- [ ] Update Bootstrap?
- [x] !OK lösung für Bilder in Text
- [x] Linking noch einmal überprüfen :(

## Performance
- [ ] paginate starting at a certain number of items in /cs/list.html and /index.html
- [ ] kleine Bilder auf cs/list.html (width=350 - 400 px)
- [x] Icon für Navigation verändern

## Visual
- [x] ! music: add a "please wait..." message while the api is starting
- [x] ! music: remove "undefined" for incomplete data
- [ ] ! cs/single.html: improve the imgHeader (avoid repetitions of images)
- [ ] Make the language selector prettier
- [ ] Enhance edge case of Card with no image

- [x] Music view selector
- [ ] Implement a page-wide view selector (with the ability to switch between cards, rows or something else)
## Multilingual
- [ ] Find a way to automate the translation_key extraction (like flask-babel)
- [x] !!Fully translate the missing content (done) + strings
- [x] !Always show untranslated content
- [x] Make section links multilingual as soon as available (Seems to be fixed)

## Security
- [ ] Use a CAPTCHA before showing the email.

## Misc
- [ ] Use JS fetch()
- [ ] More elegant solution for the iframes in /music (Using bootstrap ratio class)
- [ ] Get rid of the download button? --> Maybe add more buttons linking towards the repo, docs, etc.
- [x] cs/single verbessern (aside nur manchmal)
