document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
  
    const updateSlider = () => {
      slides.forEach(slide => slide.classList.remove('active'));
      slides[currentSlide].classList.add('active');
    };
  
    prevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
      updateSlider();
    });
  
    nextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
      updateSlider();
    });
  
    updateSlider();
  });
  