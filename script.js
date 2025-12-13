// إضافة رأي جديد
function addReview() {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let product = document.getElementById("product").value.trim();
    let review = document.getElementById("review").value.trim();

    if (!name || !email||  !product || !review) {
        alert("أكمل كل البيانات");
        return;
    }

    let reviews = JSON.parse(localStorage.getItem("reviews") || "[]");

    reviews.push({
        id: Date.now(),
        name,
        email,
        product,
        review
    });

    localStorage.setItem("reviews", JSON.stringify(reviews));
    alert("تم إضافة رأيك!");
}



// عرض الآراء حسب المنتج
function showReviews() {
    let product = document.getElementById("searchProduct").value.trim();
    let reviews = JSON.parse(localStorage.getItem("reviews") || "[]");

    let filtered = reviews.filter(r => r.product === product);

    let html = "";

    filtered.forEach(r => {
        html += `
            <div class="card">
                <b>${r.name}</b><br>
                ${r.review}<br>
                <small>${r.email}</small><br><br>

                <button class="btn-small" onclick="editReview(${r.id})">تعديل</button>
                <button class="btn-small" onclick="deleteReview(${r.id})">حذف</button>
            </div>
        `;
    });

    document.getElementById("reviews").innerHTML = html;
}



// تعديل رأي (بالحماية)
function editReview(id) {
    let currentName = document.getElementById("name").value.trim();
    let currentEmail = document.getElementById("email").value.trim();

    let reviews = JSON.parse(localStorage.getItem("reviews") || "[]");
    let r = reviews.find(x => x.id === id);

    // حماية: لازم نفس الاسم والإيميل
    if (r.name !== currentName || r.email !== currentEmail) {
        alert("❌ لا يمكنك التعديل — الاسم أو الإيميل غير مطابق!");
        return;
    }

    let newReview = prompt("اكتب رأيك الجديد:", r.review);

    if (newReview) {
        r.review = newReview;
        localStorage.setItem("reviews", JSON.stringify(reviews));
        alert("تم التعديل!");
        showReviews();
    }
}



// حذف رأي (بالحماية)
function deleteReview(id) {
    let currentName = document.getElementById("name").value.trim();
    let currentEmail = document.getElementById("email").value.trim();

    let reviews = JSON.parse(localStorage.getItem("reviews") || "[]");
    let r = reviews.find(x => x.id === id);

    // حماية: لازم نفس الاسم والإيميل
    if (r.name !== currentName || r.email !== currentEmail) {
        alert("❌ لا يمكنك الحذف — الاسم أو الإيميل غير مطابق!");
        return;
    }

    let updated = reviews.filter(x => x.id !== id);

    localStorage.setItem("reviews", JSON.stringify(updated));
    alert("تم الحذف!");
    showReviews();
}
