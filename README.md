# DocSense landing site

The static marketing site for DocSense - a document Q&A experience built around source-aware answers.

## Live site

After GitHub Pages is enabled, the site is available at:

https://atishay-kap.github.io/DocSense-Website/

## Stack

- HTML, CSS, and vanilla JavaScript
- Llama models through the Groq API for AI answers
- Local screenshots and product walkthrough video in `assets/`

## Run locally

Open `docsense-landing.html` in a modern browser. No package install or build command is required.

## Publish for free with GitHub Pages

This is the recommended option for this repository because the site is entirely static.

1. Create a **public** GitHub repository and push this folder.
2. In the repository, go to **Settings** > **Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and the `/ (root)` folder, then save.
5. GitHub Pages will publish the site at the URL shown in the Pages settings.

`index.html` routes the published root URL to the landing page and `.nojekyll` keeps GitHub Pages from applying Jekyll processing.

## Repository notes

- The repository includes an MIT license in [LICENSE](LICENSE).
- The walkthrough video is approximately 75 MB, below GitHub's 100 MB single-file Git limit. Keep future media under that limit or store it externally.
- Do not commit API keys, `.env` files, or private source documents.

## License

MIT - see [LICENSE](LICENSE).
