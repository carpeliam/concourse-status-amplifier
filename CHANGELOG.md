# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.4.1][] - 2019-10-27
### Added
- Support for Firefox

## [0.4.0][] - 2019-10-26
### Changed
- The extension is now loaded by clicking the extension button, _not_ by inspecting the URL pattern.
  This is safer, and allows the user to choose when to load the extension and when not to.

## [0.3.0][] - 2019-10-23
### Added
- Background image display for pipelines in an errored state.
- Icons in PNG and AI format, thanks to [Cynthia Conklin](https://cconklin.myportfolio.com/about)!

## [0.2.1] - 2019-07-28
### Changed
- Bumped manifest version.

## [0.2.0] - 2019-07-27
### Added
- Customization of image backgrounds via `Options`.
- Support for Concourse v4.
- Styling of legend to make it more visible.

### Removed
- Loading the extension on pages for individual jobs/builds.

## [0.1.0] - 2019-07-06
### Added
- Hard-coded image backgrounds.

[Unreleased]: https://github.com/carpeliam/concourse-status-amplifier/compare/v0.4.1...HEAD
[0.4.1]: https://github.com/carpeliam/concourse-status-amplifier/compare/v0.4.0...v0.4.1
[0.4.0]: https://github.com/carpeliam/concourse-status-amplifier/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/carpeliam/concourse-status-amplifier/compare/v0.2.1...v0.3.0
[0.2.1]: https://github.com/carpeliam/concourse-status-amplifier/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/carpeliam/concourse-status-amplifier/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/carpeliam/concourse-status-amplifier/releases/tag/v0.1.0
