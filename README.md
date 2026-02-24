# Assignment-4: JavaScript DOM Manipulation — Q&A

---

## 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?


### Characterstics of getElementById()
- Selects **one element** by its `id` attribute.
- Returns a **single element** (or `null` if not found).
- IDs must be unique on a page, so it always returns one result.

```js
var title = document.getElementById("dashboard-total-count");
```

### Characterstics of getElementsByClassName()
- Selects **all elements** that have a specific class name.
- Returns a **live HTMLCollection** (updates automatically if the DOM changes).
- You access results by index like an array.

```js
var cards = document.getElementsByClassName("job-listing-card");
var firstCard = cards[0];
```

### Characterstics of querySelector()
- Selects **the first element** that matches any CSS selector.
- Returns a **single element** (or `null`).
- Much more flexible — you can use IDs, classes, attributes, or complex CSS selectors.

```js
var badge = document.querySelector(".job-status-badge");
var button = document.querySelector("#filter-all-btn");
```

### Characterstics of querySelectorAll()
- Selects **all elements** matching a CSS selector.
- Returns a **static NodeList** (does NOT update if the DOM changes later).

```js
var allCards = document.querySelectorAll(".job-listing-card");
```

---

## 2. How do you create and insert a new element into the DOM?

### Step 1: Create the element
```js
var newCard = document.createElement("div");
```

### Step 2: Set content and attributes
```js
newCard.innerText = "This is a new job card";
newCard.className = "job-listing-card card bg-base-100";
newCard.setAttribute("data-job-status", "not-applied");
```

### Step 3: Insert into the DOM

**appendChild()** — adds as the last child:
```js
var container = document.getElementById("job-cards-section");
container.appendChild(newCard);
```

**insertBefore()** — adds before a specific child:
```js
var firstChild = container.firstChild;
container.insertBefore(newCard, firstChild);
```

---

## 3. What is Event Bubbling? And how does it work?

**Event Bubbling** is a behavior where an event (like a click) starts at the element you clicked, then travels **upward** through all of its parent elements, all the way to the `document`.

### How it works

If you have this HTML:
```html
<div id="grandparent">
    <div id="parent">
        <button id="child">Click Me</button>
    </div>
</div>
```

And this JavaScript:
```js
document.getElementById("child").addEventListener("click", function() {
    console.log("Child clicked");
});

document.getElementById("parent").addEventListener("click", function() {
    console.log("Parent clicked");
});

document.getElementById("grandparent").addEventListener("click", function() {
    console.log("Grandparent clicked");
});
```

**If you click the button, the console shows:**
```
Child clicked
Parent clicked
Grandparent clicked
```

All three fire because the event **bubbles up** from child → parent → grandparent.

---

## 4. What is Event Delegation in JavaScript? Why is it useful?

**Event Delegation** is a pattern where instead of adding an event listener to every child element, you add **one listener to a parent element** and use the event's `target` property to figure out which child was actually clicked.

### How it works

Instead of this (attaching to every button):
```js
var allButtons = document.querySelectorAll(".delete-btn");
for (var i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener("click", function() {
        console.log("Delete button clicked");
    });
}
```

We add one listener on the parent:
```js
var container = document.getElementById("job-cards-section");

container.addEventListener("click", function(event) {
    if (event.target.classList.contains("delete-btn")) {
        console.log("Delete button clicked");
    }
});
```

### Why is it useful?

1. One listener instead of many. If you have 100 cards, you need 1 listener instead of 100.

2. If you add new cards to the page later (after page load), the delegated listener automatically works for them. Individual listeners would not work on elements added later.

3. Cleaner and simpler, especially when elements are added or removed frequently.


---

## 5. What is the difference between preventDefault() and stopPropagation() methods?


### preventDefault()
- **Stops the browser's default action** for that event.
- Does not stop the event from bubbling to parent elements.
- Commonly used with: form submissions, link clicks, checkbox toggles.

```js
// Prevent a form from submitting and refreshing the page
document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault();
    console.log("Form submission blocked!");
});

// Prevent a link from navigating
document.getElementById("myLink").addEventListener("click", function(event) {
    event.preventDefault();
    console.log("Link click blocked, page did NOT navigate");
});
```

### stopPropagation()
- **Stops the event from bubbling up** to parent elements.
- Does not stop the browser's default action.

```js
document.getElementById("child").addEventListener("click", function(event) {
    event.stopPropagation();
    console.log("Only this runs, parent listeners will NOT fire");
});

document.getElementById("parent").addEventListener("click", function() {
    console.log("This will NOT run if child stopPropagation is called");
});
```