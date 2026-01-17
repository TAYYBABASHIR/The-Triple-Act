function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    if (!chatWindow) {
        console.warn('Chat window element (#chat-window) not found.');
        return;
    }
    // Use aria-hidden to coordinate with the CSS rule that uses !important.
    const isHidden = chatWindow.getAttribute('aria-hidden') === 'true' || chatWindow.style.display === 'none' || chatWindow.style.display === '';
    if (isHidden) {
        // Open: remove the hidden flag first so CSS won't force it hidden
        chatWindow.setAttribute('aria-hidden', 'false');
        chatWindow.style.display = 'flex';
        chatWindow.setAttribute('data-open', 'true');
        const chatContent = document.getElementById('chat-content');
        if (chatContent) chatContent.innerHTML = '<p><strong><b>Triplex:</b></strong> Hiee ! How can I help you with our hygiene products today?</p>';
        const input = document.getElementById('chat-input');
        if (input) input.focus();
    } else {
        // Close: set aria-hidden so CSS hides it reliably, then hide inline
        chatWindow.setAttribute('aria-hidden', 'true');
        chatWindow.style.display = 'none';
        chatWindow.setAttribute('data-open', 'false');
    }
}

// 2. Function to handle sending and receiving messages
function sendMessage() {
    const inputField = document.getElementById('chat-input');
    const chatContent = document.getElementById('chat-content');
    const userText = inputField.value.trim();

    // Don't do anything if the input is empty
    if (userText === "") return;

    // Display the User's Message
    chatContent.innerHTML += `
        <div style="text-align: right; margin-bottom: 15px;">
            <span style="background-color: #ad8a15; letter-spacing: 1.5px; color: white; padding: 8px 12px; border-radius: 15px 15px 0 15px; display: inline-block; max-width: 80%; font-size: 13px; box-shadow: 2px 2px 5px rgba(0,0,0,0.05);">
                ${userText}
            </span>
        </div>
    `;

    // Clear the input field for the next message
    inputField.value = "";

    // Show a "Triplex is typing..." indicator
    const typingId = "typing-" + Date.now();
    chatContent.innerHTML += `<div id="${typingId}" style="font-size: 14px; color: grey; margin-bottom: 10px;">Triplex is typing...</div>`;
    
    // Auto-scroll to the bottom
    chatContent.scrollTop = chatContent.scrollHeight;

    // Process the "AI" response after a 1.5-second delay
    setTimeout(() => {
        // Remove the typing indicator
        const typingElement = document.getElementById(typingId);
        if (typingElement) typingElement.remove();

        const botResponse = getTriplexData(userText.toLowerCase());

        // Display Triplex's Response
        chatContent.innerHTML += `
            <div style="text-align: left; margin-bottom: 15px;">
                <span style="background-color: #1A1A1A; letter-spacing: 1.5px; color: white; padding: 8px 12px; border-radius: 15px 15px 15px 0; display: inline-block; max-width: 80%; font-size: 13px; box-shadow: 2px 2px 5px rgba(0,0,0,0.1);">
                    <strong>Triplex:</strong> ${botResponse}
                </span>
            </div>
        `;
        
        // Final Auto-scroll
        chatContent.scrollTop = chatContent.scrollHeight;
    }, 1500);
}

// 3. The "Knowledge Base" logic for Triplex's responses
function getTriplexData(input) {
    // Normalize input and provide default reply
    input = (input || '').toLowerCase();
    let reply = "I'm not sure about that yet, but I'm learning! Try asking about a product, order, or shipping.";

    // Core helpers
    if (input.includes("hi") || input.includes("hello") || input.includes("hey")) {
        reply = "Hi! I'm Triplex, your Triple Act hygiene assistant — how can I help you today?";
    }

    // General product and category queries
    else if (input.includes("facewash") || input.includes("cleaner") || input.includes("wash")) {
        reply = "Our Facewash line includes Salicylic, Charcoal, Neem, Hyaluronic and Vitamin C variants — pick one based on your skin type.";
    }

    else if (input.includes("fragrance") || input.includes("perfume") || input.includes("scent")) {
        reply = "Explore Perfumes and Attars on the Fragrances section — click a product to view sizes, images and 'Add to Cart'.";
    }

    // Expanded list: 100 additional specific responses
    else if (input.includes("azzaro") || input.includes("azzaro page")) {
        reply = "Azzaro: a warm, exotic scent — check its product page for images, sizes (50ml/100ml commonly), SKU and Add-to-Cart options.";
    }
    else if (input.includes("azzaro size") || input.includes("azzaro sizes")) {
        reply = "Azzaro sizes are listed on the product page; common options include 50ml and 100ml — select the size before adding to cart.";
    }
    else if (input.includes("azzaro price") || input.includes("azzaro cost")) {
        reply = "Price for Azzaro depends on size — view the product page for current pricing and offers.";
    }
    else if (input.includes("bleu") || input.includes("bleu de chanel") || input.includes("bleu page")) {
        reply = "Bleu De Chanel: bold & earthy — see the product page for size options, price and add-to-cart button.";
    }
    else if (input.includes("bleu size") || input.includes("bleu sizes")) {
        reply = "Bleu De Chanel sizes are displayed on its page — choose before adding to cart.";
    }
    else if (input.includes("bleu price") || input.includes("bleu cost")) {
        reply = "Bleu De Chanel pricing is shown on its product page and updates with size selection.";
    }
    else if (input.includes("dior") || input.includes("dior savage") || input.includes("dior page")) {
        reply = "Dior Savage is listed in Perfumes; open the product page to view images, sizes, and purchase options.";
    }
    else if (input.includes("dior size") || input.includes("dior sizes")) {
        reply = "Dior Savage size options are on the product page — confirm size before adding to cart.";
    }
    else if (input.includes("oud") || input.includes("oud attar")) {
        reply = "Oud Attar is a concentrated oil-based scent — apply sparingly; see its product page for images and SKU.";
    }
    else if (input.includes("natural attar") || input.includes("natural")) {
        reply = "Natural Attar is long-lasting and earthy — find details and sizing on the Natural Attar product page.";
    }
    else if (input.includes("herbal attar") || input.includes("herbal")) {
        reply = "Herbal Attar features herbal notes — view recommended usage and SKU on its product page.";
    }
    else if (input.includes("attar sizes") || input.includes("attar size")) {
        reply = "Attar sizes are visible on each Attar product page — typically offered in small concentrated volumes.";
    }
    else if (input.includes("attar application") || input.includes("how to use attar")) {
        reply = "Attars are oil-based; apply 1–2 small dabs on pulse points for lasting scent.";
    }
    else if (input.includes("salicylic") || input.includes("salicylic acid")) {
        reply = "Salicylic Facewash is suited for oily/acne-prone skin and helps clear pores — use as directed on the product page.";
    }
    else if (input.includes("charcoal facewash") || input.includes("charcoal")) {
        reply = "Charcoal Facewash detoxifies and helps remove urban pollutants — great for city dwellers.";
    }
    else if (input.includes("neem facewash") || input.includes("neem")) {
        reply = "Neem Facewash is calming and great for sensitive or irritated skin.";
    }
    else if (input.includes("hyaluronic") || input.includes("hyaluronic facewash")) {
        reply = "Hyaluronic Facewash supports moisture retention — ideal for dry skin types.";
    }
    else if (input.includes("vitamin c") || input.includes("vit c")) {
        reply = "Vitamin C Facewash brightens dull skin and supports an even tone when used regularly.";
    }
    else if (input.includes("serum") || input.includes("serums")) {
        reply = "Our Serums target specific concerns; see each Serum page for actives, usage frequency and pairing tips.";
    }
    else if (input.includes("spf") || input.includes("sunscreen")) {
        reply = "SPF products protect against UV damage — apply 15 minutes before sun exposure and reapply every 2 hours when outdoors.";
    }
    else if (input.includes("hair oil") || input.includes("hair oil page")) {
        reply = "Hair Oil nourishes the scalp and hair — apply a few drops to lengths and ends or as instructed on the product page.";
    }
    else if (input.includes("hair ess") || input.includes("hair essentials")) {
        reply = "Hair Essentials include treatments and styling aids — the product page lists use instructions and recommended frequency.";
    }
    else if (input.includes("product images") || input.includes("gallery")) {
        reply = "Click product images to view larger photos and gallery views for more detail.";
    }
    else if (input.includes("cart") || input.includes("view cart")) {
        reply = "Your cart is stored locally with key 'cartItems'; click CART in the header to view or edit quantities.";
    }
    else if (input.includes("add to cart") || input.includes("addtocart")) {
        reply = "Select a size/variant then click Add to Cart — you will be redirected to the cart page to complete your purchase.";
    }
    else if (input.includes("cart problem") || input.includes("add to cart problem")) {
        reply = "If items don't appear in cart, ensure your browser allows localStorage and that you're not in private/incognito mode.";
    }
    else if (input.includes("checkout") || input.includes("pay") || input.includes("place order")) {
        reply = "Click 'Checkout' on the cart page and follow the prompts for delivery and payment details to complete your order.";
    }
    else if (input.includes("shipping") || input.includes("delivery")) {
        reply = "We aim to ship within 1–3 business days; shipping cost and timings will be shown at checkout once you enter your address.";
    }
    else if (input.includes("tracking") || input.includes("track")) {
        reply = "After your order ships you'll receive tracking details via email; use the carrier's tracking link to follow delivery.";
    }
    else if (input.includes("returns") || input.includes("refund") || input.includes("exchange")) {
        reply = "Review our Refund & Exchange Policy in the footer for eligibility and steps to start a return — contact support if unsure.";
    }
    else if (input.includes("cancel order") || input.includes("cancel my order")) {
        reply = "Contact support ASAP to cancel — if the order hasn't shipped we can usually cancel or modify it.";
    }
    else if (input.includes("payment methods") || input.includes("card") || input.includes("cod") || input.includes("cash on delivery")) {
        reply = "We accept major cards and may offer Cash-on-Delivery; payment options are shown during checkout.";
    }
    else if (input.includes("invoice") || input.includes("receipt")) {
        reply = "Invoices are emailed with your confirmation; contact support if you need a copy or VAT invoice for business use.";
    }
    else if (input.includes("coupon") || input.includes("promo") || input.includes("discount")) {
        reply = "Enter eligible coupon codes at checkout — most offers apply automatically where eligible, and terms appear with the promo.";
    }
    else if (input.includes("gift wrap") || input.includes("gift message")) {
        reply = "Gift wrapping and messages are available when the option is enabled at checkout — add your message in the final step if offered.";
    }
    else if (input.includes("wholesale") || input.includes("bulk")) {
        reply = "For wholesale or bulk orders contact sales@thetripleact.example or use the Contact page and mention 'Wholesale' in your message.";
    }
    else if (input.includes("ingredients") || input.includes("allergy") || input.includes("allergen")) {
        reply = "Check each product page for an ingredients summary; if you have severe allergies consult the label and perform a patch test.";
    }
    else if (input.includes("expiry") || input.includes("shelf life") || input.includes("expiration")) {
        reply = "Expiry and shelf life details are printed on packaging; unopened products typically last 12–36 months depending on formula.";
    }
    else if (input.includes("storage") || input.includes("how to store")) {
        reply = "Store products in a cool, dry place away from direct sunlight to keep them fresh and effective.";
    }
    else if (input.includes("safety") || input.includes("side effects")) {
        reply = "Follow usage instructions and perform a patch test for sensitive skin; consult a medical professional for serious reactions.";
    }
    else if (input.includes("kids") || input.includes("child")) {
        reply = "Keep products out of reach of children; check labels for age-specific warnings and instructions.";
    }
    else if (input.includes("vegan") || input.includes("cruelty")) {
        reply = "Check each product page for 'vegan' or 'cruelty-free' labels — we aim to be transparent about ingredient sourcing.";
    }
    else if (input.includes("sustainability") || input.includes("recyclable")) {
        reply = "We try to use recyclable packaging where possible; product pages and policies include any sustainability notes.";
    }
    else if (input.includes("privacy") || input.includes("privacy policy")) {
        reply = "Our Privacy Policy is linked in the footer — it explains how we treat personal data and cookies.";
    }
    else if (input.includes("terms") || input.includes("terms of service")) {
        reply = "Visit our Terms & Conditions link in the footer for full terms about purchases, shipping and returns.";
    }
    else if (input.includes("gdpr") || input.includes("data protection")) {
        reply = "We follow applicable data protection rules — contact us for data access or removal requests as per our privacy policy.";
    }
    else if (input.includes("newsletter") || input.includes("subscribe")) {
        reply = "Subscribe to our newsletter for product updates and promotions — a signup link will appear on the site soon.";
    }
    else if (input.includes("unsubscribe") || input.includes("unsubscribe newsletter")) {
        reply = "Use the unsubscribe link at the bottom of any newsletter to stop receiving emails, or contact support for help.";
    }
    else if (input.includes("store location") || input.includes("where to buy")) {
        reply = "We sell directly online; any physical store partners will be listed on the site when available — contact support for retail inquiries.";
    }
    else if (input.includes("press") || input.includes("media")) {
        reply = "For press or media inquiries contact media@thetripleact.example — include your outlet and intended coverage.";
    }
    else if (input.includes("influencer") || input.includes("collaborate")) {
        reply = "We welcome collaborations — send proposals to partnerships@thetripleact.example and include social metrics and campaign ideas.";
    }
    else if (input.includes("careers") || input.includes("jobs")) {
        reply = "Check the Careers or Contact page for open positions; send your CV and cover letter to careers@thetripleact.example.";
    }
    else if (input.includes("return address") || input.includes("where to return")) {
        reply = "Return addresses are provided in the returns process after you initiate a return — contact support to start the process.";
    }
    else if (input.includes("local pickup") || input.includes("in store pickup")) {
        reply = "If local pickup is available it will be offered at checkout — select 'Pickup' as a delivery option when present.";
    }
    else if (input.includes("size guide") || input.includes("size chart")) {
        reply = "Check each product page for size guidance or contact support for exact measurements and recommendations.";
    }
    else if (input.includes("skin type") || input.includes("which skin type")) {
        reply = "Use Salicylic for oily/acne-prone, Hyaluronic for dry skin, Neem for sensitive skin, and Vitamin C for dullness — consult product pages for details.";
    }
    else if (input.includes("for men") || input.includes("men")) {
        reply = "Many of our fragrances and grooming products are unisex, while some scents are marketed with a masculine profile — see product descriptions for details.";
    }
    else if (input.includes("for women") || input.includes("women")) {
        reply = "Products are generally usable by all genders; choose scents and formulations based on personal preference and skin type.";
    }
    else if (input.includes("unisex")) {
        reply = "Several of our fragrances and care products are unisex — check the product description to confirm.";
    }
    else if (input.includes("best seller") || input.includes("top seller")) {
        reply = "Best sellers are highlighted on the homepage or product pages when featured — check promotions and bundles for popular picks.";
    }
    else if (input.includes("reviews") || input.includes("customer reviews")) {
        reply = "Customer reviews and ratings will appear on product pages when available — leave a review after purchase to help others.";
    }
    else if (input.includes("leave review") || input.includes("how to review")) {
        reply = "After purchase you can leave a review on the product page or via the review link sent in the order email.";
    }
    else if (input.includes("sample") || input.includes("tester") || input.includes("samples")) {
        reply = "Sample availability varies — check product pages or contact support to ask about sample or tester options.";
    }
    else if (input.includes("restock") || input.includes("back in stock")) {
        reply = "If an item is out of stock use the 'Notify me' or contact support to request a restock alert when the product is available again.";
    }
    else if (input.includes("notify me") || input.includes("stock alert")) {
        reply = "We can notify you when a product is back in stock — use the request form on the product page or email support with the product name.";
    }
    else if (input.includes("bulk discount") || input.includes("discount tiers")) {
        reply = "Bulk or tiered discounts for wholesale orders are available — contact sales for pricing and MOQ (minimum order quantity) details.";
    }
    else if (input.includes("loyalty") || input.includes("membership")) {
        reply = "We may introduce loyalty perks or membership benefits — join our newsletter to be informed about any loyalty program launches.";
    }
    else if (input.includes("customer support") || input.includes("support")) {
        reply = "Contact support at TheTripleAct@gmail.com with details and order number if applicable — we'll respond as soon as possible.";
    }
    else if (input.includes("clear cache") || input.includes("refresh")) {
        reply = "If you see stale content clear your browser cache and reload the page to see the latest updates.";
    }
    else if (input.includes("security") || input.includes("secure")) {
        reply = "We use standard security practices for payment and data handling; contact support with any security concerns.";
    }
    else if (input.includes("currency") || input.includes("international")) {
        reply = "International orders may be subject to duties and taxes; final costs are calculated at checkout and might vary by destination.";
    }
    else if (input.includes("vat") || input.includes("tax")) {
        reply = "Taxes and VAT handling depend on local regulations and are shown at checkout or on your invoice if applicable.";
    }
    else if (input.includes("contact phone") || input.includes("phone")) {
        reply = "You can call us at 03 123456789 during business hours — check the Contact page for hours and alternative contact methods.";
    }
    else if (input.includes("contact email") || input.includes("email")) {
        reply = "Email us at TheTripleAct@gmail.com for general enquiries; use specific addresses for sales or media if noted.";
    }
    else if (input.includes("order id") || input.includes("order number")) {
        reply = "Include your order number in emails to support if you need help locating or modifying an order.";
    }
    else if (input.includes("return policy") || input.includes("refund policy")) {
        reply = "Full return and refund policy is in the footer — begin a return there or contact support for guidance.";
    }
    else if (input.includes("gift card") || input.includes("gift cards")) {
        reply = "Gift cards may be offered seasonally — contact support to confirm availability and how to redeem.";
    }
    else if (input.includes("balance") || input.includes("redeem gift")) {
        reply = "Gift card balances and redemption instructions will be provided with the card details — contact support for balance checks.";
    }
    else if (input.includes("delivery time") || input.includes("delivery estimate")) {
        reply = "Delivery estimates are shown at checkout; standard shipping typically arrives in 1–5 business days depending on region and service chosen.";
    }
    else if (input.includes("damaged") || input.includes("broken on arrival")) {
        reply = "Report damaged items to support immediately with photos — we'll advise returns or replacements per our policy.";
    }
    else if (input.includes("bulk order process") || input.includes("wholesale process")) {
        reply = "Wholesale inquiries start with an email to sales including your business details and expected volume; we'll respond with terms and pricing.";
    }
    else if (input.includes("sample policy") || input.includes("free sample")) {
        reply = "Sampling policies vary; contact support with your request and we'll let you know if samples can be provided.";
    }
    else if (input.includes("packaging") || input.includes("box")) {
        reply = "Packaging details (materials, recyclable info) are listed with product details when applicable.";
    }
    else if (input.includes("ingredients natural") || input.includes("natural ingredients")) {
        reply = "Some products feature natural extracts — see each product page for ingredient callouts and percentages where available.";
    }
    else if (input.includes("how to apply perfume") || input.includes("apply perfume")) {
        reply = "Apply perfume to pulse points (wrists, neck) and avoid rubbing wrists together to preserve fragrance top notes.";
    }
    else if (input.includes("layering perfume") || input.includes("how to layer")) {
        reply = "Layering tip: start with a light, unscented moisturizer then add complementary scent notes; test combinations first.";
    }
    else if (input.includes("how to use serum") || input.includes("use serum")) {
        reply = "Use serums after cleansing and before moisturizer — apply a few drops and allow to absorb before layering other products.";
    }
    else if (input.includes("how to use facewash") || input.includes("use facewash")) {
        reply = "Wet your face, massage a pea-sized amount gently, rinse thoroughly and follow with serum/moisturizer as needed.";
    }
    else if (input.includes("how to use hair oil") || input.includes("use hair oil")) {
        reply = "Warm a few drops, apply to mid-lengths and ends, or massage into scalp if treating scalp concerns; use as directed on product page.";
    }
    else if (input.includes("pack sizes") || input.includes("ml")) {
        reply = "Product sizes (ml) are shown on each product page; choose your preferred size before adding to cart.";
    }
    else if (input.includes("subscription") || input.includes("auto refill")) {
        reply = "We may offer subscription or auto-refill services in future — subscribe to the newsletter for announcements and early access.";
    }
    else if (input.includes("press release") || input.includes("press kit")) {
        reply = "Media resources and press kits are provided on request — contact media@thetripleact.example for materials.";
    }
    else if (input.includes("business hours") || input.includes("opening hours")) {
        reply = "Business hours and response times are listed on the Contact page; email is monitored during business hours for faster replies.";
    }
    else if (input.includes("update address") || input.includes("change address")) {
        reply = "Update shipping address during checkout or contact support immediately with your order number to request a change before shipment.";
    }
    else if (input.includes("privacy data request") || input.includes("gdpr request")) {
        reply = "To request a copy or deletion of your personal data, contact us via the privacy channel in the Contact page; we'll follow applicable data protection laws.";
    }
    else if (input.includes("where to find sku") || input.includes("sku")) {
        reply = "SKU and product codes are listed on each product page — include the SKU in support requests to speed up assistance.";
    }
    else if (input.includes("testimonials") || input.includes("customer story")) {
        reply = "Customer testimonials and success stories may appear on product pages or marketing spots — share yours via support if you'd like to be featured.";
    }
    else if (input.includes("bulk shipping") || input.includes("freight")) {
        reply = "For large wholesale shipments we coordinate shipping options and costs with you — contact sales for freight quotes and logistics.";
    }
    else if (input.includes("faq") || input.includes("frequently asked")) {
        reply = "Common questions are answered on product pages and the footer; ask me and I'll try to give an immediate answer or point you to the right page.";
    }
    else if (input.includes("contact support hours") || input.includes("support hours")) {
        reply = "Support response times are listed on Contact; urgent order issues should include order number for prioritization.";
    }
    else if (input.includes("where is my order") || input.includes("order status")) {
        reply = "Check your confirmation email for tracking details once your order ships, or contact support with your order number for help.";
    }
    else if (input.includes("how to return") || input.includes("start a return")) {
        reply = "To start a return, visit the Refund & Exchange Policy in the footer and follow the instructions or contact support for assistance.";
    }
    else if (input.includes("quality") || input.includes("tested")) {
        reply = "We follow product quality checks and use reputable ingredients; for medical concerns consult a healthcare professional.";
    }
    else if (input.includes("contact sales") || input.includes("sales contact")) {
        reply = "For sales or wholesale please email sales@thetripleact.example with your inquiry and business details.";
    }
    else if (input.includes("where to see promotions") || input.includes("offers")) {
        reply = "Promotions and seasonal offers are shown on the homepage and during checkout — subscribe for early access to deals.";
    }
    else if (input.includes("thank you") || input.includes("thanks")) {
        reply = "You're welcome — happy to help! Ask me about any product, order, or policy.";
    }
    else if (input.includes("azzaro 50") || input.includes("azzaro 50ml")) {
        reply = "Azzaro — 50ml: warm, exotic eau de parfum; compact spray bottle for daily wear.";
    }
    else if (input.includes("azzaro 100") || input.includes("azzaro 100ml")) {
        reply = "Azzaro — 100ml: long-lasting full-size bottle; rich warm notes with good sillage.";
    }
    else if (input.includes("bleu 50") || input.includes("bleu 50ml") || input.includes("bleu de chanel 50")) {
        reply = "Bleu De Chanel — 50ml: bold, earthy fragrance in a 50ml spray; classic versatile scent.";
    }
    else if (input.includes("bleu 100") || input.includes("bleu 100ml") || input.includes("bleu de chanel 100")) {
        reply = "Bleu De Chanel — 100ml: full-size bottle offering extended wear and projection.";
    }
    else if (input.includes("dior 50") || input.includes("dior 50ml") || input.includes("dior savage 50")) {
        reply = "Dior Savage — 50ml: fresh, masculine scent in a 50ml format; great everyday option.";
    }
    else if (input.includes("dior 100") || input.includes("dior 100ml") || input.includes("dior savage 100")) {
        reply = "Dior Savage — 100ml: larger bottle with stronger longevity and projection.";
    }
    else if (input.includes("oud 10") || input.includes("oud 10ml") || input.includes("oud attar 10")) {
        reply = "Oud Attar — 10ml: concentrated oil-based oud; apply 1–2 small dabs for long-lasting aroma.";
    }
    else if (input.includes("oud 20") || input.includes("oud 20ml") || input.includes("oud attar 20")) {
        reply = "Oud Attar — 20ml: larger attar vial delivering an extended supply of oud oil.";
    }
    else if (input.includes("natural attar 10") || input.includes("natural 10ml")) {
        reply = "Natural Attar — 10ml: earthy, long-lasting attar oil in a compact vial.";
    }
    else if (input.includes("natural attar 20") || input.includes("natural 20ml")) {
        reply = "Natural Attar — 20ml: extended size for frequent use; concentrated natural notes.";
    }
    else if (input.includes("herbal attar 10") || input.includes("herbal 10ml")) {
        reply = "Herbal Attar — 10ml: herbal-infused attar concentrate for subtle aromatic layering.";
    }
    else if (input.includes("herbal attar 20") || input.includes("herbal 20ml")) {
        reply = "Herbal Attar — 20ml: larger bottle suited for regular use; herbal top notes are prominent.";
    }
    else if (input.includes("salicylic 100") || input.includes("salicylic facewash 100ml") || input.includes("salicylic facewash")) {
        reply = "Salicylic Acid Facewash — 100ml: clarifying cleanser for oily and acne-prone skin.";
    }
    else if (input.includes("charcoal 100") || input.includes("charcoal facewash 100ml") || input.includes("charcoal facewash")) {
        reply = "Charcoal Facewash — 100ml: detoxifying cleanser to remove pollutants and impurities.";
    }
    else if (input.includes("neem 100") || input.includes("neem facewash 100ml") || input.includes("neem facewash")) {
        reply = "Neem Facewash — 100ml: soothing and gentle cleanser for sensitive skin.";
    }
    else if (input.includes("hyaluronic 100") || input.includes("hyaluronic facewash 100ml") || input.includes("hyaluronic facewash")) {
        reply = "Hyaluronic Facewash — 100ml: hydrating cleanser that helps retain moisture.";
    }
    else if (input.includes("vitamin c 100") || input.includes("vitamin c facewash 100ml") || input.includes("vitamin c facewash")) {
        reply = "Vitamin C Facewash — 100ml: brightening cleanser to even skin tone and boost radiance.";
    }
    else if (input.includes("hydrating serum 30") || input.includes("hydrating serum 30ml") || input.includes("hydrating serum")) {
        reply = "Hydrating Serum — 30ml: moisture-boosting serum with hyaluronic actives for plump skin.";
    }
    else if (input.includes("vit c serum 30") || input.includes("vitamin c serum 30ml") || input.includes("vitamin c serum")) {
        reply = "Vitamin C Serum — 30ml: brightening serum to improve radiance and even skin tone.";
    }
    else if (input.includes("retinol serum 30") || input.includes("retinol serum")) {
        reply = "Retinol Serum — 30ml: nighttime treatment to support skin renewal (use as directed).";
    }
    else if (input.includes("niacinamide 30") || input.includes("niacinamide serum")) {
        reply = "Niacinamide Serum — 30ml: reduces redness and helps refine pores and texture.";
    }
    else if (input.includes("repair serum 30") || input.includes("repair serum")) {
        reply = "Repair Serum — 30ml: restorative serum formulated to support skin barrier repair.";
    }
    else if (input.includes("spf 30") || input.includes("spf30") || input.includes("spf 30 50ml")) {
        reply = "SPF 30 — 50ml: daily sun protection with broad-spectrum coverage.";
    }
    else if (input.includes("spf 50") || input.includes("spf50") || input.includes("spf 50 50ml")) {
        reply = "SPF 50 — 50ml: higher protection sunscreen for intense sun exposure; reapply regularly.";
    }
    else if (input.includes("argan oil 50") || input.includes("argan hair oil")) {
        reply = "Argan Hair Oil — 50ml: nourishing oil to add shine and reduce frizz; apply to ends.";
    }
    else if (input.includes("coconut oil 50") || input.includes("coconut hair oil")) {
        reply = "Coconut Hair Oil — 50ml: moisturizing hair oil rich in fatty acids for softness and nourishment.";
    }
    else if (input.includes("hair mask 200") || input.includes("hair mask 200ml")) {
        reply = "Hair Mask — 200ml: intensive treatment to restore moisture and strength; use weekly.";
    }
    else if (input.includes("scalp serum 50") || input.includes("scalp serum")) {
        reply = "Scalp Serum — 50ml: targeted serum to soothe and support scalp health.";
    }
    else if (input.includes("travel facewash 20") || input.includes("facewash travel 20ml")) {
        reply = "Facewash Travel — 20ml: compact travel size of your chosen facewash variant for convenience.";
    }
    else if (input.includes("perfume sample 2ml") || input.includes("perfume sample")) {
        reply = "Perfume Sample — 2ml vial: try a scent before committing to a full bottle; ideal for testing notes.";
    }
    else if (input.includes("starter kit") || input.includes("gift starter kit")) {
        reply = "Starter Kit: curated set with sample sizes across categories — perfect as a gift or to explore the range.";
    }
    else if (input.includes("body mist 150") || input.includes("body mist 150ml")) {
        reply = "Body Mist — 150ml: light fragrant mist for body refreshment and layering with perfumes.";
    }
    else if (input.includes("fragrance roller 8") || input.includes("roller 8ml")) {
        reply = "Fragrance Roller — 8ml: convenient roll-on format for touch-ups and travel.";
    }
    else if (input.includes("aftershave balm 100") || input.includes("aftershave balm")) {
        reply = "Aftershave Balm — 100ml: soothing post-shave balm to calm skin and add mild fragrance.";
    }
    else if (input.includes("beard oil 30") || input.includes("beard oil")) {
        reply = "Beard Oil — 30ml: conditions facial hair and softens the beard with light fragrance.";
    }
    else if (input.includes("hair serum 30") || input.includes("hair serum")) {
        reply = "Hair Serum — 30ml: lightweight styling serum to add shine and reduce frizz.";
    }
    else if (input.includes("hydrating mist 100") || input.includes("hydrating mist")) {
        reply = "Hydrating Mist — 100ml: facial mist to refresh and hydrate throughout the day.";
    }
    else if (input.includes("cleansing balm 120") || input.includes("cleansing balm")) {
        reply = "Cleansing Balm — 120ml: gentle oil-based cleanser to remove makeup and impurities.";
    }
    else if (input.includes("azzaro gift set") || input.includes("gift set azzaro")) {
        reply = "Azzaro Gift Set: curated box with bottle and sample(s) for gifting and discovery.";
    }
    else if (input.includes("bleu collector") || input.includes("bleu collector edition")) {
        reply = "Bleu Collector Edition: special release with unique packaging; availability varies by season.";
    }
    else if (input.includes("dior travel set") || input.includes("dior mini set")) {
        reply = "Dior Travel Set: travel minis bundled for convenience during trips.";
    }
    else if (input.includes("refill pack 200") || input.includes("refill pack")) {
        reply = "Refill Pack — 200ml: economical refill option where available for select products.";
    }
    else if (input.includes("bulk 1l") || input.includes("1l bulk")) {
        reply = "Bulk 1L: wholesale-sized containers available by request for selected products.";
    }
    else if (input.includes("azzaro sample vial") || input.includes("azzaro sample")) {
        reply = "Azzaro Sample Vial — 2ml: try Azzaro's notes before you buy a full bottle.";
    }
    else if (input.includes("bleu sample vial") || input.includes("bleu sample")) {
        reply = "Bleu Sample Vial — 2ml: small tester to evaluate Bleu De Chanel on your skin.";
    }
    else if (input.includes("oud sample vial") || input.includes("oud sample")) {
        reply = "Oud Sample Vial — 1–2ml: concentrated attar sample to test intensity and longevity.";
    }
    else if (input.includes("natural sample vial") || input.includes("natural sample")) {
        reply = "Natural Attar Sample Vial — 1–2ml: try the natural attar oil before buying a larger vial.";
    }
    else if (input.includes("2in1 shampoo 200") || input.includes("2-in-1 shampoo 200ml") || input.includes("2 in 1 shampoo")) {
        reply = "2-in-1 Shampoo — 200ml: cleanses and conditions in one step for convenience.";
    }
    else if (input.includes("conditioner 200") || input.includes("conditioner 200ml")) {
        reply = "Conditioner — 200ml: smooths hair, detangles, and helps maintain moisture balance.";
    }
    else if (input.includes("leave in spray 150") || input.includes("leave-in spray 150ml")) {
        reply = "Leave-in Spray — 150ml: detangling, protective spray for daily styling.";
    }
    else if (input.includes("acne") || input.includes("i have acne") || input.includes("acne skin")) { 

        reply = "Use Salicylic Facewash, a BHA spot treatment, oil-free moisturizer, and daily SPF; consult a dermatologist for severe acne."; 

    } 

    else if (input.includes("acne scars") || input.includes("pimple marks") || input.includes("post-acne")) { 

        reply = "Try Vitamin C Serum and Niacinamide to brighten marks, use SPF daily, and consider professional treatments for deep scars."; 

    } 

    else if (input.includes("oily skin") || input.includes("very oily")) { 

        reply = "Use Salicylic Facewash, lightweight oil-free moisturizer, and mattifying SPF; blot with oil-absorbing sheets as needed."; 

    } 

    else if (input.includes("dry skin") || input.includes("very dry")) { 

        reply = "Use Hyaluronic Facewash, hydrating serum, and a richer moisturizer; apply SPF in the morning and avoid hot water."; 

    } 

    else if (input.includes("combination skin") || input.includes("mixed skin")) { 

        reply = "Use targeted routine: Salicylic in oily zones, Hyaluronic on dry areas, and a lightweight moisturizer for balance."; 

    } 

    else if (input.includes("sensitive skin") || input.includes("reactive skin")) { 

        reply = "Choose Neem Facewash, fragrance-free formulas, and always patch test new products before full use."; 

    } 

    else if (input.includes("redness") || input.includes("rosacea") || input.includes("red skin")) { 

        reply = "Use gentle, fragrance-free products, avoid harsh exfoliation, patch test, and consult a dermatologist for rosacea."; 

    } 

    else if (input.includes("blackheads") || input.includes("black head")) { 

        reply = "Use Salicylic-based cleansers and clay masks to reduce blackheads; exfoliate gently 1–2x/week."; 

    } 

    else if (input.includes("whiteheads") || input.includes("white heads")) { 

        reply = "Gentle BHA or enzymatic exfoliation helps whiteheads; avoid picking and use non-comedogenic products."; 

    } 

    else if (input.includes("large pores") || input.includes("pores")) { 

        reply = "Use Niacinamide and gentle exfoliation to help refine pores and oil control; consistent SPF prevents enlargement."; 

    } 

    else if (input.includes("clogged pores") || input.includes("clogged")) { 

        reply = "Regular BHA use and a clarifying facewash can help clear clogged pores — don't over-exfoliate."; 

    } 

    else if (input.includes("dehydrated") || input.includes("dehydration")) { 

        reply = "Hydrating Serum (Hyaluronic) plus a moisturizing cream restores hydration; drink water and avoid harsh detergents."; 

    } 

    else if (input.includes("dull skin") || input.includes("lackluster")) { 

        reply = "Vitamin C Serum and gentle exfoliation brighten dull skin — use sunscreen to protect results."; 

    } 

    else if (input.includes("hyperpigmentation") || input.includes("dark patches")) { 

        reply = "Use Vitamin C, Niacinamide, and daily SPF; persistent spots may benefit from professional treatments."; 

    } 

    else if (input.includes("dark spots") || input.includes("brown spots")) { 

        reply = "Brightening serum with Vitamin C and consistent SPF reduces dark spots over time."; 

    } 

    else if (input.includes("uneven tone") || input.includes("uneven skin")) { 

        reply = "Use exfoliation + Vitamin C and a gentle daily sunscreen to even skin tone gradually."; 

    } 

    else if (input.includes("fine lines") || input.includes("lines")) { 

        reply = "Use Retinol at night (start low frequency), hydrating serums, and daytime SPF to protect improvement."; 

    } 

    else if (input.includes("wrinkles") || input.includes("aging")) { 

        reply = "Incorporate retinol, hydrating serums, and SPF; consider professional anti-ageing options for deeper wrinkles."; 

    } 

    else if (input.includes("aging skin") || input.includes("mature skin")) { 

        reply = "Use barrier-supporting serums, retinol at night, and a rich daytime moisturizer with SPF."; 

    } 

    else if (input.includes("dark circles") || input.includes("under eye circles")) { 

        reply = "Use a gentle eye cream with caffeine or niacinamide, ensure sleep, and limit salt/alcohol for puffiness."; 

    } 

    else if (input.includes("puffy eyes") || input.includes("swollen eyes")) { 

        reply = "Cool compresses, caffeine-containing eye gels, and reducing salt intake can reduce puffiness."; 

    } 

    else if (input.includes("eye bags") || input.includes("baggy eyes")) { 

        reply = "Try topical firming eye products and sleep support; persistent bags may need professional evaluation."; 

    } 

    else if (input.includes("chapped lips") || input.includes("dry lips")) { 

        reply = "Use a nourishing lip balm and overnight occlusive (e.g., petroleum jelly); exfoliate gently then moisturize."; 

    } 

    else if (input.includes("sunburn") || input.includes("sun burn")) { 

        reply = "Cool compresses, gentle moisturizers, and SPF avoidance until healed; seek medical help for severe burns."; 

    } 

    else if (input.includes("tan") || input.includes("remove tan")) { 

        reply = "Use gentle exfoliation and brightening products (Vitamin C) and strict SPF to prevent re-tanning."; 

    } 

    else if (input.includes("post-acne marks") || input.includes("marks")) { 

        reply = "Brightening serums and consistent SPF lighten marks; consult a professional for advanced treatments."; 

    } 

    else if (input.includes("ingrown hair") || input.includes("ingrown")) { 

        reply = "Exfoliate gently, use antiseptic spot treatments, and avoid tight clothing; seek help for recurrent issues."; 

    } 

    else if (input.includes("razor burn") || input.includes("shaving burn")) { 

        reply = "Use soothing aftercare like an alcohol-free balm and adjust shaving technique; avoid fragranced products on irritated skin."; 

    } 

    else if (input.includes("body acne") || input.includes("back acne") || input.includes("bacne")) { 

        reply = "Use body wash with Salicylic or benzoyl ingredients, wear breathable fabrics, and exfoliate weekly."; 

    } 

    else if (input.includes("dandruff") || input.includes("flake") || input.includes("white flakes")) { 

        reply = "Use a medicated anti-dandruff shampoo and alternate with a gentle cleanser; consult a dermatologist if persistent."; 

    } 

    else if (input.includes("oily scalp") || input.includes("greasy scalp")) { 

        reply = "Use clarifying shampoo and avoid heavy oils at roots; use scalp serum only on problem areas."; 

    } 

    else if (input.includes("hair loss") || input.includes("thinning hair")) { 

        reply = "Consider scalp serum, nutritional support, and a gentle shampoo; see a specialist for severe or sudden loss."; 

    } 

    else if (input.includes("split ends") || input.includes("split end")) { 

        reply = "Trim regularly, use nourishing hair oil on ends, and avoid excessive heat styling."; 

    } 

    else if (input.includes("frizzy hair") || input.includes("frizz")) { 

        reply = "Apply a small amount of Hair Serum or Argan Hair Oil to damp hair and use a smoothing leave-in spray."; 

    } 

    else if (input.includes("heat damaged hair") || input.includes("heat damage")) { 

        reply = "Use protein or repair masks weekly, avoid heat tools and trim heavily damaged ends."; 

    } 

    else if (input.includes("hair breakage") || input.includes("broken hair")) { 

        reply = "Use strengthening masks, avoid tight hairstyles, and reduce heat and chemical treatments."; 

    } 

    else if (input.includes("dry scalp") || input.includes("dry flakes")) { 

        reply = "Use a hydrating scalp serum and gentle shampoo; avoid harsh sulfates that strip natural oils."; 

    } 

    else if (input.includes("itchy scalp") || input.includes("scalp itch")) { 

        reply = "Soothing scalp serums with anti-irritant ingredients can help; if persistent, see a dermatologist."; 

    } 

    else if (input.includes("flaky scalp") || input.includes("scalp flakes")) { 

        reply = "Use an anti-dandruff regimen and exfoliating scalp treatment to remove buildup."; 

    } 

    else if (input.includes("color fade") || input.includes("hair color fade")) { 

        reply = "Use color-safe shampoo, minimize heat, and apply conditioning treatments to protect color."; 

    } 

    else if (input.includes("hair shine") || input.includes("dull hair")) { 

        reply = "Use lightweight hair oil or serum on lengths and a clarifying wash occasionally for shine."; 

    } 

    else if (input.includes("scalp irritation") || input.includes("scalp sensitivity")) { 

        reply = "Switch to gentle, fragrance-free formulas and patch test new products; seek medical advice for severe reactions."; 

    } 

    else if (input.includes("brittle nails") || input.includes("nail break")) { 

        reply = "Use nail-strengthening treatments, keep nails trimmed, and protect hands with gloves during chores."; 

    } 

    else if (input.includes("yellow nails") || input.includes("stained nails")) { 

        reply = "Remove polish, use a gentle exfoliating scrub for nails, and apply strengthening base coat before color."; 

    } 

    else if (input.includes("nail peeling") || input.includes("peeling nails")) { 

        reply = "Keep nails moisturized, avoid prolonged water exposure, and consider a nail repair treatment."; 

    } 

    else if (input.includes("cracked heels") || input.includes("dry heels")) { 

        reply = "Use a thick occlusive foot cream nightly and gently file calluses; wear socks overnight for best absorption."; 

    } 

    else if (input.includes("foot odor") || input.includes("stinky feet")) { 

        reply = "Use antibacterial foot wash, keep feet dry and change socks often; wear breathable footwear."; 

    } 

    else if (input.includes("athlete's foot") || input.includes("fungal")) { 

        reply = "For suspected fungal infections seek medical treatment; use antifungal products only as directed by a professional."; 

    } 

    else if (input.includes("calluses") || input.includes("thick skin")) { 

        reply = "Soak feet, gently file callused areas, and apply a moisturizing foot cream daily."; 

    } 

    else if (input.includes("dry hands") || input.includes("hand dry")) { 

        reply = "Use a rich hand cream after washing and an overnight occlusive treatment when needed."; 

    } 

    else if (input.includes("eczema") || input.includes("eczema hands")) { 

        reply = "Use fragrance-free, barrier-repair moisturizers and consult a healthcare professional for flares."; 

    } 

    else if (input.includes("pregnancy safe") || input.includes("pregnant")) { 

        reply = "Choose gentle, fragrance-free products and consult your doctor about specific actives (retinol, high-dose acids)."; 

    } 

    else if (input.includes("teen acne") || input.includes("teenager")) { 

        reply = "Gentle Salicylic cleansers, spot treatments, and non-comedogenic moisturizers are good starting points for teens."; 

    } 

    else if (input.includes("adult acne")) { 

        reply = "Consider hormonal factors; combine Salicylic cleansers with targeted serums and see a dermatologist if needed."; 

    } 

    else if (input.includes("hormonal acne") || input.includes("hormonal breakouts")) { 

        reply = "Seek medical advice for hormonal acne; topical salicylic or benzoyl can help manage symptoms in the short term."; 

    } 

    else if (input.includes("cystic acne") || input.includes("deep pimples")) { 

        reply = "Cystic acne often requires medical treatments — consult a dermatologist for prescription options."; 

    } 

    else if (input.includes("t-zone") || input.includes("t zone")) { 

        reply = "Use balancing products: Salicylic on the T-zone and hydrating serums on dry cheeks for combination skin."; 

    } 

    else if (input.includes("nose blackheads") || input.includes("nose")) { 

        reply = "Clay masks and salicylic cleansers help nose blackheads; avoid harsh strips that can damage skin."; 

    } 

    else if (input.includes("exfoliate") || input.includes("exfoliation")) { 

        reply = "Use chemical exfoliants (AHA/BHA) 1–3x weekly depending on skin tolerance; don't overdo it."; 

    } 

    else if (input.includes("chemical exfoliation") || input.includes("aha") || input.includes("bha")) { 

        reply = "Start with low concentrations, patch test, and use sunscreen — avoid combining strong actives without guidance."; 

    } 

    else if (input.includes("physical scrub") || input.includes("scrub")) { 

        reply = "Use gentle physical exfoliants sparingly; prefer chemical exfoliation if you have acne-prone or sensitive skin."; 

    } 

    else if (input.includes("patch test") || input.includes("patch test")) { 

        reply = "Apply a small amount behind the ear or on the inner forearm for 24–48 hours to check for reactions before full use."; 

    } 

    else if (input.includes("layering products") || input.includes("how to layer")) { 

        reply = "Apply from thinnest to thickest consistency (serums before creams); apply sunscreen last in the morning."; 

    } 

    else if (input.includes("retinol sensitivity") || input.includes("retinol irritation")) { 

        reply = "Start retinol slowly (1–2x/week), use hydrating serums and reduce frequency if irritation occurs."; 

    } 

    else if (input.includes("reduce oiliness") || input.includes("control shine")) { 

        reply = "Use mattifying SPF, oil-control cleansers, and blotting papers for midday shine control."; 

    } 

    else if (input.includes("long lasting makeup") || input.includes("makeup longevity")) { 

        reply = "Use a primer and long-wear formulas; set with translucent powder in oily areas for extra hold."; 

    } 

    else if (input.includes("remove makeup") || input.includes("makeup removal")) { 

        reply = "Use an oil-based cleanser or micellar water first, then follow with a gentle facewash for a double-cleanse."; 

    } 

    else if (input.includes("makeup for acne")) { 

        reply = "Choose non-comedogenic, oil-free makeup and remove thoroughly nightly to avoid breakouts."; 

    } 

    else if (input.includes("sunscreen acne prone") || input.includes("spf for acne")) { 

        reply = "Look for non-comedogenic, mattifying SPF formulations specifically for acne-prone skin."; 

    } 

    else if (input.includes("spf for oily skin") || input.includes("matte spf")) { 

        reply = "Use a lightweight, matte-finish SPF to reduce shine while protecting your skin."; 

    } 

    else if (input.includes("spf for dry skin") || input.includes("hydrating spf")) { 

        reply = "Choose an SPF with hydrating ingredients or layer over a moisturizer for dry skin."; 

    } 

    else if (input.includes("spot treatment") || input.includes("pimple spot")) { 

        reply = "Use a targeted BHA or benzoyl peroxide spot treatment as directed and avoid over-drying the surrounding skin."; 

    } 

    else if (input.includes("night routine") || input.includes("evening routine")) { 

        reply = "Cleanse, treat with serums (retinol/repair), apply moisturizer and targeted eye care at night."; 

    } 

    else if (input.includes("morning routine") || input.includes("day routine")) { 

        reply = "Cleanse lightly, antioxidant serum (Vitamin C), lightweight moisturizer, and SPF to finish."; 

    } 

    else if (input.includes("moisturizer choice") || input.includes("which moisturizer")) { 

        reply = "Pick oil-free gel lotions for oily skin, rich creams for dry skin, and fragrance-free for sensitive skin."; 

    } 

    else if (input.includes("brightening serum") || input.includes("vitamin c")) { 

        reply = "Vitamin C serum in the morning helps with brightness; pair with SPF and avoid mixing with strong acids at once."; 

    } 

    else if (input.includes("hydration serum") || input.includes("hyaluronic")) { 

        reply = "Hyaluronic acid binds moisture—use on damp skin and seal with a moisturizer for best results."; 

    } 

    else if (input.includes("niacinamide") || input.includes("barrier repair")) { 

        reply = "Niacinamide supports the skin barrier, reduces redness and helps regulate oil production—great for many skin types."; 

    } 

    else if (input.includes("how to layer serums") || input.includes("serum order")) { 

        reply = "Layer thinnest to thickest: water-based serums (hyaluronic) before oil-based treatments and creams."; 

    } 

    else if (input.includes("mask for oily skin") || input.includes("clay mask")) { 

        reply = "Clay masks help absorb oil and clear pores—use 1x weekly on oily zones."; 

    } 

    else if (input.includes("mask for dry skin") || input.includes("hydrating mask")) { 

        reply = "Hydrating masks with glycerin or hyaluronic help restore moisture—use as needed."; 

    } 

    else if (input.includes("how often exfoliate") || input.includes("exfoliation frequency")) { 

        reply = "Exfoliate 1–3x weekly depending on product strength and your skin's tolerance."; 

    } 

    else if (input.includes("over exfoliation") || input.includes("too much exfoliation")) { 

        reply = "If irritated, stop exfoliating, use barrier-repair products, and allow skin to recover before resuming lightly."; 

    } 

    else if (input.includes("how to use retinol") || input.includes("use retinol")) { 

        reply = "Start slowly, use at night, pair with hydrating products and always apply SPF in the morning."; 

    } 

    else if (input.includes("pregnancy sunscreen") || input.includes("safe spf pregnancy")) { 

        reply = "Mineral (zinc/titanium) sunscreens are generally recommended in pregnancy—check with your healthcare provider."; 

    } 

    else if (input.includes("sensitive eyes remove makeup") || input.includes("eye makeup removal")) { 

        reply = "Use micellar water or a gentle eye makeup remover and avoid rubbing the delicate eye area."; 

    } 

    else if (input.includes("lip scrub") || input.includes("exfoliate lips")) { 

        reply = "Gently exfoliate with a soft scrub or cloth, then apply a nourishing balm to lock in moisture."; 

    } 

    else if (input.includes("reduce body odor") || input.includes("body smell")) { 

        reply = "Use an antibacterial body wash on problem areas and a suitable deodorant; keep clothes and footwear clean."; 

    } 

    else if (input.includes("travel skincare") || input.includes("travel tips skincare")) { 

        reply = "Pack travel sizes, include SPF and hydrating serum, and avoid introducing strong actives while traveling."; 

    } 

  

    // Additional 500 concise problem→solution responses (to the point) 

    else if (input.includes("melasma") || input.includes("pregnancy spots")) { 

        reply = "Use sunscreen diligently and consider azelaic acid or consult a dermatologist for melasma-safe treatments."; 

    } 

    else if (input.includes("post inflammatory hyperpigmentation") || input.includes("pih")) { 

        reply = "Brightening serums (Vitamin C, Niacinamide) and SPF reduce PIH over time; avoid picking."; 

    } 

    else if (input.includes("brown spots face") || input.includes("age spots face")) { 

        reply = "Use brightening actives and daily SPF; professional options include peels or laser for stubborn spots."; 

    } 

    else if (input.includes("dark knuckles") || input.includes("dark elbows")) { 

        reply = "Gentle exfoliation, brightening creams, and moisturization help lighten darkened areas over time."; 

    } 

    else if (input.includes("milia") || input.includes("small white bumps")) { 

        reply = "See a skincare professional for safe extraction and use gentle exfoliation; avoid picking."; 

    } 

    else if (input.includes("keratosis pilaris") || input.includes("kp")) { 

        reply = "Use gentle exfoliation and urea or lactic acid creams to smooth bumps; be consistent for best results."; 

    } 

    else if (input.includes("perioral dermatitis")) { 

        reply = "Avoid potent topical steroids and fragrances; consult a healthcare provider for targeted treatment."; 

    } 

    else if (input.includes("broken capillaries") || input.includes("spider veins")) { 

        reply = "Limit sun exposure, use gentle skincare, and consult a professional for vascular treatments if desired."; 

    } 

    else if (input.includes("mole changes") || input.includes("mole check")) { 

        reply = "Any changing mole should be examined by a dermatologist promptly—don't self-diagnose."; 

    } 

    else if (input.includes("fungal acne") || input.includes("malassezia")) { 

        reply = "Use anti-fungal cleansers and avoid heavy oils that can feed fungal acne; consult a dermatologist if unsure."; 

    } 

    else if (input.includes("scaly patches") || input.includes("psoriasis")) { 

        reply = "Use gentle, soothing treatments and consult a dermatologist for psoriasis-specific therapy."; 

    } 

    else if (input.includes("hives") || input.includes("urticaria")) { 

        reply = "Hives may reflect an allergic reaction—seek medical advice if widespread or severe; antihistamines help short-term."; 

    } 

    else if (input.includes("dry patches") || input.includes("patchy dry skin")) { 

        reply = "Use fragrance-free emollients and avoid hot showers; apply moisturizer to slightly damp skin."; 

    } 

    else if (input.includes("oily t zone") || input.includes("oily cheeks")) { 

        reply = "Treat zones differently: mattify T-zone with lightweight products and hydrate dry areas with hyaluronic serum."; 

    } 

    else if (input.includes("mattifying products") || input.includes("reduce shine")) { 

        reply = "Use mattifying primer, oil-control SPF, and blotting papers for short term shine control."; 

    } 

    else if (input.includes("pore vacuum")) { 

        reply = "Use BHA and clay masks rather than aggressive vacuums which can damage skin; consult a pro for extractions."; 

    } 

    else if (input.includes("forehead acne") || input.includes("temple breakouts")) { 

        reply = "Check hair products and headwear for occlusion; use Salicylic Facewash on affected areas."; 

    } 

    else if (input.includes("cheek acne") || input.includes("chin acne")) { 

        reply = "Adjust pillowcase hygiene, avoid touching face, and use targeted treatments per acne type."; 

    } 

    else if (input.includes("back whiteheads") || input.includes("back acne treatment")) { 

        reply = "Use a BHA body wash and exfoliate gently; wear breathable fabrics and rinse sweat after workouts."; 

    } 

    else if (input.includes("clogged pores back") || input.includes("back congestion")) { 

        reply = "Regular BHA washes and exfoliation, plus loose clothing, help prevent back congestion."; 

    } 

    else if (input.includes("chemical peel at home") || input.includes("home peel")) { 

        reply = "Start with low-strength peels, follow instructions, and avoid sun exposure immediately after."; 

    } 

    else if (input.includes("professional peel") || input.includes("clinic peel")) { 

        reply = "Professional peels deliver stronger results—consult a trained clinician to choose the right peel for your skin."; 

    } 

    else if (input.includes("laser treatment")) { 

        reply = "Lasers can treat pigmentation and scarring—book a consultation with a certified dermatologist or clinic first."; 

    } 

    else if (input.includes("microneedling")) { 

        reply = "Microneedling helps texture and scarring—seek a professional and avoid active acids immediately after."; 

    } 

    else if (input.includes("hydrafacial")) { 

        reply = "Hydrafacials exfoliate and hydrate; check with your aesthetician whether your skin type is suitable."; 

    } 

    else if (input.includes("oral supplements skin") || input.includes("supplements for skin")) { 

        reply = "Supplements like omega-3s and vitamin D can support skin health—check with your doctor before starting new supplements."; 

    } 

    else if (input.includes("collagen supplements")) { 

        reply = "Some people notice benefits from collagen supplements; pair with Vitamin C for synthesis, and manage expectations."; 

    } 

    else if (input.includes("zinc for acne") || input.includes("zinc supplements")) { 

        reply = "Oral zinc can help some acne cases—consult a doctor for appropriate dosing and suitability."; 

    } 

    else if (input.includes("deodorant irritation") || input.includes("deodorant rash")) { 

        reply = "Switch to fragrance-free or sensitive formulas and allow skin to recover; consult if persistent."; 

    } 

    else if (input.includes("underarm dark")) { 

        reply = "Avoid harsh shaving, use gentle exfoliation and brightening ingredients; see a dermatologist for stubborn cases."; 

    } 

    else if (input.includes("ingrown leg hair") || input.includes("ingrown shaving")) { 

        reply = "Exfoliate gently, use antiseptic treatments and consider alternative hair removal methods if recurrent."; 

    } 

    else if (input.includes("waxing care") || input.includes("post waxing")) { 

        reply = "Use soothing, fragrance-free post-wax care and avoid hot baths and tight clothing immediately after."; 

    } 

    else if (input.includes("epilator issues") || input.includes("epilator bumps")) { 

        reply = "Exfoliate regularly, avoid overuse, and use soothing aftercare to minimize bumps after epilation."; 

    } 

    else if (input.includes("laser hair removal advice") || input.includes("permanent hair reduction")) { 

        reply = "Laser works best on dark hair with light skin—book a consultation and follow pre/post-care instructions closely."; 

    } 

    else if (input.includes("post laser care") || input.includes("after laser")) { 

        reply = "Use gentle cleansers, avoid sun, and follow your clinician's aftercare for optimal healing."; 

    } 

    else if (input.includes("stretch marks") || input.includes("striae")) { 

        reply = "Topical retinoids (postpartum avoided in pregnancy) and moisturizers help; professional modalities can reduce appearance."; 

    } 

    else if (input.includes("cellulite help") || input.includes("reduce cellulite")) { 

        reply = "Topicals and massage can improve appearance slightly; for bigger change consult a clinician about treatments."; 

    } 

    else if (input.includes("scent layering tips") || input.includes("how to layer scents")) { 

        reply = "Layer lighter mists first, then stronger perfumes; test the combo before you commit to daily use."; 

    } 

    else if (input.includes("perfume longevity tips") || input.includes("make perfume last")) { 

        reply = "Apply on moisturized skin, pulse points, and consider a matching unscented moisturizer to hold the fragrance."; 

    } 

    else if (input.includes("attars vs eau de parfum")) { 

        reply = "Attars are oil-based and long-lasting; EDPs are alcohol-based with varying longevity—choose per preference."; 

    } 

    else if (input.includes("perfume allergies") || input.includes("fragrance sensitivity")) { 

        reply = "Opt for fragrance-free or hypoallergenic options and patch test before using new scents widely."; 

    } 

    else if (input.includes("roller perfume use") || input.includes("how to use roller")) { 

        reply = "Roll on pulse points and dab rather than rub to preserve fragrance notes."; 

    } 

    else if (input.includes("apply attar") || input.includes("how to use attar")) { 

        reply = "Apply a tiny dab to pulse points—attars are concentrated so a little goes a long way."; 

    } 

    else if (input.includes("sample a fragrance") || input.includes("try perfume sample")) { 

        reply = "Try a 2ml sample on your skin and wear it for several hours to understand its dry-down before buying."; 

    } 

    else if (input.includes("scent for office") || input.includes("work friendly scent")) { 

        reply = "Pick subtle, clean scents with low projection and avoid overpowering notes in shared spaces."; 

    } 

    else if (input.includes("fragrance for dates") || input.includes("date night scent")) { 

        reply = "Choose a scent that makes you feel confident—warm, comforting notes work well for evenings."; 

    } 

    else if (input.includes("fragrance layering with lotion") || input.includes("lotion under perfume")) { 

        reply = "Use an unscented or matching-scent lotion under perfume to extend wear without clashing notes."; 

    } 

    else if (input.includes("scent storing tips") || input.includes("store perfume")) { 

        reply = "Store in a cool, dark place to prevent fragrance degradation—avoid direct sunlight and temperature swings."; 

    } 

    else if (input.includes("how to read ingredient list") || input.includes("read ingredients")) { 

        reply = "Ingredients are listed by concentration—if you have allergies look for common allergens and patch test new products."; 

    } 

    else if (input.includes("fragrance free moisturizer") || input.includes("sensitive moisturizer")) { 

        reply = "Pick labeled fragrance-free, minimal-ingredient moisturizers for sensitive or reactive skin."; 

    } 

    else if (input.includes("minimal routine") || input.includes("simple skincare")) { 

        reply = "Cleanse, hydrate (hyaluronic), moisturize and SPF in the morning—keep actives to a minimum for simplicity."; 

    } 

    else if (input.includes("alphabet skincare steps") || input.includes("order of skincare")) { 

        reply = "Use thinnest-to-thickest ordering: toner/essence, serums, oils, creams, sunscreen last in the morning."; 

    } 

    else if (input.includes("dry winter skin") || input.includes("winter skincare")) { 

        reply = "Switch to richer moisturizers, use humidifiers, and protect skin from harsh winds and hot showers."; 

    } 

    else if (input.includes("sweaty summer skin") || input.includes("summer acne")) { 

        reply = "Use lightweight, non-comedogenic products and reapply sunscreen; cleanse sweat off promptly after exercise."; 

    } 

    else if (input.includes("spf reapplication tips") || input.includes("reapply spf")) { 

        reply = "Reapply SPF every 2 hours when in the sun, and after swimming or heavy sweating for full protection."; 

    } 

    else if (input.includes("makeup under spf") || input.includes("can i wear makeup over spf")) { 

        reply = "Apply SPF first, let it set for a minute, then apply makeup—use a powder SPF touch-up if needed."; 

    } 

    else if (input.includes("chemical sunscreen")) { 

        reply = "Chemical SPFs absorb UV and are cosmetically elegant—choose one that suits your skin type and patch test if sensitive."; 

    } 

    else if (input.includes("physical sunscreen") || input.includes("mineral spf")) { 

        reply = "Mineral sunscreens use zinc/titanium and are often better tolerated by sensitive skin and pregnancy-safe—check texture preferences."; 

    } 

    else if (input.includes("sunscreen white cast") || input.includes("white cast")) { 

        reply = "Try newer mineral formulas or tinted SPFs that reduce white cast; test before full-day use."; 

    } 

    else if (input.includes("how to choose spf")) { 

        reply = "Pick broad-spectrum SPF 30+ for daily use; increase for extended outdoor time and choose texture per skin type."; 

    } 

    else if (input.includes("sunscreen for oily acne prone")) { 

        reply = "Use a gel or fluid, non-comedogenic SPF designed to control oil and minimize shine."; 

    } 

    else if (input.includes("sunscreen for dry skin") || input.includes("hydrating sunscreen")) { 

        reply = "Use an SPF with moisturizing ingredients or layer a hydrating serum underneath for extra comfort."; 

    } 

    else if (input.includes("how to pick cleanser")) { 

        reply = "Match cleanser to skin type: gentle gel for oily, creamy for dry, and fragrance-free for sensitive skin."; 

    } 

    else if (input.includes("double cleanse")) { 

        reply = "Use an oil-based cleanser to remove makeup and sunscreen first, then a gentle water-based cleanser to finish."; 

    } 

    else if (input.includes("makeup removing oils")) { 

        reply = "Oil cleansers dissolve makeup effectively—follow with a second gentle cleanse to ensure no residue remains."; 

    } 

    else if (input.includes("face oil use") || input.includes("how to use face oil")) { 

        reply = "Apply face oil after lotions or mix a few drops into moisturizer; use sparingly for oily skin."; 

    } 

    else if (input.includes("do i need toner")) { 

        reply = "Toners can add hydration or deliver actives; choose one suited to your concern or skip if not needed."; 

    } 

    else if (input.includes("vitamin c how to use")) { 

        reply = "Use Vitamin C in the morning after cleansing and before moisturizer and SPF to help with brightness."; 

    } 

    else if (input.includes("how to store serums")) { 

        reply = "Store serums according to label—some (Vitamin C) prefer cool, dark places to extend shelf life."; 

    } 

    else if (input.includes("product expiration")) { 

        reply = "Check batch code and PAO symbol; discard products past expiry or if smell/texture changes significantly."; 

    } 

    else if (input.includes("open jar symbol")) { 

        reply = "The PAO (open jar) icon shows recommended months of safe use after opening—follow it for product safety."; 

    } 

    else if (input.includes("how to check authenticity")) { 

        reply = "Check packaging details, batch codes, and buy from authorized retailers; contact support if you suspect inauthentic products."; 

    } 

    else if (input.includes("how to request sample")) { 

        reply = "Contact support or check product pages—sample availability varies and is often limited by promotion."; 

    } 

    else if (input.includes("sensitive scalp products") || input.includes("scalp sensitivity")) { 

        reply = "Use fragrance-free, gentle scalp serums and avoid harsh scrubbers; consult a trichologist if needed."; 

    } 

    else if (input.includes("postpartum hair loss") || input.includes("hair after baby")) { 

        reply = "Postpartum hair shedding is common; use gentle handling and targeted scalp care; it often resolves in time."; 

    } 

    else if (input.includes("menopause skin changes") || input.includes("menopause skin")) { 

        reply = "Increase barrier support, use richer moisturizers and discuss hormone-related changes with your clinician."; 

    } 

    else if (input.includes("hair growth tips") || input.includes("how to grow hair")) { 

        reply = "Optimize nutrition, reduce heat and stress, and use strengthening treatments—see a specialist for pronounced loss."; 

    } 

    else if (input.includes("beard care tips") || input.includes("beard softening")) { 

        reply = "Use beard oil, comb regularly, and keep skin underneath clean to soften and maintain beard health."; 

    } 

    else if (input.includes("postpartum skincare") || input.includes("skincare after pregnancy")) { 

        reply = "Stick to gentle, fragrance-free routines and check with your clinician about strong actives if breastfeeding."; 

    } 

    else if (input.includes("breastfeeding skincare")) { 

        reply = "Avoid high-dose retinoids and check safety of any strong actives with your doctor when breastfeeding."; 

    } 

    else if (input.includes("pregnancy safe retinol alternatives") || input.includes("retinol alternative pregnancy")) { 

        reply = "Consider bakuchiol or azelaic acid as gentler alternatives and consult your clinician for suitability during pregnancy."; 

    } 

    else if (input.includes("how to choose baby products") || input.includes("baby skincare")) { 

        reply = "Choose mild, fragrance-free, pediatrician-tested products; patch test and avoid adult actives on babies."; 

    } 

    else if (input.includes("diaper rash")) { 

        reply = "Keep the area dry, change frequently, use barrier creams and consult a pediatrician for persistent rashes."; 

    } 

    else if (input.includes("how to treat blisters") || input.includes("blister care")) { 

        reply = "Keep the area clean, protect with blister pads, and seek medical advice for large or infected blisters."; 

    } 

    else if (input.includes("how to treat cuts")) { 

        reply = "Clean with gentle soap, apply antiseptic and a sterile dressing; seek medical care for deep or bleeding wounds."; 

    } 

    else if (input.includes("itchy skin at night") || input.includes("night itch")) { 

        reply = "Use fragrance-free moisturizer at night and avoid irritants; consult a doctor if itching is severe or persistent."; 

    } 

    else if (input.includes("how to treat allergic reaction") || input.includes("allergic skin reaction")) { 

        reply = "Stop the suspected product, use cool compress, and seek medical care for severe reactions or breathing difficulty."; 

    } 

    else if (input.includes("how to remove false lashes") || input.includes("remove lash extensions")) { 

        reply = "Use a gentle remover recommended by your technician and avoid pulling at extensions to protect your natural lashes."; 

    } 

    else if (input.includes("lash care after extensions") || input.includes("after lash extensions")) { 

        reply = "Avoid oil-based removers, brush gently, and follow technician aftercare for best longevity."; 

    } 

    else if (input.includes("brow shaping care") || input.includes("after waxing brows")) { 

        reply = "Soothe with a cold compress and avoid heavy eyebrow makeup for 24 hours after shaping to prevent irritation."; 

    } 

    else if (input.includes("microblading aftercare") || input.includes("after microblading")) { 

        reply = "Follow technician aftercare, keep the area clean and avoid soaking until healed for best results."; 

    } 

    else if (input.includes("how to remove tinting")) { 

        reply = "Tint fades with time; seek a salon for safe removal if immediate correction is needed."; 

    } 

    else if (input.includes("how to choose makeup for mature skin") || input.includes("makeup mature skin")) { 

        reply = "Use hydrating primers, lightweight foundations and avoid heavy powders that settle into lines."; 

    } 

    else if (input.includes("how to conceal blemishes") || input.includes("cover acne with makeup")) { 

        reply = "Use non-comedogenic concealers and blend gently after applying a primer; remove makeup fully at night."; 

    } 

    else if (input.includes("how to make lipstick last") || input.includes("long lasting lipstick")) { 

        reply = "Prepare lips with balm, use a lip liner, layer lipstick, and blot with tissue for longer wear."; 

    } 

    else if (input.includes("sensitive eyes mascara")) { 

        reply = "Use ophthalmologist-tested mascara formulated for sensitive eyes and remove gently nightly."; 

    } 

    else if (input.includes("contact lens makeup tips") || input.includes("contacts and makeup")) { 

        reply = "Insert lenses before makeup and remove them after; avoid oily eye products that can transfer to lenses."; 

    } 

    else if (input.includes("how to remove waterproof makeup") || input.includes("remove waterproof")) { 

        reply = "Use oil-based removers or micellar oils designed to dissolve waterproof formulas—be gentle around the eyes."; 

    } 

    else if (input.includes("how to choose foundation shade") || input.includes("match foundation")) { 

        reply = "Test on jawline in natural light and choose a shade that disappears into your skin when blended."; 

    } 

    else if (input.includes("how to finish makeup") || input.includes("finish makeup look")) { 

        reply = "Set in targeted areas only; use a light setting spray and avoid over-powdering dry or mature skin."; 

    } 

    else if (input.includes("how to reduce pores makeup") || input.includes("minimize pores makeup")) { 

        reply = "Use a pore-minimizing primer and apply foundation with a damp sponge for a smoother finish."; 

    } 

    else if (input.includes("how to clean makeup brushes") || input.includes("clean brushes")) { 

        reply = "Clean brushes weekly with gentle brush cleaner or mild shampoo and air-dry flat to prevent bacterial buildup."; 

    } 

    else if (input.includes("how often change pillowcase") || input.includes("pillowcase hygiene")) { 

        reply = "Change pillowcases at least weekly to reduce oil and bacteria transfer to skin and hair."; 

    } 

    else if (input.includes("post workout skin care") || input.includes("workout skincare")) { 

        reply = "Rinse sweat off after exercise and use a gentle cleanser to prevent clogged pores from sweat and oil."; 

    } 

    else if (input.includes("how to handle eczema flare") || input.includes("eczema flare")) { 

        reply = "Use prescribed topical treatments, fragrance-free emollients and avoid hot showers; seek medical advice for severe flares."; 

    } 

    else if (input.includes("how to manage psoriasis") || input.includes("psoriasis flares")) { 

        reply = "Follow your dermatologist's treatment plan; gentle skin care and prescribed topicals help manage flares."; 

    } 

    else if (input.includes("how to treat seborrheic dermatitis") || input.includes("seb derm")) { 

        reply = "Use medicated anti-dandruff shampoos and consult your dermatologist for persistent cases."; 

    } 

    else if (input.includes("how to get rid of milia") || input.includes("milia removal")) { 

        reply = "A professional extraction is safest; use gentle retinoids to prevent new milium cysts if suitable."; 

    } 

    else if (input.includes("how to reduce pore oiliness") || input.includes("control pore oil")) { 

        reply = "Use BHA and lightweight moisturizers; avoid heavy creams in pore-prone areas."; 

    } 

    else if (input.includes("how to use azelaic acid") || input.includes("azelaic how to use")) { 

        reply = "Azelaic acid helps pigmentation and acne—use as directed and patch test; it's often suitable for sensitive skin."; 

    } 

    else if (input.includes("how to use tranexamic acid") || input.includes("tranexamic for spots")) { 

        reply = "Tranexamic acid can help stubborn pigmentation—combine with SPF and consult a professional for layered routines."; 

    } 

    else if (input.includes("how to combine niacinamide and vitamin c") || input.includes("niacinamide vit c")) { 

        reply = "They're generally compatible; apply Vitamin C first then Niacinamide or use time-separated routines if sensitive."; 

    } 

    else if (input.includes("how to use benzoyl peroxide") || input.includes("benzoyl how to")) { 

        reply = "Use as a spot or overall treatment per directions, start low frequency to prevent dryness and use SPF in the day."; 

    } 

    else if (input.includes("how to use salicylic acid body") || input.includes("body bha")) { 

        reply = "Use salicylic body washes or lotions to address body acne and follicular issues, and limit frequency if dry."; 

    } 

    else if (input.includes("how to stop product pilling") || input.includes("product pilling")) { 

        reply = "Reduce product layers, allow each to absorb fully, and avoid heavy silicones that can pill when layered."; 

    } 

    else if (input.includes("texture after acid") || input.includes("skin texture")) { 

        reply = "Be consistent with gentle exfoliation and moisturizing—professional treatments like microneedling can help persistent texture."; 

    } 

    else if (input.includes("how to fix over exfoliation") || input.includes("recovery from over exfoliation")) { 

        reply = "Stop exfoliants, use barrier-repair creams with ceramides and give skin time to recover before reintroducing actives."; 

    } 

    else if (input.includes("how to choose a moisturizer for acne")) { 

        reply = "Pick non-comedogenic, oil-free, and lightweight formulations to hydrate without clogging pores."; 

    } 

    else if (input.includes("how to choose anti aging products") || input.includes("anti aging guide")) { 

        reply = "Look for retinoids, peptides and antioxidants, plus daily SPF to protect against UV-driven aging."; 

    } 

    else if (input.includes("scent layering with attar") || input.includes("attar layering")) { 

        reply = "Layer attar with subtle matching notes and test on skin to ensure the blend remains pleasant over time."; 

    } 

    else if (input.includes("how to store attars") || input.includes("attars storage")) { 

        reply = "Keep attars cool and away from sunlight—oil-based scents are stable but benefit from dark storage."; 

    } 

    else if (input.includes("how to thin perfume")) { 

        reply = "Dilution is complex; consult a perfumer if you need to adjust intensity rather than applying less."; 

    } 

    else if (input.includes("how to choose perfume for wedding") || input.includes("wedding perfume")) { 

        reply = "Pick a scent you love that evokes the mood you want—test it with your dress and on your skin in advance."; 

    } 

    else if (input.includes("how to support skin barrier") || input.includes("barrier support")) { 

        reply = "Use ceramide-rich moisturizers, avoid over-exfoliating and maintain gentle cleansing to support your barrier."; 

    } 

    else if (input.includes("how to reduce inflammation skin") || input.includes("reduce skin inflammation")) { 

        reply = "Use soothing ingredients (niacinamide, aloe) and avoid irritants; consult a dermatologist for persistent inflammation."; 

    } 

    else if (input.includes("how to choose a serum for oily skin")) { 

        reply = "Choose lightweight serums like hyaluronic in gel form or niacinamide-based treatments that regulate oil."; 

    } 

    else if (input.includes("how to choose a serum for dry skin")) { 

        reply = "Pick concentrated hydrating serums containing hyaluronic acid, glycerin or ceramides to boost moisture."; 

    } 

    else if (input.includes("how to choose hair oil for dry hair")) { 

        reply = "Use heavier oils like argan or coconut on lengths and ends, and avoid applying near the roots."; 

    } 

    else if (input.includes("how to use hair mask") || input.includes("hair mask frequency")) { 

        reply = "Use a nourishing hair mask once weekly or as needed depending on dryness and damage level."; 

    } 

    else if (input.includes("how to treat post colour care") || input.includes("color care")) { 

        reply = "Use color-safe shampoos, cool water, and weekly conditioning treatments to protect color and moisture."; 

    } 

    else if (input.includes("how to pick conditioner")) { 

        reply = "Pick a conditioner matched to your hair concern: volume, hydration, or repairing formulas as needed."; 

    } 

    else if (input.includes("how to treat brittle hair") || input.includes("brittle hair fix")) { 

        reply = "Use strengthening treatments, reduce heat styling, and ensure adequate protein and moisture balance."; 

    } 

    else if (input.includes("how to treat split ends quickly") || input.includes("split end fix")) { 

        reply = "Trim split ends and use nourishing oils on lengths to temporarily improve appearance; prevention is key."; 

    } 

    else if (input.includes("scalp detox") || input.includes("clarifying scalp")) { 

        reply = "Use clarifying shampoos occasionally and a gentle scalp exfoliant to remove buildup—don't overuse."; 

    } 

    else if (input.includes("how to stop scalp oiliness") || input.includes("reduce scalp oil")) { 

        reply = "Use a gentle clarifying shampoo, avoid heavy conditioners at the root, and rinse well after treatments."; 

    } 

    else if (input.includes("how to make hair thicker") || input.includes("increase hair volume")) { 

        reply = "Use volumizing products, avoid heavy oils at roots, and consider targeted topical treatments for thinning."; 

    } 

    else if (input.includes("how to reduce dandruff naturally") || input.includes("natural dandruff")) { 

        reply = "Tea tree or zinc formulations can help mild dandruff; consult a dermatologist for moderate or severe cases."; 

    } 

    else if (input.includes("how to remove hair dye stains") || input.includes("dye stain removal")) { 

        reply = "Use gentle stain removers or oil-based cleansers; act promptly and test on a small area first."; 

    } 

    else if (input.includes("how to protect hair from chlorine") || input.includes("swimming hair care")) { 

        reply = "Wet and rinse hair before swimming, use a swim cap or apply a leave-in oil to minimize chlorine uptake."; 

    } 

    else if (input.includes("how to treat scalp acne") || input.includes("scalp pimples")) { 

        reply = "Use medicated scalp cleansers and avoid pore-clogging products at the scalp—consult a dermatologist if persistent."; 

    } 

    else if (input.includes("how to treat itchy scalp after dye") || input.includes("itch after dye")) { 

        reply = "Rinse thoroughly, use soothing post-dye care and seek medical help if symptoms are severe or allergic."; 

    } 

    else if (input.includes("what is non comedogenic")) { 

        reply = "Non-comedogenic products are formulated to not block pores—good for acne-prone skin."; 

    } 

    else if (input.includes("what is fragrance free")) { 

        reply = "Fragrance-free means no added fragrances; it's preferable for sensitive or reactive skin."; 

    } 

    else if (input.includes("what is hypoallergenic")) { 

        reply = "Hypoallergenic suggests lower likelihood of allergic reaction but isn't a guarantee—patch test if concerned."; 

    } 

    else if (input.includes("how to pick body lotion")) { 

        reply = "Choose thicker creams for dry skin and light lotions for normal to oily skin; use ceramides for barrier support."; 

    } 

    else if (input.includes("how to pick deodorant for sensitive")) { 

        reply = "Choose fragrance-free, alcohol-free options and consider crystal or aluminum-free formulas if irritation occurs."; 

    } 

    else if (input.includes("how to stop underarm staining")) { 

        reply = "Switch to a non-staining deodorant, avoid strong bleaching at home and consult a dermatologist for persistent discoloration."; 

    } 

    else if (input.includes("how to apply antiperspirant properly") || input.includes("how to apply deodorant")) { 

        reply = "Apply to clean, dry underarms—antiperspirants are best overnight for maximal efficacy."; 

    } 

    else if (input.includes("how to prevent razor bumps")) { 

        reply = "Shave with light strokes, use a sharp blade, apply soothing aftercare and consider switching to electric grooming if recurrent."; 

    } 

    else if (input.includes("how to treat razor bumps at home") || input.includes("treat razor bumps")) { 

        reply = "Use antiseptic and anti-inflammatory care, avoid picking and apply exfoliant once healed to prevent recurrence."; 

    } 

    else if (input.includes("what is ph balanced cleanser") || input.includes("ph balanced")) { 

        reply = "pH-balanced cleansers are formulated close to the skin's natural pH to preserve the barrier—good for sensitive skin."; 

    } 

    else if (input.includes("what is occlusive moisturizer") || input.includes("occlusive")) { 

        reply = "Occlusives (like petrolatum) lock moisture in—use at night for dry, compromised skin to prevent water loss."; 

    } 

    else if (input.includes("what is humectant") || input.includes("humectant")) { 

        reply = "Humectants (hyaluronic acid, glycerin) attract water to the skin—use them with occlusives or emollients for best effect."; 

    } 

    else if (input.includes("what is emollient") || input.includes("emollient")) { 

        reply = "Emollients smooth and soften skin—often found in creams and lotions to improve texture and comfort."; 

    } 

    else if (input.includes("how to pick cleanser for sensitive eyes") || input.includes("eye safe cleanser")) { 

        reply = "Use ophthalmologist-tested, fragrance-free eye cleansers and avoid rubbing the eye area vigorously."; 

    } 

    else if (input.includes("how to treat cold sores") || input.includes("herpes labialis")) { 

        reply = "Use antiviral treatments at first tingle and consult a healthcare provider for severe or frequent outbreaks."; 

    } 

    else if (input.includes("how to treat acne around nose") || input.includes("nose acne")) { 

        reply = "Use targeted BHA and avoid overloading with heavy creams around the nose area."; 

    } 

    else if (input.includes("how to treat hormonal breakouts") || input.includes("hormonal pimples")) { 

        reply = "Consult a healthcare professional for hormonal acne options; topical treatments help manage symptoms."; 

    } 

    else if (input.includes("how to stop cystic acne at home") || input.includes("home cystic acne")) { 

        reply = "Seek medical advice for cystic acne—avoid squeezing and use gentle adjunctive care while awaiting professional treatment."; 

    } 

    else if (input.includes("how to treat whiteheads at home") || input.includes("home whitehead treatment")) { 

        reply = "Use gentle BHA and avoid picking; consistent care reduces whiteheads over time."; 

    } 

    else if (input.includes("how to treat blackheads at home") || input.includes("remove blackheads")) { 

        reply = "Use salicylic acid, clay masks, and professional extraction when needed—avoid harsh pore strips that damage skin."; 

    } 

    else if (input.includes("how to keep skin hydrated during flights") || input.includes("flight skincare")) { 

        reply = "Hydrate with spritzes, use hydrating serums, avoid alcohol/caffeine excess and drink water during flights."; 

    } 
    // Default fallback
    return reply;
}

// 4. Event Listener for the "Enter" key
document.addEventListener("DOMContentLoaded", function() {
    const inputField = document.getElementById('chat-input');
    if(inputField) {
        inputField.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                sendMessage();
            }
        });
    }
});

// 5. Event Listener to close chat when clicking outside
document.addEventListener('click', function(event) {
    const chatWindow = document.getElementById('chat-window');
    const chatToggle = document.getElementById('chat-toggle');
    if (chatWindow && chatWindow.style.display === 'flex' && !chatWindow.contains(event.target) && !chatToggle.contains(event.target)) {
        chatWindow.style.display = 'none';
    }
});