# Lek med språk og ord

Klasseprosjekt i norskdidaktikk i begynneropplæringen.

## Struktur

- `index.html` – selve nettsida
- `style.css` – design
- `script.js` – spillmekanikk
- `data/oppgaver.js` – oppgavebanken
- `bilder/` – bilder som oppgavene bruker
- `lyd/` – lydfiler

## Viktig prinsipp

Oppgaveinnholdet er skilt fra spillmekanikken. Nye studentoppgaver skal i hovedsak legges inn i `data/oppgaver.js` uten at `script.js` trenger å endres.

Regnearket som brukes i undervisningen er master for innholdet. Når nye oppgaver er ferdige, kan innholdet konverteres til strukturen i `data/oppgaver.js`.

## Filnavn

Nettsida bruker de faktiske filnavnene i GitHub, og store/små bokstaver må stemme. Eksempel:

- `bilder/mus.png`
- `lyd/Mus.m4a`
- `lyd/Fonem_p.m4a`

## Prototype

Prototypen inneholder én eksempeloppgave i hver av disse kategoriene:

1. Første og siste lyd
2. Rim
3. Stavelser
4. Sett sammen lyder
5. Legg til eller ta bort en lyd
6. Bygg ordet
7. Hvilken skal ut?
8. Bokstav og lyd

Når en kategori senere har flere oppgaver, velger spillet opptil 10 oppgaver i tilfeldig rekkefølge per runde.
