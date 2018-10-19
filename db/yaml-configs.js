import { buildImage, runTests, slackMessage, launchcomposition } from './template-types';

const yamlConfigs = {
    "5c313a28-bf87-486e-9b63-e907cbc65c08": buildImage,
    "a0c2b94a-f096-444b-bd28-805e9cf3bad1": runTests,
    "b562b261-56ad-46c1-8f93-5fd474753bfc": launchcomposition,
    "2efee698-ceea-44d6-acb0-ec82f9295b84": slackMessage
};

export default yamlConfigs;