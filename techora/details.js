document.addEventListener("DOMContentLoaded", () => {
    // Add to Cart
    const addToCartButtons = document.querySelectorAll('.btn-dark');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productTitle = this.closest('.col-md-6').querySelector('h2').innerText;
            const quantity = document.getElementById('quantity').value;
            alert(`${quantity} of ${productTitle} has been added to your cart!`);
        });
    });

   
    const buyNowButtons = document.querySelectorAll('.btn-outline-dark:not(.btn-wishlist)');
    buyNowButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productTitle = this.closest('.col-md-6').querySelector('h2').innerText;
            alert(`You are buying ${productTitle} now!`);
        });
    });

   
    const wishlistButtons = document.querySelectorAll('.btn-wishlist');
    wishlistButtons.forEach(button => {
        const icon = button.querySelector('.wishlist-icon');

        button.addEventListener('click', () => {
            if (icon.classList.contains('filled')) {
                icon.classList.remove('filled');
                icon.src = "/techora/img/heart.svg"; 
                alert('Removed from Wishlist!');
            } else {
                icon.classList.add('filled');
                icon.src = "/techora/img/heart-fill.svg"; 
                alert('Added to Wishlist!');
            }
        });
    });
});
