$(function () {

    // On page load, retrieves all products in the database and stores them in a product array to use the product info later
    let productArray = [];
    getProducts();
    function getProducts() {
        $.get("/api/products", function (data) {
            for (let i = 0; i < data.length; i++) {
                data[i].cartQuantity = 0;
            }
            productArray = data;
        });
    }

    // On page load, retrieves all products in the local storage cart or if storage is empty, sets the cart to be an empty array
    let cart = [];
    if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        checkButtons();
    } else {
        cart = [];
    }

    // For products in the cart, change the buttons so the user can't add to cart again
    function checkButtons() {
        for (var i = 0; i < cart.length; i++) {
            let target = $(`#add-${cart[i].id}`)
            changeButton(target);
        }
    }

    // Renders the HTML for all the products in the locally stored cart 
    function renderCartHTML() {
        let cart = JSON.parse(localStorage.getItem("cart"));
        if (cart) {
            $("#append-products-here").empty();
            for (let i = 0; i < cart.length; i++) {
                let newProductHTML =
                    `<div class="col-4 mb-2">
                    <img src=${cart[i].image} class="cart-image">
                </div>
                <div class="col-6">
                    <p class="modal-info">${cart[i].name}</p>
                    <p class="modal-info">$${cart[i].price}</p>
                    <p class="remove-item" data-id=${cart[i].id}>Remove</p>
                </div>
                <div class="col-2 text-center">
                    <i class="fas fa-chevron-up" data-id=${cart[i].id}></i>
                    <p id="${cart[i].id}-quantity">${cart[i].cartQuantity}</p>
                    <i class="fas fa-chevron-down" data-id=${cart[i].id}></i>
                </div>`

                $("#append-products-here").append(newProductHTML);
            }
        }
    }

    // Adds the product to the cart if it hasn't been added yet
    $(".add-button").on("click", function (event) {
        const productId = $(this).attr("data-id");
        if ($(this).attr("class") == "add-button") {
            addToCart(productId);
        }
        changeButton(event.target);
    })

    // Changes "Add to Cart" to "In Cart" and vice versa if product was removed from cart
    function changeButton(target, use) {
        let parentDiv = $(target).parent();
        if (use == "removed") {
            parentDiv.removeClass("in-cart-textbox");
            parentDiv.addClass("add-button-textbox");
            $(target).text("Add to Cart");
            $(target).addClass("add-button");
        } else {
            parentDiv.removeClass("add-button-textbox");
            parentDiv.addClass("in-cart-textbox");
            $(target).text("In Cart");
            $(target).removeClass("add-button");
        }
    }

    // Push product to shopping cart array when clicked, save to local storage
    function addToCart(id) {
        for (var i = 0; i < productArray.length; i++) {
            if (productArray[i].id == id) {
                var product = productArray[i];
                product.cartQuantity = 1;
            }
        }
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Display Shopping Cart Modal
    $(".fa-shopping-cart").on("click", function (event) {
        renderCartHTML();
        calculateTotals();
        $('#cart-modal').modal("show");
    })

    // Calculate totals and display in modal
    function calculateTotals() {
        let subtotal = 0;
        for (let i = 0; i < cart.length; i++) {
            subtotal += cart[i].cartQuantity * cart[i].price;
        }
        let tax = subtotal * 0.1;
        let total = subtotal + tax;

        $("#subtotal").text(`Subtotal: $ ${subtotal.toFixed(2)}`);
        $("#tax").text(`Tax (10%): $ ${tax.toFixed(2)}`);
        $("#total").text(`Total: $ ${total.toFixed(2)}`);
    }

    // Increment/Decrement shopping cart quantities on chevron clicks, save changes to local storage 
    $(document).on("click", ".fa-chevron-up, .fa-chevron-down", function (event) {
        let targetClass = $(event.target).attr("class");
        let productID = $(event.target).data("id");
        let currentQuantity = parseInt($(`#${productID}-quantity`).text());
        if (targetClass.includes("up")) {
            currentQuantity++;
        } else if (currentQuantity > 1) {
            currentQuantity--;
        }
        $(`#${productID}-quantity`).text(currentQuantity);

        cart.forEach(product => { if (product.id == productID) product.cartQuantity = currentQuantity });
        localStorage.setItem("cart", JSON.stringify(cart));
        calculateTotals();
    })

    // Remove item from cart with product ID, revert Add to Cart button and re-render the shopping cart
    $(document).on("click", ".remove-item", function (event) {
        let productID = $(event.target).data("id");
        let addToCartButtonID = $("#add-" + productID);
        cart = cart.filter(product => product.id != productID);
        localStorage.setItem("cart", JSON.stringify(cart));
        changeButton(addToCartButtonID, "removed");
        renderCartHTML();
        calculateTotals();
    });

    // On checkout, call routes to update SQL database with updated stock
    $(document).on("click", ".checkout-button", function (event) {
        $.ajax({
            type: "PUT",
            url: "/api/checkout",
            data: {'id' : cart},
        }).then(function(res) {
            localStorage.clear();
            alert("Success! Reloading page...")
            location.reload();
        })
    })
});


