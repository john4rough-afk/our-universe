(() => {
  "use strict";

  // Независимые наборы данных: каждый запуск собирает историю из новых деталей.
  const DATA = {
    names: [
      "Вселенная K-{code}", "Ksenia Prime · {code}", "Система Двух Чаёв · {code}",
      "Галактика «Ну ещё пять минут»", "Сектор Любытинова · {code}", "Вселенная 8½ · {code}",
      "Туманность «Домой пораньше»", "Космос имени Ксюши · {code}", "Объединение Кухня—Галактика · {code}",
      "Маленькая вселенная больших планов", "Созвездие «Мы разберёмся» · {code}", "Орбита № Любимый · {code}",
      "Республика Тёплых Носочков", "Галактический район: Уютный"
    ],
    planets: ["Ксюша", "Латте", "Уют", "Пижама", "Котострофа", "Вечерняя", "Плед", "Карамель", "Суббота", "Петербург"],
    climates: ["уютный", "мягко-кофейный", "вечное золотое лето", "пледовый", "с легкой вероятностью пиццы", "спокойный, но с сюрпризами", "тёплый снаружи и внутри", "переменная милота"],
    populations: ["2 человека + неизвестное количество котов", "2 человека и один общий плед", "2 человека, коты пока не переписаны", "2 исследователя и 0 срочных дел", "2 человека, 1 чайник, много планов", "2 человека + наблюдатель в пушистой шубе", "ровно столько, сколько нужно для обнимашки"],
    resources: ["объятия", "кофе и хорошие идеи", "взаимное понимание", "свободный вечер", "пицца", "смех", "необъяснимый запас сил", "пледы с видом на космос", "время вдвоём"],
    laws: [
      "Если Ксюша говорит «ещё пять минут», часы переходят в режим декора.",
      "Тёплая еда исчезает быстрее, чем её успевают сфотографировать.",
      "Расстояние до дома обратно пропорционально желанию гулять ещё.",
      "Любой план становится лучше после фразы «а давай возьмём кофе».",
      "Когда оба говорят «мне всё равно», выбор ресторана занимает ещё 40 минут.",
      "Один плед способен отменить экспедицию по меньшей мере у двух взрослых.",
      "Вещи, оставленные «на минутку», получают право на постоянное проживание.",
      "Чем вкуснее пицца, тем меньше вероятность, что останется второй кусок.",
      "Если Ксюша улыбается, локальное настроение повышается без видимой причины.",
      "У кота есть право вето на любой свободный участок дивана.",
      "Навигатор может пересчитать путь, но не соскучиться за исследователя.",
      "Все приключения начинаются с «мы только ненадолго».",
      "Тревожная мысль теряет массу, если поделить её на двоих.",
      "Последняя серия автоматически превращается ещё в одну серию."
    ],
    artifacts: [
      { icon: "☕", name: "Бесконечная чашка кофе", description: "Запас пополняется всякий раз, когда кто-нибудь говорит: «Ну, давай ещё немножко посидим»." },
      { icon: "🛋️", name: "Легендарный диван", description: "Место силы. Удерживает двух человек и любое количество отложенных планов." },
      { icon: "🎧", name: "Наушники абсолютной тишины", description: "Отключают внешний шум, но не просьбу поставить любимую песню ещё раз." },
      { icon: "📖", name: "Книга, которую никто не дочитал", description: "Каждый раз начинается с первой страницы и всё равно считается прекрасным вечером." },
      { icon: "🐱", name: "Кот Шрёдингера", description: "Одновременно спит, требует ужин и уже занял половину вселенной." },
      { icon: "🍕", name: "Пицца вечного запаса", description: "Парадоксально исчезает быстрее, чем успевает остыть." },
      { icon: "🧦", name: "Парные носки с орбиты", description: "Редкое доказательство, что некоторые вещи всё-таки умеют находить друг друга." },
      { icon: "🗺️", name: "Карта спонтанных прогулок", description: "Показывает путь к красивому месту. Домой ведёт только по запросу." },
      { icon: "🫖", name: "Чайник дальнего действия", description: "Собирает всех обитателей галактики на кухне одним тихим щелчком." }
    ],
    forecasts: [
      { title: "Стабильность подтверждена", text: "Эта вселенная просуществует не менее {years} лет. Большую часть времени здесь будет хорошо.", threats: ["Совместное решение «а давай ещё куда-нибудь сходим».", "Неожиданно уютный плед и отменённые планы.", "Кот, у которого возникли встречные предложения."] },
      { title: "Вероятны приключения", text: "В ближайшие {years} лет ожидается несколько спонтанных маршрутов и удачных поворотов.", threats: ["Фраза «мы только посмотрим» возле магазина.", "Алексей, который уже открыл карту.", "Кофейня, оказавшаяся по пути. Опять."] },
      { title: "Уютный прогноз", text: "На горизонте — много спокойных вечеров. Срок действия: примерно {years} лет, возможны продления.", threats: ["Последняя серия, которая не была последней.", "Пицца, заказанная «на двоих, но с запасом».", "Кто-то сказал «давай ещё пять минут»."] },
      { title: "Параметры слегка дрейфуют", text: "Вселенная будет расширяться ещё {years} лет. Точные границы планов не установлены.", threats: ["Очень хорошая идея, пришедшая поздно вечером.", "Погода, которая выглядит как повод остаться дома.", "Вопрос «а что если?..» без установленного лимита."] },
      { title: "Обнаружена долгая орбита", text: "Местная система рассчитана на {years} лет взаимной поддержки и небольших чудес.", threats: ["Скучание, действующее на любом расстоянии.", "Планы, которые приятнее выполнять вместе.", "Избыточное количество поводов для обнимашки."] }
    ],
    rareNotes: [
      "В этой реальности все дороги каким-то образом приводят к человеку, с которым и так хочется быть рядом.",
      "Редкая конфигурация: даже случайные дни здесь выглядят как хорошие воспоминания.",
      "Астрономы не нашли края у этой вселенной. Алексей считает, что это к лучшему.",
      "Уровень совпадения траекторий превышает расчётный. Объект Ксюша просит не делать из этого сенсацию."
    ]
  };
  const RARE_CHANCE = 0.05;
  const $ = (id) => document.getElementById(id);
  const history = [];
  let previousSignature = "";

  function pick(list) { return list[Math.floor(Math.random() * list.length)]; }
  function sample(list, count) {
    const copy = list.slice();
    for (let i = copy.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; }
    return copy.slice(0, count);
  }
  function classifyChaos(value) {
    if (value <= 25) return "подозрительно спокойно";
    if (value <= 50) return "всё под контролем";
    if (value <= 75) return "начинается веселье";
    return "Алексей опять что-то придумал";
  }
  function generateUniverse() {
    const code = String(10 + Math.floor(Math.random() * 990)).padStart(3, "0");
    const chaos = 1 + Math.floor(Math.random() * 100);
    const cozy = 1 + Math.floor(Math.random() * 100);
    const planetBase = pick(DATA.planets);
    const lawCount = 2 + Math.floor(Math.random() * 2);
    const forecast = pick(DATA.forecasts);
    const rare = Math.random() < RARE_CHANCE;
    const result = {
      name: pick(DATA.names).replaceAll("{code}", code), code,
      planet: `${planetBase}-${1 + Math.floor(Math.random() * 9)}`,
      glyph: pick(["✳", "✧", "◈", "☾", "✦"]),
      climate: pick(DATA.climates), population: pick(DATA.populations),
      gravity: 82 + Math.floor(Math.random() * 32), resource: pick(DATA.resources),
      chaos, chaosLabel: classifyChaos(chaos), cozy,
      laws: sample(DATA.laws, lawCount), artifact: pick(DATA.artifacts),
      forecastTitle: forecast.title,
      forecast: forecast.text.replace("{years}", String((30 + Math.floor(Math.random() * 970)) * 10)),
      threat: pick(forecast.threats), rare, rareNote: rare ? pick(DATA.rareNotes) : ""
    };
    const signature = `${result.name}|${result.planet}|${result.chaos}|${result.cozy}|${result.artifact.name}|${result.laws.join("/")}`;
    if (signature === previousSignature) return generateUniverse();
    previousSignature = signature;
    return result;
  }
  function fillSegments(element, value) {
    element.replaceChildren();
    for (let i = 0; i < 10; i++) {
      const segment = document.createElement("i");
      if (i < Math.ceil(value / 10)) segment.className = "active";
      element.append(segment);
    }
  }
  function render(result) {
    $("intro").classList.add("hidden");
    const panel = $("universe");
    panel.classList.remove("hidden");
    panel.classList.add("generating");
    window.setTimeout(() => panel.classList.remove("generating"), 650);
    $("world-name").textContent = result.name;
    $("world-code").textContent = `X=${String(Math.floor(Math.random() * 90) + 10)} · Y=${String(Math.floor(Math.random() * 90) + 10)} · ${result.code}`;
    $("rare-banner").classList.toggle("hidden", !result.rare);
    if (result.rare) $("rare-banner").querySelector("small").textContent = `Шанс на одно создание — ${Math.round(RARE_CHANCE * 100)}%, то есть примерно 1 к ${Math.round(1 / RARE_CHANCE)}. ${result.rareNote}`;
    $("planet-name").textContent = `Планета ${result.planet}`;
    $("planet-glyph").textContent = result.glyph;
    $("planet-globe").style.filter = `hue-rotate(${Math.floor(Math.random() * 50) - 20}deg)`;
    $("climate").textContent = result.climate;
    $("population").textContent = result.population;
    $("gravity").textContent = result.gravity;
    $("resource").textContent = result.resource;
    $("chaos-value").textContent = `${result.chaos}%`;
    $("chaos-label").textContent = result.chaosLabel;
    $("cozy-value").textContent = `${result.cozy}%`;
    $("cozy-label").textContent = result.cozy > 82 ? "МОЖНО ОСТАТЬСЯ НАВСЕГДА" : result.cozy > 53 ? "УЖЕ ХОРОШО" : "НУЖЕН ПЛЕД";
    fillSegments($("chaos-segments"), result.chaos);
    fillSegments($("cozy-segments"), result.cozy);
    const list = $("laws-list");
    list.replaceChildren();
    result.laws.forEach((law) => { const li = document.createElement("li"); li.textContent = law; list.append(li); });
    $("law-count").textContent = `${result.laws.length} ЗАКОНА`;
    $("artifact-icon").textContent = result.artifact.icon;
    $("artifact-name").textContent = result.artifact.name;
    $("artifact-description").textContent = result.artifact.description;
    $("forecast-title").textContent = result.forecastTitle;
    $("forecast-text").textContent = result.forecast;
    $("forecast-threat").textContent = `Основная угроза: ${result.threat}`;
    $("forecast-coordinate").textContent = `ПРОГНОЗ\n${result.rare ? "КЛАСС Ω" : "СТАБИЛЬНОСТЬ " + (100 - result.chaos)}%`;
    history.unshift({ name: result.name, code: result.code, chaos: result.chaos, cozy: result.cozy, artifact: result.artifact, rare: result.rare });
    history.length = Math.min(history.length, 3);
    $("history-count").textContent = String(history.length);
  }
  function generate() { render(generateUniverse()); }
  function renderHistory() {
    const list = $("history-list"); list.replaceChildren();
    $("history-empty").classList.toggle("hidden", history.length > 0);
    history.forEach((world) => {
      const row = document.createElement("li"); row.className = "history-item";
      const heading = document.createElement("div");
      const name = document.createElement("strong"); name.textContent = `${world.rare ? "✧ " : ""}${world.name}`;
      const code = document.createElement("time"); code.textContent = `№ ${world.code}`;
      heading.append(name, code);
      const detail = document.createElement("p"); detail.textContent = `ХАОС ${world.chaos}% · УЮТ ${world.cozy}% · ${world.artifact.icon} ${world.artifact.name}`;
      row.append(heading, detail); list.append(row);
    });
  }
  function openHistory() { renderHistory(); $("history-backdrop").classList.remove("hidden"); $("history-close").focus(); }
  function closeHistory() { $("history-backdrop").classList.add("hidden"); $("history-button").focus(); }
  $("create-button").addEventListener("click", generate);
  $("again-button").addEventListener("click", generate);
  $("history-button").addEventListener("click", openHistory);
  $("history-close").addEventListener("click", closeHistory);
  $("history-backdrop").addEventListener("click", (event) => { if (event.target === $("history-backdrop")) closeHistory(); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !$("history-backdrop").classList.contains("hidden")) closeHistory(); });
})();
