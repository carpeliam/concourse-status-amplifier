# Concourse Status Amplifier

Concourse Status Amplifier is a Chrome extension that replaces your [Concourse](https://concourse-ci.org/) pipeline with a sweet graphic, depending on your build status.

Because you're probably looking at your Concourse pipeline from a mile away, and it's hard to see those little boxes flashing from your seat.

## Sweet. How do I install it?

Installing from source? Good, because that's the only way you can do it right now. Here's what you gotta do:

1. `yarn install --prod` after cloning this repo (leave off the `--prod` if you want to run tests and the like)
2. `yarn build`
3. Go to [your extensions](chrome://extensions/)
4. Follow Chrome's instructions on adding extensions in Developer Mode
    - Expect to see some warnings about some extraneous pem files - feel free to remove the `node_modules` directory after building if you're intent on not seeing these warnings.
5. Browse on over to your favorite Concourse instance, and kick off a job.

