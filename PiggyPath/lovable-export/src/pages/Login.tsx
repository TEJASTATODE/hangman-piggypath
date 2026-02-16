import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(true);
  const [loading, setLoading] = useState(false);

  const CONFIG = {
    SHEET_ID: "18BRkN8A0jiiFUCdXLaYGyw6XinQMi64VTQLVFNDGhgU",
    API_KEY: "AIzaSyBDei6d68KZLBdTJqEKBBCUbZ2xRFOYjfA",
    APPS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbzfet5ZiguhLUE95sWAsqJLQ0ZtZc2B0Su6Y475KBbfXpB8aQaZ9hKOUOB_xO3_y-ny/exec",
  };

  const redirectHome = () => {
    window.location.href = "/index";
  };

  // Simple password hashing
  const hashPassword = async (password) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hash))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };

  // Read users from Google Sheet
  const getUsers = async () => {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.SHEET_ID}/values/Sheet1!A:C?key=${CONFIG.API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.values || [];
  };

  // Add new user via Apps Script
  const addUser = async (email, hashedPassword) => {
    await fetch(CONFIG.APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "signup",
        email: email,
        password: hashedPassword,
        timestamp: new Date().toISOString(),
      }),
    });
  };

  const handleAuth = async () => {
    // Validation
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      const hashedPassword = await hashPassword(password);
      const users = await getUsers();

      if (isSignup) {
        // SIGNUP
        const emailExists = users
          .slice(1)
          .some((row) => row[0]?.toLowerCase() === email.toLowerCase());

        if (emailExists) {
          alert("This email is already registered! Please log in instead.");
          setIsSignup(false);
          setLoading(false);
          return;
        }

        await addUser(email.toLowerCase(), hashedPassword);
        
        // Wait a moment for sheet to update
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        alert("Account created successfully! 🎉\nYou can now log in.");
        setIsSignup(false);
        setPassword("");
      } else {
        // LOGIN
        const user = users
          .slice(1)
          .find((row) => row[0]?.toLowerCase() === email.toLowerCase());

        if (!user) {
          alert("Email not found. Please sign up first!");
          setIsSignup(true);
          setLoading(false);
          return;
        }

        if (user[1] !== hashedPassword) {
          alert("Incorrect password. Please try again.");
          setLoading(false);
          return;
        }

        // Login success
        localStorage.setItem("userEmail", email);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("loginTime", new Date().toISOString());

        alert("Login successful! 🎉\nWelcome back!");
        redirectHome();
      }
    } catch (error) {
      console.error("Auth error:", error);
      alert("Something went wrong. Please check your internet connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAuth();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-gray-500 mt-2">
            {isSignup
              ? "Sign up to get started"
              : "Log in to your account"}
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              disabled={loading}
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              disabled={loading}
              autoComplete={isSignup ? "new-password" : "current-password"}
            />
            {isSignup && (
              <p className="text-xs text-gray-500 mt-1">
                Must be at least 6 characters
              </p>
            )}
          </div>

          <button
            onClick={handleAuth}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                {isSignup ? "Creating account..." : "Logging in..."}
              </span>
            ) : isSignup ? (
              "Create Account"
            ) : (
              "Log In"
            )}
          </button>
        </div>

        <div className="mt-6 text-center">
          <span className="text-gray-600 text-sm">
            {isSignup ? "Already have an account?" : "Don't have an account?"}
          </span>
          <button
            onClick={() => {
              setIsSignup(!isSignup);
              setPassword("");
            }}
            className="ml-2 text-indigo-600 font-semibold hover:text-indigo-800 transition text-sm"
            disabled={loading}
          >
            {isSignup ? "Log In" : "Sign Up"}
          </button>
        </div>

        {!isSignup && (
          <div className="mt-4 text-center">
            <button
              onClick={() => alert("Password reset feature coming soon!")}
              className="text-sm text-gray-500 hover:text-gray-700 transition"
              disabled={loading}
            >
              Forgot your password?
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;