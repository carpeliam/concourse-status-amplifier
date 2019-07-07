import { pipelineStatus, setBackground, wheneverJobsUpdate } from '../src/util';

wheneverJobsUpdate(() => { setBackground(pipelineStatus()); });
