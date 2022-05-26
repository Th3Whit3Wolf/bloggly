<div  id="top"></div>

<!--

*** README format taken from https://github.com/Th3Whit3Wolf/bloggly/blob/master/README.md

*** Thanks for checking out our project. If you have a suggestion

*** that would make this better, please fork the repo and create a pull request

*** or simply open an issue with the tag "enhancement".

*** Don't forget to give the project a star!

*** Thanks again! Now go create something AMAZING! :D

-->

<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->

<br  />
<div  align="center">
<a href="https://github.com/Th3Whit3Wolf/bloggly">
<img src="ui/public/android-chrome-512x512.png/logo.png" alt="Logo" width="256" height="256">
</a>

<h3  align="center">Bloggly</h3>

<p  align="center">
A simple blogging platform
<br  />
<a href="https://github.com/Th3Whit3Wolf/bloggly"><strong>Explore the docs »</strong></a>
<br />
<br />
<a href="https://bloggly-ui.herokuapp.com/">View Demo</a>
·
<a  href="https://github.com/Th3Whit3Wolf/bloggly/issues">Report Bug</a>
·
<a  href="https://github.com/Th3Whit3Wolf/bloggly/issues">Request Feature</a>
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
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<!--[![Product Name Screen Shot][product-screenshot]](https://example.com)-->

There are many blogging platforms out there but this one is mine.

Please **_DON'T_** use this. This is a project for a course. It is not suitable for anyone.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

-   [React](https://reactjs.org/)
-   [React Router](https://reactrouter.com/)
-   [MUI](https://mui.com/)
-   [Vite](https://vitejs.dev/)
-   [Express](https://expressjs.com/)
-   [Prisma](https://www.prisma.io/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To test out this software we need to install the dependencies, start docker, and then run the ui & api servers.

### Prerequisites

Install yarn

-   npm
    ```sh
    npm install npm@latest -g
    ```
    or check [yarn installation](https://classic.yarnpkg.com/lang/en/docs/install) for alternative methods
-   docker
    Go [here](https://docs.docker.com/get-docker/) for details on installing docker for your operating system

### Installation

To install the bloggly run the following commands.

1. Clone the repo
    ```sh
    git clone https://github.com/Th3Whit3Wolf/bloggly.git
    ```
2. Move into the newly created repo directory
    ```sh
    cd bloggly
    ```
3. Install project dependencies
    ```sh
    yarn
    ```

<!-- USAGE EXAMPLES -->

## Usage

To run we need to start docker to get the database running and the start our frontend and backend servers

1. Run docker
    ```sh
    docker compose up -d
    ```
2. Startup the servers
    ```sh
    yarn workspace api run dev & && \
    yarn workspace ui run dev
    ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

-   [ ] Feature 1
-   [ ] Feature 2
-   [ ] Feature 3
    -   [ ] Nested Feature

See the [open issues](https://github.com/Th3Whit3Wolf/bloggly/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

-   [Choose an Open Source License](https://choosealicense.com)
-   [Img Shields](https://shields.io)
-   [GitHub Pages](https://pages.github.com)
-   [Font Awesome](https://fontawesome.com)
-   [React Icons](https://react-icons.github.io/react-icons/search)
-   [Iconfinder](https://www.iconfinder.com) for the [logo](https://www.iconfinder.com/icons/227062/blog_blogger_blogging_media_network_social_icon)
-   [Unsplash](https://unsplash.com) for [404 page background](https://unsplash.com/photos/I0fDR8xtApA) and the [landing page hero image](https://unsplash.com/photos/KE0nC8-58MQ)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/Th3Whit3Wolf/bloggly.svg?style=for-the-badge
[contributors-url]: https://github.com/Th3Whit3Wolf/bloggly/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Th3Whit3Wolf/bloggly.svg?style=for-the-badge
[forks-url]: https://github.com/Th3Whit3Wolf/bloggly/network/members
[stars-shield]: https://img.shields.io/github/stars/Th3Whit3Wolf/bloggly.svg?style=for-the-badge
[stars-url]: https://github.com/Th3Whit3Wolf/bloggly/stargazers
[issues-shield]: https://img.shields.io/github/issues/Th3Whit3Wolf/bloggly.svg?style=for-the-badge
[issues-url]: https://github.com/Th3Whit3Wolf/bloggly/issues
[license-shield]: https://img.shields.io/github/license/Th3Whit3Wolf/bloggly.svg?style=for-the-badge
[license-url]: https://github.com/Th3Whit3Wolf/bloggly/blob/main/LICENSE
[product-screenshot]: images/screenshot.png
