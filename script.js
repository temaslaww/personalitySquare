const input = document.getElementById('dateInput');
const currentYear = new Date().getFullYear();

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
  });
});