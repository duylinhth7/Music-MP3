import { Request, Response } from "express";
import md5 from "md5";
import User from "../../models/client/user.model";
import * as genarateHelper from "../../helpers/genarate";
import { ppid } from "process";
import ForgetPassword from "../../models/client/forget-password";
import sendMail from "../../helpers/sendMail";
//[GET] /user/register
export const register = async (req: Request, res: Response) => {
  res.render("client/pages/user/register", {
    title: "Đăng ký tài khoản",
  });
};

//[POST] /user/register
export const registerPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const fullName: string = req.body.fullName;
    const email: string = req.body.email;
    const password: string = md5(req.body.password);
    const exitsEmail = await User.findOne({
      email: email,
    });
    if (exitsEmail) {
      console.log("Email đã tồn tại");
      return;
    } else {
      const newUser = new User({
        fullName: fullName,
        email: email,
        password: password,
        token: genarateHelper.genarateToken(30),
      });
      await newUser.save();
      res.cookie("token", newUser.token);
      res.redirect("/");
    }
  } catch (error) {
    res.send("404 NOT FOUND!");
  }
};

//[GET] /user/logout
export const logout = async (req: Request, res: Response): Promise<void> => {
  res.clearCookie("token");
  res.redirect("/user/login");
};

//[GET] /user/login
export const login = async (req: Request, res: Response): Promise<void> => {
  res.render("client/pages/user/login", {
    title: "Trang đăng nhập",
  });
};

//[POST] /user/login
export const loginPost = async (req: Request, res: Response): Promise<void> => {
  const email: string = req.body.email;
  const password: string = md5(req.body.password);
  const checkUser = await User.findOne({
    email: email,
    password: password,
    deleted: false,
    status: "active",
  }).select("-password");
  if (!checkUser) {
    console.log("Thông tin không hợp lệ!");
    return;
  } else {
    res.cookie("token", checkUser.token);
    res.redirect("/");
  }
};

//[GET] /user/password/forget
export const forget = async (req: Request, res: Response): Promise<void> => {
  res.render("client/pages/user/forget-password", {
    title: "Quên mật khẩu",
  });
};

//[POST] /user/password/forget
export const forgetPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  const email: string = req.body.email;
  const checkEmail = await User.findOne({
    email: email,
    deleted: false,
  });
  if (!checkEmail) {
    console.log("Email không hợp lệ");
    return;
  } else {
    const otp = genarateHelper.genarateNumber(5);
    const objectForgetPassword = {
      email: email,
      otp: otp,
      expireAt: Date.now(),
    };
    const forgetPassword = new ForgetPassword(objectForgetPassword);
    await forgetPassword.save();

    //Gửi mail xác nhận OTP;
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

    sendMail(email, subject, html);

    res.render("client/pages/user/otp", {
      title: "Nhận mã OTP",
      email: email,
    });
  }
};

//[POST] /user/forget/otp
export const otpPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const otp = req.body.otp;
    const email: string = req.body.email;
    const checkOtp = await ForgetPassword.findOne({
      email: email,
      otp: otp,
    });
    if (!checkOtp) {
      console.log("Không hợp lệ");
      return;
    } else {
      const newToken = genarateHelper.genarateToken(30);
      await User.updateOne(
        {
          email: email,
        },
        {
          token: newToken,
        }
      );
      res.cookie("token", newToken);
      res.render("client/pages/user/resetPassword", {
        title: "Đặt lại mật khẩu",
      });
    }
  } catch (error) {}
};

//[POST] /user/forget/reset
export const resetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const password: string = md5(req.body.password);
    const tokenUser = req.cookies.token
    await User.updateOne(
      {
        token: tokenUser,
      },
      {
        password: password,
      }
    );
    res.redirect("/")
  } catch (error) {
    res.send("403 NOT FOUND!")
  }
};
