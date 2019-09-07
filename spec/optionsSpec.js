import { JSDOM } from 'jsdom';
import { DefaultImages } from '../src/common';
import { onSubmit, onLoad } from '../src/options/lib';

async function renderedForm() {
  const { window: { document } } = await JSDOM.fromFile('./src/options.html');
  const form = document.getElementById('options');
  return { document, form };
}

function justASec() {
  return new Promise(resolve => setTimeout(resolve));
}

describe('onSubmit', () => {
  let storage;
  beforeEach(() => {
    storage = { sync: jasmine.createSpyObj('sync', ['set']) };
    storage.sync.set.and.callFake((_, cb) => cb());
  });

  it('persists form values to chrome.storage.sync', async () => {
    const { form } = await renderedForm();
    const event = { target: form, preventDefault: jasmine.createSpy('preventDefault') };

    ['started', 'failed', 'errored', 'succeeded'].forEach(state => {
      form.elements[`${state}Image`].value = state;
    });
    onSubmit(event, storage);

    expect(event.preventDefault).toHaveBeenCalled();
    const imageValues = storage.sync.set.calls.mostRecent().args[0];
    expect(imageValues).toEqual({
      startedImage: 'started',
      failedImage: 'failed',
      erroredImage: 'errored',
      succeededImage: 'succeeded',
    });
  });

  it('updates submit button to indicate saving', async () => {
    const { form } = await renderedForm();
    const event = { target: form, preventDefault: () => {} };

    onSubmit(event, storage);
    await justASec();

    const submitButton = form.querySelector('[type="submit"]');
    expect(submitButton.textContent).toEqual('Saved!');
  });
});

describe('onLoad', () => {
  let storage;
  beforeEach(() => {
    storage = { sync: jasmine.createSpyObj('sync', ['get']) };
    storage.sync.get.and.callFake((imageMap, cb) => cb(imageMap));
  });

  it('loads current values from chrome.storage.sync into form values', async () => {
    const { form, document } = await renderedForm();
    const event = { target: document };

    onLoad(event, storage);

    expect(form.elements.startedImage.value).toEqual(DefaultImages.STARTED);
    expect(form.querySelector('.startedImage .csa-example').style.backgroundImage).toContain(DefaultImages.STARTED);
    expect(form.elements.failedImage.value).toEqual(DefaultImages.FAILED);
    expect(form.querySelector('.failedImage .csa-example').style.backgroundImage).toContain(DefaultImages.FAILED);
    expect(form.elements.erroredImage.value).toEqual(DefaultImages.ERRORED);
    expect(form.querySelector('.erroredImage .csa-example').style.backgroundImage).toContain(DefaultImages.ERRORED);
    expect(form.elements.succeededImage.value).toEqual(DefaultImages.SUCCEEDED);
    expect(form.querySelector('.succeededImage .csa-example').style.backgroundImage).toContain(DefaultImages.SUCCEEDED);
  });

  it('updates example background images on blur of text fields', async () => {
    const { form, document } = await renderedForm();
    const event = { target: document };

    onLoad(event, storage);
    form.elements.startedImage.focus();
    form.elements.startedImage.value = 'http://example.com/path/to/img.jpg';
    form.elements.startedImage.blur();

    const startedImageExample = form.querySelector('.startedImage .csa-example');
    expect(startedImageExample.style.backgroundImage).toEqual('url(http://example.com/path/to/img.jpg)');
  });
});
