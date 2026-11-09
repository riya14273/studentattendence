/**
 * RIYA DUBEY - STUDENT MANAGEMENT SYSTEM
 * Dashboard Controller: Live Analytics, Chart.js Visualizations, Activity Feeds
 */

document.addEventListener("DOMContentLoaded", () => {
  // Populate Dashboard Summary Metric Counts
  const students = AppState.getStudents();
  const courses = AppState.getCourses();
  const exams = AppState.getExams();

  const totalStudentsEl = document.getElementById("dashTotalStudents");
  const totalCoursesEl = document.getElementById("dashTotalCourses");
  const totalTeachersEl = document.getElementById("dashTotalTeachers");
  const avgAttendanceEl = document.getElementById("dashAvgAttendance");

  if (totalStudentsEl) totalStudentsEl.textContent = students.length;
  if (totalCoursesEl) totalCoursesEl.textContent = courses.length;
  if (totalTeachersEl) totalTeachersEl.textContent = "18"; // Active faculty pool

  if (avgAttendanceEl && students.length > 0) {
    const totalAtt = students.reduce((acc, curr) => acc + (curr.attendance || 0), 0);
    const avg = Math.round(totalAtt / students.length);
    avgAttendanceEl.textContent = `${avg}%`;
  }

  // Initialize Chart.js attendance trend chart
  const attendanceCanvas = document.getElementById("attendanceChart");
  if (attendanceCanvas && typeof Chart !== "undefined") {
    const ctx = attendanceCanvas.getContext("2d");

    // Primary gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, "rgba(79, 70, 229, 0.45)");
    gradient.addColorStop(1, "rgba(79, 70, 229, 0.0)");

    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        datasets: [{
          label: "Attendance Rate (%)",
          data: [94, 91, 95, 88, 96, 92],
          borderColor: "#4f46e5",
          borderWidth: 3,
          backgroundColor: gradient,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#ffffff",
          pointBorderColor: "#4f46e5",
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#0f172a",
            padding: 10,
            cornerRadius: 8,
            titleFont: { size: 12 },
            bodyFont: { size: 13, weight: "bold" },
            callbacks: {
              label: (context) => `Attendance: ${context.parsed.y}%`
            }
          }
        },
        scales: {
          y: {
            min: 70,
            max: 100,
            grid: {
              color: "rgba(148, 163, 184, 0.15)",
              drawBorder: false
            },
            ticks: {
              callback: (val) => val + "%",
              color: "#64748b"
            }
          },
          x: {
            grid: { display: false },
            ticks: { color: "#64748b" }
          }
        }
      }
    });
  }

  // Initialize Department Distribution Doughnut Chart
  const deptCanvas = document.getElementById("deptChart");
  if (deptCanvas && typeof Chart !== "undefined") {
    new Chart(deptCanvas.getContext("2d"), {
      type: "doughnut",
      data: {
        labels: ["Computer Science", "Info Tech", "ECE", "Others"],
        datasets: [{
          data: [45, 25, 20, 10],
          backgroundColor: ["#4f46e5", "#7c3aed", "#06b6d4", "#10b981"],
          borderWidth: 0,
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "75%",
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              boxWidth: 12,
              padding: 15,
              color: "#64748b",
              font: { size: 11 }
            }
          }
        }
      }
    });
  }
});
