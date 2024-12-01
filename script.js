document.addEventListener("DOMContentLoaded", function () {
    const infoForm = document.getElementById('info-form');
    const infoList = document.getElementById('info-list');
    const infoContainer = document.getElementById('info-container');

    // Menampilkan informasi yang tersimpan di index.html
    function displayInfoInIndex() {
        const storedInfoList = JSON.parse(localStorage.getItem('infoList')) || [];
        infoContainer.innerHTML = '';
        storedInfoList.forEach((info) => {
            const infoItem = document.createElement('div');
            infoItem.className = 'info-item';
            infoItem.textContent = info.text;
            infoContainer.appendChild(infoItem);
        });
    }

    // Menampilkan informasi yang tersimpan di add-info.html
    function displayInfoInAdd() {
        const storedInfoList = JSON.parse(localStorage.getItem('infoList')) || [];
        infoList.innerHTML = '';
        storedInfoList.forEach((info, index) => {
            const infoItem = document.createElement('div');
            infoItem.className = 'info-item';
            infoItem.textContent = info.text;

            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-button';
            deleteButton.textContent = 'Hapus';
            deleteButton.onclick = function () {
                deleteInfo(index);
            };

            infoItem.appendChild(deleteButton);
            infoList.appendChild(infoItem);
        });
    }

    // Menangani penambahan informasi
    if (infoForm) {
        infoForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const infoInput =document.getElementById('info').value;
            const storedInfoList = JSON.parse(localStorage.getItem('infoList')) || [];
            storedInfoList.push({ id: Date.now(), text: infoInput }); // Menyimpan informasi dengan ID unik
            localStorage.setItem('infoList', JSON.stringify(storedInfoList));
            infoForm.reset();
            alert('Informasi berhasil ditambahkan!');
            displayInfoInAdd(); // Tampilkan informasi terbaru di add-info.html
            displayInfoInIndex(); // Tampilkan informasi terbaru di index.html
        });
    }

    // Menghapus informasi
    function deleteInfo(index) {
        const storedInfoList = JSON.parse(localStorage.getItem('infoList')) || [];
        storedInfoList.splice(index, 1); // Menghapus informasi berdasarkan index
        localStorage.setItem('infoList', JSON.stringify(storedInfoList));
        displayInfoInAdd(); // Tampilkan informasi terbaru setelah dihapus di add-info.html
        displayInfoInIndex(); // Tampilkan informasi terbaru setelah dihapus di index.html
    }

    // Cek halaman dan tampilkan informasi yang sesuai
    if (infoList) {
        displayInfoInAdd(); // Tampilkan informasi saat halaman add-info.html dimuat
    } else {
        displayInfoInIndex(); // Tampilkan informasi saat halaman index.html dimuat
    }
});
