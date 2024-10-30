Trello Clone Application

The aim of this project is to compare the performance of two popular frontend technologies Next js and Angular, by building a Trello-like task management application in each. This comparison focuses on DOM handling efficiency, memory management, and user experience in a realistic single-page app.

Project Structure
The repository contains two folders:
trello-clone-next: The Trello clone built in Next Js.
trello-clone-angular: The Trello clone built in Angular

Functionalities
Both applications include:

Board Management: Create, rename, and delete boards.
List Management: Add, edit, and delete lists within boards.
Card Management: Add, edit, delete, and reorder cards within lists.
Drag-and-Drop: Move cards between lists smoothly.
Local Data Persistence: Stores data locally to simulate real application usage.
These features allow for a thorough comparison of React and Angular in handling frequent updates and dynamic interactions.

Packages:
React virsion 18 ( could have used 19 but it is in pre release and some dependencies were not able to install on it)
npm install @dnd-kit/core  (dnd-kit for drag and drop functionality in react and next)  
npm install @dnd-kit/sortable (sorting top - bottom)
npm install uuid (generates random unique ID and eliminates risk of duplicate id : uuidv4())
