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
var currentListItem;
var actionType;
var context;

function openModal(action, type, btn) {
    actionType = action;
    context = type;
    modal.style.display = "block";
    document.getElementById('age').style.display = type === 'list' ? 'none' : 'inline-block';
    document.getElementById('ageLabel').style.display = type === 'list' ? 'none' : 'inline-block';

    if (action === 'edit') {
        if (type === 'table') {
            currentRow = btn.parentElement.parentElement;
            document.getElementById('name').value = currentRow.cells[1].innerHTML;
            document.getElementById('age').value = currentRow.cells[2].innerHTML;
        } else if (type === 'list') {
            currentListItem = btn.parentElement;
            document.getElementById('name').value = currentListItem.querySelector('span').innerHTML;
        }
    } else {
        document.getElementById('name').value = '';
        if (type === 'table') {
            document.getElementById('age').value = '';
        }
    }
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

function saveData() {
    var name = document.getElementById('name').value;
    var age = document.getElementById('age').value;

    if (context === 'table') {
        if (actionType === 'edit' && currentRow) {
            currentRow.cells[1].innerHTML = name;
            currentRow.cells[2].innerHTML = age;
        } else {
            var table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
            var newRow = table.insertRow();
            var selectCell = newRow.insertCell(0);
            var nameCell = newRow.insertCell(1);
            var ageCell = newRow.insertCell(2);
            var actionCell = newRow.insertCell(3);

            selectCell.innerHTML = '<input type="checkbox">';
            nameCell.innerHTML = name;
            ageCell.innerHTML = age;
            actionCell.innerHTML = '<button onclick="openModal(\'edit\', \'table\', this)">Edit</button>';
        }
    } else if (context === 'list') {
        if (actionType === 'edit' && currentListItem) {
            currentListItem.querySelector('span').innerHTML = name;
        } else {
            var ul = document.getElementById('dataList');
            var li = document.createElement('li');
            li.innerHTML = '<input type="checkbox"><span class="item_name">' + name + '</span><button onclick="openModal(\'edit\', \'list\', this)">Edit</button>';
            ul.appendChild(li);
        }
    }

    modal.style.display = "none";
    currentRow = null;
    currentListItem = null;
}

function deleteRow() {
    var table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    var checkboxes = table.getElementsByTagName('input');

    for (var i = checkboxes.length - 1; i >= 0; i--) {
        if (checkboxes[i].checked) {
            table.deleteRow(i);
        }
    }
}

function deleteListItem() {
    var ul = document.getElementById('dataList');
    var checkboxes = ul.getElementsByTagName('input');

    for (var i = checkboxes.length - 1; i >= 0; i--) {
        if (checkboxes[i].checked) {
            ul.removeChild(checkboxes[i].parentElement);
        }
    }
}
