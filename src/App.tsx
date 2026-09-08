import { useState } from "react";
import PhoneAuth from "./imports/PhoneAuth.tsx";
import Otp from "./imports/Otp.tsx";
import Otp2 from "./imports/Otp2.tsx";
import AccountCreationSuccessful from "./imports/AccountCreationSuccessful.tsx";
import AddProfilcPicAndName from "./imports/AddProfilcPicAndName.tsx";
import Email from "./imports/Email.tsx";
import EmailOtp from "./imports/Email-1.tsx";
import Location from "./imports/Location.tsx";
import Nin from "./imports/Nin.tsx";

import AuthLayout from "./components/AuthLayout";
import MainLayout from "./components/MainLayout";

type Screen =
  | "phone-auth"
  | "otp"
  | "otp2"
  | "add-profile"
  | "email"
  | "email-otp"
  | "location"
  | "nin"
  | "account-success";

const FLOW: Screen[] = [
  "phone-auth",
  "otp2", // Using Otp2 which includes the "Change number" option
  "account-success",
  "add-profile",
  "email",
  "email-otp",
  "location",
  "nin",
];

export default function App() {
  const [history, setHistory] = useState<Screen[]>(["phone-auth"]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const current = history[history.length - 1];

  const push = (screen: Screen) => setHistory((h) => [...h, screen]);
  const pop = () => setHistory((h) => (h.length > 1 ? h.slice(0, -1) : h));

  const next = () => {
    const idx = FLOW.indexOf(current);
    if (idx < FLOW.length - 1) {
      push(FLOW[idx + 1]);
    } else {
      setIsAuthenticated(true);
    }
  };

  return (
    <div className="w-full min-h-[100dvh] flex flex-col bg-[#fcfcfc] dark:bg-[#0c0c0e] text-gray-900 dark:text-white transition-colors">
      {isAuthenticated ? (
        <MainLayout />
      ) : (
        <AuthLayout hideTopBar={current === "account-success"}>
          {current === "phone-auth" && (
            <PhoneAuth onNext={next} onBack={pop} />
          )}
          {current === "otp" && (
            <Otp onNext={next} onBack={pop} />
          )}
          {current === "otp2" && (
            <Otp2 onNext={next} onBack={pop} onChangeNumber={() => push("phone-auth")} />
          )}
          {current === "add-profile" && (
            <AddProfilcPicAndName onNext={next} onBack={pop} />
          )}
          {current === "email" && (
            <Email onNext={next} onBack={pop} />
          )}
          {current === "email-otp" && (
            <EmailOtp onNext={next} onBack={pop} />
          )}
          {current === "location" && (
            <Location onNext={next} onBack={pop} />
          )}
          {current === "nin" && (
            <Nin onNext={next} onBack={pop} />
          )}
          {current === "account-success" && (
            <AccountCreationSuccessful
              onNext={() => setIsAuthenticated(true)}
              onSetupProfile={() => push("add-profile")}
            />
          )}
        </AuthLayout>
      )}
    </div>
  );
}
