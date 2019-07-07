import { JSDOM } from 'jsdom';
import { onSubmit, onLoad, DefaultImages } from '../src/optionsUtil';

function renderedForm() {
  const { window: { document } } = new JSDOM(`<!DOCTYPE html>
    <form id="options">
      <input type="text" name="startedImage" value="startedImageValue" />
      <input type="text" name="succeededImage" value="succeededImageValue" />
      <input type="text" name="failedImage" value="failedImageValue" />
    </form>
  </div>`);
  const form = document.getElementById('options');
  return { document, form };
}

describe('onSubmit', () => {
  let storage;
  beforeEach(() => {
    storage = { sync: jasmine.createSpyObj('sync', ['set']) };
  })
  it('persists form values to chrome.storage.sync', () => {
    const { form } = renderedForm();
    const event = { target: form };

    onSubmit(event, storage);

    expect(storage.sync.set).toHaveBeenCalledWith({
      startedImage: 'startedImageValue',
      failedImage: 'failedImageValue',
      succeededImage: 'succeededImageValue',
    });
  });
});

describe('onLoad', () => {
  let storage;
  beforeEach(() => {
    storage = { sync: jasmine.createSpyObj('sync', ['get']) };
    storage.sync.get.and.callFake((imageMap, cb) => cb(imageMap));
  });

  it('loads current values from chrome.storage.sync into form values', () => {
    const { form, document } = renderedForm();
    const event = { target: document };

    onLoad(event, storage);

    expect(form.elements.startedImage.value).toEqual(DefaultImages.STARTED);
    expect(form.elements.failedImage.value).toEqual(DefaultImages.FAILED);
    expect(form.elements.succeededImage.value).toEqual(DefaultImages.SUCCEEDED);
  });
});
