const CORRECT_ANSWERS = {
  'q1': ['python', 'java'],
  'q2': ['windows', 'linux', 'android'],
  'q3': ['http', 'ftp', 'smtp'],
  'q4': ['HyperTextMarkupLanguage'],
  'q5': ['npm']
};

const qcmContainer = document.querySelector('.file');
const startButton  = document.getElementById('Start');
const resetButton  = document.getElementById('reset-btn');
const checkButton  = document.getElementById('check-answers-btn');
const showButton   = document.getElementById('show-qcm-btn');

const getUserAnswers = (qid) => {
  const checkedInputs = document.querySelectorAll(`input[name="${qid}"]:checked`);
  return Array.from(checkedInputs).map(input => input.value).sort();
};

const isQuestionCorrect = (qid) => {
  const correct = [...CORRECT_ANSWERS[qid]].sort();
  const user    = getUserAnswers(qid);
  if (correct.length !== user.length) return false;
  return correct.every((val, idx) => val === user[idx]);
};

const buildReportHTML = (score, total, content, showCorrection) => {
  const titleText = showCorrection
    ? `Correction Complète: ${score}/${total}`
    : `Statut du Test: ${score}/${total}`;
  return `
    <html>
      <head>
        <title>${titleText}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; background: #f4f4f4; color: #333; }
          h1 { color: #0056b3; }
          .status-correct { color: green; font-weight: bold; }
          .status-incorrect { color: red; font-weight: bold; }
          .correct-answer-display { background: #e6ffe6; padding: 2px 5px; border-radius: 3px; text-decoration: underline; }
        </style>
      </head>
      <body>
        <h1>${titleText}</h1>
        ${content}
      </body>
    </html>
  `;
};

const openNewWindow = (htmlContent) => {
  const newWindow = window.open("", "_blank", "width=800,height=600,scrollbars=yes");
  if (newWindow) {
    newWindow.document.write(htmlContent);
    newWindow.document.close();
    newWindow.addEventListener('load', () => {
      const bodyHeight = newWindow.document.body.scrollHeight;
      const height    = Math.min(Math.max(bodyHeight + 40, 300), 800);
      newWindow.resizeTo(800, height);
    });
  }
};

const generateReportWindow = (showCorrection) => {
  let score = 0;
  let totalQuestions = 0;
  let resultContent = '';

  document.querySelectorAll('fieldset').forEach((fieldset, index) => {
    const qid = `q${index + 1}`;
    const questionTitle = fieldset.querySelector('legend').textContent.trim();
    const correct = isQuestionCorrect(qid);
    totalQuestions++;
    if (correct) score++;
    const statusClass = correct ? 'status-correct' : 'status-incorrect';
    const statusText  = correct ? 'correcte' : 'incorrecte';

    if (!showCorrection) {
      resultContent += `<p>La réponse de la question ${index + 1} est <span class="${statusClass}">${statusText}</span></p>`;
    } else {
      resultContent += `<div><h2>${questionTitle}</h2>`;
      fieldset.querySelectorAll('label').forEach(label => {
        const input = label.querySelector('input');
        const isCorrectOption = CORRECT_ANSWERS[qid].includes(input.value);
        const labelText = label.textContent.trim();
        if (isCorrectOption) {
          resultContent += `<p class="correct-answer-display">${labelText}</p>`;
        } else {
          resultContent += `<p>${labelText}</p>`;
        }
      });
      resultContent += `<p class="${statusClass}">Votre réponse était : ${statusText}</p></div>`;
    }
  });

  const html = buildReportHTML(score, totalQuestions, resultContent, showCorrection);
  openNewWindow(html);
};


qcmContainer.style.display    = 'none';
resetButton.style.display    = 'none';
checkButton.style.display    = 'none';
showButton.style.display     = 'none';

if (startButton) {
  startButton.addEventListener('click', () => {
    qcmContainer.style.display     = 'block';
    startButton.style.display      = 'none';
    
    resetButton.style.display     = 'inline-block';
    checkButton.style.display     = 'inline-block';
    showButton.style.display      = 'inline-block';
  });
}

if (resetButton) {
  resetButton.addEventListener('click', () => {
    document.querySelector('form').reset();
    qcmContainer.style.display     = 'none';
    startButton.style.display      = 'inline-block';
    resetButton.style.display      = 'none';
    checkButton.style.display      = 'none';
    showButton.style.display       = 'none';
    alert('Le QCM a été réinitialisé.');
  });
}

if (checkButton) {
  checkButton.addEventListener('click', () => {
    generateReportWindow(false);
  });
}

if (showButton) {
  showButton.addEventListener('click', () => {
    generateReportWindow(true);
  });
}
