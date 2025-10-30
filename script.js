// Đợi cho toàn bộ trang web được tải xong
document.addEventListener('DOMContentLoaded', () => {

    // --- PHẦN 1: ĐỒNG HỒ ĐẾM NGƯỢC ---
    
    // Lấy các phần tử HTML
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        // Lấy năm hiện tại
        const currentYear = new Date().getFullYear();
        // Ngày Giáng sinh (25/12)
        const christmasDate = new Date(`December 25, ${currentYear} 00:00:00`);
        const currentDate = new Date();

        // Tính toán thời gian còn lại (tính bằng giây)
        const totalSeconds = (christmasDate - currentDate) / 1000;

        // Nếu Giáng sinh đã qua (ví dụ: ngày 26/12)
        if (totalSeconds < 0) {
            document.querySelector('.christmas-title').innerText = "Chúc Mừng Giáng Sinh!";
            // Dừng đồng hồ
            clearInterval(countdownInterval);
            return;
        }

        // Chuyển đổi sang Ngày, Giờ, Phút, Giây
        const days = Math.floor(totalSeconds / 3600 / 24);
        const hours = Math.floor(totalSeconds / 3600) % 24;
        const minutes = Math.floor(totalSeconds / 60) % 60;
        const seconds = Math.floor(totalSeconds) % 60;

        // Cập nhật lên HTML
        // Dùng `formatTime` để luôn có 2 chữ số (ví dụ: 09 thay vì 9)
        daysEl.innerText = formatTime(days);
        hoursEl.innerText = formatTime(hours);
        minutesEl.innerText = formatTime(minutes);
        secondsEl.innerText = formatTime(seconds);
    }

    // Hàm thêm số 0 vào trước nếu số < 10
    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }

    // Chạy hàm `updateCountdown` mỗi giây
    const countdownInterval = setInterval(updateCountdown, 1000);
    // Chạy 1 lần ngay lúc tải trang
    updateCountdown();

    // --- PHẦN 2: HIỆU ỨNG TUYẾT RƠI ---

    const snowContainer = document.getElementById('snow-container');

    function createSnowflake() {
        // 1. Tạo 1 bông tuyết mới
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');

        // 2. Tùy chỉnh ngẫu nhiên
        const size = Math.random() * 5 + 2; // Kích thước từ 2px đến 7px
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        
        // Vị trí bắt đầu (ngẫu nhiên theo chiều ngang)
        snowflake.style.left = `${Math.random() * 100}vw`; 
        
        // Tốc độ rơi (ngẫu nhiên)
        const duration = Math.random() * 5 + 5; // Tốc độ rơi từ 5s đến 10s
        snowflake.style.animationDuration = `${duration}s`;
        
        // Độ mờ (ngẫu nhiên)
        snowflake.style.opacity = Math.random() * 0.5 + 0.3; // Mờ từ 0.3 đến 0.8

        // 3. Thêm bông tuyết vào màn hình
        snowContainer.appendChild(snowflake);

        // 4. Xóa bông tuyết sau khi nó rơi xong (để tiết kiệm bộ nhớ)
        setTimeout(() => {
            snowflake.remove();
        }, duration * 1000); // (duration tính bằng giây)
    }

    // Cứ mỗi 100 mili-giây (0.1s) thì tạo 1 bông tuyết mới
    setInterval(createSnowflake, 100);

});