export const MODULES = [
  {
    id: 1,
    title: "What is an Election?",
    description: "Understand the fundamentals of democratic elections",
    estimatedMinutes: 8,
    difficulty: "Beginner",
    accentColor: "#A8D5BA",
    cards: [
      {
        id: "1-1",
        title: "Definition of an Election",
        content: "An election is a formal group decision-making process by which a population chooses an individual or multiple individuals to hold public office. Elections have been the usual mechanism by which modern representative democracy has operated since the 17th century.",
        icon: "🗳️"
      },
      {
        id: "1-2",
        title: "Why Elections Matter",
        content: "Elections serve as the primary method for citizens in a democracy to exercise their political power. Through elections, citizens can choose leaders who represent their values, remove officials they are dissatisfied with, and participate directly in governance.",
        icon: "💡"
      },
      {
        id: "1-3",
        title: "History of Elections",
        content: "Ancient Athens held elections for some offices as early as 508 BC. Modern elections with universal suffrage began in the 19th and 20th centuries. The secret ballot — used to prevent coercion — was first introduced in Australia in 1856.",
        icon: "📜"
      },
      {
        id: "1-4",
        title: "Free and Fair Elections",
        content: "For an election to be considered legitimate, it must be free (voters can vote without fear or coercion) and fair (all votes count equally, results are counted accurately). International observers often monitor elections to verify these conditions.",
        icon: "⚖️"
      }
    ],
    keyTerms: [
      { term: "Suffrage", definition: "The right to vote in political elections." },
      { term: "Ballot", definition: "The method by which voters cast their votes, either on paper or electronically." },
      { term: "Constituency", definition: "A group of voters in a specified area who elect a representative." },
      { term: "Mandate", definition: "The authority given to an elected official by the voters to act on their behalf." }
    ],
    quizId: 1
  },
  {
    id: 2,
    title: "Types of Elections",
    description: "Federal, State, Local — what's the difference and why it matters",
    estimatedMinutes: 10,
    difficulty: "Beginner",
    accentColor: "#F4A7B9",
    cards: [
      {
        id: "2-1",
        title: "Federal Elections",
        content: "Federal elections determine who serves in national government offices: the President, Vice President, US Senators (6-year terms), and House Representatives (2-year terms). Presidential elections happen every 4 years. Congressional elections happen every 2 years — these are called Midterm Elections.",
        icon: "🏛️"
      },
      {
        id: "2-2",
        title: "State Elections",
        content: "State elections choose Governors, state legislators, Attorneys General, and other state officials. State governments control laws around education, transportation, criminal justice, and many daily-life issues. State elections happen on different cycles depending on the state.",
        icon: "🗺️"
      },
      {
        id: "2-3",
        title: "Local Elections",
        content: "Local elections are the closest to everyday life — they choose mayors, city council members, school board members, judges, and sheriffs. Local offices directly affect policing, schools, roads, and local taxes. Voter turnout in local elections is often under 20%.",
        icon: "🏘️"
      },
      {
        id: "2-4",
        title: "Primary vs General Elections",
        content: "A Primary Election is held within a political party to select their candidate. The winner of the primary goes on to the General Election, where candidates from all parties compete. Some states have Open Primaries (any voter can participate) while others have Closed Primaries (party members only).",
        icon: "🔄"
      },
      {
        id: "2-5",
        title: "Special Elections",
        content: "Special Elections are held outside the regular schedule to fill a vacancy — for example, when an official resigns, dies, or is removed from office. They follow the same rules as regular elections but are called on short notice.",
        icon: "⭐"
      }
    ],
    keyTerms: [
      { term: "Midterm Election", definition: "Congressional elections held halfway through a presidential term." },
      { term: "Primary Election", definition: "An election to choose a party's candidate for a general election." },
      { term: "General Election", definition: "The main election where candidates from all parties compete for office." },
      { term: "Special Election", definition: "An election held outside the regular schedule to fill a vacancy." },
      { term: "Off-year Election", definition: "An election held in a year when there is no presidential election." }
    ],
    quizId: 2
  },
  {
    id: 3,
    title: "Voter Registration",
    description: "Who can vote, when to register, and how to do it",
    estimatedMinutes: 12,
    difficulty: "Beginner",
    accentColor: "#F9C784",
    cards: [
      {
        id: "3-1",
        title: "Who Can Register to Vote?",
        content: "In the United States, to register you must be: (1) a US citizen, (2) at least 18 years old by Election Day, (3) a resident of the state where you are registering, and (4) not currently serving a felony sentence in most states. Some states allow 17-year-olds to vote in primaries if they will be 18 by the general election.",
        icon: "✅"
      },
      {
        id: "3-2",
        title: "Registration Deadlines",
        content: "Most states require you to register 15–30 days before an election. 21 states plus DC offer same-day registration, allowing you to register at the polls on Election Day. North Dakota is the only state with no registration requirement at all. Always check your state's specific deadline — missing it means you cannot vote in that election.",
        icon: "📅"
      },
      {
        id: "3-3",
        title: "How to Register",
        content: "You can register: (1) Online at vote.gov or your state's election website, (2) By mail using the National Voter Registration Form, (3) In person at your county election office, DMV, or other government offices. When you get a driver's license or ID, you are often asked if you want to register — this is called Motor Voter registration.",
        icon: "📝"
      },
      {
        id: "3-4",
        title: "Keeping Your Registration Active",
        content: "If you move to a new address, you must update your registration. If you change your name, update it. If you don't vote for several elections in a row, some states may mark you as inactive and eventually remove you from the rolls. Check your registration status at vote.gov before each election.",
        icon: "🔄"
      }
    ],
    keyTerms: [
      { term: "Voter Registration", definition: "The process of signing up with your government to be eligible to vote." },
      { term: "Motor Voter Law", definition: "A 1993 law requiring states to offer voter registration at DMVs and government offices." },
      { term: "Same-Day Registration", definition: "The ability to register to vote on Election Day itself." },
      { term: "Voter Roll", definition: "The official list of registered voters in a jurisdiction." },
      { term: "Purge", definition: "The process of removing inactive or ineligible voters from the voter rolls." }
    ],
    quizId: 3
  },
  {
    id: 4,
    title: "Candidates & Campaigns",
    description: "How people run for office and what campaigns actually do",
    estimatedMinutes: 10,
    difficulty: "Intermediate",
    accentColor: "#A8C8E8",
    cards: [
      {
        id: "4-1",
        title: "Declaring Candidacy",
        content: "To run for office, a candidate must file formal paperwork with the relevant election authority — typically a Declaration of Candidacy form and sometimes a filing fee. For federal offices, candidates must also file with the FEC (Federal Election Commission) once they raise or spend $5,000.",
        icon: "📋"
      },
      {
        id: "4-2",
        title: "Campaign Finance",
        content: "Campaigns cost money — for advertising, staff, travel, and events. Individual Americans can donate limited amounts directly to campaigns. Political parties and Super PACs (independent groups) can raise unlimited money for 'issue advocacy' but cannot directly coordinate with campaigns. All federal campaign donations must be publicly disclosed.",
        icon: "💰"
      },
      {
        id: "4-3",
        title: "What Campaigns Do",
        content: "A campaign's goal is to persuade voters to choose their candidate. They do this through: TV and digital advertising, door-to-door canvassing, phone banking, rallies and events, debates, direct mail, and social media. 'Get Out the Vote' (GOTV) efforts focus specifically on making sure registered supporters actually show up to vote.",
        icon: "📣"
      },
      {
        id: "4-4",
        title: "Political Parties & Independents",
        content: "Most candidates run under a major party label (Democrat or Republican) which gives them built-in infrastructure and name recognition. Third-party and Independent candidates face much harder ballot access requirements — they must gather thousands of signatures just to appear on the ballot. This creates a significant structural advantage for the two major parties.",
        icon: "🏛️"
      }
    ],
    keyTerms: [
      { term: "FEC", definition: "Federal Election Commission — the agency that regulates federal campaign finance." },
      { term: "Super PAC", definition: "A political action committee that can raise unlimited funds but cannot directly coordinate with campaigns." },
      { term: "GOTV", definition: "Get Out The Vote — efforts to mobilize registered supporters to actually cast ballots." },
      { term: "Canvassing", definition: "Going door-to-door in neighborhoods to talk to voters about a campaign." },
      { term: "Ballot Access", definition: "The legal requirements a candidate must meet to appear on an election ballot." }
    ],
    quizId: 4
  },
  {
    id: 5,
    title: "Reading the Ballot",
    description: "What's actually on your ballot and how to understand it",
    estimatedMinutes: 9,
    difficulty: "Beginner",
    accentColor: "#A8D5BA",
    cards: [
      {
        id: "5-1",
        title: "What's On Your Ballot",
        content: "A typical ballot contains multiple races: federal offices (President, Senate, House), state offices (Governor, state legislature), local offices (mayor, school board, judges), and ballot measures or propositions (direct votes on laws or constitutional amendments). Most voters are surprised by how many things appear on a single ballot.",
        icon: "📄"
      },
      {
        id: "5-2",
        title: "Ballot Measures & Propositions",
        content: "Ballot measures are direct democracy in action — citizens vote YES or NO on specific laws or constitutional changes. Examples include bond measures (approving government borrowing), initiatives (citizen-proposed laws), referendums (legislature-referred laws), and recalls (removing an elected official). The language is often confusing and requires careful reading.",
        icon: "⚖️"
      },
      {
        id: "5-3",
        title: "Write-In Candidates",
        content: "On most ballots, there is a write-in option where you can write a candidate's name instead of selecting a printed one. However, most states require write-in candidates to have registered in advance to have their votes counted. A write-in vote for a non-registered candidate is typically not counted.",
        icon: "✏️"
      },
      {
        id: "5-4",
        title: "Undervoting and Overvoting",
        content: "Undervoting is when a voter skips a race entirely — this is allowed and common. Overvoting is when a voter selects more than the allowed number of candidates in one race — this causes that race to be invalidated (your vote won't count for that race). Modern optical scanners often warn you before you submit an overvoted ballot.",
        icon: "⚠️"
      }
    ],
    keyTerms: [
      { term: "Ballot Measure", definition: "A proposal put directly to voters for approval or rejection." },
      { term: "Initiative", definition: "A ballot measure proposed by citizens through a signature petition." },
      { term: "Referendum", definition: "A ballot measure referred to voters by the state legislature." },
      { term: "Proposition", definition: "Another term for a ballot measure, commonly used in California and other states." },
      { term: "Undervote", definition: "When a voter leaves a race blank on their ballot." }
    ],
    quizId: 5
  },
  {
    id: 6,
    title: "Voting Day",
    description: "What to expect when you walk into the polling place",
    estimatedMinutes: 8,
    difficulty: "Beginner",
    accentColor: "#F4A7B9",
    cards: [
      {
        id: "6-1",
        title: "Before You Go",
        content: "Before Election Day: confirm your polling place (it can change — always verify at your state's election site), check your ID requirements (varies heavily by state), look up your sample ballot in advance, and note the hours (most polls open 6–7am and close 7–8pm). If you're in line before closing time, you have the right to vote.",
        icon: "📋"
      },
      {
        id: "6-2",
        title: "At the Polls",
        content: "When you arrive: check in with poll workers who will verify your registration, show ID if required, sign the poll book (or electronic equivalent), and receive your ballot. You will vote in a private booth. When done, feed your ballot into the scanner or deposit it in a ballot box. First-time voters are often given a 'I Voted' sticker.",
        icon: "🗳️"
      },
      {
        id: "6-3",
        title: "Voting By Mail / Absentee",
        content: "All 50 states allow some form of mail-in or absentee voting. Some states mail every registered voter a ballot automatically. Others require you to request one. Mail ballots must typically be returned by Election Day (postmarked by that date in some states, received by that date in others). Follow the instructions exactly — signature, inner envelope, outer envelope.",
        icon: "✉️"
      },
      {
        id: "6-4",
        title: "Early Voting",
        content: "Most states offer Early Voting — a window of days or weeks before Election Day when you can vote in person at designated locations. Early voting reduces Election Day congestion and is especially useful for voters with inflexible work or family schedules. Check your state's early voting window and locations at vote.gov.",
        icon: "📅"
      }
    ],
    keyTerms: [
      { term: "Polling Place", definition: "The official location where voters go to cast their ballots on Election Day." },
      { term: "Poll Book", definition: "The official list of registered voters checked at the polls." },
      { term: "Provisional Ballot", definition: "A ballot used when a voter's registration cannot be immediately verified at the polls." },
      { term: "Absentee Ballot", definition: "A ballot cast by a voter who cannot be present at the polls on Election Day." },
      { term: "Early Voting", definition: "Voting in person before Election Day during a designated early voting period." }
    ],
    quizId: 6
  },
  {
    id: 7,
    title: "Counting Votes & Results",
    description: "What happens after you vote — from counting to certification",
    estimatedMinutes: 11,
    difficulty: "Intermediate",
    accentColor: "#F9C784",
    cards: [
      {
        id: "7-1",
        title: "How Votes Are Counted",
        content: "Most jurisdictions use optical scan machines: you fill in bubbles on paper, and a machine reads the marks. Direct Recording Electronic (DRE) machines record votes electronically. Hand counting is used as an audit check. Mail ballots are processed separately — signatures are verified on envelopes before ballots are extracted and counted.",
        icon: "🔢"
      },
      {
        id: "7-2",
        title: "Election Night vs. Final Results",
        content: "What you see on election night is not the certified result. Initial tallies come from precincts as they report in. Mail ballots, provisional ballots, and overseas/military ballots may take days or weeks to be counted. A race can look like it's going one way on election night and flip as more ballots are counted. This is normal and expected.",
        icon: "🌙"
      },
      {
        id: "7-3",
        title: "Audits and Recounts",
        content: "After an election, most states conduct post-election audits — checking a sample of ballots by hand to verify machine accuracy. If the margin of victory is very small (often under 0.5%), the losing candidate can request a recount. Recounts rarely change outcomes by more than a few hundred votes. Full hand recounts are rare and expensive.",
        icon: "🔍"
      },
      {
        id: "7-4",
        title: "Certification",
        content: "Results are certified by local boards, then state election authorities, then the Governor. In federal elections, states send certified results to Congress. For presidential elections, states send Electoral College certificates. Congress certifies the Electoral College results in January following the election. Only after certification is a result official.",
        icon: "📜"
      }
    ],
    keyTerms: [
      { term: "Canvass", definition: "The official review and tally of all ballots cast in an election." },
      { term: "Certification", definition: "The official governmental declaration of election results after all ballots are counted and audited." },
      { term: "Recount", definition: "A repeat counting of ballots, usually triggered when a race margin is very small." },
      { term: "Provisional Ballot", definition: "A ballot used when eligibility is in question; counted after verification." },
      { term: "Risk-Limiting Audit", definition: "A statistical sampling method to verify election results with a high degree of confidence." }
    ],
    quizId: 7
  },
  {
    id: 8,
    title: "Electoral Systems",
    description: "FPTP, Ranked Choice, Proportional — how different systems work",
    estimatedMinutes: 14,
    difficulty: "Advanced",
    accentColor: "#7C6FCD",
    cards: [
      {
        id: "8-1",
        title: "First-Past-the-Post (FPTP)",
        content: "The US primarily uses First-Past-the-Post (also called 'Winner Take All'). The candidate with the most votes wins, even if they don't get a majority. This system is simple but can result in winners with less than 50% of the vote when many candidates split votes. It also heavily favors a two-party system.",
        icon: "🥇"
      },
      {
        id: "8-2",
        title: "Ranked Choice Voting (RCV)",
        content: "In Ranked Choice Voting, voters rank candidates in order of preference (1st, 2nd, 3rd...). If no candidate gets a majority of first-choice votes, the last-place candidate is eliminated and their votes are redistributed to voters' second choices. This continues until someone has a majority. Used in Maine, Alaska, and many local elections.",
        icon: "📊"
      },
      {
        id: "8-3",
        title: "The Electoral College",
        content: "The US presidential election does not use a national popular vote. Instead, each state gets Electoral Votes (equal to its number of Senators + Representatives). Most states give ALL their electoral votes to the winner of that state's popular vote (winner-take-all). A candidate needs 270 of 538 electoral votes to win. Nebraska and Maine split their electoral votes by congressional district.",
        icon: "🗺️"
      },
      {
        id: "8-4",
        title: "Proportional Representation",
        content: "Most democracies outside the US use some form of Proportional Representation (PR) — where a party's share of legislative seats roughly matches their share of the popular vote. If a party gets 30% of votes, they get ~30% of seats. This tends to produce coalition governments and allows more third parties to win seats.",
        icon: "📈"
      },
      {
        id: "8-5",
        title: "Runoff Elections",
        content: "Some states require a candidate to win an outright majority (50%+1 votes), not just a plurality. If no one reaches this threshold in the general election, the top two candidates advance to a Runoff Election held weeks later. Georgia uses this system for federal offices, which is why some Georgia Senate races have been decided in January runoffs.",
        icon: "🔄"
      }
    ],
    keyTerms: [
      { term: "FPTP", definition: "First-Past-the-Post — a voting system where the candidate with the most votes wins." },
      { term: "Electoral College", definition: "The body of 538 electors whose votes formally determine the US President." },
      { term: "Ranked Choice Voting", definition: "A system where voters rank candidates by preference and votes are redistributed until someone has a majority." },
      { term: "Proportional Representation", definition: "An electoral system where legislative seats are allocated based on each party's share of the vote." },
      { term: "Plurality", definition: "Having more votes than any other candidate, but not necessarily a majority." }
    ],
    quizId: 8
  }
];
