# React FastAPI Lab

A React frontend built to connect with
the FastAPI Student Management API
(`student-api`), completed as part of a
multi-day full-stack challenge (Days- 14).

## Tech Stack

- **React** (via Vite) - frontend framework
- **React Router** - client-side routing
- Plain CSS (component-scoped stylesheets)

## Setup

```bash
git clone <your-repo-url>
cd react- fastapi-lab
npm install
npm run dev

Visit http://localhost:5173 to view the app.

Project Structure

src/
├── components/       # Reusable UI pieces (Navbar, Sidebar)
├── layouts/          # Page layout wrappers (DashboardLayout)
├── pages/            # Route-level pages (StudentList, AddStudent)
├── App.jsx           # Routing setup
└── main.jsx          # App entry point

Scaffolded the React app and built a responsive dashboard layout.

What I built

New Vite + React app (react-fastapi-lab)
Navbar component — app title, nav links, and a mobile menu button
Sidebar component — navigation links, collapsible on smaller screens
DashboardLayout — combines Navbar + Sidebar + page content, manages sidebar open/close state
Placeholder pages: StudentList, AddStudent
Responsive behavior: sidebar hides behind a ☰ button on screens under 768px wide

Challenges

Hit several Failed to resolve import errors from Vite because some component/page files (e.g. DashboardLayout.css, StudentList.jsx) hadn’t been created yet when App.jsx already referenced them.
A filename mismatch (StudentsList.jsx vs. the expected StudentList.jsx) caused an import error — file names must match imports exactly, including plural/singular forms.
Learned to test responsive layouts using browser DevTools’ device toolbar instead of physically resizing the window.

What I learned

React component files and their CSS are typically paired 1:1 and imported directly into the component (import "./Navbar.css").
Vite’s error overlay clearly names the missing file and import path, which makes tracking down typos/missing files straightforward once you know to check both file existence and exact naming.
Separating layout (DashboardLayout) from reusable pieces (Navbar, Sidebar) from routed pages (StudentList, AddStudent) keeps the folder structure scalable as more pages get added in later days.


To add it:
```bash
code README.md


