// highlights the clicked filter button and shows or hides cards------
function filterByStatus(status, clickedButton) {
    var allFilterButtons = document.querySelectorAll(".filter-button");

    for (var i = 0; i < allFilterButtons.length; i++) {
        allFilterButtons[i].classList.remove("bg-[#3B82F6]");
        allFilterButtons[i].classList.remove("text-white");
        allFilterButtons[i].classList.add("btn-soft");
    }

    clickedButton.classList.add("bg-[#3B82F6]");
    clickedButton.classList.add("text-white");
    clickedButton.classList.remove("btn-soft");

    toggleCardVisibility(status);
}


// shows or hides job cards based on the selected filter------
function toggleCardVisibility(status) {
    var jobCardsSection = document.getElementById("job-cards-section");
    var emptyStateSection = document.getElementById("empty-state-section");
    var allJobCards = document.querySelectorAll(".job-listing-card");
    var visibleCount = 0;

    for (var i = 0; i < allJobCards.length; i++) {
        var currentCard = allJobCards[i];
        var currentCardStatus = currentCard.getAttribute("data-job-status");

        if (status === "all") {
            currentCard.style.display = "block";
            visibleCount = visibleCount + 1;
        } else if (currentCardStatus === status) {
            currentCard.style.display = "block";
            visibleCount = visibleCount + 1;
        } else {
            currentCard.style.display = "none";
        }
    }

    if (visibleCount > 0) {
        jobCardsSection.classList.remove("hidden");
        emptyStateSection.classList.add("hidden");
    } else {
        jobCardsSection.classList.add("hidden");
        emptyStateSection.classList.remove("hidden");
    }

    refreshDashboardCounts();

    var jobListCounter = document.getElementById("job-list-count");
    var totalJobs = allJobCards.length;

    if (status === "all") {
        jobListCounter.innerText = totalJobs + " jobs";
    } else {
        jobListCounter.innerText = visibleCount + " of " + totalJobs + " jobs";
    }
}


// changes a job card's status and updates the badge------
function updateJobStatus(button, newStatus) {
    var jobCard = button.closest(".job-listing-card");
    jobCard.setAttribute("data-job-status", newStatus);

    var statusBadge = jobCard.querySelector(".job-status-badge");

    if (newStatus === "interview") {
        statusBadge.innerText = "Applied";
        statusBadge.className = "job-status-badge btn bg-[#10B981] text-white w-32";
    }

    if (newStatus === "reject") {
        statusBadge.innerText = "Rejected";
        statusBadge.className = "job-status-badge btn bg-[#EF4444] text-white w-32";
    }

    refreshDashboardCounts();

    var activeFilterButton = document.querySelector(".filter-button.bg-\\[\\#3B82F6\\]");

    if (activeFilterButton) {
        var activeFilterName = activeFilterButton.id;

        if (activeFilterName === "filter-all-btn") {
            toggleCardVisibility("all");
        }
        if (activeFilterName === "filter-interview-btn") {
            toggleCardVisibility("interview");
        }
        if (activeFilterName === "filter-rejected-btn") {
            toggleCardVisibility("reject");
        }
    }
}


// counts total,interview and rejected cards and updates the dashboard------
function refreshDashboardCounts() {
    var allJobCards = document.querySelectorAll(".job-listing-card");
    var totalCount = allJobCards.length;
    var interviewCount = 0;
    var rejectedCount = 0;

    for (var i = 0; i < allJobCards.length; i++) {
        var currentCard = allJobCards[i];
        var currentStatus = currentCard.getAttribute("data-job-status");

        if (currentStatus === "interview") {
            interviewCount = interviewCount + 1;
        }

        if (currentStatus === "reject") {
            rejectedCount = rejectedCount + 1;
        }
    }

    document.getElementById("dashboard-total-count").innerText = totalCount;
    document.getElementById("dashboard-interview-count").innerText = interviewCount;
    document.getElementById("dashboard-rejected-count").innerText = rejectedCount;
}


// Removes a job card and reapplies the active filter------
function removeJobCard(button) {
    var jobCard = button.closest(".job-listing-card");
    jobCard.remove();

    refreshDashboardCounts();

    // reapplying active filter if one is selected------
    var activeFilterButton = document.querySelector(".filter-button.bg-\\[\\#3B82F6\\]");

    if (activeFilterButton) {
        var activeFilterName = activeFilterButton.id;

        if (activeFilterName === "filter-all-btn") {
            toggleCardVisibility("all");
        }
        if (activeFilterName === "filter-interview-btn") {
            toggleCardVisibility("interview");
        }
        if (activeFilterName === "filter-rejected-btn") {
            toggleCardVisibility("reject");
        }
    }
}


//show all jobs by default------
window.onload = function () {
    var allButton = document.getElementById("filter-all-btn");
    filterByStatus("all", allButton);
};