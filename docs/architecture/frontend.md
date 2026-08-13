# Frontend Architecture

The React frontend uses Vite and lives at the project root.

## Directory Structure

```
src/
├── App.jsx              # Root component + React Router
├── main.jsx             # Entry point
├── index.css            # Global styles
│
├── assets/              # Images, SVGs
├── components/          # Reusable UI (Navbar, PostCard, modals, etc.)
├── layouts/             # Page shells (MainLayout, SocialLayout, AdminLayout)
├── pages/               # Route-level screens
├── services/            # API communication layer (Axios)
├── hooks/               # Reusable React hooks
├── context/             # Global state (AuthContext)
├── utils/               # Helpers and constants
└── data/                # Mock data (temporary, until API integration)
```

## Pages (Existing)

| Page | Route | Purpose |
|------|-------|---------|
| Home | `/` | Feed of posts |
| Explore | `/explore` | Discover content |
| PostDetail | `/post/:id` | Single post + comments |
| CreatePost | `/create` | New post form |
| EditPost | `/post/:id/edit` | Edit own post |
| Profile | `/profile` | My Space (private) |
| Login | `/login` | Authentication |
| Register | `/register` | Registration |
| Categories | `/categories` | Browse categories |
| CategoryPosts | `/category/:slug` | Posts in a category |
| Trending | `/trending` | Trending posts |
| Settings | `/settings` | Account settings |
| Reports | `/reports` | User reports |
| Notifications | `/notifications` | Notification inbox |
| Guidelines | `/guidelines` | Community rules |
| AdminDashboard | `/admin` | Admin panel |
| NotFound | `*` | 404 page |

## Planned Service Layer

Each service maps to a backend API group:

| Service | Backend Router |
|---------|---------------|
| `authService` | `/api/auth` |
| `userService` | `/api/users` |
| `postService` | `/api/posts` |
| `categoryService` | `/api/categories` |
| `commentService` | `/api/posts/{id}/comments` |
| `likeService` | `/api/posts/{id}/like` |
| `reportService` | `/api/reports` |
| `notificationService` | `/api/notifications` |
| `adminService` | `/api/admin` |

All services are placeholder stubs. The shared Axios instance lives in `services/api.js`.

## Planned Hooks

| Hook | Purpose |
|------|---------|
| `useAuth` | Login state, login/logout/register |
| `usePosts` | Post CRUD and listing |
| `useNotifications` | Notification inbox |

## Planned Context

| Context | Purpose |
|---------|---------|
| `AuthContext` | Global auth state + provider |

## Layouts (Not Yet Wired)

| Layout | Used For |
|--------|----------|
| `MainLayout` | Landing, Guidelines |
| `SocialLayout` | Main app (Navbar + Footer + BottomNav) |
| `AdminLayout` | Admin dashboard |

Currently, layout logic remains inline in `App.jsx` and `AdminDashboard.jsx`. Layouts will be wired during the integration phase.

## Mock Data (Preserved)

| File | Contents |
|------|----------|
| `data/categories.js` | 13 categories |
| `data/posts.js` | Sample posts |
| `data/comments.js` | Sample comments |
| `data/users.js` | Sample users |
| `data/reports.js` | Sample reports |

These files remain in use until each page is connected to the real API.
