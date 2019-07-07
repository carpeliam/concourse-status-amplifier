import { pipelineStatus, setBackground, wheneverJobsUpdate } from './contentScriptUtil';

wheneverJobsUpdate(() => { setBackground(pipelineStatus()); });
