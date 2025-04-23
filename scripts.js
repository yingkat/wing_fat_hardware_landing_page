
        document.getElementById("show-more").addEventListener("click", function() {
            let moreProducts = document.getElementById("more-products");
            if (moreProducts.style.display === "none") {
                moreProducts.style.display = "block";
                this.textContent = "收起";
            } else {
                moreProducts.style.display = "none";
                this.textContent = "查看更多";
            }
        });

document.getElementById("review-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let formData = new FormData(this);

    fetch("save_review.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        location.reload(); // Refresh to display new reviews
    });
});

/*   this function is to lauch whatsapp to generate order message for user to whatsapp seller 
document.getElementById("order-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let product = document.getElementById("product").value;
    let quantity = document.getElementById("quantity").value;

    // Construct order message
    let message = `訂單資訊：%0A姓名: ${name}%0A電話: ${phone}%0A產品: ${product}%0A數量: ${quantity}`;
    
    // WhatsApp Order Link
    let whatsappLink = `https://wa.me/60125608960?text=${message}`;
    document.getElementById("whatsapp-order").href = whatsappLink;

    alert("訂單已提交！請使用 WhatsApp 確認您的訂單。");
});
*/


// tis function is to add user order form into database
document.getElementById("order-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let formData = new FormData(this);

    // Send data to PHP for database storage
    fetch("save_order.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Show confirmation message

        // Generate WhatsApp order message
        let name = formData.get("customer_name");
        let phone = formData.get("phone");
        let email = formData.get("email");
        let product = document.querySelector("#product option:checked").textContent;
        let quantity = formData.get("quantity");
        let address = formData.get("address") || "無";
        let orderNotes = formData.get("order_notes") || "無";

        let message = `📦 *新訂單通知* %0A%0A` +
                      `👤 *姓名:* ${name}%0A` +
                      `📞 *電話:* ${phone}%0A` +
                      `📧 *Email:* ${email}%0A` +
                      `🛍️ *產品:* ${product}%0A` +
                      `🔢 *數量:* ${quantity}%0A` +
                      `🏠 *地址:* ${address}%0A` +
                      `📝 *備註:* ${orderNotes}%0A%0A` +
                      `請確認並回覆客戶，謝謝！`;

        let whatsappLink = `https://wa.me/60125608960?text=${message}`;
        document.getElementById("whatsapp-order").href = whatsappLink;

        // Optionally, reset the form after submission
        document.getElementById("order-form").reset();
    })
    .catch(error => console.error("Error:", error));
});
   
