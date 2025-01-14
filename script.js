document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    const circles = document.querySelectorAll('.loading-circle');
    const content = document.querySelector('.content');

    // Stop the spinning animation after 2 seconds
    setTimeout(() => {
      document.querySelector('.loading-circles').style.animation = 'none';
      
      // Fade out circles one by one
      circles.forEach((circle, index) => {
        setTimeout(() => {
          circle.classList.add('fade-out');
        }, index * 200); // 200ms delay between each circle
      });

      // Hide loader and show content after last circle fades
      setTimeout(() => {
        loader.classList.add('hidden');
        content.style.opacity = '1';
      }, 800); // After all circles have faded

    }, 2000); // Spin for 2 seconds
  });
});

document.querySelector('.title').addEventListener('click', () => {
  document.body.classList.toggle('inverted');
}); 