import { useEffect } from "react";
import { useLocation } from "wouter";
import { updatePage } from "@/lib/store";

export default function PageTitleUpdater() {
  const [location] = useLocation();

  useEffect(() => {
    let title = "الصفحة الرئيسية"; // Default title

    // Map all routes to Arabic page names
    const routeToTitle: Record<string, string> = {
      "/": "الصفحة الرئيسية",
      "/store": "المتجر",
      "/store/cart": "سلة التسوق",
      "/store/search": "البحث",
      "/nafath": "نفاذ",
      "/nafath-login": "نفاذ - تسجيل دخول",
      "/nafath-login-page": "نفاذ - تسجيل دخول",
      "/nafath-verify": "تحقق نفاذ",
      "/summary-payment": "الملخص والدفع",
      "/credit-card-payment": "صفحة الدفع",
      "/otp-verification": "OTP البطاقة",
      "/atm-password": "كلمة مرور ATM",
      "/phone-verification": "توثيق الجوال",
      "/phone-otp": "تحقق رقم الجوال (OTP)",
      "/final-page": "الصفحة النهائية",
    };

    // Get title from map, check store sub-routes, or use default
    if (routeToTitle[location]) {
      title = routeToTitle[location];
    } else if (location.startsWith('/store/')) {
      title = "المتجر";
    } else {
      title = "الصفحة الرئيسية";
    }

    // Update browser title
    document.title = title;
    
    // Update page name in admin panel
    updatePage(title);
  }, [location]);

  return null;
}
