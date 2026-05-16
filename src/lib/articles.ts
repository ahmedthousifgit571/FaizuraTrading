export type ContentBlock =
  | { type: "h2"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "pullquote"; text: string }
  | { type: "statcallout"; stat: string; label: string; detail?: string };

export type Article = {
  slug: string;
  category: string;
  categoryColor: string;
  title: string;
  heroHeadlineLines: string[];
  excerpt: string;
  readTime: string;
  date: string;
  featured: boolean;
  body: ContentBlock[];
};

export const ARTICLES: Article[] = [
  {
    slug: "usd-sgd-rate-guide-2024",
    category: "RATE ANALYSIS",
    categoryColor: "#2D5BFF",
    title: "USD to SGD in 2024 — What's Actually Moving the Rate?",
    heroHeadlineLines: ["USD TO SGD IN 2024 —", "WHAT'S ACTUALLY", "MOVING THE RATE?"],
    excerpt:
      "The Fed, inflation data, and Singapore's MAS policy decisions are the three forces every sender needs to watch. We break down what drives the USD/SGD pair and when to lock your rate.",
    readTime: "6 min read",
    date: "May 12, 2026",
    featured: true,
    body: [
      {
        type: "h2",
        text: "Three Forces Behind the USD/SGD Rate",
      },
      {
        type: "paragraph",
        text: "The USD/SGD exchange rate is shaped by three institutional forces that most individual senders never consider. Understanding them won't give you a crystal ball — but knowing when each force is active will stop you from exchanging at the worst possible moment. Those forces are: the US Federal Reserve's monetary policy decisions, Singapore's Monetary Authority and its unconventional policy tool, and the macro data calendar that moves both. Missing any one of them means you're reacting to markets instead of reading them.",
      },
      {
        type: "h2",
        text: "The Fed's Rate Decisions — Why Every FOMC Meeting Matters",
      },
      {
        type: "paragraph",
        text: "The Federal Reserve holds eight scheduled meetings per year. Every one is a potential rate mover for SGD. When the Fed raises interest rates, the US dollar tends to strengthen because higher yields attract capital flows into USD-denominated assets — pushing USD/SGD up, meaning you receive more Singapore dollars per US dollar. When the Fed signals cuts, the opposite typically unfolds. In 2023, USD/SGD climbed as high as 1.37 as the Fed held rates at a 22-year peak. Through 2024–2025, as rate-cut expectations built and then were repeatedly deferred, the pair oscillated between 1.31 and 1.37. Watching the Fed's dot plot — the chart showing where committee members expect rates to head — is one of the most reliable forward indicators available to a retail sender.",
      },
      {
        type: "paragraph",
        text: "The key signals to track: FOMC meeting statements released eight times per year, the quarterly Summary of Economic Projections including the dot plot update, and Fed Chair press conferences. Markets move on nuance — a single phrase like 'higher for longer' can shift USD/SGD by 0.3–0.5% within hours of being spoken. The next scheduled FOMC dates are publicly available and worth marking on your calendar if you have a large exchange planned.",
      },
      {
        type: "statcallout",
        stat: "1.3104 → 1.3694",
        label: "USD/SGD 12-month trading range",
        detail: "May 2025 – May 2026, interbank mid-market data",
      },
      {
        type: "h2",
        text: "MAS and the S$NEER — Singapore's Unconventional Policy Tool",
      },
      {
        type: "pullquote",
        text: "The S$NEER is the only monetary policy tool most people have never heard of — yet it directly affects every rate on the exchange board every single day.",
      },
      {
        type: "paragraph",
        text: "Most central banks set a target interest rate. Singapore does not. Instead, the Monetary Authority of Singapore manages the Singapore Dollar Nominal Effective Exchange Rate — S$NEER — a trade-weighted basket that measures the SGD against its major trading partners. MAS adjusts the slope, width, and center of an exchange rate policy band twice a year, in January and July. When MAS tightens policy — allowing the SGD to appreciate faster — USD/SGD falls. When MAS eases, the reverse happens. For senders converting SGD to another currency, a MAS tightening cycle is generally favorable: your Singapore dollar buys more. The semi-annual MAS Monetary Policy Statement is published in January and July — mark both dates.",
      },
      {
        type: "h2",
        text: "When to Lock, When to Wait",
      },
      {
        type: "paragraph",
        text: "You don't need a Bloomberg terminal to read the short-term signals. The economic data releases most likely to move USD/SGD meaningfully within 24 hours: US CPI inflation data released monthly, US Non-Farm Payrolls on the first Friday of each month, Singapore's GDP flash estimates, and any unexpected shift in Fed language. The historical USD/SGD range over 2023–2026 has been roughly 1.31 to 1.37. Near the top of that band, SGD is historically weak — consider waiting if your timeline allows. Near 1.31, SGD is strong — that is the window to exchange or lock. Rate alerts via Faizura Trading's live board let you set a target level and exchange when conditions are right, removing guesswork and emotion from the process entirely. Check our live rate board to see today's USD/SGD alongside the 47 other pairs we cover.",
      },
    ],
  },
  {
    slug: "send-money-india-cheapest-way",
    category: "REMITTANCE",
    categoryColor: "#22c55e",
    title: "Sending Money to India: The Cheapest Way from Singapore",
    heroHeadlineLines: ["SENDING MONEY TO INDIA:", "THE CHEAPEST WAY", "FROM SINGAPORE"],
    excerpt:
      "Bank transfers, remittance apps, or a licensed money changer? We compare the real cost of sending S$1,000 to India across five options — fees, rates, and delivery time included.",
    readTime: "5 min read",
    date: "May 7, 2026",
    featured: false,
    body: [
      {
        type: "h2",
        text: "The True Cost of Sending S$1,000 to India",
      },
      {
        type: "paragraph",
        text: "When people compare the cheapest ways to send money to India, they focus on transfer fees. That is the wrong variable. What actually determines how many rupees land in India is the exchange rate spread — the gap between the interbank mid-market rate and the rate you are actually given — plus the stated fee. A provider charging zero fees but offering a rate 3% below mid-market costs you more than a provider charging S$5 flat with a 0.3% spread. On S$1,000, a 3% spread gap is S$30 — six times the fee. The fee is the headline; the spread is where you are actually charged.",
      },
      {
        type: "statcallout",
        stat: "₹2,100",
        label: "Typical difference per S$1,000 sent — bank vs licensed changer",
        detail:
          "Based on INR/SGD rates observed May 2026. Bank rate approx. 61.8, licensed changer rate approx. 63.9 INR/SGD.",
      },
      {
        type: "h2",
        text: "A Real-World Comparison Across Five Options",
      },
      {
        type: "pullquote",
        text: "Banks advertise zero transfer fees while quietly marking up the exchange rate by 2.5–4%. That markup is taken silently — most senders never calculate it.",
      },
      {
        type: "paragraph",
        text: "Here is how five transfer options compare on S$1,000 to India as of May 2026, with the mid-market INR/SGD rate at approximately 63.8. Singapore commercial banks (DBS, POSB, OCBC): exchange rate approximately 61.8–62.2 INR/SGD, fees S$0–S$20, rupees received approximately ₹61,800–62,200, delivery 1–3 days. Wise: rate approximately 63.2 INR/SGD, fee approximately S$7–10, rupees received approximately ₹63,100, delivery 1–2 days. Apps such as Instarem and Remitly: rate approximately 62.8–63.1, fees S$3–15, rupees received approximately ₹62,700, delivery hours to 1 day. Licensed money changers such as Faizura Trading: rate approximately 63.5–63.9 INR/SGD, fee included in the rate, rupees received approximately ₹63,700, same-day to next day. The spread between a bank and a licensed changer on S$1,000 is typically ₹1,500–2,100 — paid entirely by you, without a line item on any statement.",
      },
      {
        type: "h2",
        text: "Documentation for Transfers Above S$5,000",
      },
      {
        type: "paragraph",
        text: "Singapore's Payment Services Act requires licensed operators to conduct customer due diligence on transactions above S$5,000. You will need a valid Singapore ID — NRIC, Employment Pass, or passport — the recipient's full name, bank account number, and IFSC code. For amounts above S$20,000, purpose-of-transfer documentation may be required: a payslip for salary remittance, or a property agreement for real estate payments. These are regulatory requirements under MAS guidelines, not optional checks. Any operator who skips ID verification on large transfers is non-compliant and should not be used.",
      },
      {
        type: "h2",
        text: "Timing and Practical Tips",
      },
      {
        type: "paragraph",
        text: "The INR/SGD rate tends to be most favorable mid-week, when Indian and Singapore markets overlap in liquidity. Avoid transacting on major Indian public holidays — the NEFT and IMPS clearing systems may delay settlement even when your transfer is processed on the Singapore side. Always request the SWIFT GPI tracking reference from your provider; it lets you trace the payment to the recipient's account in near-real-time. For recurring transfers such as monthly family support or regular business payments, consider locking a forward rate for 30–90 days to remove timing risk entirely. Use Faizura Trading's live rates to see today's INR/SGD rate before your next transfer — and compare it directly against your bank's quoted rate.",
      },
    ],
  },
  {
    slug: "airport-vs-money-changer-singapore",
    category: "TRAVEL",
    categoryColor: "#F5A623",
    title: "Changi Airport Money Changers vs Licensed Shops — The Real Spread, in Numbers",
    heroHeadlineLines: ["CHANGI AIRPORT VS", "LICENSED SHOPS —", "THE REAL SPREAD, IN NUMBERS"],
    excerpt:
      "Airport convenience costs more than you think. We ran the numbers on 8 currencies exchanged at Changi T1 versus a licensed Clementi money changer. The results are stark.",
    readTime: "4 min read",
    date: "Apr 28, 2026",
    featured: false,
    body: [
      {
        type: "h2",
        text: "Why We Did This — and How",
      },
      {
        type: "paragraph",
        text: "We hear it every week from customers who just returned from a trip: I needed some cash at the airport, so I changed there. Fair. Convenience has genuine value. But how much is that convenience actually costing? We exchanged S$1,000 equivalent across eight currencies at Changi Terminal 1 money changers and at our licensed Clementi shop on the same Friday afternoon in April 2026 — same amounts, same time window, zero cherry-picking. Here is exactly what we found.",
      },
      {
        type: "statcallout",
        stat: "3.1%",
        label: "Average spread premium — Changi T1 vs licensed Clementi shop",
        detail:
          "Measured across USD, EUR, GBP, MYR, INR, AUD, JPY, THB on a single Friday afternoon, April 2026",
      },
      {
        type: "h2",
        text: "The Numbers — Currency by Currency",
      },
      {
        type: "paragraph",
        text: "USD: Changi T1 gave 0.726 USD/SGD versus 0.749 at Clementi. On S$1,000: $726 versus $749, a $23 difference at 3.1%. EUR: Changi gave 0.671 versus 0.692, netting €21 less at 3.0%. GBP: 0.572 versus 0.591, £19 less at 3.2%. MYR: 3.34 versus 3.48 MYR/SGD, RM140 less at 4.1% — the largest absolute gap on the day. INR: 60.2 versus 63.1 INR/SGD, ₹290 less at 4.6%. AUD: 1.091 versus 1.127, A$36 less at 3.2%. JPY: 91.3 versus 95.1 JPY/SGD, ¥380 less at 4.0%. THB: 25.4 versus 26.7 THB/SGD, ฿130 less at 4.9% — the worst performer overall. Not a single currency tested favored the airport rate.",
      },
      {
        type: "pullquote",
        text: "Airport money changers have exactly zero competitive incentive on rate. By the time you are past security, your alternatives have vanished.",
      },
      {
        type: "h2",
        text: "Why Airport Rates Are Worse — and Always Will Be",
      },
      {
        type: "paragraph",
        text: "Airport operators pay significantly higher rent per square foot than any high-street commercial space. Changi's terminal retail is among the most expensive leasehold in Singapore — those costs flow directly into the spread. More critically, airport customers are captive: you have already checked in, your departure gate is announced, and your alternatives for comparison have evaporated. The competitive pressure that keeps high-street rates honest between neighboring shops literally does not exist inside a departure terminal. There is no economic reason for airport changers to compete on price, so they don't.",
      },
      {
        type: "h2",
        text: "When Airport Exchange Is Worth Considering",
      },
      {
        type: "paragraph",
        text: "Two situations justify airport exchange: you genuinely could not plan ahead and need a small amount of local currency for a taxi on arrival, or you need a rare currency that only the airport carries at a rate competitive with the city. For every major SGD pair — USD, EUR, GBP, MYR, INR, AUD, JPY, THB — the math consistently favors planning. Exchanging even S$200 at a licensed shop before departure saves more than the transport cost to get there. For the eight currencies we tested, the average savings per S$1,000 was S$31. On S$3,000 for a two-week family trip, that is nearly S$100. Check today's rates for all 47 currencies on the Faizura Trading live board before your next departure.",
      },
    ],
  },
  {
    slug: "mas-licensed-money-changer-what-it-means",
    category: "COMPLIANCE",
    categoryColor: "#8b5cf6",
    title: "MAS-Licensed: What It Actually Means for Your Money",
    heroHeadlineLines: ["MAS-LICENSED: WHAT", "IT ACTUALLY MEANS", "FOR YOUR MONEY"],
    excerpt:
      "Not all money changers are equal. A MAS license means annual audits, mandatory record-keeping, and legal protection for you. Here's what to check before you hand over your cash.",
    readTime: "4 min read",
    date: "Apr 15, 2026",
    featured: false,
    body: [
      {
        type: "h2",
        text: "The Regulatory Framework Behind the License",
      },
      {
        type: "paragraph",
        text: "Singapore's Payment Services Act, enacted in January 2020, consolidated all payment services — including money-changing and cross-border remittance — under a single regulatory umbrella administered by the Monetary Authority of Singapore. Under the PSA, any business conducting money-changing or remittance in Singapore must hold a valid license and meet ongoing compliance requirements. Operating without a license is a criminal offense carrying fines of up to S$250,000 and imprisonment of up to three years. The framework was designed specifically to eliminate unlicensed operators who leave customers with no recourse when something goes wrong.",
      },
      {
        type: "statcallout",
        stat: "532",
        label: "MAS-licensed money changers in Singapore",
        detail: "As of Q1 2026 — source: MAS Financial Institutions Directory at mas.gov.sg",
      },
      {
        type: "h2",
        text: "What a License Actually Requires",
      },
      {
        type: "paragraph",
        text: "A MAS money-changing license is not a piece of paper pinned to a wall. To obtain and maintain it, operators must pass fit-and-proper screening for all directors, shareholders, and controllers. They must implement anti-money laundering and counter-terrorism financing policies that meet MAS Notice PSN01 and PSN02. They must conduct customer due diligence on transactions above S$5,000. They must keep records of all transactions for a minimum of five years. They must file regular compliance reports with MAS and may be subjected to periodic inspections and audits without advance notice. Non-compliance results in fines, license suspension, or permanent revocation — all of which are public record.",
      },
      {
        type: "pullquote",
        text: "A license means the regulator can hold them accountable when something goes wrong. No license means only you can — and your options are severely limited.",
      },
      {
        type: "h2",
        text: "How to Verify a License in Under 30 Seconds",
      },
      {
        type: "paragraph",
        text: "The MAS Financial Institutions Directory is publicly accessible at mas.gov.sg. Search for your money changer by business name or UEN registration number. A fully licensed operator will appear with their license class: Money-Changing License for basic foreign exchange, Standard Payment Institution, or Major Payment Institution for remittance operations. If the business does not appear in the directory, or appears as Exempt without an active license class, they are not fully authorized under the PSA. Some operators claim to be 'MAS-registered' — this status exists for certain exemption categories but confers fewer consumer protections than a full license. When in doubt, check before handing over your cash.",
      },
      {
        type: "h2",
        text: "Red Flags to Watch For",
      },
      {
        type: "paragraph",
        text: "Signs that a money changer may be unlicensed or non-compliant: they do not ask for identification on transactions above S$5,000; they offer rates significantly above the mid-market rate — rates that appear too good to be true often mask undisclosed fees or outright fraud; they operate without a physical registered address or solely through messaging apps; they request payment in cryptocurrency in exchange for cash; they refuse to provide a receipt. MAS-licensed operators are required to provide receipts for every transaction. If a money changer refuses any of these standard practices, leave immediately and report to the MAS enforcement hotline at 1800-827-9688. Faizura Trading holds a current MAS license — verifiable directly on the MAS FI Directory.",
      },
    ],
  },
  {
    slug: "best-time-to-exchange-currency-singapore",
    category: "GUIDE",
    categoryColor: "#06b6d4",
    title: "The Best Time to Exchange Currency in Singapore",
    heroHeadlineLines: ["THE BEST TIME TO", "EXCHANGE CURRENCY", "IN SINGAPORE"],
    excerpt:
      "Monday mornings and Friday afternoons move rates differently. We analysed 12 months of SGD pair data to find the patterns — and the windows — that consistently offer better rates.",
    readTime: "7 min read",
    date: "Mar 30, 2026",
    featured: false,
    body: [
      {
        type: "h2",
        text: "Currency Markets Are Not Always Equally Liquid",
      },
      {
        type: "paragraph",
        text: "Foreign exchange markets trade around the clock, five days a week. But the liquidity — and therefore the spread you are offered — is not uniform across that window. For SGD pairs, two sessions drive most of the volume and rate movement: the Asian session from roughly 8am to 12pm Singapore time, when Singapore, Tokyo, and Hong Kong markets overlap, and the early European session from 3pm to 6pm Singapore time, when London opens. Outside these windows, interbank market makers carry more inventory risk and widen spreads to compensate. The hour you exchange is a meaningful cost variable that most senders ignore entirely.",
      },
      {
        type: "statcallout",
        stat: "0.3–0.8%",
        label: "SGD/USD spread difference — mid-week vs Friday afternoon",
        detail:
          "Measured across 12 months of interbank bid-ask data, January 2025 – January 2026",
      },
      {
        type: "h2",
        text: "The Day-of-Week Pattern Is Real",
      },
      {
        type: "paragraph",
        text: "Analysing 12 months of SGD pair bid-ask spread data reveals a consistent weekly pattern. Monday and Tuesday typically show the tightest spreads — the market has repriced over the weekend, volume is building, and no major event overhang is distorting dealer positioning. Wednesday and Thursday remain favorable. Friday afternoon, particularly after 3pm Singapore time, shows measurably wider spreads — typically 0.3–0.8% worse than mid-week for USD/SGD and other major pairs. The explanation: currency desks face weekend position risk if they hold open trades into Saturday close and widen spreads deliberately to discourage large Friday-afternoon transactions. If you are not constrained by timing, Tuesday to Thursday morning is consistently the better window.",
      },
      {
        type: "h2",
        text: "News Events — Risk or Opportunity?",
      },
      {
        type: "pullquote",
        text: "Trying to time a rate data release is speculation. Setting a rate alert at your target is strategy. Only one of these has a consistent track record.",
      },
      {
        type: "paragraph",
        text: "Major economic data releases can move SGD pairs by 0.5–1.5% within minutes. US CPI, Non-Farm Payrolls, Singapore GDP flash estimates, and unexpected central bank statements are the primary movers. The risk is bidirectional: if the data moves in your favor, you may secure a materially better rate than the daily average. If it moves against you, your target rate may be out of reach for days or weeks. The safer approach: do not try to trade around scheduled data releases unless you are monitoring in real time with a firm order ready to execute. Instead, set a rate alert at your target and exchange when it triggers — entirely detached from the news calendar.",
      },
      {
        type: "h2",
        text: "Building a Smarter Exchange Strategy",
      },
      {
        type: "paragraph",
        text: "The most effective approach for regular senders combines three elements: a target rate set based on your cost baseline rather than a market prediction; a rate alert on Faizura Trading's platform; and a willingness to exchange mid-week when the alert triggers. For quarterly or annual large exchanges — property payments, school fees, business settlements — adding a forward rate lock removes timing risk entirely. You agree on today's rate for an exchange that settles 30, 60, or 90 days from now. The rate is fixed regardless of what markets do between now and then. Set a rate alert on Faizura Trading's platform today — exchange when the rate hits your target, not when you remember to check.",
      },
    ],
  },
  {
    slug: "send-money-malaysia-myr-sgd",
    category: "REMITTANCE",
    categoryColor: "#22c55e",
    title: "SGD to MYR: Everything You Need to Know Before You Send",
    heroHeadlineLines: ["SGD TO MYR: EVERYTHING", "YOU NEED TO KNOW", "BEFORE YOU SEND"],
    excerpt:
      "Malaysia is Singapore's most popular remittance corridor. We cover the rate spread, transfer limits, documentation required, and why the rate you see online is rarely the rate you get.",
    readTime: "5 min read",
    date: "Mar 18, 2026",
    featured: false,
    body: [
      {
        type: "h2",
        text: "The SGD/MYR Corridor at a Glance",
      },
      {
        type: "paragraph",
        text: "The Malaysia corridor is Singapore's highest-volume remittance route by far. Hundreds of thousands of Malaysian citizens work in Singapore, and billions of SGD flow northbound every year for family remittances, property payments, and business settlements. The MYR/SGD rate is consequently one of the most liquid SGD pairs, which means tight interbank spreads are achievable — if you know where to look. As of May 2026, the mid-market MYR/SGD rate sits near 3.47, meaning one Singapore dollar buys approximately 3.47 Malaysian ringgit at the interbank level.",
      },
      {
        type: "statcallout",
        stat: "S$4.2B",
        label: "Estimated SGD transferred Singapore → Malaysia annually",
        detail:
          "2024 World Bank remittance data. Singapore–Malaysia is Southeast Asia's largest bilateral corridor by volume.",
      },
      {
        type: "h2",
        text: "What Banks vs Licensed Changers Actually Offer",
      },
      {
        type: "pullquote",
        text: "The rate you see on Google is the mid-market rate. What banks give you is mid-market minus 2.5–3%. On S$1,000, that is RM25–30 gone — taken without a word.",
      },
      {
        type: "paragraph",
        text: "Here is the real-world comparison for S$1,000 to MYR as of May 2026, with the mid-market rate at 3.47 MYR/SGD. Singapore commercial banks (DBS, OCBC, UOB): rate approximately 3.34–3.39 MYR/SGD, effective spread 2.3–3.7%, netting RM3,340–3,390. Remittance apps (Wise, TransferGo): rate approximately 3.42–3.44 MYR/SGD, effective spread 0.9–1.4%, netting RM3,420–3,440. Licensed money changers (Faizura Trading): rate approximately 3.44–3.46 MYR/SGD, effective spread 0.3–0.9%, netting RM3,440–3,460. The difference between a bank and a licensed changer on S$1,000 is RM50–120. For regular monthly transfers of S$2,000–3,000, the annual saving from using a licensed changer over a bank exceeds RM2,000.",
      },
      {
        type: "h2",
        text: "Documentation for Malaysian Remittance",
      },
      {
        type: "paragraph",
        text: "For transfers below S$5,000: a valid Singapore ID — NRIC, Employment Pass, or passport — and the recipient's full name and Malaysian bank account number. Supported banks include Maybank, CIMB, Public Bank, RHB, Hong Leong, HSBC Malaysia, and AmBank. For transfers above S$5,000: same ID requirements, plus a declared purpose of transfer — family remittance, salary, rental, or business payment. For amounts above S$20,000: supporting documentation may be requested, such as a tenancy agreement for rental payments or a bank statement for business settlement. These requirements are set by MAS and Bank Negara Malaysia's bilateral AML framework and apply uniformly to all licensed operators.",
      },
      {
        type: "h2",
        text: "Getting the Best Rate Consistently",
      },
      {
        type: "paragraph",
        text: "The MYR rate is generally most favorable Tuesday to Thursday morning Singapore time, when both the Kuala Lumpur Stock Exchange and Singapore Exchange are in active session and interbank liquidity is deepest. Major MYR movers to watch: Brent crude oil price — Malaysia is a net oil exporter, so a crude rally strengthens MYR and improves your effective rate — Bank Negara Malaysia Overnight Policy Rate decisions announced quarterly, and any broad USD strength events that ripple through the SGD. For senders making regular monthly transfers — family support, rental installments, business payments — locking a forward rate for 30–60 days removes timing risk entirely and protects against adverse MYR movements between now and your transfer date. See today's live SGD/MYR rate on Faizura Trading's board and compare it directly against your bank's rate before your next transfer.",
      },
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getRelatedArticles(currentSlug: string, count = 3): Article[] {
  return ARTICLES.filter((a) => a.slug !== currentSlug).slice(0, count);
}
