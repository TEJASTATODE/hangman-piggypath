import { useState, useMemo, useRef, useEffect } from "react";
import quizData from "./quizData";

// Import sound files
import rightSound from "./assets/sounds/corect.wav";
import wrongSound from "./assets/sounds/wrong.wav";
import winSound from "./assets/sounds/win.wav";

const Quiz = () => {
  // Generate random questions once when component mounts
  const randomQuestions = useMemo(() => {
    const mcqQuestions = quizData.filter(q => !q.type || q.type === "mcq").slice(0, 20);
    const scenarioQuestions = quizData.filter(q => !q.type || q.type === "mcq").slice(20, 30);
    const matchQuestions = quizData.filter(q => q.type === "match");

    // Shuffle function
    const shuffle = (array) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    // Select 5 random MCQs
    const selectedMCQs = shuffle(mcqQuestions).slice(0, 5);
    
    // Select 3 random scenario questions
    const selectedScenarios = shuffle(scenarioQuestions).slice(0, 3);
    
    // Select 2 random match questions
    const selectedMatches = shuffle(matchQuestions).slice(0, 2);

    // Combine all selected questions
    return [...selectedMCQs, ...selectedScenarios, ...selectedMatches];
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  // MCQ state
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Match-the-pair state
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [matched, setMatched] = useState([]); // { left, right, correct }

  const [showAnswer, setShowAnswer] = useState(false);

  // Audio refs
  const correctSoundRef = useRef(null);
  const wrongSoundRef = useRef(null);
  const winSoundRef = useRef(null);

  const currentQuestion = randomQuestions[currentIndex];

  // Shuffle right-side options ONCE per match question
  const shuffledRights = useMemo(() => {
    if (currentQuestion.type !== "match") return [];
    return [...currentQuestion.pairs.map(p => p.right)].sort(
      () => Math.random() - 0.5
    );
  }, [currentIndex]);

  // Play sound helper
  const playSound = (audioRef) => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => console.log("Audio play failed:", err));
    }
  };

  /* =====================
     MCQ HANDLER
     ===================== */
  const handleOptionClick = (index) => {
    if (showAnswer) return;
    setSelectedIndex(index);
    setShowAnswer(true);

    // Play correct or wrong sound
    if (index === currentQuestion.correctIndex) {
      playSound(correctSoundRef);
    } else {
      playSound(wrongSoundRef);
    }

    // Check if this is the last question
    if (currentIndex === randomQuestions.length - 1) {
      setTimeout(() => {
        playSound(winSoundRef);
      }, 500);
    }
  };

  /* =====================
     MATCH HANDLERS
     ===================== */
  const handleLeftSelect = (left) => {
    if (showAnswer) return;
    setSelectedLeft(left);
  };

  const handleRightSelect = (right) => {
    if (!selectedLeft || showAnswer) return;

    const isCorrect = currentQuestion.pairs.some(
      (p) => p.left === selectedLeft && p.right === right
    );

    // Play correct or wrong sound
    if (isCorrect) {
      playSound(correctSoundRef);
    } else {
      playSound(wrongSoundRef);
    }

    setMatched((prev) => [
      ...prev,
      { left: selectedLeft, right, correct: isCorrect },
    ]);

    setSelectedLeft(null);

    // Check if all pairs are matched
    if (matched.length + 1 === currentQuestion.pairs.length) {
      setShowAnswer(true);
      
      // Check if this is the last question
      if (currentIndex === randomQuestions.length - 1) {
        setTimeout(() => {
          playSound(winSoundRef);
        }, 500);
      }
    }
  };

  const handleNext = () => {
    setSelectedIndex(null);
    setSelectedLeft(null);
    setMatched([]);
    setShowAnswer(false);
    setCurrentIndex((prev) => prev + 1);
  };

  const isMatch = currentQuestion.type === "match";

  // Helper to find correct match for a left item
  const getCorrectMatch = (leftItem) => {
    return currentQuestion.pairs.find(p => p.left === leftItem)?.right;
  };

  // Calculate progress segments
  const getProgressSegments = () => {
    // Part 1: MCQ (0-4) - 5 questions
    // Part 2: Scenario (5-7) - 3 questions
    // Part 3: Match (8-9) - 2 questions
    const segments = [
      { start: 0, end: 5, color: "#01EF8E" },
      { start: 5, end: 8, color: "#01EF8E" },
      { start: 8, end: 10, color: "#01EF8E" }
    ];

    return segments.map(segment => {
      const total = segment.end - segment.start;
      const completed = Math.max(0, Math.min(currentIndex + 1 - segment.start, total));
      const percentage = (completed / total) * 100;
      
      return {
        ...segment,
        total,
        completed,
        percentage,
        isActive: currentIndex >= segment.start && currentIndex < segment.end,
        isCompleted: currentIndex >= segment.end
      };
    });
  };

  const progressSegments = getProgressSegments();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      
      {/* Home Button - Top Left Corner */}
      <a
        href="https://hangman-piggypath-w94d.vercel.app/index"
        className="fixed top-4 left-4 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border-2 shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 z-50 flex items-center gap-2"
        style={{
          backgroundColor: '#806BFF',
          borderColor: '#6B56E0',
          color: 'white'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6B56E0'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#806BFF'}
      >
        <span className="text-xl sm:text-2xl">🏠</span>
        <span className="font-semibold text-sm sm:text-base">Home</span>
      </a>

      {/* Audio Elements */}
      <audio ref={correctSoundRef} src={rightSound} preload="auto" />
      <audio ref={wrongSoundRef} src={wrongSound} preload="auto" />
      <audio ref={winSoundRef} src={winSound} preload="auto" />

      {/* Decorative Shadow Balls */}
      {/* Top Left - Purple (#806BFF) */}
      <div 
        className="absolute -top-10 -left-32 w-128 h-128 rounded-full pointer-events-none"
        style={{ backgroundColor: 'rgba(128, 107, 255, 0.7)' }}
      />
      
      {/* Bottom Right - Green (#01EF8E) */}
      <div 
        className="absolute -bottom-4 -right-42 w-128 h-128 rounded-full pointer-events-none"
        style={{ backgroundColor: 'rgba(1, 239, 142, 0.7)' }}
      />

      <div 
        className="w-full max-w-5xl bg-white rounded-2xl p-8 sm:p-12 flex flex-col relative z-10"
        style={{ boxShadow: '0 25px 50px -12px rgba(128, 107, 255, 0.95)' }}
      >

        {/* Progress Bar with Segments */}
        <div className="mb-8">
          <div className="flex justify-end items-center mb-3">
            <span className="text-lg font-semibold text-gray-700">
              {Math.round(((currentIndex + 1) / randomQuestions.length) * 100)}%
            </span>
          </div>

          {/* Segmented Progress Bar */}
          <div className="flex gap-2">
            {progressSegments.map((segment, idx) => (
              <div key={idx} className="flex-1">
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all duration-500 ease-out"
                    style={{ 
                      width: `${segment.percentage}%`,
                      backgroundColor: '#01EF8E'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =====================
            MATCH THE PAIR UI
           ===================== */}
        {isMatch ? (
          <>
            <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-center text-gray-800">
              {currentQuestion.title}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 mb-8">
              {/* LEFT COLUMN */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4 text-center">
                  Select from here
                </h3>
                {currentQuestion.pairs.map((pair) => {
                  const matchedItem = matched.find(m => m.left === pair.left);

                  return (
                    <button
                      key={pair.left}
                      onClick={() => handleLeftSelect(pair.left)}
                      disabled={!!matchedItem || showAnswer}
                      className={`w-full px-6 py-5 rounded-2xl border-3 text-left text-base sm:text-lg font-medium
                        transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]
                        shadow-sm hover:shadow-md
                        ${
                          matchedItem
                            ? matchedItem.correct
                              ? "border-green-400 bg-green-50 text-green-800"
                              : "border-red-400 bg-red-50 text-red-800"
                            : selectedLeft === pair.left
                            ? "border-blue-500 bg-blue-50 text-blue-900 shadow-lg scale-[1.02]"
                            : "border-gray-300 bg-white text-gray-800 hover:border-blue-300 hover:bg-gray-50"
                        }
                        ${!!matchedItem || showAnswer ? 'cursor-not-allowed' : 'cursor-pointer'}
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <span>{pair.left}</span>
                        {matchedItem && (
                          <span className="text-2xl">
                            {matchedItem.correct ? '✓' : '✗'}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* RIGHT COLUMN */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4 text-center">
                  Match with
                </h3>
                {shuffledRights.map((right) => {
                  const matchedItem = matched.find(m => m.right === right);

                  return (
                    <button
                      key={right}
                      onClick={() => handleRightSelect(right)}
                      disabled={!!matchedItem || showAnswer}
                      className={`w-full px-6 py-5 rounded-2xl border-3 text-left text-base sm:text-lg font-medium
                        transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]
                        shadow-sm hover:shadow-md
                        ${
                          matchedItem
                            ? matchedItem.correct
                              ? "border-green-900 bg-green-50 text-green-900"
                              : "border-red-400 bg-red-50 text-red-800"
                            : "border-gray-300 bg-white text-gray-800 hover:border-blue-300 hover:bg-gray-50"
                        }
                        ${!!matchedItem || showAnswer ? 'cursor-not-allowed' : 'cursor-pointer'}
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <span>{right}</span>
                        {matchedItem && (
                          <span className="text-2xl">
                            {matchedItem.correct ? '✓' : '✗'}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Show Correct Answers after completion */}
            {showAnswer && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">📋</span>
                  Correct Matches:
                </h3>
                <div className="space-y-3">
                  {currentQuestion.pairs.map((pair, idx) => (
                    <div key={idx} className="flex items-center gap-4 text-base sm:text-lg">
                      <div className="flex-1 bg-white px-4 py-3 rounded-xl font-medium text-gray-800 shadow-sm">
                        {pair.left}
                      </div>
                      <div className="text-blue-600 text-2xl font-bold">→</div>
                      <div className="flex-1 bg-white px-4 py-3 rounded-xl font-medium text-gray-800 shadow-sm">
                        {pair.right}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          /* =====================
             MCQ / SCENARIO UI
             ===================== */
          <>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-10 text-center leading-relaxed">
              {currentQuestion.question}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 flex-1 mb-8">
              {currentQuestion.options.map((option, index) => {
                let borderClass = "border-gray-300";
                let bgClass = "bg-white";
                let textClass = "text-gray-800";
                let icon = null;

                if (showAnswer) {
                  if (index === currentQuestion.correctIndex) {
                    borderClass = "border-green-400";
                    bgClass = "bg-green-50";
                    textClass = "text-green-800";
                    icon = <span className="text-3xl">✓</span>;
                  } else if (index === selectedIndex) {
                    borderClass = "border-red-400";
                    bgClass = "bg-red-50";
                    textClass = "text-red-800";
                    icon = <span className="text-3xl">✗</span>;
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(index)}
                    disabled={showAnswer}
                    className={`
                      w-full text-left px-6 py-5 rounded-2xl border-3
                      text-base sm:text-lg font-medium
                      transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]
                      shadow-sm
                      ${borderClass} ${bgClass} ${textClass}
                      ${!showAnswer ? "hover:border-blue-300 hover:bg-gray-50 hover:shadow-md cursor-pointer" : "cursor-not-allowed"}
                    `}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex-1">{option}</span>
                      {icon}
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* =====================
            NEXT BUTTON
           ===================== */}
        <button
          onClick={handleNext}
          disabled={
            !showAnswer || currentIndex === randomQuestions.length - 1
          }
          className={`mt-4 w-full py-5 rounded-2xl font-bold text-lg transition-all duration-300
            transform hover:scale-[1.01] active:scale-[0.99]
            ${
              showAnswer && currentIndex < randomQuestions.length - 1
                ? "text-white shadow-lg hover:shadow-xl cursor-pointer"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          style={
            showAnswer && currentIndex < randomQuestions.length - 1
              ? { backgroundColor: '#01EF8E' }
              : {}
          }
        >
          {currentIndex === randomQuestions.length - 1 ? "Finish Quiz" : "Next Question →"}
        </button>

        {/* End Message */}
        {showAnswer && currentIndex === randomQuestions.length - 1 && (
          <div className="mt-6 text-center">
            <div className="inline-block bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl px-8 py-4">
              <p className="text-2xl font-bold text-green-700 flex items-center gap-3">
                <span className="text-4xl">🎉</span>
                Quiz Completed Successfully!
                <span className="text-4xl">🎉</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;