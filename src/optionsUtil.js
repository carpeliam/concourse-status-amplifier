export function onSubmit(e, storage = chrome.storage) {
  const form = e.target;
  const startedImage = form.elements.startedImage.value;
  const failedImage = form.elements.failedImage.value;
  const succeededImage = form.elements.succeededImage.value;
  storage.sync.set({ startedImage, failedImage, succeededImage });
}

export const DefaultImages = {
  STARTED: 'https://ketstatic.cdn.ket.org/wp_transfer/images/BOBL/BOBL__000708.3555962.848x480.jpg',
  FAILED: 'https://pixel.nymag.com/imgs/daily/vulture/2019/06/25/25-this-is-fine-lede-new.w700.h467.jpg',
  SUCCEEDED: 'https://www.agoodwaytothink.com/wp-content/uploads/2015/09/everything-is-awesome.jpg',
}

export function onLoad(e, storage = chrome.storage) {
  storage.sync.get({
    startedImage: DefaultImages.STARTED,
    failedImage: DefaultImages.FAILED,
    succeededImage: DefaultImages.SUCCEEDED,
  }, ({ startedImage, failedImage, succeededImage }) => {
    const document = e.target;
    const form = document.getElementById('options');

    form.elements.startedImage.value = startedImage;
    form.elements.failedImage.value = failedImage;
    form.elements.succeededImage.value = succeededImage;
  });
}
