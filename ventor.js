
const formUpload = document.getElementById('upload-form'); //form
const progressArea = document.querySelector('.progress-area');//div progress area
const uploadedArea = document.querySelector('.uploaded-area');// div upload area
const fileInput = document.getElementById('file-input') //input file

formUpload.addEventListener('click', () => fileInput.click())

fileInput.onchange = ({ target }) => {
    let file = target.files[0]; //Get file and with [0] if user has upload multiples files at same time then get first only

    if (file) {//if file is 'upload' or selected
        let fileName = file.name; //get the file name
        if (fileName.length >= 10) { //if file name length is  grater or equal to 10 then split the name and add ...
            let splitNameFile = fileName.split('.');
            fileName = splitNameFile[0].substring(0, 10) + '... .' + splitNameFile[1];
        }
        uploadFile(fileName)//call uploadFile with name of file
    }
    console.log(target.files);
}


function uploadFile(name) {
    let xhr = new XMLHttpRequest(); //creating XML object 'AJAX'
    xhr.open('POST', 'php/upload_archive.php');//sending POST request to php page.
    xhr.upload.addEventListener('progress', ({ loaded, total }) => {
        let fileSize;
        let fileLoaded = Math.floor((loaded / total) * 100); //porcentage file loaded
        let fileTotal = Math.floor(total / 1000);//kb file size from byte

        (fileTotal < 1024) ? fileSize = fileTotal + " KB" : fileSize = (loaded / (1024 * 1024)).toFixed(2) + " MB"; //calculating if is KB or MB

       //template literal with container 
        let progressHTMl = ` <li class="row">
        <i class="fa-solid fa-file-arrow-up"></i>
        <div class="content">
            <div class="details">
                <span class="name">${name}</span>
                <span class="porcent">${fileLoaded}%</span>
            </div>
        <div class="progress-bar">
            <div class="progress" style="width:${fileLoaded}%"></div>
            </div>
        </div>
    </li>`;

        uploadedArea.classList.add('onprogress');//add class to container update details
        progressArea.innerHTML = progressHTMl;// add the template literal to html
        updateDetailsFile(loaded, total, name, fileSize);// send data to container update
    });
    progressArea.innerHTML = '';

    let formData = new FormData(formUpload); //formatting to send form data.
    xhr.send(formData);
}


function updateDetailsFile(loaded, total, name, fileSize) {
    if (loaded == total) {// if the file is full upload then put the container in the html
        let uploadedHTML = `
    <li class="row">
       <div class="content">
           <i class="fa-solid fa-file-arrow-up"></i>
           <div class="details">
               <span class="name">${name}</span>
               <span class="total">${fileSize}</span>
           </div>
       </div>
       <i class="fa-regular fa-circle-check"></i>
    </li>`;

        uploadedArea.classList.remove('onprogress');
        uploadedArea.insertAdjacentHTML('afterbegin', uploadedHTML);
    }
}

