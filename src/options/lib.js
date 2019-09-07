import { DefaultImages } from '../common';

export function onSubmit(e, storage = chrome.storage) {
  e.preventDefault();
  const form = e.target;
  const startedImage = form.elements.startedImage.value;
  const failedImage = form.elements.failedImage.value;
  const erroredImage = form.elements.erroredImage.value;
  const succeededImage = form.elements.succeededImage.value;
  storage.sync.set({ startedImage, failedImage, erroredImage, succeededImage }, () => {
    form.querySelector('[type="submit"]').textContent = 'Saved!';
  });
}

function associateBackgroundFor(input) {
  const exampleBg = input.closest('p').querySelector('.csa-example');
  exampleBg.style.backgroundImage = `url("${input.value}")`;
}

export function onLoad({ target: document }, storage = chrome.storage) {
  const form = document.getElementById('options');
  storage.sync.get({
    startedImage: DefaultImages.STARTED,
    failedImage: DefaultImages.FAILED,
    erroredImage: DefaultImages.ERRORED,
    succeededImage: DefaultImages.SUCCEEDED,
  }, images => {
    ['started', 'failed', 'errored', 'succeeded'].forEach(state => {
      const input = form.elements[`${state}Image`];
      input.value = images[`${state}Image`];
      associateBackgroundFor(input);
      input.addEventListener('blur', () => associateBackgroundFor(input));
    });
  });
}
