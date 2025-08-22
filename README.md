# Vulnerability Management Kanban Board

A modern, responsive vulnerability management system built with React and Redux, featuring drag-and-drop functionality, real-time filtering, and comprehensive task management.

## 🚀 Live Demo

- **Deployed Application**: [https://kanban-ze1u.vercel.app/]
- **GitHub Repository**: (https://github.com/abhiyadav3210/kanban)

## 📋 Features

### Core Functionality
- ✅ **User Authentication** - Secure login/signup with form validation
- ✅ **Kanban Board** - 5 status columns (Draft, Unsolved, Under Review, Solved, Needs Info)
- ✅ **Drag & Drop** - Seamless task movement between columns
- ✅ **CRUD Operations** - Create, read, update, delete vulnerabilities
- ✅ **Real-time Search** - Search by vulnerability ID or title
- ✅ **Advanced Filtering** - Filter by severity level and source
- ✅ **Dynamic Sorting** - Sort by date, severity, or CVSS score

### User Experience
- ✅ **Responsive Design** - Optimized for mobile, tablet, and desktop
- ✅ **Touch Support** - Mobile-friendly drag interactions
- ✅ **Loading States** - Smooth animations and feedback
- ✅ **Form Validation** - Comprehensive client-side validation
- ✅ **Accessibility** - WCAG compliant with keyboard navigation

### Technical Excellence
- ✅ **State Management** - Redux Toolkit for predictable state updates
- ✅ **Performance** - Optimized re-renders and efficient filtering
- ✅ **Code Quality** - Clean, modular, and maintainable architecture
- ✅ **Modern Stack** - React 18, Redux Toolkit, Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: React 18, JavaScript ES6+
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS 3.x
- **Drag & Drop**: React DND
- **Icons**: Heroicons
- **Build Tool**: Create React App
- **Deployment**: Vercel

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Quick Start
Clone the repository
```
git clone (https://github.com/abhiyadav3210/kanban.git)
cd vulnerability-kanban
```
Install dependencies
```
npm install
```
Start development server
```
npm start
```
Open http://localhost:3000 in your browser
```

### Demo Credentials
Email: admin@vuln.com
Password: password123

```

## 🏗️ Project Structure
```
src/
├── components/
│ ├── Auth/
│ │ ├── LoginForm.js # User authentication
│ │ └── SignupForm.js # User registration
│ ├── Board/
│ │ ├── KanbanBoard.js # Main board container
│ │ ├── Column.js # Status columns
│ │ ├── TaskCard.js # Vulnerability cards
│ │ ├── TaskModal.js # Create/Edit modal
│ │ └── TaskDetailsModal.js # View details modal
│ └── Common/
│ └── Header.js # Navigation and filters
├── store/
│ ├── index.js # Redux store configuration
│ └── slices/
│ ├── authSlice.js # Authentication state
│ └── boardSlice.js # Board and tasks state
├── constants/
│ └── index.js # Application constants
└── App.js # Root component

```

## 🎨 Design Implementation

### Pixel-Perfect Replication
- Matched the provided Dribbble design specifications
- Consistent color palette and typography
- Proper spacing and component proportions
- Interactive hover states and animations

### Responsive Breakpoints
- **Mobile**: 320px - 768px (Vertical stacked layout)
- **Tablet**: 768px - 1024px (Horizontal scrollable)
- **Desktop**: 1024px+ (Full kanban view)

## 🔧 Key Implementation Details

### State Management
// Efficient Redux slices for predictable state updates

authSlice: User authentication and session management

boardSlice: Tasks, filters, and board state management

```

### Performance Optimizations
- Memoized selectors for efficient filtering
- Optimized re-renders with proper dependency arrays
- Lazy loading for modals and heavy components
- Debounced search for better UX

### Accessibility Features
- Keyboard navigation support
- ARIA labels and roles
- Focus management in modals
- Screen reader compatibility

## 🚀 Deployment

### Vercel Deployment
Build the project
npm run build

Deploy to Vercel
npx vercel --prod

```
### Environment Variables
REACT_APP_API_URL=your_api_url
REACT_APP_ENV=production

```

## 🧪 Testing Checklist

### Functionality Testing
- [x] User authentication flow
- [x] Drag and drop between all columns
- [x] Task creation, editing, and deletion
- [x] Search and filtering operations
- [x] Responsive design across devices
- [x] Form validation and error handling

### Browser Compatibility
- [x] Chrome (Latest)
- [x] Firefox (Latest)
- [x] Safari (Latest)
- [x] Edge (Latest)
- [x] Mobile browsers

## 🎯 Development Approach

### Architecture Decisions
1. **Component-Based Design**: Modular, reusable components for maintainability
2. **Redux for State**: Centralized state management for complex interactions
3. **Tailwind CSS**: Utility-first styling for rapid development
4. **Mobile-First**: Progressive enhancement for all device sizes

### Code Quality Practices
- Consistent naming conventions
- Proper component separation
- Error boundary implementation
- Performance monitoring hooks

### Notable Challenges Solved
1. **Cross-Device Drag & Drop**: Implemented both HTML5 and touch backends
2. **Complex Filtering Logic**: Efficient memoized selectors
3. **Responsive Kanban Layout**: Adaptive layout for all screen sizes
4. **State Synchronization**: Proper Redux patterns for data consistency

## 📈 Performance Metrics

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Bundle Size**: Optimized chunks
- **Lighthouse Score**: 95+ across all categories

## 🔮 Future Enhancements

- Real-time collaboration with WebSocket
- Advanced analytics dashboard
- Bulk operations for tasks
- Export functionality (PDF, CSV)
- Dark mode theme support
- Advanced role-based permissions

## 👨‍💻 Developer

**[Abhishek Yadav]**
- Email: [work.abhisheky@gmail.com]
- GitHub: [abhiyadav3210]
- LinkedIn: [https://www.linkedin.com/in/abhishekyadavdev/]

## 📄 License

This project is created for the Frontend Engineer position at Kraftbase.

---

*Built with ❤️ using React, Redux, and Tailwind CSS*
