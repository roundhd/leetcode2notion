# leetcode2notion

## Prerequisite
Create a database in Notion with minimum fields of `Name`, `Link`, `Date`, `Difficulty` and `Notes` to work with this extension. 
I have extracted the following [database template](https://team516.notion.site/6c4b24c4f502457f9c6b869e7dca2423?v=0a203e99dca84d32bc99bc9eb596f668) from one that I have previously used.
<img width="1160" alt="image" src="https://user-images.githubusercontent.com/12630845/232248655-c2c509e3-a332-4835-81dc-3411b5eb2aef.png">


## Getting Started

1. add a `secret.ts` under `src` with the following 3 lines

```
const NOTION_KEY = "" // your integration notion key started with "secret_"
const NOTION_DATABASE_ID = "" // your notion database id
export { NOTION_KEY, NOTION_DATABASE_ID }
```

2. `npm i` to install dependancies
3. `npm start` to start running the fast development mode Webpack build process that bundle files into the `dist` folder
4. `npm i --save-dev <package_name>` to install new packages

## Loading The Chrome Extension

1. Open Chrome and navigate to `chrome://extensions/`
2. Toggle on `Developer mode` in the top right corner
3. Click `Load unpacked`
4. Select the entire `dist` folder

## Production Build

1. `npm run build` to generate a minimized production build in the `dist` folder
2. ZIP the entire `dist` folder (e.g. `dist.zip`)
3. Publish the ZIP file on the Chrome Web Store Developer Dashboard!

## Important Default Boilerplate Notes

- Folders get flattened, static references to images from HTML do not need to be relative (i.e. `icon.png` instead of `../static/icon.png`)
- Importing local ts/tsx/css files should be relative, since Webpack will build a dependancy graph using these paths
- Update the manifest file as per usual for chrome related permissions, references to files in here should also be flattened and not be relative
