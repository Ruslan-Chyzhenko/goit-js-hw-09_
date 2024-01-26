const images = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];

// Function to create an image element with specified attributes
function createGalleryImage(image) {
  const galleryImage = document.createElement('img');
  galleryImage.classList.add('gallery-image');
  Object.assign(galleryImage, {
    src: image.preview,
    alt: image.description,
    'data-source': image.original,
  });
  return galleryImage;
}

// Function to create a link element with specified attributes
function createGalleryLink(image) {
  const galleryLink = document.createElement('a');
  galleryLink.classList.add('gallery-link');
  galleryLink.href = image.original;
  return galleryLink;
}

// Function to close the modal on ESC key press
function closeModalOnEsc(event) {
  if (event.key === 'Escape' && modalInstance) {
    modalInstance.close();
  }
}

// Get the gallery container
const galleryContainer = document.querySelector('.gallery');
let modalInstance; // Variable to store a reference to modalInstance

// Add event listener for clicks on gallery items
galleryContainer.addEventListener('click', function (event) {
  const clickedElement = event.target;

  if (clickedElement.classList.contains('gallery-image')) {
    event.preventDefault(); // Prevent default behavior (e.g., opening the link)

    const largeImageSrc = clickedElement.dataset.source;

    modalInstance = basicLightbox.create(`<img src="${largeImageSrc}" alt="Large Image">`, {
      onShow: (instance) => {
        window.addEventListener('keydown', closeModalOnEsc);
        document.body.style.overflow = 'hidden';
      },
      onClose: (instance) => {
        window.removeEventListener('keydown', closeModalOnEsc);
        document.body.style.overflow = 'auto';
      },
    });

    modalInstance.show();
  }
});

// Iterate over each object in the array and create markup
const galleryItems = images.map((image) => {
  const galleryItem = document.createElement('li');
  galleryItem.classList.add('gallery-item');

  const galleryLink = createGalleryLink(image);
  const galleryImage = createGalleryImage(image);

  galleryLink.appendChild(galleryImage);
  galleryItem.appendChild(galleryLink);

  return galleryItem;
});

// Append all gallery items to galleryContainer in one operation
galleryContainer.append(...galleryItems);