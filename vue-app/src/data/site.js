export const author = "Dhenz Mark A. Alden";

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/analyses", label: "Analyses" },
  { to: "/masterpiece", label: "Masterpiece" },
  { to: "/learning", label: "Learning" },
  { to: "/reflection", label: "Reflection" },
  { to: "/profile", label: "Profile" },
];

export const heroSlides = [
  { src: "assets/img/homer-bust.webp", alt: "Marble bust of Homer, the poet of the Iliad and the Odyssey", caption: "Bust of Homer, Roman copy. The British Museum." },
  { src: "assets/img/iliad-ivanov-priam.jpg", alt: "King Priam kneeling to kiss the hand of Achilles", caption: "Alexander Ivanov, Priam and Achilles, 1824." },
  { src: "assets/img/job-blake-watercolor.jpg", alt: "God appearing in a whirlwind above the kneeling Job", caption: "William Blake, Job and the whirlwind, c. 1805." },
  { src: "assets/img/roland-michallon.jpg", alt: "A dark mountain pass where the dying Roland lies", caption: "Achille-Etna Michallon, the death of Roland, c. 1820." },
];

/* One of these is shown each day on the home page */
export const paintingsOfTheDay = [
  { src: "assets/img/odyssey-waterhouse-sirens.jpg", title: "Ulysses and the Sirens", by: "John William Waterhouse, 1891", to: "/analyses#odyssey", alt: "Odysseus tied to the mast as Sirens circle his ship" },
  { src: "assets/img/job-blake-watercolor.jpg", title: "The Lord Answering Job out of the Whirlwind", by: "William Blake, c. 1805", to: "/analyses#job", alt: "God in a whirlwind above the kneeling Job" },
  { src: "assets/img/panchatantra-lion-bull.jpg", title: "The Lion Devours the Bull", by: "Kalila wa Dimna, Herat, 1430", to: "/analyses#panchatantra", alt: "A lion attacking a bull while two jackals watch" },
  { src: "assets/img/ramayana-ravi-varma-jatayu.jpg", title: "Ravana Cutting the Wing of Jatayu", by: "Raja Ravi Varma, c. 1895", to: "/analyses#ramayana", alt: "Ravana fighting the great bird Jatayu" },
  { src: "assets/img/mahabharata-razmnama.jpg", title: "Ashvatthama Fires the Narayana Weapon", by: "Razmnama folio, c. 1616", to: "/analyses#mahabharata", alt: "A river of fire sweeping over a battlefield" },
  { src: "assets/img/iliad-david-andromache.jpg", title: "Andromache Mourning Hector", by: "Jacques-Louis David, 1783", to: "/analyses#iliad", alt: "Andromache grieving beside the body of Hector" },
  { src: "assets/img/roland-fouquet.jpg", title: "The Death of Roland", by: "Jean Fouquet, c. 1455", to: "/analyses#roland", alt: "Roland dying on a hill among fallen knights" },
];

/* Explore the timeline, oldest to youngest */
export const eras = [
  { tab: "Iliad", name: "The Iliad", date: "c. 750 BCE", ago: "8th century BCE, about 2,750 years ago", text: "Homer’s poem of the rage of Achilles in the last year of the Trojan War. It is one of the oldest works of Western literature, first performed from memory by singers long before it was written down.", to: "/analyses#iliad", thumb: "assets/img/iliad-matsch-triumph.jpg" },
  { tab: "Odyssey", name: "The Odyssey", date: "c. 725 BCE", ago: "Late 8th century BCE, about 2,750 years ago", text: "Odysseus spends ten years trying to get home from Troy while his wife and son hold their household together. Its name gave us the word for any long and difficult journey.", to: "/analyses#odyssey", thumb: "assets/img/odyssey-waterhouse-sirens.jpg" },
  { tab: "Job", name: "Voice out of the Whirlwind", date: "600–300 BCE", ago: "6th to 4th century BCE, about 2,500 years ago", text: "An unknown Hebrew poet asks why the innocent suffer. God answers Job from a storm, not with reasons but with the whole of creation.", to: "/analyses#job", thumb: "assets/img/job-blake-engraving.jpg" },
  { tab: "Ramayana", name: "The Ramayana", date: "500 BCE – 100 CE", ago: "Composed over about 600 years", text: "Valmiki’s epic of Prince Rama, who keeps his father’s word through fourteen years of exile. It lives on across Asia, including the Maranao Maharadia Lawana.", to: "/analyses#ramayana", thumb: "assets/img/ramayana-ravi-varma-jatayu.jpg" },
  { tab: "Mahabharata", name: "The Mahabharata", date: "400 BCE – 400 CE", ago: "Grew over about 800 years of retelling", text: "The great war of the Pandavas and Kauravas grew over eight centuries of retelling. At its heart is the Bhagavad Gita, Krishna’s teaching on duty.", to: "/analyses#mahabharata", thumb: "assets/img/mahabharata-razmnama.jpg" },
  { tab: "Panchatantra", name: "The Panchatantra", date: "200 BCE – 300 CE", ago: "Collected over about 500 years", text: "Animal fables of practical wisdom, framed as lessons for three princes. Translated into Persian and Arabic, they travelled the world as Kalila wa Dimna.", to: "/analyses#panchatantra", thumb: "assets/img/panchatantra-tortoise-monkey.jpg" },
  { tab: "Roland", name: "The Song of Roland", date: "c. 1100 CE", ago: "About 900 years ago, the youngest of the seven", text: "The oldest major work of French literature turns a small defeat in 778 into a story of loyalty and betrayal. Its legend later inspired the Filipino moro-moro.", to: "/analyses#roland", thumb: "assets/img/roland-chroniques.jpg" },
];
