### Convention of Project Structure:

- src
  - api
    - [api-folder-name]
      - [apiFileName].js
  - assets
    - images
    - fonts
      - [folder-name]
        - [fontName].ttf
  - components
    - [folder-name]
      - [folder-name]_
        - [ComponentName].jsx
        - [styles].scss
        - [fileNameConstant].js
  - pages
    - [folder-name-page]
      - [pageName].jsx
      - [styles].css
  - routes
    - [NameRoutes].jsx
  - store
    - index
    - [sliceName]Slice.js
  - constants
    - [folder-name]
      - [fileName].js
  - helpers
    - [helperName].js
  - hooks
    - [hookName].jsx
  - validation
    - [validationFileName].js
  - App.js
  - App.scss
  - index.js
  - index.scss
- .dockerignore
- .env
- .eslintrc.js
- .gitignore
- .prettierignore
- .prettierrc.js
- .travis.yml
- Dockerfile
- package.json
- yarn.lock
- README.md

### Documentation

###### If some functionality is not clear, please refer to the documentation below.

- handleSort

```react
const useResizeObserver = (element, callback) => {
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        callback(entry.contentRect.width);
      }
    });

    if (element) {
      resizeObserver.observe(element);

      return () => {
        resizeObserver.unobserve(element);
      };
    }
  }, [element, callback]);
};
```

1. `resizeObserver` - an instance of ResizeObserver that triggers the provided callback when the size of the observed element changes.
2. `for (let entry of entries) {...}` - iterates over the ResizeObserver entries, where each entry contains information about the observed element's size changes.
3. `number` - the width of the observed element's content rectangle, loop returns nothing.
4. `if (element) {...}` - checks if the element is truthy (not null or undefined) before setting up the ResizeObserver. This helps prevent errors when the element is not available.
5. `resizeObserver.observe(element)` - initiates the ResizeObserver to start monitoring size changes on the specified element.
6. `resizeObserver.unobserve(element)` - cleans up by unsubscribing from the ResizeObserver when the component is unmounted or when the observed element changes.

- findVideoBuildBlockByID

```react
const findVideoBuildBlockByID = (mailEditorState, videoBuildBlockId) => {
  return mailEditorState.reduce((acc, el) => {
    if (el.id === videoBuildBlockId) {
      acc.push(el);
    } else if (el.child) {
      el.child.forEach((i) => {
        if (i.children) {
          acc.push(...i.children.filter((ch) => ch.id === videoBuildBlockId));
        }
      });
    }
    return acc;
  }, []);
};
```

1. `if (el.id === videoBuildBlockId) {}` - check if the current element's ID matches the target video build block ID
2. `else if (el.child) {}` - check child elements for matching video build block ID
3. `acc.push(...i.children.filter((ch) => ch.id === videoBuildBlockId))` - Filter and include matching children in the result array

## Reusable Components

**Title** - is a text with diff settings: `margins`, `paddings`, `colors`, ..
- components
 - Title
  - Title.jsx
  - styles.css

**Wrappers** - is block with styles that provides some amount of space around of text with buttons, etc.
###### Usage: [SidebarTools, SendMailModal]
- components
 - wrappers
  - TextIconWrapper.jsx
  - styles.css
