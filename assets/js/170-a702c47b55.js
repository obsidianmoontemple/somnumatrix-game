/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var AC_KEY = "The Somnucor Academy of the Arcane";
cityWorkplace({ key: AC_KEY, ring: "temples", arch: "wizardschool", s: 0.62, jobs: [1730, 1731, 1732, 1733, 1734, 1735, 1736, 1737, 1738, 1739, 1740, 1741, 1742, 1743, 1744], fit: [],
note: "The castle where every power and magic is taught. Lessons are free and open to everyone." });
cityMore("xac", function (C) {
cityFrontage(C, AC_KEY, 565, 3) || cityFrontage(C, AC_KEY, 430, 6) || cityFrontage(C, AC_KEY, 565, 6, [-1]) || cityFrontage(C, AC_KEY, 880, 2);
});
var AC_LORE = {
"flying": ["Flight", ["Every bird flies by pushing air down: a wing is curved so the air over it moves faster and presses less, and the air beneath lifts.", "A dreamer's flight is the same idea, but the wing is your will: you push the dream down, and it pushes you up.", "Lean to turn, stretch out to go faster, and look where you want to land before you come down."],
["What lifts a bird's wing?", "The air beneath pressing harder than the air above", "The bird's feathers being lighter than air", "The wind always blowing upwards"]],
"floating": ["Flight", ["Floating is flight's gentle cousin: you do not go anywhere, you simply stop falling.", "A hot-air balloon floats because warm air is lighter than the cold air around it. Imagine yourself filled with that warmth.", "Breathe out slowly, let your feet leave the floor, and drift. To come down, breathe in and feel heavy."],
["Why does a hot-air balloon float?", "Warm air inside is lighter than the cold air around it", "The balloon is full of feathers", "The basket pushes against the ground"]],
"riding enchanted things": ["Flight", ["The broom, the carpet, the sleigh and the fire chariot all fly, but only for a rider who knows how to ask them.", "Balance lives in your inner ear: three tiny loops of fluid tell your brain which way is up. On a broom, trust them.", "Sit square, grip lightly, and lean the way you mean to go. Rise and fall as you would in flight."],
["What tells your body which way is up?", "Fluid in the loops of your inner ear", "Your eyelashes", "The soles of your shoes"]],
"passing through walls": ["Passage", ["In the tiny world of atoms, a particle can sometimes cross a wall it should not be able to cross. Physicists call it quantum tunnelling.", "In a dream, every wall is made of the same stuff as you are. Soften it with your attention, and step.", "Walk at the wall without slowing. Hesitate, and it becomes solid again. In the city, the Dragon Corp keeps the walls solid for everyone."],
["What do physicists call a particle crossing a barrier it should not?", "Quantum tunnelling", "Wall-walking", "Magnetism"]],
"moving without walking": ["Passage", ["Light from the Sun takes about eight minutes to reach the Earth. In a dream, you can be quicker than that.", "Look at the place you want to be. Picture yourself already standing there, the ground under your feet.", "Blink. When your eyes open, you are where you were looking."],
["How long does sunlight take to reach the Earth?", "About eight minutes", "About eight seconds", "About eight days"]],
"becoming unseen": ["Veils", ["The octopus can vanish in plain sight: cells in its skin change colour and texture to match the rocks behind it.", "The veil works the same way. You do not disappear: you become the same as everything around you.", "Stand still, breathe, and feel the room's colours settle over you. The figures of the dream stop turning to watch."],
["How does an octopus hide in plain sight?", "Its skin changes colour and texture to match what is behind it", "It holds its breath", "It moves faster than eyes can see"]],
"seeing what was hidden": ["Veils", ["A pit viper can see warmth: pits on its face sense the heat of living things, even in the dark.", "The true sight is like that. Living things glow through walls, and what was hidden shows its real shape.", "Open your eyes wider than eyes can open. Look past things, not at them."],
["How does a pit viper find its prey in the dark?", "It senses their body heat", "It hears their thoughts", "It smells the moonlight"]],
"changing shape": ["Transfiguration", ["A caterpillar dissolves almost completely inside its chrysalis and rebuilds itself as a butterfly. Nature changes shape all the time.", "To take another form, hold its picture clearly: the elf, the fairy, the giant, the dragon. Then let your own shape go.", "Always remember the way back. Picture yourself, exactly as you are, and you return."],
["What happens inside a chrysalis?", "The caterpillar rebuilds itself into a butterfly", "The caterpillar sleeps for a year", "The caterpillar grows a shell"]],
"changing size": ["Transfiguration", ["If you doubled in size, your weight would grow eight times but your bones only four times stronger. That is why giants in real life would struggle to stand.", "In a dream the rules bend: grow tall to see over the city, shrink small to slip through a keyhole.", "Change size in steps: giant, then small, then yourself again."],
["If you doubled in size, how much heavier would you be?", "Eight times", "Twice", "Four times"]],
"summoning": ["Conjuration", ["Every circle has a centre and every summoning has one too: the clear picture of what you are calling.", "Draw the circle, name what you want, and call it gently. A summoning shouted brings something shouting.", "Always send home what you summoned when you are done with it."],
["What must you do when a summoning is finished?", "Send home what you summoned", "Keep it in a jar", "Summon something bigger"]],
"fire-casting": ["Duelling", ["Fire needs three things: heat, fuel and the oxygen in the air. Take away any one, and it goes out. That is the fire triangle.", "The wand gathers heat at its tip. Aim it as you would point a finger, and let go.", "Never cast fire in a library, at a person, or near anything you would miss."],
["What are the three sides of the fire triangle?", "Heat, fuel and oxygen", "Wood, wind and water", "Sparks, smoke and ash"]],
"storm-casting": ["Duelling", ["Lightning is static electricity on a giant scale: ice and water in a storm cloud rub together until the charge leaps to the ground.", "The staff gathers charge the way a cloud does. Hold it high, feel it prickle, and point.", "Count the seconds between a flash and the thunder and divide by three: that is how many kilometres away the storm is."],
["What makes lightning?", "Charge built up in storm clouds leaping to the ground", "Hot air rising from volcanoes", "Stars falling into the sea"]],
"frost-casting": ["Duelling", ["Pure water freezes at zero degrees Celsius, but salty water needs it colder. That is why roads are salted in winter.", "The staff of frost draws the warmth out of the air in front of it. Breathe out slowly as you cast.", "Frost is a shield as much as a weapon: a wall of ice stops a charging thing."],
["Why do people salt icy roads?", "Salty water needs to be colder to freeze", "Salt makes the ice slippery", "Salt melts snow by heating it"]],
"light-casting": ["Duelling", ["Fireflies make their own light, cold light, from a chemical reaction in their bodies. It is called bioluminescence.", "The orb holds light the way a firefly does. Hold it close to your heart, then let it shine out.", "Light-casting heals as well as dazzles: where it lands, hurt is eased."],
["What is it called when a living thing makes its own light?", "Bioluminescence", "Photosynthesis", "Reflection"]],
"healing": ["Healing", ["When you cut yourself, your blood clots within minutes, and new skin starts growing in from the edges in a day or two.", "Healing magic does not do anything the body cannot: it hurries it along, with warmth and light.", "Lay your hands near the hurt, breathe slowly, and picture the edges closing."],
["What is the first thing the body does to heal a cut?", "The blood clots", "The bone grows", "The skin turns blue"]],
"speaking with the dead": ["the Crypt", ["Every culture on Earth remembers its dead: lanterns floated on rivers, candles in windows, names read aloud, songs.", "Here in the Crypt of Voices, a spirit comes when it is remembered kindly and asked gently.", "Listen more than you speak. Thank them, and let them rest again."],
["How should a spirit be asked to speak?", "Gently, and remembered kindly", "Loudly, so it hears", "With a bell rung three times"]],
"breathing underwater": ["Waters", ["Fish breathe with gills: thin feathery folds that take the oxygen dissolved in water, the way our lungs take it from air.", "To breathe underwater in a dream, believe the water is air. Your first breath is the hardest.", "Go down slowly, and come up slowly: divers in the real world rise slowly too, so their bodies can adjust."],
["How do fish breathe?", "Gills take oxygen dissolved in the water", "They hold their breath for hours", "They swim to the surface every minute"]],
"walking on water": ["Waters", ["The water strider insect walks on ponds: water's surface acts like a thin stretched skin. That is surface tension.", "For a dreamer the skin is stronger. Step lightly, and the water holds you up, rippling at your feet.", "Do not stop to look down too long."],
["How does a water strider walk on water?", "Surface tension makes the water act like a stretched skin", "It is too fast to sink", "It has tiny boats on its feet"]],
"stopping time": ["Time", ["Einstein showed that time is not the same everywhere: clocks run very slightly slower the faster you move, and closer to heavy things.", "To stop time in a dream, hold perfectly still inside, and the world holds still with you.", "The stillness lasts about ten heartbeats of the dream. Use them well."],
["What did Einstein discover about time?", "It runs differently depending on speed and gravity", "It only moves at night", "It can be stored in a bottle"]],
"knowing it was a dream": ["Dreaming", ["Most vivid dreams happen in REM sleep, when the eyes dart about under the lids. About a quarter of each night is REM.", "Lucid dreamers use reality checks: count your fingers, read a line twice, look at a clock and look again. In a dream, they change.", "When you know you are dreaming, the dream turns vivid. Stay calm, or you will wake up."],
["Which is a good reality check?", "Counting your fingers", "Jumping up and down", "Shouting your name"]],
"changing the dream": ["Dreaming", ["Dream incubation is old: people in ancient Egypt and Greece slept in temples hoping to dream an answer.", "Once you know you are dreaming, look at a thing and decide it is something else. Expect it, and it changes.", "Change small things first: a cup, a door, the colour of the sky."],
["What is dream incubation?", "Going to sleep hoping to dream about something chosen", "Keeping dreams warm", "Writing dreams in code"]]
};
var AC_SUBJECTS = Object.keys(AC_LORE);
var AC_POWERS = ["flying", "floating", "passing through walls", "breathing underwater", "becoming unseen", "changing shape", "summoning", "stopping time", "moving without walking", "changing size", "speaking with the dead", "knowing it was a dream", "changing the dream", "seeing what was hidden", "walking on water", "healing"];
var AC_SHOTSUBJ = { fire: "fire-casting", lightning: "storm-casting", ice: "frost-casting", light: "light-casting" };
var AC_ROOMS = [
{ id: "entrance", name: "The Entrance Hall", x0: -16, x1: 16, z0: 30, z1: 46 },
{ id: "hall", name: "The Great Hall", x0: -16, x1: 16, z0: -20, z1: 30, job: 1730 },
{ id: "wgal", name: "The West Gallery", x0: -22, x1: -16, z0: -40, z1: 46 },
{ id: "egal", name: "The East Gallery", x0: 16, x1: 22, z0: -40, z1: 46 },
{ id: "back", name: "The Back Corridor", x0: -16, x1: 16, z0: -27, z1: -20 },
{ id: "library", name: "The Academy Library", x0: -16, x1: 16, z0: -46, z1: -27, job: 1742 },
{ id: "secret", name: "The Room of Echoes", x0: -22, x1: -16, z0: -46, z1: -40 },
{ id: "cupboard", name: "The Caretaker's Room", x0: 16, x1: 22, z0: -46, z1: -40, job: 1743 },
{ id: "flight", name: "The Hall of Flight", x0: -50, x1: -22, z0: -46, z1: -9.2, job: 1731, subj: ["flying", "floating", "riding enchanted things"], col: 0x6AA8E8, doors: [-36, -20] },
{ id: "passage", name: "The Hall of Passage", x0: -50, x1: -22, z0: -9.2, z1: 9.2, job: 1732, subj: ["passing through walls", "moving without walking"], col: 0x5AD8C8, doors: [0] },
{ id: "veils", name: "Veils and Seeing", x0: -50, x1: -22, z0: 9.2, z1: 27.6, job: 1733, subj: ["becoming unseen", "seeing what was hidden"], col: 0xB8A0E8, doors: [18.4] },
{ id: "transfig", name: "Transfiguration", x0: -50, x1: -22, z0: 27.6, z1: 46, job: 1734, subj: ["changing shape", "changing size"], col: 0x8ED86A, doors: [36.8] },
{ id: "duel", name: "The Duelling Hall", x0: 22, x1: 50, z0: -46, z1: -9.2, job: 1736, subj: ["fire-casting", "storm-casting", "frost-casting", "light-casting"], col: 0xE8743A, doors: [-36, -20] },
{ id: "healing", name: "The Infirmary", x0: 22, x1: 50, z0: -9.2, z1: 9.2, job: 1737, subj: ["healing"], col: 0x7AE8A0, doors: [0] },
{ id: "conj", name: "Conjuration", x0: 22, x1: 50, z0: 9.2, z1: 27.6, job: 1735, subj: ["summoning"], col: 0xE8C84A, doors: [18.4] },
{ id: "common", name: "The Common Room", x0: 22, x1: 50, z0: 27.6, z1: 46, doors: [36.8] },
{ id: "uland", name: "The Tower Landing", x0: 125, x1: 145, z0: 14, z1: 30, up: 1 },
{ id: "ucorr", name: "The Tower Corridor", x0: 105, x1: 165, z0: 6, z1: 14, up: 1 },
{ id: "astro", name: "The Astronomy Tower", x0: 105, x1: 127, z0: -30, z1: 6, job: 1741, subj: ["knowing it was a dream", "changing the dream"], col: 0x9AB8FF, doors: [116], up: 1 },
{ id: "clock", name: "The Clock Tower", x0: 127, x1: 145, z0: -30, z1: 6, job: 1740, subj: ["stopping time"], col: 0xE8D08A, doors: [136], up: 1 },
{ id: "study", name: "The Archmage's Study", x0: 145, x1: 165, z0: -30, z1: 6, job: 1730, doors: [155], up: 1 },
{ id: "dland", name: "The Dungeon Landing", x0: -145, x1: -125, z0: 14, z1: 30, down: 1 },
{ id: "dcorr", name: "The Dungeon Passage", x0: -165, x1: -105, z0: 6, z1: 14, down: 1 },
{ id: "crypt", name: "The Crypt of Voices", x0: -165, x1: -137, z0: -30, z1: 6, job: 1738, subj: ["speaking with the dead"], col: 0x7AA8FF, doors: [-151], down: 1 },
{ id: "pool", name: "The Sunken Pool", x0: -137, x1: -105, z0: -30, z1: 6, job: 1739, subj: ["breathing underwater", "walking on water"], col: 0x4AC8E8, doors: [-121], down: 1 }
];
var AC_ROOM = {};
AC_ROOMS.forEach(function (r) { AC_ROOM[r.id] = r; });
function acRoomOf(subject) { for (var i = 0; i < AC_ROOMS.length; i++)
if (AC_ROOMS[i].subj && AC_ROOMS[i].subj.indexOf(subject) >= 0)
return AC_ROOMS[i]; return null; }
var AC_STAFF = {
1730: ["Archmage of the Academy", "hall", [9, 8], 0x5A2A7A],
1731: ["Professor of Flight", "flight", [8, 6, 15, 6], 0x2E5A9A],
1732: ["Professor of Passage", "passage", [8, 6, 15, 6], 0x1E7A70],
1733: ["Professor of Veils and Seeing", "veils", [8, 6, 15, 6], 0x5A4A8A],
1734: ["Professor of Transfiguration", "transfig", [8, 6, 15, 6], 0x3A6A2A],
1735: ["Professor of Conjuration", "conj", [8, 6, 15, 6], 0x8A6A1A],
1736: ["Master of Duelling Magic", "duel", [10, 6, 17, 6], 0x8A2A1A],
1737: ["Professor of Healing", "healing", [8, 8, 16, 8], 0x2A7A4A],
1738: ["Keeper of the Crypt of Voices", "crypt", [18, 8, 2, 6], 0x1A2A4A],
1739: ["Professor of Waters", "pool", [8, 6, 15, 6], 0x1A5A7A],
1740: ["Professor of Time", "clock", [8, 6, 15, 6], 0x7A5A2A],
1741: ["Professor of Dreaming", "astro", [20, 6, 2, 6], 0x23285A],
1742: ["Academy librarian", "library", [8, 6, 14, 8], 0x4A3A2A],
1743: ["Castle caretaker", "egal", [6, 8, 14, 8], 0x4A4036],
1744: ["Academy groundskeeper", "entrance", [6, 8], 0x4A5A2A]
};
var AC_PADS = [
{ x: -12, z: 37, to: { x: 135, z: 23 }, name: "the grand staircase, up to the towers" },
{ x: 12, z: 37, to: { x: -135, z: 23 }, name: "the steps down to the dungeons" },
{ x: 135, z: 28, to: { x: -12, z: 41.5 }, name: "the staircase, down to the Entrance Hall" },
{ x: -135, z: 28, to: { x: 12, z: 41.5 }, name: "the steps, up to the Entrance Hall" }
];
var AC = { loaded: false, loading: false, at: 0, anim: [], open: null, lesson: null, warned: false, cool: 0, where: null, told: {}, fade: 0 };
function acStore() {
var d = (typeof dreamer === "function") ? dreamer() : {};
if (!d.learned || typeof d.learned !== "object")
d.learned = {};
if (!Array.isArray(d.powersOff))
d.powersOff = [];
return d;
}
function acKeeper() { return typeof amKeeper === "function" && amKeeper(); }
function acLearned(subject) { if (acKeeper())
return true; return !!acStore().learned[subject]; }
function acOff(subject) { return acStore().powersOff.indexOf(subject) >= 0; }
function acCount() { var n = 0; AC_SUBJECTS.forEach(function (s) { if (acLearned(s))
n++; }); return n; }
function acLoad(force) {
if (AC.loading || !(typeof signedIn === "function" && signedIn()))
return;
if (!force && Date.now() - AC.at < 300000)
return;
AC.loading = true;
AC.at = Date.now();
cityRpc("academy_my", {}).then(function (o) {
AC.loading = false;
if (!o || !o.ok)
return;
var d = acStore();
(o.learned || []).forEach(function (r) { if (r && r.subject && !d.learned[r.subject])
d.learned[r.subject] = { at: r.at, teacher: r.teacher || null }; });
AC.loaded = true;
acApply();
if (typeof save === "function")
save();
}).catch(function () { AC.loading = false; });
}
function acApply() {
if (typeof canFly === "undefined")
return;
var mg = typeof magicGranted !== "undefined" && magicGranted;
var rid = typeof rideArch !== "undefined" && rideArch;
var drv = typeof DRIVE !== "undefined" && DRIVE.on;
if (!mg && !rid && !drv)
canFly = hasAbility("flying") || hasAbility("floating");
}
(function () {
if (typeof hasAbility !== "function")
return;
var ha = hasAbility;
window.acDreamt = ha;
hasAbility = function (name) {
if (AC_POWERS.indexOf(name) < 0)
return ha.apply(this, arguments);
return acLearned(name) && !acOff(name);
};
})();
(function () {
if (typeof throughWalls !== "function")
return;
var tw = throughWalls;
throughWalls = function () {
if (!acLearned("passing through walls") || acOff("passing through walls"))
return false;
if (typeof trfInCity === "function" && trfInCity())
return false;
if (typeof PW !== "undefined" && PW && PW.walls === false)
return false;
return true;
};
})();
(function () {
if (typeof encounterWays !== "function")
return;
var ew = encounterWays;
encounterWays = function (c) {
var W = ew.apply(this, arguments);
W.abilities = AC_POWERS.filter(function (n) { return hasAbility(n); }).map(function (n) { return "ability:" + n; });
return W;
};
})();
(function () {
if (typeof useCarried !== "function")
return;
var uc = useCarried;
useCarried = function () {
try {
if (carrying && shotCool <= 0) {
var A = ARMS[carrying.archetype], sj = A && AC_SHOTSUBJ[A.shot];
if (sj && !acLearned(sj)) {
shotCool = 0.8;
setStatus("<b>The " + esc(carriedName()) + " stays cold in your hand.</b> " + esc(acTitle(sj)) + " is taught at the Academy of the Arcane, in " + esc(acRoomOf(sj).name) + ". " + acGoLink());
return;
}
}
}
catch (e) { }
return uc.apply(this, arguments);
};
})();
(function () {
if (typeof startRide !== "function")
return;
var sr = startRide;
startRide = function (o) {
if (!acLearned("riding enchanted things")) {
magicRiding = o.id;
if (!AC.told["ride" + o.id]) {
AC.told["ride" + o.id] = 1;
setStatus("<b>" + esc(placeName(o)) + " will not rise for you yet.</b> Riding enchanted things is taught in the Hall of Flight at the Academy of the Arcane. " + acGoLink());
}
return;
}
return sr.apply(this, arguments);
};
})();
function acTitle(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
function acGoLink() { return '<a href="#" data-acgo="1" style="color:#C8B0FF">Show me the way</a>.'; }
(function () {
if (typeof openPowers !== "function")
return;
openPowers = function () {
var p = document.getElementById("pd-powers");
if (p && p.style.display === "block") {
p.style.display = "none";
return;
}
if (!p) {
p = document.createElement("div");
p.id = "pd-powers";
p.style.cssText = "position:fixed;z-index:20;left:50%;top:12%;transform:translateX(-50%);width:min(380px,92vw);" +
"max-height:74vh;overflow-y:auto;background:rgba(9,11,16,.96);border:1px solid var(--line,#333);border-radius:4px;padding:16px 18px";
document.body.appendChild(p);
}
acPowersPaint(p);
p.style.display = "block";
};
})();
function acPowersPaint(p) { return __ZC(170, 0, this, arguments, new.target); }
function acGo() { return __ZC(170, 1, this, arguments, new.target); }
addEventListener("click", function (e) {
var g = e.target && e.target.closest ? e.target.closest("[data-acgo]") : null;
if (g) {
e.preventDefault();
acGo();
var p = document.getElementById("pd-powers");
if (p)
p.style.display = "none";
}
});
function acIsHouse(spec) { return !!(spec && (spec.workplace === AC_KEY || spec.label === AC_KEY) && spec.city); }
var AC_W = 100, AC_D = 92, AC_H = 10;
function makeAcademyInterior(spec) { return __ZC(170, 2, this, arguments, new.target); }
function acRoomDress(C, r, A, F) { return __ZC(170, 3, this, arguments, new.target); }
function acWhere() {
if (!(typeof INT !== "undefined" && INT && INT.academy))
return null;
var lx = camera.position.x - INT.ox, lz = camera.position.z - INT.oz;
for (var i = 0; i < AC_ROOMS.length; i++) {
var r = AC_ROOMS[i];
if (lx >= r.x0 && lx <= r.x1 && lz >= r.z0 && lz <= r.z1)
return r;
}
return null;
}
function acOnShift(job, h) {
var s = AC_STAFF[job];
if (!s)
return false;
var q = s[2];
function inn(a, l) { if (a == null)
return false; var e = a + l; return e <= 24 ? (h >= a && h < e) : (h >= a || h < e - 24); }
return inn(q[0], q[1]) || inn(q[2], q[3]);
}
function acTeacher(r) {
if (!r || !r.job || !INT || !INT.academy)
return null;
var st = INT.academy.staff[r.job];
return st ? st.name : null;
}
function acPaint() { return __ZC(170, 4, this, arguments, new.target); }
addEventListener("click", function (e) {
var b = e.target && e.target.closest ? e.target.closest("[data-acl]") : null;
if (!b)
return;
acLesson(b.getAttribute("data-acl"));
});
function acLesson(subject) { return __ZC(170, 5, this, arguments, new.target); }
function acLessonEl() { return __ZC(170, 6, this, arguments, new.target); }
function acLessonPaint() { return __ZC(170, 7, this, arguments, new.target); }
function acUseHint(s) { return __ZC(170, 8, this, arguments, new.target); }
function acRunes() { return __ZC(170, 9, this, arguments, new.target); }
addEventListener("click", function (e) {
var t = e.target && e.target.closest ? e.target : null;
if (!t || !AC.lesson)
return;
var Ls = AC.lesson, b;
if ((b = t.closest("[data-acx]"))) {
AC.lesson = null;
acLessonPaint();
return;
}
if ((b = t.closest("[data-acn]"))) {
Ls.stage++;
acLessonPaint();
return;
}
if ((b = t.closest("[data-acr]"))) {
var n = +b.getAttribute("data-acr");
if (n === Ls.next) {
Ls.next++;
if (Ls.next > 5) {
Ls.stage = 4;
acLessonPaint();
}
else
acRunes();
}
else {
Ls.miss++;
Ls.runes = null;
acLessonPaint();
}
return;
}
if ((b = t.closest("[data-acq]"))) {
if (+b.getAttribute("data-acq") === 0)
acPass();
else {
Ls.wrong = 1;
acLessonPaint();
}
return;
}
if ((b = t.closest("[data-acw]"))) {
Ls.stage = 4;
Ls.wrong = 0;
acPass();
return;
}
});
function acPass() { return __ZC(170, 10, this, arguments, new.target); }
(function () {
if (typeof jobWear !== "function")
return;
var jw = jobWear;
jobWear = function (title, place) {
var o = jw.apply(this, arguments);
if (String(place || "") === AC_KEY || /academy|archmage|professor of|duelling magic|crypt of voices/i.test(String(title || ""))) {
var job = null;
Object.keys(AC_STAFF).forEach(function (k) { if (AC_STAFF[k][0] === title)
job = k; });
var robe = job ? AC_STAFF[job][3] : 0x2F3E7E;
if (/caretaker|groundskeeper/i.test(String(title || "")))
return o;
o = { top: robe, bottom: robe, layer: "tunic", layerColor: robe, back: "cloak", backColor: robe, hat: "wizard", hatColor: robe, shoeKind: "boots" };
if (/librarian/i.test(String(title || ""))) {
o.hat = null;
o.face = "glasses";
}
}
return o;
};
})();
function acStaffSync() { return __ZC(170, 11, this, arguments, new.target); }
(function () {
if (typeof tempsInside !== "function")
return;
var ti = tempsInside;
tempsInside = function () { if (typeof INT !== "undefined" && INT && INT.academy) {
try {
acStaffSync();
}
catch (e) {
if (!AC.warned) {
AC.warned = true;
console.warn("academy staff:", e);
}
}
return;
} return ti.apply(this, arguments); };
})();
(function () {
if (typeof makeInterior === "function") {
var mi = makeInterior;
makeInterior = function (spec) {
if (acIsHouse(spec)) {
try {
return makeAcademyInterior(spec);
}
catch (e) {
if (window.console)
console.warn("academy:", e);
}
}
return mi.apply(this, arguments);
};
}
if (typeof enterBuilding === "function") {
var eb = enterBuilding;
enterBuilding = function (spec) {
eb.apply(this, arguments);
if (typeof INT !== "undefined" && INT && INT.academy) {
acLoad(true);
acStaffSync();
acPaint();
setStatus("<b>The Somnucor Academy of the Arcane.</b> Every power and magic is taught here, free. The Great Hall is ahead; the classrooms are off the two galleries, the towers up the grand staircase, the dungeons down the steps.");
}
};
}
if (typeof exitInterior === "function") {
var ex = exitInterior;
exitInterior = function () { var was = typeof INT !== "undefined" && INT && INT.academy; ex.apply(this, arguments); if (was) {
var el = document.getElementById("ac-panel");
if (el)
el.style.display = "none";
AC.lesson = null;
acLessonPaint();
} };
}
if (typeof interiorTick === "function") {
var it = interiorTick;
interiorTick = function (dt) {
it.apply(this, arguments);
try {
acTick(dt);
}
catch (e) {
if (window.console && !AC.warned) {
AC.warned = true;
console.warn("academy:", e);
}
}
};
}
})();
function acTick(dt) {
if (AC.cool > 0)
AC.cool -= dt;
if (AC.fade > 0) {
AC.fade -= dt;
var fd = document.getElementById("ac-fade");
if (fd)
fd.style.opacity = Math.max(0, Math.min(1, AC.fade / 0.5));
}
if (!(typeof INT !== "undefined" && INT && INT.academy)) {
if (AC.where !== null) {
AC.where = null;
var el = document.getElementById("ac-panel");
if (el)
el.style.display = "none";
}
return;
}
var Ad = INT.academy;
Ad.t += dt;
for (var i = 0; i < Ad.anim.length; i++)
Ad.anim[i](Ad.t);
if ((Ad.flk = (Ad.flk || 0) + dt) > 0.1) {
Ad.flk = 0;
Ad.flames.forEach(function (f, k) { f.scale.setScalar(0.8 + 0.4 * Math.abs(Math.sin(Ad.t * 7 + k))); });
}
if ((Ad.sync = (Ad.sync || 0) + dt) > 20) {
Ad.sync = 0;
acStaffSync();
}
var P = camera.position, lx = P.x - INT.ox, lz = P.z - INT.oz;
if (AC.cool <= 0)
for (var k = 0; k < AC_PADS.length; k++) {
var p = AC_PADS[k];
if (Math.hypot(lx - p.x, lz - p.z) < 1.1) {
AC.cool = 1.6;
acFade();
P.x = INT.ox + p.to.x;
P.z = INT.oz + p.to.z;
yaw = 0;
pitch = 0;
setStatus("<b>" + esc(acTitle(p.name)) + ".</b>");
break;
}
}
var w = acWhere(), wid = w ? w.id : "";
if (wid !== AC.where) {
AC.where = wid;
acPaint();
if (w && w.id === "secret" && !AC.told.secret) {
AC.told.secret = 1;
setStatus("<b>Behind the bookcase: the Room of Echoes.</b> You found the Academy's secret room.");
}
}
}
function acFade() {
var fd = document.getElementById("ac-fade");
if (!fd) {
fd = document.createElement("div");
fd.id = "ac-fade";
fd.style.cssText = "position:fixed;inset:0;z-index:8000;background:#06040C;pointer-events:none;opacity:0";
document.body.appendChild(fd);
}
fd.style.opacity = 1;
AC.fade = 0.6;
}
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt.apply(this, arguments); try {
if (!(typeof INT !== "undefined" && INT))
acLoad(false);
}
catch (e) { } };
})();
setTimeout(function () { try {
acLoad(true);
}
catch (e) { } }, 4000);
