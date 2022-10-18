document.addEventListener('DOMContentLoaded', () => {
    
    // task 1
    const errorMap = new Map()
        .set("fullname", ["ПІБ не має бути порожнім", "ПІБ має бути у форматі ТТТТТТ Т.Т."])
        .set("group", ["Група не має бути порожньою", "Група має бути у форматі ТТ-ЧЧ"])
        .set("id-card", ["ID картки не має бути порожнім", "ID картки має бути у форматі ТТ №ЧЧЧЧЧЧ"])
        .set("birthdate", ["День народження не має бути порожнім", "День народження має бути у форматі ЧЧ.ЧЧ.ЧЧЧЧ"])
        .set("email", ["Пошта не має бути порожньою", "Пошта має бути у форматі тттттт@ттттт.com"])

    const form = document.getElementById("info-form"),
        inputFields = Array.from(document.querySelectorAll('.form-field')),
        submitBtn = document.querySelector('.form-button');

    function handleUserInput(inputs, btnSubmit) {
        inputs.forEach(field => {
            const error = document.querySelector(`#${field.name} + span.error`);
            field.addEventListener("input", () => checkUserInput(inputs, field, error, btnSubmit));
            field.addEventListener("blur", () => checkUserInput(inputs, field, error, btnSubmit));
        });
    }

    function checkUserInput(inputs, field, error, btnSubmit) {
        if (field.validity.valid) {
            error.textContent = "";
            field.style.border = "";
        } else {
            btnSubmit.setAttribute('disabled', true);
            showError(field, error);
        }
        const isValid = checkDisabledButton(inputs);
        if (isValid) {
            btnSubmit.removeAttribute('disabled');
        } else {
            btnSubmit.setAttribute('disabled', true);
        }
    }

    function showError(field, error) {
        if (field.validity.valueMissing) {
            error.textContent = errorMap.get(field.name)[0];
        }
        if (field.validity.patternMismatch) {
            error.textContent = errorMap.get(field.name)[1];
        }
        field.style.border = "2px solid red";
    }

    function checkDisabledButton(inputs) {
        return !!!inputs.find(field => !field.checkValidity());
    }

    function createWindowHTML(window, form) {
        let ulElement = document.createElement('ul');
        ulElement.classList.add('no-list-style-type');
        var formData = new FormData(form);

        for (var pair of formData.entries()) {
            let liElement = document.createElement('li');
            liElement.innerText = pair[0] + ": " + pair[1];
            ulElement.appendChild(liElement);
        }

        window.document.body.appendChild(ulElement);
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        let newWindow = window.open("about:blank", "formValues", "width=300,height=300");

        newWindow.onload = () => {
            createWindowHTML(newWindow, form);
        }
    });

    handleUserInput(inputFields, submitBtn);


    // task 2

    const table = document.querySelector('.table');

    function createTable(tableElement) {
        let tr;
        for (let i = 0; i <= 36; i++) {
            if (i % 6 == 0) { // new table row 
                tr = document.createElement('tr');
            }
            const td = document.createElement('td');
            td.innerText = i + 1;
            tr.appendChild(td);
            if (i % 5 == 0) { // row has 6 cells
                tableElement.appendChild(tr);
            }
        }
    }

    createTable(table);

    function generateRandomInteger() {
        return Math.floor(Math.random() * 255) + 1;
    }

    const td = document.getElementsByTagName('td')[7];
    
    td.addEventListener('mouseover', () => {
        let color = `rgb(`;
        for (let i = 0; i < 3; i++) {
            color += `${generateRandomInteger()}, `;
        }
        color = color.slice(0, color.length - 2);
        color += ')';

        td.style.backgroundColor = color;
    });

    const colorPicker = document.querySelector('#colorpicker');

    td.addEventListener('click', () => {
        td.style.backgroundColor = colorPicker.value;
    });

    const tableRows = Array.from(document.getElementsByTagName('tr'));

    td.addEventListener('dblclick', () => {
        tableRows.forEach(row => {
            row.childNodes.forEach((node, idx) => {
                if (idx % 2 !== 0) {
                    node.style.backgroundColor = colorPicker.value;
                }
            });
        });
    });
    
});