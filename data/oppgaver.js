// OPPGAVEBANKEN – innhold kan senere genereres fra regnearket.
// Hold spilllogikken i script.js adskilt fra selve oppgavene.

window.OPPGAVEBANK = {
  kategorier: [
    {
      id: "forsteOgSisteLyd",
      tittel: "Første og siste lyd",
      ikon: "👂",
      beskrivelse: "Lytt etter lyder i ord.",
      oppgaver: [
        {
          id: "FL01",
          variant: "første lyd",
          instruksjon: "Hvilken lyd hører du først i ordet?",
          stimulusTekst: "sol",
          stimulusBilde: "bilder/sol.png",
          stimulusLyd: { fil: "lyd/Sol.m4a", fallbackTekst: "sol" },
          svarformat: "bokstavvalg",
          alternativer: ["S", "M", "F", "L"],
          riktigSvar: "S"
        }
      ]
    },
    {
      id: "rim",
      tittel: "Rim",
      ikon: "🎵",
      beskrivelse: "Finn ord som rimer.",
      oppgaver: [
        {
          id: "RIM01",
          variant: "finn rimord",
          instruksjon: "Hvilket ord rimer med «mus»?",
          stimulusTekst: "mus",
          stimulusBilde: "bilder/mus.png",
          stimulusLyd: { fil: "lyd/Mus.m4a", fallbackTekst: "mus" },
          svarformat: "bildevalg",
          alternativer: [
            { tekst: "hus", bilde: "bilder/hus.png", lyd: { fil: "lyd/Hus.m4a", fallbackTekst: "hus" } },
            { tekst: "bil", bilde: "bilder/bil.png", lyd: { fil: "lyd/Bil.m4a", fallbackTekst: "bil" } },
            { tekst: "katt", bilde: "bilder/katt.png", lyd: { fil: "lyd/Katt.m4a", fallbackTekst: "katt" } },
            { tekst: "sol", bilde: "bilder/sol.png", lyd: { fil: "lyd/Sol.m4a", fallbackTekst: "sol" } }
          ],
          riktigSvar: "hus"
        }
      ]
    },
    {
      id: "stavelser",
      tittel: "Stavelser",
      ikon: "👏",
      beskrivelse: "Lytt og tell stavelser.",
      oppgaver: [
        {
          id: "ST01",
          variant: "tell stavelser",
          instruksjon: "Hvor mange stavelser hører du?",
          stimulusTekst: "banan",
          stimulusBilde: "bilder/banan.png",
          stimulusLyd: { fil: "lyd/Banan.m4a", fallbackTekst: "banan" },
          svarformat: "tallvalg",
          alternativer: ["1", "2", "3", "4"],
          riktigSvar: "2"
        }
      ]
    },
    {
      id: "settSammenLyder",
      tittel: "Sett sammen lyder",
      ikon: "🧩",
      beskrivelse: "Sett enkeltlyder sammen til ord.",
      oppgaver: [
        {
          id: "SYN01",
          variant: "fonemsyntese",
          instruksjon: "Hvilket ord blir dette?",
          stimulusTekst: "/s/ – /o/ – /l/",
          stimulusLyder: [
            { fil: "lyd/Fonem_s.m4a", etikett: "/s/" },
            { fil: "lyd/Fonem_o.m4a", etikett: "/o/" },
            { fil: "lyd/Fonem_l.m4a", etikett: "/l/" }
          ],
          svarformat: "bildevalg",
          alternativer: [
            { tekst: "sol", bilde: "bilder/sol.png", lyd: { fil: "lyd/Sol.m4a", fallbackTekst: "sol" } },
            { tekst: "mus", bilde: "bilder/mus.png", lyd: { fil: "lyd/Mus.m4a", fallbackTekst: "mus" } },
            { tekst: "bil", bilde: "bilder/bil.png", lyd: { fil: "lyd/Bil.m4a", fallbackTekst: "bil" } },
            { tekst: "hus", bilde: "bilder/hus.png", lyd: { fil: "lyd/Hus.m4a", fallbackTekst: "hus" } }
          ],
          riktigSvar: "sol"
        }
      ]
    },
    {
      id: "leggTilEllerTaBortLyd",
      tittel: "Legg til eller ta bort en lyd",
      ikon: "➕",
      beskrivelse: "Lek med lydene inni ord.",
      oppgaver: [
        {
          id: "MAN01",
          variant: "legg til lyd",
          instruksjon: "Si «ris». Legg til /g/ først. Hvilket ord får du?",
          stimulusTekst: "ris + /g/",
          stimulusLyder: [
            { fil: "lyd/Ris.m4a", etikett: "ris", fallbackTekst: "ris" },
            { fil: "lyd/Fonem_g.m4a", etikett: "/g/" }
          ],
          svarformat: "tekstvalg",
          alternativer: ["gris", "ris", "is", "gress"],
          riktigSvar: "gris",
          riktigLyd: { fil: "lyd/Gris.m4a", fallbackTekst: "gris" }
        }
      ]
    },
    {
      id: "byggOrdet",
      tittel: "Bygg ordet",
      ikon: "🔤",
      beskrivelse: "Sett bokstavene i riktig rekkefølge.",
      oppgaver: [
        {
          id: "BYGG01",
          variant: "bygg med bokstavbrikker",
          instruksjon: "Bygg ordet.",
          stimulusTekst: "mus",
          stimulusBilde: "bilder/mus.png",
          stimulusLyd: { fil: "lyd/Mus.m4a", fallbackTekst: "mus" },
          svarformat: "bygg_ord",
          bokstavbrikker: ["U", "S", "M", "L"],
          antallSvarfelt: 3,
          riktigSvar: "MUS"
        }
      ]
    },
    {
      id: "hvilkenSkalUt",
      tittel: "Hvilken skal ut?",
      ikon: "🔎",
      beskrivelse: "Finn den som skiller seg fra de andre.",
      oppgaver: [
        {
          id: "UT01",
          variant: "første lyd",
          instruksjon: "Hvilket ord begynner ikke med /p/?",
          stimulusTekst: "/p/",
          stimulusLyd: { fil: "lyd/Fonem_p.m4a" },
          svarformat: "bildevalg",
          alternativer: [
            { tekst: "pil", bilde: "bilder/pil.png", lyd: { fil: "lyd/Pil.m4a", fallbackTekst: "pil" } },
            { tekst: "pose", bilde: "bilder/pose.png", lyd: { fil: "lyd/Pose.m4a", fallbackTekst: "pose" } },
            { tekst: "panne", bilde: "bilder/panne.png", lyd: { fil: "lyd/Panne.m4a", fallbackTekst: "panne" } },
            { tekst: "sol", bilde: "bilder/sol.png", lyd: { fil: "lyd/Sol.m4a", fallbackTekst: "sol" } }
          ],
          riktigSvar: "sol"
        }
      ]
    },
    {
      id: "bokstavOgLyd",
      tittel: "Bokstav og lyd",
      ikon: "🔊",
      beskrivelse: "Koble lyd og bokstav.",
      oppgaver: [
        {
          id: "BL01",
          variant: "lyd til bokstav",
          instruksjon: "Hvilken bokstav passer til lyden?",
          stimulusTekst: "/f/",
          stimulusLyd: { fil: "lyd/Fonem_f.m4a" },
          svarformat: "bokstavvalg",
          alternativer: ["F", "S", "V", "M"],
          riktigSvar: "F"
        }
      ]
    }
  ]
};
