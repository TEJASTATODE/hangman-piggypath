const quizData = [
  // =====================
  // PART 1: MCQs (1–30)
  // =====================
  {
    question: "What is a 'Bull Market'?",
    options: [
      "A market where prices are falling",
      "A market where prices are rising",
      "A market that is closed for holidays",
      "A market for trading livestock",
    ],
    correctIndex: 1,
  },
  {
    question: "Which of the following is considered a 'Liability'?",
    options: [
      "Cash in hand",
      "A paid-off car",
      "Credit card debt",
      "Stocks owned",
    ],
    correctIndex: 2,
  },
  {
    question: "What does 'IPO' stand for?",
    options: [
      "Initial Public Offering",
      "International Profit Organization",
      "Internal Policy Order",
      "Interest Payment Option",
    ],
    correctIndex: 0,
  },
  {
    question:
      "Which financial statement shows a company's assets and liabilities at a specific point in time?",
    options: [
      "Income Statement",
      "Cash Flow Statement",
      "Balance Sheet",
      "Audit Report",
    ],
    correctIndex: 2,
  },
  {
    question: "Diversification is best described as:",
    options: [
      "Putting all your money in one safe stock",
      "Buying only tech stocks",
      "Spreading investments across different assets to reduce risk",
      "Investing only in your own country",
    ],
    correctIndex: 2,
  },
  {
    question: "What is a 'Dividend'?",
    options: [
      "A fee paid to a broker",
      "A portion of profits distributed to shareholders",
      "A tax paid to the government",
      "The interest on a loan",
    ],
    correctIndex: 1,
  },
  {
    question: "If you want higher potential returns, you generally have to accept:",
    options: [
      "Lower taxes",
      "Higher risk",
      "Less liquidity",
      "Guaranteed income",
    ],
    correctIndex: 1,
  },
  {
    question: "What is the primary purpose of Insurance?",
    options: [
      "To make a quick profit",
      "To avoid paying taxes",
      "To transfer risk from an individual to a company",
      "To increase your credit score",
    ],
    correctIndex: 2,
  },
  {
    question: "Which of these is the most liquid asset?",
    options: [
      "A house",
      "A rare painting",
      "Cash in a savings account",
      "A 10-year government bond",
    ],
    correctIndex: 2,
  },
  {
    question: "Blue Chip stocks refer to:",
    options: [
      "Stocks that are very cheap",
      "Shares of large, well-established companies",
      "Companies that manufacture computer chips",
      "High-risk startup companies",
    ],
    correctIndex: 1,
  },
  {
    question: "What does the P/E Ratio measure?",
    options: [
      "How much debt a company has",
      "Stock price relative to earnings per share",
      "Total profit of the company",
      "Dividend payout percentage",
    ],
    correctIndex: 1,
  },
  {
    question:
      "In the context of bonds, what happens when market interest rates rise?",
    options: [
      "Bond prices usually fall",
      "Bond prices usually rise",
      "Bond prices remain the same",
      "Bond maturity date changes",
    ],
    correctIndex: 0,
  },
  {
    question: "What is short selling?",
    options: [
      "Selling a stock you owned briefly",
      "Selling a stock you do not own",
      "Selling shares to pay debts",
      "Buying small quantities of stock",
    ],
    correctIndex: 1,
  },
  {
    question:
      "Which index tracks the top 500 largest companies in the US?",
    options: [
      "Dow Jones",
      "Nasdaq 100",
      "S&P 500",
      "Russell 2000",
    ],
    correctIndex: 2,
  },
  {
    question:
      "What is the difference between real and nominal returns?",
    options: [
      "Real returns are guaranteed",
      "Real returns account for inflation",
      "Nominal returns account for taxes",
      "There is no difference",
    ],
    correctIndex: 1,
  },
  {
    question: "Beta measures:",
    options: [
      "Profitability",
      "Dividend yield",
      "Volatility relative to the market",
      "Credit rating",
    ],
    correctIndex: 2,
  },
  {
    question: "What does EBITDA stand for?",
    options: [
      "Earnings Before Interest, Taxes, Depreciation, and Amortization",
      "Equity Bond Interest Tax Deductible Assets",
      "Estimated Business Income Tax & Debt Analysis",
      "Earnings Before Income & Debt Adjustment",
    ],
    correctIndex: 0,
  },
  {
    question: "A Mutual Fund is:",
    options: [
      "A loan between friends",
      "An investment pool managed professionally",
      "A government grant",
      "A savings account",
    ],
    correctIndex: 1,
  },
  {
    question: "Which sector does a pharmaceutical company fall under?",
    options: [
      "Consumer Discretionary",
      "Healthcare",
      "Industrials",
      "Utilities",
    ],
    correctIndex: 1,
  },
  {
    question: "What is compounding?",
    options: [
      "Earning interest on interest",
      "Manual savings",
      "Loss due to inflation",
      "Paying loan early",
    ],
    correctIndex: 0,
  },

  // =====================
  // PART 2: SCENARIO BASED (31–40)
  // =====================
  {
    question:
      "Interest rates rise significantly. What happens to prices of existing bonds?",
    options: ["Increase", "Decrease", "Remain the same"],
    correctIndex: 1,
  },
  {
    question:
      "Company announces stock buyback while net income remains constant. What happens to EPS?",
    options: ["Increase", "Decrease", "Remain the same"],
    correctIndex: 0,
  },
  {
    question:
      "Inflation rises to 10% but salary remains same. What happens to purchasing power?",
    options: ["Increase", "Decrease", "Remain the same"],
    correctIndex: 1,
  },
  {
    question:
      "A company performs a stock split. What happens to total investment value?",
    options: ["Increase", "Decrease", "Remain the same"],
    correctIndex: 2,
  },
  {
    question:
      "Government decreases corporate tax rates. What happens to net profit?",
    options: ["Increase", "Decrease", "Remain the same"],
    correctIndex: 0,
  },
  {
    question:
      "Demand for a currency falls while supply remains constant. What happens to its value?",
    options: ["Increase", "Decrease", "Remain the same"],
    correctIndex: 1,
  },
  {
    question:
      "Portfolio shifts from stocks to government bonds. What happens to risk?",
    options: ["Increase", "Decrease", "Remain the same"],
    correctIndex: 1,
  },
  {
    question:
      "Company sells more units with fixed costs. What happens to fixed cost per unit?",
    options: ["Increase", "Decrease", "Remain the same"],
    correctIndex: 1,
  },
  {
    question:
      "Company takes massive new debt. What happens to debt-to-equity ratio?",
    options: ["Increase", "Decrease", "Remain the same"],
    correctIndex: 0,
  },
  {
    question:
      "Stock price rises but dividend remains same. What happens to dividend yield?",
    options: ["Increase", "Decrease", "Remain the same"],
    correctIndex: 1,
  },

    // =====================
  // PART 3: MATCH THE PAIR
  // =====================

  {
    type: "match",
    title: "Match the Following – Market Basics",
    pairs: [
      { left: "Bull Market", right: "Optimistic market, rising prices" },
      { left: "Bear Market", right: "Pessimistic market, falling prices" },
      { left: "Volatility", right: "Rapid and unpredictable price swings" },
      { left: "Liquidity", right: "How easily an asset converts to cash" },
      { left: "Diversification", right: "Don't put all your eggs in one basket" },
    ],
  },

  {
    type: "match",
    title: "Match the Following – Financial Analysis",
    pairs: [
      { left: "Asset", right: "Something you own that has value" },
      { left: "Liability", right: "Something you owe (debt)" },
      { left: "Equity", right: "Assets minus Liabilities (Ownership)" },
      { left: "Revenue", right: "Top line income from sales" },
      { left: "Profit", right: "Bottom line earnings after expenses" },
    ],
  },

  {
    type: "match",
    title: "Match the Following – Investment Vehicles",
    pairs: [
      { left: "Stock", right: "Ownership share in a corporation" },
      { left: "Bond", right: "A loan made by an investor to a borrower" },
      { left: "Mutual Fund", right: "Pooled money managed by professionals" },
      { left: "ETF", right: "A basket of securities that trades like a stock" },
      { left: "REIT", right: "Company that owns income-producing real estate" },
    ],
  },

  {
    type: "match",
    title: "Match the Following – Economic Concepts",
    pairs: [
      { left: "Inflation", right: "Rise in prices, fall in purchasing power" },
      { left: "Recession", right: "Significant economic decline lasting months" },
      { left: "GDP", right: "Total value of goods and services produced" },
      { left: "Interest Rate", right: "The cost of borrowing money" },
      { left: "Deflation", right: "General decline in price levels" },
    ],
  },

  {
    type: "match",
    title: "Match the Following – Accounting Terms",
    pairs: [
      { left: "Balance Sheet", right: "Snapshot of Assets, Liabilities, Equity" },
      { left: "Income Statement", right: "Report of Revenue and Expenses over time" },
      { left: "Cash Flow Statement", right: "Tracks movement of cash in and out" },
      { left: "Depreciation", right: "Expensing an asset's cost over its life" },
      { left: "Audit", right: "Official examination of financial records" },
    ],
  },

  {
    type: "match",
    title: "Match the Following – Key Financial Ratios",
    pairs: [
      { left: "P/E Ratio", right: "Price per share divided by earnings per share" },
      { left: "Debt-to-Equity", right: "Comparison of total liabilities to equity" },
      { left: "ROI", right: "Net profit divided by cost of investment" },
      { left: "Current Ratio", right: "Current assets divided by current liabilities" },
      { left: "Dividend Yield", right: "Annual dividend divided by share price" },
    ],
  },

  {
    type: "match",
    title: "Match the Following – Risk & Return",
    pairs: [
      { left: "Risk Tolerance", right: "An investor's ability to handle loss" },
      { left: "Capital Gain", right: "Profit from selling an asset at higher price" },
      { left: "Capital Loss", right: "Selling an asset for less than purchase price" },
      { left: "Portfolio", right: "A collection of all your investments" },
      { left: "Hedge", right: "Investment to reduce risk of adverse moves" },
    ],
  },
];

export default quizData;
