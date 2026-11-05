
// Select HTML elements

const galleryItems = document.querySelectorAll(".gallery-item");

const lightbox = document.getElementById("lightbox");

const lightboxImg = document.getElementById("lightbox-img");

const lightboxCaption = document.getElementById("lightbox-caption");

const imageNumber = document.getElementById("image-number");

const nextBtn = document.getElementById("next");

const prevBtn = document.getElementById("prev");

const closeBtn = document.getElementById("close");

const filterButtons = document.querySelectorAll(".filter-btn");

const imageCount = document.getElementById("image-count");


// Variables

let currentImages = [];

let currentIndex = 0;


// Get visible images

function updateImages() {

    currentImages = Array.from(galleryItems)

        .filter(item => item.style.display !== "none")

        .map(item => ({
            src: item.querySelector("img").src,
            title: item.querySelector(".caption h3").textContent
        }));

    imageCount.textContent = currentImages.length;
}


// Show selected image

function showImage() {

    if (currentImages.length === 0) return;

    lightboxImg.src = currentImages[currentIndex].src;

    lightboxCaption.textContent = currentImages[currentIndex].title;

    imageNumber.textContent =
        `${currentIndex + 1} / ${currentImages.length}`;

}


// Open Lightbox

function openLightbox(index) {

    updateImages();

    currentIndex = index;

    showImage();

    lightbox.classList.add("show");

    document.body.style.overflow = "hidden";

}


// Next Image

function nextImage() {

    if (currentImages.length === 0) return;

    currentIndex++;

    if (currentIndex >= currentImages.length) {

        currentIndex = 0;

    }

    showImage();

}


// Previous Image

function previousImage() {

    if (currentImages.length === 0) return;

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex = currentImages.length - 1;

    }

    showImage();

}


// Close Lightbox

function closeLightbox() {

    lightbox.classList.remove("show");

    document.body.style.overflow = "";

}


// Click Gallery Images

galleryItems.forEach(item => {

    item.addEventListener("click", () => {

        updateImages();

        const visibleItems = Array.from(galleryItems)

            .filter(element => element.style.display !== "none");

        const index = visibleItems.indexOf(item);

        openLightbox(index);

    });

});


// Next Button

nextBtn.addEventListener("click", nextImage);


// Previous Button

prevBtn.addEventListener("click", previousImage);


// Close Button

closeBtn.addEventListener("click", closeLightbox);


// Click Outside Image

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {

        closeLightbox();

    }

});


// Category Filter

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Remove active class

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        // Add active class

        button.classList.add("active");

        // Get selected category

        const category = button.dataset.category;

        // Filter gallery

        galleryItems.forEach(item => {

            if (
                category === "all" ||
                item.dataset.category === category
            ) {

                item.style.display = "block";

            } else {

                item.style.display = "none";

            }

        });

        // Update image count

        updateImages();

    });

});


// Keyboard Navigation

document.addEventListener("keydown", (event) => {

    if (!lightbox.classList.contains("show")) return;

    if (event.key === "ArrowRight") {

        nextImage();

    }

    if (event.key === "ArrowLeft") {

        previousImage();

    }

    if (event.key === "Escape") {

        closeLightbox();

    }

});


// Initial image count

updateImages();
