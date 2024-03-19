export function isValidEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}

// Độ dài ít nhất 8 ký tự: Biểu thức {8,} ở cuối đảm bảo mật khẩu có ít nhất 8 ký tự.
// Ít nhất 2 chữ cái viết hoa: (?=.*[A-Z].*[A-Z]) đảm bảo chuỗi có ít nhất hai chữ cái viết hoa.
// Ít nhất 1 ký tự đặc biệt: (?=.*[!@#$&*]) đảm bảo chuỗi có ít nhất một ký tự đặc biệt.
// Ít nhất 2 chữ số: (?=.*[0-9].*[0-9]) đảm bảo chuỗi có ít nhất hai chữ số.
// Ít nhất 3 chữ cái viết thường: (?=.*[a-z].*[a-z].*[a-z]) đảm bảo chuỗi có ít nhất ba chữ cái viết thường.
export function isValidPassword(password: string) {
    const strongPasswordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
    return strongPasswordRegex.test(password);
}