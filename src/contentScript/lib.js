import { DefaultImages } from '../common';

export const PipelineState = {
  STARTED: 'STARTED',
  FAILED: 'FAILED',
  ERRORED: 'ERRORED',
  SUCCEEDED: 'SUCCEEDED',
};

export async function pipelineContainer({ document } = window) {
  const getContainer = () => {
    const pipelineContainer = document.getElementById('pipeline-container');
    if (pipelineContainer) {
      return pipelineContainer;
    }
    return document.getElementById('content');
  }
  return new Promise((resolve) => {
    const intervalId = setInterval(() => {
      const container = getContainer();
      if (container) {
        clearInterval(intervalId);
        resolve(container);
      }
    }, 100);
  });
}

export async function pipelineStatus(container = pipelineContainer()) {
  const jobs = Array.from((await container).querySelectorAll('.job'));

  const allGreen = () => jobs.every(job => job.classList.contains('succeeded'));
  const inProgress = () => jobs.some(job => job.classList.contains('started'));
  const anyErrors = () => jobs.some(job => job.classList.contains('errored'));
  const anyRed = () => jobs.some(job => job.classList.contains('failed'));

  if (inProgress()) {
    return PipelineState.STARTED;
  }
  if (anyRed()) {
    return PipelineState.FAILED;
  }
  if (anyErrors()) {
    return PipelineState.ERRORED;
  }
  if (allGreen()) {
    return PipelineState.SUCCEEDED;
  }
  // undefined
}

export async function setBackground(state, container = pipelineContainer(), storage = chrome.storage) {
  storage.sync.get({
    startedImage: DefaultImages.STARTED,
    failedImage: DefaultImages.FAILED,
    erroredImage: DefaultImages.ERRORED,
    succeededImage: DefaultImages.SUCCEEDED,
  }, async ({ startedImage, failedImage, erroredImage, succeededImage }) => {
    let bgImage;
    switch (await state) {
      case PipelineState.STARTED:
        bgImage = startedImage;
        break;
      case PipelineState.FAILED:
        bgImage = failedImage;
        break;
      case PipelineState.ERRORED:
        bgImage = erroredImage;
        break;
      case PipelineState.SUCCEEDED:
        bgImage = succeededImage;
    }
    (await container).style.backgroundImage = (bgImage) ? `url("${bgImage}")` : 'none';
  });
}

export async function wheneverJobsUpdate(cb, container = pipelineContainer(), { MutationObserver } = window) {
  const observer = new MutationObserver(function whenMutationsOccur(mutations) {
    const hasJobUpdated = mutations.some(mutation => mutation.target.classList.contains('job'));
    if (hasJobUpdated) {
      cb();
    }
  });
  observer.observe((await container), {
    attributes: true,
    attributeFilter: ['class'],
    subtree: true,
  });
}
