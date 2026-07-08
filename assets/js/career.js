// ==============================
// Cloudinary Configuration
// ==============================

const CLOUD_NAME = "pmcoybqz";
const UPLOAD_PRESET = "sainathpreset";

let resumeUploaded = false;

// ==============================
// Elements
// ==============================

const uploadZone = document.getElementById("uploadZone");
const fileInput = document.getElementById("cvFile");

const progress = document.getElementById("uploadProgress");
const progressBar = document.getElementById("uploadBar");

const fileName = document.getElementById("cvFileName");

const resumeUrl = document.getElementById("resumeUrl");

const form = document.getElementById("applyFormContent");

// ==============================
// Click Upload
// ==============================

uploadZone.addEventListener("click", function () {

    fileInput.click();

});

// ==============================
// File Selected
// ==============================

fileInput.addEventListener("change", function () {

    if (!this.files.length) return;

    uploadResume(this.files[0]);

});

// ==============================
// Drag & Drop
// ==============================

uploadZone.addEventListener("dragover", function (e) {

    e.preventDefault();

    uploadZone.classList.add("dragging");

});

uploadZone.addEventListener("dragleave", function () {

    uploadZone.classList.remove("dragging");

});

uploadZone.addEventListener("drop", function (e) {

    e.preventDefault();

    uploadZone.classList.remove("dragging");

    const file = e.dataTransfer.files[0];

    if (file)
        uploadResume(file);

});

// ==============================
// Upload Function
// ==============================

async function uploadResume(file) {

    const allowed = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    if (!allowed.includes(file.type)) {

        alert("Only PDF, DOC and DOCX files are allowed.");

        return;

    }

    if (file.size > 5 * 1024 * 1024) {

        alert("Maximum allowed file size is 5 MB.");

        return;

    }

    progress.classList.remove("d-none");

    progressBar.style.width = "10%";
    progressBar.innerHTML = "Uploading...";

    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {

        const xhr = new XMLHttpRequest();

        xhr.open(
            "POST",
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`
        );

        xhr.upload.addEventListener("progress", function (e) {

            if (e.lengthComputable) {

                const percent = Math.round(
                    (e.loaded / e.total) * 100
                );

                progressBar.style.width = percent + "%";

                progressBar.innerHTML = percent + "%";

            }

        });

        xhr.onload = function () {

            if (xhr.status == 200) {

                const response = JSON.parse(xhr.responseText);

                resumeUploaded = true;

                resumeUrl.value = response.secure_url;

                progressBar.classList.remove("progress-bar-animated");

                progressBar.innerHTML = "Uploaded ✓";

                fileName.classList.remove("d-none");

                fileName.querySelector("span").innerHTML =
                    file.name;

                uploadZone.classList.add("uploaded");

            }

            else {

                alert("Resume upload failed.");

                progress.classList.add("d-none");

            }

        };

        xhr.onerror = function () {

            alert("Upload failed. Please try again.");

            progress.classList.add("d-none");

        };

        xhr.send(formData);

    }

    catch (err) {

        console.log(err);

        alert("Upload Error");

    }

}

// ==============================
// Form Submit
// ==============================

form.addEventListener("submit", function (e) {

    if (!resumeUploaded) {

        e.preventDefault();

        alert("Please upload your resume first.");

        return;

    }

});