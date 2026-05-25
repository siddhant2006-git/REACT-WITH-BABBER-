# Project Overview: Vite Clone Grify

## What this project is

This is a React + Vite web application that aims to display GIFs from the Giphy API. It uses:

- React 19 with hooks
- Vite as the build tool
- React Router v7 for page navigation
- `@giphy/js-fetch-api` to fetch GIF data from Giphy
- Tailwind CSS for styling

## How the app is intended to work

1. `App.jsx` sets up the main router inside `GifProvider`.
2. `GifProvider` creates a `GiphyFetch` instance using `import.meta.env.VITE_API_KEY`.
3. `Layout.jsx` renders a common page layout with the `Header` component and a route outlet.
4. `Header.jsx` fetches categories from Giphy and shows them as clickable cards.
5. `Home.jsx` is intended to show trending GIFs.
6. `Search.jsx` should show search results for a selected category.
7. `Single_gif.jsx` should show details for one GIF.

## Key components

- `src/context/context.jsx`
  - Provides global state for the GIF app.
  - Exposes `gf`, `gif`, `setGif`, `favorite`, `setFavorite`, `filter`, `setFilter`.

- `src/components/Header.jsx`
  - Fetches category data from Giphy.
  - Displays category cards and a toggle button.

- `src/components/filter-gif.jsx`
  - Defines a set of GIF filters for category buttons.
  - Uses context state `filter` and `setFilter`.

- `src/components/gifs.jsx`
  - Shows a GIF card and links to a detail page.
  - Uses `gif.type` and `gif.slug` to build a link.

- `src/pages/Home.jsx`
  - Fetches trending GIFs with the Giphy API.
  - Renders a banner and should show GIFs.

## Important behavior

- The app fetches trending GIFs when `Home` loads.
- `Header` fetches GIF categories when it mounts.
- The router defines these routes:
  - `/` → `Home`
  - `/search/:category` → `Search`
  - `/favarious` → `Favarious`
  - `/single_gif` → `Single_gif`

## Known issues and suggestions

### 1. `Home.jsx` has a rendering bug

In `src/pages/Home.jsx` you wrote:

```jsx
<div>
  <gifs />
</div>
```

This is invalid React JSX. You must import a component and use it as a capitalized component name, for example:

```jsx
import Gifs from "../components/gifs";

<Gifs gifs={gif} />;
```

Or rename the component to `GifList` and render it correctly.

### 2. `Search.jsx` and `Single_gif.jsx` are placeholder pages

Both currently return simple text:

```jsx
<div>Search</div>
```

You should implement these pages to render GIF results and single GIF details.

### 3. Route mismatch for GIF detail links

In `src/components/gifs.jsx` you link to:

```jsx
to={`/${gif.type}s/${gif.slug}`}
```

But `App.jsx` does not define a matching route for `/:type/:slug`. Add a detail route or change the link to an existing route.

### 4. `Layout.jsx` has a typo

You used `<diV className="container mx-auto px-4"></diV>`. Change it to `<div>`.

### 5. `Header.jsx` may assume structure that Giphy categories do not provide

The code uses `item.gif?.images?.preview_gif?.url` which may be undefined for category objects. Add a fallback image or text so the UI does not break when the payload differs.

### 6. `gif` state usage is incomplete

The context sets `gif` and `setGif`, but `Search` and `Single_gif` do not use them yet. `Home` fetches trending GIFs but never renders them in a list.

### 7. Environment key requirement

The app expects `VITE_API_KEY` in `.env`. Make sure you have a `.env` file with:

```
VITE_API_KEY=YOUR_GIPHY_API_KEY
```

## Suggested next steps

1. Fix `Home.jsx` to import and render a GIF list component.
2. Implement search results in `Search.jsx` using `useParams()` from React Router.
3. Add a route for individual GIF detail pages and implement `Single_gif.jsx`.
4. Validate category payload structure in `Header.jsx`.
5. Remove unused variables from context or use them consistently.
6. Add a nicer home page layout with trending GIF cards and category buttons.

## Quick commands

To run the app locally:

```bash
npm install
npm run dev
```

To build for production:

```bash
npm run build
```

## Summary text for sharing

This project is a React + Vite GIF browser that uses Giphy’s JS Fetch API. It has a global context provider, a header that loads categories, and routes for home, search, favorites, and single GIF pages. The current code needs fixes in `Home.jsx` (invalid JSX), route setup for GIF details, and implementation of the `Search` and `Single_gif` pages. The `.env` file must also include `VITE_API_KEY`.
