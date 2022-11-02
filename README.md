# Cat blog

## My tenant info

tenantId: `104e3259-6e9b-441a-84b2-e245878c14f8`

apiKey: `950a7a91-9435-4179-b89f-3944c2f128f8`

name: `crispjam`

###  Uploaded images
there seems to be no way to retrieve all uploaded images, so I'll save all of their ids here
```json
  {
    "imageId": "e7ae6fa9-c22e-497e-b659-d20e50af978f",
    "name": "kitten.jpg"
  }
  {
    "imageId": "aefdb73f-034f-4072-a7db-bcc327f7ab56",
    "name": "cathouse.jpg"
  }
```

## Encountered issues
### fast refresh not working in NextJs
fix: https://stackoverflow.com/a/70947588/11034352

### component mounts twice
fix: turn off react strict mode

https://stackoverflow.com/a/71835700/11034352

### 'React' refers to a UMD global, but the current file is a module
fix: https://stackoverflow.com/a/65539274/11034352

### Binding element 'params' implicitly has an 'any' type.
fix: https://github.com/vercel/next.js/discussion16522#discussioncomment-130070

### Pre-rendered pages not allowed to render images
When using server-side rendering (SSR) or static-site generation (SSG) for pages that use images, there is an issue with displaying them.

The images are retrieved from the backend by the following endpoint
```
https://fullstack.exercise.applifting.cz/images/<img_id>
```
However, this url cannot be passed directly into the `src` of an `<img>` tag because the endpoint requires API_KEY in the request's header for identificating the tenant.

This means it is necessary to first get the image, turn it into a blob, retrieve the url to this blob and then use the url as `src` in the `<img>` tag.

This works fine, when the fetching (calling the API) is done on at client's side. The resulting url looks like this:
```
"blob:http://localhost:3000/228edeea-ceb9-4e4e-bb95-d2d5138d0718"
```

However, when using SSG or SSR, the blob is created within the NextJS backend server and looks like this:
```
blob:nodedata:1fb79cfe-0a3b-4c90-8ff3-3665f2162721
```
When trying to use such a url as `src` in the `<img` tag, the browser throws the following error:
```
Not allowed to load local resource: blob:nodedata:ccd32068-cb28-4c6a-81a8-981bc385b9c2
```
It might be possible to bypass this somehow, but that doesn't seem like a good solution.

For now, the **best possible solution** is probably to not use SSR or SSG for pages that need to fetch images.

Note for **potential backend** implementation:
1. Since API_KEY is not secret anyway, it might be best to expose downloading images without this header requirement. This might be possible like so:
    ```
    https://fullstack.exercise.applifting.cz/<user_name>/images/<img_id>
    ```
2. This way, the endpoint can be used directly in the `<img>` tag without the need to download the image beforehand.

### Where to store the auth_token
Security discussion: https://stackoverflow.com/q/44133536/11034352
1. [Web storage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
    1. Session storage (deleted upon closing browser or tab)
    2. Local storage (persisted upon closing browser or tab)
2. Client side cookies

### Markdown considerations
The handling of markdown consists of two parts
1. Rendering existing articles
2. Allowing users to edit and create new articles with markdown

It is important that the markdown renders **consistently** during creation and when viewing finished articles.

There seem to be different options:
1. Only use a rendering library
    - Finished articles are simply rendered by this library
    - During editing, there is a simple text area and a preview rendered by the library
    - This lacks syntax higlighting (and/or) WYSIWYG options for inexperienced users
    - https://github.com/markdown-it/markdown-it
    - https://github.com/remarkjs/remark
    - https://github.com/markedjs/marked
2. Use a full-fledged WYSIWYG markdown editor
    - Live editor for editing
    - Readonly editor for displaying finished articles
        - Might be less efficient than a simple rendering library
    - https://milkdown.dev
    - https://www.reddit.com/r/javascript/comments/nce8v1/askjs_best_javascript_markdown_wysiwyg_editors/

Thing to also consider: html sanitation to avoid vulnerabilities


## Relevant links

- [Assignment](https://github.com/Applifting/fullstack-exercise/blob/master/assignment.md)
- [Prototype](https://www.figma.com/proto/VagZOrr3TjTAxGCpCUTSrO/Applifting-%7C-Full-Stack-Cvi%C4%8Den%C3%AD?node-id=2%3A3&viewport=148%2C245%2C0.12103988230228424&scaling=min-zoom)
- [Screens](https://www.figma.com/file/VagZOrr3TjTAxGCpCUTSrO/Applifting-|-Full-Stack-Cvičení)
- [OpenAPI specification](https://github.com/Applifting/fullstack-exercise/blob/master/api.yml)
- [JSON schema specification for WebSocket API](https://github.com/Applifting/fullstack-exercise/blob/master/ws.json)
- [Deployed Backend](https://fullstack.exercise.applifting.cz) `https://fullstack.exercise.applifting.cz`


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
