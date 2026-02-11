import { useNavigate } from "react-router-dom";
import bg from "../assets/bg2.jpg";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      
      {/* Top Half - Background Image with Title */}
      <div
        style={{ backgroundImage: `url(${bg})` }}
        className="h-[39vh] bg-cover bg-center relative flex items-center justify-center"
      >
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/30"></div>
        
 
       <h1 className="relative z-10 text-4xl md:text-6xl font-black tracking-[0.3em] text-white drop-shadow-2xl" style={{ WebkitTextStroke: '3px black' }}>
          Debt Defier
        </h1>
      </div>

   
      <div className="relative">
        <svg
          className="absolute top-0 w-full"
          style={{ marginTop: "-1px" }}
          viewBox="0 0 1440 100"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0,50 Q360,0 720,50 T1440,50 L1440,100 L0,100 Z"
            fill="#F5E6D3"
          />
        </svg>
      </div>

      {/* Bottom Half - Cream/Beige Section */}
      <div className="flex-1 bg-[#F5E6D3] relative flex items-start justify-center px-10 pt-20">
        
        {/* Green Smiley Face - Positioned at the top */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-24 h-24 rounded-full bg-[#00C853] flex items-center justify-center text-5xl shadow-2xl border-4 border-[#F5E6D3]">
            😊
          </div>
        </div>

        {/* Content Container */}
        <div className="flex flex-col items-center w-full max-w-lg mt-1">
          
          {/* Description Text - Below emoji */}
        <div
  className="text-gray-900
  text-lg md:text-xl
  font-semibold tracking-wide
  mb-8 leading-relaxed
  px-4 max-w-[600px]
  text-left space-y-3"
>

  <p>1.The Box: This represents the Total Capital of the business.</p>

  <p>2. Wooden Blocks: These are your Assets (Cash, Property, Equipment),they stay in the box.</p>

  <p>3. Red Blocks: These are your Liabilities (Loans, Debts, Payables). These must be removed.
.</p>
  <p>4. You Win by clearing the box of all Red blocks to achieve a "Debt-Free" status.</p>

</div>

          {/* Play Button - Below text */}
          <button
            onClick={() => navigate("/play")}
            className="px-15 py-3.5 bg-[#00C853] hover:bg-[#00B248] 
            rounded-full text-white text-xl font-bold tracking-wide
            shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl
            active:scale-95"
          >
            PLAY
          </button>

        </div>
      </div>

    </div>
  );
}