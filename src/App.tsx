import React, { useState, useEffect, useRef } from "react";
import { 
  motion, 
  AnimatePresence 
} from "motion/react";
import { 
  Terminal, 
  BookOpen, 
  Shield, 
  Users, 
  Award, 
  Send, 
  AlertTriangle, 
  ChevronRight, 
  RefreshCw, 
  MapPin, 
  User, 
  Search, 
  Lock, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Skull,
  Star,
  Quote
} from "lucide-react";
import { booksData, charactersData, quizQuestions, spyQuotes, spyManeuvers } from "./data";
import { Message, Book, Character, QuizQuestion, SpyQuote, SpyManeuver } from "./types";

export default function App() {
  const [activeTab, setActiveTab] = useState<"chat" | "books" | "characters" | "quiz" | "quotes">("chat");
  
  // Chat state
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      id: "initial",
      role: "assistant",
      content: "Witaj, Kadecie Ripley. Jestem systemem ORION – scentralizowanym modułem analitycznym CIA dotyczącym serii 'Szkoła szpiegów'. Posiadam kompletną wiedzę na temat wszystkich 10 tomów misji, bohaterów, zdrajców oraz teorii operacyjnych. O co chciałbyś mnie zapytać?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Books State
  const [selectedBook, setSelectedBook] = useState<Book>(booksData[0]);
  const [bookSearchQuery, setBookSearchQuery] = useState("");

  // Character State
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(charactersData[0]);

  // Quotes State
  const [quoteSearchQuery, setQuoteSearchQuery] = useState("");
  const [selectedQuoteAuthor, setSelectedQuoteAuthor] = useState("all");
  const [quotesSubTab, setQuotesSubTab] = useState<"quotes" | "maneuvers">("maneuvers");
  const [selectedManeuverDifficulty, setSelectedManeuverDifficulty] = useState<string>("all");

  // Quiz State
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Suggested questions list
  const suggestedQuestions = [
    "Kto jest kretem w 1. tomie?",
    "Dlaczego Murray Hill zdradził?",
    "Kim jest Erica Hale?",
    "Co działo się w Aspen?"
  ];

  // Auto scroll chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isChatLoading]);

  // Handle send message
  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isChatLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setUserInput("");
    setIsChatLoading(true);

    try {
      // Map message history to simple prompt list for endpoint
      const history = [...chatMessages, userMsg].map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history })
      });

      if (!res.ok) {
        throw new Error("Serwer odpowiedział błędem sieciowym.");
      }

      const data = await res.json();
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.text || "Przepraszam, kadecie. Sygnał został zakłócony przez SPYDER-a. Spróbuj ponownie.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, botMsg]);
    } catch (err: any) {
      console.error(err);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "BŁĄD SZYFROWANIA: Nie udało się połączyć z nadrzędnym serwerem CIA. System przeszedł w tryb awaryjny. Sprawdź, czy terminal ma autoryzację do sieci.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Switch to quiz & restart/reset
  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  // Submit Answer
  const handleAnswerSubmit = () => {
    if (selectedAnswerIndex === null) return;
    setIsAnswerSubmitted(true);
    if (selectedAnswerIndex === quizQuestions[currentQuestionIndex].answerIndex) {
      setScore(prev => prev + 1);
    }
  };

  // Next Question
  const handleNextQuestion = () => {
    setSelectedAnswerIndex(null);
    setIsAnswerSubmitted(false);
    if (currentQuestionIndex + 1 < quizQuestions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  // Get agent rank by quiz score
  const getAgentRank = (finalScore: number) => {
    const ratio = finalScore / quizQuestions.length;
    if (ratio === 1) return { title: "Dyrektor Operacyjny CIA", desc: "Znasz serię lepiej niż sam Stuart Gibbs! Nie umknie Ci żaden szczegół, żaden kret ani żaden spisek. Jesteś nowym mentorem Bena.", color: "text-emerald-400 bg-emerald-950/50 border-emerald-500/50" };
    if (ratio >= 0.7) return { title: "Elitarny Agent Polowy (Klasa Hale)", desc: "Wspaniały wynik! Masz instynkt Eriki Hale. Poradziłbyś sobie na nartach w Aspen lub w puszczy bez mrugnięcia okiem.", color: "text-blue-400 bg-blue-950/50 border-blue-500/50" };
    if (ratio >= 0.4) return { title: "Oficer Analityczny (Styl Bena Ripleya)", desc: "Dobrze liczysz, choć czasami polegasz głównie na niesamowitym szczęściu. Musisz jeszcze poćwiczyć teorię w obozie przetrwania.", color: "text-amber-400 bg-amber-950/50 border-amber-500/50" };
    return { title: "Kret SPYDER-a (Klasa Murraya Hilla)", desc: "Twoje lenistwo wygrało. Wolisz grać na konsoli i udawać chorobę zamiast uczyć się akt operacyjnych. Powrót do Kancelarii Tajnej jest konieczny!", color: "text-rose-400 bg-rose-950/50 border-rose-500/50" };
  };

  const filteredBooks = booksData.filter(b => 
    b.title.toLowerCase().includes(bookSearchQuery.toLowerCase()) || 
    b.origTitle.toLowerCase().includes(bookSearchQuery.toLowerCase())
  );

  const filteredQuotes = spyQuotes.filter(q => {
    const matchesSearch = q.text.toLowerCase().includes(quoteSearchQuery.toLowerCase()) ||
                          q.author.toLowerCase().includes(quoteSearchQuery.toLowerCase()) ||
                          q.context.toLowerCase().includes(quoteSearchQuery.toLowerCase()) ||
                          q.bookTitle.toLowerCase().includes(quoteSearchQuery.toLowerCase());
    const matchesAuthor = selectedQuoteAuthor === "all" || q.author === selectedQuoteAuthor;
    return matchesSearch && matchesAuthor;
  });

  const filteredManeuvers = spyManeuvers;

  const handleAskAboutQuote = (quote: SpyQuote) => {
    setActiveTab("chat");
    handleSendMessage(`Opowiedz mi więcej o kontekście tego cytatu operacyjnego autorstwa ${quote.author}: "${quote.text}". Z którego tomu Szkoły szpiegów pochodzi i jaka historia się z nim wiąże?`);
  };

  const handleAskAboutManeuver = (maneuver: SpyManeuver) => {
    setActiveTab("chat");
    handleSendMessage(`Przeanalizuj proszę szpiegowską taktykę „${maneuver.name}” (${maneuver.englishName}) stworzoną przez postać: ${maneuver.origin}. Jak dany manewr wygląda w książkach serii Szkoła szpiegów i jaka historia się z nim wiąże?`);
  };

  return (
    <div className="min-h-screen bg-[#070A13] text-slate-100 flex flex-col font-sans antialiased selection:bg-teal-500 selection:text-slate-950">
      
      {/* Top Banner Status Bar */}
      <div className="bg-[#0D1222] border-b border-slate-800 py-2 px-4 flex flex-wrap justify-between items-center text-xs font-mono text-slate-400 tracking-wider">
        <div className="flex items-center space-x-3 mb-1 sm:mb-0">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Baza Wiedzy: SZKOŁA SZPIEGÓW</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-500">Autor serii: Stuart Gibbs</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>Bezpieczeństwo: <span className="text-teal-400 uppercase font-bold">Poziom 5 (Ściśle Tajne)</span></span>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:inline text-slate-500">Terminal: ORION-v3.5</span>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-gradient-to-r from-[#0C101F] via-[#10162B] to-[#0C101F] border-b border-slate-800 py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="bg-teal-950 border border-teal-500/30 p-2.5 rounded-lg text-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.15)]">
              <Shield className="h-8 w-8" id="shield-icon" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-teal-200 via-emerald-300 to-teal-100 bg-clip-text text-transparent">
                Szkoła Szpiegów AI
              </h1>
              <p className="text-xs text-slate-400 font-mono">
                Multimedialne Archiwum CIA &amp; Doradca Operacyjny
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex bg-[#0A0D1A] border border-slate-800 rounded-lg p-1 space-x-1" id="nav-tabs">
            <button
              id="tab-chat"
              onClick={() => setActiveTab("chat")}
              className={`flex items-center space-x-2 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm rounded-md font-medium tracking-wide transition-all ${
                activeTab === "chat" 
                  ? "bg-slate-800 text-teal-400 border border-slate-700 shadow-md" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
              }`}
            >
              <Terminal className="h-4 w-4" />
              <span>Centrum AI (ORION)</span>
            </button>
            <button
              id="tab-books"
              onClick={() => setActiveTab("books")}
              className={`flex items-center space-x-2 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm rounded-md font-medium tracking-wide transition-all ${
                activeTab === "books" 
                  ? "bg-slate-800 text-teal-400 border border-slate-700 shadow-md" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>Kancelaria Tajna</span>
            </button>
            <button
              id="tab-characters"
              onClick={() => setActiveTab("characters")}
              className={`flex items-center space-x-2 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm rounded-md font-medium tracking-wide transition-all ${
                activeTab === "characters" 
                  ? "bg-slate-800 text-teal-400 border border-slate-700 shadow-md" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Akta Osobowe</span>
            </button>
            <button
              id="tab-quiz"
              onClick={() => setActiveTab("quiz")}
              className={`flex items-center space-x-2 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm rounded-md font-medium tracking-wide transition-all ${
                activeTab === "quiz" 
                  ? "bg-slate-800 text-teal-400 border border-slate-700 shadow-md" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
              }`}
            >
              <Award className="h-4 w-4" />
              <span>Egzamin CIA</span>
            </button>
            <button
              id="tab-quotes"
              onClick={() => setActiveTab("quotes")}
              className={`flex items-center space-x-2 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm rounded-md font-medium tracking-wide transition-all ${
                activeTab === "quotes" 
                  ? "bg-slate-800 text-teal-400 border border-slate-700 shadow-md" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
              }`}
            >
              <Award className="h-4 w-4" />
              <span>Manewry Szpiegowskie</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 md:px-8 py-8 flex flex-col justify-stretch">
        <AnimatePresence mode="wait">
          
          {/* 1. CHATBOT TAB */}
          {activeTab === "chat" && (
            <motion.div
              key="chat-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-grow"
              id="chat-view"
            >
              {/* Sidebar Info and Suggestions */}
              <div className="lg:col-span-1 space-y-6 flex flex-col justify-between">
                <div className="bg-[#0B1020] border border-slate-800/80 rounded-xl p-5 space-y-4">
                  <div className="flex items-center space-x-2 text-teal-400 font-mono text-sm uppercase">
                    <Terminal className="h-4 w-4 animate-pulse" />
                    <span>Moduł ORION</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Nasz zaawansowany agent AI przeanalizował każdy wątek, misję i ukrytego zdrajcę w powieściach. Posiada kompletną wiedzę z zakresu tomów 1-10 w wersji polskiej.
                  </p>
                  
                  <div className="border-t border-slate-800/60 pt-4">
                    <h4 className="text-xs font-mono text-slate-300 uppercase mb-2">Przykładowe zagadnienia:</h4>
                    <div className="space-y-2">
                      {suggestedQuestions.map((q, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(q)}
                          className="w-full text-left p-2.5 text-xs text-slate-400 hover:text-teal-300 bg-[#0E152B] hover:bg-slate-800/60 rounded-md border border-slate-800/60 hover:border-teal-900/50 transition-all flex items-center justify-between group"
                        >
                          <span className="truncate">{q}</span>
                          <ChevronRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-teal-400 flex-shrink-0 ml-1" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#121021] to-[#0A0F1F] border border-teal-500/20 rounded-xl p-5 text-center shadow-lg">
                  <Award className="h-8 w-8 text-teal-400 mx-auto mb-2 animate-bounce" />
                  <h3 className="text-sm font-semibold text-teal-300">Sprawdź swoją wiedzę!</h3>
                  <p className="text-xs text-slate-400 mt-1 mb-3">Czy wiesz kto demaskuje złoczyńców? Przejdź oficjalny test kwalifikacyjny CIA.</p>
                  <button
                    onClick={() => setActiveTab("quiz")}
                    className="w-full py-1.5 px-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-medium text-xs rounded-md transition-colors"
                  >
                    Rozpocznij Egzamin
                  </button>
                </div>
              </div>

              {/* Chat Interface */}
              <div className="lg:col-span-3 flex flex-col bg-[#0B1021] border border-slate-800 rounded-xl overflow-hidden shadow-2xl h-[550px]">
                
                {/* Chat Header */}
                <div className="bg-[#10172D] px-5 py-4 border-b border-slate-800 flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="h-9 w-9 bg-teal-950 rounded-full border border-teal-500/30 flex items-center justify-center text-teal-400 font-mono font-bold text-sm">
                      OR
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm leading-tight text-slate-200">ORION AI - Wywiadowca Ksiegowy</h3>
                      <p className="text-xs text-slate-400 flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> Połączenie aktywne i bezpieczne
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setChatMessages([
                      {
                        id: "initial",
                        role: "assistant",
                        content: "Witaj ponownie, kadecie. Skompresowałem pamięć podręczną. O co chcesz zapytać w tej turze?",
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      }
                    ])}
                    title="Wyczyść potok rozmowy"
                    className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 rounded-md transition-all"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>

                {/* Messages Feed */}
                <div className="flex-grow p-5 overflow-y-auto space-y-4 font-mono text-xs md:text-sm">
                  {chatMessages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[85%] rounded-xl p-3.5 ${
                        msg.role === "user"
                          ? "bg-teal-500 text-slate-950 rounded-br-none font-sans"
                          : "bg-[#131B34] text-slate-200 rounded-bl-none border border-slate-800/60"
                      }`}>
                        
                        {/* Meta */}
                        <div className="flex items-center justify-between text-[10px] mb-1 opacity-70 border-b pb-1 border-slate-700/30">
                          <span className="font-semibold">{msg.role === "user" ? "KADET / RAPORT" : "ORION SYSTEM / ODPOWIEDŹ"}</span>
                          <span>{msg.timestamp}</span>
                        </div>

                        {/* Content */}
                        <p className="whitespace-pre-wrap leading-relaxed">
                          {msg.content}
                        </p>
                      </div>
                    </div>
                  ))}

                  {isChatLoading && (
                    <div className="flex justify-start">
                      <div className="bg-[#131B34] border border-slate-800/60 rounded-xl rounded-bl-none p-4 max-w-[80%]">
                        <div className="flex items-center justify-between text-[10px] mb-1 opacity-70 border-b pb-1 border-slate-700/30">
                          <span className="font-semibold">ORION SYSTEM / DEKODOWANIE CYKLU</span>
                          <span className="animate-pulse text-teal-400 text-xs">●</span>
                        </div>
                        <div className="flex items-center space-x-2 text-slate-400">
                          <RefreshCw className="h-4 w-4 animate-spin text-teal-500" />
                          <span>Analizowanie bazy danych oraz wątków fabularnych Agora...</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={chatBottomRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-[#10172D] border-t border-slate-800">
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage(userInput);
                    }}
                    className="flex space-x-2"
                  >
                    <input
                      type="text"
                      className="flex-grow bg-[#090D1A] border border-slate-700 hover:border-slate-600 focus:border-teal-500 focus:outline-none rounded-lg px-4 py-2 text-sm text-slate-200 placeholder-slate-500 transition-all font-mono"
                      placeholder="Zapytaj np: Dlaczego Ben Ripley jest tak wyjątkowy?..."
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      disabled={isChatLoading}
                    />
                    <button
                      type="submit"
                      disabled={isChatLoading || !userInput.trim()}
                      className="px-4 py-2 bg-teal-500 hover:bg-teal-400 disabled:bg-slate-800 text-slate-950 font-bold rounded-lg transition-colors flex items-center justify-center"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </form>
                  <p className="text-[10px] text-slate-500 text-center mt-2 font-mono">
                    System ORION korzysta wyłącznie z wiarygodnych źródeł wydawnictwa Agora oraz portalu Lubimyczytać.pl
                  </p>
                </div>

              </div>
            </motion.div>
          )}

          {/* 2. BOOKS GUIDE */}
          {activeTab === "books" && (
            <motion.div
              key="books-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow"
              id="books-view"
            >
              {/* Sidebar: Books List */}
              <div className="lg:col-span-5 flex flex-col space-y-4">
                
                {/* Search Header */}
                <div className="bg-[#0B1020] border border-slate-800 rounded-xl p-4">
                  <label className="text-xs font-mono text-slate-400 uppercase block mb-1.5">Wyszukaj część serii:</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Szukaj po tytule (np. kosmos, narty)..."
                      className="w-full bg-[#080B14] border border-slate-700 rounded-md py-1.5 pl-9 pr-4 text-sm focus:outline-none focus:border-teal-500 transition-all text-slate-200 font-mono"
                      value={bookSearchQuery}
                      onChange={(e) => setBookSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* Scrollable Books Index list */}
                <div className="bg-[#0B1020] border border-slate-800 rounded-xl p-3 flex-grow overflow-y-auto max-h-[500px] space-y-2">
                  <div className="text-[10px] font-mono text-slate-500 uppercase px-2 mb-2 tracking-wider">
                    Tomów na liście: {filteredBooks.length}
                  </div>
                  {filteredBooks.length > 0 ? (
                    filteredBooks.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => setSelectedBook(b)}
                        className={`w-full text-left p-3 rounded-lg border transition-all flex items-start space-x-3.5 group ${
                          selectedBook.id === b.id
                            ? "bg-slate-800 border-teal-500/60 shadow-lg text-teal-300"
                            : "bg-[#090D18] border-slate-800/80 hover:border-slate-700 text-slate-300 hover:bg-[#101526]"
                        }`}
                      >
                        {/* Numerical Badge */}
                        <div className={`h-8 w-8 rounded-md flex-shrink-0 flex items-center justify-center font-mono font-bold text-xs bg-gradient-to-br ${b.coverColor} uppercase text-white shadow-inner`}>
                          T-{b.id}
                        </div>
                        <div className="flex-grow min-w-0">
                          <h4 className="font-semibold text-sm leading-tight truncate group-hover:text-teal-400 transition-colors">
                            {b.title}
                          </h4>
                          <p className="text-xs text-slate-400 truncate mt-0.5 font-mono">
                            {b.origTitle}
                          </p>
                          <div className="flex items-center space-x-2 mt-1.5 text-[10px] text-slate-500">
                            <span className="bg-[#121932] text-slate-400 px-1.5 py-0.5 rounded border border-slate-800/30">
                              {b.year.split(" (")[0]}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-600 group-hover:text-teal-400 flex-shrink-0 self-center" />
                      </button>
                    ))
                  ) : (
                    <div className="text-center p-8 text-slate-500 text-xs font-mono">
                      <AlertTriangle className="h-8 w-8 text-rose-500/50 mx-auto mb-2" />
                      Nie znaleziono odpowiednich raportów misji w indeksie Agora.
                    </div>
                  )}
                </div>
              </div>

              {/* Big Display: Expanded Book Details and plots */}
              <div className="lg:col-span-7 bg-[#0B1020] border border-slate-800 rounded-xl p-6 flex flex-col justify-between shadow-xl min-h-[500px]">
                <div>
                  
                  {/* Top Header Card */}
                  <div className={`p-5 rounded-lg bg-gradient-to-r ${selectedBook.coverColor} text-white shadow-md relative overflow-hidden`}>
                    <div className="absolute right-3 top-3 opacity-15">
                      <BookOpen className="h-32 w-32" />
                    </div>
                    <div className="relative z-10">
                      <div className="text-xs font-mono tracking-wider bg-black/40 text-teal-400 w-max px-2 py-0.5 rounded mb-2">
                        OFICJALNY TOM {selectedBook.id}
                      </div>
                      <h2 className="text-2xl font-bold">{selectedBook.title}</h2>
                      <p className="text-sm text-teal-100 italic mt-0.5">{selectedBook.origTitle}</p>
                    </div>
                  </div>

                  {/* Fact Sheet Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5 p-4 bg-[#0F152A] border border-slate-800 rounded-lg font-mono text-xs">
                    <div>
                      <span className="text-slate-500 block uppercase font-bold mb-0.5">Lokalizacja:</span>
                      <span className="text-slate-200 flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-rose-500 flex-shrink-0" />
                        <span className="truncate" title={selectedBook.location}>{selectedBook.location}</span>
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block uppercase font-bold mb-0.5">Wydanie (PL):</span>
                      <span className="text-slate-200 truncate">{selectedBook.year}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block uppercase font-bold mb-0.5">Główny Wróg:</span>
                      <span className="text-slate-200 truncate" title={selectedBook.villain}>{selectedBook.villain}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block uppercase font-bold mb-0.5">Zagrożenie:</span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold inline-block border ${
                        selectedBook.difficulty === "Krytyczny" 
                          ? "bg-rose-950/50 text-rose-400 border-rose-500/50" 
                          : selectedBook.difficulty === "Wysoki"
                          ? "bg-orange-950/50 text-orange-400 border-orange-500/50"
                          : "bg-blue-950/50 text-blue-400 border-blue-500/50"
                      }`}>{selectedBook.difficulty}</span>
                    </div>
                  </div>

                  {/* Comprehensive Plot Section */}
                  <div className="mt-6 space-y-4">
                    <div>
                      <h4 className="text-xs font-mono text-teal-400 uppercase tracking-wider mb-1.5 font-bold flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-teal-400"></span> Streszczenie fabuły:
                      </h4>
                      <p className="text-xs md:text-sm text-slate-300 leading-relaxed bg-[#080B15] p-4 rounded-lg border border-slate-900 shadow-inner whitespace-pre-wrap">
                        {selectedBook.summary}
                      </p>
                    </div>

                    {/* Book Analysis Section */}
                    <div>
                      <h4 className="text-xs font-mono text-orange-400 uppercase tracking-wider mb-1.5 font-bold flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-orange-400"></span> Analiza wywiadowcza (Wątki i motywy):
                      </h4>
                      <p className="text-xs md:text-sm text-slate-300 leading-relaxed bg-[#101523]/50 p-4 rounded-lg border border-slate-900">
                        {selectedBook.analysis}
                      </p>
                    </div>
                  </div>

                </div>

                <div className="border-t border-slate-800/80 pt-4 mt-6 flex justify-between items-center text-[10px] text-slate-500 font-mono">
                  <span>Wydawca w Polsce: Wydawnictwo Agora</span>
                  <span>Zweryfikowano przez CIA Baza Orion</span>
                </div>

              </div>
            </motion.div>
          )}

          {/* 3. CHARACTERS TAB */}
          {activeTab === "characters" && (
            <motion.div
              key="characters-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow"
              id="characters-view"
            >
              {/* Characters List Sidebar */}
              <div className="lg:col-span-4 bg-[#0B1020] border border-slate-800 rounded-xl p-4 flex flex-col justify-between max-h-[550px]">
                <div>
                  <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3 px-1 text-center font-bold">
                    Rejestr CIA: Akta Osobowe
                  </h3>
                  <div className="space-y-2 overflow-y-auto max-h-[460px] pr-1">
                    {charactersData.map((char) => (
                      <button
                        key={char.id}
                        onClick={() => setSelectedCharacter(char)}
                        className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between ${
                          selectedCharacter.id === char.id
                            ? "bg-slate-805 bg-[#141B30] border-teal-500/60 shadow-lg text-teal-300"
                            : "bg-[#090D18] border-slate-800/80 hover:border-slate-700 text-slate-300 hover:bg-[#101526]"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`h-8 w-8 rounded-full font-mono text-xs font-bold flex items-center justify-center ${
                            char.alliance === "CIA" 
                              ? "bg-blue-950 text-blue-400 border border-blue-500/30" 
                              : "bg-rose-950 text-rose-400 border border-rose-500/30"
                          }`}>
                            {char.avatarText}
                          </div>
                          <div>
                            <h4 className="font-semibold text-xs leading-none truncate max-w-[150px]">
                              {char.name}
                            </h4>
                            <p className="text-[10px] text-slate-500 truncate max-w-[150px] mt-0.5">
                              {char.role}
                            </p>
                          </div>
                        </div>
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono ${
                          char.alliance === "CIA" 
                            ? "bg-blue-950/80 text-blue-400" 
                            : char.alliance === "SPYDER"
                            ? "bg-rose-950/80 text-rose-400"
                            : "bg-slate-800 text-slate-400"
                        }`}>{char.alliance}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Character Details Display */}
              <div className="lg:col-span-8 bg-[#0B1020] border border-slate-800 rounded-xl p-6 flex flex-col justify-between shadow-xl min-h-[500px]">
                <div className="space-y-6">
                  
                  {/* Character Meta Header card */}
                  <div className="flex flex-col md:flex-row items-center gap-5 p-5 bg-[#0F1426] border border-slate-800 rounded-lg">
                    <div className={`h-16 w-16 md:h-20 md:w-20 rounded-xl font-mono text-lg md:text-2xl font-bold flex items-center justify-center shadow-lg ${
                      selectedCharacter.alliance === "CIA" 
                        ? "bg-gradient-to-br from-blue-600 to-indigo-900 border border-blue-400/30 text-white" 
                        : "bg-gradient-to-br from-rose-600 to-red-900 border border-rose-400/30 text-white"
                    }`}>
                      {selectedCharacter.avatarText}
                    </div>
                    <div className="text-center md:text-left">
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-1">
                        <h2 className="text-xl md:text-2xl font-bold text-slate-100">{selectedCharacter.name}</h2>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                          selectedCharacter.alliance === "CIA" 
                            ? "bg-blue-900/40 text-blue-400 border border-blue-500/30" 
                            : "bg-rose-900/40 text-rose-400 border border-rose-500/30"
                        }`}>{selectedCharacter.alliance} REGISTRY</span>
                      </div>
                      <p className="text-sm text-teal-400 font-mono font-semibold">{selectedCharacter.role}</p>
                    </div>
                  </div>

                  {/* Character stats bar evaluations */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Character Bio Info */}
                    <div className="space-y-4">
                      <div className="bg-[#080B14] p-4 rounded-lg border border-slate-800/80">
                        <h4 className="text-xs font-mono text-slate-400 uppercase font-bold mb-1.5 flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5 text-teal-500" /> Charakterystyka ogólna:
                        </h4>
                        <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans">
                          {selectedCharacter.description}
                        </p>
                      </div>

                      <div className="bg-[#080B14] p-4 rounded-lg border border-slate-800/80 font-mono">
                        <h4 className="text-xs text-orange-400 uppercase font-bold mb-1 flex items-center gap-1.5">
                          <Lock className="h-3.5 w-3.5" /> Specjalna Zmierzeń:
                        </h4>
                        <p className="text-xs text-slate-300 font-sans italic">
                          {selectedCharacter.specialSkill}
                        </p>
                      </div>
                    </div>

                    {/* Numerical Stats representation */}
                    <div className="bg-[#080B14] p-5 rounded-lg border border-slate-800/80 font-mono space-y-4">
                      <h4 className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-2 text-center border-b border-slate-800 pb-2">
                        Taktyczna Specyfikacja Statystyk
                      </h4>

                      {/* Stat 1: Intelligence */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">INTELECT (Analiza i klogika)</span>
                          <span className="text-slate-200 font-bold">{selectedCharacter.intelligence}%</span>
                        </div>
                        <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                          <div 
                            className="bg-teal-500 h-full rounded-full transition-all duration-500" 
                            style={{ width: `${selectedCharacter.intelligence}%` }}
                          />
                        </div>
                      </div>

                      {/* Stat 2: Martial Arts */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">WALKA MIELE (Sztuki walki)</span>
                          <span className="text-slate-200 font-bold">{selectedCharacter.martialArts}%</span>
                        </div>
                        <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                          <div 
                            className="bg-orange-500 h-full rounded-full transition-all duration-500" 
                            style={{ width: `${selectedCharacter.martialArts}%` }}
                          />
                        </div>
                      </div>

                      {/* Stat 3: Stealth */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">STEALTH (Kamuflaż i infiltracja)</span>
                          <span className="text-slate-200 font-bold">{selectedCharacter.stealth}%</span>
                        </div>
                        <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                          <div 
                            className="bg-sky-500 h-full rounded-full transition-all duration-500" 
                            style={{ width: `${selectedCharacter.stealth}%` }}
                          />
                        </div>
                      </div>

                      <div className="text-[10px] text-slate-500 text-center leading-tight mt-4 pt-2 border-t border-slate-800/50">
                        *Wyznaczone statystyki oparte na ocenach Dyrekcji Treningu Operacyjnego CIA (D.T.O.)
                      </div>

                    </div>

                  </div>

                </div>

                <div className="border-t border-slate-800/80 pt-4 mt-6 flex justify-between items-center text-[10px] font-mono text-slate-500">
                  <span>Rejestr CIA Waszyngton</span>
                  <span className="text-rose-400 hover:text-rose-300 cursor-pointer flex items-center gap-1" onClick={() => handleSendMessage(`Zrób pełne podsumowanie postaci ${selectedCharacter.name}`)}>
                    <Terminal className="h-3 w-3" /> Zapytaj AI o tę postać
                  </span>
                </div>

              </div>
            </motion.div>
          )}

          {/* 4. QUIZ TAB */}
          {activeTab === "quiz" && (
            <motion.div
              key="quiz-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="max-w-3xl mx-auto w-full flex flex-col pt-4 flex-grow"
              id="quiz-view"
            >
              
              {!quizStarted ? (
                /* Quiz Intro screen */
                <div className="bg-[#0B1020] border border-slate-800 rounded-xl p-8 text-center space-y-6 shadow-2xl">
                  <div className="h-16 w-16 bg-teal-950/70 border border-teal-500/30 text-teal-400 rounded-full flex items-center justify-center mx-auto shadow-lg animate-pulse">
                    <Award className="h-9 w-9" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight text-slate-100">Przegląd Kwalifikacji Szpiegowskich: Egzamin CIA</h2>
                    <p className="text-sm text-slate-400 font-mono tracking-wide max-w-md mx-auto">
                      Oficjalny pakiet ewaluacyjny dla kandydatów na agentów polowych. Odpowiedzi na pytania zweryfikują Twoją wiedzę o przygodach Bena Ripleya, intrygach SPYDER i tajemnicach rodziny Hale'ów.
                    </p>
                  </div>

                  <div className="border-t border-b border-slate-800 py-4 max-w-sm mx-auto grid grid-cols-2 gap-4 text-xs font-mono text-slate-400">
                    <div>
                      <span className="block text-slate-500 font-bold uppercase">Liczba Zmierzeń:</span>
                      <span className="text-slate-200">{quizQuestions.length} Pytania testowe</span>
                    </div>
                    <div>
                      <span className="block text-slate-500 font-bold uppercase">Poziom Wiedzy:</span>
                      <span className="text-slate-200">Tom 1 do 10</span>
                    </div>
                  </div>

                  <button
                    onClick={startQuiz}
                    className="px-8 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-lg transition-colors text-sm uppercase tracking-wider"
                  >
                    Uruchom Symulator Egzaminu
                  </button>
                </div>
              ) : quizFinished ? (
                /* Quiz Finished summary */
                <div className="bg-[#0B1020] border border-slate-800 rounded-xl p-8 text-center space-y-6 shadow-2xl">
                  <div className="h-16 w-16 bg-slate-950/70 border border-slate-800 rounded-full flex items-center justify-center mx-auto text-teal-400 font-mono text-xl font-bold shadow-lg">
                    {score} / {quizQuestions.length}
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-xs font-mono text-teal-400 uppercase font-bold">Wynik Ewaluacji Operacyjnej:</div>
                    <h2 className="text-2xl font-bold">{getAgentRank(score).title}</h2>
                  </div>

                  <div className={`p-5 border rounded-lg text-sm max-w-lg mx-auto leading-relaxed ${getAgentRank(score).color}`}>
                    {getAgentRank(score).desc}
                  </div>

                  <div className="flex gap-4 justify-center pt-2">
                    <button
                      onClick={startQuiz}
                      className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
                    >
                      <RefreshCw className="h-4 w-4" /> Powtórz Test
                    </button>
                    <button
                      onClick={() => setActiveTab("chat")}
                      className="px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 rounded-lg text-sm font-bold transition-colors"
                    >
                      Porozmawiaj z AI o Serii
                    </button>
                  </div>
                </div>
              ) : (
                /* Active Quiz question displaying and solving */
                <div className="bg-[#0B1020] border border-slate-800 rounded-xl p-6.5 shadow-2xl space-y-6">
                  
                  {/* Progress Header bar */}
                  <div className="flex justify-between items-center text-xs font-mono border-b border-slate-800 pb-3">
                    <span className="text-slate-400">Pytanie {currentQuestionIndex + 1} z {quizQuestions.length}</span>
                    <span className="text-teal-400 font-bold bg-teal-950/60 px-2.5 py-1 rounded border border-teal-500/20">AKTYWNY EGZAMIN CIA</span>
                  </div>

                  {/* Question Title */}
                  <div className="space-y-4">
                    <h3 className="text-base md:text-lg font-bold text-slate-100 flex items-start gap-3">
                      <HelpCircle className="h-6 w-6 text-teal-400 flex-shrink-0 mt-0.5" />
                      <span>{quizQuestions[currentQuestionIndex].question}</span>
                    </h3>

                    {/* Options list */}
                    <div className="space-y-2.5">
                      {quizQuestions[currentQuestionIndex].options.map((opt, idx) => {
                        
                        let optionStyle = "bg-[#090D18] border-slate-800 text-slate-300 hover:bg-[#101526] hover:border-slate-700";
                        if (selectedAnswerIndex === idx) {
                          optionStyle = "bg-[#141B33] border-teal-500 text-teal-300";
                        }
                        if (isAnswerSubmitted) {
                          if (idx === quizQuestions[currentQuestionIndex].answerIndex) {
                            optionStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-400";
                          } else if (selectedAnswerIndex === idx) {
                            optionStyle = "bg-rose-950/60 border-rose-500 text-rose-400 cursor-not-allowed";
                          } else {
                            optionStyle = "bg-[#090D18] border-slate-900 text-slate-500 cursor-not-allowed";
                          }
                        }

                        return (
                          <button
                            key={idx}
                            disabled={isAnswerSubmitted}
                            onClick={() => setSelectedAnswerIndex(idx)}
                            className={`w-full text-left p-3.5 rounded-lg border text-xs md:text-sm font-medium transition-all flex justify-between items-center ${optionStyle}`}
                          >
                            <span>{opt}</span>
                            {isAnswerSubmitted && idx === quizQuestions[currentQuestionIndex].answerIndex && (
                              <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                            )}
                            {isAnswerSubmitted && selectedAnswerIndex === idx && idx !== quizQuestions[currentQuestionIndex].answerIndex && (
                              <XCircle className="h-4 w-4 text-rose-400 flex-shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Submit/Next Control bar and explanation info */}
                  <div className="border-t border-slate-800 pt-5 flex flex-col sm:flex-row gap-4 justify-between items-center">
                    
                    {/* Explanation */}
                    <div className="flex-grow min-w-0 max-w-md">
                      {isAnswerSubmitted && (
                        <div className="bg-[#0E1528] rounded-lg p-3 border border-slate-800 text-xs text-slate-400 leading-relaxed font-sans">
                          <span className="font-bold text-teal-400 font-mono text-[10px] block uppercase mb-0.5">Raport Dydaktyczny:</span>
                          {quizQuestions[currentQuestionIndex].explanation}
                        </div>
                      )}
                    </div>

                    {/* Action button */}
                    <div className="flex-shrink-0">
                      {!isAnswerSubmitted ? (
                        <button
                          onClick={handleAnswerSubmit}
                          disabled={selectedAnswerIndex === null}
                          className="px-6 py-2.5 bg-teal-500 hover:bg-teal-400 disabled:bg-slate-800 text-slate-950 font-bold rounded-lg transition-colors text-xs font-mono uppercase"
                        >
                          Zatwierdź Odpowiedź
                        </button>
                      ) : (
                        <button
                          onClick={handleNextQuestion}
                          className="px-6 py-2.5 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-lg transition-colors text-xs font-mono uppercase"
                        >
                          {currentQuestionIndex + 1 < quizQuestions.length ? "Dalej" : "Koniec Egzaminu"}
                        </button>
                      )}
                    </div>

                  </div>

                </div>
              )}

            </motion.div>
          )}

          {/* 4. QUOTES & MANEUVERS TAB */}
          {activeTab === "quotes" && (
            <motion.div
              key="quotes-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6 flex-grow"
              id="quotes-view"
            >
              {/* Header info */}
              <div className="bg-[#0B1020] border border-slate-800 rounded-xl p-5 md:p-6 shadow-xl space-y-4 animate-fadeIn">
                <div className="flex items-center space-x-2.5 text-teal-400 font-mono text-xs md:text-sm uppercase font-bold">
                  <Terminal className="h-5 w-5 text-teal-400 animate-pulse" />
                  <span>Instruktaż Taktyczny: Oficjalna Terminologia CIA</span>
                </div>
                <p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-3xl">
                  Przeglądaj niesamowitą, autorską terminologię taktyczną stworzoną przez Stuarta Gibbsa w książkach serii <span className="text-slate-300 font-semibold">„Szkoła szpiegów”</span>. Poznaj uniki, techniki zmylenia przeciwnika oraz improwizacje z Bazy Danych CIA – od legendarnego <span className="text-teal-400 font-bold">Manewru Bombajskiego</span> po nieobliczalną <span className="text-emerald-400 font-semibold">Klogistykę Bena Ripleya</span>.
                </p>
              </div>

              {/* Maneuvers grid */}
              {filteredManeuvers.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {filteredManeuvers.map((maneuver) => {
                    // Color styling for difficulties
                    const isLegendary = maneuver.difficulty === "Legendarny";
                    const isAdvanced = maneuver.difficulty === "Zaawansowany";
                    const isMedium = maneuver.difficulty === "Średni";
                    
                    let diffColor = "bg-emerald-950/80 border-emerald-500/30 text-emerald-400";
                    if (isLegendary) diffColor = "bg-fuchsia-950/80 border-fuchsia-500/50 text-fuchsia-400 animate-pulse";
                    else if (isAdvanced) diffColor = "bg-rose-950/80 border-rose-500/40 text-rose-400";
                    else if (isMedium) diffColor = "bg-amber-950/80 border-amber-500/40 text-amber-400";

                    return (
                      <div
                        key={maneuver.id}
                        className={`bg-[#0B1020] border rounded-xl p-5 flex flex-col justify-between hover:border-slate-700 transition-all hover:shadow-[0_4px_15px_rgba(0,0,0,0.3)] relative overflow-hidden ${
                          isLegendary ? "border-fuchsia-900/40 shadow-[0_0_15px_rgba(217,70,239,0.05)]" : "border-slate-800"
                        }`}
                      >
                        <div className="space-y-4">
                          {/* Header info */}
                          <div className="flex justify-between items-start gap-2 border-b border-slate-800/40 pb-2.5">
                            <div>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <h3 className="text-xs md:text-sm font-bold text-slate-100 uppercase tracking-tight">
                                  {maneuver.name}
                                </h3>
                                <span className="text-[10px] text-slate-500 font-mono font-medium tracking-wide">
                                  ({maneuver.englishName})
                                </span>
                              </div>
                              <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                                Założyciel/Twórca: <span className="text-teal-400">{maneuver.origin}</span>
                              </p>
                            </div>
                            <span className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase font-bold border ${diffColor}`}>
                              {maneuver.difficulty}
                            </span>
                          </div>

                          {/* Description body */}
                          <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans pr-2">
                            {maneuver.description}
                          </p>

                          {/* Effectiveness graph progress bar */}
                          <div className="bg-[#090D18] p-3 rounded-lg border border-slate-900 space-y-1.5">
                            <div className="flex justify-between items-center text-[10px] font-mono">
                              <span className="text-slate-500 uppercase font-bold">Współczynnik skuteczności:</span>
                              <span className="text-teal-400 font-bold">{maneuver.effectiveness}%</span>
                            </div>
                            <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all duration-1000 ${
                                  isLegendary ? "bg-fuchsia-500 shadow-[0_0_8px_rgba(217,70,239,0.6)]" : 
                                  isAdvanced ? "bg-rose-500" : "bg-teal-500"
                                }`}
                                style={{ width: `${maneuver.effectiveness}%` }}
                              />
                            </div>
                          </div>

                          {/* Step by step manual instruction guide list */}
                          <div className="bg-[#080B14] p-3.5 rounded-lg border border-slate-800/50 space-y-2">
                            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
                              Procedura operacyjnego wdrożenia (Instrukcja):
                            </span>
                            <div className="space-y-2 text-xs text-slate-300 font-sans">
                              {maneuver.instructions.split("\n").map((step, idx) => (
                                <div key={idx} className="flex gap-2 items-start">
                                  <span className="bg-[#12182B] text-teal-400 font-mono text-[9px] font-bold h-4 w-4 rounded flex items-center justify-center border border-teal-500/20 flex-shrink-0 mt-0.5">
                                    {idx + 1}
                                  </span>
                                  <p className="leading-relaxed text-[11px] md:text-xs">{step.replace(/^\d+\.\s*/, "")}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Tom source footer & Ask AI button */}
                        <div className="mt-5 pt-3 border-t border-slate-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0a0f1d] -mx-5 -mb-5 p-4 rounded-b-xl border-t border-slate-800/40">
                          <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                            <BookOpen className="h-3 w-3 text-slate-500 flex-shrink-0" />
                            <span>Książka: {maneuver.bookTitle}</span>
                          </span>

                          <button
                            onClick={() => handleAskAboutManeuver(maneuver)}
                            className="px-3 py-1.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-md text-[10px] font-mono transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                            title="Skonsultuj taktykę z systemem analitycznym AI"
                          >
                            <Terminal className="h-3.5 w-3.5" />
                            <span>Symuluj z AI</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-[#0B1020] border border-slate-800 rounded-xl p-12 text-center space-y-4">
                  <AlertTriangle className="h-10 w-10 text-orange-400/70 mx-auto animate-pulse" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-200">Nie znaleziono takich manewrów</h3>
                    <p className="text-xs text-slate-500 mt-1">Brak terminów taktycznych.</p>
                  </div>
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Footer copyright */}
      <footer className="bg-[#090D1B] border-t border-slate-800/80 py-6 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p>
            System Informacji Wywiadu CIA model ORION opracowany dla pasjonatów serii „Szkoła szpiegów”.
          </p>
          <p className="text-[10px] text-slate-600">
            Wszystkie prawa autorskie do nazwisk, tytułów oraz uniwersum należą do Stuarta Gibbsa oraz Wydawnictwa Agora (Lubimyczytać.pl).
          </p>
        </div>
      </footer>

    </div>
  );
}
