import { PALLET_QUIZZES } from './docs/assets/pallet-quizzes.js';

const DONE_KEY = 'diy_pallet_course_done_v1';
const CHECK_KEY = 'diy_pallet_course_checks_v1';

const readStore = (key, fallback) => {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch {
    return fallback;
  }
};

const writeStore = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // The course remains usable when storage is unavailable.
  }
};

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const done = new Set(readStore(DONE_KEY, []));
const savedChecks = readStore(CHECK_KEY, {});
const modules = [...document.querySelectorAll('.course-module')];
const checklist = [...document.querySelectorAll('[data-check]')];
const progress = document.querySelector('.course-progress progress');
const progressTitle = document.querySelector('#progress-title');
const progressPercent = document.querySelector('.course-progress__percent');
const progressNote = document.querySelector('.course-progress__note');

const checklistComplete = () => checklist.length > 0 && checklist.every((input) => input.checked);

const syncModuleState = () => {
  if (checklistComplete()) {
    done.add('m6');
  } else {
    done.delete('m6');
  }

  modules.forEach((module) => {
    const id = module.dataset.module;
    const complete = done.has(id);
    const status = module.querySelector('.course-module__status');
    const button = module.querySelector('.module-complete');

    module.classList.toggle('is-complete', complete);
    if (status) {
      status.textContent = complete ? 'Complete' : (module.open ? 'Reading' : 'Not started');
    }
    if (button) {
      button.textContent = complete ? 'Module complete — click to reset' : 'Mark module complete';
      button.setAttribute('aria-pressed', String(complete));
    }
  });

  const count = modules.filter((module) => done.has(module.dataset.module)).length;
  const percent = Math.round((count / modules.length) * 100);
  progress.value = count;
  progress.textContent = `${count} of ${modules.length} modules complete`;
  progressPercent.textContent = `${percent}%`;
  progressTitle.textContent = count === 0
    ? 'Start with Module 01'
    : count === modules.length
      ? 'You are build-ready'
      : 'Keep going—nice work';
  progressNote.textContent = `${count} of ${modules.length} modules complete. Progress is saved on this device.`;

  writeStore(DONE_KEY, [...done]);
};

modules.forEach((module) => {
  module.addEventListener('toggle', syncModuleState);
  const button = module.querySelector('.module-complete');
  button?.addEventListener('click', () => {
    const id = module.dataset.module;
    if (done.has(id)) {
      done.delete(id);
    } else {
      done.add(id);
    }
    syncModuleState();
  });
});

checklist.forEach((input) => {
  input.checked = Boolean(savedChecks[input.dataset.check]);
  input.addEventListener('change', () => {
    const state = Object.fromEntries(checklist.map((item) => [item.dataset.check, item.checked]));
    writeStore(CHECK_KEY, state);
    syncModuleState();
  });
});

const renderQuiz = (root, quiz) => {
  const state = {
    index: 0,
    score: 0,
    streak: 0,
    answered: false,
    selected: null,
    finished: false,
  };

  const draw = () => {
    if (state.finished) {
      const total = quiz.questions.length;
      const percent = Math.round((state.score / total) * 100);
      root.innerHTML = `
        <div class="quiz__inner quiz__result">
          <p class="quiz__label">Lesson check complete</p>
          <p class="quiz__score">${state.score}/${total}</p>
          <p>You answered ${percent}% correctly. Review any explanation you missed, then try again when you are ready.</p>
          <button class="quiz__retake" type="button">Retake the check</button>
        </div>
      `;
      root.querySelector('.quiz__retake').addEventListener('click', () => {
        Object.assign(state, {
          index: 0,
          score: 0,
          streak: 0,
          answered: false,
          selected: null,
          finished: false,
        });
        draw();
      });
      return;
    }

    const question = quiz.questions[state.index];
    const answeredCount = state.index + (state.answered ? 1 : 0);
    const options = Object.entries(question.options).map(([key, label]) => {
      const isCorrect = state.answered && key === question.correct;
      const isWrong = state.answered && key === state.selected && key !== question.correct;
      return `
        <button class="quiz__option${isCorrect ? ' is-correct' : ''}${isWrong ? ' is-wrong' : ''}"
          type="button"
          data-answer="${escapeHtml(key)}"
          ${state.answered ? 'disabled' : ''}>
          <strong>${escapeHtml(key)}.</strong> ${escapeHtml(label)}
        </button>
      `;
    }).join('');

    const feedback = state.answered
      ? `
        <div class="quiz__feedback" role="status">
          <strong>${state.selected === question.correct ? 'Correct' : `Not quite—the answer is ${escapeHtml(question.correct)}`}</strong>
          ${escapeHtml(question.explanation)}
        </div>
        <button class="quiz__next" type="button">${state.index === quiz.questions.length - 1 ? 'See results' : 'Next question'}</button>
      `
      : '';

    root.innerHTML = `
      <div class="quiz__inner">
        <div class="quiz__top">
          <span class="quiz__label">${escapeHtml(quiz.title)} · ${state.index + 1} of ${quiz.questions.length}</span>
          <span class="quiz__streak">Streak ${state.streak}</span>
        </div>
        <progress value="${answeredCount}" max="${quiz.questions.length}" aria-label="Quiz progress">${answeredCount} of ${quiz.questions.length}</progress>
        <h3 class="quiz__question">${escapeHtml(question.question)}</h3>
        <div class="quiz__options">${options}</div>
        ${feedback}
      </div>
    `;

    root.querySelectorAll('.quiz__option').forEach((button) => {
      button.addEventListener('click', () => {
        const selected = button.dataset.answer;
        const correct = selected === question.correct;
        state.selected = selected;
        state.answered = true;
        if (correct) {
          state.score += 1;
          state.streak += 1;
        } else {
          state.streak = 0;
        }
        draw();
        root.querySelector('.quiz__next')?.focus();
      });
    });

    root.querySelector('.quiz__next')?.addEventListener('click', () => {
      if (state.index === quiz.questions.length - 1) {
        state.finished = true;
      } else {
        state.index += 1;
        state.answered = false;
        state.selected = null;
      }
      draw();
      root.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  };

  draw();
};

document.querySelectorAll('[data-quiz]').forEach((root) => {
  const quiz = PALLET_QUIZZES[root.dataset.quiz];
  if (quiz) renderQuiz(root, quiz);
});

const menuButton = document.querySelector('.course-menu');
const menuLinks = document.querySelector('.course-nav__links');

menuButton?.addEventListener('click', () => {
  const open = menuLinks.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
});

menuLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuLinks.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

syncModuleState();
