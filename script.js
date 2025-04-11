// Function to show popup message
function showPopup(message) {
  const popup = document.createElement('div');
  popup.className = 'form-popup';
  popup.innerHTML = `
    <div class="popup-content">
      <p>${message}</p>
      <button class="close-popup">OK</button>
    </div>
  `;
  document.body.appendChild(popup);

  // Close popup when OK button is clicked
  popup.querySelector('.close-popup').addEventListener('click', () => {
    document.body.removeChild(popup);
  });

  // Close popup when clicking outside
  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      document.body.removeChild(popup);
    }
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // FAQ Functionality
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (question && answer) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all other FAQs
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            otherItem.querySelector('.faq-answer').style.display = 'none';
          }
        });

        // Toggle current FAQ item
        item.classList.toggle('active', !isActive);
        answer.style.display = isActive ? 'none' : 'block';
      });
    }
  });

  // Auto-close FAQs only when scrolling past them
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    if (Math.abs(window.scrollY - lastScrollY) > 100) {
      faqItems.forEach((item) => {
        item.classList.remove('active');
        const answer = item.querySelector('.faq-answer');
        if (answer) answer.style.display = 'none';
      });
    }
    lastScrollY = window.scrollY;
  });

  // Job Application Form Submission
  const jobForm = document.getElementById('jobForm');
  if (jobForm) {
    jobForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = jobForm.querySelector('button[type="submit"]');
      if (!submitBtn) return;

      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';

      const formData = new FormData(jobForm);
      
      try {
        const response = await fetch(jobForm.action, {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          showPopup('Thanks for submitting your application! A team member will reach out shortly Via Email/Whatsapp.');
          jobForm.reset();
          const otherJobLevel = document.getElementById('otherJobLevel');
          if (otherJobLevel) otherJobLevel.style.display = 'none';
        } else {
          showPopup('There was an error submitting the form. Please try again.');
        }
      } catch (error) {
        showPopup('Network error. Please check your connection.');
      }

      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    });
  }

  // Toggle "Other" job level field
  const jobLevelSelect = document.getElementById('jobLevel');
  if (jobLevelSelect) {
    jobLevelSelect.addEventListener('change', () => {
      const otherJobLevelDiv = document.getElementById('otherJobLevel');
      if (otherJobLevelDiv) {
        otherJobLevelDiv.style.display = jobLevelSelect.value === 'other' ? 'block' : 'none';
      }
    });
  }

  // Partners Slider Functionality - **Fixed Missing `{}`**
  const slider = document.querySelector('.partners-slider');
  if (slider) {
    let isDragging = false;
    let startX, scrollLeft;

    function startDrag(e) {
      isDragging = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      slider.style.cursor = 'grabbing';
    }

    function endDrag() {
      isDragging = false;
      slider.style.cursor = 'grab';
    }

    function moveDrag(e) {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    }

    // Mouse Events
    slider.addEventListener('mousedown', startDrag);
    slider.addEventListener('mouseleave', endDrag);
    slider.addEventListener('mouseup', endDrag);
    slider.addEventListener('mousemove', moveDrag);

    // Touch Events (Optimized)
    slider.addEventListener('touchstart', (e) => {
      isDragging = true;
      startX = e.touches[0].pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('touchend', endDrag);
    slider.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.touches[0].pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    });
  }

  // WhatsApp Button Click Event
  const whatsappButton = document.getElementById("whatsappButton");
  if (whatsappButton) {
    whatsappButton.addEventListener("click", function () {
      window.open("https://wa.link/k3xlgo", "_blank");
    });
  }

  // Email Click Event
  const emailLink = document.getElementById("email-link");
  if (emailLink) {
    emailLink.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = "mailto:careermanagement.com@gmail.com?subject=Assistance Needed";
    });
  }
});
