import { Book, Character, QuizQuestion, SpyQuote, SpyManeuver } from "./types";

export const booksData: Book[] = [
  {
    id: 1,
    title: "Szkoła szpiegów",
    origTitle: "Spy School",
    year: "Agora, 2018 (Oryg. 2012)",
    location: "Waszyngton D.C., Akademia Szpiegostwa CIA",
    villain: "Kret wewnątrz akademii kandydujący do SPYDER (P.A.Y.E.C.)",
    difficulty: "Średni",
    coverColor: "from-blue-600 to-indigo-800",
    summary: `Dwunastoletni Benjamin Ripley, wybitnie uzdolniony matematycznie chłopak, zostaje nagle zwerbowany do elitarnej Akademii Szpiegostwa CIA. Początkowo Ben uważa, że to nagroda za jego geniusz matematyczny. Na miejscu szybko zdaje sobie sprawę, że w szkole panuje chaos, on sam nie radzi sobie z treningiem fizycznym, a naboje w broniach bywają ostre. 

Niebawem Ben odkrywa prawdę: został zwerbowany jako „przynęta”. CIA ma dowody, że w murach akademii działa kret, który próbuje wykraść system szyfrujący. Ponieważ Ben rzekomo dysponuje genialnym kodem, ma przyciągnąć uwagę zdrajcy. W niebezpiecznej intrydze Ben poznaje Erikę Hale – niesamowicie utalentowaną, 15-letnią córkę i wnuczkę legendarnych agentów, która jako jedyna wydaje się w pełni przygotowana do zawodu. Wspólnie z Eriką, Ben odkrywa, że kret to jeden z uczniów współpracujący ze zbrodniczą organizacją SPYDER. Dzięki genialnemu analitycznemu myśleniu, Ripley rozszyfrowuje kryjówkę kreta i ratuje akademię przed wysadzeniem w powietrze.`,
    analysis: "Książka pokazuje przejście głównego bohatera ze świata zwykłego nastolatka do skomplikowanej gry dyplomatyczno-szpiegowskiej. Głównym motywem jest obalenie mitu idealnego szpiega (uosabianego przez komicznego i niezdarnego Alexandra Hale'a) na rzecz analitycznego myślenia i inteligencji emocjonalnej."
  },
  {
    id: 2,
    title: "Szkoła szpiegów na wakacjach",
    origTitle: "Spy Camp",
    year: "Agora, 2019 (Oryg. 2013)",
    location: "Góry w stanie Maine, Obóz Szpiegowski CIA (Camp Wilderness)",
    villain: "SPYDER (P.A.Y.E.C.)",
    difficulty: "Średni",
    coverColor: "from-emerald-600 to-teal-800",
    summary: `Po ciężkim semestrze w akademii, Ben marzy o odpoczynku. Niestety, rekruci CIA nie mają prawdziwych wakacji – zamiast tego zostają wysłani na letni obóz przetrwania w dzikich lasach Maine. Już na samym początku drogi Ben zostaje zaatakowany. Agenci złowrogiego konsorcjum SPYDER przekazują mu ultimatum: albo dołączy do ich organizacji, albo zginie. Do tego SPYDER grozi zniszczeniem całego obozu.

Ben, wspólnie z Eriką Hale oraz jej rzekomo legendarnym, lecz w rzeczywistości niekompetentnym ojcem Alexandrem, musi uciekać przed pościgiem w głąb dzikiej głuszy. Wychodzi na jaw, że SPYDER planuje zrealizować wielki zamach bombowy i porwać kluczowych przywódców. Ben wykorzystuje znajomość topografii i matematyczne obliczenia trajektorii, by przechytrzyć wroga. Książka kończy się sukcesem, ale organizacja szpiegowska SPYDER udowadnia, że ma potężne macki sięgające samych szczytów władzy.`,
    analysis: "Drugi tom mocno eksploruje dynamikę rodzinną rodu Hale'ów oraz uwypukla kontrast między wyidealizowanymi opowieściami Alexandra, a brutalną rzeczywistością. Relacja Bena i Eriki staje się głębsza, oparta na wzajemnym zaufaniu w ekstremalnych warunkach leśnych."
  },
  {
    id: 3,
    title: "Szkoła szpiegów w chmurach",
    origTitle: "Evil Spy School",
    year: "Agora, 2020 (Oryg. 2015)",
    location: "Tajna baza szkoleniowa SPYDER-a, Pensylwania",
    villain: "Nauczyciele i dowódcy SPYDER, w tym Murray Hill",
    difficulty: "Wysoki",
    coverColor: "from-rose-600 to-red-900",
    summary: `Po niefortunnym wypadku z wyrzutnią rakietową na terenie akademii CIA, Ben Ripley zostaje oficjalnie wydalony ze szkoły szpiegowskiej. Załamany chłopak wraca do zwykłego życia, ale nie na długo. Wkrótce kontaktuje się z nim SPYDER z kuszącą ofertą. Skoro CIA go odrzuciło, SPYDER chętnie przyjmie jego genialny matematyczny umysł i wyszkoli go we własnej, luksusowej akademii zła (Evil Spy School).

Ben decyduje się na podjęcie najbardziej ryzykownego kroku w swoim życiu: przyjmuje ofertę, by działać jako nieautoryzowany podwójny agent CIA. Na miejscu odkrywa, że szkoła SPYDER-a uczy sabotażu, kradzieży i manipulacji. Spotyka tam rówieśników u boku dawnego wroga Murraya Hilla. SPYDER przygotowuje wielki zamach na nowojorskie finanse. Ben musi dostarczać informacje CIA, jednocześnie nie dając się zdemaskować bezwzględnym instruktorom. W kluczowym momencie, dzięki pomocy Eriki, krzyżuje plany wroga, udowadniając swoją bezgraniczną lojalność wobec ojczyzny.`,
    analysis: "Ten tom to klasyczna opowieść o lojalności i pokusie. Czytelnik obserwuje dylematy moralne młodego Bena i mechanizmy psychologiczne, jakimi posługują się korporacje zbrodni, by przeciągać na swoją stronę zagubionych nastolatków."
  },
  {
    id: 4,
    title: "Szkoła szpiegów na nartach",
    origTitle: "Spy School Ski Spree",
    year: "Agora, 2020 (Oryg. 2016)",
    location: "Aspen, stan Kolorado (kurort narciarski)",
    villain: "Leo Shang (chiński miliarder powiązany ze SPYDER-em)",
    difficulty: "Wysoki",
    coverColor: "from-sky-500 to-blue-700",
    summary: `Ben Ripley zostaje wysłany na swoją pierwszą oficjalną misję terenową w luksusowym kurorcie narciarskim Aspen w Kolorado. Jego zadaniem jest zbliżenie się do Jessiki Shang, córki podejrzanego chińskiego miliardera Leo Shanga, o którym CIA podejrzewa, że planuje globalny sabotaż przy użyciu broni nuklearnej.

Głównym problemem Bena jest to, że... zupełnie nie potrafi jeździć na nartach, co w Aspen jest kluczowe dla zachowania przykrywki. Na domiar złego warunki atmosferyczne i zabójcy czyhający na stokach utrudniają zadanie. Erika Hale ponownie czuwa w cieniu, ale to Ben musi zdobyć zaufanie Jessiki. Odkrywa, że Leo Shang kupił i zmodyfikował rosyjski pocisk balistyczny, który zamierza wystrzelić. W brawurowej akcji na ośnieżonych szczytach, łącząc jazdę na nartach, ucieczkę skuterem śnieżnym i hakowanie systemów naprowadzania, Ben ratuje tysiące żyć.`,
    analysis: "Wprowadzenie motywu bogactwa i wielkiego biznesu powiązanego ze szpiegostwem. Tom promuje asymilację w obcych środowiskach (social engineering) jako kluczową cechę nowoczesnego agenta wywiadu."
  },
  {
    id: 5,
    title: "Szkoła szpiegów w tajnej służbie",
    origTitle: "Spy School Secret Service",
    year: "Agora, 2021 (Oryg. 2017)",
    location: "Waszyngton D.C., Biały Dom",
    villain: "Zdrajcy w Secret Service infiltrowani przez SPYDER",
    difficulty: "Krytyczny",
    coverColor: "from-amber-600 to-yellow-800",
    summary: `Ben Ripley otrzymuje zadanie najwyższej wagi państwowej: ochronę syna prezydenta Stanów Zjednoczonych w samym Białym Domu. Misja wydaje się prestiżowa, ale szybko zamienia się w koszmar. SPYDER przygotował wyrafinowaną pułapkę. W wyniku precyzyjnego sabotażu dochodzi do próby zamachu na prezydenta, a wszystkie dowody obciążają... Bena!

Ścigany przez Secret Service, FBI i policję jako wróg publiczny numer jeden, Ben musi uciekać. Towarzyszy mu niezawodna Erika Hale. Wspólnie infiltrują podziemne tunele Waszyngtonu i badają tropy, by dowieść niewinności Bena. Odkrywają spisek na najwyższych szczeblach tajnych służb prezydenckich. Przeciwnik zamierzał wywołać kryzys międzynarodowy. Wykorzystując odwagę i talenty klogistyczne, Ben demaskuje prawdziwego winnego przed samym prezydentem w ostatniej chwili.`,
    analysis: "Jedna z najbardziej dynamicznych części, w której główny bohater uczy się przetrwać bez wsparcia oficjalnych struktur rządowych. Pokazuje mroczniejsze oblicze manipulacji medialnych i podatności systemów bezpieczeństwa na zdrady wewnętrzne."
  },
  {
    id: 6,
    title: "Szkoła szpiegów idzie na wojnę",
    origTitle: "Spy School Goes South",
    year: "Agora, 2021 (Oryg. 2018)",
    location: "Antarktyda, tajny kompleks lodowy",
    villain: "Murray Hill i niedobitki dowództwa SPYDER",
    difficulty: "Krytyczny",
    coverColor: "from-cyan-600 to-slate-800",
    summary: `Po wydarzeniach w Białym Domu, CIA dowiaduje się, że uwięziony Murray Hill chętnie wyda główną, dotąd nieznaną kwaterę dowodzenia organizacji SPYDER. Jest jednak haczyk: żąda, by to właśnie Ben Ripley poleciał z nim na miejsce odbioru danych. Trop prowadzi do lodowych pustkowi Antarktydy.

Na miejscu okazuje się, że Murray znowu uknuł intrygę. Zamiast opuszczonej bazy, agenci trafiają prosto w ogień walki w supernowoczesnej bazie ukrytej pod lodem. Ben i Erika muszą zmierzyć się z ekstremalnie niskimi temperaturami, zabójczymi pułapkami, a nawet zmodyfikowanymi genetycznie drapieżnikami. SPYDER planował roztopić lodowce Antarktydy, wywołując potop na świecie, by zarobić miliardy na gruntach leśnych i wygenerować chaos. Brawurowa akcja Bena, połączona z poświęceniem przyjaciół, doprowadza do niemal całkowitego rozbicia struktur SPYDER-a.`,
    analysis: "Tom z silnym przesłaniem ekologicznym i technologicznym. Eksploruje tematykę ekstremalnego przetrwania (survivalu) i pokazuje, jak chęć zysku potrafi napędzać największe kryzysy geopolityczne."
  },
  {
    id: 7,
    title: "Szkoła szpiegów w puszczy",
    origTitle: "Spy School British Invasion",
    year: "Agora, 2022 (Oryg. 2019)",
    location: "Londyn, Wielka Brytania i francuskie zamki",
    villain: "Kluczowi liderzy SPYDER (rodzina Swiftów)",
    difficulty: "Wysoki",
    coverColor: "from-purple-600 to-fuchsia-800",
    summary: `Wraz z rozbiciem baz SPYDER-a, ocaleli przywódcy uciekają do Europy. Ben, Erika oraz ich ekipa (w tym niezrównany dziadek Cyrus) ruszają ich śladem bezpośrednio do Londynu. To walka o ostateczny cios dla złowrogiej organizacji. Na brytyjskiej ziemi okazuje się, że SPYDER planuje uderzyć w serce tamtejszego wywiadu MI6 i przejąć kontrolę nad tajnymi bazami danych korony Brytyjskiej.

Akcja toczy się od ulic Londynu po francuskie prowincje. Ben musi współpracować z brytyjskimi agentami, którzy nie ufają Amerykanom. Wychodzi na jaw tajemnica ukrytego od stuleci skarbu i bezcennych dokumentów. Podczas gdy Alexander Hale znowu komplikuje sytuację, Ben i Erika realizują misję infiltracji zamku. Kończy się to spektakularnym rozbiciem ostatniej wielkiej komórki operacyjnej SPYDER-a.`,
    analysis: "Wprowadzenie motywów historycznych i klasycznej europejskiej intrygi szpiegowskiej. Skupia się na współpracy międzynarodowej wywiadów oraz ostatecznym zamknięciu wielu wątków związanych z głównym wrogiem z ubiegłych tomów."
  },
  {
    id: 8,
    title: "Szkoła szpiegów. Wyprawa do lasu",
    origTitle: "Spy School Revolution",
    year: "Agora, 2022 (Oryg. 2020)",
    location: "Lasy Pensylwanii, Waszyngton D.C.",
    villain: "Nowe, tajemnicze ugrupowanie anarchizujące Croatoan",
    difficulty: "Krytyczny",
    coverColor: "from-orange-600 to-amber-900",
    summary: `Społeczność szpiegowska przeżywa szok: Erika Hale zostaje sfilmowana podczas wysadzania w powietrze budynku powiązanego z CIA i oficjalnie uznana za zdrajczynię narodu! Ben Ripley odmawia uwierzenia w te doniesienia i rozpoczyna własne, nieautoryzowane śledztwo, by dowieść, że dziewczyna została zmanipulowana lub działa pod przykrywką.

Okazuje się, że za wszystkim stoi Croatoan – starożytna, tajna organizacja z korzeniami sięgającymi pierwszych osadników w Ameryce Północnej, która chce zemścić się na rządzie USA. Ben musi śledzić Erikę, która wydaje się grać po stronie wroga. Dochodzi do skomplikowanej gry pozorów w głębi dzikich lasów Pensylwanii. Ostatecznie Ben odkrywa, że Croatoan planuje zniszczyć kwaterę główną CIA przy użyciu podziemnych zasobów gazu. Wspólny wysiłek Bena i ocalonej z rąk wroga matki Eriki przynosi ratunek dla agencji.`,
    analysis: "Tom przynosi zwrot akcji w postaci oskarżenia Eriki o zdradę, co testuje lojalność Bena. Pokazuje, jak niewzruszona wiara w drugiego człowieka może pokonać nawet najbardziej wyrafinowane manipulacje socjotechniczne."
  },
  {
    id: 9,
    title: "Szkoła szpiegów. Na dnie morza",
    origTitle: "Spy School at Sea",
    year: "Agora, 2023 (Oryg. 2021)",
    location: "Ocean Atlantycki, luksusowy statek wycieczkowy 'Emperor of the Seas'",
    villain: "Szalony naukowiec z nowym zagrożeniem rakietowym",
    difficulty: "Wysoki",
    coverColor: "from-violet-600 to-indigo-900",
    summary: `Ben Ripley i Erika Hale otrzymują nowe, nietypowe zadanie. Muszą wejść pod przebraniem na luksusowy, gigantyczny statek wycieczkowy płynący przez Atlantyk. CIA podejrzewa, że na pokładzie przebywa genialny inżynier i terrorysta powiązany z Croatoan, który zamierza wystrzelić niezwykle groźne rakiety ukryte na dnie oceanu i zatopić kluczowe cele.

Ben musi udawać luksusowego turystę i jednocześnie badać niedostępne dla gości pokłady techniczne statku. Rejs obfituje w komiczne i groźne sytuacje – od ataków rekinów po przymusowe bale maskowe. Kiedy intryga wychodzi na jaw, okazuje się, że zagrożenie jest bezpośrednio pod ich stopami na dnie morza. Ben wykazuje się zdolnościami fizycznymi, które wypracował przez lata, i udowadnia, że stał się wszechstronnym, rasowym agentem wywiadu.`,
    analysis: "Eksploracja środowiska wodnego i klaustrofobicznej przestrzeni wielkiego statku pasażerskiego. Książka kładzie duży nacisk na technologię morską, ekologię oceanów oraz ewolucję fizycznej pewności siebie Bena."
  },
  {
    id: 10,
    title: "Szkoła szpiegów w kosmosie",
    origTitle: "Spy School Project X",
    year: "Agora, 2024 (Oryg. 2022)",
    location: "Kwatery cyber-technologiczne, Kalifornia",
    villain: "Internetowe trolle, cyberprzestępcy i multimiliardowi potentaci technologiczni",
    difficulty: "Krytyczny",
    coverColor: "from-slate-700 to-purple-950",
    summary: `W dobie Internetu i technologii szpiedzy muszą mierzyć się z nowym zagrożeniem. Ekscentryczny multimiliarder i celebryta technologiczny ogłasza w sieci gigantyczną nagrodę dla każdego internauty, który zdoła wytropić i pojmać... Bena Ripleya! Miliarder twierdzi, że Ben jest groźnym hakerem. 

Ben natychmiast staje się celem milionów amatorów i zawodowych cyber-łowców nagród na całym świecie. Musi uciekać i ukrywać się przed wszechobecnymi kamerami smartfonów. Wraz z Eriką Hale i młodym programistycznym zespołem, Ben rusza do serca Doliny Krzemowej, by powstrzymać systemy inwigilacji zwane Project X. Końcowe starcie w ultranowoczesnym centrum serwerowym decyduje o prawie do prywatności miliardów ludzi na całym świecie.`,
    analysis: "Satyra na nowoczesne media społecznościowe, kulturę influencerów oraz zagrożenia płynące ze sztucznej inteligencji i masowej inwigilacji korporacyjnej. Ben Ripley uczy się tu, jak walczyć w świecie, w którym prywatność przestała istnieć."
  }
];

export const charactersData: Character[] = [
  {
    id: "ben-ripley",
    name: "Benjamin Ripley (Ben)",
    role: "Główny bohater / Matematyczny geniusz",
    intelligence: 98,
    martialArts: 45,
    stealth: 75,
    specialSkill: "Błyskawiczne obliczenia krytyczne w pamięci i niesamowite szczęście",
    description: "Zwyczajny 12-latek (później starszy), którego genialny zmysł matematyczny wciągnął w niebezpieczny świat CIA. Choć na początku nie potrafił zrobić ani jednej pompki, jego analityczny umysł i opanowanie w sytuacjach kryzysowych uratowały świat ponad dziesięć razymont.",
    alliance: "CIA",
    avatarText: "BR"
  },
  {
    id: "erica-hale",
    name: "Erica Hale",
    role: "Najlepsza kadetka akademii / Instruktorka",
    intelligence: 95,
    martialArts: 99,
    stealth: 98,
    specialSkill: "Bezbłędne opanowanie wszystkich sztuk walki, infiltracja i ucieczka",
    description: "Córka, wnuczka i prawnuczka najznamienitszych agentów wywiadu w historii. Perfekcyjna pod każdym względem, chłodna, analityczna i rygorystyczna. Choć udaje, że Ben jest dla niej tylko irytującym partnerem, kocha go i zrobiłaby dla niego wszystko.",
    alliance: "CIA",
    avatarText: "EH"
  },
  {
    id: "alexander-hale",
    name: "Alexander Hale",
    role: "Sztuczny as wywiadu / Ojciec Eriki",
    intelligence: 30,
    martialArts: 55,
    stealth: 25,
    specialSkill: "Nienaganny wygląd w smokingu i profesjonalny ton głosu maskujący absolutny brak kompetencji",
    description: "Rzekomo wybitny szpieg, którego opowieści mrożą krew w żyłach. W rzeczywistości jest niezdarą o ogromnym parciu na szkło, który wszystkie swoje zasługi zawdzięcza córce Erice lub Benowi. Mimo to ma dobre serce i kocha swoją rodzinę.",
    alliance: "CIA",
    avatarText: "AH"
  },
  {
    id: "cyrus-hale",
    name: "Cyrus Hale",
    role: "Założyciel dynastii szpiegów / Dziadek Eriki",
    intelligence: 92,
    martialArts: 90,
    stealth: 94,
    specialSkill: "Tradycyjne metody szpiegowskie z czasów Zimnej Wojny i bezlitosny rygor",
    description: "Emerytowany, ale wciąż niezwykle groźny agent CIA. Uważa, że nowoczesne komputery to bzdura, a szpieg powinien polegać wyłącznie na instynkcie, sprycie i fizycznej sile. Kocha Erikę i szanuje Bena za jego matematyczne triumfy.",
    alliance: "CIA",
    avatarText: "CH"
  },
  {
    id: "murray-hill",
    name: "Murray Hill",
    role: "Dezerter / Agent SPYDER-a",
    intelligence: 85,
    martialArts: 20,
    stealth: 80,
    specialSkill: "Kombinatorstwo na najwyższym poziomie i unikanie jakiejkolwiek pracy fizycznej",
    description: "Uczeń, który pierwotnie zaprzyjaźnił się z Benem. Okazał się leniwym, cynicznym uciekinierem współpracującym ze SPYDER-em tylko po to, by uniknąć rygorystycznych egzaminów CIA i grać na konsolach w luksusie. Kluczowy czarny charakter i genialny uciekinier.",
    alliance: "SPYDER",
    avatarText: "MH"
  },
  {
    id: "zoe-cene",
    name: "Zoe Cene",
    role: "Kadetka / Specjalistka ds. infiltracji",
    intelligence: 78,
    martialArts: 75,
    stealth: 80,
    specialSkill: "Urok osobisty, kamuflaż i zręczność operacyjna",
    description: "Bliska przyjaciółka Bena od pierwszego dnia w akademii. Bardzo wesoła, oddana i odważna. Przez długi czas podkochiwała się w Benie, co wywoływało intrygujące napięcia między nią a Eriką Hale.",
    alliance: "CIA",
    avatarText: "ZC"
  },
  {
    id: "mike-brezinsky",
    name: "Mike Brezinsky",
    role: "Najlepszy przyjaciel Bena z dawnych lat",
    intelligence: 70,
    martialArts: 65,
    stealth: 40,
    specialSkill: "Niezrównany entuzjazm i lojalność",
    description: "Chłopak, z którym Ben spędzał całe dzieciństwo. Kiedy dowiedział się o tajemnicy Bena, sam spróbował swoich sił w wywiadzie i ostatecznie zwerbowano go jako wsparcie techniczne i terenowe. Zawsze gotowy rzucić się w ogień dla przyjaciół.",
    alliance: "CIA",
    avatarText: "MB"
  },
  {
    id: "leo-shang",
    name: "Leo Shang",
    role: "Chiński miliarder / Finansista organizacji terrorystycznych",
    intelligence: 91,
    martialArts: 60,
    stealth: 70,
    specialSkill: "Pranie brudnych pieniędzy, manipulacja rynkiem globalnym oraz bezwzględne planowanie operacji z cienia",
    description: "Ekstremalnie bogaty chiński miliarder i przedsiębiorca, który pod przykrywką legalnych interesów finansuje operacje SPYDER-a. Jest przebiegły, cyniczny i wyrachowany. Pojawia się jako główny czarny charakter w tomie 4, a także powraca w kolejnych częściach serii.",
    alliance: "SPYDER",
    avatarText: "LS"
  },
  {
    id: "joshua-hallal",
    name: "Joshua Hallal",
    role: "Genialny kadet / Elitarny agent SPYDER-a",
    intelligence: 94,
    martialArts: 92,
    stealth: 91,
    specialSkill: "Sfingowanie własnej śmierci, sabotaż technologiczny i bezwzględna lojalność wobec SPYDER-a",
    description: "Niezwykle utalentowany szpieg, który w Akademii był jedynym uczniem uznawanym za lepszego od samej Eriki Hale. Sfingował własną śmierć w wybuchu bomby w swoim pokoju akademickim, aby potajemnie dołączyć do SPYDER-a. Stał się jednym z najbardziej nieustępliwych i przebiegłych przeciwników Bena Ripleya. Po dramatycznych wydarzeniach w Obozie Szpiegów (gdzie cudem przeżył upadek) powraca z opaską na oku, hakiem zamiast dłoni oraz mechaniczną nogą.",
    alliance: "SPYDER",
    avatarText: "JH"
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Dlaczego Benjamin Ripley został zrekrutowany do Akademii Szpiegostwa CIA w pierwszym tomie?",
    options: [
      "Ponieważ wygrał krajowe mistrzostwa w strzelaniu bojowym",
      "Jako przynęta (bait), by wywabić kreta działającego w akademii",
      "Był synem tajnego dyrektora CIA, o czym sam nie wiedział",
      "Ponieważ pomyślnie zhakował serwery Pentagonu dla zabawy"
    ],
    answerIndex: 1,
    explanation: "Dyrektorzy akademii zrekrutowali go celowo jako przynętę. Wiedzieli, że kret spróbuje ukraść zmyślony kryptograficzny kod nazwany 'Pinwheel', który Ben rzekomo potrafił odkodować."
  },
  {
    id: 2,
    question: "Jak brzmi nazwa złowrogiej organizacji szpiegowskiej, która jest głównym wrogiem w większości tomów?",
    options: [
      "COBRA (ŻMIJA)",
      "SPECTRE (WIDMO)",
      "SPYDER (P.A.Y.E.C.)",
      "SHIELD (TARCZA)"
    ],
    answerIndex: 2,
    explanation: "W polskim przekładzie Agora organizacja nosi nazwę SPYDER, często z polskim objaśnieniem P.A.Y.E.C. To potężna, zbrodnicza sieć zrzeszająca najniebezpieczniejszych agentów."
  },
  {
    id: 3,
    question: "Kim dla Eriki Hale jest Alexander Hale?",
    options: [
      "Jej surowym dziadkiem, z którym nieustannie rywalizuje",
      "Jej partnerem życiowym i asystentem terenowym",
      "Jej ojcem, który udaje legendarnego agenta, a w rzeczywistości jest niezdarą",
      "Jej wujem, który należy potajemnie do kierownictwa SPYDER-a"
    ],
    answerIndex: 2,
    explanation: "Alexander Hale to ojciec Eriki. Jest on komiczną postacią, która dba o nienaganny paryski krój garnituru, lecz nie radzi sobie z najprostszymi misjami, przypisując sobie zasługi córki i Bena."
  },
  {
    id: 4,
    question: "W którym tomie Ben Ripley staje się podwójnym agentem i uczy się w szkole wroga?",
    options: [
      "Tom 2: Na wakacjach",
      "Tom 3: Szkoła szpiegów w chmurach",
      "Tom 5: W tajnej służbie",
      "Tom 6: Idzie na wojnę"
    ],
    answerIndex: 1,
    explanation: "W tomie 3 ('Szkoła szpiegów w chmurach' / 'Evil Spy School') po rzekomym wydaleniu z akademii CIA, Ben przyjmuje zaproszenie SPYDER-a i uczy się w ich akademii, grając na dwa fronty."
  },
  {
    id: 5,
    question: "Jaki sport / aktywność fizyczną Ben musi pilnie opanować w tomie o przygodach na nartach w Aspen?",
    options: [
      "Jazdę figurową na lodzie z córką dyrektora",
      "Jazdę na nartach zjazdowych, bo dotąd nigdy nie miał nart na nogach",
      "Wspinaczkę wysokogórską bez asekuracji",
      "Snorkeling pod lodem w zamarzniętym jeziorze"
    ],
    answerIndex: 1,
    explanation: "W tomie 4 ('Szkoła szpiegów na nartach') misja dzieje się w luksusowym Aspen. Ben Ripley musi nauczyć się jeździć na nartach, by zbliżyć się do córki miliardera, Jessiki."
  },
  {
    id: 6,
    question: "O co zostaje fałszywie oskarżony Ben w tomie 'W tajnej służbie' (Secret Service)?",
    options: [
      "O kradzież bezcennej korony królewskiej z muzeum w Londynie",
      "O próbę przeprowadzenia zamachu na prezydenta Stanów Zjednoczonych",
      "O dostarczanie ściśle tajnych planów rakiet do wywiadu Rosji",
      "O sfałszowanie swojego legendarnego egzaminu z matematyki wyższej"
    ],
    answerIndex: 1,
    explanation: "W tomie 5 SPYDER wrabia Bena w próbę zamachu na życie prezydenta USA, przez co chłopak musi uciekać przed własnymi służbami i samodzielnie demaskować zdrajców."
  },
  {
    id: 7,
    question: "Murray Hill współpracuje ze SPYDER-em głównie dlatego, że:",
    options: [
      "Marzy o zostaniu absolutnym władcą i dyktatorem świata",
      "Wyróżnia się niespotykanym i fanatycznym szałem bojowym",
      "Chce zarobić i żyć w pełnym lenistwie, unikając jakiejkolwiek pracy i nauki",
      "Musi zapłacić okup za ocalenie swoich porwanych rodziców"
    ],
    answerIndex: 2,
    explanation: "Największą motywacją Murraya Hilla jest lenistwo. Nienawidzi porannych ćwiczeń fizycznych i dyscypliny w CIA. Woli spędzać dnie w klimatyzowanym bunkrze, jedząc pizzę i grając na konsoli."
  }
];

export const spyQuotes: SpyQuote[] = [
  {
    id: "q1",
    text: "Szpiegostwo to nie tylko pistolety, wybuchy i pościgi helikopterowe. To przede wszystkim nienagannie skrojony garnitur i pewność siebie w każdej sytuacji.",
    author: "Alexander Hale",
    context: "Słynna rada Alexandra udzielona Benowi, zanim wyszło na jaw, że Alexander sam potrącił się własnym autem.",
    bookTitle: "Szkoła szpiegów (Tom 1)"
  },
  {
    id: "q2",
    text: "Gdybym ufała każdemu, kto uważa się za mojego przyjaciela, prawdopodobnie leżałabym już na dnie Potomaku z betonowym bloczkiem u nóg.",
    author: "Erica Hale",
    context: "Kiedy Ben po raz pierwszy próbuje dowieść swojej szczerości podczas nocnego przesłuchania w akademii.",
    bookTitle: "Szkoła szpiegów (Tom 1)"
  },
  {
    id: "q3",
    text: "Matematyka nie kłamie. Rakieta albo uderzy w cel według precyzyjnie wyliczonej paraboli, albo ominie go z powodu złego kąta nachylenia. Ludzie są o wiele mniej przewidywalni niż liczby.",
    author: "Benjamin Ripley",
    context: "Analityczne przemyślenia Bena w trakcie próby zatrzymania odliczania do startu pocisku.",
    bookTitle: "Szkoła szpiegów na wakacjach (Tom 2)"
  },
  {
    id: "q4",
    text: "Nie po to uciekałem z obozu przetrwania CIA, żeby teraz czołgać się przez błoto dla idei. SPYDER przynajmniej ma porządną klimatyzację, automaty z colą i nikt nie każe mi robić pompek o piątej rano.",
    author: "Murray Hill",
    context: "Murray tłumaczy Benowi powody swojej dezercji w tajnej bazie szkoleniowej.",
    bookTitle: "Szkoła szpiegów w chmurach (Tom 3)"
  },
  {
    id: "q5",
    text: "W moich czasach nie mieliśmy satelitów, smartfonów ani lokalizatorów GPS. Mieliśmy paczkę zapałek, spinacz i zimną krew. I jakoś wygraliśmy zimną wojnę bez ani jednego posta na Instagramie.",
    author: "Cyrus Hale",
    context: "Cyrus krytykuje poleganie młodego pokolenia na gadżetach podczas infiltracji bunkra.",
    bookTitle: "Szkoła szpiegów idzie na wojnę (Tom 6)"
  },
  {
    id: "q6",
    text: "To niezwykle niefortunne nieporozumienie natury administracyjnej. Zapewniam państwa, że incydent z wyrzutnią rakietową został już wciągnięty do akt jako błąd systemu archiwizacji.",
    author: "Dyrektor Akademii (The Principal)",
    context: "Tradycyjne tłumaczenie Dyrektora mające na celu unikanie odpowiedzialności za zniszczenie skrzydła akademii.",
    bookTitle: "Szkoła szpiegów w chmurach (Tom 3)"
  },
  {
    id: "q7",
    text: "Erica, czy ty kiedykolwiek po prostu... odpoczywasz? Albo uśmiechasz się bez planowania, jak kogoś obezwładnić w ciągu sekundy?",
    author: "Benjamin Ripley",
    context: "Rozmowa Bena z Ericą podczas lotu na Antarktydę.",
    bookTitle: "Szkoła szpiegów idzie na wojnę (Tom 6)"
  },
  {
    id: "q8",
    text: "Urok brytyjskiego wywiadu polega na tym, że nawet gdy jesteśmy ścigani przez helikopter szturmowy, potrafimy wypić herbatę o piątej po południu z nienagannymi manierami.",
    author: "Joshua Hall",
    context: "Joshua rywalizuje z amerykańskimi kadetami na terytorium Wielkiej Brytanii.",
    bookTitle: "Szkoła szpiegów w puszczy (Tom 7)"
  },
  {
    id: "q9",
    text: "Zasada numer jeden rodu Hale'ów: nigdy nie pokazuj emocji wrogowi. Zasada numer dwa: jeśli wróg uważa, że wygrywa, upewnij się, że jego plany opierają się na sfałszowanych przez ciebie współrzędnych.",
    author: "Erica Hale",
    context: "Krótka lekcja operacyjna, którą udziela Benowi podczas ucieczki w Aspen.",
    bookTitle: "Szkoła szpiegów na nartach (Tom 4)"
  }
];

export const spyManeuvers: SpyManeuver[] = [
  {
    id: "m1",
    name: "Manewr Bombajski (Bombajski Powrót)",
    englishName: "The Bombay Roll-up",
    origin: "Cyrus Hale (prawdopodobnie sfingowany przez niego w Indiach)",
    description: "Sztandarowy, niezwykle sprytny manewr uniku i zmylenia pościgu. Agent ucieka w wybranym kierunku, po czym nagle rzuca zasłonę dymną lub odwraca uwagę wroga, kryje się i czołga nisko po ziemi w przeciwną stronę. Rozpędzony pościg przebiega tuż nad nim, biegnąc ślepo naprzód.",
    difficulty: "Legendarny",
    effectiveness: 92,
    bookTitle: "Szkoła szpiegów (Tom 1) / Szkoła szpiegów na wakacjach (Tom 2)",
    instructions: "1. Biegnij z pełną prędkością w stronę zaułka, drzwi lub za róg budynku.\n2. Przygotuj mały ładunek dymny lub improwizowany generator chmury (np. gaśnicę proszkową na korytarzu).\n3. Po zniknięciu wrogom z oczu na ułamek sekundy, aktywuj dym pod własne stopy.\n4. Błyskawicznie rzuć się na ziemię i wykonaj perfekcyjnie cichy, niski wślizg pod prąd nadbiegającego pościgu.\n5. Pozwól napastnikom przebiec nad twoim leżącym ciałem w gęstym dymie.\n6. Wstań spokojnie za ich plecami, otrzep garnitur i zniknij w przeciwnym kierunku."
  },
  {
    id: "m2",
    name: "Moskiewski Przewrót",
    englishName: "The Moscow Roll",
    origin: "Erica Hale (podczas obrony korytarza akademickiego)",
    description: "Zaawansowany manewr akrobatyczny polegający na wykonywaniu błyskawicznych, nieregularnych i płaskich przewrotów po ziemi pod ostrym kątem. Służy do unikania serii z broni automatycznej lub wiązek laserowych w wąskich, pozbawionych osłon korytarzach.",
    difficulty: "Zaawansowany",
    effectiveness: 85,
    bookTitle: "Szkoła szpiegów (Tom 1)",
    instructions: "1. Przy nagłym ostrzale natychmiast obniż środek ciężkości do samej podłogi.\n2. Wykonaj mocne przetoczenie boczno-skośne przez ramię.\n3. Zamiast wstawać, płynnie przejdź w kolejny przewrót, zmieniając wektor ruchu.\n4. Trzymaj głowę i wrażliwe punkty osłonięte ramionami.\n5. Wykorzystaj pęd do wylądowania w pozycji klęczącej bezpośrednio za najbliższą betonową zasłoną."
  },
  {
    id: "m3",
    name: "Paryski Piwot",
    englishName: "The Paris Pivot",
    origin: "Erica Hale (nauczone w DGSE)",
    description: "Defensywny manewr walki z bliska. Agent udaje panikę i potknięcie tuż przed nacierającym napastnikiem, po czym wykorzystuje nagły krok w bok (pivot), przechwytuje pęd ciała rywala i przerzuca go nad sobą, wykorzystując biodro jako punkt obrotu.",
    difficulty: "Średni",
    effectiveness: 78,
    bookTitle: "Szkoła szpiegów w puszczy (Tom 7)",
    instructions: "1. Pozwól silnemu przeciwnikowi szarżować bezpośrednio na ciebie.\n2. Ugnij kolana i udaj przerażenie, aby uśpić jego czujność.\n3. W ostatnim ułamku sekundy wykonaj gwałtowny krok odstawno-obrotowy o 90 stopni.\n4. Przechwyć jego wysuniętą rękę za nadgarstek.\n5. Wykorzystaj impet przeciwnika, dynamicznie obracając się plecami do niego.\n6. Przerzuć go przez biodro lub popchnij na ścianę."
  },
  {
    id: "m4",
    name: "Szanghajski Unik",
    englishName: "The Shanghai Shear",
    origin: "Erica Hale (driftowanie skuterami i pojazdami)",
    description: "Niezwykle ryzykowny manewr prowadzenia pojazdu lub maszyny. Polega na celowym wprowadzeniu pojazdu w boczny poślizg kontrolowany (slide) tuż przed wąską przeszkodą, co umożliwia prześlizgnięcie się bokiem i natychmiastowe wyrównanie toru jazdy.",
    difficulty: "Legendarny",
    effectiveness: 95,
    bookTitle: "Szkoła szpiegów na nartach (Tom 4)",
    instructions: "1. Rozpędź auto lub skuter śnieżny bezpośrednio w stronę zablokowanej drogi (np. między ciężarówkami wroga).\n2. Na kilkanaście metrów przed barierą wykonaj gwałtowny ruch kierownicy z jednoczesnym zaciągnięciem hamulca ręcznego.\n3. Pozwól maszynie obrócić się o dokładnie 90 stopni, jadąc bokiem.\n4. Prześlizgnij się idealnie na centymetry przez wąską gardziel.\n5. Skontruj kierownicę, zwolnij hamulec ręczny i natychmiast dodaj gazu do dechy, aby odzyskać stabilność."
  },
  {
    id: "m5",
    name: "Waszyngtoński Walc",
    englishName: "The Washington Waltz",
    origin: "Alexander Hale (rzekomy mistrz infiltracji bankietów)",
    description: "Socjotechniczne maskowanie obecności w gęstym tłumie dyplomatów. Agent płynnie wędruje od grupy do grupy na ekskluzywnym przyjęciu, zmieniając rozmówców dokładnie co 45 sekund. Pozwala to na zebranie strzępków kluczowych informacji i uniemożliwia zapamiętanie agenta przez kogokolwiek.",
    difficulty: "Podstawowy",
    effectiveness: 60,
    bookTitle: "Szkoła szpiegów w tajnej służbie (Tom 5)",
    instructions: "1. Włóż nienagannie skrojony garnitur lub suknię wieczorową i weź kieliszek z neutralnym napojem.\n2. Dołącz z pewnym siebie uśmiechem do małej grupki dyskutującej o polityce dyplomatycznej.\n3. Rzuć jedno neutralne, acz błyskotliwe spostrzeżenie i słuchaj sekretnych plotek.\n4. Zanim ktokolwiek zapyta o twoje nazwisko (około 40-45 sekundy), przeproś uprzejmie, mówiąc, że widzisz starego przyjaciela i odejdź.\n5. Przejdź gładko do innej sekcji sali i powtórz schemat."
  }
];


