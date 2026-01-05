// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Open Source Security',
  tagline: 'Comprehensive guide to securing open source software',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://ariangh001.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/TechWithArian/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ariangh001', // Usually your GitHub org/user name.
  projectName: 'TechWithArian', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/', // Serve docs at the root URL - home page will show sidebar
          sidebarCollapsible: true,
          sidebarCollapsed: false,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false, // Disable blog plugin
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: true, // Force dark mode (hacker theme)
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'Open Source Security',
        logo: {
          alt: 'Open Source Security Logo',
          src: 'img/logo.svg',
        },
        items: [], // No navbar items - sidebar only
      },
      footer: {
        style: 'dark', // Matches our black hacker theme
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Home',
                to: '/',
              },
              {
                label: 'Fundamentals',
                to: '/fundamentals/overview',
              },
              {
                label: 'Best Practices',
                to: '/best-practices/secure-coding',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Open Source Security. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.vsDark,
        darkTheme: prismThemes.vsDark,
        additionalLanguages: ['bash', 'powershell', 'python', 'javascript', 'json'],
      },
    }),
};

export default config;
