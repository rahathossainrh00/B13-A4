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