# capacitor-mlkit-plugin-demo

[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/robingenz/capacitor-mlkit-plugin-demo/ci.yml?branch=main)](https://github.com/robingenz/capacitor-mlkit-plugin-demo/actions)

<!-- [![GitHub tag (latest SemVer)](https://img.shields.io/github/tag/robingenz/capacitor-mlkit-plugin-demo?color=brightgreen&label=version)](https://github.com/robingenz/capacitor-mlkit-plugin-demo/releases) -->

⚡️ Simple Ionic Angular app to demonstrate the use of certain Capacitor plugins.

## Plugins

The following plugins are included:

- [capacitor-mlkit/barcode-scanning](https://capawesome.io/plugins/mlkit/barcode-scanning/)
- [capacitor-mlkit/face-detection](https://capawesome.io/plugins/mlkit/face-detection/)
- [capacitor-mlkit/selfie-segmentation](https://capawesome.io/plugins/mlkit/selfie-segmentation/)
- [capacitor-mlkit/subject-segmentation](https://capawesome.io/plugins/mlkit/subject-segmentation/) (Android only)
- [capacitor-mlkit/translation](https://capawesome.io/plugins/mlkit/translation/)

## Development Setup 💻

### Prerequisites

- Install [Node.js](https://nodejs.org) which includes [Node Package Manager](https://www.npmjs.com/get-npm)
- Android development: Install [Android Studio](https://developer.android.com/studio)
- iOS development: Install [XCode](https://apps.apple.com/de/app/xcode/id497799835?mt=12)

### Getting Started

Clone this repository:

```
git clone https://github.com/robingenz/capacitor-mlkit-plugin-demo.git
```

Change to the root directory of the project:

```
cd capacitor-mlkit-plugin-demo
```

Install all dependencies:

```
npm i
```

Prepare and launch the Android app:

```
npx ionic cap sync android
npx ionic cap run android
```

Prepare and launch the iOS app:

```
npx ionic cap sync ios
npx ionic cap run ios
```

This project uses [Ionic](https://ionicframework.com/) as app development platform and the [Ionic CLI](https://ionicframework.com/docs/cli).

<!-- ## Changelog

See [CHANGELOG.md](https://github.com/robingenz/capacitor-mlkit-plugin-demo/blob/main/CHANGELOG.md). -->

## License

See [LICENSE](https://github.com/robingenz/capacitor-mlkit-plugin-demo/blob/main/LICENSE).
