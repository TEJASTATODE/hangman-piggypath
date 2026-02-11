import { useState, useRef, useEffect } from "react";
import assets from "../data/assets.json";
import liabilities from "../data/liabilities.json";

const GRID = 8; 
const CELL = 70; 
const DRAG_THRESHOLD = 20;

// Track used words to prevent repetition
let usedAssetsInLevel = new Set();
let lastLevelAssets = new Set();
let lastLiability = null;

function randomAsset() {
  const availableAssets = assets.filter(
    asset => !usedAssetsInLevel.has(asset) && !lastLevelAssets.has(asset)
  );
  
  if (availableAssets.length === 0) {
    lastLevelAssets.clear();
    return assets[Math.floor(Math.random() * assets.length)];
  }
  
  const selected = availableAssets[Math.floor(Math.random() * availableAssets.length)];
  usedAssetsInLevel.add(selected);
  return selected;
}

function generateLevel() {
  lastLevelAssets = new Set(usedAssetsInLevel);
  usedAssetsInLevel.clear();
  
  const availableLiabilities = liabilities.filter(l => l.name !== lastLiability);
  const liability = availableLiabilities[Math.floor(Math.random() * availableLiabilities.length)];
  lastLiability = liability.name;

  // STRATEGIC RED BLOCK POSITIONS - Make it harder to escape
  const redBlockPositions = [
    // Left side positions (easier to block)
    { row: 1, col: 0, label: "top-left-blocked" },
    { row: 2, col: 0, label: "upper-left-blocked" },
    { row: 3, col: 0, label: "mid-left-blocked" },
    { row: 4, col: 0, label: "center-left-blocked" },
    { row: 5, col: 0, label: "lower-left-blocked" },
    
    // Partially interior positions (harder)
    { row: 2, col: 1, label: "upper-interior" },
    { row: 3, col: 1, label: "mid-interior" },
    { row: 4, col: 1, label: "center-interior" },
    { row: 5, col: 1, label: "lower-interior" },
    
    // Deep interior (hardest)
    { row: 2, col: 2, label: "deep-upper" },
    { row: 3, col: 2, label: "deep-mid" },
    { row: 4, col: 2, label: "deep-center" },
    { row: 5, col: 2, label: "deep-lower" },
  ];

  // Randomly select red block position
  const redBlockPos = redBlockPositions[Math.floor(Math.random() * redBlockPositions.length)];
  const redRow = redBlockPos.row;
  const redCol = redBlockPos.col;

  // Generate 15-20 rectangular blocks (2x1) scattered randomly across the grid
  const generateStrategicBlocks = () => {
    const blocks = [];
    const occupiedCells = new Set();
    
    // Mark red block position as occupied
    occupiedCells.add(`${redRow}-${redCol}`);
    occupiedCells.add(`${redRow}-${redCol + 1}`);
    
    // Function to check if position is free
    const isFree = (row, col, w, h) => {
      for (let r = row; r < row + h; r++) {
        for (let c = col; c < col + w; c++) {
          if (r >= GRID || c >= GRID || occupiedCells.has(`${r}-${c}`)) {
            return false;
          }
        }
      }
      return true;
    };
    
    // Function to occupy cells
    const occupy = (row, col, w, h) => {
      for (let r = row; r < row + h; r++) {
        for (let c = col; c < col + w; c++) {
          occupiedCells.add(`${r}-${c}`);
        }
      }
    };
    
    // Random number of blocks between 15-20
    const targetBlocks = 15 + Math.floor(Math.random() * 6);
    
    let id = 1;
    
    // Helper function to add a block with random orientation
    const addRandomBlock = (row, col) => {
      // 60% horizontal (2x1), 40% vertical (1x2) for variety
      const isHorizontal = Math.random() < 0.6;
      const w = isHorizontal ? 2 : 1;
      const h = isHorizontal ? 1 : 2;
      
      if (isFree(row, col, w, h)) {
        blocks.push({
          id: id++,
          word: randomAsset(),
          row,
          col,
          w,
          h,
          type: "asset"
        });
        occupy(row, col, w, h);
        return true;
      }
      return false;
    };
    
    // PRIORITY 1: Block directly in front of red block with VERTICAL block (harder to move!)
    if (redCol + 2 < GRID && redRow + 1 < GRID && isFree(redRow, redCol + 2, 1, 2)) {
      blocks.push({
        id: id++,
        word: randomAsset(),
        row: redRow,
        col: redCol + 2,
        w: 1,
        h: 2,
        type: "asset"
      });
      occupy(redRow, redCol + 2, 1, 2);
    }
    
    // PRIORITY 2: Add vertical blocks around red block (creates interesting obstacles)
    const verticalTraps = [
      { row: redRow - 1, col: redCol },
      { row: redRow, col: redCol - 1 },
      { row: redRow, col: redCol + 3 },
    ];
    
    for (const pos of verticalTraps) {
      if (blocks.length >= targetBlocks) break;
      if (pos.row >= 0 && pos.row + 1 < GRID && pos.col >= 0 && pos.col < GRID) {
        if (isFree(pos.row, pos.col, 1, 2)) {
          blocks.push({
            id: id++,
            word: randomAsset(),
            row: pos.row,
            col: pos.col,
            w: 1,
            h: 2,
            type: "asset"
          });
          occupy(pos.row, pos.col, 1, 2);
        }
      }
    }
    
    // PRIORITY 3: Create mixed obstacles in the path (horizontal + vertical mix)
    const pathObstacles = [
      { row: redRow - 2, col: redCol + 2, horizontal: true },
      { row: redRow + 1, col: redCol + 2, horizontal: true },
      { row: redRow - 1, col: redCol + 4, horizontal: false },
      { row: redRow, col: redCol + 5, horizontal: false },
      { row: redRow, col: redCol + 4, horizontal: true },
    ];
    
    for (const obstacle of pathObstacles) {
      if (blocks.length >= targetBlocks) break;
      const w = obstacle.horizontal ? 2 : 1;
      const h = obstacle.horizontal ? 1 : 2;
      
      if (obstacle.row >= 0 && obstacle.row + h <= GRID && 
          obstacle.col >= 0 && obstacle.col + w <= GRID) {
        if (isFree(obstacle.row, obstacle.col, w, h)) {
          blocks.push({
            id: id++,
            word: randomAsset(),
            row: obstacle.row,
            col: obstacle.col,
            w,
            h,
            type: "asset"
          });
          occupy(obstacle.row, obstacle.col, w, h);
        }
      }
    }
    
    // PRIORITY 4: Fill grid with MIXED orientation blocks (creates interesting maze)
    const allPossibleMoves = [];
    
    // Generate all possible positions with BOTH orientations
    for (let row = 0; row < GRID; row++) {
      for (let col = 0; col < GRID; col++) {
        // Horizontal blocks (2x1)
        if (col < GRID - 1) {
          allPossibleMoves.push({ row, col, w: 2, h: 1 });
        }
        // Vertical blocks (1x2)
        if (row < GRID - 1) {
          allPossibleMoves.push({ row, col, w: 1, h: 2 });
        }
      }
    }
    
    // Shuffle ALL possible moves for maximum randomness
    for (let i = allPossibleMoves.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allPossibleMoves[i], allPossibleMoves[j]] = [allPossibleMoves[j], allPossibleMoves[i]];
    }
    
    // Place remaining blocks with mixed orientations
    for (const move of allPossibleMoves) {
      if (blocks.length >= targetBlocks) break;
      
      if (isFree(move.row, move.col, move.w, move.h)) {
        blocks.push({
          id: id++,
          word: randomAsset(),
          row: move.row,
          col: move.col,
          w: move.w,
          h: move.h,
          type: "asset"
        });
        occupy(move.row, move.col, move.w, move.h);
      }
    }
    
    return blocks;
  };

  const config = generateStrategicBlocks();

  // Add red liability block at strategic position
  config.push({
    id: 99,
    word: liability.name,
    row: redRow,
    col: redCol,
    w: 2,
    h: 1,
    type: "liability",
    liabilityData: liability
  });

  return { blocks: config, liability };
}

export default function BlockGame() {
  const [level, setLevel] = useState(1);
  const [currentLiability, setCurrentLiability] = useState(null);
  const [blocks, setBlocks] = useState([]);
  const [won, setWon] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [moves, setMoves] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef(null);

  useEffect(() => {
    const { blocks: newBlocks, liability } = generateLevel();
    setBlocks(newBlocks);
    setCurrentLiability(liability);
    setWon(false);
    setMoves(0);
    setSelectedBlock(null);
  }, [level]);

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

  function endDrag(e) {
    if (!dragRef.current) {
      setIsDragging(false);
      return;
    }

    const clientX = e.clientX ?? e.changedTouches?.[0]?.clientX ?? dragRef.current.x;
    const clientY = e.clientY ?? e.changedTouches?.[0]?.clientY ?? dragRef.current.y;

    const dx = clientX - dragRef.current.x;
    const dy = clientY - dragRef.current.y;

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

  function handleDragMove(e) {
    if (!dragRef.current || dragRef.current.moved) return;

    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY;

    const dx = clientX - dragRef.current.x;
    const dy = clientY - dragRef.current.y;

    if (Math.abs(dx) >= DRAG_THRESHOLD || Math.abs(dy) >= DRAG_THRESHOLD) {
      const dir =
        Math.abs(dx) > Math.abs(dy)
          ? dx > 0 ? "right" : "left"
          : dy > 0 ? "down" : "up";

      moveBlock(dragRef.current.id, dir);
      
      dragRef.current.x = clientX;
      dragRef.current.y = clientY;
    }
  }

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

  function handleNextLevel() {
    setLevel(prev => prev + 1);
    setWon(false);
  }

  if (!currentLiability) return null;

  // FIXED CENTER EXIT ROW - Always row 4 (center of 8x8 grid)
  const FIXED_EXIT_ROW = 4;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2c1810] via-[#3d2415] to-[#1a0f08] flex flex-col items-center justify-center p-4 font-['Fredoka',sans-serif]">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap');
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(239, 68, 68, 0.5); }
          50% { box-shadow: 0 0 30px rgba(239, 68, 68, 0.8); }
        }
        
        .block-enter {
          animation: slideIn 0.3s ease-out;
        }
        
        .liability-block {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>

      {/* Stats Bar */}
      <div className="mb-4 flex gap-4 animate-[slideIn_0.6s_ease-out]">
        <div className="bg-gradient-to-r from-[#654321] to-[#8b5a3c] px-6 py-3 rounded-full border-2 border-[#4a2511] shadow-lg">
          <span className="text-white font-semibold text-lg">
            Level: <span className="text-[#ffd700] font-bold">{level}</span>
          </span>
        </div>
        <div className="bg-gradient-to-r from-[#654321] to-[#8b5a3c] px-6 py-3 rounded-full border-2 border-[#4a2511] shadow-lg">
          <span className="text-white font-semibold text-lg">
            Moves: <span className="text-[#ffd700] font-bold">{moves}</span>
          </span>
        </div>
      </div>

      {/* BOARD WITH THIN EXIT STRIP */}
      <div className="relative animate-[slideIn_0.5s_ease-out]">
        <div className="flex items-center">
          {/* Main Board */}
          <div 
            className="relative bg-gradient-to-br from-[#8b5a3c] to-[#6b4423] border-[6px] border-[#4a2511] rounded-lg shadow-2xl"
            style={{
              width: GRID * CELL,
              height: GRID * CELL,
              boxShadow: '0 20px 60px rgba(0,0,0,0.6), inset 1px 2px 10px rgba(255,255,255,0.1)'
            }}
          >
            {/* Grid lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
              {[...Array(GRID + 1)].map((_, i) => (
                <g key={i}>
                  <line x1={i * CELL} y1="0" x2={i * CELL} y2={GRID * CELL} stroke="#000" strokeWidth="1" />
                  <line x1="0" y1={i * CELL} x2={GRID * CELL} y2={i * CELL} stroke="#000" strokeWidth="1" />
                </g>
              ))}
            </svg>

            {/* Blocks with proper spacing - NO OVERLAP */}
            {blocks.map(b => (
              <div
                key={b.id}
                onMouseDown={(e) => startDrag(b, e)}
                onTouchStart={(e) => startDrag(b, e)}
                onClick={() => !isDragging && setSelectedBlock(b.id)}
                className={`
                  absolute flex items-center justify-center
                  text-black font-medium font-size-sm rounded-md
                  select-none cursor-grab active:cursor-grabbing
                  transition-all duration-300 ease-out
                  block-enter
                  ${selectedBlock === b.id ? 'ring-4 ring-yellow-400 z-30 scale-105' : ''}
                  ${b.type === "liability" 
                    ? "bg-gradient-to-br from-red-600 to-red-800 liability-block text-white" 
                    : "bg-gradient-to-br from-[#d4a574] to-[#c19a6b]"
                  }
                `}
                style={{
                  width: b.w * CELL - 8,
                  height: b.h * CELL - 8,
                  left: b.col * CELL + 4,
                  top: b.row * CELL + 4,
                  fontSize: '0.65rem',
                  boxShadow: b.type === "liability" 
                    ? '0 6px 20px rgba(239, 68, 68, 0.7), inset 0 -2px 5px rgba(0,0,0,0.3)' 
                    : '0 4px 12px rgba(0,0,0,0.4), inset 0 2px 5px rgba(255,255,255,0.2)',
                  zIndex: b.type === "liability" ? 25 : (selectedBlock === b.id ? 30 : 10)
                }}
              >
                <span className="px-2 text-center  leading-tight drop-shadow-sm break-words">
                  {b.word}
                </span>
              </div>
            ))}
          </div>

          {/* THIN EXIT STRIP WITH FIXED BLACK ARROW AT CENTER */}
          <div 
            className="relative bg-gradient-to-r from-[#6b4423] to-[#5a3618] border-y-[6px] border-r-[6px] border-[#4a2511] rounded-r-lg flex items-center justify-center"
            style={{
              width: '30px',
              height: GRID * CELL,
              marginLeft: '-6px'
            }}
          >
            {/* FIXED Black Arrow at Grid Center (Row 4) */}
            <div 
              className="absolute flex items-center justify-center"
              style={{
                top: `${FIXED_EXIT_ROW * CELL}px`,
                height: `${CELL}px`,
                width: '100%'
              }}
            >
              <div className="text-black text-4xl font-bold">→</div>
            </div>
          </div>
        </div>

        {/* Instructions
        <div className="mt-4 text-center text-[#d4a574] text-sm">
          <p>Drag blocks or use arrow keys • Get the red block to exit →</p>
        </div>
        */}
      </div>

      {/* WIN MODAL */}
      {won && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-[slideIn_0.3s_ease-out] backdrop-blur-sm p-4">
          <div className="bg-gradient-to-br from-white to-gray-100 p-8 rounded-2xl w-[90%] max-w-[500px] text-center shadow-2xl border-4 border-yellow-400 animate-[pulse_0.5s_ease-out]">
            
            <div className="text-6xl mb-4">You Won 🎉</div>

            <h2 className="text-2xl md:text-3xl font-bold text-red-600 mb-4">
              {currentLiability.name}
            </h2>

            <div className="bg-blue-50 p-4 rounded-lg mb-4 border-2 border-blue-200">
              <p className="text-gray-800 text-sm md:text-base leading-relaxed">
                <strong>Definition:</strong> {currentLiability.definition}
              </p>
            </div>

            <div className="bg-red-50 p-4 rounded-lg mb-6 border-2 border-red-200">
              <p className="text-red-600 font-semibold text-sm md:text-base leading-relaxed">
                <strong>⚠️ Why It's Bad:</strong> {currentLiability.whyBad}
              </p>
            </div>

            <div className="mb-4 text-gray-600">
              <p className="text-lg">Completed in <span className="font-bold text-green-600">{moves}</span> moves!</p>
            </div>

            <button
              onClick={handleNextLevel}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-200 active:scale-95"
            >
              Next Level
            </button>
          </div>
        </div>
      )}
    </div>
  );
}