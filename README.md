# Concourse Status Amplifier [![Build Status](https://travis-ci.org/carpeliam/concourse-status-amplifier.svg?branch=master)](https://travis-ci.org/carpeliam/concourse-status-amplifier)

Concourse Status Amplifier is a Chrome extension that replaces your [Concourse](https://concourse-ci.org/) pipeline background with a sweet graphic, depending on your build status.

Because you're probably looking at your Concourse pipeline from a mile away, and it's hard to see those little boxes flashing from your seat.

## Sweet. How do I install it?

Installing from source? Good, because that's the only way you can do it right now. Here's what you gotta do:

1. `yarn install --prod` after cloning this repo (leave off the `--prod` if you want to run tests and the like)
2. `yarn build`; this should produce a `dist/` directory with a `manifest.json` and other such goodies
3. Go to [your extensions](chrome://extensions/)
4. Follow [Chrome's instructions on adding extensions in Developer Mode](https://developer.chrome.com/extensions/getstarted#manifest) to select the `dist/` directory within this repository (created in step 2) as the extension directory
5. You've got a sweet new extension now! Right-click on the Chrome extension icon (probably a gray 'C') and select `Options` to choose images from the Internet corresponding to an *All Passing* state, a *Failing* state, and an *In Progress* state.
5. Browse on over to your favorite Concourse instance, and kick off a job.

