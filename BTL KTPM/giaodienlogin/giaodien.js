const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const signUpForm = document.getElementById('signUpForm');
const signInForm = document.getElementById('signInForm');
const messageDiv = document.getElementById('message');

// Xử lý hiệu ứng chuyển đổi giữa sign-in và sign-up
signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

// Xử lý đăng ký
signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    // Kiểm tra thông tin đầu vào
    if (name && email && password) {
        // Lưu trữ thông tin đăng ký vào Local Storage
        localStorage.setItem('registeredEmail', email);
        localStorage.setItem('registeredPassword', password);

        showMessage('success', 'Đăng ký thành công! Chuyển sang phần đăng nhập...');

        // Chuyển sang form đăng nhập sau 2 giây
        setTimeout(() => {
            container.classList.remove('right-panel-active');
        }, 2000); 
    } else {
        showMessage('error', 'Đăng ký thất bại. Vui lòng điền đầy đủ thông tin.');
    }
});

// Xử lý đăng nhập
signInForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('signinEmail').value;
    const password = document.getElementById('signinPassword').value;

    // Lấy thông tin đăng ký từ Local Storage
    const registeredEmail = localStorage.getItem('registeredEmail');
    const registeredPassword = localStorage.getItem('registeredPassword');

    // Kiểm tra thông tin đăng nhập
    if (email === registeredEmail && password === registeredPassword) {
        showMessage('success', 'Đăng nhập thành công! Chuyển hướng...');
        // Chuyển hướng đến website của bạn sau 2 giây
        setTimeout(() => {
            window.location.href = "../index.html";
        }, 2000);
    } else {
        showMessage('error', 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
    }
});

// Hàm hiển thị thông báo
function showMessage(type, text) {
    messageDiv.innerText = text;
    messageDiv.style.padding = "10px";
    if (type === 'success') {
        messageDiv.style.backgroundColor = "#4CAF50"; // Màu xanh lá
    } else {
        messageDiv.style.backgroundColor = "#f44336"; // Màu đỏ
    }
    messageDiv.style.color = "white";
    messageDiv.style.textAlign = "center";
    messageDiv.style.marginBottom = "15px";

    // Ẩn thông báo sau 3 giây
    setTimeout(() => {
        messageDiv.innerText = '';
        messageDiv.style.padding = '0';
    }, 3000);
}
