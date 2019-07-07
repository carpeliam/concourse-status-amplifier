import { JSDOM } from 'jsdom';
import {
  pipelineStatus,
  setBackground,
  wheneverJobsUpdate,
  PipelineState,
  PipelineImages,
} from '../src/util';

function justASec() {
  return new Promise(resolve => setTimeout(resolve));
}

function renderedJobs(...jobs) {
  const { window } = new JSDOM(`<!DOCTYPE html><div id="pipeline-container">${jobs.join('')}</div>`);
  const pipelineContainer = window.document.getElementById('pipeline-container');
  return { window, pipelineContainer };
}

const succeededJob = '<div class="succeeded job"></div>';
const startedJob = '<div class="started job"></div>';
const failedJob = '<div class="failed job"></div>';

describe('pipelineStatus', () => {

  it('knows when a job has started', () => {
    const { pipelineContainer } = renderedJobs(startedJob, succeededJob);

    const status = pipelineStatus(pipelineContainer);

    expect(status).toEqual(PipelineState.BUILDING);
  });

  it('knows when a job has failed', () => {
    const { pipelineContainer } = renderedJobs(failedJob, succeededJob);

    const status = pipelineStatus(pipelineContainer);

    expect(status).toEqual(PipelineState.FAILED);
  });

  it('knows when all jobs have succeeded', () => {
    const { pipelineContainer } = renderedJobs(succeededJob, succeededJob);

    const status = pipelineStatus(pipelineContainer);

    expect(status).toEqual(PipelineState.PASSING);
  });
});

describe('setBackground', () => {
  it('updates pipeline container background', () => {
    const { pipelineContainer } = renderedJobs(startedJob, succeededJob);

    setBackground(PipelineState.BUILDING, pipelineContainer);

    expect(pipelineContainer.style.backgroundImage).toContain(PipelineImages.BUILDING);
  });

  it('can unset background', () => {
    const { pipelineContainer } = renderedJobs(startedJob, succeededJob);

    setBackground(PipelineState.BUILDING, pipelineContainer);
    setBackground(undefined, pipelineContainer);

    expect(pipelineContainer.style.backgroundImage).toEqual('none');
  });
});

describe('wheneverJobsUpdate', () => {
  it('calls a callback upon changing job status', async () => {
    const { window, pipelineContainer } = renderedJobs(failedJob, succeededJob);
    const jobHasUpdatedSpy = jasmine.createSpy('jobHasUpdated');

    wheneverJobsUpdate(jobHasUpdatedSpy, pipelineContainer, window);
    window.document.querySelector('.failed').classList.replace('failed', 'succeeded');

    await justASec();
    expect(jobHasUpdatedSpy).toHaveBeenCalled();
  });

  it('ignores extraneous activity', async () => {
    const extraneousElement = '<div class="extraneous element"></div>';
    const { window, pipelineContainer } = renderedJobs(extraneousElement, succeededJob);
    const jobHasUpdatedSpy = jasmine.createSpy('jobHasUpdated');

    wheneverJobsUpdate(jobHasUpdatedSpy, pipelineContainer, window);
    window.document.querySelector('.extraneous.element').classList.add('failed');

    await justASec();
    expect(jobHasUpdatedSpy).not.toHaveBeenCalled();

    window.document.querySelector('.succeeded.job').id = 'new-id';

    await justASec();
    expect(jobHasUpdatedSpy).not.toHaveBeenCalled();
  });
});
