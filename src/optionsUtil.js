export function onSubmit(e, storage = chrome.storage) {
  e.preventDefault();
  const form = e.target;
  const startedImage = form.elements.startedImage.value;
  const failedImage = form.elements.failedImage.value;
  const succeededImage = form.elements.succeededImage.value;
  storage.sync.set({ startedImage, failedImage, succeededImage }, () => {
    form.querySelector('[type="submit"]').textContent = 'Saved!';
  });
}

export const DefaultImages = {
  STARTED: 'https://ketstatic.cdn.ket.org/wp_transfer/images/BOBL/BOBL__000708.3555962.848x480.jpg',
  FAILED: 'https://pixel.nymag.com/imgs/daily/vulture/2019/06/25/25-this-is-fine-lede-new.w700.h467.jpg',
  SUCCEEDED: 'https://www.agoodwaytothink.com/wp-content/uploads/2015/09/everything-is-awesome.jpg',
}

function associateBackgroundFor(input) {
  const exampleBg = input.closest('p').querySelector('.example');
  exampleBg.style.backgroundImage = `url("${input.value}")`;
}

export function onLoad({ target: document }, storage = chrome.storage) {
  const form = document.getElementById('options');
  storage.sync.get({
    startedImage: DefaultImages.STARTED,
    failedImage: DefaultImages.FAILED,
    succeededImage: DefaultImages.SUCCEEDED,
  }, images => {
    ['started', 'failed', 'succeeded'].forEach(state => {
      const input = form.elements[`${state}Image`];
      input.value = images[`${state}Image`];
      associateBackgroundFor(input);
      input.addEventListener('blur', () => associateBackgroundFor(input));
    });
  });
}
