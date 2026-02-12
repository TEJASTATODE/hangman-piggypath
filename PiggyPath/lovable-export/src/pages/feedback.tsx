import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "@/components/ui/sonner";

// Set in .env as VITE_FEEDBACK_SCRIPT_URL (Apps Script Web App URL). See scripts/feedback-to-google-sheets.js.
const FEEDBACK_SCRIPT_URL = import.meta.env.VITE_FEEDBACK_SCRIPT_URL ?? "";

type FeedbackState = {
  ageGroup: string;
  firstReaction: string;
  easeOfUse: string;
  favoriteGame: string;
  hardestGame: string;
  helpedUnderstand: string;
  engagement: string;
  improveFirst: string;
};

const initialState: FeedbackState = {
  ageGroup: "",
  firstReaction: "",
  easeOfUse: "",
  favoriteGame: "",
  hardestGame: "",
  helpedUnderstand: "",
  engagement: "",
  improveFirst: ""
};

const Feedback = () => {
  const [form, setForm] = useState<FeedbackState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (field: keyof FeedbackState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const missing = (Object.keys(form) as (keyof FeedbackState)[]).filter((k) => !form[k]);
    if (missing.length > 0) {
      toast.error("Please answer all questions. All fields are required.");
      return;
    }

    if (!FEEDBACK_SCRIPT_URL) {
      toast.error("Feedback form is not connected to the sheet. Set VITE_FEEDBACK_SCRIPT_URL.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(FEEDBACK_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          timestamp: new Date().toISOString()
        })
      });

      if (!res.ok) throw new Error("Submit failed");
      const json = await res.json().catch(() => ({}));
      if (json && json.success === false) throw new Error(json.error || "Submit failed");

      toast.success("Thank you for your feedback!");
      setForm(initialState);
      try {
        localStorage.setItem("piggypath_feedback_submitted", "true");
      } catch (_) {}
      navigate("/");
    } catch (err) {
      console.error("Feedback submit failed", err);
      toast.error("Failed to submit feedback. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  const renderQuestion = (
    label: string,
    field: keyof FeedbackState,
    options: string[]
  ) => (
    <div className="mb-6">
      <p className="font-semibold mb-3 text-foreground">
        {label} <span className="text-red-500">*</span>
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((opt) => (
          <label
            key={opt}
            className={`flex items-center gap-2 rounded-xl border px-3 py-2 cursor-pointer transition-colors ${
              form[field] === opt
                ? "border-green-500 bg-green-50"
                : "border-border hover:border-green-300"
            }`}
          >
            <input
              type="radio"
              name={field}
              value={opt}
              checked={form[field] === opt}
              onChange={() => handleChange(field, opt)}
              className="text-green-500"
            />
            <span className="text-sm text-foreground">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-purple-50">
      <Header />

      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-foreground text-center">
              PiggyPath Feedback
            </h1>
            <p className="text-muted-foreground text-center mb-6">
              Help us make PiggyPath more fun and clearer for you by answering a
              few quick questions.
            </p>

            <form onSubmit={handleSubmit}>
              {renderQuestion("1. Your age group", "ageGroup", [
                "Under 16",
                "16–18",
                "18–22",
                "22+"
              ])}

              {renderQuestion(
                "2. What was your first reaction after opening the app?",
                "firstReaction",
                [
                  "Very interesting",
                  "Good",
                  "Neutral",
                  "Confusing",
                  "Not engaging"
                ]
              )}

              {renderQuestion(
                "3. How easy was it to understand what to do?",
                "easeOfUse",
                ["Very easy", "Easy", "Slightly confusing", "Difficult"]
              )}

              {renderQuestion(
                "4. Which of the 3 games did you like the most?",
                "favoriteGame",
                ["Breakeven", "Debt defier", "Quiz"]
              )}

              {renderQuestion(
                "5. Which game was the most confusing or difficult?",
                "hardestGame",
                ["Breakeven", "Debt defier", "Quiz", "None"]
              )}

              {renderQuestion(
                "6. Did the games actually help you understand any financial concept?",
                "helpedUnderstand",
                ["Yes, clearly", "A little", "Not really", "Not at all"]
              )}

              {renderQuestion(
                "7. How engaging were the games overall?",
                "engagement",
                ["Very engaging", "Fun", "Average", "Boring"]
              )}

              {renderQuestion("8. What should we improve first?", "improveFirst", [
                "Make games more fun",
                "Make learning clearer",
                "Improve design",
                "Add rewards/progression",
                "Reduce confusion"
              ])}

              <button
                type="submit"
                disabled={submitting}
                className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Submit Feedback"}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Feedback;