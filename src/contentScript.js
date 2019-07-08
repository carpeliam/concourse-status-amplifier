import { pipelineStatus, setBackground, wheneverJobsUpdate } from './contentScript/lib';

wheneverJobsUpdate(() => { setBackground(pipelineStatus()); });
