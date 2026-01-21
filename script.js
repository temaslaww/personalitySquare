const input = document.getElementById('dateInput');
const currentYear = new Date().getFullYear();

const characterDescriptions = {
  '1': '«1 - Утончённый эгоист». Великолепный исполнитель. Свойственна много вариантность мышления. Перфекционист. Любит красиво одеваться. Никогда не даёт однозначных ответов, для того, чтобы можно было в любой момент вывернуться, как выгодно в зависимости от ситуации. Легко ведётся на провокацию. Большая тяга к прекрасному. Входя в коллектив, всегда будет пытаться занять лидерскую позицию. Собирает «сливки» везде и со всего без погружения в глубину процессов; Имеет большие проблемы с принятием решений. Ещё в детском возрасте нужно учить самостоятельно принимать решения. У женского пола свойство данного характера, это метание то в жертву, то в эгоистку (цель-становить качели). Склонность к изменам. Управление людьми даётся очень тяжело и не рекомендовано.',
  '11': '1 - «Добряк». Человек, который очень сильно любит похвалу; Характер близок к эгоистичному; Делает добрые дела только для того, чтобы добиться похвалы; Делает многие дела наперёд, чтобы заработать похвалу. Поэтому такому человеку ставить задачи нужно на будущее (наперёд); Для женщин это нормальный добрый характер, а для мужчины – проявление слабохарактерности подкабличничества, пассивности в действиях; Такие мужчины часто имеют волевую жену с сильным характером; Для мальчика воспитание мужчины, исходя из матрицы. Управление людьми даётся очень тяжело и не рекомендовано.',
  '111': '111 - Уникальный человек! «Золотая душа». Миротворец, нормальный до патологии, не мстителен; Очень хорошо адаптируется, очень устойчив в жизни; Устойчив без «восьмёрок»; Может умело соединять высшие и низшие эшелоны людей (богатых с бедными, умных с не понимающими); Может стать эгоистом побаловать себя; На такого человека нельзя давить, иначе включит деспотизм; Находится под божественной защитой (с поддержкой из вне); Любит выпить, погулять, попеть песни; Обижать таких людей нельзя, наказание за это приходит в течении 14 дней; Иметь в окружении таких людей – уже счастье.',
  '1111': '1111 - «Управленец». Сильный, волевой характер, человек из породы начальников; Упёртый; Обязательно будет занимать руководящую позицию; Если что-то говорит, от своих слов не отказывается; Для него противоестественны ложь и похвала, к похвале относится с подозрением: реакция на похвалу с позиции «Что надо?»; Очень хороший военный; Хорошо воспринимает письменную информацию => Визуал => Быстро выдаёт правильный ответ; Если человек с данным характером получает то, чего не заработал, то он не растёт; Зарплата должна быть средней. Для такого человека очень важно найти и правильно расставить кадры. Кадры для него решают всё; Живёт принципом: бездарности пробьются сами, талантам надо помогать.',
  '11111': '11111 - «Начинающий деспот». Очень сильная воля, настойчивость; Хорошо приспосабливается к любым условиям (даже к жизненно тяжёлым ситуациям); Постоянная потребность в значимости в своей семье или в коллективе; Конкретен, деспотичен, очень требователен к себе и другим (и имеет право на это); Живёт принципом цель оправдывает средства; Это личность, которая может пустить чужие миллионы «по ветру». В жизненной проблематике неумение управлять финансовыми средствами; Свойственны напряжённость психики и внутри личностный «расколбас»; Чувство собственной значимости просто необходимо, но должно быть уравновешено. Управление людьми даётся очень тяжело и не рекомендовано.',
  '111111': '111111 - «Деспот». Имеет трудный характер, ему не просто жить; Сам не понимает, чего хочет, пытается всех застраивать; Должен понять и принять свой характер и ответственность в действиях; При тяжести в жизни, если сможет трансформировать силу своего характера в чувство долга и ответственности к своей семье, становится хорошим семьянином. Управление людьми не рекомендовано.',
  '1111111': '1111111 - «Идущий по головам». Качество очень скрыто за тенью характера «111». Перфекционист. Любит красиво одеваться. Не осознавая может обидеть. Жизненную энергию должен тратить на благо и помощь людям в обществе. Должен осуществлять передачу знаний, умений и навыков, накопленных в прошлых пришествиях. Управление людьми не рекомендовано.',
  '11111111': '11111111- «Киллер/наблюдатель». Человек-молчун. Склонность к ясновидению. Цель – утилизация/активизация человеческих программ. Необходимо смотреть какой путь им избран исходя из программы. Должен формировать позитивный взгляд на жизнь. Если человек при данном типе характера имеет негативный взгляд на жизнь, пространство его может мгновенно трансформировать или трансмутировать. Управление людьми противопоказано.',
  '111111111': '111111111 - «Метеор». Человек, обладающий мощной ментальной, разрушительной скоростью мысли. Может на расстоянии переворачивать, трансформировать пространство и людей. В событиях, где находится такой человек, будут происходить пожары и разрушения, а людей будет сворачивать физиологические боли вплоть до потери здоровья. Управление людьми противопоказано.'
};

function isValidDate(day, month, year) {
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

input.addEventListener('input', () => {
  let value = input.value.replace(/\D/g, '');

  let day = value.substring(0, 2);
  let month = value.substring(2, 4);
  let year = value.substring(4, 8);

  // --- День ---
  if (day.length === 2) {
    if (day === '00') day = '01';
    if (+day > 31) day = '31';
  }

  // --- Месяц ---
  if (month.length === 2) {
    if (month === '00') month = '01';
    if (+month > 12) month = '12';
  }

  // --- Год ---
  if (year.length === 4) {
    if (+year < 1926) year = '1926';
    if (+year > currentYear) year = String(currentYear);
  }

  // --- Проверка полной даты ---
  if (day.length === 2 && month.length === 2 && year.length === 4) {
    if (!isValidDate(+day, +month, +year)) {
      // корректируем день под месяц
      const lastDay = new Date(year, month, 0).getDate();
      day = String(lastDay).padStart(2, '0');
    }
  }

  // --- Собираем обратно ---
  let result = '';
  if (day) result += day;
  if (month) result += '.' + month;
  if (year) result += '.' + year;

  input.value = result;
});

// Ensure DOM is fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', function() {
  const button = document.getElementById('butt');
  const cells = document.querySelectorAll('.cell');
  const secondLineDiv = document.querySelector('.second-line');
  const characterDescriptionContainer = document.querySelector('.character-description-container');
  const characterDescriptionText = document.getElementById('character-description-text');
  const characterCell = document.getElementById('character-cell');
  const redirectButton = document.getElementById('redirectButton');

  if (!button || !secondLineDiv) {
    console.error('Required elements not found');
    return;
  }

  button.addEventListener('click', () => {
    const value = input.value;
    if (!value || value.length !== 10) return;

    const [dd, mm, yyyy] = value.split('.');
    const digitsDate = (dd + mm + yyyy).split('').map(Number);

    const sumDigits = n => String(n).split('').reduce((a, b) => a + +b, 0);

    // ---------- ВТОРАЯ СТРОКА ----------
    const sumAll = digitsDate.reduce((a, b) => a + b, 0);

    const goldRaw = sumDigits(sumAll);
    const gold = goldRaw > 9 ? sumDigits(goldRaw) : goldRaw;

    const firstDayDigit = dd[0] === '0' ? +dd[1] : +dd[0];
    const third = sumAll - firstDayDigit * 2;

    const fourthRaw = sumDigits(third);
    const prof = fourthRaw > 9 ? sumDigits(fourthRaw) : fourthRaw;

    // ---------- ВЫВОД ВТОРОЙ СТРОКИ ----------
    secondLineDiv.innerHTML = `
    <span>${sumAll}</span>

    <span class="gold">
      ${goldRaw}${goldRaw > 9 ? `(${gold})` : ''}
      <i>золотое число</i>
    </span>

    <span>${third}</span>
    <span>${fourthRaw}${fourthRaw > 9 ? `(${prof})` : ''}</span>
  `;

    // Animate second line elements one by one
    setTimeout(() => {
      secondLineDiv.classList.add('show');
      const spans = secondLineDiv.querySelectorAll('span');
      spans.forEach((span, index) => {
        setTimeout(() => {
          span.classList.add('animate');
        }, index * 200);
      });
    }, 100);

    // ---------- КВАДРАТ ----------
    let squareDigits = [
      ...digitsDate,
      ...String(sumAll).split('').map(Number),
      ...String(third).split('').map(Number)
    ];

    if (+yyyy >= 2000) squareDigits.push(1, 9);

    const counts = {
      1: '', 2: '', 3: '',
      4: '', 5: '', 6: '',
      7: '', 8: '', 9: ''
    };

    squareDigits.forEach(n => {
      if (counts[n] !== undefined) counts[n] += n;
    });

    const order = [1,4,7,2,5,8,3,6,9];

    // Show matrix with animation
    const matrix = document.querySelector('.matrix');
    matrix.classList.add('show');

    // Fill cells with animation
    cells.forEach((cell, i) => {
      const val = counts[order[i]];
      cell.textContent = val || '–';
      
      // Add animation delay for each cell
      setTimeout(() => {
        cell.classList.add('animate');
      }, i * 100);
    });

    // ---------- УРОВНИ ----------
    Object.keys(counts).forEach(n => {
      const el = document.getElementById('c' + n);
      if (el) el.textContent = counts[n] ? counts[n].length : '0';
    });
    
    // Highlight strong lines
    const lines = {
      fate: [1,5,9],
      life: [4,5,6],
      family: [2,5,8]
    };

    Object.values(lines).forEach(line => {
      const power = line.reduce((s,n)=>s+(counts[n]?.length||0),0);
      if (power >= 6) {
        line.forEach(n => {
          const idx = order.indexOf(n);
          if (cells[idx]) {
            cells[idx].classList.add('strong');
          }
        });
      }
    });
     const characterValue = counts[1];
    
if (characterValue && characterDescriptions[characterValue]) {
  
  let description = characterDescriptions[characterValue];
    
  // Оборачиваем первое слово в span с классом
  const firstSpaceIndex = description.indexOf(' ');
  if (firstSpaceIndex > 0) {
    const firstWord = description.substring(0, firstSpaceIndex);
    const restText = description.substring(firstSpaceIndex);
    description = `<span class="first-word">${firstWord}</span>${restText}`;
  }
  
  characterDescriptionText.innerHTML = description;
  characterDescriptionText.classList.remove('description-animate');
  // Триггер перерисовки для анимации
  void characterDescriptionText.offsetWidth;
  characterDescriptionText.classList.add('description-animate');
  characterDescriptionContainer.classList.add('visible');
}   else {
  characterDescriptionText.textContent = 'Введите дату и нажмите "Рассчитать", чтобы узнать описание вашего характера.';
  characterDescriptionContainer.classList.remove('visible');
}   
    
    
  
  });
});