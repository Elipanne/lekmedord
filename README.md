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

Prototypen inneholder disse seks kategoriene:

1. Lyd og bokstav
2. Rim
3. Stavelser
4. Sett sammen lyder
5. Bygg ordet
6. Hvilken skal ut?

Kategorien **Lyd og bokstav** inneholder flere varianter, blant annet første/siste lyd, om et ord inneholder en lyd, og kobling mellom fonem og grafem.

Når en kategori senere har flere oppgaver, velger spillet opptil 10 oppgaver i tilfeldig rekkefølge per runde.
