"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.otpPost = exports.forgetPost = exports.forget = exports.loginPost = exports.login = exports.logout = exports.registerPost = exports.register = void 0;
const md5_1 = __importDefault(require("md5"));
const user_model_1 = __importDefault(require("../../models/client/user.model"));
const genarateHelper = __importStar(require("../../helpers/genarate"));
const forget_password_1 = __importDefault(require("../../models/client/forget-password"));
const sendMail_1 = __importDefault(require("../../helpers/sendMail"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("client/pages/user/register", {
        title: "Đăng ký tài khoản",
    });
});
exports.register = register;
const registerPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fullName = req.body.fullName;
        const email = req.body.email;
        const password = (0, md5_1.default)(req.body.password);
        const exitsEmail = yield user_model_1.default.findOne({
            email: email,
        });
        if (exitsEmail) {
            console.log("Email đã tồn tại");
            return;
        }
        else {
            const newUser = new user_model_1.default({
                fullName: fullName,
                email: email,
                password: password,
                token: genarateHelper.genarateToken(30),
            });
            yield newUser.save();
            res.cookie("token", newUser.token);
            res.redirect("/");
        }
    }
    catch (error) {
        res.send("404 NOT FOUND!");
    }
});
exports.registerPost = registerPost;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("token");
    res.redirect("/user/login");
});
exports.logout = logout;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("client/pages/user/login", {
        title: "Trang đăng nhập",
    });
});
exports.login = login;
const loginPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = (0, md5_1.default)(req.body.password);
    const checkUser = yield user_model_1.default.findOne({
        email: email,
        password: password,
        deleted: false,
        status: "active",
    }).select("-password");
    if (!checkUser) {
        console.log("Thông tin không hợp lệ!");
        return;
    }
    else {
        res.cookie("token", checkUser.token);
        res.redirect("/");
    }
});
exports.loginPost = loginPost;
const forget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("client/pages/user/forget-password", {
        title: "Quên mật khẩu",
    });
});
exports.forget = forget;
const forgetPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const checkEmail = yield user_model_1.default.findOne({
        email: email,
        deleted: false,
    });
    if (!checkEmail) {
        console.log("Email không hợp lệ");
        return;
    }
    else {
        const otp = genarateHelper.genarateNumber(5);
        const objectForgetPassword = {
            email: email,
            otp: otp,
            expireAt: Date.now(),
        };
        const forgetPassword = new forget_password_1.default(objectForgetPassword);
        yield forgetPassword.save();
        const subject = "Xác minh đặt lại mật khẩu - Mã OTP của bạn";
        const html = `
  <div style="max-width: 500px; margin: 0 auto; padding: 20px; 
              border: 1px solid #e0e0e0; border-radius: 8px; 
              background-color: #f9f9f9; font-family: Arial, sans-serif; 
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); color: #333;">
    
    <h2 style="text-align: center; color: #007BFF;">Mã OTP Xác Minh</h2>
    
    <p>Xin chào,</p>
    
    <p>Bạn vừa yêu cầu đặt lại mật khẩu cho tài khoản của mình.</p>
    
    <p style="margin: 16px 0;">Vui lòng sử dụng mã OTP bên dưới để xác minh yêu cầu:</p>
    
    <div style="text-align: center; margin: 24px 0;">
      <span style="display: inline-block; padding: 12px 24px; 
                   font-size: 24px; font-weight: bold; 
                   background-color: #e6f0ff; color: #007BFF; 
                   border-radius: 6px; letter-spacing: 2px;">
        ${otp}
      </span>
    </div>
    
    <p><strong>Lưu ý:</strong> Mã OTP chỉ có hiệu lực trong vòng <strong>5 phút</strong>.</p>
    
    <p>Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email.</p>
    
    <hr style="margin: 24px 0; border: none; border-top: 1px solid #ddd;">
    
    <p style="font-size: 14px; color: #666; text-align: center;">
      Trân trọng,<br>
      Đội ngũ hỗ trợ
    </p>
  </div>
`;
        (0, sendMail_1.default)(email, subject, html);
        res.render("client/pages/user/otp", {
            title: "Nhận mã OTP",
            email: email,
        });
    }
});
exports.forgetPost = forgetPost;
const otpPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const otp = req.body.otp;
        const email = req.body.email;
        const checkOtp = yield forget_password_1.default.findOne({
            email: email,
            otp: otp,
        });
        if (!checkOtp) {
            console.log("Không hợp lệ");
            return;
        }
        else {
            const newToken = genarateHelper.genarateToken(30);
            yield user_model_1.default.updateOne({
                email: email,
            }, {
                token: newToken,
            });
            res.cookie("token", newToken);
            res.render("client/pages/user/resetPassword", {
                title: "Đặt lại mật khẩu",
            });
        }
    }
    catch (error) { }
});
exports.otpPost = otpPost;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const password = (0, md5_1.default)(req.body.password);
        const tokenUser = req.cookies.token;
        yield user_model_1.default.updateOne({
            token: tokenUser,
        }, {
            password: password,
        });
        res.redirect("/");
    }
    catch (error) {
        res.send("403 NOT FOUND!");
    }
});
exports.resetPassword = resetPassword;
