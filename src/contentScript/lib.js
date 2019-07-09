export const PipelineState = {
  STARTED: 'STARTED',
  FAILED: 'FAILED',
  SUCCEEDED: 'SUCCEEDED',
};

export function pipelineContainer({ document } = window) {
  const pipelineContainer = document.getElementById('pipeline-container');
  if (pipelineContainer) {
    return pipelineContainer;
  }
  return document.getElementById('content');
}

export function pipelineStatus(container = pipelineContainer()) {
  const jobs = Array.from(container.querySelectorAll('.job'));

  const allGreen = () => jobs.every(job => job.classList.contains('succeeded'));
  const inProgress = () => jobs.some(job => job.classList.contains('started'));
  const anyRed = () => jobs.some(job => job.classList.contains('failed'));

  if (inProgress()) {
    return PipelineState.STARTED;
  } else {
    if (anyRed()) {
      return PipelineState.FAILED;
    }
    if (allGreen()) {
      return PipelineState.SUCCEEDED;
    }
    // undefined
  }
}

export function setBackground(state, container = pipelineContainer(), storage = chrome.storage) {
  storage.sync.get(['startedImage', 'failedImage', 'succeededImage'], ({ startedImage, failedImage, succeededImage }) => {
    let bgImage;
    switch (state) {
      case PipelineState.STARTED:
        bgImage = startedImage;
        break;
      case PipelineState.FAILED:
        bgImage = failedImage;
        break;
      case PipelineState.SUCCEEDED:
        bgImage = succeededImage;
    }
    container.style.backgroundImage = (bgImage) ? `url("${bgImage}")` : 'none';
  });
}

export function wheneverJobsUpdate(cb, container = pipelineContainer(), { MutationObserver } = window) {
  const observer = new MutationObserver(function whenMutationsOccur(mutations) {
    const hasJobUpdated = mutations.some(mutation => mutation.target.classList.contains('job'));
    if (hasJobUpdated) {
      cb();
    }
  });
  observer.observe(container, {
    attributes: true,
    attributeFilter: ['class'],
    subtree: true,
  });
}
