
const ayat = [
    {
        arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        translation: "In de naam van Allah, de Meest Barmhartige, de Meest Genadevolle"
    },
    {
        arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        translation: "Alle lof zij Allah, de Heer van de werelden"
    },
    {
        arabic: "الرَّحْمَٰنِ الرَّحِيمِ",
        translation: "De Meest Barmhartige, de Meest Genadevolle"
    }
];

let index = 0;

function updateAyah() {
    document.getElementById("arabic").innerText = ayat[index].arabic;
    document.getElementById("translation").innerText = ayat[index].translation;
}

function nextAyah() {
    if (index < ayat.length - 1) {
        index++;
        updateAyah();
    }
}

function prevAyah() {
    if (index > 0) {
        index--;
        updateAyah();
    }
}

function readAyah() {
    const utterance = new SpeechSynthesisUtterance(ayat[index].translation);
    utterance.lang = "nl-NL";
    speechSynthesis.speak(utterance);
}

updateAyah();
