# Concourse Status Amplifier [![Build Status](https://travis-ci.org/carpeliam/concourse-status-amplifier.svg?branch=master)](https://travis-ci.org/carpeliam/concourse-status-amplifier)

Concourse Status Amplifier is a Chrome extension that replaces your [Concourse](https://concourse-ci.org/) pipeline background with a sweet graphic, depending on your build status.

Because you're probably looking at your Concourse pipeline from a mile away, and it's hard to see those little boxes flashing from your seat.

## Sweet. How do I install it?
You have two options:
* Either [download the latest release artifact](https://github.com/carpeliam/concourse-status-amplifier/releases/latest/download/Pre-built.Artifact.zip) and follow the below instructions, skipping steps 1 through 3
* Install from source, because you like the bleeding edge:
  1. Clone this repository
  2. `yarn install --prod` (leave off the `--prod` if you want to run tests and the like)
  3. `yarn build`; this should produce a `dist/` directory with a `manifest.json` and other such goodies
  4. Go to [your extensions](chrome://extensions/)
  5. Follow [Chrome's instructions on adding extensions in Developer Mode](https://developer.chrome.com/extensions/getstarted#manifest) to select the `dist/` directory within this repository (created in step 3) as the extension directory
  6. You've got a sweet new extension now! Right-click on the Chrome extension icon (probably a gray 'C') and select `Options` to choose images from the Internet corresponding to an *All Passing* state, a *Failing* state, and an *In Progress* state.
  7. Browse on over to your favorite Concourse instance, and kick off a job.

## How do I give feedback?

I ❤️ Feedback. [Issues] and [pull requests] are welcome! Let me know how this can make your Concourse experience brighter.

[Issues]: https://github.com/carpeliam/concourse-status-amplifier/issues
[Pull Requests]: https://github.com/carpeliam/concourse-status-amplifier/pulls
