import React, { useState } from 'react';
import { ArrowLeft, RefreshCw, Users, ArrowRight } from 'lucide-react';

interface CategoryDiscoveryProps {
  onSelect: (name: string) => void;
}

const categoriesDB: Record<string, string[]> = {
  "🤖 AI Visionaries": [
    "Sam Altman", "Jensen Huang", "Demis Hassabis", "Dario Amodei", "Satya Nadella", "Sundar Pichai", "Mark Zuckerberg", "Elon Musk", "Yann LeCun", "Geoffrey Hinton", "Andrew Ng", "Fei-Fei Li", "Lisa Su", "Mira Murati", "Greg Brockman", "Emad Mostaque", "Alexandr Wang", "Aidan Gomez", "Mustafa Suleyman", "Clement Delangue", "Ilya Sutskever", "Andrej Karpathy", "Arthur Mensch", "Aravind Srinivas", "Noam Shazeer", "Bret Taylor", "Richard Socher", "David Luan", "Oriol Vinyals", "Jeff Dean", "Ian Goodfellow", "Pieter Abbeel", "Daniel Gross", "Nat Friedman", "John Schulman"
  ],
  "🌏 Asian Tycoons": [
    "Mukesh Ambani", "Gautam Adani", "Dhanin Chearavanont", "Lee Jae-yong", "Masayoshi Son", "Ma Huateng", "Jack Ma", "Lei Jun", "Charoen Sirivadhanabhakdi", "Sarath Ratanavadi", "Tadashi Yanai", "Kwek Leng Beng", "Robert Kuok", "Tos Chirathivat", "Viktor Li", "N. Chandrasekaran", "Azim Premji", "Chey Tae-won", "Koo Kwang-mo", "Aiyawatt Srivaddhanaprabha", "Panote Sirivadhanabhakdi", "Tony Fernandes", "Anthony Tan", "Chatri Sityodtong", "Vichai Srivaddhanaprabha", "Harald Link", "Aloke Lohia", "Jaime Augusto Zobel de Ayala", "Anthoni Salim", "Budi Hartono", "Cyrus Mistry", "Kumar Birla", "Cheng Yu-tung", "Lee Kun-hee", "Shin Dong-bin"
  ],
  "🧬 Biotech": [
    "Bryan Johnson", "Stéphane Bancel", "Albert Bourla", "Jennifer Doudna", "Anne Wojcicki", "George Church", "David Sinclair", "Elizabeth Blackburn", "Emmanuelle Charpentier", "Ugur Sahin", "Ozlem Tureci", "Feng Zhang", "Craig Venter", "Francis deSouza", "Christian Angermayer", "Peter Thiel", "Sam Altman", "Aubrey de Grey", "Arthur Levinson", "Katalin Karikó", "Jason Kelly", "Reshma Shetty", "George Yancopoulos", "Martine Rothblatt", "Patrick Soon-Shiong", "Elizabeth Holmes", "Tyler Shultz", "Alice Zhang", "Celine Halioua", "Laura Deming", "Nir Barzilai", "Valter Longo", "Dave Asprey", "Tim Ferriss", "Dr. Peter Attia"
  ],
  "📱 Consumer Tech": [
    "Mark Zuckerberg", "Tim Cook", "Sundar Pichai", "Evan Spiegel", "Pavel Durov", "Jack Dorsey", "Daniel Ek", "Reed Hastings", "Zhang Yiming", "Shou Zi Chew", "Alexis Ohanian", "Steve Huffman", "Jason Citron", "Bobby Murphy", "Kevin Systrom", "Mike Krieger", "Ben Silbermann", "Emmett Shear", "David Baszucki", "Jimmy Wales", "Tony Fadell", "Nick Woodman", "James Park", "Luis von Ahn", "Whitney Wolfe Herd", "Sean Rad", "Paul Davison", "Rohan Seth", "Kevin Chou", "Ben Rubin", "Mike McCue", "Steve Jobs", "Bill Gates", "Marques Brownlee", "Linus Sebastian"
  ],
  "₿ Crypto & Web3": [
    "Vitalik Buterin", "Satoshi Nakamoto", "Brian Armstrong", "Changpeng Zhao", "Gavin Wood", "Charles Hoskinson", "Sergey Nazarov", "Anatoly Yakovenko", "Fred Ehrsam", "Brad Garlinghouse", "Michael Saylor", "Cameron Winklevoss", "Tyler Winklevoss", "Hayden Adams", "Stani Kulechov", "Jaynti Kanani", "Devin Finzer", "Yat Siu", "Balaji Srinivasan", "Jeremy Allaire", "Justin Sun", "Jesse Powell", "Arthur Hayes", "Barry Silbert", "Mike Novogratz", "Erik Voorhees", "Zooko Wilcox", "Charlie Lee", "Jed McCaleb", "Da Hongfei", "Emin Gün Sirer", "Do Kwon", "Sam Bankman-Fried", "PlanB", "Phil Zimmermann"
  ],
  "🛡️ CyberSec": [
    "Nikesh Arora", "George Kurtz", "Gil Shwed", "Ken Xie", "Kevin Mandia", "Jay Chaudhry", "Eugene Kaspersky", "Satya Nadella", "Sanjay Beri", "Tomer Weingarten", "Eva Chen", "Wendi Whitmore", "Brian Krebs", "Poornima DeBolle", "Wendy Thomas", "Rohit Ghai", "Amit Yoran", "Michael Sentonas", "Shlomo Kramer", "Paul Nakasone", "Edward Snowden", "Moxie Marlinspike", "Andy Yen", "Kevin Mitnick", "Mikko Hypponen", "Bruce Schneier", "Phil Zimmermann", "Julian Assange", "Chris Krebs", "Window Snyder", "Parisa Tabriz", "Katie Moussouris", "Jeff Moss", "Dan Kaminsky", "Troy Hunt"
  ],
  "🛒 E-Commerce": [
    "Jeff Bezos", "Jack Ma", "Colin Huang", "Tobias Lütke", "Pony Ma", "Doug McMillon", "Richard Liu", "Chris Xu", "Zhang Yiming", "Forrest Li", "Bom Kim", "Mikitani Hiroshi", "William Ding", "Ryan Cohen", "Xu Lei", "Robert Gentz", "Nadiem Makarim", "Supachai Chearavanont", "Pierre Omidyar", "Taddy Hall", "Tony Xu", "Will Shu", "Fidji Simo", "Niraj Shah", "Josh Silverman", "Jamie Iannone", "Simcha Kanter", "Harley Finkelstein", "Jason Goldberg", "Marc Lore", "Tim Steiner", "Robert Bukvic", "Kun Bahl", "Falguni Nayar", "Miranda Qu"
  ],
  "⚡ EV & Mobility": [
    "Elon Musk", "Wang Chuanfu", "RJ Scaringe", "William Li", "He Xiaopeng", "Li Xiang", "Mate Rimac", "Peter Rawlinson", "Jim Farley", "Mary Barra", "Oliver Blume", "Akio Toyoda", "Chung Euisun", "Robin Zeng", "JB Straubel", "Henrik Fisker", "Toshihiro Mibe", "Sterling Anderson", "Austin Russell", "Herbert Diess", "Dmitri Dolgov", "Tekedra Mawakana", "Kyle Vogt", "Chris Urmson", "Thomas Ingenlath", "Jim Rowan", "Makoto Uchida", "Koji Sato", "Carlos Tavares", "Josh Giegel", "Jeffrey B. Straubel", "Trevor Milton", "Gene Berdichevsky", "Jesse Powell", "Torsten Müller-Ötvös"
  ],
  "💰 Finance & VC": [
    "Warren Buffett", "Ray Dalio", "Larry Fink", "Jamie Dimon", "Stephen Schwarzman", "Ken Griffin", "David Solomon", "Jane Fraser", "Bill Ackman", "George Soros", "Carl Icahn", "Cathie Wood", "Masayoshi Son", "Chamath Palihapitiya", "Howard Marks", "James Gorman", "Brian Moynihan", "Abigail Johnson", "Marc Andreessen", "Michael Burry", "Paul Tudor Jones", "Stanley Druckenmiller", "Roelof Botha", "Doug Leone", "Bill Gurley", "Peter Thiel", "Alfred Lin", "Garry Tan", "Paul Graham", "Naval Ravikant", "Leon Black", "Henry Kravis", "David Rubenstein", "Adena Friedman", "David Tepper"
  ],
  "🎮 Gaming Gods": [
    "Tim Sweeney", "Phil Spencer", "Gabe Newell", "Strauss Zelnick", "Hideo Kojima", "Shuntaro Furukawa", "Hiroki Totoki", "Bobby Kotick", "Andrew Wilson", "Yves Guillemot", "Jen-Hsun Huang", "Lisa Su", "David Baszucki", "Emmett Shear", "Palmer Luckey", "John Hanke", "Jim Ryan", "Sam Houser", "Todd Howard", "Miyamoto Shigeru", "Ninja", "Shroud", "Markus Persson", "Eric Barone", "Toby Fox", "Sid Meier", "Will Wright", "John Riccitiello", "Kenichiro Yoshida", "Reggie Fils-Aimé", "Satoru Iwata", "Masahiro Sakurai", "Yosuke Matsuda", "Hidetaka Miyazaki", "Geoff Keighley"
  ],
  "👠 Luxury & Retail": [
    "Bernard Arnault", "Phil Knight", "Amancio Ortega", "François-Henri Pinault", "Tadashi Yanai", "Axel Dumas", "Alain Wertheimer", "Johann Rupert", "Miuccia Prada", "Ralph Lauren", "Giorgio Armani", "Brunello Cucinelli", "Stefan Persson", "Chip Wilson", "Jochen Zeitz", "Nicolas Hieronimus", "Fabrizio Hochschild", "Remo Ruffini", "Diego Della Valle", "John Donahoe", "James Jebbia", "Virgil Abloh", "Rihanna", "Kylie Jenner", "Huda Kattan", "Pat McGrath", "Jean-Frédéric Dufour", "François-Henry Bennahmias", "Thierry Stern", "Torsten Müller-Ötvös", "Stephan Winkelmann", "Benedetto Vigna", "Anders Holch Povlsen", "Simon Porte Jacquemus", "Demna Gvasalia"
  ],
  "🎬 Media Kings": [
    "Bob Iger", "Reed Hastings", "Ted Sarandos", "David Zaslav", "Rupert Murdoch", "Lachlan Murdoch", "Shari Redstone", "Brian Roberts", "Tim Cook", "Jeff Bezos", "Stephen Cooper", "Lucian Grainge", "Bang Si-hyuk", "Lee Soo-man", "Jimmy Donaldson", "Felix Kjellberg", "Joe Rogan", "Dana White", "Vince McMahon", "Ari Emanuel", "Gustav Söderström", "Lyor Cohen", "Scooter Braun", "Jay-Z", "Dr. Dre", "Sean Combs", "Oprah Winfrey", "Tyler Perry", "Shonda Rhimes", "Kevin Feige", "Kathleen Kennedy", "Casey Neistat", "Charli D'Amelio", "Khaby Lame", "Logan Paul"
  ],
  "☁️ SaaS & Cloud": [
    "Marc Benioff", "Satya Nadella", "Andy Jassy", "Larry Ellison", "Shantanu Narayen", "Stewart Butterfield", "Eric Yuan", "Bill McDermott", "Aneel Bhusri", "Scott Farquhar", "Mike Cannon-Brookes", "Thomas Kurian", "Sridhar Ramaswamy", "Jay Chaudhry", "Drew Houston", "Aaron Levie", "Jennifer Tejada", "Sid Sijbrandij", "Ben Silbermann", "Safra Catz", "Dharmesh Shah", "Brian Halligan", "Todd McKinnon", "Frank Slootman", "Dan Springer", "Sid Sijbrandij", "Thomas Dohmke", "Howie Liu", "Wade Foster", "Jeff Lawson", "Christian Chabot", "Rob Bernshteyn", "Godfrey Sullivan", "Sasan Goodarzi", "Yamini Rangan"
  ],
  "💾 Semiconductors": [
    "Morris Chang", "Jensen Huang", "Lisa Su", "Pat Gelsinger", "Cristiano Amon", "Hock Tan", "Rene Haas", "C.C. Wei", "Mark Liu", "Tim Cook", "Sanjay Mehrotra", "Rick Wallace", "Gary Dickerson", "Christophe Fouquet", "Colette Kress", "Johny Srouji", "Jim Keller", "Wei Shaojun", "Dario Gil", "Peter Wennink", "Aart de Geus", "Anirudh Devgan", "Lip-Bu Tan", "Simon Segars", "Hermann Hauser", "Sophie Wilson", "Raja Koduri", "Kye Hyun Kyung", "Terushi Shimizu", "Kurt Sievers", "Jean-Marc Chery", "Ganesh Moorthy", "Matt Murphy", "Vincent Roche", "Hassane El-Khoury"
  ],
  "🚀 Startup Unicorns": [
    "Patrick Collison", "John Collison", "Brian Chesky", "Melanie Perkins", "Nik Storonsky", "Sebastian Siemiatkowski", "Ryan Petersen", "Parker Conrad", "Henrique Dubugras", "Pedro Franceschi", "Alexandr Wang", "Guillermo Rauch", "Dylan Field", "Ivan Zhao", "Mathilde Collin", "Edith Harbaugh", "Max Hodak", "Palmer Luckey", "Alex Karp", "Vlad Tenev", "Alex Bouaziz", "Eric Glyman", "Zach Perret", "William Hockey", "Rahul Vohra", "Shishir Mehrotra", "Job van der Voort", "David Hsu", "Immad Akhund", "Rene Reinsberg", "Andrew Chau", "Ryan Hoover", "Sahil Lavingia", "Austen Allred", "Domm Holland"
  ]
};

const CategoryDiscovery: React.FC<CategoryDiscoveryProps> = ({ onSelect }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [displayList, setDisplayList] = useState<string[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);

  const shuffleAndSet = (category: string) => {
    setIsShuffling(true);
    // Simple shuffle logic
    const fullList = categoriesDB[category];
    const shuffled = [...fullList];
    
    // Fisher-Yates shuffle
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // Slight delay for visual effect
    setTimeout(() => {
        setDisplayList(shuffled.slice(0, 10));
        setIsShuffling(false);
    }, 200);
  };

  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
    shuffleAndSet(category);
  };

  const handleBack = () => {
    setActiveCategory(null);
    setDisplayList([]);
  };

  if (activeCategory) {
    return (
      <div className="w-full max-w-5xl mx-auto mb-16 animate-fade-in">
        <div className="flex items-center justify-between mb-6">
            <button 
                onClick={handleBack}
                className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-brand-orange transition-colors uppercase tracking-wider"
            >
                <ArrowLeft className="w-4 h-4" />
                Return to Categories
            </button>
            <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-brand-text">{activeCategory}</h3>
                <button 
                    onClick={() => shuffleAndSet(activeCategory)}
                    className="p-2 text-gray-400 hover:text-brand-orange hover:bg-gray-100 rounded-full transition-all"
                    title="Shuffle List"
                >
                    <RefreshCw className={`w-4 h-4 ${isShuffling ? 'animate-spin' : ''}`} />
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {displayList.map((name, idx) => (
                <button
                    key={`${name}-${idx}`}
                    onClick={() => onSelect(name)}
                    className={`
                        group flex items-center justify-between p-5 bg-white border border-gray-200 
                        shadow-sm hover:shadow-sharp-lg hover:border-brand-orange rounded-lg transition-all duration-300
                        text-left ${isShuffling ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}
                    `}
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-brand-orange group-hover:text-white transition-colors">
                            <Users className="w-5 h-5" />
                        </div>
                        <span className="text-lg font-medium text-gray-800 group-hover:text-brand-text">
                            {name}
                        </span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-brand-orange transform group-hover:translate-x-1 transition-all" />
                </button>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto mb-20 animate-slide-up">
        <div className="flex items-center justify-center gap-3 mb-10">
            <div className="h-px w-12 bg-gray-300"></div>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest text-center">
                Discover Leaders by Industry
            </h3>
            <div className="h-px w-12 bg-gray-300"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.keys(categoriesDB).map((category) => (
                <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-sharp-lg hover:border-brand-orange hover:-translate-y-1 transition-all duration-300 group h-32"
                >
                    <span className="text-sm font-bold text-gray-700 text-center group-hover:text-brand-orange transition-colors">
                        {category}
                    </span>
                    <span className="mt-2 text-xs text-gray-400 font-medium bg-gray-50 px-2 py-1 rounded group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors">
                        Explore
                    </span>
                </button>
            ))}
        </div>
    </div>
  );
};

export default CategoryDiscovery;