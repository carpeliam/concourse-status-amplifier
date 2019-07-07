const pipelineContainer = () => document.getElementById('pipeline-container');

export const PipelineState = {
  BUILDING: 'BUILDING',
  FAILED: 'FAILED',
  PASSING: 'PASSING',
};

export const PipelineImages = {
  BUILDING: 'https://ketstatic.cdn.ket.org/wp_transfer/images/BOBL/BOBL__000708.3555962.848x480.jpg',
  FAILED: 'https://pixel.nymag.com/imgs/daily/vulture/2019/06/25/25-this-is-fine-lede-new.w700.h467.jpg',
  PASSING: 'https://www.agoodwaytothink.com/wp-content/uploads/2015/09/everything-is-awesome.jpg',
}

export function pipelineStatus(container = pipelineContainer()) {
  const jobs = Array.from(container.querySelectorAll('.job'));

  const allGreen = () => jobs.every(job => job.classList.contains('succeeded'));
  const currentlyBuilding = () => jobs.some(job => job.classList.contains('started'));
  const anyRed = () => jobs.some(job => job.classList.contains('failed'));

  if (currentlyBuilding()) {
    return PipelineState.BUILDING;
  } else {
    if (anyRed()) {
      return PipelineState.FAILED;
    }
    if (allGreen()) {
      return PipelineState.PASSING;
    }
    // undefined
  }
}

export function setBackground(state, container = pipelineContainer()) {
  const bgImage = PipelineImages[state];

  container.style.backgroundImage = (bgImage) ? `url("${bgImage}")` : 'none';
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
