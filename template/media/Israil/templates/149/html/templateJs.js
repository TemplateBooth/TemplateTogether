
const leftBtn = document.getElementById("left");
const rightBtn = document.getElementById("right");
const galleryContainer = document.getElementById("galleryContainer");
const images = document.querySelectorAll(".image-widgets img");
const imageWidget = document.querySelectorAll("#galleryContainer .image-scroll img")
images.forEach(image => {
	image.addEventListener("click", e => {
		imageLink = image.src;
		const img = document.querySelector("#galleryContainer .image-gallery");
		img.src = imageLink;
		for(let i=0;i<imageWidget.length;i++) {
			if(imageWidget[i].src === imageLink) {
				imageWidget[i].classList.toggle("image-scroll-active");
			}
		}
		galleryContainer.classList.add("active");
		
		
	});

})
galleryContainer.addEventListener("click", e => {
	if(e.target !== e.currentTarget) return;
	galleryContainer.classList.remove("active");
	for(let i=0;i<imageWidget.length;i++) {
		imageWidget[i].classList.remove("image-scroll-active");
	}
	
});
imageWidget.forEach(smallImage => {
	
	smallImage.addEventListener("click", e => {
		smallImageLink = smallImage.src;
		const bigImg = document.querySelector("#galleryContainer .image-gallery");
		bigImg.src = smallImageLink;
		for(let i=0;i<imageWidget.length;i++) {
			imageWidget[i].classList.remove("image-scroll-active");
		}
		smallImage.classList.add("image-scroll-active");
	});
	
});


rightBtn.addEventListener("click", e => {
	const current_active_widget = document.querySelector("#galleryContainer .image-scroll-active");
	const bigImg = document.querySelector("#galleryContainer .image-gallery");

	if(current_active_widget.nextElementSibling) {
		current_active_widget.classList.remove("image-scroll-active");
		current_active_widget.nextElementSibling.classList.add("image-scroll-active");
		bigImg.src = current_active_widget.nextElementSibling.src;
	}
});

leftBtn.addEventListener("click", e => {
	const current_active_widget = document.querySelector("#galleryContainer .image-scroll-active");
	const bigImg = document.querySelector("#galleryContainer .image-gallery");

	if(current_active_widget.previousElementSibling) {
		current_active_widget.classList.remove("image-scroll-active");
		current_active_widget.previousElementSibling.classList.add("image-scroll-active");
		bigImg.src = current_active_widget.previousElementSibling.src;
	}
});
