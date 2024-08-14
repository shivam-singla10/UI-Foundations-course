function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

document.getElementsByClassName("tablinks")[0].click();

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
var currentRow;
var actionType;
var context;

function openModal(action, type, btn) {
  actionType = action;
  context = type;
  modal.style.display = "block";
  document.getElementById("age").style.display = "inline-block";
  document.getElementById("ageLabel").style.display = "inline-block";

  if (action === "edit") {
    currentRow = btn.parentElement.parentElement;
    document.getElementById("name").value = currentRow.cells[1].innerHTML;
    document.getElementById("age").value = currentRow.cells[2].innerHTML;
  } else {
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
  }
}

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

function saveData() {
  var name = document.getElementById("name").value;
  var age = document.getElementById("age").value;

  if (context === "table") {
    if (actionType === "edit" && currentRow) {
      currentRow.cells[1].innerHTML = name;
      currentRow.cells[2].innerHTML = age;
      updateList();
    } else {
      var table = document
        .getElementById("dataTable")
        .getElementsByTagName("tbody")[0];
      var newRow = table.insertRow();
      var selectCell = newRow.insertCell(0);
      var nameCell = newRow.insertCell(1);
      var ageCell = newRow.insertCell(2);
      var actionCell = newRow.insertCell(3);

      selectCell.innerHTML = '<input type="checkbox">';
      nameCell.innerHTML = name;
      ageCell.innerHTML = age;
      actionCell.innerHTML =
        "<button onclick=\"openModal('edit', 'table', this)\">Update</button>";

      addToList(name);
    }
  }

  modal.style.display = "none";
  currentRow = null;
}

function deleteRow() {
  var table = document
    .getElementById("dataTable")
    .getElementsByTagName("tbody")[0];
  var checkboxes = table.getElementsByTagName("input");

  for (var i = checkboxes.length - 1; i >= 0; i--) {
    if (checkboxes[i].checked) {
      table.deleteRow(i);
      removeFromList(i);
    }
  }
}

function addToList(name) {
  var ul = document.getElementById("dataList");
  var li = document.createElement("li");
  li.textContent = name;
  ul.appendChild(li);
}

function removeFromList(i) {
  var ul = document.getElementById("dataList");
  var items = ul.getElementsByTagName("li");
  ul.removeChild(items[i]);
}

function updateList() {
  var table = document
    .getElementById("dataTable")
    .getElementsByTagName("tbody")[0];
  var rows = table.getElementsByTagName("tr");
  var ul = document.getElementById("dataList");
  ul.innerHTML = ""; // Clear the list

  for (var i = 0; i < rows.length; i++) {
    var name = rows[i].cells[1].innerHTML;
    addToList(name);
  }
}
