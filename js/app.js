/**
 * RIYA DUBEY - STUDENT MANAGEMENT SYSTEM
 * Core Application Script: State Store, Theme, Navigation, Profile & Utilities
 */

// Initial Seed Data for Riya Dubey's System
const DEFAULT_PROFILE = {
  name: "Riya Dubey",
  role: "Engineering Student",
  location: "Prayagraj, Uttar Pradesh, India",
  college: "United College of Engineering & Research / AKTU",
  branch: "Computer Science & Engineering",
  semester: "6th Semester",
  rollNo: "RD-CSE-2024-089",
  email: "riya.dubey@student.edu.in",
  phone: "+91 98765 43210",
  about: "I am Riya Dubey, an engineering student from Prayagraj. I am passionate about technology, web development, communication, and learning new skills. I believe in continuous improvement and building innovative projects.",
  skills: ["Good Communication Skills", "Problem Solving", "Teamwork", "Learning New Technologies", "HTML5 & CSS3", "JavaScript (ES6+)", "Python", "Data Structures"],
  avatar: "" // base64 or fallback initial
};

const DEFAULT_STUDENTS = [
  {
    id: "STU-1001",
    name: "Riya Dubey",
    email: "riya.dubey@student.edu.in",
    phone: "+91 98765 43210",
    course: "B.Tech CSE",
    semester: "Semester 6",
    attendance: 96,
    status: "Active",
    avatar: ""
  },
  {
    id: "STU-1002",
    name: "Aarav Sharma",
    email: "aarav.sharma@domain.com",
    phone: "+91 98234 56781",
    course: "B.Tech CSE",
    semester: "Semester 6",
    attendance: 88,
    status: "Active",
    avatar: ""
  },
  {
    id: "STU-1003",
    name: "Ananya Mishra",
    email: "ananya.mishra@domain.com",
    phone: "+91 97123 45672",
    course: "B.Tech IT",
    semester: "Semester 4",
    attendance: 92,
    status: "Active",
    avatar: ""
  },
  {
    id: "STU-1004",
    name: "Aditya Verma",
    email: "aditya.v@domain.com",
    phone: "+91 96541 23456",
    course: "B.Tech ECE",
    semester: "Semester 6",
    attendance: 74,
    status: "Warning",
    avatar: ""
  },
  {
    id: "STU-1005",
    name: "Pooja Patel",
    email: "pooja.patel@domain.com",
    phone: "+91 98901 23456",
    course: "B.Tech CSE",
    semester: "Semester 8",
    attendance: 95,
    status: "Active",
    avatar: ""
  },
  {
    id: "STU-1006",
    name: "Rohan Gupta",
    email: "rohan.gupta@domain.com",
    phone: "+91 91234 56789",
    course: "BCA",
    semester: "Semester 4",
    attendance: 82,
    status: "Active",
    avatar: ""
  }
];

const DEFAULT_COURSES = [
  {
    id: "CRS-201",
    name: "Advanced Data Structures & Algorithms",
    code: "CS601",
    department: "Computer Science",
    duration: "4 Months",
    semester: "Semester 6",
    instructor: "Dr. K. N. Srivastava",
    enrolled: 64,
    color: "#4f46e5"
  },
  {
    id: "CRS-202",
    name: "Cloud Computing & Distributed Systems",
    code: "CS602",
    department: "Computer Science",
    duration: "4 Months",
    semester: "Semester 6",
    instructor: "Prof. Sunita Sharma",
    enrolled: 58,
    color: "#7c3aed"
  },
  {
    id: "CRS-203",
    name: "Artificial Intelligence & Soft Computing",
    code: "CS603",
    department: "Computer Science",
    duration: "4 Months",
    semester: "Semester 6",
    instructor: "Dr. Alok Verma",
    enrolled: 72,
    color: "#06b6d4"
  },
  {
    id: "CRS-204",
    name: "Web Technologies & Full Stack Dev",
    code: "IT501",
    department: "Information Tech",
    duration: "5 Months",
    semester: "Semester 5",
    instructor: "Er. Ramesh Pandey",
    enrolled: 80,
    color: "#10b981"
  }
];

const DEFAULT_EXAMS = [
  {
    id: "EXM-301",
    studentId: "STU-1001",
    studentName: "Riya Dubey",
    subject: "Advanced Data Structures",
    examType: "Mid-Term",
    marksObtained: 94,
    maxMarks: 100,
    grade: "A+",
    status: "Passed",
    date: "2026-10-15"
  },
  {
    id: "EXM-302",
    studentId: "STU-1001",
    studentName: "Riya Dubey",
    subject: "Cloud Computing",
    examType: "Mid-Term",
    marksObtained: 92,
    maxMarks: 100,
    grade: "A+",
    status: "Passed",
    date: "2026-10-18"
  },
  {
    id: "EXM-303",
    studentId: "STU-1001",
    studentName: "Riya Dubey",
    subject: "Artificial Intelligence",
    examType: "Mid-Term",
    marksObtained: 89,
    maxMarks: 100,
    grade: "A",
    status: "Passed",
    date: "2026-10-21"
  },
  {
    id: "EXM-304",
    studentId: "STU-1002",
    studentName: "Aarav Sharma",
    subject: "Advanced Data Structures",
    examType: "Mid-Term",
    marksObtained: 78,
    maxMarks: 100,
    grade: "B+",
    status: "Passed",
    date: "2026-10-15"
  },
  {
    id: "EXM-305",
    studentId: "STU-1004",
    studentName: "Aditya Verma",
    subject: "Microprocessors",
    examType: "Mid-Term",
    marksObtained: 68,
    maxMarks: 100,
    grade: "C+",
    status: "Passed",
    date: "2026-10-16"
  }
];

const DEFAULT_NOTICES = [
  {
    id: "NOT-401",
    title: "Annual Tech Fest 'Innovate Prayagraj 2026' Registrations Open",
    category: "Events",
    date: "Nov 08, 2026",
    author: "Riya Dubey (Student Coordinator)",
    content: "All engineering students are invited to register their software and hardware projects. Cash prizes up to ₹50,000 for top innovations.",
    priority: "High"
  },
  {
    id: "NOT-402",
    title: "Semester Examination Schedule Published",
    category: "Examination",
    date: "Nov 05, 2026",
    author: "Controller of Examinations",
    content: "The end-semester written examinations will commence from December 1st. Collect your admit cards from student cell.",
    priority: "High"
  },
  {
    id: "NOT-403",
    title: "Industrial Workshop on Cloud Architecture & AI",
    category: "Academic",
    date: "Oct 29, 2026",
    author: "Training & Placement Cell",
    content: "Interactive 3-day bootcamp led by industry specialists. Hands-on certifications provided to participants.",
    priority: "Normal"
  }
];

const DEFAULT_TIMETABLE = [
  {
    day: "Monday",
    time: "09:30 AM - 10:30 AM",
    subject: "Advanced Data Structures",
    code: "CS601",
    room: "Lab 3, CS Block",
    instructor: "Dr. K. N. Srivastava"
  },
  {
    day: "Monday",
    time: "10:30 AM - 11:30 AM",
    subject: "Cloud Computing",
    code: "CS602",
    room: "LH-204",
    instructor: "Prof. Sunita Sharma"
  },
  {
    day: "Tuesday",
    time: "11:45 AM - 12:45 PM",
    subject: "Artificial Intelligence",
    code: "CS603",
    room: "LH-201",
    instructor: "Dr. Alok Verma"
  },
  {
    day: "Wednesday",
    time: "02:00 PM - 04:00 PM",
    subject: "Full-Stack Web Dev Lab",
    code: "IT501-P",
    room: "Software Center 2",
    instructor: "Er. Ramesh Pandey"
  },
  {
    day: "Thursday",
    time: "10:00 AM - 11:00 AM",
    subject: "Distributed Systems",
    code: "CS604",
    room: "LH-205",
    instructor: "Dr. Pratibha Rai"
  },
  {
    day: "Friday",
    time: "03:00 PM - 04:30 PM",
    subject: "Soft Skills & Technical Communication",
    code: "HU601",
    room: "Auditorium Annex",
    instructor: "Prof. R. C. Mathur"
  }
];

// App State Management using LocalStorage
const AppState = {
  getProfile() {
    const data = localStorage.getItem("riya_dubey_sms_profile");
    return data ? JSON.parse(data) : DEFAULT_PROFILE;
  },
  saveProfile(profile) {
    localStorage.setItem("riya_dubey_sms_profile", JSON.stringify(profile));
  },
  getStudents() {
    const data = localStorage.getItem("riya_dubey_sms_students");
    return data ? JSON.parse(data) : DEFAULT_STUDENTS;
  },
  saveStudents(students) {
    localStorage.setItem("riya_dubey_sms_students", JSON.stringify(students));
  },
  getCourses() {
    const data = localStorage.getItem("riya_dubey_sms_courses");
    return data ? JSON.parse(data) : DEFAULT_COURSES;
  },
  saveCourses(courses) {
    localStorage.setItem("riya_dubey_sms_courses", JSON.stringify(courses));
  },
  getExams() {
    const data = localStorage.getItem("riya_dubey_sms_exams");
    return data ? JSON.parse(data) : DEFAULT_EXAMS;
  },
  saveExams(exams) {
    localStorage.setItem("riya_dubey_sms_exams", JSON.stringify(exams));
  },
  getNotices() {
    const data = localStorage.getItem("riya_dubey_sms_notices");
    return data ? JSON.parse(data) : DEFAULT_NOTICES;
  },
  saveNotices(notices) {
    localStorage.setItem("riya_dubey_sms_notices", JSON.stringify(notices));
  },
  getTimetable() {
    const data = localStorage.getItem("riya_dubey_sms_timetable");
    return data ? JSON.parse(data) : DEFAULT_TIMETABLE;
  },
  saveTimetable(timetable) {
    localStorage.setItem("riya_dubey_sms_timetable", JSON.stringify(timetable));
  },
  // Attendance Records
  getAttendance() {
    const data = localStorage.getItem("riya_dubey_sms_attendance");
    if (data) return JSON.parse(data);
    
    // Seed initial today attendance
    const today = new Date().toISOString().split('T')[0];
    const initialRecords = {
      [today]: {
        "STU-1001": "Present", // Riya Dubey
        "STU-1002": "Present",
        "STU-1003": "Present",
        "STU-1004": "Absent",
        "STU-1005": "Present",
        "STU-1006": "Present"
      }
    };
    localStorage.setItem("riya_dubey_sms_attendance", JSON.stringify(initialRecords));
    return initialRecords;
  },
  saveAttendance(records) {
    localStorage.setItem("riya_dubey_sms_attendance", JSON.stringify(records));
  },
  // Reset all data to factory demo
  resetData() {
    localStorage.removeItem("riya_dubey_sms_profile");
    localStorage.removeItem("riya_dubey_sms_students");
    localStorage.removeItem("riya_dubey_sms_courses");
    localStorage.removeItem("riya_dubey_sms_exams");
    localStorage.removeItem("riya_dubey_sms_notices");
    localStorage.removeItem("riya_dubey_sms_timetable");
    localStorage.removeItem("riya_dubey_sms_attendance");
    window.location.reload();
  }
};

// Global Toast Notifications
function showToast(message, type = "info") {
  let container = document.getElementById("toastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  
  let icon = "fa-info-circle";
  if (type === "success") icon = "fa-check-circle";
  if (type === "danger") icon = "fa-exclamation-triangle";
  if (type === "warning") icon = "fa-bell";

  toast.innerHTML = `
    <i class="fas ${icon} toast-icon"></i>
    <div class="toast-message">${message}</div>
  `;

  container.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 50);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// Global Theme Toggle (Light / Dark)
function initTheme() {
  const savedTheme = localStorage.getItem("riya_dubey_sms_theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  
  const themeToggles = document.querySelectorAll(".theme-toggle-btn");
  themeToggles.forEach(btn => {
    const icon = btn.querySelector("i");
    if (icon) {
      icon.className = savedTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
    }
    btn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("riya_dubey_sms_theme", next);
      if (icon) {
        icon.className = next === "dark" ? "fas fa-sun" : "fas fa-moon";
      }
      showToast(`Switched to ${next} theme mode`, "info");
    });
  });
}

// Global Mobile Sidebar Toggle
function initSidebar() {
  const menuBtn = document.getElementById("menuToggleBtn");
  const sidebar = document.getElementById("appSidebar");
  let overlay = document.getElementById("sidebarOverlay");

  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "sidebarOverlay";
    overlay.className = "sidebar-overlay";
    document.body.appendChild(overlay);
  }

  if (menuBtn && sidebar) {
    menuBtn.addEventListener("click", () => {
      sidebar.classList.toggle("mobile-open");
      overlay.classList.toggle("active");
    });

    overlay.addEventListener("click", () => {
      sidebar.classList.remove("mobile-open");
      overlay.classList.remove("active");
    });
  }
}

// Global Search Simulation
function initGlobalSearch() {
  const input = document.getElementById("globalSearchInput");
  if (!input) return;

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const q = input.value.trim().toLowerCase();
      if (!q) return;

      const students = AppState.getStudents();
      const match = students.find(s => s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q));

      if (match) {
        window.location.href = `students.html?search=${encodeURIComponent(q)}`;
      } else {
        showToast(`No student records found matching "${input.value}"`, "warning");
      }
    }
  });
}

// Ensure Session Demo Authentication
function checkAuth() {
  const auth = sessionStorage.getItem("riya_dubey_sms_auth");
  // Allow login.html and index.html without check
  const path = window.location.pathname;
  if (!auth && !path.endsWith("login.html") && !path.endsWith("index.html") && path !== "/") {
    window.location.href = "login.html";
  }
}

function handleLogout() {
  sessionStorage.removeItem("riya_dubey_sms_auth");
  showToast("Logged out successfully", "info");
  setTimeout(() => {
    window.location.href = "login.html";
  }, 600);
}

// Run on page load
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initSidebar();
  initGlobalSearch();

  // Populate dynamic profile references
  const profile = AppState.getProfile();
  document.querySelectorAll(".dyn-profile-name").forEach(el => el.textContent = profile.name);
  document.querySelectorAll(".dyn-profile-role").forEach(el => el.textContent = profile.role);
  document.querySelectorAll(".dyn-profile-location").forEach(el => el.textContent = profile.location);
  
  // Set avatar pictures if available
  if (profile.avatar) {
    document.querySelectorAll(".dyn-avatar-img").forEach(img => {
      img.src = profile.avatar;
      img.style.display = "block";
    });
    document.querySelectorAll(".dyn-avatar-fallback").forEach(el => el.style.display = "none");
  }

  // Logout triggers
  document.querySelectorAll(".logout-trigger").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      handleLogout();
    });
  });
});
