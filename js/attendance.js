/**
 * RIYA DUBEY - STUDENT MANAGEMENT SYSTEM
 * Attendance Management Module: Daily Marking, Analytics, Filters, Reports
 */

document.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById("attendanceTableBody")) return;

  const tableBody = document.getElementById("attendanceTableBody");
  const dateInput = document.getElementById("attendanceDate");
  const searchInput = document.getElementById("attSearchInput");
  const filterSem = document.getElementById("attFilterSem");
  const markAllPresentBtn = document.getElementById("markAllPresent");
  const saveAttendanceBtn = document.getElementById("saveAttendance");
  const exportAttBtn = document.getElementById("exportAttReport");

  // Summary indicators
  const statPresentCount = document.getElementById("attPresentCount");
  const statAbsentCount = document.getElementById("attAbsentCount");
  const statPercentCount = document.getElementById("attPercentCount");

  // Set default date to today
  const todayStr = new Date().toISOString().split("T")[0];
  if (dateInput) dateInput.value = todayStr;

  let students = AppState.getStudents();
  let attendanceHistory = AppState.getAttendance();

  // Active attendance working state for the chosen date
  let activeDayRecords = attendanceHistory[dateInput ? dateInput.value : todayStr] || {};

  // Fill in any students that lack record for this day (default to Present)
  students.forEach(s => {
    if (!activeDayRecords[s.id]) {
      activeDayRecords[s.id] = "Present";
    }
  });

  function updateMetrics() {
    let present = 0;
    let absent = 0;
    const total = students.length;

    students.forEach(s => {
      const status = activeDayRecords[s.id];
      if (status === "Present") present++;
      else absent++;
    });

    const pct = total > 0 ? Math.round((present / total) * 100) : 0;

    if (statPresentCount) statPresentCount.textContent = present;
    if (statAbsentCount) statAbsentCount.textContent = absent;
    if (statPercentCount) statPercentCount.textContent = `${pct}%`;
  }

  function renderAttendanceTable() {
    let list = [...students];
    const q = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const sem = filterSem ? filterSem.value : "";

    if (q) {
      list = list.filter(s => s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q));
    }
    if (sem) {
      list = list.filter(s => s.semester === sem);
    }

    tableBody.innerHTML = "";

    if (list.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="6">
            <div class="empty-state">
              <div class="empty-state-icon"><i class="fas fa-calendar-times"></i></div>
              <h4 class="empty-state-title">No Students Matched</h4>
              <p class="empty-state-text">No student records match your attendance filters.</p>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    list.forEach(student => {
      const isRiya = student.name.toLowerCase().includes("riya dubey");
      const currentStatus = activeDayRecords[student.id] || "Present";
      const isPresent = currentStatus === "Present";

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong style="color:var(--primary); font-family: monospace;">${student.id}</strong></td>
        <td>
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <div style="width: 32px; height: 32px; border-radius: 50%; background: #4f46e5; color: white; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 600;">
              ${student.name.charAt(0)}
            </div>
            <div>
              <div style="font-weight: 600; color: var(--text-main);">
                ${student.name}
                ${isRiya ? '<span class="badge badge-primary" style="font-size:0.65rem; margin-left:4px;">Host</span>' : ''}
              </div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">${student.email}</div>
            </div>
          </div>
        </td>
        <td>${student.course}</td>
        <td>${student.semester}</td>
        <td>
          <div style="display: inline-flex; border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--border-color);">
            <button type="button" class="status-btn-present ${isPresent ? 'active' : ''}" data-id="${student.id}" style="padding: 0.4rem 0.9rem; font-size: 0.82rem; font-weight: 600; cursor: pointer; border: none; background: ${isPresent ? 'var(--success)' : 'var(--bg-surface-alt)'}; color: ${isPresent ? '#fff' : 'var(--text-muted)'}; transition: all 0.2s;">
              <i class="fas fa-check"></i> Present
            </button>
            <button type="button" class="status-btn-absent ${!isPresent ? 'active' : ''}" data-id="${student.id}" style="padding: 0.4rem 0.9rem; font-size: 0.82rem; font-weight: 600; cursor: pointer; border: none; background: ${!isPresent ? 'var(--danger)' : 'var(--bg-surface-alt)'}; color: ${!isPresent ? '#fff' : 'var(--text-muted)'}; transition: all 0.2s;">
              <i class="fas fa-times"></i> Absent
            </button>
          </div>
        </td>
        <td>
          <span class="badge ${student.attendance >= 85 ? 'badge-success' : 'badge-warning'}">
            ${student.attendance}% Overall
          </span>
        </td>
      `;

      tableBody.appendChild(tr);
    });

    attachToggleEvents();
    updateMetrics();
  }

  function attachToggleEvents() {
    document.querySelectorAll(".status-btn-present").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        activeDayRecords[id] = "Present";
        renderAttendanceTable();
      });
    });

    document.querySelectorAll(".status-btn-absent").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        activeDayRecords[id] = "Absent";
        renderAttendanceTable();
      });
    });
  }

  // Date selection change
  if (dateInput) {
    dateInput.addEventListener("change", () => {
      const selectedDate = dateInput.value;
      activeDayRecords = attendanceHistory[selectedDate] || {};
      students.forEach(s => {
        if (!activeDayRecords[s.id]) {
          activeDayRecords[s.id] = "Present";
        }
      });
      renderAttendanceTable();
      showToast(`Loaded records for ${selectedDate}`, "info");
    });
  }

  // Mark all present
  if (markAllPresentBtn) {
    markAllPresentBtn.addEventListener("click", () => {
      students.forEach(s => {
        activeDayRecords[s.id] = "Present";
      });
      renderAttendanceTable();
      showToast("Marked all students as Present for this day", "success");
    });
  }

  // Save changes
  if (saveAttendanceBtn) {
    saveAttendanceBtn.addEventListener("click", () => {
      const selectedDate = dateInput.value;
      attendanceHistory[selectedDate] = activeDayRecords;
      AppState.saveAttendance(attendanceHistory);
      showToast(`Attendance record for ${selectedDate} saved successfully!`, "success");
    });
  }

  // Export report to CSV
  if (exportAttBtn) {
    exportAttBtn.addEventListener("click", () => {
      const selectedDate = dateInput.value;
      const headers = ["Student ID", "Full Name", "Course", "Semester", "Date", "Status"];
      const rows = students.map(s => [
        `"${s.id}"`,
        `"${s.name}"`,
        `"${s.course}"`,
        `"${s.semester}"`,
        `"${selectedDate}"`,
        `"${activeDayRecords[s.id] || 'Present'}"`
      ]);

      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `Attendance_${selectedDate}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast("Attendance sheet downloaded", "success");
    });
  }

  if (searchInput) searchInput.addEventListener("input", renderAttendanceTable);
  if (filterSem) filterSem.addEventListener("change", renderAttendanceTable);

  renderAttendanceTable();
});
