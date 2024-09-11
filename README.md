# Rijksmuseum App

## Project Overview

Welcome to the **Rijksmuseum App**! This is a web app I built to pull in and showcase artwork from the Rijksmuseum API. With features like filters, sorting options, and a search tool, users can really dig into the art in an interactive way.

---

## Features

- **Search & Filter**: Find artworks by filtering through options like color, artist, material, by sorting relevance.
- **Infinite Scroll**: As you scroll, new artwork keeps loading.
- **User Authentication**: Sign in with Firebase.
- **Responsive Design**: Both desktop and mobile devices.
- **Persistent State**: Using Redux Persist, settings and search preferences stay intact, in case user leave and come back.

---

## Tech Stack

Here’s a breakdown of the technologies I used to bring this project to life:

### 1. **React**

- To build the UI in a modular and reusable way.

### 2. **React Redux** and **Redux Toolkit (@reduxjs/toolkit)**

- To connect my components to the global state to ensure data flow throughout the app.
- To manage the app’s state, especially with all the filters and search parameters.
- To utilize built-in cache mechanizm to provide caching

### 3. **Custom Hook**

- To provide reusability and clean code custom hooks are developed.

### 4. **Redux Persist (redux-persist)**

- To prevent users lose their preferences when they closed the app.

### 5. **React Router DOM**

- For navigation between different sections of the app.

### 6. **Tailwind CSS**

- For styling, it is used Tailwind CSS framework to easily design responsive layouts.

### 7. **TypeScript**

- To prevent prevent bugs before they appeared. The static typing made the code more predictable and easier to maintain.

### 8. **Lodash**

- For some of the more complex operations.

### 9. **Firebase**

- For user authentication, allowing people to log in and, later, manage their favorite artworks.

### 10. **Vite**

- To build project. It is fast, making development more efficient.

### 11. **React Loading Skeleton**

- To improve the overall experience. While data is loading, users see skeleton placeholders instead of waiting for the content to appear.

### 12. **ESLint & TypeScript-ESLint**

- To catch issues early, keep everything clean and make the code follows best practices

---

### What is next

- **Enhanced Caching**: Redux toolkite is utilized for caching but to provide more control over caching Node.js server can be utilized
- **User Favorites**: Allow users to save and manage their favorite artworks.
- **Social Authentication**: Make it possible for users to sign in with Google or other social accounts.
- **Theme**: Add detailed dark/light mode theme
- **Test**: Add tests to ensure the app robust

---

# Answer

```ts
function grouppedAnagrams(words: string[]): string[][] {
  const map: Map<string, string[]> = new Map();

  for (const word of words) {
    // sanitized keyword is used as to create an anagram group of which expected output looks like map-like object values method call result
    const sanitizedWord = word.toLowerCase().split("").sort().join("");

    // checks if an anagram grup is exist
    if (map.has(sanitizedWord)) {
      // if so, gets group values and add the iterated word instance to values of the key-value pair
      map.get(sanitizedWord)?.push(word);
    } else {
      // if not, sets a new anagram group and the iterated word instance as values of the key-value pair
      map.set(sanitizedWord, [word]);
    }
  }
  // creates an array that represent values of the map-like object as an expected output
  return Array.from(map.values());
}

const output = grouppedAnagrams([
  "rope",
  "pore",
  "repo",
  "red rum",
  "murder",
  "listen",
  "silent",
  "endeavour",
]);
console.log(output);
```
