// Seller Registration JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('sellerRegistrationForm');
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('businessPermit');
    const submitBtn = form.querySelector('.submit-btn');
    
    // Initialize form functionality
    initializeFileUpload();
    initializeFormValidation();
    initializeFormSubmission();
    
    // File Upload Functionality
    function initializeFileUpload() {
        // Click to upload
        uploadArea.addEventListener('click', function(e) {
            if (e.target !== fileInput) {
                fileInput.click();
            }
        });
        
        // Drag and drop functionality
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });
        
        uploadArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
        });
        
        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFileSelection(files[0]);
            }
        });
        
        // File input change
        fileInput.addEventListener('change', function(e) {
            if (e.target.files.length > 0) {
                handleFileSelection(e.target.files[0]);
            }
        });
    }
    
    function handleFileSelection(file) {
        // Validate file type
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
            showError('Please select a valid file type (PDF, JPG, PNG)');
            return;
        }
        
        // Validate file size (10MB limit)
        const maxSize = 10 * 1024 * 1024; // 10MB in bytes
        if (file.size > maxSize) {
            showError('File size must be less than 10MB');
            return;
        }
        
        // Update upload area
        uploadArea.classList.add('file-selected');
        const uploadText = uploadArea.querySelector('.upload-text');
        const uploadSubtext = uploadArea.querySelector('.upload-subtext');
        
        uploadText.textContent = `Selected: ${file.name}`;
        uploadSubtext.textContent = `${(file.size / 1024 / 1024).toFixed(2)} MB`;
        
        // Remove any previous error styling
        fileInput.classList.remove('is-invalid');
        removeErrorMessage(fileInput);
    }
    
    // Form Validation
    function initializeFormValidation() {
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(input);
            });
            
            input.addEventListener('input', function() {
                if (input.classList.contains('is-invalid')) {
                    validateField(input);
                }
            });
        });
        
        // Email validation
        const emailInputs = form.querySelectorAll('input[type="email"]');
        emailInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateEmail(input);
            });
        });
        
        // Phone validation
        const phoneInput = document.getElementById('contactNumber');
        phoneInput.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    }
    
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Check if required field is empty
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // Specific validation based on field type
        if (value) {
            switch (field.type) {
                case 'email':
                    if (!isValidEmail(value)) {
                        isValid = false;
                        errorMessage = 'Please enter a valid email address';
                    }
                    break;
                case 'tel':
                    if (!isValidPhone(value)) {
                        isValid = false;
                        errorMessage = 'Please enter a valid phone number';
                    }
                    break;
            }
        }
        
        // Update field styling
        if (isValid) {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
            removeErrorMessage(field);
        } else {
            field.classList.remove('is-valid');
            field.classList.add('is-invalid');
            showFieldError(field, errorMessage);
        }
        
        return isValid;
    }
    
    function validateEmail(emailField) {
        const value = emailField.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        if (emailField.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Email address is required';
        } else if (value && !isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
        
        if (isValid) {
            emailField.classList.remove('is-invalid');
            emailField.classList.add('is-valid');
            removeErrorMessage(emailField);
        } else {
            emailField.classList.remove('is-valid');
            emailField.classList.add('is-invalid');
            showFieldError(emailField, errorMessage);
        }
        
        return isValid;
    }
    
    // Utility functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
        return phoneRegex.test(cleanPhone) && cleanPhone.length >= 10;
    }
    
    function formatPhoneNumber(input) {
        let value = input.value.replace(/\D/g, '');
        if (value.length >= 10) {
            value = value.substring(0, 11);
        }
        input.value = value;
    }
    
    function showFieldError(field, message) {
        removeErrorMessage(field);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
    }
    
    function removeErrorMessage(field) {
        const existingError = field.parentNode.querySelector('.invalid-feedback');
        if (existingError) {
            existingError.remove();
        }
    }
    
    function showError(message) {
        // Create or update error message
        let errorDiv = document.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'alert alert-danger error-message';
            errorDiv.setAttribute('role', 'alert');
            form.insertBefore(errorDiv, form.firstChild);
        }
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
        
        // Scroll to error
        errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    function showSuccess(message) {
        let successDiv = document.querySelector('.success-message');
        if (!successDiv) {
            successDiv = document.createElement('div');
            successDiv.className = 'success-message';
            form.insertBefore(successDiv, form.firstChild);
        }
        successDiv.textContent = message;
        successDiv.classList.add('show');
        
        // Scroll to success message
        successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Form Submission
    function initializeFormSubmission() {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                submitForm();
            }
        });
    }
    
    function validateForm() {
        let isValid = true;
        const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
        
        // Validate all required fields
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        // Validate email fields
        const emailFields = form.querySelectorAll('input[type="email"]');
        emailFields.forEach(field => {
            if (!validateEmail(field)) {
                isValid = false;
            }
        });
        
        // Validate at least one product category is selected
        const categoryCheckboxes = form.querySelectorAll('.category-checkboxes input[type="checkbox"]');
        const isAnyCategorySelected = Array.from(categoryCheckboxes).some(checkbox => checkbox.checked);
        
        if (!isAnyCategorySelected) {
            showError('Please select at least one product category');
            isValid = false;
        }
        
        // Validate terms and conditions
        const termsCheckbox = document.getElementById('agreeTerms');
        if (!termsCheckbox.checked) {
            showError('Please agree to the Terms and Conditions and Privacy Policy');
            isValid = false;
        }
        
        // Validate file upload
        if (!fileInput.files.length) {
            showError('Please upload your business permit or valid ID');
            fileInput.classList.add('is-invalid');
            isValid = false;
        }
        
        return isValid;
    }
    
    function submitForm() {
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
        
        // Collect form data
        const formData = new FormData();
        
        // Basic information
        formData.append('sellerName', document.getElementById('sellerName').value.trim());
        formData.append('storeName', document.getElementById('storeName').value.trim());
        formData.append('emailAddress', document.getElementById('emailAddress').value.trim());
        formData.append('contactNumber', document.getElementById('contactNumber').value.trim());
        formData.append('businessAddress', document.getElementById('businessAddress').value.trim());
        formData.append('businessType', document.getElementById('businessType').value);
        formData.append('paypalEmail', document.getElementById('paypalEmail').value.trim());
        
        // Product categories
        const selectedCategories = [];
        const categoryCheckboxes = form.querySelectorAll('.category-checkboxes input[type="checkbox"]:checked');
        categoryCheckboxes.forEach(checkbox => {
            selectedCategories.push(checkbox.value);
        });
        formData.append('productCategories', JSON.stringify(selectedCategories));
        
        // File upload
        if (fileInput.files[0]) {
            formData.append('businessPermit', fileInput.files[0]);
        }
        
        // Terms agreement
        formData.append('agreeTerms', document.getElementById('agreeTerms').checked);
        
        // Simulate API call
        simulateFormSubmission(formData);
    }
    
    function simulateFormSubmission(formData) {
        // Simulate network delay
        setTimeout(() => {
            // Simulate successful submission (90% success rate)
            const isSuccess = Math.random() > 0.1;
            
            if (isSuccess) {
                handleSubmissionSuccess();
            } else {
                handleSubmissionError('Registration failed. Please try again.');
            }
        }, 2000);
    }
    
    function handleSubmissionSuccess() {
        // Hide loading state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Registration';
        
        // Show success message
        showSuccess('Registration submitted successfully! We\'ll review your application and get back to you within 2-3 business days.');
        
        // Reset form
        form.reset();
        resetFormState();
        
        // Hide form and show success state
        setTimeout(() => {
            form.style.display = 'none';
            showFinalSuccessMessage();
        }, 3000);
    }
    
    function handleSubmissionError(errorMessage) {
        // Hide loading state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Registration';
        
        // Show error message
        showError(errorMessage || 'An error occurred. Please try again.');
    }
    
    function resetFormState() {
        // Reset file upload area
        uploadArea.classList.remove('file-selected');
        const uploadText = uploadArea.querySelector('.upload-text');
        const uploadSubtext = uploadArea.querySelector('.upload-subtext');
        uploadText.textContent = 'Click to upload file';
        uploadSubtext.textContent = 'PDF, JPG, PNG (Max 10MB)';
        
        // Remove all validation classes
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.classList.remove('is-valid', 'is-invalid');
            removeErrorMessage(input);
        });
        
        // Hide any error messages
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.style.display = 'none');
    }
    
    function showFinalSuccessMessage() {
        const container = document.querySelector('.registration-container');
        container.innerHTML = `
            <div class="text-center py-5">
                <div class="success-icon mb-4">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#27ae60" stroke-width="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22,4 12,14.01 9,11.01"></polyline>
                    </svg>
                </div>
                <h3 class="mb-3" style="color: #27ae60;">Registration Submitted Successfully!</h3>
                <p class="text-muted mb-4">Thank you for joining TECHORA marketplace. We'll review your application and send you an email confirmation within 2-3 business days.</p>
                <div class="alert alert-info" role="alert">
                    <strong>What's next?</strong><br>
                    • We'll verify your business documents<br>
                    • Set up your seller account<br>
                    • Send you login credentials via email<br>
                    • Provide access to our seller dashboard
                </div>
                <button class="btn btn-primary btn-lg mt-3" onclick="location.reload()">Submit Another Application</button>
            </div>
        `;
    }
    
    // Real-time form enhancements
    function initializeEnhancements() {
        // Auto-format store name based on seller name
        const sellerNameInput = document.getElementById('sellerName');
        const storeNameInput = document.getElementById('storeName');
        
        sellerNameInput.addEventListener('input', function() {
            if (!storeNameInput.value) {
                const sellerName = this.value.trim();
                if (sellerName) {
                    storeNameInput.placeholder = `${sellerName}'s Tech Store`;
                }
            }
        });
        
        // Character counter for business address
        const businessAddressTextarea = document.getElementById('businessAddress');
        const maxLength = 500;
        
        const counterDiv = document.createElement('div');
        counterDiv.className = 'character-counter text-end text-muted mt-1';
        counterDiv.innerHTML = `<small>0/${maxLength} characters</small>`;
        businessAddressTextarea.parentNode.appendChild(counterDiv);
        
        businessAddressTextarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            counterDiv.innerHTML = `<small>${currentLength}/${maxLength} characters</small>`;
            
            if (currentLength > maxLength * 0.9) {
                counterDiv.classList.add('text-warning');
            } else {
                counterDiv.classList.remove('text-warning');
            }
        });
        
        // Auto-suggest business type based on store name
        storeNameInput.addEventListener('input', function() {
            const storeName = this.value.toLowerCase();
            const businessTypeSelect = document.getElementById('businessType');
            
            if (businessTypeSelect.value === '') {
                if (storeName.includes('corp') || storeName.includes('inc')) {
                    businessTypeSelect.value = 'corporation';
                } else if (storeName.includes('llc')) {
                    businessTypeSelect.value = 'llc';
                } else if (storeName.includes('partnership')) {
                    businessTypeSelect.value = 'partnership';
                }
            }
        });
    }
    
    // Initialize enhancements
    initializeEnhancements();
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter to submit form
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            if (!submitBtn.disabled) {
                form.dispatchEvent(new Event('submit'));
            }
        }
        
        // Escape to clear current field
        if (e.key === 'Escape' && document.activeElement) {
            const activeElement = document.activeElement;
            if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
                activeElement.blur();
            }
        }
    });
    
    // Add smooth scrolling for form navigation
    const formSections = form.querySelectorAll('.row, .mb-3, .mb-4');
    formSections.forEach((section, index) => {
        section.addEventListener('focus', function() {
            this.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, true);
    });
    
    // Progress indicator (optional enhancement)
    function createProgressIndicator() {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-container mb-4';
        progressContainer.innerHTML = `
            <div class="progress" style="height: 4px;">
                <div class="progress-bar bg-primary" role="progressbar" style="width: 0%"></div>
            </div>
            <small class="text-muted">Complete all fields to submit your registration</small>
        `;
        
        const header = document.querySelector('.registration-header');
        header.appendChild(progressContainer);
        
        const progressBar = progressContainer.querySelector('.progress-bar');
        
        // Update progress based on filled fields
        function updateProgress() {
            const totalFields = form.querySelectorAll('input[required], select[required], textarea[required]').length + 1; // +1 for categories
            let filledFields = 0;
            
            // Count filled required fields
            form.querySelectorAll('input[required], select[required], textarea[required]').forEach(field => {
                if (field.value.trim() || (field.type === 'file' && field.files.length > 0)) {
                    filledFields++;
                }
            });
            
            // Count selected categories
            const categorySelected = form.querySelectorAll('.category-checkboxes input[type="checkbox"]:checked').length > 0;
            if (categorySelected) filledFields++;
            
            const progress = (filledFields / totalFields) * 100;
            progressBar.style.width = progress + '%';
            
            if (progress === 100) {
                progressBar.classList.remove('bg-primary');
                progressBar.classList.add('bg-success');
                progressContainer.querySelector('small').textContent = 'All fields completed! Ready to submit.';
            }
        }
        
        // Listen for changes
        form.addEventListener('input', updateProgress);
        form.addEventListener('change', updateProgress);
    }
    
    // Initialize progress indicator
    createProgressIndicator();
});

// Export functions for potential external use
window.SellerRegistration = {
    validateEmail: function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    validatePhone: function(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
        return phoneRegex.test(cleanPhone) && cleanPhone.length >= 10;
    }
};
