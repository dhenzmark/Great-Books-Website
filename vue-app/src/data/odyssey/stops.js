/*
  The wanderings of Odysseus, in the order they happen (Books 9–12 are told in flashback).
  Homer's geography is legendary; each stop sits where ancient or later tradition places it.
  `via` are sea waypoints from the previous stop, so the route stays on water.
  `ships` is how many ships Odysseus still has when he reaches the stop.
*/
const img = (name) => `assets/img/${name}`;

export default [
  {
    id: "troy", name: "Troy", place: "Hisarlik, Turkey", lat: 39.96, lon: 26.16, book: "Book 9", ships: 12,
    title: "The voyage begins",
    text: "After ten years of war, Troy has fallen. Odysseus, king of Ithaca, sets sail for home with twelve ships. The journey should take a few weeks. It will take ten years.",
    image: img("iliad-matsch-triumph.jpg"), credit: "Franz von Matsch, The Triumph of Achilles, 1892",
  },
  {
    id: "cicones", name: "Ismarus", place: "Land of the Cicones, Thrace", lat: 40.87, lon: 25.5, book: "Book 9", ships: 12,
    via: [[40.3, 26.0]],
    title: "The raid on the Cicones",
    text: "His men sack Ismarus, a city of Troy’s allies, and stay too long feasting on the beach. The Cicones return with reinforcements at dawn and kill six men from every ship.",
    image: img("odyssey-cicones.jpg"), credit: "Theodoor van Thulden, after Primaticcio, c. 1633. Rijksmuseum",
  },
  {
    id: "malea", name: "Cape Malea", place: "Southern tip of Greece", lat: 36.44, lon: 23.2, book: "Book 9", ships: 12,
    via: [[39.6, 24.85], [38.6, 24.9], [38.02, 24.62], [37.3, 24.05], [36.5, 23.42]],
    title: "Blown off the map",
    text: "Rounding the last cape before home, the fleet is caught by a north wind and driven for nine days across the open sea, out of the known world and into the realm of monsters.",
  },
  {
    id: "lotus", name: "Lotus-Eaters", place: "Traditionally Djerba, Tunisia", lat: 33.86, lon: 10.95, book: "Book 9", ships: 12,
    via: [[36.0, 21.0], [35.0, 15.5]],
    title: "The flower of forgetting",
    text: "The scouts he sends ashore eat the honey-sweet lotus and lose all wish to go home. Odysseus drags them back to the ships in tears and ties them under the rowing benches.",
  },
  {
    id: "cyclops", name: "Cyclops", place: "Traditionally Sicily, near Mount Etna", lat: 37.56, lon: 15.17, book: "Book 9", ships: 12,
    via: [[35.2, 13.0], [36.55, 15.2], [37.1, 15.32]],
    title: "Nobody",
    text: "Trapped in the cave of Polyphemus, a one-eyed son of Poseidon who eats six of his men, Odysseus tells the giant his name is “Nobody,” blinds him and escapes under the bellies of the sheep. His boast as he sails away brings down Poseidon’s anger.",
    image: img("hero-turner-polyphemus.jpg"), credit: "J. M. W. Turner, Ulysses Deriding Polyphemus, 1829. National Gallery, London",
  },
  {
    id: "aeolus", name: "Aeolus", place: "Traditionally the Aeolian Islands", lat: 38.47, lon: 14.95, book: "Book 10", ships: 12,
    via: [[38.1, 15.55], [38.28, 15.62], [38.45, 15.25]],
    title: "The bag of winds",
    text: "The keeper of the winds ties every storm wind into a leather bag and sends Odysseus home on a gentle breeze. Within sight of Ithaca, while he sleeps, his crew opens the bag hoping for gold, and the winds blow them all the way back.",
    image: img("odyssey-aeolus.jpg"), credit: "Odysseus’s companions open the bag of winds, Dutch drawing, c. 1631–35. Rijksmuseum",
  },
  {
    id: "laestrygonians", name: "Laestrygonians", place: "Placed by ancient writers near Formia, Italy", lat: 41.24, lon: 13.6, book: "Book 10", ships: 1,
    via: [[39.4, 14.3], [40.3, 13.55], [41.0, 13.5]],
    title: "Eleven ships lost",
    text: "The fleet anchors in a calm, narrow harbor. The giant Laestrygonians hurl boulders from the cliffs and spear the sailors like fish. Only Odysseus’s own ship, moored outside, escapes.",
  },
  {
    id: "circe", name: "Circe", place: "Aeaea, traditionally Monte Circeo, Italy", lat: 41.22, lon: 13.06, book: "Book 10", ships: 1,
    title: "The enchantress",
    text: "Circe turns his scouts into pigs. Protected by the herb moly from Hermes, Odysseus resists her magic, forces her to free his men, and stays on her island for a year.",
    image: img("odyssey-circe.jpg"), credit: "John William Waterhouse, Circe Offering the Cup to Ulysses, 1891. Gallery Oldham",
  },
  {
    id: "underworld", name: "The Underworld", place: "Later placed at Lake Avernus, near Cumae", lat: 40.84, lon: 14.05, book: "Book 11", ships: 1,
    via: [[40.95, 13.4]],
    title: "Among the dead",
    text: "He sails to the edge of the world to ask the prophet Tiresias how to get home. Among the ghosts he meets his own mother, who died of grief waiting for him, and Achilles, who would rather be a living servant than king of the dead.",
    image: img("odyssey-tiresias.jpg"), credit: "Henry Fuseli, Tiresias Appears to Ulysses, 1780–85. Albertina, Vienna",
  },
  {
    id: "sirens", name: "The Sirens", place: "Traditionally Li Galli islands, Amalfi coast", lat: 40.58, lon: 14.43, book: "Book 12", ships: 1,
    via: [[40.95, 13.4], [41.18, 13.02], [40.65, 13.75], [40.5, 14.2]],
    title: "The song",
    text: "After returning to Circe to bury his companion Elpenor, he sails past the Sirens. His crew plug their ears with wax and tie him to the mast, so he alone hears the song that has drawn so many sailors to their deaths.",
    image: img("odyssey-waterhouse-sirens.jpg"), credit: "John William Waterhouse, Ulysses and the Sirens, 1891. National Gallery of Victoria",
  },
  {
    id: "scylla", name: "Scylla & Charybdis", place: "Traditionally the Strait of Messina", lat: 38.25, lon: 15.63, book: "Book 12", ships: 1,
    via: [[40.2, 14.6], [39.4, 15.55], [38.7, 15.55]],
    title: "Between two monsters",
    text: "On one side lies the whirlpool Charybdis, on the other the six-headed Scylla. Steering away from the whirlpool, he loses six men, snatched from the deck by Scylla’s heads.",
    image: img("odyssey-scylla.jpg"), credit: "Odysseus Between Scylla and Charybdis, engraving after Henry Fuseli, 1806. British Museum",
  },
  {
    id: "thrinacia", name: "Thrinacia", place: "The island of the Sun, traditionally Sicily", lat: 37.87, lon: 15.33, book: "Book 12", ships: 0,
    via: [[38.05, 15.52]],
    title: "The cattle of the Sun",
    text: "Stranded by contrary winds and starving, his crew kill the sacred cattle of the sun god Helios while he sleeps. At sea again, Zeus destroys the ship with a thunderbolt. Every man drowns except Odysseus.",
  },
  {
    id: "ogygia", name: "Calypso", place: "Ogygia, traditionally Gozo, Malta", lat: 36.07, lon: 14.25, book: "Books 5 and 12", ships: 0,
    via: [[38.2, 15.6], [37.4, 15.35], [36.6, 15.2], [36.2, 14.6]],
    title: "Seven years",
    text: "Clinging to the wreckage, he drifts back past Charybdis and washes up nine days later on the island of the nymph Calypso. She keeps him for seven years and offers to make him immortal. Each day he sits on the shore and weeps for home.",
    image: img("odyssey-calypso.jpg"), credit: "Arnold Böcklin, Odysseus and Calypso, 1883. Kunstmuseum Basel",
  },
  {
    id: "scheria", name: "Phaeacians", place: "Scheria, traditionally Corfu", lat: 39.62, lon: 19.86, book: "Books 6–13", ships: 0,
    via: [[37.2, 17.0], [38.9, 19.2]],
    title: "Washed ashore",
    text: "Released at last, he builds a raft, and Poseidon wrecks it. The princess Nausicaa finds him on the beach. At her father’s court he finally tells the story of his wanderings, and the Phaeacians carry him home in a single night.",
    image: img("odyssey-nausicaa.jpg"), credit: "Pieter Lastman, Odysseus and Nausicaa, 1619. Alte Pinakothek, Munich",
  },
  {
    id: "ithaca", name: "Ithaca", place: "Home", lat: 38.37, lon: 20.67, book: "Books 13–24", ships: 0,
    via: [[39.3, 19.95], [38.75, 20.45]],
    title: "Home",
    text: "Twenty years after leaving, he lands in disguise as a beggar. He strings his great bow, defeats the suitors with his son Telemachus, and is reunited with Penelope, who tests him one last time with the secret of their bed.",
    image: img("odyssey-penelope.jpg"), credit: "Francesco Primaticcio, Ulysses and Penelope, c. 1563. Toledo Museum of Art",
  },
];
