/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var DGX_GODS = {};
function DG(keys, hw, more) { keys.split(" ").forEach(function (k) { var o = more ? JSON.parse(JSON.stringify(more)) : {}; o.hw = hw; DGX_GODS[k] = o; }); }
var DGX_LINEN = 0xF2EEE2, DGX_GOLD = 0xD4A63E;
DG("zeus", [["oak", {}]], { beard: "long", dress: "himation" });
DG("hera", [["polos", { veil: 0xF4F0E6 }]], { dress: "peplos" });
DG("poseidon", [["crown", { n: 6, spikes: 0.05, cap: false, c: 0xC8B060 }]], { beard: "long", dress: "himation" });
DG("demeter", [["polos", { wheat: 1, veil: 0xE8D9A8 }]], { dress: "peplos" });
DG("athena", [["corinthian", { crest: 0x2A2420 }]], { dress: "aegis" });
DG("apollo", [["laurel", {}]], { dress: "himation" });
DG("artemis", [["moon", {}]], { dress: "chiton-short" });
DG("ares", [["corinthian", { crest: 0xA8221E }]], { dress: "armour-greek" });
DG("aphrodite", [["stephane", { gem: 0xE07AA0 }]], { dress: "peplos" });
DG("hephaestus", [["pilos", { c: 0x5A4632 }]], { beard: "short", dress: "exomis" });
DG("hermes", [["petasos", {}]], { dress: "chlamys" });
DG("hestia", [["veil", { c: 0xF0E8DA, band: DGX_GOLD }]], { dress: "peplos" });
DG("dionysus", [["ivy", {}]], { dress: "himation" });
DG("hades", [["crown", { metal: "iron", c: 0x3A3A40, n: 8, spikes: 0.045, cap: false, gems: [0x6A2A8A] }]], { beard: "long", dress: "himation" });
DG("persephone", [["polos", { c: 0xC9A040, h: 0.07 }]], { dress: "peplos" });
DG("nemesis", [["stephane", { gem: 0x9A9AA8 }]], { dress: "peplos" });
DG("morpheus", [["hood", { c: 0x5A5A6A }]], { dress: "himation" });
DG("hypnos", [["laurel", { c: 0x8A2A3A, gold: 0 }]], { dress: "himation" });
DG("thanatos", [["laurel", { c: 0x2A2A30 }]], { dress: "himation" });
DG("nyx", [["veil", { c: 0x14141E, band: 0xC8D0E8 }]], { dress: "peplos" });
DG("selene", [["moon", { glow: 0xE8EEFF }]], { dress: "peplos" });
DG("helios", [["rays", {}]], { dress: "himation" });
DG("gaia", [["laurel", { c: 0x4A7A30, berry: 0xC8402A }]], { dress: "peplos" });
DG("pan", [["horns", { kind: "goat", c: 0x3A3028 }], ["ivy", {}]], { beard: "short", dress: "pelt" });
DG("eros", [["laurel", { c: 0xC86A8A }]], { dress: "chiton-short" });
DG("asclepius", [["laurel", { c: 0x3A5A2A }]], { beard: "long", dress: "himation" });
DG("charon", [["pilos", { c: 0x4A4640 }]], { beard: "long", dress: "exomis" });
DG("jupiter", [["oak", {}]], { beard: "long", dress: "toga" });
DG("juno", [["stephane", { gem: 0x2E6AD0 }], ["veil", { c: 0xF4F0E6, from: "crown" }]], { dress: "stola" });
DG("minerva", [["corinthian", { crest: 0x2A2420 }]], { dress: "aegis" });
DG("mars", [["corinthian", { crest: 0xA8221E, c: 0x9A8A6A }]], { dress: "armour-roman" });
DG("venus", [["stephane", { gem: 0xE07AA0 }]], { dress: "stola" });
DG("mercury", [["petasos", {}]], { dress: "chlamys" });
DG("neptune", [["crown", { n: 6, spikes: 0.05, cap: false, c: 0xC8B060 }]], { beard: "long", dress: "toga" });
DG("pluto", [["crown", { metal: "iron", c: 0x3A3A40, n: 8, spikes: 0.045, cap: false, gems: [0x6A2A8A] }]], { beard: "long", dress: "toga" });
DG("vesta", [["veil", { c: 0xF4F0E6, band: DGX_GOLD }]], { dress: "stola" });
DG("diana", [["moon", {}]], { dress: "chiton-short" });
DG("bacchus", [["ivy", {}]], { dress: "toga" });
DG("ceres", [["laurel", { c: 0xC8A848, gold: 1 }], ["veil", { c: 0xE8D9A8, from: "crown" }]], { dress: "stola" });
DG("saturn", [["veil", { c: 0x6A6660 }]], { beard: "long", dress: "toga" });
DG("vulcan", [["pilos", { c: 0x5A4632 }]], { beard: "short", dress: "exomis" });
DG("fortuna", [["polos", { c: 0xC9A040, h: 0.07 }]], { dress: "stola" });
DG("ra", [["sundisc", {}]], {});
DG("amun", [["amun", {}]], { beard: "divine", dress: "shendyt", skin: 0x9A5A36 });
DG("ptah", [["skullcap", {}]], { beard: "divine", dress: "mummy", skin: 0x4E8A5A });
DG("thoth", [["moondisc", {}]], { dress: "shendyt" });
DG("maat", [["wig", {}], ["maat", {}]], { dress: "kalasiris", skin: 0xC8925A });
DG("osiris", [["atef", {}]], { beard: "divine", dress: "mummy", skin: 0x3E7A4A });
DG("isis", [["wig", {}], ["horndisc", { vulture: 1 }]], { dress: "kalasiris", skin: 0xC8925A });
DG("set", [["pschent", {}]], { dress: "shendyt" });
DG("nephthys", [["wig", {}], ["nebethet", {}]], { dress: "kalasiris", skin: 0xC8925A });
DG("horus", [["pschent", {}]], { dress: "shendyt" });
DG("anubis", [], { dress: "shendyt" });
DG("sekhmet", [["sundisc", {}]], { dress: "kalasiris" });
DG("hathor", [["wig", {}], ["horndisc", {}]], { dress: "kalasiris", skin: 0xC8925A });
DG("bastet", [], { dress: "kalasiris" });
DG("sobek", [["sobek", {}]], { dress: "shendyt" });
DG("nut", [["wig", { stripes: "#1A2A5A/#C9A040" }], ["stars", {}]], { dress: "kalasiris", skin: 0x3A5EA8 });
DG("geb", [["deshret", {}]], { beard: "divine", dress: "shendyt", skin: 0x5A7A3A });
DG("taweret", [["horndisc", {}]], { dress: "kalasiris" });
DG("odin", [["widehat", {}]], { beard: "long", dress: "norse-cloak", hair: 0xBCB8B0 });
DG("frigg", [["veil", { c: 0xE8E4DA, band: DGX_GOLD }]], { dress: "apron-dress", hair: 0xC8A060 });
DG("thor", [], { beard: "short", dress: "norse-tunic", hair: 0xB0442A, style: "long" });
DG("sif", [["circlet", { gem: 0xE0A030 }]], { dress: "apron-dress", hair: 0xE8C060, style: "braids" });
DG("loki", [], { dress: "norse-tunic", hair: 0x8A3A1E, style: "long" });
DG("baldr", [["circlet", { gem: 0xF0E0A0, c: 0xE8C860 }]], { dress: "norse-tunic", hair: 0xE8D090 });
DG("tyr", [["spangen", {}]], { beard: "short", dress: "mail", hair: 0x6A4A2A });
DG("heimdall", [["spangen", { gold: 1, c: 0xB8A060 }]], { beard: "short", dress: "mail", hair: 0xD8C08A });
DG("bragi", [], { beard: "long", dress: "norse-cloak", hair: 0xBCB8B0 });
DG("idunn", [["flowers", { cols: [0xF2E8D0, 0xE85A6A, 0xF0D060] }]], { dress: "apron-dress", hair: 0xC8A060, style: "braids" });
DG("vidar", [["spangen", {}]], { beard: "short", dress: "mail", hair: 0x8A6A3A });
DG("njord", [], { beard: "long", dress: "norse-cloak", hair: 0x9A8A70 });
DG("freyr", [["circlet", { gem: 0xE0A030 }]], { beard: "short", dress: "norse-tunic", hair: 0xD8B46A });
DG("freyja", [["circlet", { gem: 0xE0A030, c: 0xE8C860 }]], { dress: "falcon-cloak", hair: 0xE0B860, style: "long" });
DG("skadi", [["furhood", {}]], { dress: "furs", hair: 0xE8E0D0, style: "braids" });
DG("hel", [], { dress: "norse-cloak" });
DG("obatala", [["ade", { cols: ["#F4F2EC", "#E8E4DA", "#C8C4BA"], bird: 0xF4F2EC }]], { dress: "agbada", skin: 0x4A2E1E });
DG("oduduwa", [["ade", { cols: ["#F4F2EC", "#C0302A", "#2A5AA8", "#E0B030"], bird: 0xF4F2EC }]], { dress: "agbada", skin: 0x4A2E1E });
DG("esu", [["esu", {}]], { dress: "wrapper-m", skin: 0x4A2E1E });
DG("ogun", [["mariwo", {}]], { dress: "wrapper-m", skin: 0x3E281A });
DG("sango", [["ade", { cols: ["#C0302A", "#F4F2EC"], bird: 0xC0302A }]], { dress: "agbada", skin: 0x3E281A });
DG("oya", [["ade", { cols: ["#7A2A5A", "#C0302A", "#E0B030"], short: 1 }]], { dress: "iro", skin: 0x4A2E1E });
DG("osun", [["ade", { cols: ["#E0B030", "#F0D060", "#C88A20"], short: 1 }]], { dress: "iro", skin: 0x5A3A26 });
DG("yemoja", [["ade", { cols: ["#2A5AA8", "#F4F2EC", "#8AB0E0"], short: 1 }]], { dress: "iro", skin: 0x4A2E1E });
DG("orunmila", [["fila", { c: 0xF4F2EC, c2: 0x2E8A4A }]], { dress: "agbada", skin: 0x4A2E1E });
DG("ososi", [["fila", { c: 0x2A5AA8, horn: 1 }]], { dress: "wrapper-m", skin: 0x4A2E1E });
DG("osanyin", [["fila", { c: 0x2E8A4A }]], { dress: "wrapper-m", skin: 0x4A2E1E });
DG("obaluaye", [["strawhood", {}]], { dress: "straw", skin: 0x3E281A });
DG("olokun", [["ade", { cols: ["#1A3A7A", "#F4F2EC", "#2A8AA0"], bird: 0x1A3A7A }]], { dress: "agbada", skin: 0x3E281A });
DG("aganju", [["fila", { c: 0xA8261E, c2: 0xE0B030 }]], { dress: "wrapper-m", skin: 0x3E281A });
DG("ibeji", [["fila", { c: 0xC0302A }]], { dress: "wrapper-m", skin: 0x4A2E1E });
DG("osumare", [["gele", { c: 0x2A9A8A, c2: 0xE0B030 }]], { dress: "iro", skin: 0x4A2E1E });
DG("nyame", [["chiefcrown", {}]], { dress: "kente", skin: 0x4A2E1E });
DG("asaseyaa", [["gele", { c: 0x3A7A3A, c2: 0xE0B030 }]], { dress: "kente", skin: 0x4A2E1E });
DG("anansi", [["fila", { c: 0x6A4A2A }]], { dress: "kente", skin: 0x4A2E1E });
DG("tano", [["chiefcrown", { c: 0xC8A040 }]], { dress: "kente", skin: 0x3E281A });
DG("legba", [["strawhat", {}]], { beard: "short", dress: "coat-old", skin: 0x4A2E1E });
DG("erzulie", [["crown", { c: 0xE8C860, n: 10, gems: [0xE07AA0, 0x2E6AD0] }]], { dress: "gown", skin: 0x8A5A3A });
DG("baronsamedi", [["tophat", {}]], { dress: "tails" });
DG("damballa", [["headwrap", { c: 0xF4F2EC }]], { dress: "agbada", skin: 0x4A2E1E });
DG("ogou", [["headwrap", { c: 0xC0201E, knot: 1 }]], { dress: "coat-red", skin: 0x3E281A });
DG("mamanbrigitte", [["headwrap", { c: 0x5A2A6A }]], { dress: "gown", skin: 0xE8C8A8, hair: 0xB0442A });
DG("dagda", [], { beard: "long", dress: "leine", hair: 0x6A4A2A });
DG("morrigan", [["hood", { c: 0x1A1A1E }]], { dress: "brat", hair: 0x14121A });
DG("brigid", [["veil", { c: 0xF4F0E6, band: 0xC9A040 }]], { dress: "brat", hair: 0xB0442A });
DG("lugh", [["rays", { L: 0.05, n: 11 }]], { dress: "leine", hair: 0xE0B860 });
DG("nuada", [["circlet", { metal: "silver", gem: 0x2A5AD0, h: 0.02 }]], { beard: "short", dress: "mail", hair: 0xC8C0A8 });
DG("airmid", [["flowers", { cols: [0xF4F2EC, 0xE0C050, 0x9A6AC8] }]], { dress: "brat", hair: 0xB0702E });
DG("manannan", [["hood", { c: 0x5A7A8A }]], { beard: "long", dress: "brat" });
DG("aengus", [["circlet", { gem: 0x2A8A5A }]], { dress: "leine", hair: 0xD8B46A });
DG("ogma", [], { beard: "long", dress: "leine", hair: 0x8A6A3A });
DG("eriu", [["circlet", { gem: 0x2A8A5A, h: 0.022, boss: 1 }]], { dress: "brat", hair: 0xA0441E });
DG("rhiannon", [["circlet", { gem: 0xC0302A }]], { dress: "brat", hair: 0xD8B46A });
DG("arawn", [["crown", { metal: "iron", c: 0x4A4A50, n: 8, cap: false, gems: [0x6A6A70] }]], { dress: "brat", hair: 0x2A2420 });
DG("cerridwen", [["hood", { c: 0x1E1A20 }]], { dress: "brat", hair: 0x3A2A1A });
DG("arianrhod", [["moon", { glow: 0xE8EEFF }]], { dress: "brat", hair: 0xE8E0D0 });
DG("bran", [["crown", { n: 6, cap: false }]], { beard: "long", dress: "leine", hair: 0x2A2420 });
DG("gwydion", [], { beard: "short", dress: "brat", hair: 0x3A2A1A });
DG("math", [["crown", { n: 6, cap: false }]], { beard: "long", dress: "brat", hair: 0xBCB8B0 });
DG("orddu", [["hood", { c: 0x2A2420 }]], { dress: "brat", hair: 0xBCB8B0 });
DG("cernunnos", [["antlers", {}]], { beard: "short", dress: "cernunnos", hair: 0x5A3A22 });
DG("epona", [["veil", { c: 0xF0ECE2 }]], { dress: "stola", hair: 0xB07A3A });
DG("taranis", [], { beard: "long", dress: "leine", hair: 0xB07A3A });
DG("matres", [["bonnet", {}]], { dress: "stola", hair: 0x5A3A22 });
DG("pangu", [["horns", { kind: "bull", c: 0x5A4A3A }]], { beard: "long", dress: "leaves" });
DG("jadeemperor", [["mianguan", {}]], { beard: "long", dress: "dragonrobe", hair: 0x1A1612 });
DG("xiwangmu", [["sheng", {}]], { dress: "hanfu", hair: 0x1A1612, style: "bun" });
DG("laojun", [["daoguan", {}]], { beard: "long", dress: "daopao", hair: 0xE8E4DA });
DG("shennong", [["horns", { kind: "bull", c: 0x6A5A40 }]], { dress: "leaves", hair: 0x1A1612 });
DG("houyi", [["kui", {}]], { dress: "armour-chinese", hair: 0x1A1612 });
DG("change", [["fengguan", { small: 1 }]], { dress: "hanfu", hair: 0x1A1612, style: "bun" });
DG("guanyin", [["guanyin", {}]], { dress: "hanfu-white", hair: 0x1A1612 });
DG("mazu", [["mianguan", { c: 0xC0302A }]], { dress: "hanfu", hair: 0x1A1612 });
DG("guanyu", [["guanhood", {}]], { beard: "long", dress: "armour-chinese", hair: 0x1A1612 });
DG("zaojun", [["futou", {}]], { beard: "long", dress: "daopao", hair: 0x1A1612 });
DG("yanluo", [["mianguan", { c: 0x1A1A1E }]], { beard: "long", dress: "dragonrobe", hair: 0x1A1612 });
DG("zhongkui", [["futou", { wings: 1 }]], { beard: "long", dress: "daopao", hair: 0x1A1612 });
DG("nezha", [["twinbuns", {}]], { dress: "hanfu", hair: 0x1A1612 });
DG("sunwukong", [["jingu", {}]], {});
DG("hexiangu", [["lotuscrown", {}]], { dress: "hanfu", hair: 0x1A1612, style: "bun" });
DG("caoguojiu", [["futou", { wings: 1 }]], { dress: "daopao", hair: 0x1A1612 });
DG("litieguai", [["circlet", { metal: "bronze", gem: false, h: 0.01 }]], { beard: "short", dress: "rags", hair: 0x2A2420 });
DG("lancaihe", [["flowers", { cols: [0xE85A6A, 0xF0D060, 0x6AA0E0] }]], { dress: "hanfu", hair: 0x1A1612 });
DG("ludongbin", [["daoguan", { c: 0x1A1A1E }]], { beard: "long", dress: "daopao", hair: 0x1A1612 });
DG("hanxiangzi", [["twinbuns", {}]], { dress: "daopao", hair: 0x1A1612 });
DG("zhangguolao", [["daoguan", {}]], { beard: "long", dress: "daopao", hair: 0xE8E4DA });
DG("zhongliquan", [["twinbuns", { bald: 1 }]], { beard: "long", dress: "daopao", hair: 0x1A1612 });
DG("amaterasu", [["hokan", {}]], { dress: "kami-robe", hair: 0x14121A, style: "long" });
DG("susanoo", [["mizura", {}]], { beard: "short", dress: "kami-robe", hair: 0x14121A });
DG("tsukuyomi", [["mizura", {}], ["moon", {}]], { dress: "kami-robe", hair: 0x14121A });
DG("izanagi", [["mizura", {}]], { beard: "short", dress: "kami-robe", hair: 0x14121A });
DG("izanami", [["veil", { c: 0x1A1A1E }]], { dress: "kami-robe", hair: 0x14121A, style: "long" });
DG("inari", [["hokan", { c: 0xC0302A }]], { dress: "kami-robe", hair: 0x14121A, style: "long" });
DG("hachiman", [["kabuto", {}]], { dress: "armour-japanese", hair: 0x14121A });
DG("raijin", [["oni", {}]], { dress: "oni", skin: 0xB03A2A, hair: 0x2A2420 });
DG("fujin", [["oni", {}]], { dress: "oni", skin: 0x3A8A4A, hair: 0x2A2420 });
DG("benzaiten", [["hokan", { torii: 1 }]], { dress: "kami-robe", hair: 0x14121A, style: "long" });
DG("ebisu", [["eboshi", { folded: 1 }]], { beard: "short", dress: "kariginu" });
DG("tenjin", [["kanmuri", {}]], { beard: "short", dress: "sokutai" });
DG("brahma", [["kirita", {}]], { beard: "long", dress: "dhoti" });
DG("vishnu", [["kirita", {}]], { dress: "dhoti" });
DG("shiva", [["jata", {}]], { dress: "tiger" });
DG("lakshmi", [["kirita", { f: 1 }]], { dress: "sari" });
DG("saraswati", [["kirita", { f: 1, c: 0xE8E0C8 }]], { dress: "sari-white" });
DG("parvati", [["kirita", { f: 1 }]], { dress: "sari" });
DG("durga", [["kirita", { f: 1 }]], { dress: "sari" });
DG("kali", [["kali", {}]], { dress: "kali" });
DG("ganesha", [["kirita", {}]], { dress: "dhoti" });
DG("hanuman", [["kirita", {}]], { dress: "dhoti" });
DG("krishna", [["kirita", { peacock: 1, low: 1 }]], { dress: "dhoti", skin: 0x3A5EA0 });
DG("rama", [["kirita", {}]], { dress: "dhoti", skin: 0x3A6AA8 });
DG("indra", [["kirita", {}]], { dress: "dhoti" });
DG("agni", [["flamehair", {}]], { beard: "short", dress: "dhoti" });
DG("surya", [["kirita", { rays: 1 }]], { dress: "dhoti" });
DG("yama", [["kirita", { c: 0xC9A040 }]], { dress: "dhoti" });
DG("kartikeya", [["kirita", {}]], { dress: "dhoti" });
DG("ganga", [["kirita", { f: 1, c: 0xE8E0C8 }]], { dress: "sari-white" });
DG("anu enlil enki marduk nergal", [["horned", {}]], { beard: "long", dress: "kaunakes", hair: 0x1A1612 });
DG("shamash", [["horned", {}]], { beard: "long", dress: "kaunakes", hair: 0x1A1612, rays: 1 });
DG("nanna", [["horned", { moon: 1 }]], { beard: "long", dress: "kaunakes", hair: 0x1A1612 });
DG("inanna", [["horned", { tall: 1 }]], { dress: "kaunakes-f", hair: 0x1A1612 });
DG("ereshkigal", [["horned", { c: 0x3A3A40 }]], { dress: "kaunakes-f", hair: 0x1A1612 });
DG("ninhursag", [["horned", {}]], { dress: "kaunakes-f", hair: 0x1A1612 });
DG("ahuramazda", [["kidaris", {}]], { beard: "long", dress: "persian", hair: 0x1A1612 });
DG("mithra", [["phrygian", {}]], { dress: "persian-short" });
DG("anahita", [["starcrown", {}]], { dress: "persian", hair: 0x1A1612 });
DG("tezcatlipoca", [["quetzal", { c: 0x1A1A1E, mirror: 1 }]], { dress: "tilmatli", skin: 0x8A5A3A, paint: "stripes" });
DG("huitzilopochtli", [["hummingbird", {}]], { dress: "tilmatli", skin: 0x8A5A3A });
DG("tlaloc", [["tlaloc", {}]], { dress: "tilmatli", skin: 0x8A5A3A });
DG("xochiquetzal", [["quetzal", { flowers: 1 }]], { dress: "huipil", skin: 0x9A6A44 });
DG("mictlantecuhtli", [["quetzal", { c: 0x1A1A1E, small: 1 }]], { dress: "tilmatli" });
DG("coatlicue", [["quetzal", { c: 0x2E8A4A, small: 1 }]], { dress: "serpent-skirt", skin: 0x9A6A44 });
DG("chalchiuhtlicue", [["quetzal", { c: 0x2E9A8A }]], { dress: "huipil", skin: 0x9A6A44 });
DG("xipetotec", [["xipe", {}]], { dress: "tilmatli", skin: 0xA8724A });
DG("itzamna", [["mayan", { c: 0xF4F2EC }]], { dress: "maya", skin: 0x9E6A44 });
DG("ixchel", [["serpent", {}]], { dress: "huipil", skin: 0x9E6A44 });
DG("chaac", [["mayan", { c: 0x2E8A8A }]], { dress: "maya", skin: 0x9E6A44 });
DG("kinichahau", [["rays", { L: 0.06, n: 15 }]], { dress: "maya", skin: 0x9E6A44 });
DG("inti", [["incasun", {}]], { dress: "unku", skin: 0xA06A44 });
DG("pachamama", [["mascaypacha", { c: 0x3A7A3A }]], { dress: "aksu", skin: 0xA06A44 });
DG("viracocha", [["incasun", { plain: 1 }]], { beard: "long", dress: "unku", skin: 0xA06A44 });
DG("mamaquilla", [["moon", {}]], { dress: "aksu", skin: 0xA06A44 });
DG("perun", [], { beard: "long", dress: "rubakha", hair: 0xC8A060 });
DG("veles", [["horns", { kind: "bull", c: 0x4A3A2A }]], { beard: "long", dress: "furs", hair: 0x5A3A22 });
DG("mokosh", [["kokoshnik", { c: 0xB0302A }]], { dress: "sarafan", hair: 0xC8A060 });
DG("svarog", [], { beard: "long", dress: "rubakha", hair: 0xBCB8B0 });
DG("dazhbog", [["rays", {}]], { dress: "rubakha", hair: 0xE8C060 });
DG("morana", [["flowers", { cols: [0xF4F2EC, 0xC8D0E0, 0x8A8A9A] }], ["veil", { c: 0xF4F2EC, from: "crown" }]], { dress: "sarafan", hair: 0xE8E4DA });
DG("jarilo", [["flowers", { cols: [0xF2D04A, 0xE85A6A, 0xF4F2EC, 0x6A8AE0] }]], { dress: "rubakha", hair: 0xE8C060 });
DG("stribog", [], { beard: "long", dress: "rubakha", hair: 0xBCB8B0 });
DG("babayaga", [["kerchief", { c: 0x6A2A2A }]], { dress: "sarafan", hair: 0xBCB8B0 });
DG("pele", [["flowers", { cols: [0xC8201E, 0xE84A3A, 0xF07A2A] }]], { dress: "pau", hair: 0x2A1612, skin: 0x8A5A38, style: "long" });
DG("maui", [], { dress: "malo", skin: 0x8A5A38, hair: 0x1A1612, moko: 1 });
DG("tangaroa", [], { beard: "long", dress: "malo", skin: 0x8A5A38 });
DG("tane", [["feathers", { c: 0xC8201E }]], { dress: "malo", skin: 0x8A5A38 });
DG("hina", [["flowers", { cols: [0xF4F2EC, 0xF0D060] }], ["moon", {}]], { dress: "pau", skin: 0x8A5A38, style: "long" });
DG("papatuanuku", [["flowers", { cols: [0x3A7A3A, 0xE8A030] }]], { dress: "pau", skin: 0x7A4E30, style: "long" });
DG("belial", [["crown", { metal: "iron", c: 0x2A2228, n: 8, spikes: 0.06, cap: false, gems: [0xC0201E] }]], { dress: "infernal" });
DG("beelzebub", [["crown", { metal: "iron", c: 0x2A2228, n: 8, spikes: 0.05, cap: false, gems: [0x3A8A2A] }]], { dress: "infernal" });
DG("asmodeus", [["crown", { c: 0xB08A30, n: 8, spikes: 0.05, cap: false, gems: [0xC0201E] }], ["horns", { kind: "ram" }]], { dress: "infernal" });
DG("astaroth", [["crown", { c: 0xB08A30, n: 8, cap: false, gems: [0x6A2A8A] }]], { dress: "infernal" });
DG("mammon", [["crown", { c: 0xE0B848, n: 10, gems: [0xC0201E, 0x2A9A5A] }]], { dress: "infernal" });
DG("belphegor", [["horns", { kind: "goat" }]], { beard: "long", dress: "infernal" });
DG("bael", [["crown", { c: 0xB08A30, n: 8, cap: false }]], { dress: "infernal" });
DG("paimon", [["crown", { c: 0xE0B848, n: 10, h: 0.04, gems: [0xC0201E, 0x2A5AD0, 0x2A9A5A] }]], { dress: "infernal" });
DG("lilith", [], { dress: "infernal-f", hair: 0x0E0C10, style: "long" });
DG("samael", [["crown", { metal: "iron", c: 0x2A2228, n: 6, spikes: 0.07, cap: false, gems: [0xC0201E] }]], { dress: "infernal" });
DG("naamah", [["stephane", { gem: 0x8A2A6A }]], { dress: "infernal-f", hair: 0x0E0C10, style: "long" });
DG("moloch", [], { dress: "infernal" });
DG("adramelech", [["crown", { c: 0xB08A30, n: 10, gems: [0x2A6AD0, 0x2A9A5A] }]], { dress: "infernal" });
DG("lucifuge", [["crown", { metal: "iron", c: 0x1E1A20, n: 8, spikes: 0.05, cap: false, gems: [0x8A2AC0] }]], { dress: "infernal" });
DG("lucifer", [["morningstar", {}]], { dress: "himation", hair: 0xE8D8A8, skin: 0xE8C8A8 });
DG("satan", [["horns", { kind: "goat", c: 0x1A1418 }]], { dress: "infernal" });
DG("azazel", [["circlet", { metal: "iron", c: 0x3A3A40, gem: 0xC0201E }]], { dress: "infernal" });
DG("baphomet", [["baphomet", {}]], { dress: "infernal" });
DG("cain", [], { beard: "short", dress: "rags" });
DG("prometheus", [], { beard: "short", dress: "exomis" });
DG("ahriman", [["crown", { metal: "iron", c: 0x1E1A20, n: 8, spikes: 0.05, cap: false }]], { dress: "infernal" });
DG("echidna", [["stephane", { gem: 0x2A8A3A }]], {});
function dgxFromIcons(d) { return __ZC(407, 0, this, arguments, new.target); }
function dgxWearOf(d) { var g = DGX_GODS[d.key]; return g ? g.hw : dgxFromIcons(d); }
DG("hecate", [["polos", { c: 0xB8B8C0, metal: "silver", h: 0.06 }]], { dress: "peplos" });
DG("janus", [["laurel", {}]], { beard: "long", dress: "toga" });
DG("nuwa", [["fengguan", { small: 1 }]], { dress: "hanfu", hair: 0x1A1612, style: "bun" });
DG("fuxi", [["futou", {}]], { dress: "hanfu", hair: 0x1A1612 });
DG("choronzon", [], {});
var DGX = { mats: {}, tex: {}, kit: {}, n: 0, fits: 0, fails: 0, on: true };
var DGX_FRONT = Math.PI / 2, DGX_BACK = Math.PI * 1.5;
function dgxTex(key, w, h, fn) { if (DGX.tex[key])
return DGX.tex[key]; var c = document.createElement("canvas"); c.width = w; c.height = h; fn(c.getContext("2d"), w, h); var t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; return (DGX.tex[key] = t); }
function dgxHex(c) { return "#" + ("000000" + (c >>> 0).toString(16)).slice(-6); }
function dgxMat(kind, col) { return __ZC(407, 1, this, arguments, new.target); }
function dgxHeadFrom(G, pts, face, eyes) { return __ZC(407, 2, this, arguments, new.target); }
function dgxHeadHd(E) {
var H0 = (typeof hfHead === "function") ? hfHead(E) : null;
if (!H0)
return null;
var H = dgxHeadFrom(H0.G, H0.pts, H0.face, H0.eyes);
if (!H) {
H0.hb.remove(H0.G);
return null;
}
H.hb = H0.hb;
return H;
}
function dgxHeadMore(H) { return __ZC(407, 3, this, arguments, new.target); }
var DGX_KITHEAD = /^(head|haircap|hairlong|bun|tail|afro|coily|locs|braid|braidband|buzzcap|waves|wrap|wrapknot|curly|eye)$/;
function dgxHeadKit(body, extra) { return __ZC(407, 4, this, arguments, new.target); }
function dgxGeo(pos, idx, uv) { var g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3)); if (uv)
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2)); g.setIndex(idx); g.computeVertexNormals(); return g; }
function dgxRmax(H, y0, y1) { var lo = Math.min(y0, y1), hi = Math.min(H.ymax - 0.004, Math.max(y0, y1)), R = H.ring(Math.min(lo, H.ymax - 0.004)).slice(); for (var y = lo + 0.01; y <= hi; y += 0.01) {
var Q = H.ring(y);
for (var j = 0; j < R.length; j++)
if (Q[j] > R[j])
R[j] = Q[j];
} return R; }
function dgxLoft(H, rings, o) { return __ZC(407, 5, this, arguments, new.target); }
function dgxBand(H, y0, h, gap, mat, o) { return __ZC(407, 6, this, arguments, new.target); }
function dgxRim(H, R, y, gap, rad, mat, a0, a1) { return __ZC(407, 7, this, arguments, new.target); }
function dgxDome(H, y0, gap, rise, mat, o) { return __ZC(407, 8, this, arguments, new.target); }
function dgxPt(H, R, a, y, gap) { var r = H.at(R, a) + (gap || 0); return new THREE.Vector3(H.cx + Math.cos(a) * r, y, H.cz + Math.sin(a) * r); }
function dgxOut(a) { return new THREE.Vector3(Math.cos(a), 0, Math.sin(a)); }
function dgxTaper(pts, r0, r1, mat, seg) { return __ZC(407, 9, this, arguments, new.target); }
var DGX_SHAPES = {};
function dgxShapeGeo(kind) { return __ZC(407, 10, this, arguments, new.target); }
function dgxFlat(G, kind, mat, p, dir, face, L, W, bend) { return __ZC(407, 11, this, arguments, new.target); }
function dgxBall(G, mat, p, r, sx, sy, sz) { var m = new THREE.Mesh(DGX.ball || (DGX.ball = new THREE.SphereGeometry(1, 12, 9)), mat); m.position.copy(p); m.scale.set(r * (sx || 1), r * (sy || 1), r * (sz || 1)); G.add(m); return m; }
function dgxGem(G, col, p, n, s) { var o = new THREE.Mesh(DGX.oct || (DGX.oct = new THREE.OctahedronGeometry(1, 0)), dgxMat("gem", col)); o.scale.set(s, s * 1.2, s * 0.6); o.position.copy(p); o.lookAt(p.clone().add(n)); G.add(o); return o; }
function dgxBox(G, mat, p, w, h, d, rx, ry, rz) { var m = new THREE.Mesh(DGX.box || (DGX.box = new THREE.BoxGeometry(1, 1, 1)), mat); m.position.copy(p); m.scale.set(w, h, d); m.rotation.set(rx || 0, ry || 0, rz || 0); G.add(m); return m; }
function dgxAdd(G, m) { G.add(m); return m; }
var DGX_HW = {};
function dgxLeaves(H, G, y, gap, mat, o) { return __ZC(407, 12, this, arguments, new.target); }
DGX_HW.laurel = function (H, G, o) { dgxLeaves(H, G, H.browY + 0.012, 0.006, dgxMat(o.gold ? "gold" : "leaf", o.c != null ? o.c : 0x2F5E26), { n: 17, L: 0.046, W: 0.02, berry: o.berry ? dgxMat("pearl", o.berry) : null, stemMat: o.gold ? null : dgxMat("bronze", 0x6A4A2A) }); };
DGX_HW.oak = function (H, G, o) { dgxLeaves(H, G, H.browY + 0.014, 0.007, dgxMat("leaf", o.c != null ? o.c : 0x40632A), { n: 11, kind: "oak", L: 0.042, W: 0.03, open: 0.28, berry: dgxMat("bronze", 0x8A5A2A) }); };
DGX_HW.ivy = function (H, G, o) { dgxLeaves(H, G, H.browY + 0.012, 0.006, dgxMat("leaf", 0x2E5A26), { n: 12, kind: "oak", L: 0.03, W: 0.03, berry: dgxMat("pearl", 0x3A1A4A) }); };
DGX_HW.stephane = function (H, G, o) { return __ZC(407, 13, this, arguments, new.target); };
DGX_HW.polos = function (H, G, o) { return __ZC(407, 14, this, arguments, new.target); };
DGX_HW.veil = function (H, G, o) { return __ZC(407, 15, this, arguments, new.target); };
DGX_HW.hood = function (H, G, o) { return __ZC(407, 16, this, arguments, new.target); };
DGX_HW.moon = function (H, G, o) { return __ZC(407, 17, this, arguments, new.target); };
DGX_HW.rays = function (H, G, o) { return __ZC(407, 18, this, arguments, new.target); };
DGX_HW.circlet = function (H, G, o) { return __ZC(407, 19, this, arguments, new.target); };
DGX_HW.crown = function (H, G, o) { return __ZC(407, 20, this, arguments, new.target); };
DGX_HW.corinthian = function (H, G, o) { return __ZC(407, 21, this, arguments, new.target); };
DGX_HW.petasos = function (H, G, o) { return __ZC(407, 22, this, arguments, new.target); };
DGX_HW.pilos = function (H, G, o) { return __ZC(407, 23, this, arguments, new.target); };
DGX_HW.phrygian = function (H, G, o) { return __ZC(407, 24, this, arguments, new.target); };
function dgxUraeus(H, G, R, y, gap, s) { return __ZC(407, 25, this, arguments, new.target); }
DGX_HW.nemes = function (H, G, o) { return __ZC(407, 26, this, arguments, new.target); };
function dgxHedjet(H, G, y0, R, hh, col, gap) { return __ZC(407, 27, this, arguments, new.target); }
DGX_HW.hedjet = function (H, G, o) { var y0 = H.browY - 0.004, R = dgxRmax(H, y0, y0 + 0.05); dgxHedjet(H, G, y0, R, 0.2, o.c != null ? o.c : 0xF2EEE2, 0.012); G.add(dgxRim(H, R, y0 + 0.004, 0.014, 0.004, dgxMat("gold"))); dgxUraeus(H, G, R, y0 + 0.01, 0.014); };
DGX_HW.atef = function (H, G, o) { return __ZC(407, 28, this, arguments, new.target); };
function dgxDeshret(H, G, y0, R, col, inner) { return __ZC(407, 29, this, arguments, new.target); }
DGX_HW.deshret = function (H, G, o) { var y0 = H.browY - 0.004, R = dgxRmax(H, y0, y0 + 0.06); dgxDeshret(H, G, y0, R, o.c != null ? o.c : 0xB0302A); dgxUraeus(H, G, R, y0 + 0.01, 0.016); };
DGX_HW.pschent = function (H, G, o) { var y0 = H.browY - 0.004, R = dgxRmax(H, y0, y0 + 0.06); dgxDeshret(H, G, y0, R, 0xB0302A, true); var Ri = R.map(function (r) { return r * 0.62; }); dgxHedjet(H, G, y0 + 0.058, Ri, 0.15, 0xF2EEE2, 0.004); dgxUraeus(H, G, R, y0 + 0.01, 0.016); };
DGX_HW.amun = function (H, G, o) { return __ZC(407, 30, this, arguments, new.target); };
DGX_HW.horndisc = function (H, G, o) { return __ZC(407, 31, this, arguments, new.target); };
DGX_HW.vulture = function (H, G, o) { return __ZC(407, 32, this, arguments, new.target); };
DGX_HW.skullcap = function (H, G, o) { G.add(dgxDome(H, H.eyeY + 0.035, 0.008, 0.004, dgxMat("gem", o.c != null ? o.c : 0x2A4AA0))); };
DGX_HW.maat = function (H, G, o) {
var y = H.browY, R = dgxRmax(H, y, y);
G.add(dgxRim(H, R, y, 0.005, 0.005, dgxMat("cloth", 0x2A4A8A)));
var p = dgxPt(H, R, DGX_BACK, y + 0.004, 0.004);
dgxFlat(G, "feather", dgxMat("feather", 0xF4F2EC), p, new THREE.Vector3(0, 1, 0.12), new THREE.Vector3(0, 0, 1), 0.21, 0.06);
};
DGX_HW.wig = function (H, G, o) { return __ZC(407, 33, this, arguments, new.target); };
DGX_HW.spangen = function (H, G, o) { return __ZC(407, 34, this, arguments, new.target); };
DGX_HW.widehat = function (H, G, o) { return __ZC(407, 35, this, arguments, new.target); };
DGX_HW.antlers = function (H, G, o) { return __ZC(407, 36, this, arguments, new.target); };
DGX_HW.horns = function (H, G, o) { return __ZC(407, 37, this, arguments, new.target); };
function dgxCapTop(H, G, R, y, gap, mat) { var cap = []; for (var k = 0; k <= 3; k++) {
(function (t) { cap.push(function (a) { return { r: (H.at(R, a) + gap) * (1 - t), y: y }; }); })(k / 3);
} G.add(new THREE.Mesh(dgxLoft(H, cap), mat)); }
function dgxCyl(H, G, y0, h, gap, mat, o) { o = o || {}; var R = o.R || dgxRmax(H, y0, y0 + Math.min(h, H.ymax - y0)); G.add(dgxBand(H, y0, h, gap, mat, { R: R, flare: o.flare || 0, rows: o.rows || 4, bulge: o.bulge || 0 })); if (o.top !== false)
dgxCapTop(H, G, R, y0 + h, gap + (o.flare || 0), o.topMat || mat); return R; }
DGX_HW.sundisc = function (H, G, o) { return __ZC(407, 38, this, arguments, new.target); };
DGX_HW.moondisc = function (H, G, o) { return __ZC(407, 39, this, arguments, new.target); };
DGX_HW.nebethet = function (H, G, o) { return __ZC(407, 40, this, arguments, new.target); };
DGX_HW.sobek = function (H, G, o) { return __ZC(407, 41, this, arguments, new.target); };
DGX_HW.stars = function (H, G, o) { return __ZC(407, 42, this, arguments, new.target); };
DGX_HW.flowers = function (H, G, o) { return __ZC(407, 43, this, arguments, new.target); };
DGX_HW.furhood = function (H, G, o) { var fm = dgxMat("fur", o.c || 0xE8E0D0); G.add(dgxDome(H, H.browY - 0.02, 0.02, 0.02, fm)); var R = dgxRmax(H, H.browY - 0.03, H.browY); G.add(dgxRim(H, R, H.browY - 0.02, 0.03, 0.018, fm)); };
DGX_HW.ade = function (H, G, o) { return __ZC(407, 44, this, arguments, new.target); };
DGX_HW.esu = function (H, G, o) { return __ZC(407, 45, this, arguments, new.target); };
DGX_HW.mariwo = function (H, G, o) { return __ZC(407, 46, this, arguments, new.target); };
DGX_HW.fila = function (H, G, o) { return __ZC(407, 47, this, arguments, new.target); };
DGX_HW.strawhood = function (H, G, o) { return __ZC(407, 48, this, arguments, new.target); };
DGX_HW.gele = function (H, G, o) { return __ZC(407, 49, this, arguments, new.target); };
DGX_HW.chiefcrown = function (H, G, o) { return __ZC(407, 50, this, arguments, new.target); };
DGX_HW.strawhat = function (H, G, o) { return __ZC(407, 51, this, arguments, new.target); };
DGX_HW.tophat = function (H, G, o) { return __ZC(407, 52, this, arguments, new.target); };
DGX_HW.headwrap = function (H, G, o) { return __ZC(407, 53, this, arguments, new.target); };
DGX_HW.bonnet = function (H, G, o) {
var cm = dgxMat("cloth", o.c != null ? o.c : 0xF0ECE2), y0 = H.browY - 0.01;
G.add(dgxDome(H, y0, 0.012, 0.04, cm, { shape: function (r, a, t) { return r * (1 + 0.55 * Math.sin(t * Math.PI * 0.9)) + 0.012 * t; } }));
var R = dgxRmax(H, y0, y0 + 0.03);
G.add(dgxRim(H, R, y0 + 0.004, 0.03, 0.008, dgxMat("cloth", 0xC9A040)));
};
DGX_HW.mianguan = function (H, G, o) { return __ZC(407, 54, this, arguments, new.target); };
DGX_HW.sheng = function (H, G, o) { return __ZC(407, 55, this, arguments, new.target); };
DGX_HW.daoguan = function (H, G, o) { return __ZC(407, 56, this, arguments, new.target); };
DGX_HW.kui = function (H, G, o) { return __ZC(407, 57, this, arguments, new.target); };
DGX_HW.fengguan = function (H, G, o) { return __ZC(407, 58, this, arguments, new.target); };
DGX_HW.guanyin = function (H, G, o) { return __ZC(407, 59, this, arguments, new.target); };
DGX_HW.guanhood = function (H, G, o) { return __ZC(407, 60, this, arguments, new.target); };
DGX_HW.futou = function (H, G, o) { return __ZC(407, 61, this, arguments, new.target); };
DGX_HW.twinbuns = function (H, G, o) { return __ZC(407, 62, this, arguments, new.target); };
DGX_HW.jingu = function (H, G, o) { var y = H.browY, R = dgxRmax(H, y, y + 0.01); G.add(dgxBand(H, y, 0.012, 0.006, dgxMat("gold"), { R: R, rows: 1 })); dgxBall(G, dgxMat("gold"), dgxPt(H, R, DGX_FRONT, y + 0.006, 0.01), 0.01, 1.4, 0.8, 0.4); };
DGX_HW.lotuscrown = function (H, G, o) { return __ZC(407, 63, this, arguments, new.target); };
DGX_HW.hokan = function (H, G, o) { return __ZC(407, 64, this, arguments, new.target); };
DGX_HW.mizura = function (H, G, o) { return __ZC(407, 65, this, arguments, new.target); };
DGX_HW.kabuto = function (H, G, o) { return __ZC(407, 66, this, arguments, new.target); };
DGX_HW.oni = function (H, G, o) {
var hm = dgxMat("fur", 0x2A2420);
G.add(dgxDome(H, H.browY - 0.03, 0.016, 0.05, hm, { shape: function (r, a, t) { return r + 0.02 * Math.abs(Math.sin(a * 5 + t * 3)); } }));
DGX_HW.horns(H, G, { kind: "goat", c: 0xE8DCC0 });
};
DGX_HW.eboshi = function (H, G, o) { return __ZC(407, 67, this, arguments, new.target); };
DGX_HW.kanmuri = function (H, G, o) { return __ZC(407, 68, this, arguments, new.target); };
DGX_HW.kirita = function (H, G, o) { return __ZC(407, 69, this, arguments, new.target); };
DGX_HW.jata = function (H, G, o) { return __ZC(407, 70, this, arguments, new.target); };
DGX_HW.kali = function (H, G, o) { var hair = dgxDome(H, H.chinY, 0.03, 0.03, dgxMat("fur", 0x0E0C10), { shape: function (r, a, t) { return r * (1.08 + 0.3 * (1 - t)) + 0.02 * Math.abs(Math.sin(a * 6)); } }); hair.userData.dgxBand = 0; hair.userData.dgxDrape = 1; G.add(hair); DGX_HW.kirita(H, G, { f: 1, low: 1 }); };
DGX_HW.flamehair = function (H, G, o) {
var R = dgxRmax(H, H.browY, H.ymax);
for (var i = 0; i < 9; i++) {
var a = DGX_FRONT + (i - 4) * 0.42, p = dgxPt(H, R, a, H.ymax - 0.03, -0.01);
dgxFlat(G, "petal", dgxMat("glow", i % 2 ? 0xFF8A2A : 0xFFC84A), p, new THREE.Vector3(0, 1, 0).add(dgxOut(a).multiplyScalar(0.15)), dgxOut(a), 0.09 + 0.03 * Math.cos((i - 4) * 0.4), 0.05);
}
};
DGX_HW.horned = function (H, G, o) { return __ZC(407, 71, this, arguments, new.target); };
DGX_HW.kidaris = function (H, G, o) { return __ZC(407, 72, this, arguments, new.target); };
DGX_HW.starcrown = function (H, G, o) { return __ZC(407, 73, this, arguments, new.target); };
DGX_HW.quetzal = function (H, G, o) { return __ZC(407, 74, this, arguments, new.target); };
DGX_HW.hummingbird = function (H, G, o) { return __ZC(407, 75, this, arguments, new.target); };
DGX_HW.tlaloc = function (H, G, o) {
var bm = dgxMat("cloth", 0x2A6AC8);
[-1, 1].forEach(function (sd) { var r = new THREE.Mesh(new THREE.TorusGeometry(0.022, 0.006, 6, 16), bm); r.position.set(H.cx + sd * 0.034, H.eyeY + 0.004, H.eyeZ + 0.01); G.add(r); });
DGX_HW.quetzal(H, G, { c: 0xF4F2EC });
};
DGX_HW.xipe = function (H, G, o) { DGX_HW.pilos(H, G, { c: 0xC0302A }); var R = dgxRmax(H, H.ymax - 0.08, H.ymax - 0.06), p = dgxPt(H, R, DGX_BACK, H.ymax - 0.06, 0.014); [-1, 1].forEach(function (sd) { dgxBox(G, dgxMat("cloth", 0xE0B030), p.clone().add(new THREE.Vector3(sd * 0.02, -0.06, -0.01)), 0.025, 0.12, 0.004, 0.15, 0, sd * 0.15); }); };
DGX_HW.mayan = function (H, G, o) { return __ZC(407, 76, this, arguments, new.target); };
DGX_HW.serpent = function (H, G, o) { return __ZC(407, 77, this, arguments, new.target); };
DGX_HW.incasun = function (H, G, o) { return __ZC(407, 78, this, arguments, new.target); };
DGX_HW.mascaypacha = function (H, G, o) { return __ZC(407, 79, this, arguments, new.target); };
DGX_HW.kokoshnik = function (H, G, o) { return __ZC(407, 80, this, arguments, new.target); };
DGX_HW.kerchief = function (H, G, o) { DGX_HW.veil(H, G, { c: o.c != null ? o.c : 0x8A2A2A, open: 0.8, drop: 0.04 }); dgxBall(G, dgxMat("cloth", o.c != null ? o.c : 0x8A2A2A), H.chin.clone().add(new THREE.Vector3(0, -0.02, 0.0)), 0.018); };
DGX_HW.feathers = function (H, G, o) { return __ZC(407, 81, this, arguments, new.target); };
DGX_HW.morningstar = function (H, G, o) { return __ZC(407, 82, this, arguments, new.target); };
DGX_HW.baphomet = function (H, G, o) { return __ZC(407, 83, this, arguments, new.target); };
var DGX_OLDGEO = ["wreath", "nemes", "lappet", "mukuta", "guan", "kanzashi", "horncap", "chorn", "gele", "kokoshnik", "plume", "spool", "bindi", "band0.142"];
function dgxListFor(spec, d) {
if (!DGX.on || !d || d.dragon)
return null;
var L = lookOf(spec), S = L.src || {};
if (L.hat && S.hat && S.hat !== "tradition")
return null;
var list = dgxWearOf(d);
if (!list)
return null;
return list.filter(function (q) { return DGX_HW[q[0]]; });
}
var DGX_SIGNS = /^(crown|crownwhite|crownred|helmet|wingedhelm|cap|hat|laurel|mooncrown|veil|hood|sundisc|horns|antlers|cowhorns|feather|plumes|halo)$/;
function dgxStripped(d) { var c = {}; for (var k in d)
c[k] = d[k]; c.icons = d.icons.filter(function (t) { return !DGX_SIGNS.test(t.split(":")[0]); }).concat(["dgxhat"]); return c; }
if (typeof HEADWEAR !== "undefined" && HEADWEAR.indexOf("dgxhat") < 0)
HEADWEAR.push("dgxhat");
function dgxKitExtras(body, kit) { return __ZC(407, 84, this, arguments, new.target); }
function dgxKitDress(g, spec, d, list) { return __ZC(407, 85, this, arguments, new.target); }
var DGX_KITHAIR = /^(haircap|hairlong|bun|tail|afro|coily|locs|braid|braidband|buzzcap|waves|wrap|wrapknot|curly)$/;
var DGX_COVERS = { nemes: 1, wig: 1, skullcap: 1, hood: 1, strawhood: 1, furhood: 1, headwrap: 1, kerchief: 1, guanhood: 1, gele: 1, mianguan: 0, kabuto: 1, spangen: 0 };
function dgxBuild(H, list, d, L, kit) { return __ZC(407, 86, this, arguments, new.target); }
(function () {
if (typeof buildDeity !== "function")
return;
var bd = buildDeity;
buildDeity = function (spec, f) {
var d = spec && spec.deity && typeof DEITY !== "undefined" ? DEITY[spec.deity] : null, list = null;
try {
list = d && !d.dragon ? dgxListFor(spec, d) : null;
}
catch (e) {
list = null;
}
if (!list)
return bd.apply(this, arguments);
var L = lookOf(spec), hadHat = L.hat;
try {
dgxLookTweak(L, d);
}
catch (e) { }
if (!L.src || !L.src.hat || L.src.hat === "tradition")
L.hat = "none";
var key = d.key, orig = DEITY[key], g;
DEITY[key] = dgxStripped(orig);
try {
g = bd.apply(this, arguments);
}
finally {
DEITY[key] = orig;
}
try {
if (hasIcon(orig, "wings"))
dgxWings(g);
}
catch (e) { }
try {
dgxKitDress(g, spec, orig, list);
}
catch (e) {
DGX.fails++;
if (window.console)
console.warn("[deity looks]", e);
}
return g;
};
})();
function dgxHdWear(E) {
if (!E || !E.model || !E.spec || !E.spec.deity || E.dgxFit)
return;
var list = E.g && E.g.userData.dgxList;
if (!list)
return;
var d = DEITY[E.spec.deity];
if (!d)
return;
E.dgxHid = [];
E.g.traverse(function (m) { if (m.userData && m.userData.dgxKitHw && m.visible && (m.isGroup || m.isMesh) && m.name === "dgx-headwear") {
m.visible = false;
E.dgxHid.push(m);
} });
(E.icons || []).forEach(function (r) { var o = r.o; if (o.visible && o.parent && /head/i.test(o.parent.name || "") && !o.userData.dpAureole && !o.userData.dgxKitHw) {
o.visible = false;
E.dgxHid.push(o);
} });
if (!list.length)
return;
var H = dgxHeadHd(E);
if (!H)
return;
var b = dgxBuild(H, list, d, lookOf(E.spec), false);
E.dgxFit = H.G;
DGX.fits++;
if (DGX.keepH)
E.dgxH = H;
if (b.hair)
E.model.traverse(function (m) { if (m.isMesh && m.userData.hdfHair && m.visible) {
m.visible = false;
E.dgxHid.push(m);
} });
}
function dgxHdOff(E) { return __ZC(407, 87, this, arguments, new.target); }
(function () {
if (typeof hdfAttach !== "function" || typeof hdfDetach !== "function")
return;
var ha = hdfAttach;
hdfAttach = function (E) { var r = ha.apply(this, arguments); try {
dgxHdWear(E);
}
catch (e) {
DGX.fails++;
if (window.console)
console.warn("[deity looks]", e);
} return r; };
var hd = hdfDetach;
hdfDetach = function (E) { try {
dgxHdOff(E);
}
catch (e) { } return hd.apply(this, arguments); };
})();
function dgxWings(g) { return __ZC(407, 88, this, arguments, new.target); }
var DGX_SHORTHAIR = { Yoruba: 1, Akan: 1, Vodou: 1 };
function dgxLookTweak(L, d) { return __ZC(407, 89, this, arguments, new.target); }
(function () {
if (typeof deityLookMore !== "function")
return;
var dm = deityLookMore;
deityLookMore = function (spec, d) { var r = dm.apply(this, arguments); try {
if (d && !d.dragon && DGX.on)
dgxLookTweak(lookOf(spec), DEITY[d.key] || d);
}
catch (e) { } return r; };
})();
function dgxFitOf(H, G) { return __ZC(407, 90, this, arguments, new.target); }
var DGX_STUFF = {
linen: function (x, W, H) { x.fillStyle = "#F4F4F4"; x.fillRect(0, 0, W, H); for (var i = 0; i < W; i += 4) {
x.fillStyle = "rgba(0,0,0,.09)";
x.fillRect(i, 0, 1, H);
x.fillStyle = "rgba(255,255,255,.35)";
x.fillRect(i + 2, 0, 1, H);
} },
silk: function (x, W, H) { return __ZC(407, 91, this, arguments, new.target); },
fur: function (x, W, H) { x.fillStyle = "#E0E0E0"; x.fillRect(0, 0, W, H); for (var i = 0; i < 1400; i++) {
x.fillStyle = "rgba(0,0,0," + (Math.random() * 0.16) + ")";
x.fillRect(Math.random() * W, Math.random() * H, 1, 5);
x.fillStyle = "rgba(255,255,255," + (Math.random() * 0.18) + ")";
x.fillRect(Math.random() * W, Math.random() * H, 1, 4);
} },
scales: function (x, W, H) { x.fillStyle = "#D8D8D8"; x.fillRect(0, 0, W, H); for (var j = 0; j < H; j += 8)
for (var i = 0; i < W; i += 8) {
x.strokeStyle = "rgba(0,0,0,.3)";
x.beginPath();
x.arc(i + ((j / 8) % 2) * 4, j, 5, 0, Math.PI);
x.stroke();
} },
fleece: function (x, W, H) { x.fillStyle = "#E8E8E8"; x.fillRect(0, 0, W, H); for (var j = 0; j < H; j += 10)
for (var i = 0; i < W; i += 4) {
x.fillStyle = "rgba(0,0,0," + (0.08 + Math.random() * 0.1) + ")";
x.beginPath();
x.moveTo(i, j);
x.lineTo(i + 2, j + 9);
x.lineTo(i + 4, j);
x.fill();
} },
straw: function (x, W, H) { x.fillStyle = "#F0F0F0"; x.fillRect(0, 0, W, H); for (var i = 0; i < W; i += 2) {
x.fillStyle = "rgba(60,40,0," + (0.08 + Math.random() * 0.18) + ")";
x.fillRect(i, 0, 1, H);
} },
feather: function (x, W, H) { x.fillStyle = "#EAEAEA"; x.fillRect(0, 0, W, H); for (var j = 0; j < H; j += 12)
for (var i = 0; i < W; i += 10) {
x.fillStyle = "rgba(0,0,0,.18)";
x.beginPath();
x.ellipse(i + ((j / 12) % 2) * 5, j + 6, 5, 9, 0, 0, Math.PI * 2);
x.fill();
x.fillStyle = "rgba(255,255,255,.4)";
x.fillRect(i + ((j / 12) % 2) * 5, j, 1, 10);
} },
tiger: function (x, W, H) { x.fillStyle = "#E8A040"; x.fillRect(0, 0, W, H); for (var i = 0; i < 9; i++) {
x.fillStyle = "#1A1410";
x.beginPath();
var y = i * 15 + 3;
x.moveTo(0, y);
x.quadraticCurveTo(W / 2, y + 8, W, y - 2);
x.lineTo(W, y + 3);
x.quadraticCurveTo(W / 2, y + 11, 0, y + 5);
x.fill();
} },
kente: function (x, W, H) { return __ZC(407, 92, this, arguments, new.target); },
brocade: function (x, W, H) { x.fillStyle = "#E8E8E8"; x.fillRect(0, 0, W, H); x.strokeStyle = "rgba(120,80,0,.55)"; x.lineWidth = 2; for (var j = 0; j < 4; j++)
for (var i = 0; i < 4; i++) {
var cx = i * 32 + ((j % 2) * 16) + 16, cy = j * 32 + 16;
x.beginPath();
x.arc(cx, cy, 8, 0, Math.PI * 1.5);
x.stroke();
x.beginPath();
x.arc(cx + 6, cy - 4, 4, 0, Math.PI * 2);
x.stroke();
} },
tocapu: function (x, W, H) { var c = ["#C0201E", "#E0B020", "#1A1A1A", "#F0E8D8", "#2A4AA0", "#2A8A3A"]; for (var j = 0; j < 8; j++)
for (var i = 0; i < 8; i++) {
x.fillStyle = c[(i * 3 + j) % c.length];
x.fillRect(i * 16 + 1, j * 16 + 1, 14, 14);
x.fillStyle = c[(i + j * 5 + 2) % c.length];
x.fillRect(i * 16 + 5, j * 16 + 5, 6, 6);
} },
embroid: function (x, W, H) { x.fillStyle = "#F0F0F0"; x.fillRect(0, 0, W, H); x.fillStyle = "#B0201E"; for (var i = 0; i < W; i += 16) {
x.beginPath();
x.moveTo(i, H - 30);
x.lineTo(i + 8, H - 40);
x.lineTo(i + 16, H - 30);
x.lineTo(i + 8, H - 20);
x.fill();
} x.fillRect(0, H - 14, W, 6); },
leaf: function (x, W, H) { x.fillStyle = "#D8D8D8"; x.fillRect(0, 0, W, H); for (var j = 0; j < H; j += 14)
for (var i = 0; i < W; i += 12) {
x.fillStyle = "rgba(0,0,0," + (0.1 + Math.random() * 0.15) + ")";
x.beginPath();
x.ellipse(i + ((j / 14) % 2) * 6, j + 7, 5, 10, 0.4, 0, Math.PI * 2);
x.fill();
} },
stripe: function (x, W, H) { x.fillStyle = "#F0F0F0"; x.fillRect(0, 0, W, H); for (var i = 0; i < W; i += 16) {
x.fillStyle = "rgba(0,0,0,.3)";
x.fillRect(i, 0, 6, H);
} },
usekh: function (x, W, H) { var c = ["#C9A040", "#2A4AA0", "#C9A040", "#C0302A", "#C9A040", "#2A8A6A"]; for (var j = 0; j < H; j += 8) {
x.fillStyle = c[(j / 8) % c.length];
x.fillRect(0, j, W, 8);
x.fillStyle = "rgba(0,0,0,.25)";
for (var i = 0; i < W; i += 6)
x.fillRect(i, j, 1, 8);
} }
};
(function () { if (typeof WH_STUFF === "undefined")
return; Object.keys(DGX_STUFF).forEach(function (k) { if (!WH_STUFF[k])
WH_STUFF[k] = function () { return whCanvas(k, 128, 128, DGX_STUFF[k]); }; }); })();
var DGX_OWNCOL = { kente: 1, tocapu: 1, usekh: 1, tiger: 1 };
var DGX_DRESS = {
himation: [["bare"], ["skirt", { c: "c1", k: "linen", to: "ankle", from: "hip" }], ["drape", { c: "c1", k: "linen", w: 0.2, low: true }], ["sandals"]],
peplos: [["top", { c: "c1", k: "linen", sl: 0 }], ["skirt", { c: "c1", k: "linen", flare: 0.12 }], ["overfold", { c: "c1", k: "linen" }], ["belt", { c: "c4" }], ["drape", { c: "c2", k: "linen", w: 0.16 }], ["sandals"]],
aegis: [["top", { c: "c1", k: "linen", sl: 0 }], ["skirt", { c: "c1", k: "linen", flare: 0.12 }], ["overfold", { c: "c1", k: "linen" }], ["belt", { c: "c4" }], ["aegis"], ["sandals"]],
"chiton-short": [["top", { c: "c1", k: "linen", sl: 0 }], ["skirt", { c: "c1", k: "linen", to: "knee", flare: 0.06 }], ["belt", { c: "c4" }], ["drape", { c: "c2", k: "cloth", w: 0.08 }], ["boots"]],
"armour-greek": [["top", { c: "c4", k: "gold", sl: 0, len: "waist" }], ["pteruges", { c: "c3" }], ["skirt", { c: "c1", k: "linen", to: "knee", flare: 0.05 }], ["cape", { c: "c2" }], ["sandals"]],
exomis: [["top", { c: "c1", k: "cloth", sl: 0 }], ["skirt", { c: "c1", k: "cloth", to: "knee", flare: 0.05 }], ["belt", { c: "c3" }], ["sandals"]],
chlamys: [["top", { c: "c1", k: "linen", sl: 0 }], ["skirt", { c: "c1", k: "linen", to: "knee", flare: 0.05 }], ["belt", { c: "c3" }], ["cape", { c: "c2" }], ["sandals"]],
pelt: [["bare"], ["skirt", { c: "c2", k: "fur", to: "knee", from: "hip", flare: 0.04 }], ["sandals"]],
toga: [["top", { c: "c1", k: "cloth", sl: 0.35 }], ["skirt", { c: "c1", k: "cloth", flare: 0.08 }], ["drape", { c: "c1", k: "cloth", w: 0.26, low: true }], ["sandals"]],
stola: [["top", { c: "c1", k: "linen", sl: 0.9 }], ["skirt", { c: "c1", k: "linen", flare: 0.12 }], ["belt", { c: "c4" }], ["drape", { c: "c2", k: "cloth", w: 0.2 }], ["sandals"]],
"armour-roman": [["top", { c: "c4", k: "gold", sl: 0, len: "waist" }], ["pteruges", { c: "c3" }], ["skirt", { c: "c1", k: "cloth", to: "knee", flare: 0.05 }], ["cape", { c: "c2" }], ["boots"]],
shendyt: [["bare"], ["skirt", { c: "c1", k: "linen", to: "knee", from: "waist", flare: 0.07 }], ["belt", { c: "c4" }], ["usekh"], ["bands"], ["sandals"]],
mummy: [["top", { c: "c1", k: "linen", sl: 0.95 }], ["skirt", { c: "c1", k: "linen", flare: 0.02 }], ["usekh"], ["belt", { c: "c2" }]],
kalasiris: [["top", { c: "c1", k: "linen", sl: 0 }], ["skirt", { c: "c1", k: "linen", flare: 0.05 }], ["usekh"], ["bands"], ["sandals"]],
"norse-cloak": [["top", { c: "c1", k: "knit", sl: 1 }], ["skirt", { c: "c1", k: "cloth", to: "knee", flare: 0.06 }], ["belt", { c: "leather" }], ["trousers", { c: "c3" }], ["cape", { c: "c2", cloak: 1 }], ["boots"]],
"apron-dress": [["top", { c: "c3", k: "linen", sl: 1 }], ["skirt", { c: "c3", k: "linen", flare: 0.08 }], ["apron", { c: "c1" }], ["brooches"], ["boots"]],
"norse-tunic": [["top", { c: "c1", k: "knit", sl: 1 }], ["skirt", { c: "c1", k: "cloth", to: "knee", flare: 0.05 }], ["belt", { c: "leather" }], ["trousers", { c: "c3" }], ["boots"]],
mail: [["top", { c: "steel", k: "scales", sl: 0.5 }], ["skirt", { c: "steel", k: "scales", to: "thigh", flare: 0.04 }], ["belt", { c: "leather" }], ["trousers", { c: "c3" }], ["cape", { c: "c1" }], ["boots"]],
"falcon-cloak": [["top", { c: "c1", k: "linen", sl: 1 }], ["skirt", { c: "c1", k: "linen", flare: 0.1 }], ["belt", { c: "c4" }], ["cape", { c: "feather", cloak: 1 }], ["brooches"]],
furs: [["top", { c: "c1", k: "knit", sl: 1 }], ["skirt", { c: "c1", k: "cloth", to: "knee", flare: 0.06 }], ["belt", { c: "leather" }], ["trousers", { c: "c3" }], ["cape", { c: "fur", cloak: 1 }], ["boots"]],
agbada: [["top", { c: "c1", k: "silk", sl: 0.95, bell: 0.22 }], ["skirt", { c: "c1", k: "silk", flare: 0.16 }], ["neckwork", { c: "c3" }], ["beads"], ["sandals"]],
"wrapper-m": [["bare"], ["skirt", { c: "c1", k: "cloth", to: "calf", from: "waist", flare: 0.05 }], ["sash", { c: "c2" }], ["beads"], ["bands"]],
iro: [["top", { c: "c2", k: "silk", sl: 0.5 }], ["skirt", { c: "c1", k: "silk", flare: 0.08 }], ["sash", { c: "c3" }], ["beads"], ["sandals"]],
straw: [["top", { c: "c1", k: "cloth", sl: 0.4 }], ["skirt", { c: "straw", k: "straw", flare: 0.14 }], ["beads"]],
kente: [["bare"], ["skirt", { c: "white", k: "kente", flare: 0.08, from: "hip" }], ["drape", { c: "white", k: "kente", w: 0.24, low: true }], ["beads", { gold: 1 }], ["sandals"]],
"coat-old": [["top", { c: "c1", k: "cloth", sl: 1 }], ["skirt", { c: "c1", k: "cloth", to: "knee", flare: 0.1 }], ["trousers", { c: "c3" }], ["belt", { c: "leather" }], ["boots"]],
gown: [["top", { c: "c1", k: "silk", sl: 0.4 }], ["skirt", { c: "c1", k: "silk", flare: 0.16 }], ["belt", { c: "c4" }], ["beads", { gold: 1 }], ["sandals"]],
tails: [["top", { c: "c1", k: "cloth", sl: 1 }], ["skirt", { c: "c1", k: "cloth", to: "knee", flare: 0.06 }], ["trousers", { c: "c1" }], ["boots"]],
"coat-red": [["top", { c: "c1", k: "cloth", sl: 1 }], ["skirt", { c: "c1", k: "cloth", to: "thigh", flare: 0.05 }], ["belt", { c: "c4" }], ["trousers", { c: "c3" }], ["boots"]],
leine: [["top", { c: "c1", k: "linen", sl: 1, bell: 0.06 }], ["skirt", { c: "c1", k: "linen", to: "knee", flare: 0.08 }], ["belt", { c: "leather" }], ["cape", { c: "c2", cloak: 1 }], ["torc"], ["sandals"]],
brat: [["top", { c: "c1", k: "linen", sl: 1 }], ["skirt", { c: "c1", k: "linen", flare: 0.12 }], ["belt", { c: "c4" }], ["cape", { c: "c2", cloak: 1 }], ["torc"]],
cernunnos: [["top", { c: "c1", k: "stripe", sl: 1 }], ["skirt", { c: "c1", k: "stripe", to: "thigh", flare: 0.03 }], ["trousers", { c: "c1" }], ["belt", { c: "leather" }], ["torc"]],
leaves: [["bare"], ["skirt", { c: "leaf", k: "leaf", to: "knee", from: "waist", flare: 0.08 }], ["cape", { c: "leaf" }]],
dragonrobe: [["top", { c: "c1", k: "brocade", sl: 1, bell: 0.2 }], ["skirt", { c: "c1", k: "brocade", flare: 0.12 }], ["crossneck", { c: "c3" }], ["belt", { c: "jade" }]],
hanfu: [["top", { c: "c1", k: "silk", sl: 1, bell: 0.22 }], ["skirt", { c: "c2", k: "silk", flare: 0.16 }], ["crossneck", { c: "c3" }], ["belt", { c: "c3" }]],
"hanfu-white": [["top", { c: "white", k: "silk", sl: 1, bell: 0.24 }], ["skirt", { c: "white", k: "silk", flare: 0.16 }], ["crossneck", { c: "c4" }], ["drape", { c: "white", k: "silk", w: 0.14 }], ["beads", { gold: 1 }]],
daopao: [["top", { c: "c1", k: "silk", sl: 1, bell: 0.24 }], ["skirt", { c: "c1", k: "silk", flare: 0.12 }], ["crossneck", { c: "c3" }], ["belt", { c: "c3" }]],
"armour-chinese": [["top", { c: "steel", k: "scales", sl: 0.5 }], ["skirt", { c: "steel", k: "scales", to: "knee", flare: 0.06 }], ["belt", { c: "c4" }], ["trousers", { c: "c1" }], ["cape", { c: "c1" }], ["boots"]],
rags: [["top", { c: "c1", k: "cloth", sl: 0.6 }], ["skirt", { c: "c1", k: "cloth", to: "calf", flare: 0.06, ragged: 1 }], ["belt", { c: "leather" }]],
"kami-robe": [["top", { c: "c1", k: "silk", sl: 1, bell: 0.16 }], ["skirt", { c: "c2", k: "silk", flare: 0.12 }], ["belt", { c: "c3" }], ["beads", { gold: 0, jade: 1 }]],
"armour-japanese": [["top", { c: "lacquer", k: "scales", sl: 0.5 }], ["skirt", { c: "lacquer", k: "scales", to: "knee", flare: 0.08 }], ["trousers", { c: "c1" }], ["belt", { c: "c4" }], ["boots"]],
oni: [["bare"], ["skirt", { c: "white", k: "tiger", to: "thigh", from: "waist", flare: 0.06 }], ["sash", { c: "c2" }]],
kariginu: [["top", { c: "c1", k: "silk", sl: 1, bell: 0.2 }], ["skirt", { c: "c2", k: "silk", to: "calf", flare: 0.1 }], ["belt", { c: "c3" }]],
sokutai: [["top", { c: "c1", k: "brocade", sl: 1, bell: 0.24 }], ["skirt", { c: "c1", k: "brocade", flare: 0.14 }], ["belt", { c: "c4" }]],
dhoti: [["bare"], ["skirt", { c: "c1", k: "silk", to: "ankle", from: "waist", flare: 0.05 }], ["belt", { c: "c4" }], ["drape", { c: "c2", k: "silk", w: 0.07 }], ["thread"], ["beads", { gold: 1 }], ["bands"]],
tiger: [["bare"], ["skirt", { c: "white", k: "tiger", to: "knee", from: "waist", flare: 0.05 }], ["thread"], ["beads", { rudra: 1 }]],
sari: [["top", { c: "c2", k: "silk", sl: 0.4, len: "chest" }], ["skirt", { c: "c1", k: "silk", flare: 0.1, from: "waist" }], ["drape", { c: "c1", k: "silk", w: 0.16 }], ["belt", { c: "c4" }], ["beads", { gold: 1 }], ["bands"]],
"sari-white": [["top", { c: "c2", k: "silk", sl: 0.4 }], ["skirt", { c: "white", k: "silk", flare: 0.1 }], ["drape", { c: "white", k: "silk", w: 0.16 }], ["belt", { c: "c4" }], ["beads", { gold: 1 }]],
kali: [["bare"], ["skirt", { c: "c1", k: "cloth", to: "knee", from: "waist", flare: 0.05 }]],
kaunakes: [["bare"], ["skirt", { c: "c1", k: "fleece", flare: 0.1, from: "waist" }], ["drape", { c: "c1", k: "fleece", w: 0.2, low: true }], ["belt", { c: "c4" }]],
"kaunakes-f": [["top", { c: "c1", k: "fleece", sl: 0 }], ["skirt", { c: "c1", k: "fleece", flare: 0.12 }], ["drape", { c: "c2", k: "fleece", w: 0.16 }], ["beads", { gold: 1 }]],
persian: [["top", { c: "c1", k: "silk", sl: 1, bell: 0.2 }], ["skirt", { c: "c1", k: "silk", flare: 0.14 }], ["belt", { c: "c4" }], ["beads", { gold: 1 }]],
"persian-short": [["top", { c: "c1", k: "cloth", sl: 1 }], ["skirt", { c: "c1", k: "cloth", to: "thigh", flare: 0.06 }], ["belt", { c: "c4" }], ["trousers", { c: "c3" }], ["cape", { c: "c2" }], ["boots"]],
tilmatli: [["bare"], ["skirt", { c: "c3", k: "cloth", to: "thigh", from: "waist", flare: 0.03 }], ["cape", { c: "c1" }], ["beads", { jade: 1 }], ["bands"], ["sandals"]],
huipil: [["top", { c: "c1", k: "embroid", sl: 0.3 }], ["skirt", { c: "c2", k: "cloth", flare: 0.08 }], ["beads", { jade: 1 }], ["sandals"]],
"serpent-skirt": [["top", { c: "c1", k: "embroid", sl: 0.3 }], ["skirt", { c: "serpent", k: "scales", flare: 0.1 }], ["beads", { jade: 1 }]],
maya: [["bare"], ["skirt", { c: "c3", k: "cloth", to: "thigh", from: "waist", flare: 0.03 }], ["cape", { c: "c1" }], ["beads", { jade: 1 }], ["bands"], ["sandals"]],
unku: [["top", { c: "white", k: "tocapu", sl: 0.3 }], ["skirt", { c: "white", k: "tocapu", to: "knee", flare: 0.06 }], ["cape", { c: "c1" }], ["sandals"]],
aksu: [["top", { c: "c1", k: "cloth", sl: 0 }], ["skirt", { c: "c1", k: "cloth", flare: 0.08 }], ["belt", { c: "c4" }], ["cape", { c: "c2" }], ["sandals"]],
rubakha: [["top", { c: "white", k: "embroid", sl: 1 }], ["skirt", { c: "white", k: "embroid", to: "thigh", flare: 0.05 }], ["belt", { c: "red" }], ["trousers", { c: "c3" }], ["boots"]],
sarafan: [["top", { c: "white", k: "linen", sl: 1 }], ["skirt", { c: "c1", k: "embroid", flare: 0.12, from: "chest" }], ["beads", { coral: 1 }], ["boots"]],
pau: [["top", { c: "c1", k: "cloth", sl: 0, len: "chest" }], ["skirt", { c: "c1", k: "cloth", to: "calf", flare: 0.1, from: "waist" }], ["lei"]],
malo: [["bare"], ["skirt", { c: "c1", k: "cloth", to: "thigh", from: "waist", flare: 0.04 }], ["lei"], ["cape", { c: "feather" }]],
infernal: [["top", { c: "c1", k: "silk", sl: 1, bell: 0.18 }], ["skirt", { c: "c1", k: "silk", flare: 0.14 }], ["belt", { c: "c4" }], ["cape", { c: "c2", cloak: 1 }]],
"infernal-f": [["top", { c: "c1", k: "silk", sl: 0.9, bell: 0.14 }], ["skirt", { c: "c1", k: "silk", flare: 0.16 }], ["belt", { c: "c4" }], ["cape", { c: "c2" }]]
};
var DGX_FIXED = { steel: 0x8A9098, lacquer: 0x2A1E1E, leather: 0x4A3020, white: 0xFFFFFF, straw: 0xC8A866, feather: 0x8A6A4A, fur: 0x8A7A64, leaf: 0x4A7A34, jade: 0x3AAA7A, red: 0xB0201E, serpent: 0x3A7A3A };
function dgxDressCols(d, L) { return __ZC(407, 93, this, arguments, new.target); }
function dgxEase(R, s) { return __ZC(407, 94, this, arguments, new.target); }
function dgxTube(D, pts, y0, y1, gap, prof, open, NS, hang) { return __ZC(407, 95, this, arguments, new.target); }
function dgxDressBuild(D, name) { return __ZC(407, 96, this, arguments, new.target); }
function dgxDressExtras(name) {
var out = {}, R = DGX_DRESS[name] || [];
R.forEach(function (q) { var o = q[1] || {}; if (q[0] === "cape") {
out.back = o.cloak ? "cloak" : "cape";
out.backCol = o.c;
} if (q[0] === "boots")
out.shoeKind = "boots"; if (q[0] === "sandals")
out.shoeKind = "sandals"; if (q[0] === "bare")
out.bare = true; });
return out;
}
function dgxDressOf(spec) {
if (!DGX.on || !spec || !spec.deity || typeof DEITY === "undefined")
return null;
var d = DEITY[spec.deity];
if (!d || d.dragon)
return null;
var g = DGX_GODS[d.key], name = g && g.dress;
if (!name || !DGX_DRESS[name])
return null;
return { d: d, name: name };
}
(function () {
if (typeof hdfPlan !== "function")
return;
var hp = hdfPlan;
hdfPlan = function (spec) {
var plan = hp.apply(this, arguments);
try {
var dr = dgxDressOf(spec);
if (!dr || plan.type !== "human")
return plan;
var L0 = plan.L, L = {};
for (var k in L0)
L[k] = L0[k];
var ex = dgxDressExtras(dr.name), C = dgxDressCols(dr.d, L0);
L.dgxDress = dr.name;
L.dgxCol = { dgc1: C.c1, dgc2: C.c2, dgc3: C.c3, dgc4: C.c4 };
L.layer = null;
L.topKind = "dgx";
L.bottomKind = null;
L.neck = L.ears = L.hands = L.waist = null;
L.hat = "none";
L.back = ex.back || null;
L.backColor = ex.back ? (DGX_FIXED[ex.backCol] != null ? DGX_FIXED[ex.backCol] : C[ex.backCol] || C.c2) : null;
L.shoeKind = ex.shoeKind || null;
L.shoes = ex.shoeKind === "boots" ? 0x4A3020 : L0.shoes;
L.dgxBare = !!ex.bare;
plan.L = L;
plan.parts = plan.parts.filter(function (p) { return !/outfit-/.test(p); });
plan.files = [plan.body].concat(plan.parts).concat([HDF_CLIPS.human.from]);
plan.key = [plan.body].concat(plan.parts).join("|") + ":" + L.skin + ":" + L.hair + ":dgx:" + dr.name;
}
catch (e) {
if (window.console)
console.warn("[deity dress]", e);
}
return plan;
};
})();
(function () {
if (typeof whWants !== "function" || typeof whBuild !== "function" || typeof whCol !== "function")
return;
var ww = whWants;
whWants = function (L) { if (L && L.dgxDress) {
var w = ["dg:" + L.dgxDress];
if (L.back === "cloak")
w.push("cloakhood");
if (L.shoeKind)
w.push(L.shoeKind);
return w;
} return ww.apply(this, arguments); };
var wb = whBuild;
whBuild = function (D, id) { if (typeof id === "string" && id.indexOf("dg:") === 0)
return dgxDressBuild(D, id.slice(3)); return wb.apply(this, arguments); };
var wc = whCol;
whCol = function (role, L) { if (typeof role === "string" && L && L.dgxCol && L.dgxCol[role] != null)
return L.dgxCol[role]; return wc.apply(this, arguments); };
var wl = whBareLegs;
whBareLegs = function (L, w) { if (L && L.dgxDress)
return false; return wl.apply(this, arguments); };
})();
function dgxWholeGeo(m) { return __ZC(407, 97, this, arguments, new.target); }
function dgxHdDress(E) {
if (!E || !E.model || !E.plan || !E.plan.L || !E.plan.L.dgxDress)
return;
var st = E.dgxDr = { hid: [] };
var body = E.g.children[0];
if (body)
body.traverse(function (m) {
if (!m.isMesh || !m.visible || m.userData.hdf)
return;
if (m.userData.part === "robe" || (m.userData.dl === 1 && m.parent === body && !m.userData.dgxKitHw)) {
m.visible = false;
st.hid.push(m);
}
});
}
function dgxHdUndress(E) { var st = E && E.dgxDr; if (!st)
return; E.dgxDr = null; st.hid.forEach(function (m) { m.visible = true; }); }
(function () {
if (typeof hdfAssemble !== "function")
return;
var ha = hdfAssemble;
hdfAssemble = function (plan, files) {
var A = ha.apply(this, arguments);
try {
if (plan && plan.L && plan.L.dgxDress && A && A.root)
A.root.traverse(function (m) { if (m.isSkinnedMesh && /Superhero/i.test(m.name)) {
var g = dgxWholeGeo(m);
if (g)
m.geometry = g;
} });
}
catch (e) {
if (window.console)
console.warn("[deity dress]", e);
}
return A;
};
})();
(function () {
if (typeof hdfAttach !== "function" || typeof hdfDetach !== "function")
return;
var ha = hdfAttach;
hdfAttach = function (E) { var r = ha.apply(this, arguments); try {
dgxHdDress(E);
}
catch (e) {
DGX.fails++;
if (window.console)
console.warn("[deity dress]", e);
} return r; };
var hd = hdfDetach;
hdfDetach = function (E) { try {
dgxHdUndress(E);
}
catch (e) { } return hd.apply(this, arguments); };
})();
function dgxEgg(G, m, p, sx, sy, sz, rx) { var o = dgxBall(G, m, p, 1, sx, sy, sz); if (rx)
o.rotation.x = rx; return o; }
function dgxWigBack(G, col) { return __ZC(407, 98, this, arguments, new.target); }
function dgxEye(G, p, col) { return __ZC(407, 99, this, arguments, new.target); }
var DGX_HEADS = {
falcon: function () { return __ZC(407, 100, this, arguments, new.target); },
ibis: function () { return __ZC(407, 101, this, arguments, new.target); },
jackal: function () { return __ZC(407, 102, this, arguments, new.target); },
lion: function () { return __ZC(407, 103, this, arguments, new.target); },
cat: function () { return __ZC(407, 104, this, arguments, new.target); },
croc: function () { return __ZC(407, 105, this, arguments, new.target); },
hippo: function () { return __ZC(407, 106, this, arguments, new.target); },
setanimal: function () { return __ZC(407, 107, this, arguments, new.target); }
};
(function () { if (typeof HEADS === "undefined")
return; Object.keys(DGX_HEADS).forEach(function (k) { var f = DGX_HEADS[k]; HEADS[k] = function () { var G = f(); G.userData.dgxBrow = 0.065; return G; }; }); })();
