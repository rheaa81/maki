// Inline Feather Icons Script
;(() => {
  const featherIcons = {
    "shopping-cart":
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" class="cart-icon" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 2 1.61h9.72a2 2 0 0 2-1.61L23 6H6"></path></svg>',
    search:
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',
  }

  // Device-specific UI enhancement function
  function enhanceUIForDevice() {
    // Detect device type
    const deviceType = getDeviceType()

    // Apply device-specific enhancements
    document.body.setAttribute("data-device", deviceType)

    // Apply specific enhancements based on device type
    switch (deviceType) {
      case "mobile":
        enhanceMobileUI()
        break
      case "tablet":
        enhanceTabletUI()
        break
      case "desktop":
        enhanceDesktopUI()
        break
    }

    // Log device detection for debugging
    console.log(`Device detected: ${deviceType}. UI enhancements applied.`)
  }

  // Detect device type based on screen width
  function getDeviceType() {
    const width = window.innerWidth

    if (width < 768) {
      return "mobile"
    } else if (width >= 768 && width < 1024) {
      return "tablet"
    } else {
      return "desktop"
    }
  }

  // Mobile-specific enhancements
  function enhanceMobileUI() {
    // Optimize touch targets for mobile
    document.querySelectorAll("button, .nav-link, .cart-icon-wrapper").forEach((el) => {
      el.classList.add("touch-optimized")
    })

    // Improve form inputs for mobile
    document.querySelectorAll("input, textarea, select").forEach((el) => {
      el.classList.add("mobile-input")
    })

    // Optimize images for mobile bandwidth
    document.querySelectorAll("img").forEach((img) => {
      if (!img.hasAttribute("loading")) {
        img.setAttribute("loading", "lazy")
      }

      // Add specific mobile styling
      img.classList.add("mobile-optimized-image")
    })

    // Enhance mobile navigation
    const mobileMenu = document.getElementById("mobile-menu")
    if (mobileMenu) {
      // Improve mobile menu animation
      mobileMenu.style.transition = "transform 0.3s ease, opacity 0.3s ease"

      // Add swipe gesture for mobile menu
      addSwipeGesture(mobileMenu)
    }

    // Optimize cart for mobile
    const cartSidebar = document.getElementById("cart-sidebar")
    if (cartSidebar) {
      cartSidebar.classList.add("mobile-cart")
    }

    // Add pull-to-refresh functionality
    addPullToRefresh()
  }

  // Tablet-specific enhancements
  function enhanceTabletUI() {
    // Optimize for tablet screen sizes
    document.querySelectorAll(".category-slider-item").forEach((item) => {
      item.classList.add("tablet-optimized")
    })

    // Enhance touch interactions for tablets
    document.querySelectorAll("button, .nav-link").forEach((el) => {
      el.classList.add("tablet-touch")
    })

    // Optimize modals for tablet
    document.querySelectorAll(".modal-content").forEach((modal) => {
      modal.classList.add("tablet-modal")
    })

    // Enhance tablet navigation
    const navLinks = document.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.classList.add("tablet-nav")
    })

    // Optimize images for tablet
    document.querySelectorAll("img").forEach((img) => {
      img.classList.add("tablet-optimized-image")
    })
  }

  // Desktop-specific enhancements
  function enhanceDesktopUI() {
    // Add hover effects for desktop
    document.querySelectorAll("button, .nav-link, .cart-icon-wrapper").forEach((el) => {
      el.classList.add("desktop-hover-effect")
    })

    // Enhance desktop navigation
    const navLinks = document.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.classList.add("desktop-nav")
    })

    // Optimize modals for desktop
    document.querySelectorAll(".modal-content").forEach((modal) => {
      modal.classList.add("desktop-modal")
    })

    // Add keyboard shortcuts for desktop
    addKeyboardShortcuts()

    // Enhance scrolling experience
    enhanceScrolling()
  }

  // Add swipe gesture detection for mobile
  function addSwipeGesture(element) {
    let touchStartX = 0
    let touchEndX = 0

    element.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX
      },
      { passive: true },
    )

    element.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX
        handleSwipe()
      },
      { passive: true },
    )

    function handleSwipe() {
      const swipeThreshold = 50
      if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left - close menu
        if (element.id === "mobile-menu" && !element.classList.contains("hidden")) {
          element.classList.add("hidden")
        }
      } else if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right - open menu
        if (element.id === "mobile-menu" && element.classList.contains("hidden")) {
          element.classList.remove("hidden")
        }
      }
    }
  }

  // Add pull-to-refresh functionality for mobile
  function addPullToRefresh() {
    let touchStartY = 0
    let touchEndY = 0

    document.addEventListener(
      "touchstart",
      (e) => {
        touchStartY = e.touches[0].clientY
      },
      { passive: true },
    )

    document.addEventListener(
      "touchend",
      (e) => {
        touchEndY = e.changedTouches[0].clientY
        handlePullToRefresh()
      },
      { passive: true },
    )

    function handlePullToRefresh() {
      const pullThreshold = 150
      if (window.scrollY === 0 && touchEndY - touchStartY > pullThreshold) {
        // Show refresh indicator
        showRefreshIndicator()

        // Simulate refresh after delay
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      }
    }

    function showRefreshIndicator() {
      // Create and show a refresh indicator
      const indicator = document.createElement("div")
      indicator.className = "refresh-indicator"
      indicator.innerHTML = `
        <div class="spinner"></div>
        <p>Refreshing...</p>
      `
      document.body.prepend(indicator)
    }
  }

  // Add keyboard shortcuts for desktop
  function addKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
      // ESC key to close modals
      if (e.key === "Escape") {
        const modals = document.querySelectorAll(".modal:not(.hidden), #cart-sidebar:not(.hidden)")
        if (modals.length > 0) {
          e.preventDefault()
          // Already handled in existing code
        }
      }

      // Ctrl+/ to focus search
      if (e.key === "/" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        const searchInput = document.querySelector(".search-input")
        if (searchInput) {
          searchInput.focus()
        }
      }

      // Ctrl+B to toggle cart
      if (e.key === "b" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        const cartSidebar = document.getElementById("cart-sidebar")
        if (cartSidebar) {
          if (cartSidebar.classList.contains("hidden")) {
            window.cart.toggleCart()
          } else {
            window.cart.toggleCart()
          }
        }
      }
    })
  }

  // Enhance scrolling experience for desktop
  function enhanceScrolling() {
    // Add smooth scrolling to all internal links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        // Already handled in existing code
      })
    })

    // Add scroll to top button
    addScrollToTopButton()
  }

  // Add scroll to top button
  function addScrollToTopButton() {
    const button = document.createElement("button")
    button.className = "scroll-to-top-btn hidden"
    button.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    `
    button.setAttribute("aria-label", "Scroll to top")
    document.body.appendChild(button)

    // Show/hide button based on scroll position
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        button.classList.remove("hidden")
      } else {
        button.classList.add("hidden")
      }
    })

    // Scroll to top when clicked
    button.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // Add CSS for new UI enhancements
  function addEnhancementStyles() {
    const styleElement = document.createElement("style")
    styleElement.textContent = `
      /* Mobile optimizations */
      .touch-optimized {
        min-height: 44px;
        min-width: 44px;
      }
      
      .mobile-input {
        font-size: 16px !important;
      }
      
      .mobile-optimized-image {
        max-width: 100%;
        height: auto;
      }
      
      .mobile-cart {
        width: 100% !important;
      }
      
      /* Tablet optimizations */
      .tablet-optimized {
        width: 230px;
      }
      
      .tablet-touch {
        transition: transform 0.2s ease;
      }
      
      .tablet-touch:active {
        transform: scale(0.98);
      }
      
      .tablet-modal {
        max-width: 80%;
      }
      
      .tablet-nav {
        padding: 0.75rem 1rem;
      }
      
      .tablet-optimized-image {
        max-width: 100%;
      }
      
      /* Desktop optimizations */
      .desktop-hover-effect {
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }
      
      .desktop-hover-effect:hover {
        transform: translateY(-2px);
      }
      
      .desktop-nav {
        position: relative;
      }
      
      .desktop-nav::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 0;
        height: 2px;
        background-color: var(--color-yellow-500);
        transition: width 0.3s ease;
      }
      
      .desktop-nav:hover::after {
        width: 100%;
      }
      
      .desktop-modal {
        max-width: 600px;
      }
      
      /* Scroll to top button */
      .scroll-to-top-btn {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--color-brown-800);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 90;
        opacity: 0.8;
        transition: opacity 0.3s ease, transform 0.3s ease;
        border: none;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      }
      
      .scroll-to-top-btn:hover {
        opacity: 1;
        transform: translateY(-3px);
      }
      
      .scroll-to-top-btn.hidden {
        display: none;
      }
      
      /* Refresh indicator */
      .refresh-indicator {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background-color: var(--color-brown-800);
        color: white;
        padding: 10px;
        text-align: center;
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
      }

    /* Additional device-specific enhancements */
    [data-device="mobile"] .hero-section h1 {
      font-size: 2.5rem;
      line-height: 1.2;
    }

    [data-device="tablet"] .hero-section h1 {
      font-size: 3rem;
      line-height: 1.3;
    }

    [data-device="desktop"] .hero-section h1 {
      font-size: 3.5rem;
      line-height: 1.4;
    }

    /* Enhanced navigation for different devices */
    [data-device="mobile"] .nav-link {
      font-weight: 600;
    }

    [data-device="tablet"] .nav-link {
      font-weight: 600;
      letter-spacing: 0.5px;
    }

    [data-device="desktop"] .nav-link {
      font-weight: 600;
      letter-spacing: 1px;
    }

    /* Enhanced footer for different devices */
    [data-device="mobile"] footer {
      text-align: center;
    }

    [data-device="tablet"] footer .grid {
      gap: 1.5rem;
    }

    [data-device="desktop"] footer .grid {
      gap: 2rem;
    }
  `
    document.head.appendChild(styleElement)
  }

  window.onload = () => {
    // Remove the welcome alert to avoid disrupting user experience
    // alert("Welcome to Maki City!");

    // Add enhancement styles
    addEnhancementStyles()

    // Apply device-specific enhancements
    enhanceUIForDevice()

    // Listen for window resize to reapply enhancements
    let resizeTimer
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        enhanceUIForDevice()
      }, 250)
    })
  }

  function replaceIcons() {
    document.querySelectorAll("[data-feather]").forEach((el) => {
      const iconName = el.getAttribute("data-feather")
      if (featherIcons[iconName]) {
        el.innerHTML = featherIcons[iconName]
      }
    })
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", replaceIcons)
  } else {
    replaceIcons()
  }
})()

// Document ready event
document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const mobileMenuButton = document.getElementById("mobile-menu-button")
  const mobileMenu = document.getElementById("mobile-menu")

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden")
    })
  }

  // Close mobile menu when clicking on a link
  document.querySelectorAll("#mobile-menu .nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden")
    })
  })

  // Smooth scrolling for navigation links
  document.querySelectorAll(".nav-link").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")

      if (targetId === "#") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      } else {
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
          })
        }
      }
    })
  })

  // Request call button
  const requestCallBtn = document.getElementById("request-call-btn")
  const requestCallModal = document.getElementById("request-call-modal")
  const closeRequestCall = document.getElementById("close-request-call")

  if (requestCallBtn && requestCallModal) {
    requestCallBtn.addEventListener("click", () => {
      requestCallModal.classList.remove("hidden")
    })
  }

  if (closeRequestCall && requestCallModal) {
    closeRequestCall.addEventListener("click", () => {
      requestCallModal.classList.add("hidden")
    })
  }

  // Request call form submission
  const requestCallForm = document.getElementById("request-call-form")
  if (requestCallForm) {
    requestCallForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Here you would typically send the data to your server
      // For demo purposes, we'll just show a success message
      showSuccessMessage("We'll call you back soon!")

      // Close the modal
      requestCallModal.classList.add("hidden")

      // Reset the form
      requestCallForm.reset()
    })
  }

  // Form validation functions
  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  function validatePhone(phone) {
    const re = /^09\d{9}$/
    return re.test(String(phone).replace(/\s/g, ""))
  }

  function showInputError(input, message) {
    const errorElement = input.nextElementSibling
    if (errorElement && errorElement.classList.contains("error-message")) {
      errorElement.textContent = message
      errorElement.classList.remove("hidden")
      input.classList.add("border-red-500")
    }
  }

  function clearInputError(input) {
    const errorElement = input.nextElementSibling
    if (errorElement && errorElement.classList.contains("error-message")) {
      errorElement.classList.add("hidden")
      input.classList.remove("border-red-500")
    }
  }

  // Handle contact form submission
  window.handleContactSubmit = (event) => {
    event.preventDefault()
    const form = event.target
    const nameInput = form.querySelector("#name")
    const phoneInput = form.querySelector("#phone")
    const emailInput = form.querySelector("#email")
    const messageInput = form.querySelector("#message")
    const submitButton = form.querySelector("button[type='submit']")
    const buttonText = submitButton.querySelector(".button-text")
    const buttonLoader = submitButton.querySelector(".button-loader")

    // Clear previous errors
    form.querySelectorAll(".error-message").forEach((el) => el.classList.add("hidden"))
    form.querySelectorAll("input, textarea").forEach((el) => el.classList.remove("border-red-500"))

    // Validate inputs
    let isValid = true

    if (!nameInput.value.trim()) {
      showInputError(nameInput, "Please enter your name")
      isValid = false
    } else {
      clearInputError(nameInput)
    }

    if (!phoneInput.value.trim()) {
      showInputError(phoneInput, "Please enter your phone number")
      isValid = false
    } else if (!validatePhone(phoneInput.value.trim())) {
      showInputError(phoneInput, "Please enter a valid Philippine mobile number")
      isValid = false
    } else {
      clearInputError(phoneInput)
    }

    if (!emailInput.value.trim()) {
      showInputError(emailInput, "Please enter your email")
      isValid = false
    } else if (!validateEmail(emailInput.value.trim())) {
      showInputError(emailInput, "Please enter a valid email address")
      isValid = false
    } else {
      clearInputError(emailInput)
    }

    if (!messageInput.value.trim()) {
      showInputError(messageInput, "Please enter your message")
      isValid = false
    } else {
      clearInputError(messageInput)
    }

    if (!isValid) {
      return
    }

    // Show loading state
    buttonText.classList.add("hidden")
    buttonLoader.classList.remove("hidden")
    submitButton.disabled = true

    // Simulate form submission
    setTimeout(() => {
      // Here you would typically send the data to your server
      // For demo purposes, we'll just show a success message
      showSuccessMessage("Thank you for your message! We'll get back to you soon.")

      // Reset form
      form.reset()

      // Reset button state
      buttonText.classList.remove("hidden")
      buttonLoader.classList.add("hidden")
      submitButton.disabled = false
    }, 1500)
  }

  // Handle newsletter submission
  window.handleNewsletterSubmit = (event) => {
    event.preventDefault()
    const form = event.target
    const emailInput = form.querySelector("input[type='email']")

    if (!emailInput.value.trim()) {
      showToast("Please enter your email address", "error")
      return
    }

    if (!validateEmail(emailInput.value.trim())) {
      showToast("Please enter a valid email address", "error")
      return
    }

    // Here you would typically send the data to your server
    // For demo purposes, we'll just show a success message
    showSuccessMessage("Thank you for subscribing to our newsletter!")

    // Reset form
    form.reset()
  }

  // Success message function
  function showSuccessMessage(message) {
    const successMessage = document.getElementById("success-message")

    if (successMessage) {
      successMessage.textContent = message
      successMessage.classList.add("show")

      setTimeout(() => {
        successMessage.classList.remove("show")
      }, 3000)
    }
  }

  // Cart Management Object
  const cart = {
    items: [],
    total: 0,

    addToCart(item) {
      const existingItem = this.items.find((cartItem) => cartItem.name === item.name)
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.items.push({ ...item, quantity: 1 })
      }
      this.updateCart()
      this.updateCartDisplay()
      this.saveCart()
      this.showToast(`${item.name} added to cart!`)
    },

    updateCart() {
      this.total = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const cartBadge = document.getElementById("cart-badge")
      const mobileCartBadge = document.getElementById("mobile-cart-badge")
      const totalQuantity = this.items.reduce((sum, item) => sum + item.quantity, 0)

      if (cartBadge) {
        cartBadge.textContent = totalQuantity
        // Update cart icon appearance
        if (totalQuantity > 0) {
          cartBadge.classList.remove("hidden")
        } else {
          cartBadge.classList.add("hidden")
        }
      }

      if (mobileCartBadge) {
        mobileCartBadge.textContent = totalQuantity
        if (totalQuantity > 0) {
          mobileCartBadge.classList.remove("hidden")
        } else {
          mobileCartBadge.classList.add("hidden")
        }
      }
    },

    updateCartDisplay() {
      const cartItemsContainer = document.getElementById("cart-items")
      const cartTotalElement = document.getElementById("cart-total")

      // Clear previous items
      if (cartItemsContainer) {
        cartItemsContainer.innerHTML = ""

        if (this.items.length === 0) {
          cartItemsContainer.innerHTML = '<p class="text-center py-4">Your cart is empty</p>'
          if (cartTotalElement) {
            cartTotalElement.textContent = "₱0.00"
          }
          return
        }

        // Add each item to the cart display
        this.items.forEach((item) => {
          const itemElement = document.createElement("div")
          itemElement.className = "cart-item cart-item-added"
          itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='placeholder.svg?height=60&width=60'">
            <div class="cart-item-details">
              <div class="cart-item-name">${item.name}</div>
              <div class="cart-item-price">₱${item.price}</div>
              <div class="quantity-control">
                <span class="quantity-btn decrease-quantity" data-name="${item.name}" role="button" tabindex="0" aria-label="Decrease quantity">-</span>
                <span class="quantity-value">${item.quantity}</span>
                <span class="quantity-btn increase-quantity" data-name="${item.name}" role="button" tabindex="0" aria-label="Increase quantity">+</span>
              </div>
            </div>
          `
          cartItemsContainer.appendChild(itemElement)
        })

        // Update total
        if (cartTotalElement) {
          cartTotalElement.textContent = `₱${this.total.toFixed(2)}`
        }

        // Add quantity control event listeners
        document.querySelectorAll(".decrease-quantity").forEach((button) => {
          button.addEventListener("click", (e) => {
            const itemName = e.target.dataset.name
            this.decreaseQuantity(itemName)
          })

          // Add keyboard support
          button.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              const itemName = e.target.dataset.name
              this.decreaseQuantity(itemName)
            }
          })
        })

        document.querySelectorAll(".increase-quantity").forEach((button) => {
          button.addEventListener("click", (e) => {
            const itemName = e.target.dataset.name
            this.increaseQuantity(itemName)
          })

          // Add keyboard support
          button.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              const itemName = e.target.dataset.name
              this.increaseQuantity(itemName)
            }
          })
        })
      }
    },

    decreaseQuantity(itemName) {
      const item = this.items.find((item) => item.name === itemName)
      if (item && item.quantity > 1) {
        item.quantity--
        this.updateCart()
        this.updateCartDisplay()
        this.saveCart()
      } else if (item && item.quantity === 1) {
        this.removeItem(itemName)
      }
    },

    increaseQuantity(itemName) {
      const item = this.items.find((item) => item.name === itemName)
      if (item) {
        item.quantity++
        this.updateCart()
        this.updateCartDisplay()
        this.saveCart()
      }
    },

    removeItem(itemName) {
      const index = this.items.findIndex((item) => item.name === itemName)
      if (index !== -1) {
        const removedItem = this.items[index]
        this.items.splice(index, 1)
        this.updateCart()
        this.updateCartDisplay()
        this.saveCart()
        this.showToast(`${removedItem.name} removed from cart`)
      }
    },

    toggleCart() {
      const cartSidebar = document.getElementById("cart-sidebar")
      const cartOverlay = document.getElementById("cart-overlay")

      if (cartSidebar && cartOverlay) {
        if (cartSidebar.classList.contains("hidden")) {
          // Open cart
          cartSidebar.classList.remove("hidden")
          cartOverlay.classList.remove("hidden")
          // Prevent body scrolling when cart is open
          document.body.style.overflow = "hidden"

          // Focus on close button for accessibility
          setTimeout(() => {
            const closeCartBtn = document.getElementById("close-cart")
            if (closeCartBtn) {
              closeCartBtn.focus()
            }
          }, 100)
        } else {
          // Close cart
          cartSidebar.classList.add("hidden")
          cartOverlay.classList.add("hidden")
          // Restore body scrolling
          document.body.style.overflow = ""
        }
      }
    },

    clearCart() {
      this.items = []
      this.total = 0
      this.updateCart()
      this.updateCartDisplay()
      this.saveCart()
      this.showToast("Cart cleared")
    },

    saveCart() {
      localStorage.setItem(
        "makiCityCart",
        JSON.stringify({
          items: this.items,
          total: this.total,
        }),
      )
    },

    saveCartForLater() {
      if (this.items.length === 0) {
        this.showToast("Your cart is empty", "error")
        return
      }

      localStorage.setItem(
        "makiCitySavedCart",
        JSON.stringify({
          items: this.items,
          total: this.total,
          savedAt: new Date().toISOString(),
        }),
      )

      this.showToast("Cart saved for later")
    },

    loadSavedCart() {
      const savedCart = localStorage.getItem("makiCitySavedCart")
      if (savedCart) {
        try {
          const cartData = JSON.parse(savedCart)
          this.items = cartData.items
          this.total = cartData.total
          this.updateCart()
          this.updateCartDisplay()
          this.saveCart()

          // Format the saved date
          const savedDate = new Date(cartData.savedAt)
          const formattedDate = savedDate.toLocaleDateString() + " " + savedDate.toLocaleTimeString()

          this.showToast(`Loaded cart from ${formattedDate}`)
        } catch (error) {
          console.error("Error loading saved cart:", error)
          this.showToast("Error loading saved cart", "error")
        }
      } else {
        this.showToast("No saved cart found", "error")
      }
    },

    checkout() {
      if (this.items.length === 0) {
        this.showToast("Your cart is empty", "error")
        return
      }

      // Show checkout modal
      const checkoutModal = document.getElementById("checkout-modal")
      if (checkoutModal) {
        checkoutModal.classList.remove("hidden")

        // Focus on first input for accessibility
        setTimeout(() => {
          const firstInput = checkoutModal.querySelector("input")
          if (firstInput) {
            firstInput.focus()
          }
        }, 100)
      }

      // Close cart sidebar
      this.toggleCart()
    },

    loadCart() {
      const savedCart = localStorage.getItem("makiCityCart")
      if (savedCart) {
        try {
          const cartData = JSON.parse(savedCart)
          this.items = cartData.items || []
          this.total = cartData.total || 0
          this.updateCart()
          this.updateCartDisplay()
        } catch (error) {
          console.error("Error loading cart:", error)
          // Reset cart if there's an error
          this.items = []
          this.total = 0
          this.updateCart()
          this.updateCartDisplay()
        }
      }
    },

    showToast(message, type = "success") {
      // Get the toast element
      const toast = document.getElementById("toast-notification")

      if (toast) {
        // Set the message and type
        toast.textContent = message

        // Set background color based on type
        if (type === "error") {
          toast.style.backgroundColor = "#F44336"
        } else {
          toast.style.backgroundColor = "#4CAF50"
        }

        // Show the toast
        toast.classList.add("show")

        // Hide the toast after 3 seconds
        setTimeout(() => {
          toast.classList.remove("show")
        }, 3000)
      }
    },
  }

  // Maki Cities Data
  const makiCitiesMenu = [
    {
      name: "Seoul",
      description: "Bulgogi ham, egg, kimchi, cheese, ebiko",
      price: 195,
      image: "SEOUL.jpg",
      category: "Maki Cities",
    },
    {
      name: "Guadalajara",
      description: "Shredded chicken, cheese, sriracha, bell pepper, caramelized onions",
      price: 195,
      image: "GUADALAJARA.jpg",
      category: "Maki Cities",
    },
    {
      name: "Ho Chi Minh",
      description: "Crabsticks, carrots, lettuce, cucumber, peanuts, ebiko",
      price: 195,
      image: "HO CHI MINH.jpg",
      category: "Maki Cities",
    },
    {
      name: "Minnesota",
      description: "Spam, egg, cheese, nori strips, ebiko",
      price: 195,
      image: "MINNESOTA.jpg",
      category: "Maki Cities",
    },
    {
      name: "Osaka",
      description: "Bulgogi ham, peaches, katsuobushi flakes, sesame seeds",
      price: 195,
      image: "OSAKA.jpg",
      category: "Maki Cities",
    },
    {
      name: "Boston",
      description: "Crabsticks, tempura bits, bread crumbs",
      price: 195,
      image: "BOSTON.jpg",
      category: "Maki Cities",
    },
    {
      name: "Tokyo",
      description: "Chicken teriyaki, spring onions, enoki, ebiko",
      price: 195,
      image: "TOKYO.jpg",
      category: "Maki Cities",
    },
    {
      name: "California",
      description: "Crabsticks, mango, cucumber, ebiko",
      price: 195,
      image: "CALIFORNIA.jpg",
      category: "Maki Cities",
    },
  ]

  // Nori Maki Mixed Menu
  const noriMakiMixedMenu = [
    {
      name: "Solo (10 pcs)",
      description: "5pcs California Maki | 5pcs Nori Maki",
      price: 120,
      image: "NORI MAKI MIXED - SOLO.jpg",
      category: "Nori Maki Mixed",
    },
    {
      name: "Duo (16 pcs)",
      description: "5pcs California Maki | 5pcs Nori Maki | 4pcs Kani Sushi | 2pcs Crabsticks",
      price: 180,
      image: "NORI MAKI MIXED - DUO.jpg",
      category: "Nori Maki Mixed",
    },
    {
      name: "Small (30 pcs)",
      description: "15pcs California Maki | 10pcs Nori Maki | 4pcs Kani Sushi | 2pcs Crabsticks",
      price: 350,
      image: "NORI MAKI MIXED - SMALL.jpg",
      category: "Nori Maki Mixed",
    },
    {
      name: "Medium (50 pcs)",
      description: "25pcs California Maki | 15pcs Nori Maki | 6pcs Kani Sushi | 4pcs Crabsticks",
      price: 540,
      image: "NORI MAKI MIXED - MEDIUM.jpg",
      category: "Nori Maki Mixed",
    },
    {
      name: "Large (80 pcs)",
      description: "40pcs California Maki | 25pcs Nori Maki | 8pcs Kani Sushi | 8pcs Crabsticks",
      price: 750,
      image: "NORI MAKI MIXED - LARGE.jpg",
      category: "Nori Maki Mixed",
    },
    {
      name: "Extra Large (110 pcs)",
      description: "50pcs California Maki | 40pcs Nori Maki | 10pcs Kani Sushi | 10pcs Crabsticks",
      price: 940,
      image: "NORI MAKI MIXED - XL.jpg",
      category: "Nori Maki Mixed",
    },
  ]

  // Multiple Cities Menu
  const multipleCitiesMenu = [
    {
      name: "Small (30 pcs)",
      description: "10pcs California Maki | 2 choices from Maki Cities with 10pcs each",
      price: 450,
      image: "SMALL - MULTIPLE CITIES.jpg",
      category: "Multiple Cities",
    },
    {
      name: "Medium (45 pcs)",
      description: "15pcs California Maki | 3 choices from Maki Cities with 10pcs each",
      price: 650,
      image: "MEDIUM - MULTIPLE CITIES.jpg",
      category: "Multiple Cities",
    },
    {
      name: "Large (70 pcs)",
      description: "30pcs California Maki | 4 choices from Maki Cities with 10pcs each",
      price: 920,
      image: "LARGE - MULTIPLE CITIES.jpg",
      category: "Multiple Cities",
    },
    {
      name: "Extra Large (100 pcs)",
      description: "50pcs California Maki | 5 choices from Maki Cities with 10pcs each",
      price: 1100,
      image: "XL - MULTIPLE CITIES.jpg",
      category: "Multiple Cities",
    },
  ]

  // Salad Menu
  const saladMenu = [
    {
      name: "Kani Salad",
      description: "Fresh salad with kani (crab sticks) and special dressing",
      price: 220,
      image: "KANI SALAD.jpg",
      category: "Salad",
    },
    {
      name: "Chicken Teriyaki Salad",
      description: "Fresh salad with teriyaki chicken and house dressing",
      price: 220,
      image: "CHICKEN TERIYAKI SALAD.jpg",
      category: "Salad",
    },
  ]

  // Also Available Menu
  const alsoAvailableMenu = [
    {
      name: "Nori Maki (10 pcs)",
      description: "Traditional nori wrapped maki rolls",
      price: 100,
      image: "NORI MAKI.jpg",
      category: "Also Available",
    },
    {
      name: "Kani Sushi (8 pcs)",
      description: "Delicious kani (crab stick) sushi",
      price: 100,
      image: "KANI SUSHI.jpg",
      category: "Also Available",
    },
    {
      name: "Cheese Tamagoyaki (8 pcs)",
      description: "Japanese egg omelette with cheese",
      price: 170,
      image: "CHEESE TAMAGOYAKI.jpg",
      category: "Also Available",
    },
    {
      name: "Spam Musubi (bite size, 10 pcs)",
      description: "Spam on rice wrapped with nori, Hawaiian style",
      price: 195,
      image: "SPAM MUSUBI.jpg",
      category: "Also Available",
    },
    {
      name: "Salmon Sashimi (200g)",
      description: "Fresh sliced salmon sashimi",
      price: 420,
      image: "SALMON SASHIMI.jpg",
      category: "Also Available",
    },
    {
      name: "Japanese Pork Buns (2 pcs)",
      description: "Soft buns filled with savory pork",
      price: 180,
      image: "JAPANESE PORK BUNS.jpg",
      category: "Also Available",
    },
    {
      name: "Chicken Teriyaki Buns (2 pcs)",
      description: "Soft buns filled with teriyaki chicken",
      price: 160,
      image: "CHICKEN TERIYAKI BUNS.jpg",
      category: "Also Available",
    },
  ]

  // Combine all menu items
  const allMenuItems = [
    ...makiCitiesMenu,
    ...noriMakiMixedMenu,
    ...multipleCitiesMenu,
    ...saladMenu,
    ...alsoAvailableMenu,
  ]

  // Function to create menu items by category
  function createMenuSection(categoryName, items) {
    const sectionContainer = document.createElement("div")
    sectionContainer.className = "mb-16"

    const sectionTitle = document.createElement("h3")
    sectionTitle.className = "text-2xl md:text-3xl font-bold mb-8"
    sectionTitle.style.color = "#432414"
    sectionTitle.textContent = categoryName
    sectionContainer.appendChild(sectionTitle)

    // Create slider container
    const sliderContainer = document.createElement("div")
    sliderContainer.className = "category-slider-container"

    // Create slider
    const slider = document.createElement("div")
    slider.className = "category-slider"
    slider.setAttribute("aria-label", `${categoryName} menu items`)
    slider.setAttribute("role", "region")
    slider.setAttribute("tabindex", "0")

    // Create navigation buttons
    const prevButton = document.createElement("button")
    prevButton.className = "slider-nav-button prev"
    prevButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>`
    prevButton.setAttribute("aria-label", `Previous ${categoryName} items`)

    const nextButton = document.createElement("button")
    nextButton.className = "slider-nav-button next"
    nextButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`
    nextButton.setAttribute("aria-label", `Next ${categoryName} items`)

    // Add items to slider
    items.forEach((item) => {
      const card = document.createElement("div")
      card.className = "category-slider-item"

      const cardInner = document.createElement("div")
      cardInner.className = "bg-[#eeeeee] rounded-lg shadow-lg overflow-hidden hover-scale h-full"
      cardInner.innerHTML = `
        <div class="relative">
          <img src="${item.image}" alt="${item.name}" class="w-full h-48 object-cover" loading="lazy" onerror="this.src='placeholder.svg?height=192&width=384'">
          <div class="absolute top-2 right-2 bg-yellow-500 text-brown-900 px-2 py-1 rounded-full text-sm font-bold">
            ₱${item.price}
          </div>
        </div>
        <div class="p-4">
          <h4 class="font-bold text-lg mb-2 text-brown-900">${item.name}</h4>
          <p class="text-brown-600 mb-4 h-16 overflow-hidden">${item.description}</p>
          <div class="flex justify-end">
            <button class="bg-yellow-500 text-brown-900 px-4 py-2 rounded-lg hover:bg-yellow-600 transition add-to-cart-btn focus:outline-none focus:ring-2 focus:ring-yellow-400" 
                    data-item='${JSON.stringify(item).replace(/'/g, "&#39;")}' aria-label="Add ${item.name} to cart">
            Add to Cart
          </button>
        </div>
      </div>
    `
      card.appendChild(cardInner)
      slider.appendChild(card)
    })

    // Add slider indicators
    const indicators = document.createElement("div")
    indicators.className = "slider-indicators"

    // Only add indicators if there are enough items
    if (items.length > 3) {
      const indicatorCount = Math.ceil(items.length / 3)
      for (let i = 0; i < indicatorCount; i++) {
        const indicator = document.createElement("div")
        indicator.className = i === 0 ? "slider-indicator active" : "slider-indicator"
        indicator.setAttribute("data-index", i)
        indicator.setAttribute("role", "button")
        indicator.setAttribute("tabindex", "0")
        indicator.setAttribute("aria-label", `Go to slide ${i + 1}`)
        indicators.appendChild(indicator)
      }
    }

    // Add elements to container
    sliderContainer.appendChild(prevButton)
    sliderContainer.appendChild(slider)
    sliderContainer.appendChild(nextButton)
    sliderContainer.appendChild(indicators)
    sectionContainer.appendChild(sliderContainer)

    // Add slider navigation functionality
    setupSliderNavigation(slider, prevButton, nextButton, indicators)

    return sectionContainer
  }

  // Function to set up slider navigation
  function setupSliderNavigation(slider, prevButton, nextButton, indicators) {
    // Initial check for button visibility
    checkSliderButtons(slider, prevButton, nextButton)

    // Scroll event to update button visibility and indicators
    slider.addEventListener("scroll", () => {
      checkSliderButtons(slider, prevButton, nextButton)
      updateSliderIndicators(slider, indicators)
    })

    // Previous button click
    prevButton.addEventListener("click", () => {
      slider.scrollBy({
        left: -slider.offsetWidth * 0.8,
        behavior: "smooth",
      })
    })

    // Next button click
    nextButton.addEventListener("click", () => {
      slider.scrollBy({
        left: slider.offsetWidth * 0.8,
        behavior: "smooth",
      })
    })

    // Indicator clicks
    const allIndicators = indicators.querySelectorAll(".slider-indicator")
    allIndicators.forEach((indicator) => {
      indicator.addEventListener("click", () => {
        const index = Number.parseInt(indicator.getAttribute("data-index"))
        const scrollAmount = (slider.scrollWidth / allIndicators.length) * index
        slider.scrollTo({
          left: scrollAmount,
          behavior: "smooth",
        })
      })

      // Keyboard navigation for indicators
      indicator.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          indicator.click()
        }
      })
    })

    // Keyboard navigation for slider
    slider.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        prevButton.click()
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        nextButton.click()
      }
    })

    // Touch events for mobile swipe
    let touchStartX = 0
    let touchEndX = 0

    slider.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX
      },
      { passive: true },
    )

    slider.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX
        handleSwipe()
      },
      { passive: true },
    )

    function handleSwipe() {
      const swipeThreshold = 50
      if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left, go to next
        nextButton.click()
      } else if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right, go to previous
        prevButton.click()
      }
    }

    // Initial check for indicators
    updateSliderIndicators(slider, indicators)

    // Window resize event to update buttons and indicators
    window.addEventListener("resize", () => {
      checkSliderButtons(slider, prevButton, nextButton)
      updateSliderIndicators(slider, indicators)
    })
  }

  // Function to check if slider buttons should be visible
  function checkSliderButtons(slider, prevButton, nextButton) {
    // Check if we're at the start - still add hidden class for styling but buttons remain visible
    if (slider.scrollLeft <= 10) {
      prevButton.classList.add("hidden")
    } else {
      prevButton.classList.remove("hidden")
    }

    // Check if we're at the end - still add hidden class for styling but buttons remain visible
    if (slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth - 10) {
      nextButton.classList.add("hidden")
    } else {
      nextButton.classList.remove("hidden")
    }

    // Ensure buttons are always enabled
    prevButton.disabled = false
    nextButton.disabled = false
  }

  // Function to update slider indicators
  function updateSliderIndicators(slider, indicators) {
    const allIndicators = indicators.querySelectorAll(".slider-indicator")
    if (allIndicators.length === 0) return

    const scrollPercentage = slider.scrollLeft / (slider.scrollWidth - slider.offsetWidth)
    const activeIndex = Math.min(Math.floor(scrollPercentage * allIndicators.length), allIndicators.length - 1)

    allIndicators.forEach((indicator, index) => {
      if (index === activeIndex) {
        indicator.classList.add("active")
      } else {
        indicator.classList.remove("active")
      }
    })
  }

  // Track current category
  let currentCategory = "all"

  // Function to filter menu by category
  function filterMenu(category) {
    // Show loading spinner
    const menuContainer = document.getElementById("menu-container")
    if (menuContainer) {
      menuContainer.innerHTML = `
        <div class="loading-spinner flex justify-center py-8">
          <div class="spinner"></div>
        </div>
      `
    }

    // Update active tab
    document.querySelectorAll(".category-tab").forEach((tab) => {
      if (tab.dataset.category === category) {
        tab.classList.add("active")
        tab.setAttribute("aria-selected", "true")
      } else {
        tab.classList.remove("active")
        tab.setAttribute("aria-selected", "false")
      }
    })

    // Simulate network delay for loading effect
    setTimeout(() => {
      // Clear the menu container
      if (menuContainer) {
        menuContainer.innerHTML = ""

        // If "all" is selected, show all categories
        if (category === "all") {
          // Create sections for each category
          const categories = [
            { name: "MAKI CITIES", items: makiCitiesMenu },
            { name: "NORI MAKI MIXED", items: noriMakiMixedMenu },
            { name: "MULTIPLE CITIES", items: multipleCitiesMenu },
            { name: "SALAD", items: saladMenu },
            { name: "ALSO AVAILABLE", items: alsoAvailableMenu },
          ]

          categories.forEach((cat) => {
            const section = createMenuSection(cat.name, cat.items)
            menuContainer.appendChild(section)
          })
        } else {
          // If a specific category is selected, show only that category
          let filteredItems = []
          let sectionTitle = ""

          switch (category) {
            case "Maki Cities":
              filteredItems = makiCitiesMenu
              sectionTitle = "MAKI CITIES"
              break
            case "Nori Maki Mixed":
              filteredItems = noriMakiMixedMenu
              sectionTitle = "NORI MAKI MIXED"
              break
            case "Multiple Cities":
              filteredItems = multipleCitiesMenu
              sectionTitle = "MULTIPLE CITIES"
              break
            case "Salad":
              filteredItems = saladMenu
              sectionTitle = "SALAD"
              break
            case "Also Available":
              filteredItems = alsoAvailableMenu
              sectionTitle = "ALSO AVAILABLE"
              break
          }

          const section = createMenuSection(sectionTitle, filteredItems)
          menuContainer.appendChild(section)
        }

        // Add event listeners to all Add to Cart buttons
        document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
          button.addEventListener("click", function () {
            try {
              const itemData = JSON.parse(this.getAttribute("data-item"))
              cart.addToCart(itemData)
            } catch (error) {
              console.error("Error parsing item data:", error)
              cart.showToast("Error adding item to cart", "error")
            }
          })
        })
      }
    }, 500) // 500ms delay for loading effect
  }

  // Add event listeners to category tabs
  document.querySelectorAll(".category-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const category = tab.dataset.category
      currentCategory = category
      filterMenu(category)
    })

    // Add keyboard support with improved focus handling
    tab.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        const category = tab.dataset.category
        currentCategory = category
        filterMenu(category)
      }
    })
  })

  // Initialize the menu with all items
  filterMenu("all")

  // Add search functionality with fuzzy search
  const searchInput = document.querySelector(".search-input")
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase().trim()

      if (searchTerm === "") {
        // If search is empty, revert to current category view
        filterMenu(currentCategory)
        return
      }

      // Clear the menu container
      const menuContainer = document.getElementById("menu-container")
      if (menuContainer) {
        menuContainer.innerHTML = `
        <div class="loading-spinner flex justify-center py-8">
          <div class="spinner"></div>
        </div>
      `

        // Simulate network delay for loading effect
        setTimeout(() => {
          menuContainer.innerHTML = ""

          // Fuzzy search function
          function fuzzyMatch(str, pattern) {
            pattern = pattern.toLowerCase()
            str = str.toLowerCase()

            let patternIdx = 0
            let strIdx = 0
            const match = false

            while (patternIdx < pattern.length && strIdx < str.length) {
              if (pattern[patternIdx] === str[strIdx]) {
                patternIdx++
              }
              strIdx++
            }

            return patternIdx === pattern.length
          }

          // Filter all menu items based on fuzzy search
          const filteredItems = allMenuItems.filter(
            (item) =>
              fuzzyMatch(item.name, searchTerm) ||
              fuzzyMatch(item.description, searchTerm) ||
              item.name.toLowerCase().includes(searchTerm) ||
              item.description.toLowerCase().includes(searchTerm),
          )

          if (filteredItems.length > 0) {
            const section = createMenuSection("SEARCH RESULTS", filteredItems)
            menuContainer.appendChild(section)

            // Add event listeners to Add to Cart buttons
            document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
              button.addEventListener("click", function () {
                try {
                  const itemData = JSON.parse(this.getAttribute("data-item"))
                  cart.addToCart(itemData)
                } catch (error) {
                  console.error("Error parsing item data:", error)
                  cart.showToast("Error adding item to cart", "error")
                }
              })
            })
          } else {
            // Display "No results found" message
            const noResults = document.createElement("div")
            noResults.className = "text-center py-8"
            noResults.innerHTML = `
            <p class="text-xl text-brown-900">No results found for "${searchTerm}"</p>
            <p class="mt-2">Try a different search term or browse our categories.</p>
          `
            menuContainer.appendChild(noResults)
          }
        }, 300)
      }
    })
  }

  // Add cart icon click event
  const cartIcons = document.querySelectorAll(".cart-icon-wrapper")
  cartIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      cart.toggleCart()
    })

    // Add keyboard support
    icon.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        cart.toggleCart()
      }
    })
  })

  // Add overlay click event to close cart
  const cartOverlay = document.getElementById("cart-overlay")
  if (cartOverlay) {
    cartOverlay.addEventListener("click", () => {
      cart.toggleCart()
    })
  }

  // Add close cart button event
  const closeCartBtn = document.getElementById("close-cart")
  if (closeCartBtn) {
    closeCartBtn.addEventListener("click", () => {
      cart.toggleCart()
    })
  }

  // Add checkout button event
  const checkoutBtn = document.getElementById("checkout-btn")
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      cart.checkout()
    })
  }

  // Add continue shopping button event
  const continueShoppingBtn = document.getElementById("continue-shopping")
  if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener("click", () => {
      cart.toggleCart()
    })
  }

  // Add save cart button event
  const saveCartBtn = document.getElementById("save-cart")
  if (saveCartBtn) {
    saveCartBtn.addEventListener("click", () => {
      cart.saveCartForLater()
    })
  }

  // Add clear cart button event
  const clearCartBtn = document.getElementById("clear-cart")
  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to clear your cart?")) {
        cart.clearCart()
      }
    })
  }

  // Close checkout modal
  const closeCheckoutModal = document.getElementById("close-checkout")
  if (closeCheckoutModal) {
    closeCheckoutModal.addEventListener("click", () => {
      document.getElementById("checkout-modal").classList.add("hidden")
    })
  }

  // Process order button
  const processOrderBtn = document.getElementById("process-order")
  if (processOrderBtn) {
    processOrderBtn.addEventListener("click", (e) => {
      e.preventDefault()
      const form = document.getElementById("checkout-form")

      if (form) {
        // Validate form
        const nameInput = form.querySelector("#checkout-name")
        const phoneInput = form.querySelector("#checkout-phone")
        const emailInput = form.querySelector("#checkout-email")
        const addressInput = form.querySelector("#checkout-address")
        const buttonText = processOrderBtn.querySelector(".button-text")
        const buttonLoader = processOrderBtn.querySelector(".button-loader")

        // Clear previous errors
        form.querySelectorAll(".error-message").forEach((el) => el.classList.add("hidden"))
        form.querySelectorAll("input, textarea").forEach((el) => el.classList.remove("border-red-500"))

        // Validate inputs
        let isValid = true

        if (!nameInput.value.trim()) {
          showInputError(nameInput, "Please enter your name")
          isValid = false
        }

        if (!phoneInput.value.trim()) {
          showInputError(phoneInput, "Please enter your phone number")
          isValid = false
        } else if (!validatePhone(phoneInput.value.trim())) {
          showInputError(phoneInput, "Please enter a valid Philippine mobile number")
          isValid = false
        }

        if (!emailInput.value.trim()) {
          showInputError(emailInput, "Please enter your email")
          isValid = false
        } else if (!validateEmail(emailInput.value.trim())) {
          showInputError(emailInput, "Please enter a valid email address")
          isValid = false
        }

        if (!addressInput.value.trim()) {
          showInputError(addressInput, "Please enter your delivery address")
          isValid = false
        }

        if (!isValid) {
          return
        }

        // Show loading state
        buttonText.classList.add("hidden")
        buttonLoader.classList.remove("hidden")
        processOrderBtn.disabled = true

        // Simulate order processing
        setTimeout(() => {
          // Here you would typically send the order to your server
          // For demo purposes, we'll just show a success message
          cart.showToast("Thank you for your order! We will process it shortly.", "success")

          // Reset form and close modal
          setTimeout(() => {
            cart.clearCart()
            document.getElementById("checkout-modal").classList.add("hidden")

            // Reset button state
            buttonText.classList.remove("hidden")
            buttonLoader.classList.add("hidden")
            processOrderBtn.disabled = false

            // Show a more detailed success message
            showSuccessMessage(
              "Your order has been placed successfully! You will receive a confirmation email shortly.",
            )
          }, 1000)
        }, 2000)
      } else {
        cart.showToast("An error occurred. Please try again.", "error")
      }
    })
  }

  // Make cart globally accessible
  window.cart = cart

  // Load cart from localStorage
  cart.loadCart()

  // Handle click outside checkout modal to close it
  window.addEventListener("click", (e) => {
    const checkoutModal = document.getElementById("checkout-modal")
    const requestCallModal = document.getElementById("request-call-modal")

    if (checkoutModal && e.target === checkoutModal) {
      checkoutModal.classList.add("hidden")
    }

    if (requestCallModal && e.target === requestCallModal) {
      requestCallModal.classList.add("hidden")
    }
  })

  // Add keyboard event to close modals with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const checkoutModal = document.getElementById("checkout-modal")
      const cartSidebar = document.getElementById("cart-sidebar")
      const requestCallModal = document.getElementById("request-call-modal")

      if (checkoutModal && !checkoutModal.classList.contains("hidden")) {
        checkoutModal.classList.add("hidden")
      } else if (requestCallModal && !requestCallModal.classList.contains("hidden")) {
        requestCallModal.classList.add("hidden")
      } else if (cartSidebar && !cartSidebar.classList.contains("hidden")) {
        cart.toggleCart()
      }
    }
  })

  // Handle image loading errors
  document.addEventListener(
    "error",
    (e) => {
      if (e.target.tagName.toLowerCase() === "img") {
        e.target.src = `placeholder.svg?height=${e.target.height}&width=${e.target.width}`
      }
    },
    true,
  )

  // Add active class to navigation links based on scroll position
  function setActiveNavLink() {
    const sections = document.querySelectorAll("section[id]")
    const navLinks = document.querySelectorAll(".nav-link")

    let currentSection = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight

      if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight - 100) {
        currentSection = "#" + section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("text-yellow-300")
      if (link.getAttribute("href") === currentSection) {
        link.classList.add("text-yellow-300")
      }
    })
  }

  window.addEventListener("scroll", setActiveNavLink)

  // Initialize active nav link on page load
  setActiveNavLink()

  // Declare showToast function (if not already declared elsewhere)
  function showToast(message, type = "success") {
    // Get the toast element
    const toast = document.getElementById("toast-notification")

    if (toast) {
      // Set the message and type
      toast.textContent = message

      // Set background color based on type
      if (type === "error") {
        toast.style.backgroundColor = "#F44336"
      } else {
        toast.style.backgroundColor = "#4CAF50"
      }

      // Show the toast
      toast.classList.add("show")

      // Hide the toast after 3 seconds
      setTimeout(() => {
        toast.classList.remove("show")
      }, 3000)
    }
  }
})

