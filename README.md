# Concourse Status Amplifier [![Build Status](https://travis-ci.org/carpeliam/concourse-status-amplifier.svg?branch=master)](https://travis-ci.org/carpeliam/concourse-status-amplifier)

Concourse Status Amplifier is a browser extension that replaces your [Concourse](https://concourse-ci.org/) pipeline background with a sweet graphic, depending on your build status.

Because you're probably looking at your Concourse pipeline from a mile away, and it's hard to see those little boxes flashing from your seat.

## I want to install it. How do I install it?

[Chrome web store](https://chrome.google.com/webstore/detail/concourse-status-amplifie/hlocifdhegikgbaineimppincgbaeheg)

You can also [install from source](#i-like-to-start-with-the-sourcecode-how-do-i-build-the-source) or unzip the [latest published release](https://github.com/carpeliam/concourse-status-amplifier/releases/latest/download/Pre-built.Artifact.zip).

Follow either [Chrome](https://developer.chrome.com/extensions/getstarted#manifest)'s or [Firefox](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#Installing)'s instructions for installing an extension from disk; you'll want to specify the `dist/` directory as the location for the extension.

## How do I use it?

Once you've installed the extension, it'll work out of the box for pipelines on either [Concourse CI](https://ci.concourse-ci.org/) or [Hush House](https://hush-house.pivotal.io/). Just navigate to a pipeline and you should see a background image corresponding to the build status!

### Support for other Concourse domains

If you have a pipeline that's not at either of those two domains, navigate to your pipeline in the browser, right-click on the icon for the extension and select "Enable Concourse Status Amplifier on this domain". The page will need to reload for the backgrounds to become visible.

### Changing the backgrounds

You can change what background images are associated with which build statuses via the extension's Options. In Chrome, right-click on the icon for the extension and select "Options"; in Firefox, right-click on the icon for the extension and select "Manage Extension", then "Preferences". The new background images you choose will need a publicly accessible web address.

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
