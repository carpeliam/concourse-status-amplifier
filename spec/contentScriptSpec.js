import { JSDOM } from 'jsdom';
import { DefaultImages } from '../src/common';
import {
  pipelineStatus,
  setBackground,
  wheneverJobsUpdate,
  PipelineState,
  pipelineContainer,
} from '../src/contentScript/lib';

function justASec() {
  return new Promise(resolve => setTimeout(resolve));
}

function renderedJobs(...jobs) {
  const { window } = new JSDOM(`<!DOCTYPE html><div id="pipeline-container">${jobs.join('')}</div>`);
  const pipelineContainer = Promise.resolve(window.document.getElementById('pipeline-container'));
  return { window, pipelineContainer };
}

function concourseV4() {
  const { window } = new JSDOM(`<!DOCTYPE html><div id="content"></div>`);
  const content = window.document.getElementById('content');
  return { window, content };
}

const succeededJob = '<div class="succeeded job"></div>';
const startedJob = '<div class="started job"></div>';
const failedJob = '<div class="failed job"></div>';
const erroredJob = '<div class="errored job"></div>';

describe('pipelineContainer', () => {
  it('returns #pipeline-container in Concourse >= v5', async () => {
    const { window, pipelineContainer: expectedContainer } = renderedJobs();

    const actualContainer = await pipelineContainer(window);

    expect(actualContainer).toBe(await expectedContainer);
  });

  it('returns #content in Concourse < v5', async () => {
    const { window, content: expectedContainer } = concourseV4();

    const actualContainer = await pipelineContainer(window);

    expect(actualContainer).toBe(await expectedContainer);
  });

  describe('when the container is not yet in the DOM', () => {
    it('eventually returns the container', async () => {
      const { window } = new JSDOM(`<!DOCTYPE html><body></body>`);
      const actualContainer = pipelineContainer(window);
      window.document.body.insertAdjacentHTML('beforeend', '<div id="pipeline-container"></div>');
      expect(await actualContainer).toEqual(window.document.getElementById('pipeline-container'));
    });
  });
});

describe('pipelineStatus', () => {

  it('knows when a job has started', async () => {
    const { pipelineContainer } = renderedJobs(startedJob, failedJob, succeededJob);

    const status = await pipelineStatus(pipelineContainer);

    expect(status).toEqual(PipelineState.STARTED);
  });

  it('knows when a job has failed', async () => {
    const { pipelineContainer } = renderedJobs(failedJob, erroredJob, succeededJob);

    const status = await pipelineStatus(pipelineContainer);

    expect(status).toEqual(PipelineState.FAILED);
  });

  it('knows when a job has errored', async () => {
    const { pipelineContainer } = renderedJobs(succeededJob, erroredJob);

    const status = await pipelineStatus(pipelineContainer);

    expect(status).toEqual(PipelineState.ERRORED);
  });

  it('knows when all jobs have succeeded', async () => {
    const { pipelineContainer } = renderedJobs(succeededJob, succeededJob);

    const status = await pipelineStatus(pipelineContainer);

    expect(status).toEqual(PipelineState.SUCCEEDED);
  });
});

describe('setBackground', () => {
  let storage;
  beforeEach(() => {
    storage = { sync: jasmine.createSpyObj('sync', ['get']) };
    storage.sync.get.and.callFake((imageMap, cb) => cb(imageMap));
  });
  it('updates pipeline container background', async () => {
    const { pipelineContainer } = renderedJobs(succeededJob);

    ['STARTED', 'FAILED', 'ERRORED', 'SUCCEEDED'].forEach(async state => {
      await setBackground(Promise.resolve(PipelineState[state]), pipelineContainer, storage);

      expect((await pipelineContainer).style.backgroundImage).toContain(DefaultImages[state]);
    });
  });

  it('can unset background', async () => {
    const { pipelineContainer } = renderedJobs(startedJob, succeededJob);

    await setBackground(Promise.resolve(PipelineState.STARTED), pipelineContainer, storage);
    await setBackground(Promise.resolve(undefined), pipelineContainer, storage);

    expect((await pipelineContainer).style.backgroundImage).toEqual('none');
  });
});

describe('wheneverJobsUpdate', () => {
  it('calls a callback upon changing job status', async () => {
    const { window, pipelineContainer } = renderedJobs(failedJob, succeededJob);
    const jobHasUpdatedSpy = jasmine.createSpy('jobHasUpdated');

    await wheneverJobsUpdate(jobHasUpdatedSpy, pipelineContainer, window);
    window.document.querySelector('.failed').classList.replace('failed', 'succeeded');

    await justASec();
    expect(jobHasUpdatedSpy).toHaveBeenCalled();
  });

  it('ignores extraneous activity', async () => {
    const extraneousElement = '<div class="extraneous element"></div>';
    const { window, pipelineContainer } = renderedJobs(extraneousElement, succeededJob);
    const jobHasUpdatedSpy = jasmine.createSpy('jobHasUpdated');

    await wheneverJobsUpdate(jobHasUpdatedSpy, pipelineContainer, window);
    window.document.querySelector('.extraneous.element').classList.add('failed');

    await justASec();
    expect(jobHasUpdatedSpy).not.toHaveBeenCalled();

    window.document.querySelector('.succeeded.job').id = 'new-id';

    await justASec();
    expect(jobHasUpdatedSpy).not.toHaveBeenCalled();
  });
});
