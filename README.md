<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/bianca-morris/modderize">
    <img src="public/modderize_logo.svg" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Modderize</h3>

  <p align="center">
    A platform for creating and managing video game mod requests
    <br />
    <!-- <a href="https://github.com/bianca-morris/modderize"><strong>Explore the docs »</strong></a> -->
    <br />
    <br />
    <a href="https://github.com/bianca-morris/modderize">View Demo</a>
    ·
    <a href="https://github.com/bianca-morris/modderize/issues">Report Bug</a>
    ·
    <a href="https://github.com/bianca-morris/modderize/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#local-installation">Local Installation</a></li>
      </ul>
    </li>
    <!-- <li><a href="#usage">Usage</a></li> -->
    <li><a href="#design-documentation">Design Documentation</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Modderize website](https://i.gyazo.com/c935bc17cb0dbee1291b32ef4a17d026.jpg)](https://www.modderize.me)

Modderize is a web application for video game modders to track and fulfill feature requests from their communities; gamers can use it to make requests and discover new mod content. This application was built by [Bianca Morris](https://www.biancamorris.com/) to fulfill the Capstone requirement of the Digital Media Design ALM Degree at Harvard Extension School.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

-   [![Next][Next.js]][Next-url] @ 13.1.6
-   [![React][React.js]][React-url] @ 18.2.0
-   [![Tailwind][Tailwind CSS]][Tailwind-url] @ 3.2.4
-   [![Firebase][Firebase]][Firebase-url] @ 9.16.0
-   [![Typescript][Typescript]][Typescript-url] @ 4.9.4

And deployed with Vercel.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running on your machine, follow these simple example steps. Note: This project was build on a Mac; Windows or Linux installations may be slightly different.

### Prerequisites

There are a few dependencies that will not be installed as a result of the 'local installation' process below. These are as follows:

-   Download and install [NodeJS](https://nodejs.dev/en/download/) at v18 (Can also use [node version manager](https://nodejs.org/en/download/package-manager#nvm), of course.)
-   NPM comes installed (For reference: version v8.19.3 was used to build this.)

### Local Installation

1. Clone the repo and navigate to it
    ```sh
    git clone https://github.com/bianca-morris/modderize.git
    cd modderize
    ```
2. Install NPM packages from `package-lock.json`
    ```sh
    npm ci
    ```
3. Create a copy of `.env.local-template` at the root of this repo; name it `.env.local` or `.env.sh`
4. Set up a Google Firebase account and project (with Authentication, Firestore, and Cloud Storage); [tutorial here](https://firebase.google.com/docs/web/setup#create-firebase-project-and-app).
5. Enter the keys from your Firebase project into the `.env.local` file; save it.
    ```sh
    export NEXT_PUBLIC_FIREBASE_API_KEY=<YOUR INFO HERE>
    export NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<YOUR INFO HERE>
    export NEXT_PUBLIC_FIREBASE_PROJECT_ID=<YOUR INFO HERE>
    export NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<YOUR INFO HERE>
    export NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<YOUR INFO HERE>
    export NEXT_PUBLIC_FIREBASE_APP_ID=<YOUR INFO HERE>
    ```
6. Load the environment variables
    ```sh
    source <path to your .env.local file>
    ```
7. Start the dev server
    ```sh
    npm run dev
    ```
8. Go to [localhost:3000](http://localhost:3000/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Design Documentation -->

## Design Documentation

This repository also includes some documentation of the design system/component library used to create this website.

[![Image from Gyazo](https://i.gyazo.com/ed816cf791c6a8c266571c0b51701d35.png)](https://gyazo.com/ed816cf791c6a8c266571c0b51701d35)

In order to access this documentation, set up the environment using the instructions in the [local installation](#local-installation) section above, and then follow the following steps:

1. Ensure the most recent minified CSS bundle is built by running:

```
npm run minify
```

2. Run storybook; it should open up in your browser automatically, but if it doesn't, it will run at `localhost:6006`.

```
npm run storybook
```

_Note: Not every component used within the application is documented, however, the basic building blocks that do not require data from Firebase to function are mostly accounted for._

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Bianca Morris - biancaallynm@protonmail.com

Project Link: [https://github.com/bianca-morris/modderize](https://github.com/bianca-morris/modderize)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

-   Firebase, Tailwind, NextJS, and Typescript Documentation (as well as docs for other npm dependencies like `react-share`, `react-firebase-hooks`, `recoil`, `sorted-array-functions`, etc.)
-   [Othneildrew](https://github.com/othneildrew/Best-README-Template), for the template used for this README
-   This project was created from the official [Next.js TailwindCSS template](https://github.com/vercel/next.js/tree/canary/examples/with-tailwindcss)
-   [FreeCodeCamp.com](https://www.freecodecamp.com/) for their [Reddit Clone](https://www.youtube.com/watch?v=rCm5RVYKWVg) and [LinkedIn Clone](https://www.youtube.com/watch?v=HimR8Xtz17U) tutorials
-   [Tailwind UI](https://tailwindui.com/) and [HeadlessUI](https://headlessui.com/) for a variety of components and design patterns
-   [Dan Abramov](https://overreacted.io/making-setinterval-declarative-with-react-hooks/) for the `useInterval` hook (and for making React, I guess...)
-   [David Walsh](https://davidwalsh.name/react-useprevious-hook) for the `usePrevious` hook
-   [achuinard](https://github.com/CSFrequency/react-firebase-hooks/issues/13) for the `useCollectionDataStatic` hook
-   [Canva](https://www.canva.com/), which I used to create the logo
-   [Framer](https://www.framer.com/) and [Figma](https://www.figma.com/), which I used to mock up the prototypes
-   [Privacy Policy](https://www.freeprivacypolicy.com/free-privacy-policy-generator/) generator and [Terms of Use](https://www.termsfeed.com/terms-use-generator/) generator for content for legal pages
-   [Karina Lin-Murphy](https://teach.extension.harvard.edu/people/karina-lin), Capstone Advisor
-   Dr. Hongming Wang, Research Advisor
-   [Alexander Balashov](https://github.com/alexkb0009), Industry Collaborator
-   Everyone in DGMD E-599 Spring 2023 for their feedback and commiseration

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Tailwind CSS]: https://img.shields.io/badge/Tailwind%20CSS-0c142c?style=for-the-badge&logo=tailwind%20CSS&logoColor=06B6D4
[Tailwind-url]: https://tailwindcss.com/
[Firebase]: https://img.shields.io/badge/Firebase-eceff1?style=for-the-badge&logo=firebase&logoColor=FFCA28
[Firebase-url]: https://firebase.google.com/
[Typescript]: https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=ffffff
[Typescript-url]: https://www.typescriptlang.org/
