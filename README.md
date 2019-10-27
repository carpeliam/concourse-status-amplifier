# Concourse Status Amplifier [![Build Status](https://travis-ci.org/carpeliam/concourse-status-amplifier.svg?branch=master)](https://travis-ci.org/carpeliam/concourse-status-amplifier)

Concourse Status Amplifier is a browser extension that replaces your [Concourse](https://concourse-ci.org/) pipeline background with a sweet graphic, depending on your build status.

Because you're probably looking at your Concourse pipeline from a mile away, and it's hard to see those little boxes flashing from your seat.

## I want to install it. How do I install it?

[Chrome web store](https://chrome.google.com/webstore/detail/concourse-status-amplifie/hlocifdhegikgbaineimppincgbaeheg)

You can also [install from source](#i-like-to-start-with-the-sourcecode-how-do-i-build-the-source) or unzip the [latest published release](https://github.com/carpeliam/concourse-status-amplifier/releases/latest/download/Pre-built.Artifact.zip).

Follow either [Chrome](https://developer.chrome.com/extensions/getstarted#manifest)'s or [Firefox](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#Installing)'s instructions for installing an extension from disk; you'll want to specify the `dist/` directory as the location for the extension.

## I like to start with the sourcecode. How do I build the source?

1. Clone this repository
2. `yarn install --prod` (leave off the `--prod` if you want to run tests and the like)
3. `yarn build`; this should produce a `dist/` directory with a `manifest.json` and other such goodies

## Cool icon. Who made it?

That'd be [Cynthia Conklin](https://cconklin.myportfolio.com/about) - she does good work!

## How do I give feedback?

I ❤️ Feedback. [Issues] and [pull requests] are welcome! Let me know how this can make your Concourse experience brighter.

[Issues]: https://github.com/carpeliam/concourse-status-amplifier/issues
[Pull Requests]: https://github.com/carpeliam/concourse-status-amplifier/pulls
