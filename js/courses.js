/**
 * RIYA DUBEY - STUDENT MANAGEMENT SYSTEM
 * Courses Management Module: Course Grid, Add, Edit, Delete, Filter
 */

document.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById("coursesContainer")) return;

  const container = document.getElementById("coursesContainer");
  const searchInput = document.getElementById("courseSearchInput");
  const filterDept = document.getElementById("courseFilterDept");

  const modal = document.getElementById("courseModal");
  const form = document.getElementById("courseForm");
  const addBtn = document.getElementById("addCourseBtn");
  const closeBtn = document.getElementById("closeCourseModal");
  const cancelBtn = document.getElementById("cancelCourseBtn");

  let courses = AppState.getCourses();
  let editingCourseId = null;

  function renderCourses() {
    let list = [...courses];
    const q = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const dept = filterDept ? filterDept.value : "";

    if (q) {
      list = list.filter(c => 
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.instructor.toLowerCase().includes(q)
      );
    }
    if (dept) {
      list = list.filter(c => c.department === dept);
    }

    container.innerHTML = "";

    if (list.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1;">
          <div class="empty-state">
            <div class="empty-state-icon"><i class="fas fa-book-open"></i></div>
            <h4 class="empty-state-title">No Courses Found</h4>
            <p class="empty-state-text">No courses match your query. Add a new course to your curriculum.</p>
            <button class="btn btn-primary btn-sm" onclick="document.getElementById('addCourseBtn').click()">
              <i class="fas fa-plus"></i> Add New Course
            </button>
          </div>
        </div>
      `;
      return;
    }

    list.forEach(course => {
      const card = document.createElement("div");
      card.className = "card course-card";
      card.style.display = "flex";
      card.style.flexDirection = "column";
      card.style.justifyContent = "space-between";
      card.style.borderTop = `4px solid ${course.color || '#4f46e5'}`;

      card.innerHTML = `
        <div>
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
            <span class="badge" style="background: ${course.color}20; color: ${course.color}; font-weight: 700; font-family: monospace;">
              ${course.code}
            </span>
            <div style="display: flex; gap: 0.35rem;">
              <button class="btn-icon btn-sm edit-course-btn" data-id="${course.id}" title="Edit Course">
                <i class="fas fa-pen"></i>
              </button>
              <button class="btn-icon btn-sm delete-course-btn" data-id="${course.id}" title="Delete Course" style="color: var(--danger);">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
          <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.5rem; line-height: 1.3;">
            ${course.name}
          </h3>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">
            <i class="fas fa-chalkboard-teacher" style="margin-right: 0.35rem; color: var(--primary);"></i>
            ${course.instructor}
          </p>
        </div>

        <div>
          <div style="background: var(--bg-surface-alt); padding: 0.75rem 1rem; border-radius: var(--radius-md); display: flex; justify-content: space-between; margin-bottom: 1rem; font-size: 0.82rem;">
            <div>
              <span style="color: var(--text-muted); display: block;">Department</span>
              <strong style="color: var(--text-main);">${course.department}</strong>
            </div>
            <div>
              <span style="color: var(--text-muted); display: block;">Semester</span>
              <strong style="color: var(--text-main);">${course.semester}</strong>
            </div>
            <div>
              <span style="color: var(--text-muted); display: block;">Students</span>
              <strong style="color: var(--primary); font-weight: 700;">${course.enrolled} Enrolled</strong>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; color: var(--text-muted);">
            <span><i class="far fa-clock"></i> ${course.duration}</span>
            <span class="badge badge-success"><i class="fas fa-check-circle"></i> Active Syllabus</span>
          </div>
        </div>
      `;

      container.appendChild(card);
    });

    attachCourseEvents();
  }

  function attachCourseEvents() {
    // Edit
    document.querySelectorAll(".edit-course-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const c = courses.find(item => item.id === id);
        if (!c) return;

        editingCourseId = c.id;
        document.getElementById("modalCourseTitle").textContent = "Edit Course";
        document.getElementById("courseCodeInput").value = c.code;
        document.getElementById("courseNameInput").value = c.name;
        document.getElementById("courseDeptInput").value = c.department;
        document.getElementById("courseSemInput").value = c.semester;
        document.getElementById("courseInstructorInput").value = c.instructor;
        document.getElementById("courseDurationInput").value = c.duration;
        document.getElementById("courseEnrolledInput").value = c.enrolled;

        modal.classList.add("active");
      });
    });

    // Delete
    document.querySelectorAll(".delete-course-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        if (confirm("Are you sure you want to delete this course offering?")) {
          courses = courses.filter(item => item.id !== id);
          AppState.saveCourses(courses);
          renderCourses();
          showToast("Course deleted successfully", "danger");
        }
      });
    });
  }

  if (addBtn) {
    addBtn.addEventListener("click", () => {
      editingCourseId = null;
      form.reset();
      document.getElementById("modalCourseTitle").textContent = "Add New Course";
      modal.classList.add("active");
    });
  }

  if (closeBtn) closeBtn.addEventListener("click", () => modal.classList.remove("active"));
  if (cancelBtn) cancelBtn.addEventListener("click", () => modal.classList.remove("active"));

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const code = document.getElementById("courseCodeInput").value.trim();
      const name = document.getElementById("courseNameInput").value.trim();
      const department = document.getElementById("courseDeptInput").value;
      const semester = document.getElementById("courseSemInput").value;
      const instructor = document.getElementById("courseInstructorInput").value.trim();
      const duration = document.getElementById("courseDurationInput").value.trim();
      const enrolled = parseInt(document.getElementById("courseEnrolledInput").value) || 0;

      const colors = ["#4f46e5", "#7c3aed", "#06b6d4", "#10b981", "#f59e0b", "#ec4899"];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      if (editingCourseId) {
        const idx = courses.findIndex(c => c.id === editingCourseId);
        if (idx !== -1) {
          courses[idx] = {
            ...courses[idx],
            code, name, department, semester, instructor, duration, enrolled
          };
          AppState.saveCourses(courses);
          showToast(`Course ${name} updated successfully`, "success");
        }
      } else {
        const newCourse = {
          id: "CRS-" + (200 + courses.length + 1),
          code, name, department, semester, instructor, duration, enrolled,
          color: randomColor
        };
        courses.push(newCourse);
        AppState.saveCourses(courses);
        showToast(`New course ${name} created successfully!`, "success");
      }

      modal.classList.remove("active");
      renderCourses();
    });
  }

  if (searchInput) searchInput.addEventListener("input", renderCourses);
  if (filterDept) filterDept.addEventListener("change", renderCourses);

  renderCourses();
});
