import { useState, useRef, useEffect } from "react";

const GRID = 6;
const CELL = 60;
const DRAG_THRESHOLD = 20;

// Sample data (replace with your actual imports)
const assets = [
  "STOCKS", "BONDS", "GOLD", "PROPERTY", "CRYPTO", "BUSINESS",
  "SAVINGS", "ETF", "REIT", "DIVIDENDS"
];

const liabilities = [
  {
    name: "CREDIT CARD",
    definition: "A card that lets you borrow money to make purchases with high interest rates.",
    whyBad: "High interest debt that compounds quickly if not paid off monthly!"
  },
  {
    name: "CAR LOAN",
    definition: "Borrowed money to purchase a depreciating vehicle.",
    whyBad: "You're paying interest on an asset that loses value every year!"
  },
  {
    name: "STUDENT DEBT",
    definition: "Money borrowed to pay for education that must be repaid with interest.",
    whyBad: "Can take decades to pay off and limits your financial freedom!"
  }
];

function randomAsset() {
  return assets[Math.floor(Math.random() * assets.length)];
}

export default function BlockGame() {
  const liability = liabilities[Math.floor(Math.random() * liabilities.length)];

  const [blocks, setBlocks] = useState([
  { id: 1, word: randomAsset(), row: 0, col: 0, w: 2, h: 1, type: "asset" },
  { id: 2, word: randomAsset(), row: 0, col: 3, w: 3, h: 1, type: "asset" },

  { id: 3, word: randomAsset(), row: 1, col: 0, w: 1, h: 2, type: "asset" },
  { id: 4, word: randomAsset(), row: 1, col: 2, w: 2, h: 1, type: "asset" },
  { id: 5, word: randomAsset(), row: 2, col: 4, w: 1, h: 2, type: "asset" },

  { id: 6, word: randomAsset(), row: 3, col: 0, w: 3, h: 1, type: "asset" },
  { id: 7, word: randomAsset(), row: 4, col: 1, w: 2, h: 1, type: "asset" },
  { id: 8, word: randomAsset(), row: 4, col: 4, w: 2, h: 1, type: "asset" },

  // 🔴 RED LIABILITY BLOCK
  {
    id: 99,
    word: liability.name,
    row: 2,
    col: 1,
    w: 2,
    h: 1,
    type: "liability"
  }
]);


  const [won, setWon] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [moves, setMoves] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef(null);

  // =====================
  // COLLISION CHECK
  // =====================
  function canMove(test, list) {
    if (
      test.row < 0 ||
      test.col < 0 ||
      test.row + test.h > GRID ||
      test.col + test.w > GRID
    ) return false;

    for (let b of list) {
      if (b.id === test.id) continue;
      if (
        test.col < b.col + b.w &&
        test.col + test.w > b.col &&
        test.row < b.row + b.h &&
        test.row + test.h > b.row
      ) return false;
    }
    return true;
  }

  // =====================
  // DRAG START
  // =====================
  function startDrag(block, e) {
    e.preventDefault();
    setSelectedBlock(block.id);
    setIsDragging(true);
    
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY;
    
    dragRef.current = {
      id: block.id,
      x: clientX,
      y: clientY,
      moved: false
    };
  }

  // =====================
  // DRAG END
  // =====================
  function endDrag(e) {
    if (!dragRef.current) {
      setIsDragging(false);
      return;
    }

    const clientX = e.clientX ?? e.changedTouches?.[0]?.clientX ?? dragRef.current.x;
    const clientY = e.clientY ?? e.changedTouches?.[0]?.clientY ?? dragRef.current.y;

    const dx = clientX - dragRef.current.x;
    const dy = clientY - dragRef.current.y;

    // Only move if drag threshold is met
    if (Math.abs(dx) >= DRAG_THRESHOLD || Math.abs(dy) >= DRAG_THRESHOLD) {
      const dir =
        Math.abs(dx) > Math.abs(dy)
          ? dx > 0 ? "right" : "left"
          : dy > 0 ? "down" : "up";

      moveBlock(dragRef.current.id, dir);
    }
    
    dragRef.current = null;
    setIsDragging(false);
  }

  // =====================
  // HANDLE DRAG MOVE (for continuous movement feedback)
  // =====================
  function handleDragMove(e) {
    if (!dragRef.current || dragRef.current.moved) return;

    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY;

    const dx = clientX - dragRef.current.x;
    const dy = clientY - dragRef.current.y;

    // If moved beyond threshold, execute the move
    if (Math.abs(dx) >= DRAG_THRESHOLD || Math.abs(dy) >= DRAG_THRESHOLD) {
      const dir =
        Math.abs(dx) > Math.abs(dy)
          ? dx > 0 ? "right" : "left"
          : dy > 0 ? "down" : "up";

      moveBlock(dragRef.current.id, dir);
      
      // Reset drag start position for continuous movement
      dragRef.current.x = clientX;
      dragRef.current.y = clientY;
    }
  }

  // Add global mouse/touch move and up listeners
  useEffect(() => {
    if (!isDragging) return;

    window.addEventListener('mousemove', handleDragMove);
    window.addEventListener('touchmove', handleDragMove);
    window.addEventListener('mouseup', endDrag);
    window.addEventListener('touchend', endDrag);

    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('mouseup', endDrag);
      window.removeEventListener('touchend', endDrag);
    };
  }, [isDragging]);

  // =====================
  // MOVE BLOCK
  // =====================
  function moveBlock(id, dir) {
    setBlocks(prev => {
      const arr = [...prev];
      const i = arr.findIndex(b => b.id === id);
      const b = { ...arr[i] };

      if (dir === "left") b.col--;
      if (dir === "right") b.col++;
      if (dir === "up") b.row--;
      if (dir === "down") b.row++;

      if (!canMove(b, arr)) return prev;

      arr[i] = b;
      setMoves(m => m + 1);

      if (b.type === "liability" && b.col + b.w === GRID) {
        setTimeout(() => setWon(true), 300);
      }

      return arr;
    });
  }

  // =====================
  // KEYBOARD CONTROLS
  // =====================
  useEffect(() => {
    function handleKeyDown(e) {
      if (!selectedBlock || won) return;

      const key = e.key;
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(key)) {
        e.preventDefault();
        const dirMap = {
          ArrowUp: "up",
          ArrowDown: "down",
          ArrowLeft: "left",
          ArrowRight: "right"
        };
        moveBlock(selectedBlock, dirMap[key]);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedBlock, won]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2c1810] via-[#3d2415] to-[#1a0f08] flex flex-col items-center justify-center p-4 font-['Fredoka',sans-serif]">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&display=swap');
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(239, 68, 68, 0.5);
          }
          50% {
            box-shadow: 0 0 30px rgba(239, 68, 68, 0.8);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .block-enter {
          animation: slideIn 0.3s ease-out;
        }
        
        .liability-block {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>

      {/* Header */}
      <div className="mb-8 text-center animate-[slideIn_0.5s_ease-out]">
        <h1 className="text-4xl font-bold text-[#f4a460] mb-2 drop-shadow-lg">
          🧩 Unblock the Liability
        </h1>
        <p className="text-[#d4a574] text-lg">
          Move the blocks to let the red liability escape!
        </p>
      </div>

      {/* Moves Counter */}
      <div className="mb-4 bg-gradient-to-r from-[#654321] to-[#8b5a3c] px-6 py-3 rounded-full border-2 border-[#4a2511] shadow-lg">
        <span className="text-white font-semibold text-lg">
          Moves: <span className="text-[#ffd700] font-bold">{moves}</span>
        </span>
      </div>

      {/* BOARD */}
      <div className="relative animate-[slideIn_0.6s_ease-out]">
        <div 
          className="relative w-[380px] h-[380px] bg-gradient-to-br from-[#8b5a3c] to-[#6b4423] border-[6px] border-[#4a2511] rounded-lg shadow-2xl"
          style={{
            boxShadow: '0 20px 60px rgba(0,0,0,0.6), inset 1px 2px 10px rgba(255,255,255,0.1)'
          }}
        >
          {/* Grid lines (subtle) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
            {[...Array(GRID + 1)].map((_, i) => (
              <g key={i}>
                <line
                  x1={i * CELL}
                  y1="0"
                  x2={i * CELL}
                  y2={GRID * CELL}
                  stroke="#000"
                  strokeWidth="1"
                />
                <line
                  x1="0"
                  y1={i * CELL}
                  x2={GRID * CELL}
                  y2={i * CELL}
                  stroke="#000"
                  strokeWidth="1"
                />
              </g>
            ))}
          </svg>

          {/* EXIT ARROW */}
          <div className="absolute right-[-35px] top-[100px] flex items-center">
            <div className="w-8 h-[100px] bg-gradient-to-r from-[#8b5a3c] to-transparent"></div>
            <div className="text-4xl animate-[float_2s_ease-in-out_infinite]">→</div>
          </div>

          {/* Blocks */}
          {blocks.map(b => (
            <div
              key={b.id}
              onMouseDown={(e) => startDrag(b, e)}
              onTouchStart={(e) => startDrag(b, e)}
              onClick={() => !isDragging && setSelectedBlock(b.id)}
              className={`
                absolute flex items-center justify-center
                text-xs font-bold text-white rounded-lg
                select-none cursor-grab active:cursor-grabbing
                transition-all duration-200 ease-out
                hover:scale-105 hover:z-10
                block-enter
                ${selectedBlock === b.id ? 'ring-4 ring-yellow-400 ring-offset-2 ring-offset-transparent z-20' : ''}
                ${b.type === "liability" 
                  ? "bg-gradient-to-br from-red-600 to-red-800 liability-block shadow-[0_0_20px_rgba(239,68,68,0.5)]" 
                  : "bg-gradient-to-br from-[#d4a574] to-[#c19a6b] shadow-lg"
                }
              `}
              style={{
                width: b.w * CELL,
                height: b.h * CELL,
                left: b.col * CELL,
                top: b.row * CELL,
                boxShadow: b.type === "liability" 
                  ? '0 4px 15px rgba(239, 68, 68, 0.6), inset 0 -2px 5px rgba(0,0,0,0.3)' 
                  : '0 4px 10px rgba(0,0,0,0.4), inset 0 2px 5px rgba(255,255,255,0.2)'
              }}
            >
              <span className="px-2 text-center leading-tight drop-shadow-md">
                {b.word}
              </span>
            </div>
          ))}
        </div>
        </div>

        {/* Instructions
        <div className="mt-4 text-center text-[#d4a574] text-sm">
          <p>Click a block to select, then use arrow keys or drag to move</p>
        </div>
      </div> */}

      {/* WIN MODAL */}
      {won && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-[slideIn_0.3s_ease-out] backdrop-blur-sm">
          <div className="bg-gradient-to-br from-white to-gray-100 p-8 rounded-2xl w-[90%] max-w-[400px] text-center shadow-2xl border-4 border-yellow-400 animate-[pulse_0.5s_ease-out]">
            
            {/* Success Icon */}
            <div className="text-6xl mb-4">
              You Won🎉
            </div>

            <h2 className="text-3xl font-bold text-red-600 mb-4">
              {liability.name}
            </h2>

            <div className="bg-blue-50 p-4 rounded-lg mb-4 border-2 border-blue-200">
              <p className="text-gray-800 text-base leading-relaxed">
                {liability.definition}
              </p>
            </div>

            <div className="bg-red-50 p-4 rounded-lg mb-6 border-2 border-red-200">
              <p className="text-red-600 font-semibold text-base leading-relaxed">
                ⚠️ {liability.whyBad}
              </p>
            </div>

            <div className="mb-4 text-gray-600">
              <p className="text-lg">Completed in <span className="font-bold text-green-600">{moves}</span> moves!</p>
            </div>

            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-200 active:scale-95"
            >
              🎮 Next Level
            </button>
          </div>
        </div>
      )}
    </div>
  );
}