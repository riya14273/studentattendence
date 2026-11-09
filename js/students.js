/**
 * RIYA DUBEY - STUDENT MANAGEMENT SYSTEM
 * Students Management Module: CRUD, Search, Filter, Profile Modal, CSV Export
 */

document.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById("studentTableBody")) return;

  let currentStudents = AppState.getStudents();
  let editingStudentId = null;

  const tableBody = document.getElementById("studentTableBody");
  const searchInput = document.getElementById("studentSearchInput");
  const filterCourse = document.getElementById("filterCourse");
  const filterSemester = document.getElementById("filterSemester");
  const exportBtn = document.getElementById("exportCsvBtn");

  const studentModal = document.getElementById("studentModal");
  const studentForm = document.getElementById("studentForm");
  const addStudentBtn = document.getElementById("addStudentBtn");
  const modalCloseBtn = document.getElementById("closeStudentModal");
  const cancelBtn = document.getElementById("cancelStudentForm");

  // Profile View Modal
  const viewModal = document.getElementById("viewStudentModal");
  const closeViewModalBtn = document.getElementById("closeViewModal");

  // Delete Confirmation Modal
  const deleteModal = document.getElementById("deleteModal");
  const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
  const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");
  let pendingDeleteId = null;

  // Check URL params for pre-filled search
  const urlParams = new URLSearchParams(window.location.search);
  const searchParam = urlParams.get("search");
  if (searchParam && searchInput) {
    searchInput.value = searchParam;
  }

  function renderStudents() {
    let filtered = [...currentStudents];

    const q = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const course = filterCourse ? filterCourse.value : "";
    const sem = filterSemester ? filterSemester.value : "";

    if (q) {
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q)
      );
    }

    if (course) {
      filtered = filtered.filter(s => s.course === course);
    }

    if (sem) {
      filtered = filtered.filter(s => s.semester === sem);
    }

    tableBody.innerHTML = "";

    if (filtered.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="7">
            <div class="empty-state">
              <div class="empty-state-icon"><i class="fas fa-user-graduate"></i></div>
              <h4 class="empty-state-title">No Students Found</h4>
              <p class="empty-state-text">No student records match your current search criteria. Try modifying your search or add a new student.</p>
              <button class="btn btn-primary btn-sm" onclick="document.getElementById('addStudentBtn').click()">
                <i class="fas fa-plus"></i> Add New Student
              </button>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    filtered.forEach(student => {
      const isRiya = student.name.toLowerCase().includes("riya dubey");
      const tr = document.createElement("tr");

      const attendanceBadge = student.attendance >= 85 
        ? `<span class="badge badge-success"><i class="fas fa-arrow-up"></i> ${student.attendance}%</span>`
        : student.attendance >= 75 
        ? `<span class="badge badge-warning">${student.attendance}%</span>`
        : `<span class="badge badge-danger"><i class="fas fa-arrow-down"></i> ${student.attendance}%</span>`;

      const statusBadge = student.status === "Active" 
        ? `<span class="badge badge-success">Active</span>` 
        : `<span class="badge badge-warning">Warning</span>`;

      tr.innerHTML = `
        <td>
          <div style="font-weight: 600; font-family: monospace; color: var(--primary);">
            ${student.id}
          </div>
        </td>
        <td>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, var(--primary), var(--secondary)); color: white; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.85rem; overflow: hidden; flex-shrink: 0;">
              ${student.avatar ? `<img src="${student.avatar}" style="width:100%;height:100%;object-fit:cover;">` : student.name.charAt(0)}
            </div>
            <div>
              <div style="font-weight: 600; color: var(--text-main); display: flex; align-items: center; gap: 0.35rem;">
                ${student.name}
                ${isRiya ? '<span class="badge badge-primary" style="font-size:0.65rem;">Host &amp; Admin</span>' : ''}
              </div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">${student.email}</div>
            </div>
          </div>
        </td>
        <td>
          <div style="font-weight: 500;">${student.course}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted);">${student.semester}</div>
        </td>
        <td>${student.phone}</td>
        <td>${attendanceBadge}</td>
        <td>${statusBadge}</td>
        <td>
          <div style="display: flex; gap: 0.4rem;">
            <button class="btn-icon btn-sm view-btn" title="View Full Profile" data-id="${student.id}">
              <i class="fas fa-eye"></i>
            </button>
            <button class="btn-icon btn-sm edit-btn" title="Edit Student" data-id="${student.id}">
              <i class="fas fa-pen"></i>
            </button>
            <button class="btn-icon btn-sm delete-btn" title="Delete Student" data-id="${student.id}" style="color: var(--danger);">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </td>
      `;

      tableBody.appendChild(tr);
    });

    attachRowEvents();
  }

  function attachRowEvents() {
    // View profile
    document.querySelectorAll(".view-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const student = currentStudents.find(s => s.id === id);
        if (!student) return;

        document.getElementById("viewId").textContent = student.id;
        document.getElementById("viewName").textContent = student.name;
        document.getElementById("viewEmail").textContent = student.email;
        document.getElementById("viewPhone").textContent = student.phone;
        document.getElementById("viewCourse").textContent = `${student.course} (${student.semester})`;
        document.getElementById("viewAttendance").textContent = `${student.attendance}% Overall Attendance`;
        document.getElementById("viewAvatarInitials").textContent = student.name.charAt(0);

        const imgEl = document.getElementById("viewAvatarImg");
        if (student.avatar) {
          imgEl.src = student.avatar;
          imgEl.style.display = "block";
          document.getElementById("viewAvatarInitials").style.display = "none";
        } else {
          imgEl.style.display = "none";
          document.getElementById("viewAvatarInitials").style.display = "flex";
        }

        viewModal.classList.add("active");
      });
    });

    // Edit profile
    document.querySelectorAll(".edit-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const student = currentStudents.find(s => s.id === id);
        if (!student) return;

        editingStudentId = student.id;
        document.getElementById("modalStudentTitle").textContent = "Edit Student Profile";
        document.getElementById("studentIdInput").value = student.id;
        document.getElementById("studentIdInput").disabled = true;
        document.getElementById("studentNameInput").value = student.name;
        document.getElementById("studentEmailInput").value = student.email;
        document.getElementById("studentPhoneInput").value = student.phone;
        document.getElementById("studentCourseInput").value = student.course;
        document.getElementById("studentSemInput").value = student.semester;
        document.getElementById("studentAttInput").value = student.attendance;
        document.getElementById("studentStatusInput").value = student.status;

        studentModal.classList.add("active");
      });
    });

    // Delete
    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const student = currentStudents.find(s => s.id === id);
        if (!student) return;

        // Prevent accidental deletion of Riya Dubey's primary identity
        if (student.name.toLowerCase().includes("riya dubey")) {
          showToast("Protected Profile: Cannot delete primary administrator Riya Dubey", "warning");
          return;
        }

        pendingDeleteId = id;
        document.getElementById("deleteStudentName").textContent = `${student.name} (${student.id})`;
        deleteModal.classList.add("active");
      });
    });
  }

  // Modal Triggers
  if (addStudentBtn) {
    addStudentBtn.addEventListener("click", () => {
      editingStudentId = null;
      studentForm.reset();
      document.getElementById("modalStudentTitle").textContent = "Add New Student";
      const nextId = "STU-" + (1000 + currentStudents.length + 1);
      document.getElementById("studentIdInput").value = nextId;
      document.getElementById("studentIdInput").disabled = false;
      studentModal.classList.add("active");
    });
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", () => studentModal.classList.remove("active"));
  if (cancelBtn) cancelBtn.addEventListener("click", () => studentModal.classList.remove("active"));
  if (closeViewModalBtn) closeViewModalBtn.addEventListener("click", () => viewModal.classList.remove("active"));

  if (cancelDeleteBtn) cancelDeleteBtn.addEventListener("click", () => deleteModal.classList.remove("active"));

  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener("click", () => {
      if (pendingDeleteId) {
        currentStudents = currentStudents.filter(s => s.id !== pendingDeleteId);
        AppState.saveStudents(currentStudents);
        deleteModal.classList.remove("active");
        renderStudents();
        showToast("Student deleted successfully", "danger");
        pendingDeleteId = null;
      }
    });
  }

  // Form Submit (Create or Update)
  if (studentForm) {
    studentForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const id = document.getElementById("studentIdInput").value.trim();
      const name = document.getElementById("studentNameInput").value.trim();
      const email = document.getElementById("studentEmailInput").value.trim();
      const phone = document.getElementById("studentPhoneInput").value.trim();
      const course = document.getElementById("studentCourseInput").value;
      const semester = document.getElementById("studentSemInput").value;
      const attendance = parseInt(document.getElementById("studentAttInput").value) || 0;
      const status = document.getElementById("studentStatusInput").value;

      if (!name || !email || !course) {
        showToast("Please fill in all mandatory fields", "warning");
        return;
      }

      if (editingStudentId) {
        // Update existing
        const idx = currentStudents.findIndex(s => s.id === editingStudentId);
        if (idx !== -1) {
          currentStudents[idx] = {
            ...currentStudents[idx],
            name, email, phone, course, semester, attendance, status
          };
          AppState.saveStudents(currentStudents);
          showToast(`Student record for ${name} updated successfully!`, "success");
        }
      } else {
        // Add new
        const exists = currentStudents.some(s => s.id.toLowerCase() === id.toLowerCase());
        if (exists) {
          showToast(`Student ID ${id} already exists. Please choose a unique ID.`, "danger");
          return;
        }

        const newStudent = {
          id, name, email, phone, course, semester, attendance, status, avatar: ""
        };
        currentStudents.unshift(newStudent);
        AppState.saveStudents(currentStudents);
        showToast(`Student ${name} successfully registered!`, "success");
      }

      studentModal.classList.remove("active");
      renderStudents();
    });
  }

  // Filters & Search
  if (searchInput) searchInput.addEventListener("input", renderStudents);
  if (filterCourse) filterCourse.addEventListener("change", renderStudents);
  if (filterSemester) filterSemester.addEventListener("change", renderStudents);

  // CSV Export
  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      const headers = ["Student ID", "Full Name", "Email", "Phone", "Course", "Semester", "Attendance %", "Status"];
      const rows = currentStudents.map(s => [
        `"${s.id}"`,
        `"${s.name}"`,
        `"${s.email}"`,
        `"${s.phone}"`,
        `"${s.course}"`,
        `"${s.semester}"`,
        `"${s.attendance}"`,
        `"${s.status}"`
      ]);

      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `RiyaDubey_Students_Export_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast("Student records exported to CSV successfully!", "success");
    });
  }

  // Initial render
  renderStudents();
});
