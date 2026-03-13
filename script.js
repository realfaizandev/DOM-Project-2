const draggable_list = document.getElementById("draggable-list")
const check = document.getElementById("check")

const richestPeople = [
    "Elon Musk",
    "Larry Page",
    "Sergey Brin",
    "Jeff Bezos",
    "Mark Zuckerberg",
    "Larry Ellison",
    "Bernard Arnault",
    "Jim Walton",
    "Warren Buffett",
    "Rob Walton"
];

const listItems = [];
let dragStartIndex;

createList()
function createList() {
    [...richestPeople]
        .map((a) => ({ value: a, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value)
        .forEach((person, index) => {
            // console.log(person);

            const listItem = document.createElement("li")
            // listItem.classList.add('wrong')
            listItem.classList.add("over");
            listItem.setAttribute('data-index', index);
            listItem.innerHTML = `<span class="number">${index + 1}</span>
        <div class="dragabble" draggable="true">
        <p class="person-name">${person}</p>
        <i class="fa-solid fa-grip-lines"></i>
        </div>
        `;
            listItems.push(listItem);
            draggable_list.appendChild(listItem);
        });
    addEventListener();
}
function dragStart() {
    // console.log("Event", "dragstart");
    dragStartIndex = +this.closest("li").getAttribute("data-index");
    // console.log(typeof(dragStartIndex));
}
function dragEnter() {
    // console.log("Event", "dragenter");
    this.classList.add("over");
}
function dragOver(e) {
    // console.log("Event", "dragover");
    e.preventDefault();
}
function dragLeave() {
    // console.log("Event", "dragleave");
    this.classList.remove("over");
}
function dragDrop() {
    // console.log("Event", "drop");
    const dropEndIndex = this.getAttribute("data-index");

    shiftItems(dragStartIndex, dropEndIndex);
    this.classList.remove("over");

    // swapItems(dragStartIndex, dropEndIndex);
    // this.classList.remove("over");
}

function shiftItems(fromIndex, toIndex) {
    if (fromIndex === toIndex) return;

    const draggedItem = listItems[fromIndex];
    draggable_list.removeChild(draggedItem);

    if (fromIndex < toIndex) {
        draggable_list.insertBefore(draggedItem, listItems[toIndex].nextSibling);
    }
    else {
        draggable_list.insertBefore(draggedItem, listItems[toIndex]);
    }
    const allLis = [...draggable_list.querySelectorAll("li")];
    listItems.length = 0;
    allLis.forEach((li, i) => {
        li.setAttribute("data-index", i);
        listItems.push(li);
    });
    addEventListener();
}


function checkOrder() {
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector(".dragabble").innerText.trim()

        if (personName !== richestPeople[index]) {
            listItem.classList.add('wrong');
        }
        else {
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }

    })
}
function addEventListener() {
    const dragabbles = document.querySelectorAll(".dragabble");
    const dragListItems = document.querySelectorAll(".draggable-list li");

    dragabbles.forEach(dragabble => {
        dragabble.addEventListener("dragstart", dragStart);
    });

    dragListItems.forEach((item) => {
        item.addEventListener("dragover", dragOver);
        item.addEventListener("drop", dragDrop);
        item.addEventListener("dragenter", dragEnter);
        item.addEventListener("dragleave", dragLeave);
    });
}

check.addEventListener("click", checkOrder);