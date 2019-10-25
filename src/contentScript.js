import { pipelineStatus, setBackground, wheneverJobsUpdate } from './contentScript/lib';

setBackground(pipelineStatus());

wheneverJobsUpdate(() => { setBackground(pipelineStatus()); });
