/**
 * Appointment Form Handler with Formspree Integration
 * Handles form submission, validation, and user feedback
 */

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('appointmentForm');
    const submitBtn = document.getElementById('submitBtn');
    const formMessages = document.getElementById('form-messages');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');

    if (!form) return;

    // Form submission handler
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading state
        setLoadingState(true);
        hideMessages();

        try {
            // Get form data
            const formData = new FormData(form);
            
            // Submit to Formspree
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                showSuccessMessage();
                form.reset();
            } else {
                const data = await response.json();
                if (data.errors) {
                    showErrorMessage(data.errors.map(error => error.message).join(', '));
                } else {
                    showErrorMessage('An unexpected error occurred. Please try again.');
                }
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showErrorMessage('Network error. Please check your connection and try again.');
        } finally {
            setLoadingState(false);
        }
    });

    // Real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });

    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        
        // Remove existing error styling
        field.classList.remove('error');
        
        // Validate based on field type
        if (field.hasAttribute('required') && !value) {
            showFieldError(field, 'This field is required');
            return false;
        }
        
        if (field.type === 'email' && value && !isValidEmail(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
        
        if (field.type === 'tel' && value && !isValidPhone(value)) {
            showFieldError(field, 'Please enter a valid phone number');
            return false;
        }
        
        return true;
    }

    function clearFieldError(e) {
        const field = e.target;
        field.classList.remove('error');
        const errorMsg = field.parentNode.querySelector('.field-error');
        if (errorMsg) {
            errorMsg.remove();
        }
    }

    function showFieldError(field, message) {
        field.classList.add('error');
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.style.color = '#dc3545';
        errorDiv.style.fontSize = '14px';
        errorDiv.style.marginTop = '5px';
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhone(phone) {
        // Allow various phone formats
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone);
    }

    function setLoadingState(loading) {
        if (loading) {
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
        } else {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    }

    function showSuccessMessage() {
        hideMessages();
        successMessage.style.display = 'block';
        formMessages.style.display = 'block';
        
        // Scroll to message
        formMessages.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Hide after 5 seconds
        setTimeout(() => {
            hideMessages();
        }, 5000);
    }

    function showErrorMessage(customMessage = null) {
        hideMessages();
        errorMessage.style.display = 'block';
        formMessages.style.display = 'block';
        
        // Update error message if custom message provided
        if (customMessage) {
            const errorText = errorMessage.querySelector('p');
            errorText.textContent = customMessage;
        }
        
        // Scroll to message
        formMessages.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function hideMessages() {
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';
        formMessages.style.display = 'none';
    }

    // Smooth scroll to form when appointment button is clicked
    const appointmentButtons = document.querySelectorAll('.appointment-btn');
    appointmentButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const formSection = document.getElementById('appointment-section');
            if (formSection) {
                formSection.scrollIntoView({ behavior: 'smooth' });
                // Focus on first input after scroll
                setTimeout(() => {
                    const firstInput = form.querySelector('input');
                    if (firstInput) {
                        firstInput.focus();
                    }
                }, 500);
            }
        });
    });
});
