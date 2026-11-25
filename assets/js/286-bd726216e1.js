/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var EDU_KEY = "The City School";
var EDU_H = 3.6;
var EDU_GRADES = ["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
function eduGradeName(g) { return g === "K" ? "Kindergarten" : "Grade " + g; }
var EDU_SUBJ = { ela: "English & Reading", math: "Mathematics", sci: "Science", soc: "Social Studies", lang: "Spanish", art: "Art", mus: "Music", pe: "Health & PE", cs: "Computer Science" };
var EDU_SCOL = { ela: 0xC8503A, math: 0x3A6AC8, sci: 0x3AA86A, soc: 0xC8963A, lang: 0xC83A8A, art: 0xE87A2A, mus: 0x8A5AC8, pe: 0x2AA8B8, cs: 0x5A6A7A };
var EDU_COURSES = (function () {
var out = [], E = ["ela", "math", "sci", "soc", "art", "mus", "pe"], N = { ela: "Reading & Writing", math: "Mathematics", sci: "Science", soc: "Social Studies", art: "Art", mus: "Music", pe: "Health & PE" };
["K", "1", "2", "3", "4", "5"].forEach(function (g) { E.forEach(function (s) { out.push(["g" + g + "-" + s, g, s, (g === "K" ? "Kindergarten" : "Grade " + g) + " " + N[s]]); }); });
var S = ["ela", "math", "sci", "soc", "lang", "art", "mus", "pe", "cs"], T = {
"6": { ela: "Grade 6 English Language Arts", math: "Grade 6 Mathematics", sci: "Grade 6 Earth & Space Science", soc: "Grade 6 Ancient Civilizations & World Geography", lang: "Grade 6 Spanish (Beginning)", art: "Grade 6 Art", mus: "Grade 6 Music", pe: "Grade 6 Health & PE", cs: "Grade 6 Computer Science: Computers & Coding Basics" },
"7": { ela: "Grade 7 English Language Arts", math: "Grade 7 Mathematics", sci: "Grade 7 Life Science", soc: "Grade 7 World History: Medieval to Early Modern", lang: "Grade 7 Spanish (Beginning II)", art: "Grade 7 Art", mus: "Grade 7 Music", pe: "Grade 7 Health & PE", cs: "Grade 7 Computer Science: Programming with Blocks to Text" },
"8": { ela: "Grade 8 English Language Arts", math: "Grade 8 Mathematics (Pre-Algebra)", sci: "Grade 8 Physical Science", soc: "Grade 8 United States History to 1877", lang: "Grade 8 Spanish I", art: "Grade 8 Art", mus: "Grade 8 Music", pe: "Grade 8 Health & PE", cs: "Grade 8 Computer Science: Data, Networks & Safety Online" },
"9": { ela: "English 9: Literature & Composition", math: "Algebra I", sci: "Biology", soc: "World History", lang: "Spanish II", art: "Visual Art I", mus: "Music I: Theory & Performance", pe: "Health & PE 9", cs: "Introduction to Computer Science" },
"10": { ela: "English 10: World Literature", math: "Geometry", sci: "Chemistry", soc: "United States History", lang: "Spanish III", art: "Visual Art II", mus: "Music II: Music History", pe: "Health & PE 10", cs: "Programming in Python" },
"11": { ela: "English 11: American Literature", math: "Algebra II", sci: "Physics", soc: "U.S. Government & Civics", lang: "Spanish IV", art: "Visual Art III: Studio", mus: "Music III: Composition", pe: "Health & PE 11: Lifetime Fitness", cs: "Web Design & Development" },
"12": { ela: "English 12: British Literature & College Writing", math: "Precalculus & Statistics", sci: "Earth & Environmental Science", soc: "Economics & Personal Finance", lang: "Spanish V: Conversation & Culture", art: "Visual Art IV: Portfolio", mus: "Music IV: Ensemble & Musicianship", pe: "Health & PE 12: Wellness & First Aid", cs: "Computer Science Principles" }
};
["6", "7", "8", "9", "10", "11", "12"].forEach(function (g) { S.forEach(function (s) { out.push(["g" + g + "-" + s, g, s, T[g][s]]); }); });
["lang", "cs"].forEach(function (s) { ["K", "1", "2", "3", "4", "5"].forEach(function (g) { out.push(["g" + g + "-" + s, g, s, (g === "K" ? "Kindergarten" : "Grade " + g) + " " + (s === "lang" ? "Spanish" : "Computer Science")]); }); });
return out;
})();
var EDU_POSTS = {
2100: ["Head of the Department of Education", "super", [0, -3.4], [8, 9], "suit"],
2101: ["Principal", "principal", [0, -3.2], [7, 9], "suit"],
2102: ["Assistant principal", "ap", [0, -3.2], [8, 8], "suit"],
2103: ["School secretary", "reception", [-2.2, 0], [7, 8], "office"],
2104: ["Attendance clerk", "attend", [0, -2], [7, 8], "office"],
2105: ["School nurse", "nurse", [-2.5, -3], [8, 8], "nurse"],
2106: ["School counselor", "counsel", [0, -3], [8, 8], "office"],
2107: ["Library media specialist", "library", [9, 10], [8, 8], "office"],
2108: ["Special education teacher", "resource", [0, -6], [8, 8], "teacher"],
2109: ["Cafeteria cook", "kitchen", [1, 0], [6, 8], "cook"],
2110: ["School custodian", "custodian", [0, 0], [6, 8, 14, 8], "custodian"],
2111: ["School security officer", "vestibule", [-7.5, 0], [7, 8, 15, 8], "security"],
2112: ["School IT technician", "it", [0, -2], [8, 8], "office"],
2113: ["Athletic director and PE coach", "gym", [14, 6], [10, 8], "coach"],
2114: ["Director of World Learning", "district", [3, -3], [9, 8], "suit"],
2115: ["World learning guide", "district", [-3, -3], [10, 8], "guide"],
2116: ["Curriculum writer", "district", [0, 3], [9, 8], "office"],
2119: ["College and career counselor", "career", [0, -3], [9, 8], "office"],
2120: ["Theatre and music director", "auditorium", [0, 20], [11, 8], "teacher"],
2121: ["Career and technical teacher", "shop", [0, -6], [8, 8], "teacher"],
2122: ["Robotics and makerspace coach", "maker", [0, -6], [10, 8], "teacher"]
};
var EDU_TEACH0 = 2200;
function eduTeacherTitle(i) { var c = EDU_COURSES[i]; return /^(Kindergarten|Grade)/.test(c[3]) ? c[3] + " teacher" : c[3] + " teacher (" + eduGradeName(c[1]) + ")"; }
function eduAllJobs() { var a = Object.keys(EDU_POSTS).map(Number); for (var i = 0; i < EDU_COURSES.length; i++)
a.push(EDU_TEACH0 + i); return a; }
var EDU_ROOMS = [], EDU_ROOM = {}, EDU_HALLS = [];
(function () {
function room(o) { EDU_ROOMS.push(o); EDU_ROOM[o.id] = o; return o; }
EDU_GRADES.forEach(function (g, gi) {
var el = gi < 6, j = el ? gi : gi - 6, xc = el ? -(55 + 22 * j) : (55 + 22 * j), rows = 5, zEnd = -2 - 8 * rows;
var hall = room({ id: "hall-" + g, name: eduGradeName(g) + " hall", kind: "hall", grade: g, x0: xc - 2, x1: xc + 2, z0: zEnd, z1: -2, xc: xc, rows: rows, el: el });
EDU_HALLS.push(hall);
var subs = EDU_COURSES.filter(function (c) { return c[1] === g; });
for (var s = 0; s < rows * 2; s++) {
var side = s % 2, row = s >> 1, z1 = -2 - 8 * row, z0 = z1 - 8, c = subs[s];
var r = { id: c ? c[0] : "wc-" + g, hall: hall.id, grade: g, side: side, row: row, x0: side ? xc + 2 : xc - 11, x1: side ? xc + 11 : xc - 2, z0: z0, z1: z1,
door: { x: side ? xc + 2 : xc - 2, z: z1 - 1.4 }, no: (gi + 1) * 100 + s + 1 };
if (c) {
r.kind = "class";
r.ci = EDU_COURSES.indexOf(c);
r.name = c[3];
r.subj = c[2];
r.job = EDU_TEACH0 + r.ci;
}
else {
r.kind = "wc";
r.name = "Restrooms (" + eduGradeName(g) + " hall)";
}
room(r);
}
});
room({ id: "corridor", name: "The main corridor", kind: "corridor", x0: -176, x1: 198, z0: -2, z1: 2 });
[
{ id: "vestibule", name: "The secure entrance", x0: -12, x1: 12, z0: 52, z1: 60, note: "Visitors sign in at the security desk. The inner doors open onto the lobby." },
{ id: "atrium", name: "The lobby and atrium", x0: -12, x1: 12, z0: 2, z1: 52, note: "The heart of the school: the trophy case, the school crest and the way to every wing." },
{ id: "library", name: "The library media centre", x0: -44, x1: -12, z0: 2, z1: 34, note: "Books for every grade, computers, a reading nook and the picture-book bins." },
{ id: "reception", name: "The front office", x0: -24, x1: -12, z0: 34, z1: 60, note: "Sign in and out here, ask the secretary anything, and see your report card." },
{ id: "attend", name: "Attendance and the school secretaries", x0: -34, x1: -24, z0: 34, z1: 60, lock: "office", note: "Staff only: attendance, records, the copier and the teachers' mailboxes." },
{ id: "principal", name: "The principal's office", x0: -44, x1: -34, z0: 47, z1: 60, lock: "office" },
{ id: "ap", name: "The assistant principal's office", x0: -44, x1: -34, z0: 34, z1: 47, lock: "office" },
{ id: "cafeteria", name: "The cafeteria", x0: 12, x1: 34, z0: 2, z1: 28, note: "Lunch is served at the counter at midday. Eat with your friends." },
{ id: "kitchen", name: "The school kitchen", x0: 34, x1: 44, z0: 2, z1: 28, lock: "kitchen", note: "Staff only." },
{ id: "officehall", name: "The office corridor", x0: 12, x1: 44, z0: 28, z1: 32 },
{ id: "nurse", name: "The nurse's office", x0: 12, x1: 22, z0: 32, z1: 46, note: "Feeling unwell or hurt? The school nurse is here." },
{ id: "sickbay", name: "The sick bay", x0: 12, x1: 22, z0: 46, z1: 60, lock: "nurse", note: "Staff only: cots for students who need to lie down." },
{ id: "counsel", name: "The counselor's office", x0: 22, x1: 32, z0: 32, z1: 46, note: "Somebody to talk to: about school, friends, home, or what comes next." },
{ id: "career", name: "The college and career centre", x0: 22, x1: 32, z0: 46, z1: 60, note: "Plan what comes after school: colleges, trades, jobs in Somnucor." },
{ id: "district", name: "The Department of Education", x0: 32, x1: 44, z0: 32, z1: 46, note: "The city's Department of Education: the school, and the World Learning programmes in every world." },
{ id: "super", name: "The superintendent's office", x0: 32, x1: 44, z0: 46, z1: 60, lock: "district" },
{ id: "gym", name: "The gymnasium", x0: -44, x1: 10, z0: -40, z1: -2, tall: 8, note: "Basketball, volleyball and PE classes. The bleachers seat the whole school." },
{ id: "girls", name: "The girls' locker room", x0: -44, x1: -30, z0: -50, z1: -40 },
{ id: "boys", name: "The boys' locker room", x0: -30, x1: -16, z0: -50, z1: -40 },
{ id: "coach", name: "The coaches' office", x0: -16, x1: -6, z0: -50, z1: -40, lock: "gym" },
{ id: "equipment", name: "The PE equipment store", x0: -6, x1: 10, z0: -50, z1: -40, lock: "gym" },
{ id: "auditorium", name: "The auditorium", x0: 10, x1: 44, z0: -50, z1: -2, tall: 8, note: "Plays, concerts, assemblies and graduation." },
{ id: "lounge", name: "The teachers' lounge and workroom", x0: 44, x1: 66, z0: 2, z1: 30, lock: "staff", note: "Staff only." },
{ id: "weights", name: "The weight room and fitness centre", x0: 66, x1: 92, z0: 2, z1: 30, note: "Free weights, machines and treadmills, for PE and the teams." },
{ id: "shop", name: "The shop: career and technical education", x0: 92, x1: 122, z0: 2, z1: 30, note: "Woodwork, metalwork and building trades, taught safely." },
{ id: "maker", name: "The makerspace and robotics lab", x0: 122, x1: 150, z0: 2, z1: 30, note: "3D printers, electronics benches and the robot arena." },
{ id: "resource", name: "The learning support room", x0: 150, x1: 170, z0: 2, z1: 30, note: "Special education and extra help: quiet tables, a calm corner and one-to-one support." },
{ id: "it", name: "The IT and server room", x0: 170, x1: 184, z0: 2, z1: 30, lock: "staff", note: "Staff only." },
{ id: "custodian", name: "The custodian's room", x0: 184, x1: 198, z0: 2, z1: 30, lock: "staff", note: "Staff only." },
{ id: "playground", name: "The playground", x0: -176, x1: -44, z0: 2, z1: 40, open: true, note: "Swings, slides, the climbing dome, the sandpit and the courts. Recess is at 10 and at noon." }
].forEach(function (o) { o.kind = o.kind || "core"; room(o); });
})();
function eduRoomAt(lx, lz) {
var best = null, ba = 1e9;
for (var i = 0; i < EDU_ROOMS.length; i++) {
var r = EDU_ROOMS[i];
if (lx >= r.x0 && lx <= r.x1 && lz >= r.z0 && lz <= r.z1) {
var a = (r.x1 - r.x0) * (r.z1 - r.z0);
if (a < ba) {
ba = a;
best = r;
}
}
}
return best;
}
var EDU = { data: {}, loading: {}, lesson: null, where: null, whereHall: null, cool: 0, warned: false, told: {}, prog: null, progAt: 0, progBusy: false, badge: false, badgeAt: 0, practice: null };
var EDU_W = 380, EDU_D = 116;
var EDU_CAMPUS = [EDU_KEY, "The Commons School"];
function eduIsHouse(spec) { return !!(spec && spec.city && (EDU_CAMPUS.indexOf(spec.workplace) >= 0 || EDU_CAMPUS.indexOf(spec.label) >= 0)); }
function eduBuilder(C) { return __ZC(286, 0, this, arguments, new.target); }
var EDU_C = { wall: 0xE8E2D2, hallW: 0xD8DCE0, trim: 0x8A7A66, floor: 0xC8C4B8, oak: 0x9A6A3A, oakD: 0x6A4A2A, steel: 0x9AA0A8, dark: 0x2A2C30, white: 0xF4F4F0,
cork: 0xB8885A, blue: 0x2E5A9A, red: 0xA83A32, green: 0x3A7A4A, yellow: 0xE8C04A, carpet: 0x5A6A8A, tile: 0xDCD8CC, gymF: 0xD8A868, stage: 0x4A3020 };
function eduDesk(B, s, x, z, ry, small) { return __ZC(286, 1, this, arguments, new.target); }
function eduChair(B, s, x, z, ry, col) {
B.bx(s, 0.44, 0.05, 0.44, col || 0x3A5A8A, x, 0.44, z, ry);
B.bx(s, 0.36, 0.44, 0.36, EDU_C.steel, x, 0, z, ry);
B.bx(s, 0.44, 0.46, 0.05, col || 0x3A5A8A, x + 0.2 * Math.sin(ry || 0), 0.48, z + 0.2 * Math.cos(ry || 0), ry);
}
function eduTable(B, s, w, d, x, z, col, top) { B.bx(s, w, 0.05, d, top || 0xC8A878, x, 0.72, z); B.bx(s, w - 0.2, 0.7, d - 0.2, col || EDU_C.steel, x, 0.02, z); B.C.solid(x, z, w / 2, d / 2, 0.76); }
function eduShelf(B, s, w, x, z, ry, h) { return __ZC(286, 2, this, arguments, new.target); }
function eduPlant(B, x, z) { B.mesh(gC(0.22, 0.17, 0.4, 10), 0x8A5A3A, x, 0.2, z); B.mesh(gS(0.38), 0x3A7A3A, x, 0.75, z); B.C.solid(x, z, 0.25, 0.25, 1); }
function eduBin(B, s, x, z) { B.bx(s, 0.3, 0.42, 0.3, 0x2A5A9A, x, 0, z); }
function eduClock(B, x, y, z, ry) { var m = B.mesh(gC(0.18, 0.18, 0.05, 16), 0xF4F4F0, x, y, z, ry, Math.PI / 2); B.mesh(gB(0.02, 0.12, 0.02), 0x1A1A1A, x + 0.03 * Math.sin(ry || 0), y + 0.04, z + 0.03 * Math.cos(ry || 0), ry); return m; }
function eduFlag(B, x, z) { B.mesh(gC(0.015, 0.015, 1.6, 6), 0xC9A040, x, 1.1 + 0.8, z); B.mesh(gB(0.5, 0.3, 0.01), 0xC83A3A, x + 0.25, 2.6, z); B.mesh(gB(0.2, 0.16, 0.012), 0x2E3A8A, x + 0.1, 2.67, z); }
function eduGlobe(B, x, z) { B.mesh(gC(0.1, 0.16, 0.9, 8), 0x5A3A22, x, 0.45, z); B.mesh(gS(0.3), 0x3A7AC8, x, 1.2, z); B.mesh(gT(0.33, 0.015), 0xC9A040, x, 1.2, z, 0, Math.PI / 2); B.C.solid(x, z, 0.3, 0.3, 1.4); }
function eduDressClass(B, r) { return __ZC(286, 3, this, arguments, new.target); }
function eduDressRestroom(B, r) { return __ZC(286, 4, this, arguments, new.target); }
function eduBuildHall(B, h) { return __ZC(286, 5, this, arguments, new.target); }
function makeSchoolInterior(spec) { return __ZC(286, 6, this, arguments, new.target); }
var EDU_BOOKS = {
ela: { K: [[10607, "The Real Mother Goose", "Various"], [14838, "The Tale of Peter Rabbit", "Beatrix Potter"], [21, "Aesop's Fables", "Aesop"]],
"1": [[14838, "The Tale of Peter Rabbit", "Beatrix Potter"], [10607, "The Real Mother Goose", "Various"], [2591, "Grimms' Fairy Tales", "Jacob and Wilhelm Grimm"]],
"2": [[136, "A Child's Garden of Verses", "Robert Louis Stevenson"], [11757, "The Velveteen Rabbit", "Margery Williams"], [1597, "Andersen's Fairy Tales", "Hans Christian Andersen"]],
"3": [[55, "The Wonderful Wizard of Oz", "L. Frank Baum"], [2781, "Just So Stories", "Rudyard Kipling"], [501, "The Story of Doctor Dolittle", "Hugh Lofting"]],
"4": [[11, "Alice's Adventures in Wonderland", "Lewis Carroll"], [289, "The Wind in the Willows", "Kenneth Grahame"], [500, "The Adventures of Pinocchio", "Carlo Collodi"]],
"5": [[16, "Peter Pan", "J. M. Barrie"], [236, "The Jungle Book", "Rudyard Kipling"], [271, "Black Beauty", "Anna Sewell"]],
"6": [[113, "The Secret Garden", "Frances Hodgson Burnett"], [45, "Anne of Green Gables", "L. M. Montgomery"], [1448, "Heidi", "Johanna Spyri"]],
"7": [[120, "Treasure Island", "Robert Louis Stevenson"], [74, "The Adventures of Tom Sawyer", "Mark Twain"], [215, "The Call of the Wild", "Jack London"]],
"8": [[46, "A Christmas Carol", "Charles Dickens"], [514, "Little Women", "Louisa May Alcott"], [103, "Around the World in Eighty Days", "Jules Verne"]],
"9": [[1727, "The Odyssey", "Homer (trans. Samuel Butler)"], [1513, "Romeo and Juliet", "William Shakespeare"], [1400, "Great Expectations", "Charles Dickens"]],
"10": [[84, "Frankenstein", "Mary Shelley"], [1524, "Hamlet", "William Shakespeare"], [2000, "Don Quijote (en español)", "Miguel de Cervantes"]],
"11": [[33, "The Scarlet Letter", "Nathaniel Hawthorne"], [76, "Adventures of Huckleberry Finn", "Mark Twain"], [64317, "The Great Gatsby", "F. Scott Fitzgerald"], [205, "Walden", "Henry David Thoreau"]],
"12": [[16328, "Beowulf", "trans. J. Lesslie Hall"], [1533, "Macbeth", "William Shakespeare"], [1342, "Pride and Prejudice", "Jane Austen"], [1260, "Jane Eyre", "Charlotte Brontë"]] },
soc: { "5": [[1, "The Declaration of Independence", "Thomas Jefferson and the Congress"]], "6": [[2707, "The History of Herodotus, Vol. 1", "Herodotus"], [4928, "Bulfinch's Mythology", "Thomas Bulfinch"]],
"8": [[1, "The Declaration of Independence", "The Continental Congress"], [5, "The United States Constitution", "The Constitutional Convention"], [23, "Narrative of the Life of Frederick Douglass", "Frederick Douglass"]],
"9": [[1232, "The Prince", "Niccolò Machiavelli"], [7142, "The History of the Peloponnesian War", "Thucydides"]], "10": [[147, "Common Sense", "Thomas Paine"], [2376, "Up from Slavery", "Booker T. Washington"], [20203, "The Autobiography of Benjamin Franklin", "Benjamin Franklin"]],
"11": [[1404, "The Federalist Papers", "Hamilton, Madison and Jay"], [5, "The United States Constitution", "The Constitutional Convention"], [7370, "Second Treatise of Government", "John Locke"], [34901, "On Liberty", "John Stuart Mill"]],
"12": [[3300, "The Wealth of Nations", "Adam Smith"]] },
sci: { "4": [[14474, "The Chemical History of a Candle", "Michael Faraday"]], "7": [[1887, "The Life of the Spider", "Jean-Henri Fabre"], [944, "The Voyage of the Beagle", "Charles Darwin"]],
"9": [[1228, "On the Origin of Species", "Charles Darwin"]], "10": [[14474, "The Chemical History of a Candle", "Michael Faraday"]], "11": [[5001, "Relativity: The Special and General Theory", "Albert Einstein"]] },
math: { "8": [[16713, "Amusements in Mathematics", "Henry Ernest Dudeney"]], "10": [[21076, "The First Six Books of the Elements of Euclid", "Euclid"], [201, "Flatland", "Edwin A. Abbott"]], "12": [[33283, "Calculus Made Easy", "Silvanus P. Thompson"]] },
lang: { "12": [[2000, "Don Quijote", "Miguel de Cervantes"]] },
art: { "9": [[30325, "The Elements of Drawing", "John Ruskin"]], "12": [[5000, "The Notebooks of Leonardo da Vinci", "Leonardo da Vinci"]] },
mus: { "10": [[17474, "How to Listen to Music", "Henry Edward Krehbiel"]] }
};
var EDU_PHET = {
math: { K: ["make-a-ten"], "1": ["make-a-ten", "arithmetic"], "2": ["arithmetic"], "3": ["area-builder", "fractions-intro"], "4": ["fractions-equality", "area-model-multiplication"], "5": ["fraction-matcher", "area-model-multiplication"],
"6": ["unit-rates", "number-line-integers"], "7": ["proportion-playground", "equality-explorer"], "8": ["graphing-lines", "function-builder"], "9": ["graphing-lines", "equality-explorer"], "10": ["area-builder"], "11": ["graphing-quadratics", "curve-fitting"], "12": ["trig-tour", "plinko-probability"] },
sci: { K: ["forces-and-motion-basics"], "1": ["color-vision"], "2": ["states-of-matter-basics"], "3": ["forces-and-motion-basics", "friction"], "4": ["energy-skate-park-basics", "wave-on-a-string"], "5": ["gravity-and-orbits", "density"],
"6": ["gravity-and-orbits", "greenhouse-effect"], "7": ["natural-selection", "gene-expression-essentials"], "8": ["build-an-atom", "states-of-matter-basics", "balloons-and-static-electricity"], "9": ["natural-selection", "gene-expression-essentials"],
"10": ["build-an-atom", "balancing-chemical-equations", "ph-scale-basics", "molecule-shapes"], "11": ["projectile-motion", "circuit-construction-kit-dc", "pendulum-lab", "masses-and-springs"], "12": ["greenhouse-effect", "gas-properties", "under-pressure"] },
art: { "3": ["color-vision"] }, mus: { "5": ["wave-on-a-string"] }
};
var EDU_OPEN = {
"g6-math": [["Prealgebra 2e", "OpenStax", "https://openstax.org/details/books/prealgebra-2e", "CC BY 4.0"]],
"g7-math": [["Prealgebra 2e", "OpenStax", "https://openstax.org/details/books/prealgebra-2e", "CC BY 4.0"]],
"g8-math": [["Prealgebra 2e", "OpenStax", "https://openstax.org/details/books/prealgebra-2e", "CC BY 4.0"], ["Elementary Algebra 2e", "OpenStax", "https://openstax.org/details/books/elementary-algebra-2e", "CC BY 4.0"]],
"g9-math": [["Elementary Algebra 2e", "OpenStax", "https://openstax.org/details/books/elementary-algebra-2e", "CC BY 4.0"]],
"g10-math": [["Algebra and Trigonometry 2e", "OpenStax", "https://openstax.org/details/books/algebra-and-trigonometry-2e", "CC BY 4.0"]],
"g11-math": [["Intermediate Algebra 2e", "OpenStax", "https://openstax.org/details/books/intermediate-algebra-2e", "CC BY 4.0"]],
"g12-math": [["Precalculus 2e", "OpenStax", "https://openstax.org/details/books/precalculus-2e", "CC BY 4.0"], ["Introductory Statistics 2e", "OpenStax", "https://openstax.org/details/books/introductory-statistics-2e", "CC BY 4.0"]],
"g9-sci": [["Biology 2e", "OpenStax", "https://openstax.org/details/books/biology-2e", "CC BY 4.0"]],
"g10-sci": [["Chemistry 2e", "OpenStax", "https://openstax.org/details/books/chemistry-2e", "CC BY 4.0"]],
"g11-sci": [["Physics", "OpenStax", "https://openstax.org/details/books/physics", "CC BY 4.0"]],
"g12-sci": [["Astronomy 2e", "OpenStax", "https://openstax.org/details/books/astronomy-2e", "CC BY 4.0"]],
"g6-sci": [["Wikijunior: Solar System", "Wikibooks", "https://en.wikibooks.org/wiki/Wikijunior:Solar_System", "CC BY-SA"]],
"g3-sci": [["Wikijunior: Dinosaurs", "Wikibooks", "https://en.wikibooks.org/wiki/Wikijunior:Dinosaurs", "CC BY-SA"]],
"g9-soc": [["World History, Volume 1", "OpenStax", "https://openstax.org/details/books/world-history-volume-1", "CC BY 4.0"], ["World History, Volume 2", "OpenStax", "https://openstax.org/details/books/world-history-volume-2", "CC BY 4.0"]],
"g10-soc": [["U.S. History", "OpenStax", "https://openstax.org/details/books/us-history", "CC BY 4.0"]],
"g11-soc": [["American Government 3e", "OpenStax", "https://openstax.org/details/books/american-government-3e", "CC BY 4.0"]],
"g12-soc": [["Principles of Economics 3e", "OpenStax", "https://openstax.org/details/books/principles-economics-3e", "CC BY 4.0"]],
"g9-ela": [["Writing Guide with Handbook", "OpenStax", "https://openstax.org/details/books/writing-guide", "CC BY 4.0"]],
"g12-ela": [["Writing Guide with Handbook", "OpenStax", "https://openstax.org/details/books/writing-guide", "CC BY 4.0"]],
"g9-lang": [["Spanish", "Wikibooks", "https://en.wikibooks.org/wiki/Spanish", "CC BY-SA"]],
"g3-lang": [["Spanish", "Wikibooks", "https://en.wikibooks.org/wiki/Spanish", "CC BY-SA"]], "g4-lang": [["Spanish", "Wikibooks", "https://en.wikibooks.org/wiki/Spanish", "CC BY-SA"]], "g5-lang": [["Spanish", "Wikibooks", "https://en.wikibooks.org/wiki/Spanish", "CC BY-SA"]], "g10-lang": [["Spanish", "Wikibooks", "https://en.wikibooks.org/wiki/Spanish", "CC BY-SA"]],
"g9-mus": [["Music Theory", "Wikibooks", "https://en.wikibooks.org/wiki/Music_Theory", "CC BY-SA"]], "g11-mus": [["Music Theory", "Wikibooks", "https://en.wikibooks.org/wiki/Music_Theory", "CC BY-SA"]],
"g1-sci": [["Wikijunior: Big Cats", "Wikibooks", "https://en.wikibooks.org/wiki/Wikijunior:Big_Cats", "CC BY-SA"]],
"g2-sci": [["Wikijunior: Bugs", "Wikibooks", "https://en.wikibooks.org/wiki/Wikijunior:Bugs", "CC BY-SA"]],
"g4-sci": [["Wikijunior: Human Body", "Wikibooks", "https://en.wikibooks.org/wiki/Wikijunior:Human_Body", "CC BY-SA"]],
"g5-sci": [["Wikijunior: Solar System", "Wikibooks", "https://en.wikibooks.org/wiki/Wikijunior:Solar_System", "CC BY-SA"]],
"g6-soc": [["Wikijunior: Ancient Civilizations", "Wikibooks", "https://en.wikibooks.org/wiki/Wikijunior:Ancient_Civilizations", "CC BY-SA"]],
"g8-sci": [["Wikijunior: The Elements", "Wikibooks", "https://en.wikibooks.org/wiki/Wikijunior:The_Elements", "CC BY-SA"]],
"g7-cs": [["Python Programming", "Wikibooks", "https://en.wikibooks.org/wiki/Python_Programming", "CC BY-SA"]],
"g8-cs": [["Python Programming", "Wikibooks", "https://en.wikibooks.org/wiki/Python_Programming", "CC BY-SA"]],
"g9-cs": [["Introduction to Computer Science", "OpenStax", "https://openstax.org/details/books/introduction-computer-science", "CC BY 4.0"]],
"g10-cs": [["Introduction to Python Programming", "OpenStax", "https://openstax.org/details/books/introduction-python-programming", "CC BY 4.0"]],
"g11-cs": [["Learn web development", "MDN Web Docs", "https://developer.mozilla.org/en-US/docs/Learn", "CC BY-SA 2.5"]],
"g12-cs": [["Introduction to Computer Science", "OpenStax", "https://openstax.org/details/books/introduction-computer-science", "CC BY 4.0"]]
};
var EDU_PHET_NAME = { "make-a-ten": "Make a Ten", "arithmetic": "Arithmetic", "area-builder": "Area Builder", "fractions-intro": "Fractions: Intro", "fractions-equality": "Fractions: Equality", "area-model-multiplication": "Area Model Multiplication",
"fraction-matcher": "Fraction Matcher", "unit-rates": "Unit Rates", "number-line-integers": "Number Line: Integers", "proportion-playground": "Proportion Playground", "equality-explorer": "Equality Explorer", "graphing-lines": "Graphing Lines",
"function-builder": "Function Builder", "graphing-quadratics": "Graphing Quadratics", "curve-fitting": "Curve Fitting", "trig-tour": "Trig Tour", "plinko-probability": "Plinko Probability", "forces-and-motion-basics": "Forces and Motion: Basics",
"color-vision": "Color Vision", "states-of-matter-basics": "States of Matter: Basics", "friction": "Friction", "energy-skate-park-basics": "Energy Skate Park: Basics", "wave-on-a-string": "Wave on a String", "gravity-and-orbits": "Gravity and Orbits",
"density": "Density", "greenhouse-effect": "The Greenhouse Effect", "natural-selection": "Natural Selection", "gene-expression-essentials": "Gene Expression Essentials", "build-an-atom": "Build an Atom", "balloons-and-static-electricity": "Balloons and Static Electricity",
"balancing-chemical-equations": "Balancing Chemical Equations", "ph-scale-basics": "pH Scale: Basics", "molecule-shapes": "Molecule Shapes", "projectile-motion": "Projectile Motion", "circuit-construction-kit-dc": "Circuit Construction Kit: DC",
"pendulum-lab": "Pendulum Lab", "masses-and-springs": "Masses and Springs", "gas-properties": "Gas Properties", "under-pressure": "Under Pressure" };
function eduStore() { var d = (typeof dreamer === "function") ? dreamer() : {}; if (!d.school || typeof d.school !== "object")
d.school = {}; return d.school; }
function eduPassed(cid, u) { var c = eduStore()[cid]; return !!(c && c[u]); }
function eduCount(cid) { var c = eduStore()[cid]; return c ? Object.keys(c).filter(function (k) { return +k >= 1 && +k <= 10; }).length : 0; }
function eduCourseDone(cid) { return eduCount(cid) >= 10; }
function eduGradeDone(g) { return EDU_COURSES.filter(function (c) { return c[1] === g; }).every(function (c) { return eduCourseDone(c[0]); }); }
function eduDiploma() { return ["9", "10", "11", "12"].every(eduGradeDone); }
function eduLoad(force) {
if (EDU.progBusy || !(typeof signedIn === "function" && signedIn()))
return;
if (!force && Date.now() - EDU.progAt < 300000)
return;
EDU.progBusy = true;
EDU.progAt = Date.now();
cityRpc("school_my", {}).then(function (o) {
EDU.progBusy = false;
if (!o || !o.ok)
return;
var st = eduStore();
(o.passed || []).forEach(function (r) { if (!r || !r.c)
return; var c = st[r.c] || (st[r.c] = {}); if (!c[r.u])
c[r.u] = r.at || true; });
if (typeof save === "function")
save();
eduPaint(true);
}).catch(function () { EDU.progBusy = false; });
}
function eduData(g, cb) { return __ZC(286, 7, this, arguments, new.target); }
function eduCourse(cid) { for (var i = 0; i < EDU_COURSES.length; i++)
if (EDU_COURSES[i][0] === cid)
return EDU_COURSES[i]; return null; }
function eduBadge() {
if (typeof amKeeper === "function" && amKeeper())
return true;
var jobs = (typeof WORK !== "undefined" && WORK.data && WORK.data.jobs) || [];
var all = eduAllJobs();
return jobs.some(function (j) { return all.indexOf(+j.job_id) >= 0 || +j.job_id === 18 || +j.job_id === 92 || j.workplace === EDU_KEY; });
}
function eduOnShift(h0, len, h) { if (h0 == null)
return false; var e = h0 + len; return e <= 24 ? (h >= h0 && h < e) : (h >= h0 || h < e - 24); }
function eduHours(job) { if (EDU_POSTS[job])
return EDU_POSTS[job][3]; return [8, 8]; }
function eduTitle(job) { return EDU_POSTS[job] ? EDU_POSTS[job][0] : eduTeacherTitle(job - EDU_TEACH0); }
function eduName(job) { return __ZC(286, 8, this, arguments, new.target); }
function eduFigure(id, job, title, f) { return __ZC(286, 9, this, arguments, new.target); }
function eduStaffSync() { return __ZC(286, 10, this, arguments, new.target); }
function eduKidsSync(r) { return __ZC(286, 11, this, arguments, new.target); }
function eduSignTex(lines, w, h, bg, fg) { return __ZC(286, 12, this, arguments, new.target); }
function eduSign(root, lines, w, h, x, y, z, ry, px, bg) {
var t = eduSignTex(lines, px || 256, Math.round((px || 256) * h / w), bg);
var m = new THREE.Mesh(gP(w, h), new THREE.MeshBasicMaterial({ map: t.tex }));
m.position.set(x, y, z);
m.rotation.y = ry || 0;
root.add(m);
return m;
}
function eduStaticSigns(I) { return __ZC(286, 13, this, arguments, new.target); }
function eduRoomNo(r) { return r && r.no || null; }
function eduHallDress(h) { return __ZC(286, 14, this, arguments, new.target); }
function eduHallUndress() {
var Sd = INT && INT.school;
if (!Sd || !Sd.hallDress)
return;
var D = Sd.hallDress;
if (D.g.parent)
D.g.parent.remove(D.g);
D.g.traverse(function (m) { if (m.isMesh && m.material) {
m.material.dispose();
} });
D.tex.forEach(function (t) { try {
t.dispose();
}
catch (e) { } });
Sd.hallDress = null;
}
function eduTeacherName(r) { return eduName(r.job).name; }
function eduRnd(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
function eduProblem(g) { return __ZC(286, 15, this, arguments, new.target); }
function eduCheckAnswer(p, txt) {
var t = String(txt || "").trim().replace(/−/g, "-").replace(/,/g, "");
if (!t)
return false;
var v;
var m = /^(-?\d+)\s*\/\s*(\d+)$/.exec(t);
v = m ? (+m[1]) / (+m[2]) : parseFloat(t);
return isFinite(v) && Math.abs(v - p.a) <= (p.tol || 1e-6);
}
function eduOpen(cid, tab) { return __ZC(286, 16, this, arguments, new.target); }
function eduBegin() {
var Ls = EDU.lesson;
if (!Ls)
return;
Ls.t0 = Date.now();
Ls.picks = {};
Ls.msg = "";
if (typeof signedIn === "function" && signedIn())
cityRpc("school_begin", { p_course: Ls.cid, p_unit: Ls.unit }).catch(function () { });
}
function eduLessonEl() { return __ZC(286, 17, this, arguments, new.target); }
function eduOpt(Ls, k, q) { var o = [q[1], q[2], q[3]], s = (Ls.unit * 7 + k * 3) % 3; return [o[s], o[(s + 1) % 3], o[(s + 2) % 3]]; }
function eduLessonPaint() { return __ZC(286, 18, this, arguments, new.target); }
function eduBtnCss(c) { return "padding:7px 12px;border-radius:5px;border:1px solid " + c + ";background:" + c + ";color:#FFF;font-weight:600;cursor:pointer"; }
function eduTab(k, label, on) { return '<button data-sl="tab" data-t="' + k + '" style="padding:6px 11px;border-radius:14px;border:1px solid #A8B0BA;background:' + (on === k ? "#1E2A44" : "#FFF") + ';color:' + (on === k ? "#FFF" : "#1E2228") + '">' + label + '</button>'; }
function eduResourcesHtml(Ls) { return __ZC(286, 19, this, arguments, new.target); }
function eduReportHtml() { return __ZC(286, 20, this, arguments, new.target); }
function eduLessonClick(e) { return __ZC(286, 21, this, arguments, new.target); }
function eduReadBook(n) { return __ZC(286, 22, this, arguments, new.target); }
function eduReadAloud() { return __ZC(286, 23, this, arguments, new.target); }
function eduPracCheck() { return __ZC(286, 24, this, arguments, new.target); }
function eduHandIn() { return __ZC(286, 25, this, arguments, new.target); }
function eduWhere() { if (!(typeof INT !== "undefined" && INT && INT.school))
return null; return eduRoomAt(camera.position.x - INT.ox, camera.position.z - INT.oz); }
var EDU_TALK = {
counsel: ["the school counselor", "You are the school counselor at Somnucor City School, inside a game. Be warm, calm and encouraging; listen; help with study plans, friendships, worries and what to do after school. You are not a therapist: if someone talks about being unsafe, self-harm or abuse, kindly urge them to talk to a trusted adult in real life right away and, in the US, to call or text 988 (or their local emergency number). Never ask for personal details. Keep answers short.", "Hello, come in and sit down. What's on your mind today?"],
nurse: ["the school nurse", "You are the school nurse at Somnucor City School, inside a game. Give simple, general first-aid and wellness advice (rest, water, hand-washing, ice for bumps). You are not a real doctor: for anything serious, painful or lasting, tell them to see a real doctor or call emergency services. Never ask for personal details. Keep answers short and kind.", "Hello. Are you feeling unwell, or did you bump something?"],
principal: ["the principal", "You are the principal of Somnucor City School, inside a game. Friendly, proud of the school, firm about kindness and safety. Explain how the school works: 117 classrooms, ten units per course, the report card, promotion and the diploma, jobs open at the Department of Education. Keep answers short.", "Welcome to Somnucor City School. How can I help?"],
library: ["the library media specialist", "You are the library media specialist at Somnucor City School, inside a game. Recommend books by age and interest (the classics are free to read here), explain how to research and spot unreliable sources. Keep answers short.", "Looking for something to read? Tell me what you like."],
district: ["the Director of World Learning", "You are the Director of World Learning in Somnucor's Department of Education, inside a game. Your office adds learning to the game's worlds; the first is the Odyssey voyage on the Endless Sea: sail the Wayfarer from the Last Pier at the edge of the Nightmare Wilds and learn at every place Homer describes. Encourage dreamers to build the world and to live in it. Keep answers short.", "Every world can teach something. Have you sailed the Odyssey yet?"]
};
function eduPaint(force) { return __ZC(286, 26, this, arguments, new.target); }
addEventListener("click", function (e) {
var b = e.target && e.target.closest ? e.target.closest("[data-sch]") : null;
if (!b)
return;
e.preventDefault();
var k = b.getAttribute("data-sch"), c = b.getAttribute("data-c");
if (k === "open")
eduOpen(c, "learn");
else if (k === "prac")
eduOpen(c, "practice");
else if (k === "books")
eduOpen(c, "books");
else if (k === "report")
eduOpen(c || "gK-ela", "report");
else if (k === "shelf")
eduShelfCard();
else if (k === "lib" && typeof libCatalogue === "function")
libCatalogue();
else if (k === "world")
eduWorldCard();
else if (k === "roll")
eduRoll();
else if (k === "lunch")
setStatus("<b>Today at the counter:</b> " + ["pasta with tomato sauce, salad and an apple", "chicken and rice with green beans", "bean chili, cornbread and an orange", "vegetable soup, a cheese sandwich and a banana", "fish tacos with slaw and fruit cup"][new Date().getDay() % 5] + ". Lunch is at noon, free for every pupil.");
else if (k === "jobs")
setStatus("<b>Jobs at the school:</b> a teacher for every classroom, the principal and assistant principal, the secretary, the nurse, the counselor, the librarian, cooks, custodians, the security officer and the Department of Education. Apply in the Work panel (dues-payers only).");
else if (k === "talk") {
var t = EDU_TALK[b.getAttribute("data-t")];
if (t && typeof wTalk === "function") {
var post = { counsel: 2106, nurse: 2105, principal: 2101, library: 2107, district: 2114 }[b.getAttribute("data-t")], nm = post ? eduName(post).name : "";
wTalk({ name: (nm ? nm + ", " : "") + t[0], persona: t[1] + (nm ? " Your name is " + nm + "." : ""), greet: t[2] });
}
}
});
function eduShelfCard() { return __ZC(286, 27, this, arguments, new.target); }
function eduLessonPaintHtml() { return __ZC(286, 28, this, arguments, new.target); }
function eduWorldCard() { return __ZC(286, 29, this, arguments, new.target); }
function eduRoll() { return __ZC(286, 30, this, arguments, new.target); }
function eduTick(dt) {
if (!(typeof INT !== "undefined" && INT && INT.school)) {
if (EDU.where !== null) {
EDU.where = null;
var el = document.getElementById("sch-panel");
if (el)
el.style.display = "none";
}
return;
}
var Sd = INT.school;
Sd.t += dt;
for (var i = 0; i < Sd.anim.length; i++)
Sd.anim[i](Sd.t);
var P = camera.position, lx = P.x - INT.ox, lz = P.z - INT.oz;
if ((Sd.lod = (Sd.lod || 0) + dt) > 0.25) {
Sd.lod = 0;
var near = null, nd = 1e9;
EDU_HALLS.forEach(function (h) {
var d = Math.abs(lx - h.xc), inH = lz < -1.8 && lx > h.xc - 12 && lx < h.xc + 12;
var vis = inH || (lz > -2.2 && lz < 2.6 && d < (LITE ? 26 : 40)) || (lz >= 2.6 && d < (LITE ? 14 : 24));
var s = Sd.sets[h.id];
if (s)
for (var k = 0; k < s.length; k++)
s[k].visible = vis;
if (inH && d < nd) {
nd = d;
near = h.id;
}
});
if (near !== Sd.hall) {
Sd.hall = near;
eduHallUndress();
if (near)
eduHallDress(EDU_ROOM[near]);
eduStaffSync();
}
}
if ((Sd.bt = (Sd.bt || 0) - dt) <= 0) {
Sd.bt = 5;
EDU.badge = eduBadge();
}
for (var j = 0; j < Sd.locks.length; j++) {
var L = Sd.locks[j], near2 = Math.hypot(lx - L.x, lz - L.z) < 2.2;
var want = near2 && EDU.badge ? 1 : 0;
if (want !== L.target) {
L.target = want;
L.wall.h = want ? -1 : 2.4;
L.led.material.color.setHex(want ? 0x3AC85A : 0xE04A3A);
}
if (L.open !== want) {
L.open += Math.sign(want - L.open) * Math.min(Math.abs(want - L.open), dt * 2.5);
L.pivot.rotation.y = -L.open * 1.45;
}
if (near2 && !EDU.badge && (EDU.cool || 0) <= 0 && Math.hypot(lx - L.x, lz - L.z) < 1.4) {
EDU.cool = 6;
setStatus("🔒 <b>Staff only.</b> A school employee badge opens this door.");
}
}
if (EDU.cool > 0)
EDU.cool -= dt;
var hr = (typeof cityHourNow === "function") ? cityHourNow() : 12, hk = Math.floor(hr);
if (Sd.bell !== hk) {
var was = Sd.bell;
Sd.bell = hk;
if (was != null && [8, 10, 12, 15].indexOf(hk) >= 0 && typeof playTone === "function") {
try {
playTone(660, 0.5, 0.05);
setTimeout(function () { playTone(523, 0.7, 0.05); }, 450);
}
catch (e) { }
setStatus({ 8: "<b>The morning bell.</b> School is in: Kindergarten to Grade 12.", 10: "<b>Recess.</b> The playground is open.", 12: "<b>Lunch.</b> The cafeteria is serving.", 15: "<b>The last bell.</b> School is out; the lesson books stay open all night." }[hk]);
}
}
if ((Sd.sync = (Sd.sync || 0) + dt) > 15) {
Sd.sync = 0;
eduStaffSync();
}
var w = eduWhere(), wid = w ? w.id : "";
if (wid !== EDU.where) {
EDU.where = wid;
eduKidsSync(w);
eduPaint(true);
if (w && w.kind === "class" && !EDU.told[w.id]) {
EDU.told[w.id] = 1;
setStatus("<b>" + esc(w.name) + ".</b> " + esc(eduTeacherName(w)) + "'s classroom. Open the lessons from the panel.");
}
}
}
(function () {
if (typeof jobWear !== "function")
return;
var jw = jobWear;
jobWear = function (title, place) {
var o = jw.apply(this, arguments), t = String(title || "");
if (String(place || "") !== EDU_KEY && !/school|teacher \(grade|^(kindergarten|grade \d+) .* teacher|department of education|world learning|curriculum writer/i.test(t))
return o;
if (/nurse/i.test(t))
return { top: 0x7AA8C8, bottom: 0x7AA8C8, shoeKind: "sneakers" };
if (/cook/i.test(t))
return { top: 0xF4F4F0, bottom: 0x3A3A3A, hat: "chef", hatColor: 0xF4F4F0 };
if (/custodian/i.test(t))
return { top: 0x3A5A7A, bottom: 0x3A5A7A, shoeKind: "boots" };
if (/security/i.test(t))
return { top: 0x2A3A5A, bottom: 0x1E2430, hat: "cap", hatColor: 0x1E2430, shoeKind: "boots" };
if (/coach|physical education|athletic/i.test(t))
return { top: 0xC83A3A, bottom: 0x2A2A3A, shoeKind: "sneakers" };
if (/principal|head of|director of world|superintend/i.test(t))
return { top: 0x2A3346, bottom: 0x2A3346, layer: "blazer", layerColor: 0x2A3346, shoeKind: "shoes" };
if (/guide/i.test(t))
return { top: 0x2E6A8A, bottom: 0xC8B890, hat: "cap", hatColor: 0x2E6A8A, shoeKind: "boots" };
var h = 0;
for (var i = 0; i < t.length; i++)
h = (h * 31 + t.charCodeAt(i)) | 0;
var tops = [0x6A8AB0, 0x8A6A9A, 0x5A8A6A, 0xB08A5A, 0xA85A5A, 0x5A7A8A, 0xC8B8A0];
return { top: tops[Math.abs(h) % tops.length], bottom: [0x3A3A44, 0x5A4A3A, 0x2A3346][Math.abs(h >> 3) % 3], layer: Math.abs(h >> 5) % 2 ? "cardigan" : null, layerColor: 0x7A6A5A, shoeKind: "shoes" };
};
})();
(function () {
if (typeof bkpHtml !== "function")
return;
var bh = bkpHtml;
bkpHtml = function () {
var h = bh.apply(this, arguments), st = eduStore(), done = EDU_COURSES.filter(function (c) { return eduCourseDone(c[0]); }), units = 0;
Object.keys(st).forEach(function (k) { units += Object.keys(st[k] || {}).length; });
if (!units)
return h;
var w = Object.keys(st["world-odyssey"] || {}).length, tot = (typeof ODL_STOPS !== "undefined" ? ODL_STOPS.length : 17);
var x = '<div style="margin-top:10px;border-top:1px solid #3A3448;padding-top:8px"><b style="color:#F0E0B8">📜 School papers</b>' +
'<div style="color:var(--dim);font-size:12px">' + units + ' units passed at Somnucor City School and on the voyages. <button class="btn" data-schbk="report">Report card</button></div>';
if (eduDiploma())
x += '<div style="margin:4px 0">🎓 <b>Diploma</b>, Somnucor City School</div>';
done.forEach(function (c) { x += '<div style="margin:3px 0">📜 Certificate: <b>' + esc(c[3]) + '</b></div>'; });
if (w >= tot)
x += '<div style="margin:3px 0">⚓ Certificate: <b>Odyssey Scholar</b>, the Department of Education</div>';
else if (w)
x += '<div style="margin:3px 0">⚓ The Odyssey voyage log: ' + w + ' of ' + tot + ' stamps</div>';
return h + x + '</div>';
};
addEventListener("click", function (e) {
var b = e.target && e.target.closest ? e.target.closest("[data-schbk]") : null;
if (!b)
return;
if (typeof bkpClose === "function")
bkpClose();
eduOpen("gK-ela", "report");
});
})();
if (typeof backRegister === "function")
backRegister({ order: 3, open: function () { return !!EDU.lesson; }, close: function () { EDU.lesson = null; eduLessonPaint(); eduPaint(true); } });
(function () {
if (typeof WP_BY_KEY !== "undefined" && WP_BY_KEY[EDU_KEY]) {
var wp = WP_BY_KEY[EDU_KEY];
eduAllJobs().forEach(function (j) { if (wp.jobs.indexOf(j) < 0)
wp.jobs.push(j); if (typeof WP_BY_JOB !== "undefined")
WP_BY_JOB[j] = EDU_KEY; });
}
if (typeof makeInterior === "function") {
var mi = makeInterior;
makeInterior = function (spec) {
if (eduIsHouse(spec)) {
try {
return makeSchoolInterior(spec);
}
catch (e) {
if (window.console)
console.warn("school:", e);
}
}
return mi.apply(this, arguments);
};
}
if (typeof tempsInside === "function") {
var ti = tempsInside;
tempsInside = function () { if (typeof INT !== "undefined" && INT && INT.school) {
try {
eduStaffSync();
}
catch (e) {
if (!EDU.warned) {
EDU.warned = true;
console.warn("school staff:", e);
}
}
return;
} return ti.apply(this, arguments); };
}
if (typeof enterBuilding === "function") {
var eb = enterBuilding;
enterBuilding = function (spec) {
eb.apply(this, arguments);
if (typeof INT !== "undefined" && INT && INT.school) {
EDU.where = null;
EDU.badge = eduBadge();
try {
if (!INT.school.signed) {
INT.school.signed = 1;
eduStaticSigns(INT);
}
}
catch (e) {
console.warn("school signs:", e);
}
eduLoad(true);
eduStaffSync();
setStatus("<b>" + (INT.spec && INT.spec.label === "The Commons School" ? "The Commons School, a campus of the City School" : "Somnucor City School") + ".</b> Kindergarten to Grade 12, free for everyone: a classroom for every subject in every grade. Sign in at the security desk; the lobby is ahead, the elementary wing to the west and the middle and high school to the east.");
}
};
}
if (typeof exitInterior === "function") {
var ex = exitInterior;
exitInterior = function () {
var was = typeof INT !== "undefined" && INT && INT.school;
if (was)
try {
eduHallUndress();
}
catch (e) { }
ex.apply(this, arguments);
if (was) {
var el = document.getElementById("sch-panel");
if (el)
el.style.display = "none";
EDU.lesson = null;
eduLessonPaint();
EDU.where = null;
}
};
}
if (typeof interiorTick === "function") {
var it = interiorTick;
interiorTick = function (dt) {
it.apply(this, arguments);
try {
eduTick(dt);
}
catch (e) {
if (window.console && !EDU.warned) {
EDU.warned = true;
console.warn("school:", e);
}
}
};
}
})();
setTimeout(function () { try {
eduLoad(true);
}
catch (e) { } }, 5000);
