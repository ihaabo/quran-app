const surahSelect = document.getElementById("surahSelect");
const loadBtn = document.getElementById("loadBtn");
const readBtn = document.getElementById("readBtn");
const surahDisplay = document.getElementById("surahDisplay");
const translationDisplay = document.getElementById("translationDisplay");

const reader = new SpeechSynthesisUtterance();
reader.lang = 'ar-SA';

let surahs = [];

// Laad lijst met surahs
fetch("https://api.quran.com/v4/chapters")
  .then(res => res.json())
  .then(data => {
    surahs = data.chapters;
    surahs.forEach(surah => {
      const option = document.createElement("option");
      option.value = surah.id;
      option.text = `${surah.id}. ${surah.name_arabic} (${surah.name_simple})`;
      surahSelect.appendChild(option);
    });
  });

loadBtn.onclick = () => {
  const id = surahSelect.value;
  if (!id) return alert("Kies een Surah!");

  // Arabisch
  fetch(`https://api.quran.com/v4/quran/verses?chapter_number=${id}&language=ar`)
    .then(res => res.json())
    .then(data => {
      surahDisplay.innerHTML = data.verses.map(v => v.text_uthmani).join("<br><br>");
    });

  // Nederlands
  fetch(`https://api.quran.com/v4/quran/translations/198?chapter_number=${id}`)
    .then(res => res.json())
    .then(data => {
      translationDisplay.innerHTML = data.translations.map(t => t.text).join("<br><br>");
    });
};

readBtn.onclick = () => {
  if (surahDisplay.innerText === "") return alert("Laad eerst een Surah!");

  reader.text = surahDisplay.innerText;
  speechSynthesis.speak(reader);
};
