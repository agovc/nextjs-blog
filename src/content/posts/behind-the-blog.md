---
id: behind-the-blog
title: "Behind the Blog: The Tech Stack that Powers My Website"
isPublished: true
date: "2023-08-30"
---

I have wanted to start a blog for a while now, a place to share my thoughts and what I've learned. Even though it's a simple site for now, one thing I really want for my blog is the ability to be fully customizable. So, let's dive into how I did it:

# My Blog's Tech Foundation

Since my content will primarily focus on frontend development, specifically React, I opted to use [Next.js](https://nextjs.org/) for my blog. This choice allows me to harness the power of React's [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components) while simultaneously utilizing [Static Site Generation (SSG)](https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation) for my blog post content. For styling, I rely on [Tailwind](https://tailwindcss.com/), which enables me to customize components without writing custom CSS. Lastly, I deploy my application on [Vercel](https://vercel.com/).

# Code Quality Matters

Before diving into writing posts or personalizing my site, I made the decision to employ some essential tools to ensure code quality. I turned to [Prettier](https://prettier.io/) for code formatting and [ESLint](https://eslint.org/) to spot any issues within my codebase, creating a simple Continuous Integration (CI) pipeline.

- To kick things off, I added some scripts to execute Prettier and ESLint:

<CodeBlock code={`
     "scripts": {
        "format": "prettier --write src",
        "format:check": "prettier --check src",
        "lint": "next lint --max-warnings 0"
    }
    `} language="tsx" />

- Next, I incorporated additional scripts for type checking and combined them into one:

<CodeBlock code={`
      "scripts": {
        "typecheck": "tsc --noEmit",
        "format": "prettier --write src",
        "format:check": "prettier --check src",
        "lint": "next lint --max-warnings 0",
        "test": "npm run typecheck && npm run lint && npm run format:check"
    }
    `} language="tsx" />

- Finally, I crafted a GitHub workflow for my CI:

<CodeBlock code={`
    name: CI

    on:
    push:
        branches:
        - main
        - dev
    pull_request:
        branches:
        - main
        - dev

    jobs:
    build:
        runs-on: ubuntu-latest

        steps:
        - name: Checkout code
            uses: actions/checkout@v2

        - name: Setup Node
            uses: actions/setup-node@v2
            with:
            node-version: 18

        - name: Install dependencies
            run: npm install

        - name: Run tests
            run: npm test
    `} language="yaml" />

This workflow ensures that there are no errors before merging changes into my repository, guaranteeing a robust codebase right from the start.

# My Blog's Content Magic

For my blog posts, I employ MDX. MDX enables the use of JSX within markdown files, allowing me to leverage React components seamlessly. There are numerous libraries available for MDX, and after careful consideration, I opted for [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) because it enables fetching MDX files that reside outside of my application.

As for the metadata of the blog posts, I utilize Frontmatter within the MDX files, which follows a YAML-like key/value pairing structure. Here's an example:

<CodeBlock code={`
    ---
    title: "Behind the Blog: The Tech Stack that Powers My Website"
    isPublished: true
    publishedOn: "2023-09-30"
    ---

    ## Blog post here.
    `} language="mdx" />

# Crafting Aesthetics

Previously, I mentioned that I use Tailwind for styling. Here are some of the benefits of using Tailwind:

- **No Custom CSS:** With Tailwind, there's no need to write custom CSS for your application.

- **Highly Customizable:** It offers a high degree of customization. For instance, I specified various padding values for different breakpoints in my container, as shown in the following example:

<CodeBlock code={`
      theme: {
      container: {
        padding: {
          DEFAULT: '3rem',
          sm: '4rem',
          lg: '6rem',
          xl: '8rem',
        },
      },
    }
    `} language="tsx" />

- **Consistency:** Tailwind promotes a consistent and standardized approach to styling, making it easier to maintain and scale your project.

- **Responsive Design:** Tailwind includes responsive design utilities that allow you to create responsive layouts without having to write custom media queries.

In the end, there's no such thing as a perfect configuration, and undoubtedly, many aspects will evolve over time. However, I'm committed to keeping you in the loop with updates on how everything progresses. Building and maintaining a blog is not just about the tech stack or the code; it's a dynamic journey of growth and learning. So, stay tuned for more insights, tips, and the continued evolution of this blog. Thank you for joining me on this exciting adventure!
